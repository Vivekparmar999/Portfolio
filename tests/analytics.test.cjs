const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  readFileSync(path.join(__dirname, '../helpers/analytics.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const origin = 'https://vivekparmar.vercel.app';
const response = data => ({ ok: true, json: async () => data });

function environment(fetchResult = async () => response({}), browser = true, mode = 'development') {
  const calls = [];
  const fetches = [];
  const listeners = {};
  const timers = new Map();
  let timerId = 0;
  const window = {
    location: new URL(`${origin}/resume`),
    screen: { width: 1440, height: 900 },
    dataLayer: [],
    gtag: (...args) => calls.push(args),
    addEventListener: (event, callback) => { listeners[event] = callback; },
  };
  const document = { title: 'Vivek Parmar Resume', referrer: `${origin}/` };
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    process: { env: { NODE_ENV: mode } },
    ...(browser ? { window, document } : {}),
    navigator: { userAgent: 'Test browser', language: 'en-IN' },
    URL,
    AbortController,
    setTimeout(callback) { const id = ++timerId; timers.set(id, callback); return id; },
    clearTimeout(id) { timers.delete(id); },
    fetch(...args) { fetches.push(args); return fetchResult(...args); },
  });
  return { analytics: module.exports, window, document, calls, fetches, listeners, timers };
}

test('page views are deduplicated and use correct location, title, and SPA referrer', () => {
  const env = environment();
  env.analytics.trackPageView();
  env.analytics.trackPageView();
  assert.equal(env.calls.length, 1);
  assert.equal(env.calls[0][1], 'page_view');
  assert.equal(env.calls[0][2].page_path, '/resume');
  assert.equal(env.calls[0][2].page_location, `${origin}/resume`);
  env.window.location = new URL(`${origin}/`);
  env.document.title = 'Vivek Parmar';
  env.analytics.trackPageView();
  assert.equal(env.calls[1][2].page_referrer, `${origin}/resume`);
  assert.equal(env.calls[1][2].page_title, 'Vivek Parmar');
  env.window.location.hash = '#projects';
  env.analytics.trackPageView();
  assert.equal(env.calls.length, 2);
  env.window.location = new URL(`${origin}/resume`);
  env.analytics.trackPageView();
  assert.equal(env.calls.length, 3);
  assert.equal(env.calls[2][2].page_referrer, `${origin}/`);
  assert.equal(env.fetches.length, 0);
});

test('clicks retain their source page while geolocation resolves after navigation', async () => {
  let resolve;
  const env = environment(() => new Promise(done => { resolve = done; }));
  const pending = env.analytics.trackClick('homePage_header_link_click');
  env.window.location = new URL(`${origin}/`);
  env.document.title = 'Vivek Parmar';
  resolve(response({ country_name: 'India', region: 'Gujarat', city: 'Ahmedabad', ip: 'not-forwarded', latitude: 1, longitude: 2 }));
  await pending;
  assert.equal(env.calls.length, 1);
  const payload = env.calls[0][2];
  assert.equal(payload.pagePath, '/resume');
  assert.equal(payload.page_path, '/resume');
  assert.equal(payload.pageTitle, 'Vivek Parmar Resume');
  assert.equal(payload.page_title, 'Vivek Parmar Resume');
  assert.equal(payload.country, 'India');
  assert.equal(payload.city, 'Ahmedabad');
  assert.equal(payload.location, 'Ahmedabad, Gujarat, India');
  assert.equal(payload.geo_status, 'available');
  assert.equal(payload.ip, undefined);
  assert.equal(payload.latitude, undefined);
  assert.equal(payload.longitude, undefined);
  assert.equal(env.window.dataLayer.length, 0);
  assert.equal(env.timers.size, 0);
});

test('concurrent and later clicks share one lookup but each emit one event', async () => {
  const env = environment(async () => response({ country_name: 'India' }));
  await Promise.all([env.analytics.trackClick('first_click'), env.analytics.trackClick('second_click')]);
  await env.analytics.trackClick('third_click', { project_title: 'Portfolio' });
  assert.equal(env.fetches.length, 1);
  assert.equal(env.calls.length, 3);
  assert.equal(env.calls[2][2].project_title, 'Portfolio');
  assert.equal(env.fetches[0][1].credentials, 'omit');
  assert.equal(env.fetches[0][1].referrerPolicy, 'no-referrer');
});

test('lookup timeout still emits the click and does not retry on every click', async () => {
  const env = environment(() => new Promise(() => {}));
  const pending = env.analytics.trackClick('timeout_click');
  for (const callback of env.timers.values()) callback();
  await pending;
  assert.equal(env.calls.length, 1);
  assert.equal(env.calls[0][2].geo_status, 'unavailable');
  assert.equal(env.fetches[0][1].signal.aborted, true);
  await env.analytics.trackClick('next_click');
  assert.equal(env.fetches.length, 1);
  assert.equal(env.calls.length, 2);
});

for (const [name, result] of [
  ['network error', async () => { throw new Error('Network unavailable'); }],
  ['rate limit', async () => ({ ok: false })],
  ['provider error', async () => response({ error: true })],
  ['invalid JSON', async () => ({ ok: true, json: async () => { throw new Error('Invalid JSON'); } })],
]) {
  test(`${name} does not lose the click event`, async () => {
    const env = environment(result);
    await env.analytics.trackClick('fallback_click');
    assert.equal(env.calls.length, 1);
    assert.equal(env.calls[0][2].geo_status, 'unavailable');
  });
}

test('pagehide flushes a pending click once, even if geography finishes later', async () => {
  let resolve;
  const env = environment(() => new Promise(done => { resolve = done; }));
  const pending = env.analytics.trackClick('leaving_click');
  env.listeners.pagehide();
  env.listeners.pagehide();
  assert.equal(env.calls.length, 1);
  assert.equal(env.calls[0][2].geo_status, 'pending');
  resolve(response({ country_name: 'India' }));
  await pending;
  assert.equal(env.calls.length, 1);
});

test('events queue safely while the Google tag is unavailable', async () => {
  const env = environment();
  delete env.window.gtag;
  env.analytics.trackPageView();
  await env.analytics.trackClick('queued_click');
  assert.equal(env.window.dataLayer.length, 2);
  assert.equal(env.window.dataLayer[0][0], 'event');
  assert.equal(env.window.dataLayer[0][1], 'page_view');
  assert.equal(env.window.dataLayer[1][1], 'queued_click');
});

test('server rendering never attempts tracking or geolocation', async () => {
  const env = environment(undefined, false);
  env.analytics.trackPageView();
  await env.analytics.trackClick('server_click');
  assert.equal(env.calls.length, 0);
  assert.equal(env.fetches.length, 0);
});

for (const mode of ['production', 'development']) {
  test(`${mode} events use the correct DebugView settings`, async () => {
    const env = environment(undefined, true, mode);
    env.analytics.trackPageView();
    await env.analytics.trackClick('debug_check');
    for (const [, , parameters] of env.calls) {
      if (mode === 'production') assert.ok(!Object.hasOwn(parameters, 'debug_mode'));
      else assert.equal(parameters.debug_mode, true);
    }
  });

  test(`${mode} initializes the unified Google tag before loading it`, () => {
    const React = require('react');
    const documentSource = ts.transpileModule(
      readFileSync(path.join(__dirname, '../pages/_document.tsx'), 'utf8'),
      { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
    ).outputText;
    const module = { exports: {} };
    vm.runInNewContext(documentSource, {
      module,
      exports: module.exports,
      process: { env: { NODE_ENV: mode } },
      require(name) {
        if (name === 'next/document') return { Html: 'html', Head: 'head', Main: 'main', NextScript: 'next-script' };
        if (name === '@/helpers/analytics') return environment().analytics;
        return require(name);
      },
    });
    const scripts = [];
    function visit(element) {
      if (!React.isValidElement(element)) return;
      if (element.type === 'script') scripts.push(element.props);
      React.Children.forEach(element.props.children, visit);
    }
    visit(module.exports.default());
    assert.equal(scripts.length, 2);
    assert.ok(scripts[0].dangerouslySetInnerHTML);
    assert.equal(scripts[1].src, 'https://www.googletagmanager.com/gtm.js?id=G-KR2Y21KPVJ');
    assert.equal(scripts[1].async, true);
    const sandbox = { dataLayer: [] };
    sandbox.window = sandbox;
    vm.runInNewContext(scripts[0].dangerouslySetInnerHTML.__html, sandbox);
    assert.equal(sandbox.dataLayer.length, 2);
    assert.equal(sandbox.dataLayer[0][0], 'set');
    assert.equal(sandbox.dataLayer[0][1].send_page_view, false);
    assert.equal(sandbox.dataLayer[1][0], 'js');
    assert.ok(!Object.hasOwn(sandbox.dataLayer[0][1], 'debug_mode'));
  });
}
