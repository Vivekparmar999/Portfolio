export const GA_MEASUREMENT_ID = 'G-KR2Y21KPVJ';
export const GEOLOCATION_TIMEOUT_MS = 2000;

export type ClickProperties = Record<string, string | number | boolean>;
type Geography = { country?: string; region?: string; city?: string };

let geographyRequest: Promise<Geography> | undefined;
let lastPageLocation: string | undefined;
let currentReferrer: string | undefined;
let listeningForPageHide = false;
const pendingClicks = new Set<() => void>();

function googleTag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  return window.gtag;
}

function pageContext() {
  const url = new URL(window.location.href);
  url.hash = '';
  return {
    ...(process.env.NODE_ENV !== 'production' ? { debug_mode: true } : {}),
    page_location: url.href,
    page_path: `${url.pathname}${url.search}`,
    page_title: document.title,
    page_referrer: currentReferrer ?? document.referrer,
  };
}

function getGeography(): Promise<Geography> {
  if (geographyRequest) return geographyRequest;
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout>;
  const deadline = new Promise<Geography>((resolve) => {
    timeout = setTimeout(() => {
      controller.abort();
      resolve({});
    }, GEOLOCATION_TIMEOUT_MS);
  });
  const request = fetch('https://ipapi.co/json/', {
    signal: controller.signal,
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  }).then(async (response): Promise<Geography> => {
    if (!response.ok) return {};
    const data = await response.json();
    if (data.error) return {};
    const text = (value: unknown) => typeof value === 'string' ? value.slice(0, 100) : undefined;
    return {
      country: text(data.country_name),
      region: text(data.region),
      city: text(data.city),
    };
  }).catch((): Geography => ({}));
  geographyRequest = Promise.race([request, deadline]).finally(() => clearTimeout(timeout));
  return geographyRequest;
}

export function trackPageView() {
  const tag = googleTag();
  if (!tag) return;
  const context = pageContext();
  if (context.page_location === lastPageLocation) return;
  currentReferrer = lastPageLocation ?? document.referrer;
  tag('event', 'page_view', {
    ...context,
    page_referrer: currentReferrer,
    send_to: GA_MEASUREMENT_ID,
  });
  lastPageLocation = context.page_location;
}

export async function trackClick(eventName: string, properties: ClickProperties = {}): Promise<void> {
  if (typeof window === 'undefined') return;
  const context = pageContext();
  const parameters = {
    ...properties,
    ...context,
    event_category: 'click',
    pagePath: window.location.pathname,
    pageTitle: document.title.slice(0, 100),
    dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    userAgent: navigator.userAgent.slice(0, 100),
    deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    send_to: GA_MEASUREMENT_ID,
  };
  let geography: Geography = {};
  let geoStatus = 'pending';
  let sent = false;
  const send = () => {
    if (sent) return;
    sent = true;
    pendingClicks.delete(send);
    googleTag()?.('event', eventName, {
      ...parameters,
      ...geography,
      location: [geography.city, geography.region, geography.country].filter(Boolean).join(', ').slice(0, 100),
      geo_status: geoStatus,
    });
  };
  if (!listeningForPageHide) {
    window.addEventListener('pagehide', () => Array.from(pendingClicks).forEach(flush => flush()));
    listeningForPageHide = true;
  }
  pendingClicks.add(send);
  geography = await getGeography();
  geoStatus = Object.values(geography).some(Boolean) ? 'available' : 'unavailable';
  send();
}
