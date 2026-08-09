'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { loadConfig, DEFAULT } = require('../src/config');

describe('loadConfig', () => {
  it('returns defaults when no file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'triage-cfg-'));
    const cfg = loadConfig(dir);
    assert.equal(cfg.staleDays, DEFAULT.staleDays);
    assert.ok(cfg.labelRules.some((r) => r.label === 'bug'));
  });

  it('merges triage.config.json when present', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'triage-cfg-'));
    fs.writeFileSync(
      path.join(dir, 'triage.config.json'),
      JSON.stringify({ staleDays: 42, labelRules: [{ label: 'custom', keywords: ['zz'] }] }),
      'utf8'
    );
    const cfg = loadConfig(dir);
    assert.equal(cfg.staleDays, 42);
    assert.equal(cfg.labelRules[0].label, 'custom');
  });

  it('falls back on invalid JSON', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'triage-cfg-'));
    fs.writeFileSync(path.join(dir, 'triage.config.json'), '{not-json', 'utf8');
    const cfg = loadConfig(dir);
    assert.equal(cfg.staleDays, DEFAULT.staleDays);
  });
});
