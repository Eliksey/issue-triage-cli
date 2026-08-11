const { describe, it } = require('node:test');
const assert = require('node:assert');
const { formatAsHTML } = require('../src/htmlReport.js');

describe('formatAsHTML', () => {
  it('generates valid HTML string', () => {
    const html = formatAsHTML([]);
    assert.strictEqual(html.includes('<!DOCTYPE html>'), true);
    assert.strictEqual(html.includes('Issue Triage Dashboard'), true);
  });

  it('renders issue rows', () => {
    const items = [
      { number: 42, isPR: false, title: 'Memory leak in worker', author: 'bob', score: 12, labels: ['bug'], isStale: true }
    ];
    const html = formatAsHTML(items, { repository: 'Eliksey/issue-triage-cli' });
    assert.strictEqual(html.includes('#42'), true);
    assert.strictEqual(html.includes('Memory leak in worker'), true);
    assert.strictEqual(html.includes('score-high'), true);
    assert.strictEqual(html.includes('Stale'), true);
  });

  it('escapes special characters', () => {
    const items = [
      { number: 1, title: '<script>alert("xss")</script>', author: 'hacker' }
    ];
    const html = formatAsHTML(items);
    assert.strictEqual(html.includes('<script>alert'), false);
    assert.strictEqual(html.includes('&lt;script&gt;'), true);
  });
});
