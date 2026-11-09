const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const sitemapConfig = require('../next-sitemap.config');
const projects = require('../data/projects.json');

const root = path.join(__dirname, '..');
const read = (file) => readFileSync(path.join(root, file), 'utf8');
const siteUrl = sitemapConfig.siteUrl;
const pages = [
  { file: 'index', pathname: '/', title: 'Vivek Parmar | Software Engineer' },
  { file: 'resume', pathname: '/resume', title: 'Vivek Parmar Resume' },
];

for (const { file, pathname, title } of pages) {
  test(`${pathname} includes route-specific SEO in the initial HTML`, () => {
    const html = read(`.next/server/pages/${file}.html`);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const url = `${siteUrl}${pathname === '/' ? '' : pathname}`;
    const titles = [...head.matchAll(/<title\b[^>]*>(.*?)<\/title>/g)];
    assert.equal(titles.length, 1);
    assert.ok(titles[0][1].startsWith(title));
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(head.includes(`rel="canonical" href="${url}"`));
    assert.equal((head.match(/name="description"/g) || []).length, 1);
    assert.match(head, /name="description" content="[^"]{80,180}"/);
    assert.ok(head.includes(`property="og:url" content="${url}"`));
    assert.match(head, /property="og:type" content="website"/);
    assert.match(head, /name="twitter:card" content="summary"/);
    assert.match(head, /name="robots" content="index, follow/);
    assert.ok(head.includes('"send_page_view":false'));
    assert.ok(head.includes('https://www.googletagmanager.com/gtm.js?id=G-KR2Y21KPVJ'));
    assert.ok(!head.includes('/gtag/js?'));
    assert.ok(!head.includes("gtag('config'"));
    assert.ok(head.indexOf("gtag('set'") < head.indexOf('https://www.googletagmanager.com/gtm.js?'));
    assert.ok(!head.includes('"debug_mode"'), 'Production must omit debug_mode, not set it to false');
    const image = head.match(/property="og:image" content="([^"]+)"/)[1];
    assert.ok(image.startsWith(`${siteUrl}/`));
    assert.ok(existsSync(path.join(root, 'public', new URL(image).pathname)));
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    const jsonLd = JSON.parse(head.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.equal(jsonLd['@context'], 'https://schema.org');
    const person = jsonLd['@graph'].find((item) => item['@type'] === 'Person');
    const profile = jsonLd['@graph'].find((item) => item['@type'] === 'ProfilePage');
    assert.equal(person.name, 'Vivek Parmar');
    assert.equal(profile.url, url);
    assert.equal(profile.mainEntity['@id'], person['@id']);
    assert.ok(person.sameAs.includes('https://github.com/Vivekparmar999'));
  });
}

test('projects and resume links are readable without JavaScript', () => {
  const home = read('.next/server/pages/index.html').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const project of projects) {
    assert.ok(home.includes(project.title), `Missing project: ${project.title}`);
    for (const url of [project.github_url, project.demo_url].filter(Boolean)) {
      assert.ok(home.includes(`href="${url}"`), `Missing crawlable project link: ${url}`);
    }
  }
  assert.ok(!/<a\b(?![^>]*\bhref=)[^>]*>/.test(home), 'Every anchor should have a destination');
  assert.match(home, /<a[^>]*href="\/resume"[^>]*>View Resume<\/a>/);
  const resume = read('.next/server/pages/resume.html');
  assert.match(resume, /<a[^>]*href="\/vivek%20Resume\.pdf"/);
  assert.match(resume, /<iframe[^>]*title="Vivek Parmar resume"/);
});

test('AI discovery and sitemap resources are generated correctly', () => {
  const robots = read('public/robots.txt');
  for (const agent of ['*', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) {
    assert.ok(robots.includes(`User-agent: ${agent}\nAllow: /`));
  }
  assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
  const sitemap = read('public/sitemap-0.xml');
  for (const { pathname } of pages) {
    assert.ok(sitemap.includes(`<loc>${siteUrl}${pathname === '/' ? '' : pathname}</loc>`));
  }
  assert.ok(!sitemap.includes('/404'));
  const llms = read('public/llms.txt');
  assert.match(llms, /^# Vivek Parmar/);
  assert.ok(llms.includes(`${siteUrl}/resume`));
  assert.ok(llms.includes('https://github.com/Vivekparmar999'));
});

test('error pages are not indexable portfolio profiles', () => {
  for (const code of [404, 500]) {
    const html = read(`.next/server/pages/${code}.html`);
    assert.match(html, /name="robots" content="noindex/);
    assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('application/ld+json'));
  }
});
