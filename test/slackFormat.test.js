const { describe, it } = require('node:test');
const assert = require('node:assert');
const { formatForSlack, formatForDiscord } = require('../src/slackFormat.js');

describe('slackFormat', () => {
  it('generates valid Slack blocks JSON', () => {
    const jsonStr = formatForSlack([]);
    const parsed = JSON.parse(jsonStr);
    assert.strictEqual(Array.isArray(parsed.blocks), true);
  });

  it('formats Slack items', () => {
    const items = [
      { number: 101, title: 'Auth crash', score: 25, author: 'dev1', isPR: false }
    ];
    const jsonStr = formatForSlack(items, { repository: 'Eliksey/issue-triage-cli' });
    assert.strictEqual(jsonStr.includes('Auth crash'), true);
    assert.strictEqual(jsonStr.includes('#101'), true);
  });
});

describe('discordFormat', () => {
  it('generates valid Discord embeds JSON', () => {
    const jsonStr = formatForDiscord([]);
    const parsed = JSON.parse(jsonStr);
    assert.strictEqual(Array.isArray(parsed.embeds), true);
  });

  it('formats Discord items', () => {
    const items = [
      { number: 202, title: 'DB timeout', score: 15, author: 'dev2', isStale: true }
    ];
    const jsonStr = formatForDiscord(items, { repository: 'Eliksey/issue-triage-cli' });
    assert.strictEqual(jsonStr.includes('DB timeout'), true);
    assert.strictEqual(jsonStr.includes('#202'), true);
  });
});
