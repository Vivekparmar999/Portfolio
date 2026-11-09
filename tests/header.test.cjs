const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const React = require('react');
const ts = require('typescript');

const compiled = ts.transpileModule(
  readFileSync(path.join(__dirname, '../components/Header.tsx'), 'utf8'),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  },
).outputText;

function renderHeader(track = () => Promise.resolve()) {
  const events = [];
  const opened = [];
  const errors = [];
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module,
    exports: module.exports,
    window: { open: (...args) => opened.push(args) },
    console: { error: (...args) => errors.push(args) },
    require(name) {
      if (name === 'react') return { ...React, useState: () => [false, () => {}] };
      if (name === 'next/link') return 'a';
      if (name === '@/helpers/helpers') {
        return {
          URLS: {
            home: '/',
            resume: '/resume',
            linkedin: 'https://www.linkedin.com/in/vivek-parmar-0b10b4134/',
            github: 'https://github.com/Vivekparmar999',
          },
          sendGTMEvent(event) {
            events.push(event);
            return track(event);
          },
        };
      }
      return require(name);
    },
  });
  const links = [];
  function visit(element) {
    if (!React.isValidElement(element)) return;
    if (element.type === 'a' && element.props.href) links.push(element);
    React.Children.forEach(element.props.children, visit);
  }
  visit(module.exports.default({}));
  return { links, events, opened, errors };
}

const clickEvent = (overrides = {}) => ({
  button: 0,
  ctrlKey: false,
  metaKey: false,
  defaultPrevented: false,
  preventDefault() { this.defaultPrevented = true; },
  ...overrides,
});

for (const [label, eventName, external] of [
  ['Home', 'homePage_header_link_click', false],
  ['Resume', 'resume_header_link_click', false],
  ['LinkedIn', 'LinkedIn_header_link_click', true],
  ['Github', 'Github_header_link_click', true],
]) {
  test(`${label} preserves native link navigation and tracks its click`, async () => {
    const header = renderHeader();
    const link = header.links.find(item => item.props.children === label);
    const event = clickEvent();
    link.props.onClick(event);
    await new Promise(setImmediate);
    assert.equal(event.defaultPrevented, false);
    assert.equal(link.props.target, external ? '_blank' : undefined);
    assert.deepEqual(header.opened, []);
    assert.deepEqual(header.events, [eventName]);
  });
}

test('slow analytics does not prevent Home navigation or modified clicks', () => {
  const header = renderHeader(() => new Promise(() => {}));
  const home = header.links.find(item => item.props.children === 'Home');
  for (const modifiers of [{}, { ctrlKey: true }, { metaKey: true }]) {
    const event = clickEvent(modifiers);
    home.props.onClick(event);
    assert.equal(event.defaultPrevented, false);
  }
  assert.deepEqual(header.opened, []);
});

test('analytics rejection is handled without preventing navigation', async () => {
  const header = renderHeader(() => Promise.reject(new Error('Analytics unavailable')));
  const home = header.links.find(item => item.props.children === 'Home');
  const event = clickEvent();
  home.props.onClick(event);
  await new Promise(setImmediate);
  assert.equal(event.defaultPrevented, false);
  assert.equal(header.errors.length, 1);
  assert.deepEqual(header.opened, []);
});
