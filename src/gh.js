'use strict';

const { execFileSync } = require('child_process');

function ghJson(args) {
  const out = execFileSync('gh', args, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(out || '[]');
}

function listIssues(repo) {
  return ghJson([
    'issue', 'list',
    '--repo', repo,
    '--state', 'open',
    '--limit', '100',
    '--json', 'number,title,labels,createdAt,updatedAt,comments,author,url',
  ]);
}

function listPrs(repo) {
  return ghJson([
    'pr', 'list',
    '--repo', repo,
    '--state', 'open',
    '--limit', '100',
    '--json', 'number,title,labels,createdAt,updatedAt,author,url',
  ]);
}

module.exports = { listIssues, listPrs, ghJson };
