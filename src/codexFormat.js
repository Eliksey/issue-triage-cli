/**
 * Codex / LLM Prompt Formatter for issue-triage-cli
 * Formats triaged issue items into structured context blocks for OpenAI models.
 */

function formatForCodex(items = [], options = {}) {
  const { maxItems = 10, includeBody = true } = options;
  const sliced = items.slice(0, maxItems);

  let output = `<codex_triage_context repository="${options.repository || 'unknown'}">\n`;
  output += `  <summary total_items="${items.length}" processed="${sliced.length}" />\n`;

  sliced.forEach((item, index) => {
    output += `  <issue index="${index + 1}" number="${item.number}" type="${item.isPR ? 'PR' : 'Issue'}">\n`;
    output += `    <title><![CDATA[${item.title || ''}]]></title>\n`;
    output += `    <author>${item.author || 'unknown'}</author>\n`;
    output += `    <priority_score>${item.score || 0}</priority_score>\n`;
    output += `    <labels>${(item.labels || []).join(', ')}</labels>\n`;
    output += `    <stale>${item.isStale ? 'true' : 'false'}</stale>\n`;
    if (includeBody && item.body) {
      output += `    <body><![CDATA[${item.body.slice(0, 300)}]]></body>\n`;
    }
    output += `  </issue>\n`;
  });

  output += `</codex_triage_context>`;
  return output;
}

module.exports = { formatForCodex };
