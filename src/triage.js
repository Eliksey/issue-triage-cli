'use strict';

const { listIssues, listPrs } = require('./gh');

function daysSince(iso) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return 0;
  return Math.floor((Date.now() - t) / (24 * 3600 * 1000));
}

function suggestFromText(title, body, rules) {
  const text = `${title || ''} ${body || ''}`.toLowerCase();
  const hits = [];
  for (const rule of rules || []) {
    if ((rule.keywords || []).some((k) => text.includes(String(k).toLowerCase()))) {
      hits.push(rule.label);
    }
  }
  return [...new Set(hits)];
}

function formatItem(item, kind, staleDays, rules) {
  const age = daysSince(item.updatedAt || item.createdAt);
  const stale = age >= staleDays;
  const labels = (item.labels || []).map((l) => (typeof l === 'string' ? l : l.name)).filter(Boolean);
  const suggested = suggestFromText(item.title, '', rules).filter((s) => !labels.includes(s));
  const flag = stale ? '[stale] ' : '';
  const labelStr = labels.length ? labels.join(', ') : '-';
  const sugStr = suggested.length ? ` suggest: ${suggested.join(', ')}` : '';
  return {
    line: `#${item.number}  ${flag}${item.title}  [${kind}] labels: ${labelStr}${sugStr}`,
    stale,
    age,
    number: item.number,
    title: item.title,
    kind,
    labels,
    suggested,
    url: item.url,
  };
}

async function scanRepo(repo, opts) {
  const staleDays = opts.staleDays || 21;
  const rules = opts.labelRules || [];
  const issues = listIssues(repo);
  const items = issues.map((i) => formatItem(i, 'issue', staleDays, rules));
  if (opts.includePrs) {
    const prs = listPrs(repo);
    items.push(...prs.map((p) => formatItem(p, 'pr', staleDays, rules)));
  }
  items.sort((a, b) => b.age - a.age);
  const staleCount = items.filter((i) => i.stale).length;
  const header = `repo: ${repo}  open: ${items.length}  stale(>${staleDays}d): ${staleCount}`;
  const text = [header, ...items.map((i) => i.line)].join('\n');
  const markdown = [
    `# Triage report: ${repo}`,
    '',
    `- Generated: ${new Date().toISOString()}`,
    `- Open items: ${items.length}`,
    `- Stale (>${staleDays}d): ${staleCount}`,
    '',
    '| # | Kind | Age(d) | Stale | Title | Labels | Suggested |',
    '|---|------|--------|-------|-------|--------|-----------|',
    ...items.map(
      (i) =>
        `| ${i.number} | ${i.kind} | ${i.age} | ${i.stale ? 'yes' : ''} | ${i.title.replace(/\|/g, '\\|')} | ${i.labels.join(', ')} | ${i.suggested.join(', ')} |`
    ),
    '',
  ].join('\n');
  return { text, markdown, items, staleCount };
}

async function suggestLabels(repo, opts) {
  const rules = opts.labelRules || [];
  const limit = opts.limit || 20;
  const issues = listIssues(repo).slice(0, limit);
  return issues.map((i) => {
    const sug = suggestFromText(i.title, '', rules);
    return `#${i.number} ${i.title} → ${sug.length ? sug.join(', ') : '(no suggestion)'}`;
  });
}

module.exports = { scanRepo, suggestLabels, suggestFromText, daysSince };
