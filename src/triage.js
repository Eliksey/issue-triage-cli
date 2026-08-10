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

function commentCount(item) {
  if (Array.isArray(item.comments)) return item.comments.length;
  const n = Number(item.comments);
  return Number.isFinite(n) ? n : 0;
}

function priorityScore(item, kind, staleDays) {
  // Higher = needs attention sooner. Heuristic for maintainer backlog ranking.
  let score = 0;
  const age = daysSince(item.updatedAt || item.createdAt);
  const comments = commentCount(item);
  const labels = (item.labels || []).map((l) => (typeof l === 'string' ? l : l.name).toLowerCase());
  if (age >= staleDays) score += 40;
  else if (age >= Math.floor(staleDays / 2)) score += 20;
  else score += Math.min(15, age);
  score += Math.min(25, comments * 3);
  if (kind === 'pr') score += 15;
  if (labels.some((l) => /security|critical|p0|blocker/.test(l))) score += 50;
  if (labels.some((l) => /bug|regression/.test(l))) score += 20;
  if (labels.some((l) => /good first issue|help wanted/.test(l))) score -= 5;
  return score;
}

function formatItem(item, kind, staleDays, rules) {
  const age = daysSince(item.updatedAt || item.createdAt);
  const stale = age >= staleDays;
  const labels = (item.labels || []).map((l) => (typeof l === 'string' ? l : l.name)).filter(Boolean);
  const body = item.body || '';
  const suggested = suggestFromText(item.title, body, rules).filter((s) => !labels.includes(s));
  const score = priorityScore(item, kind, staleDays);
  const flag = stale ? '[stale] ' : '';
  const labelStr = labels.length ? labels.join(', ') : '-';
  const sugStr = suggested.length ? ` suggest: ${suggested.join(', ')}` : '';
  const nComments = commentCount(item);
  const comments = ` c:${nComments}`;
  return {
    line: `#${item.number}  p${score}  ${flag}${item.title}  [${kind}] labels: ${labelStr}${sugStr}${comments}`,
    stale,
    age,
    score,
    number: item.number,
    title: item.title,
    kind,
    labels,
    suggested,
    url: item.url,
    comments: nComments,
  };
}

function buildMarkdown(repo, items, staleDays, staleCount) {
  const top = [...items].sort((a, b) => b.score - a.score).slice(0, 10);
  return [
    `# Triage report: ${repo}`,
    '',
    `- Generated: ${new Date().toISOString()}`,
    `- Open items: ${items.length}`,
    `- Stale (>${staleDays}d): ${staleCount}`,
    '',
    '## Priority queue (top 10)',
    '',
    '| # | Kind | Score | Age(d) | Stale | Title | Labels | Suggested |',
    '|---|------|-------|--------|-------|-------|--------|-----------|',
    ...top.map(
      (i) =>
        `| ${i.number} | ${i.kind} | ${i.score} | ${i.age} | ${i.stale ? 'yes' : ''} | ${String(i.title).replace(/\|/g, '\\|')} | ${i.labels.join(', ')} | ${i.suggested.join(', ')} |`
    ),
    '',
    '## Full backlog',
    '',
    '| # | Kind | Score | Age(d) | Stale | Title | Labels | Suggested | URL |',
    '|---|------|-------|--------|-------|-------|--------|-----------|-----|',
    ...items.map(
      (i) =>
        `| ${i.number} | ${i.kind} | ${i.score} | ${i.age} | ${i.stale ? 'yes' : ''} | ${String(i.title).replace(/\|/g, '\\|')} | ${i.labels.join(', ')} | ${i.suggested.join(', ')} | ${i.url || ''} |`
    ),
    '',
    '## Agent handoff (paste into Codex / ChatGPT)',
    '',
    '```',
    `Triage ${repo}: ${items.length} open, ${staleCount} stale.`,
    'Top priorities:',
    ...top.slice(0, 5).map((i) => `- #${i.number} [${i.kind}] score=${i.score} ${i.title}`),
    'Propose: label fixes, close/stale candidates, draft replies for top 3.',
    '```',
    '',
  ].join('\n');
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
  items.sort((a, b) => b.score - a.score || b.age - a.age);
  const staleCount = items.filter((i) => i.stale).length;
  const header = `repo: ${repo}  open: ${items.length}  stale(>${staleDays}d): ${staleCount}`;
  const text = [header, ...items.map((i) => i.line)].join('\n');
  const markdown = buildMarkdown(repo, items, staleDays, staleCount);
  const json = {
    repo,
    generatedAt: new Date().toISOString(),
    open: items.length,
    staleDays,
    staleCount,
    items: items.map((i) => ({
      number: i.number,
      kind: i.kind,
      title: i.title,
      score: i.score,
      age: i.age,
      stale: i.stale,
      labels: i.labels,
      suggested: i.suggested,
      comments: i.comments,
      url: i.url,
    })),
  };
  return { text, markdown, json, items, staleCount };
}

async function suggestLabels(repo, opts) {
  const rules = opts.labelRules || [];
  const limit = opts.limit || 20;
  const issues = listIssues(repo).slice(0, limit);
  return issues.map((i) => {
    const sug = suggestFromText(i.title, i.body || '', rules);
    return `#${i.number} ${i.title} → ${sug.length ? sug.join(', ') : '(no suggestion)'}`;
  });
}

function summarizeLocal(items, repo, staleDays) {
  const staleCount = items.filter((i) => i.stale).length;
  const byKind = items.reduce((acc, i) => {
    acc[i.kind] = (acc[i.kind] || 0) + 1;
    return acc;
  }, {});
  return {
    text: [
      `summary: ${repo}`,
      `  open: ${items.length}  stale(>${staleDays}d): ${staleCount}`,
      `  kinds: ${Object.entries(byKind).map(([k, v]) => `${k}=${v}`).join(' ') || 'none'}`,
      `  top: ${items.slice(0, 5).map((i) => `#${i.number}(p${i.score})`).join(' ') || 'none'}`,
    ].join('\n'),
    staleCount,
  };
}

module.exports = {
  scanRepo,
  suggestLabels,
  suggestFromText,
  daysSince,
  priorityScore,
  summarizeLocal,
  formatItem,
};
