# Personal portfolio

This is a [Next.js](https://nextjs.org/) project with [Typescript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Run the development server

Use Node.js 26.x for local development and builds. The `engines.node` field in `package.json` also selects Node.js 26.x on Vercel.

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel
To deploy Next.js app used [Vercel Platform](https://vercel.com)

Set **Settings → Build and Deployment → Node.js Version** to **26.x** in Vercel. The committed `engines.node` setting takes precedence over the dashboard version. Deploy the updated commit to apply it; existing deployments are not changed.

## Quickly check code in browser

[Code Github1s Link](https://github1s.com/Vivekparmar999/Portfolio)

## Acknowledgements
Special thanks to [Vivek Patel](https://github.com/vivek9patel) for providing portfolio inspiration.

---

## Analytics: unified Google tag and GA4

This site uses **Google's unified Google tag loader (`gtm.js`) and the `gtag()` API**, with the existing GA4 measurement ID `G-KR2Y21KPVJ`. The `G-` ID selects the Google Analytics destination. This does **not** install a separate `GTM-…` container for third-party or custom HTML tags.

The integration follows [Google's current installation guidance](https://developers.google.com/tag-platform/gtagjs): load `gtm.js`, queue in-page settings with `gtag('set', …)`, and initialize with `gtag('js', new Date())`. The legacy `gtag('config', …)` initialization is no longer used. Settings are queued before the asynchronous loader to prevent an unwanted automatic page view.

Google hosts and updates this JavaScript runtime; there is no npm GTM version to pin or upgrade here. Publishing versions of a `GTM-…` container in Google's dashboard is a separate operation. Existing GA4 event names, click geography and the measurement ID are preserved.

You do not need GTM to report button clicks by country/city. Do not add another Google tag or GTM GA4 tag for the same events: that can double-count them.

| Code | Responsibility |
| --- | --- |
| `helpers/analytics.ts` | Measurement ID, page views, click context, cached geolocation and Google tag events |
| `pages/_document.tsx` | Loads the Google tag once, with automatic initial page views disabled |
| `pages/_app.tsx` | Tracks initial/subsequent routes; mounts Vercel Analytics once |
| `helpers/helpers.tsx` | Keeps `sendGTMEvent` as a compatibility wrapper around `trackClick`; the old name does not mean GTM is installed |
| Header, shared links and page components | Call the tracker without blocking navigation |

Vercel Analytics is separate. Its dashboard does not display these custom GA4 click events.

`sendGTMEvent` and the `data-gtm_event` HTML attribute are legacy names used by this application's own code. Neither installs GTM; the commented-out `TagManager.dataLayer` example is inactive.

### Required GA4 settings

1. Open the GA4 property whose web stream has measurement ID `G-KR2Y21KPVJ`.
2. Go to **Admin → Data streams → your web stream → Enhanced measurement settings**.
3. Under **Page views → Show advanced settings**, turn off **Page changes based on browser history events**. The application sends explicit `page_view` events; automatic history tracking in addition to this code can duplicate them.
4. Do not configure another tag or trigger that sends the same page views or custom clicks.

The Google tag receives `send_page_view: false` through `gtag('set', …)` before loading; the app sends the initial view itself. Repeated effects and hash-only changes do not send extra views. A different route/query string or returning to a previous page does send a view.

These account settings cannot be changed or verified from this repository alone.

### Click events and geolocation

Each instrumented click queues one custom event. Its source URL, title and timestamp are captured **at click time**, before navigation. Analytics never prevents navigation.

The first click starts an HTTPS request to `ipapi.co`. Concurrent and subsequent clicks reuse the result for that browser document, including SPA navigation. The lookup has a two-second deadline. Failures are also cached until a full reload to avoid repeated requests to a failing/rate-limited service.

Events contain:

- Standard context: `page_location`, `page_path`, `page_title`, `page_referrer`.
- Compatibility fields: `pagePath`, `pageTitle`, `dateTime`, `deviceType`, `screenResolution`, `language`, `userAgent`.
- Approximate IP-derived geography: `country`, `region`, `city`, and `location` (a city/region/country label).
- `geo_status`: `available`, `unavailable`, or `pending` when the page exits before the lookup finishes.
- Action details where applicable: `project_title`, `skill_name`, `link_url`, `expanded`.

Raw IP addresses and latitude/longitude are **not forwarded as custom event parameters**. The provider necessarily receives the visitor's IP to perform its lookup. This is approximate location, not GPS; VPNs and mobile networks affect accuracy.

If location fails, the click still sends with `geo_status=unavailable`. On `pagehide`, pending clicks are flushed without waiting for geography and are not sent again when the lookup resolves.

GA4 also supplies its own standard Country, Region, City and Device category dimensions where available. Those are independent of the custom geography fields and may differ.

### Event names

Existing event names are preserved and case-sensitive.

| Interaction | Custom event |
| --- | --- |
| Header Home / Resume | `homePage_header_link_click` / `resume_header_link_click` |
| Header LinkedIn / GitHub | `LinkedIn_header_link_click` / `Github_header_link_click` |
| Header name / mobile menu | `logo_home_click` / `mobile_menu_toggle_click` |
| View Resume / Back / PDF download link | `viewResume_btn_click` / `resume_back_click` / `resume_download_click` |
| Company/project links in experience | `Click_EinfoChips_Btn`, `Click_Arrow_Btn`, `Click_InnoventixSolution_Btn` |
| LinkedIn recommendations | `linkedin_recommendations_click` |
| Project source / demo | `project_source_click` / `project_demo_click` |
| Skill / database / tool cards | `skill_card_click` / `database_card_click` / `tool_card_click` |
| Show all/fewer projects, when there are more than six | `projects_toggle_click` |

Enhanced measurement can additionally send `click`, `file_download`, and `scroll` events. These are separate from the custom events above. Filter by the custom event name to count a particular button; do not count all events as button clicks. Browser PDF-viewer toolbar actions are not instrumented; the site's download link is.

### Verify tracking

1. Run `npm run dev`. Instrumented page views and clicks in development include the GA4 event parameter `debug_mode: true`.
2. Open **GA4 → Admin → DebugView** for the matching property.
3. Load Home, click Resume, then Home. Expect one `page_view` per displayed route and one corresponding custom event per click.
4. Inspect click parameters. `pagePath`/`page_title` should describe the source page, not the destination.
5. Check `country`, `region`, `city`, and `geo_status`. If location is unavailable, the event should still appear.
6. In browser Network tools, filter for `collect` to inspect outgoing Google Analytics requests.

Production builds do not enable debug mode. GA4 developer/internal-traffic filters can exclude local visits from normal reports. An outgoing request does not guarantee immediate availability in processed reports. Ad blockers, network loss, consent choices and early tab closure can prevent delivery: browser analytics is not a guaranteed transactional audit log.

The repository does not implement a consent UI. Where consent is required, gate both Google Analytics and the location lookup before collection.

### Report click counts by country/city

GA4 receives event parameters without custom dimensions being registered first. However, custom parameters generally need **event-scoped custom dimensions** to be used in Explorations and the GA4 connector in Looker Studio.

In **Admin → Custom definitions → Create custom dimension**, use these exact parameters:

| Suggested display name | Event parameter |
| --- | --- |
| Click source path | `pagePath` |
| Click source title | `pageTitle` |
| Click country (IP lookup) | `country` |
| Click region (IP lookup) | `region` |
| Click city (IP lookup) | `city` |
| Location lookup status | `geo_status` |
| Project title | `project_title` |
| Skill name | `skill_name` |

Keep existing compatible definitions rather than duplicating them. Prefer GA4's built-in Device category dimension over another device dimension. Avoid registering per-click timestamps or raw user-agent strings as dimensions: their high cardinality makes reports less useful.

Custom definitions are not retroactive. Allow processing time, commonly 24–48 hours, before expecting new definitions in normal reports.

For **Explore → Free form**:

1. Add dimensions: Event name, Click source path, Click country, Click city, Location lookup status.
2. Add **Event count** as the metric.
3. Put dimensions in Rows and Event count in Values.
4. Filter Event name to exactly `viewResume_btn_click`, or another event from the table.

In Looker Studio, connect the same GA4 property, refresh the data-source fields after adding definitions, and use these dimensions and Event count.

GA4/Looker Studio aggregate matching events; they do not necessarily show one row per physical click. For raw event-level analysis, configure GA4's BigQuery export and use `event_timestamp`, `event_name` and event parameters. This repository does not configure that export.

## Dependency security

Keep `next` and `eslint-config-next` on matching versions, and commit `package-lock.json` with dependency updates. Run `npm audit` for both production and development dependencies.

Three scoped npm overrides replace vulnerable versions selected by upstream packages:

- Next.js 15.5.29 pins PostCSS 8.4.31 and still permits the vulnerable Sharp 0.34 line. Its overrides use the project's patched dependencies (`$postcss` and `$sharp`).
- `@tailwindcss/typography` 0.5.20 pins `postcss-selector-parser` 6.0.10. Its override selects the patched 6.1.5 release.
- `@typescript-eslint/typescript-estree` 8.72.2 selects the vulnerable Minimatch 10 line. Its override selects patched Minimatch 11.0.1; verify type-aware parsing and linting when changing this override.

Review these overrides when updating the parent packages, and remove them once their normal dependency resolution selects patched versions. Re-run the production build, tests, and audit after changes.

## SEO and verification

Metadata lives in `data/seo.json`. Keep `public/llms.txt` consistent with the visible portfolio.

`npm run build` generates `public/robots.txt` and sitemaps through `postbuild`. These files are gitignored. Change `next-sitemap.config.js`, not the generated files. Canonical and sitemap URLs must use the public production origin, not localhost.

```bash
npm run test:analytics
npm run test:navigation
npm run lint
npm run build
npm run test:seo
```

After deployment, check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, initial HTML metadata, and GA4 DebugView/Realtime. Search Console indexing and GA4 configuration require access to those accounts.