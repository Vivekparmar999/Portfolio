const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  readFileSync(path.join(__dirname, '../components/customHtml.tsx'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;

function components(track) {
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    console,
    require(name) {
      if (name === '@/helpers/helpers') return { sendGTMEvent: track };
      if (name === 'next/link') return 'a';
      return require(name);
    },
  });
  return module.exports;
}

test('tracked content links do not wait for analytics or prevent native navigation', () => {
  const events = [];
  const { Anchor } = components((...args) => { events.push(args); return new Promise(() => {}); });
  const element = Anchor({ href: '/resume', target: '_self' });
  const event = {
    defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; },
    currentTarget: { dataset: { gtm_event: 'content_click' }, href: 'https://vivekparmar.vercel.app/resume' },
  };
  element.props.onClick(event);
  assert.equal(event.defaultPrevented, false);
  assert.equal(element.props.target, '_self');
  assert.equal(events.length, 1);
  assert.equal(events[0][0], 'content_click');
});

test('consumer-cancelled link clicks are not tracked', () => {
  const events = [];
  const { Anchor } = components((...args) => { events.push(args); return Promise.resolve(); });
  const element = Anchor({ href: '/', onClick: event => event.preventDefault() });
  const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
  element.props.onClick(event);
  assert.equal(events.length, 0);
});

test('button-styled navigation retains a real href', () => {
  const { ButtonLink } = components(() => Promise.resolve());
  const element = ButtonLink({ href: '/resume', children: 'View Resume' });
  assert.equal(element.type, 'a');
  assert.equal(element.props.href, '/resume');
  assert.equal(element.props.children, 'View Resume');
});
