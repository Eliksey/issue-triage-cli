'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { main } = require('../src/cli');
const pkg = require('../package.json');

describe('cli', () => {
  it('version prints package version', async () => {
    const logs = [];
    const orig = console.log;
    console.log = (...a) => logs.push(a.join(' '));
    try {
      await main(['version']);
      assert.equal(logs.join('\n').trim(), pkg.version);
    } finally {
      console.log = orig;
    }
  });

  it('help does not throw', async () => {
    const orig = console.log;
    console.log = () => {};
    try {
      await main(['--help']);
    } finally {
      console.log = orig;
    }
  });

  it('rejects missing owner/repo', async () => {
    await assert.rejects(() => main(['scan', 'noneslash']), /owner\/repo/);
  });
});
