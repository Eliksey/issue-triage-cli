'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT = {
  staleDays: 21,
  labelRules: [
    { label: 'bug', keywords: ['crash', 'error', 'exception', 'fails', 'broken', 'bug'] },
    { label: 'documentation', keywords: ['docs', 'readme', 'typo', 'documentation'] },
    { label: 'enhancement', keywords: ['feature', 'add support', 'improve', 'enhancement'] },
    { label: 'question', keywords: ['how do i', 'help', 'question', '?'] },
  ],
};

function loadConfig(cwd) {
  const p = path.join(cwd, 'triage.config.json');
  if (!fs.existsSync(p)) return { ...DEFAULT, labelRules: [...DEFAULT.labelRules] };
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    return {
      staleDays: raw.staleDays || DEFAULT.staleDays,
      labelRules: raw.labelRules || DEFAULT.labelRules,
    };
  } catch {
    return { ...DEFAULT, labelRules: [...DEFAULT.labelRules] };
  }
}

module.exports = { loadConfig, DEFAULT };
