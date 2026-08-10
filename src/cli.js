'use strict';

const fs = require('fs');
const path = require('path');
const { scanRepo, suggestLabels } = require('./triage');
const { loadConfig } = require('./config');

const VERSION = require('../package.json').version;

function printHelp() {
  console.log(`issue-triage-cli v${VERSION} — maintainer triage for GitHub issues/PRs

Usage:
  issue-triage scan <owner/repo> [--prs] [--stale-days N] [--out file.md] [--json] [--json-out file.json]
  issue-triage suggest <owner/repo> [--limit N]
  issue-triage summary <owner/repo> [--prs] [--stale-days N]
  issue-triage version
  issue-triage --help

Flags:
  --prs            include open pull requests
  --stale-days N   stale threshold (default 21 or triage.config.json)
  --out FILE       write markdown report
  --json           print machine-readable JSON to stdout
  --json-out FILE  write JSON report
  --limit N        suggest: max issues (default 20)

Requires: gh CLI authenticated (gh auth status)
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--version' || a === '-V') args.version = true;
    else if (a === '--prs') args.prs = true;
    else if (a === '--json') args.json = true;
    else if (a === '--stale-days') args.staleDays = Number(argv[++i]);
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--json-out') args.jsonOut = argv[++i];
    else if (a === '--limit') args.limit = Number(argv[++i]);
    else args._.push(a);
  }
  return args;
}

async function main(argv) {
  const args = parseArgs(argv);
  if (args.version || args._[0] === 'version') {
    console.log(VERSION);
    return;
  }
  if (args.help || args._.length === 0) {
    printHelp();
    return;
  }

  const cmd = args._[0];
  const repo = args._[1];
  if (!repo || !repo.includes('/')) {
    throw new Error('Expected owner/repo, e.g. openai/codex');
  }

  const config = loadConfig(process.cwd());
  if (args.staleDays) config.staleDays = args.staleDays;

  if (cmd === 'scan' || cmd === 'summary') {
    const report = await scanRepo(repo, {
      includePrs: !!args.prs,
      staleDays: config.staleDays,
      labelRules: config.labelRules,
    });
    if (cmd === 'summary') {
      const { summarizeLocal } = require('./triage');
      const s = summarizeLocal(report.items, repo, config.staleDays);
      console.log(s.text);
      return;
    }
    if (args.out) {
      fs.writeFileSync(path.resolve(args.out), report.markdown, 'utf8');
      console.log(`Wrote ${args.out}`);
    }
    if (args.jsonOut) {
      fs.writeFileSync(path.resolve(args.jsonOut), JSON.stringify(report.json, null, 2), 'utf8');
      console.log(`Wrote ${args.jsonOut}`);
    }
    if (args.json) {
      console.log(JSON.stringify(report.json, null, 2));
    } else {
      console.log(report.text);
    }
    return;
  }

  if (cmd === 'suggest') {
    const lines = await suggestLabels(repo, {
      limit: args.limit || 20,
      labelRules: config.labelRules,
    });
    console.log(lines.join('\n'));
    return;
  }

  throw new Error(`Unknown command: ${cmd}`);
}

module.exports = { main };
