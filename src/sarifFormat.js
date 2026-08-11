/**
 * Formats issue triage results into SARIF 2.1.0 format for GitHub Security Code Scanning tab integration.
 * @param {Array} issues Array of scored issue objects
 * @returns {string} SARIF JSON string
 */
function formatSarif(issues) {
  const rules = [
    {
      id: 'ISSUE-HIGH-PRIORITY',
      name: 'HighPriorityIssue',
      shortDescription: { text: 'High priority issue requires urgent triage' },
      fullDescription: { text: 'An open GitHub issue has accumulated a high priority score based on activity, age, and labels.' },
      defaultConfiguration: { level: 'warning' }
    },
    {
      id: 'ISSUE-STALE',
      name: 'StaleIssue',
      shortDescription: { text: 'Stale issue detected' },
      fullDescription: { text: 'An open GitHub issue has had no activity for over 30 days.' },
      defaultConfiguration: { level: 'note' }
    }
  ];

  const results = issues.map((item, index) => {
    const isStale = item.isStale;
    const ruleId = isStale ? 'ISSUE-STALE' : 'ISSUE-HIGH-PRIORITY';
    const level = isStale ? 'note' : (item.score >= 50 ? 'error' : 'warning');

    return {
      ruleId,
      ruleIndex: isStale ? 1 : 0,
      level,
      message: {
        text: `[Priority Score: ${item.score}] #${item.number} ${item.title} (${item.html_url})`
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: { uri: `issues/${item.number}` },
            region: { startLine: 1, startColumn: 1 }
          }
        }
      ]
    };
  });

  const sarifLog = {
    $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'issue-triage-cli',
            semanticVersion: '1.5.0',
            informationUri: 'https://github.com/Eliksey/issue-triage-cli',
            rules
          }
        },
        results
      }
    ]
  };

  return JSON.stringify(sarifLog, null, 2);
}

module.exports = { formatSarif };
