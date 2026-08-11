const { test } = require('node:test');
const assert = require('node:assert');
const { formatSarif } = require('../src/sarifFormat.js');
const { formatMarkdownSummary } = require('../src/markdownSummary.js');

const mockIssues = [
  {
    number: 101,
    title: 'Critical bug in auth flow',
    score: 85,
    isStale: false,
    html_url: 'https://github.com/Eliksey/issue-triage-cli/issues/101'
  },
  {
    number: 102,
    title: 'Docs update needed',
    score: 15,
    isStale: true,
    html_url: 'https://github.com/Eliksey/issue-triage-cli/issues/102'
  }
];

test('formatSarif generates valid SARIF 2.1.0 JSON schema', () => {
  const output = formatSarif(mockIssues);
  const parsed = JSON.parse(output);

  assert.strictEqual(parsed.version, '2.1.0');
  assert.strictEqual(parsed.runs[0].tool.driver.name, 'issue-triage-cli');
  assert.strictEqual(parsed.runs[0].results.length, 2);
  assert.strictEqual(parsed.runs[0].results[0].ruleId, 'ISSUE-HIGH-PRIORITY');
  assert.strictEqual(parsed.runs[0].results[1].ruleId, 'ISSUE-STALE');
});

test('formatMarkdownSummary generates valid markdown table summary', () => {
  const output = formatMarkdownSummary(mockIssues);

  assert.ok(output.includes('## 📊 Issue Triage Summary (v1.5.0)'));
  assert.ok(output.includes('| #101 | Critical bug in auth flow | **85** | 🚨 High |'));
  assert.ok(output.includes('| #102 | Docs update needed | **15** | ⚠️ Stale |'));
});
