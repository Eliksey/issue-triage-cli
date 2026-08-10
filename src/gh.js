'use strict';

const { execFileSync } = require('child_process');

function ghJson(args) {
  try {
    const out = execFileSync('gh', args, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return JSON.parse(out || '[]');
  } catch (err) {
    const stderr = (err && err.stderr) ? String(err.stderr) : '';
    const msg = stderr || (err && err.message) || String(err);
    if (/auth|login|HTTP 401|GH_TOKEN|not logged/i.test(msg)) {
      throw new Error(
        'gh is not authenticated. Run: gh auth login  (or set GH_TOKEN). Original: ' +
          msg.split('\n')[0]
      );
    }
    if (/Could not resolve|404|Not Found/i.test(msg)) {
      throw new Error('Repository not found or no access. Check owner/repo. Detail: ' + msg.split('\n')[0]);
    }
    throw new Error('gh failed: ' + msg.split('\n')[0]);
  }
}

function listIssues(repo) {
  return ghJson([
    'issue', 'list',
    '--repo', repo,
    '--state', 'open',
    '--limit', '100',
    '--json', 'number,title,body,labels,createdAt,updatedAt,comments,author,url',
  ]);
}

function listPrs(repo) {
  // comments field is not always on PR list JSON; keep compatible set
  return ghJson([
    'pr', 'list',
    '--repo', repo,
    '--state', 'open',
    '--limit', '100',
    '--json', 'number,title,body,labels,createdAt,updatedAt,author,url,comments',
  ]);
}

module.exports = { listIssues, listPrs, ghJson };
