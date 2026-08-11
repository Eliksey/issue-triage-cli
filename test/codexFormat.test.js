const { describe, it } = require('node:test');
const assert = require('node:assert');
const { formatForCodex } = require('../src/codexFormat.js');

describe('formatForCodex', () => {
  it('formats empty array gracefully', () => {
    const res = formatForCodex([]);
    assert.strictEqual(res.includes('<summary total_items="0" processed="0" />'), true);
  });

  it('formats items into XML payload', () => {
    const items = [
      { number: 10, title: 'Fix crash on launch', author: 'alice', score: 15, labels: ['bug'], isStale: false, body: 'App crashes' }
    ];
    const res = formatForCodex(items, { repository: 'Eliksey/issue-triage-cli' });
    assert.strictEqual(res.includes('repository="Eliksey/issue-triage-cli"'), true);
    assert.strictEqual(res.includes('Fix crash on launch'), true);
    assert.strictEqual(res.includes('<priority_score>15</priority_score>'), true);
  });

  it('respects maxItems limit', () => {
    const items = [
      { number: 1, title: 'One' },
      { number: 2, title: 'Two' },
      { number: 3, title: 'Three' }
    ];
    const res = formatForCodex(items, { maxItems: 2 });
    assert.strictEqual(res.includes('total_items="3" processed="2"'), true);
  });
});
