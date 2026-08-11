/**
 * Slack & Discord Webhook Formatter for issue-triage-cli
 * Formats issue triage reports into Slack Block Kit and Discord Embed JSON.
 */

function formatForSlack(items = [], options = {}) {
  const repo = options.repository || 'Repository';
  const topItems = items.slice(0, 5);

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: `📋 Issue Triage Report — ${repo}` }
    },
    {
      type: 'section',
      text: { type: 'mrkdwn', text: `*Total Items:* ${items.length} | *Stale Items:* ${items.filter(i => i.isStale).length}` }
    },
    { type: 'divider' }
  ];

  topItems.forEach(item => {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*#${item.number} ${escapeSlack(item.title || '')}*\n*Priority Score:* \`${item.score || 0}\` | *Author:* @${item.author || 'unknown'} | *Type:* ${item.isPR ? 'PR' : 'Issue'}`
      }
    });
  });

  return JSON.stringify({ blocks }, null, 2);
}

function formatForDiscord(items = [], options = {}) {
  const repo = options.repository || 'Repository';
  const topItems = items.slice(0, 5);

  const fields = topItems.map(item => ({
    name: `#${item.number} ${item.title || ''}`,
    value: `Score: **${item.score || 0}** | Author: **${item.author || 'unknown'}** | Stale: **${item.isStale ? 'Yes' : 'No'}**`,
    inline: false
  }));

  const embed = {
    title: `📋 Issue Triage Digest — ${repo}`,
    color: 0x5865f2,
    description: `Found **${items.length}** open backlog items.`,
    fields,
    footer: { text: 'Powered by issue-triage-cli' }
  };

  return JSON.stringify({ embeds: [embed] }, null, 2);
}

function escapeSlack(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = { formatForSlack, formatForDiscord };
