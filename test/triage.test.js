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
});
