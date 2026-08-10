'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { suggestFromText, daysSince } = require('../src/triage');
const { DEFAULT } = require('../src/config');

describe('suggestFromText', () => {
  it('detects bug keywords', () => {
    const s = suggestFromText('App crash on empty config', '', DEFAULT.labelRules);
    assert.ok(s.includes('bug'));
  });

  it('detects docs keywords', () => {
    const s = suggestFromText('README typo in install section', '', DEFAULT.labelRules);
    assert.ok(s.includes('documentation'));
  });
});

describe('daysSince', () => {
  it('returns non-negative for past date', () => {
    const d = daysSince(new Date(Date.now() - 3 * 86400000).toISOString());
    assert.ok(d >= 2 && d <= 4);
  });

  it('returns 0 for invalid iso', () => {
    assert.equal(daysSince('not-a-date'), 0);
  });
});

describe('suggestFromText edge', () => {
  it('returns empty for blank title', () => {
    const s = suggestFromText('', '', DEFAULT.labelRules);
    assert.deepEqual(s, []);
  });

  it('dedupes multiple keyword hits for same label', () => {
    const s = suggestFromText('bug crash error exception', '', DEFAULT.labelRules);
    assert.equal(s.filter((x) => x === 'bug').length, 1);
  });

  it('reads body for security keywords', () => {
    const s = suggestFromText('please look', 'possible XSS in markdown render', DEFAULT.labelRules);
    assert.ok(s.includes('security'));
  });
});

describe('priorityScore', () => {
  const { priorityScore } = require('../src/triage');

  it('boosts security labels and PRs', () => {
    const issue = {
      updatedAt: new Date(Date.now() - 40 * 86400000).toISOString(),
      comments: 2,
      labels: [{ name: 'security' }],
    };
    const pr = {
      updatedAt: new Date().toISOString(),
      comments: 0,
      labels: [],
    };
    assert.ok(priorityScore(issue, 'issue', 21) > priorityScore(pr, 'pr', 21));
  });
});
