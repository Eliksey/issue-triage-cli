# issue-triage-cli

**CLI for open-source maintainers** to triage GitHub issues and pull requests without leaving the terminal.

[![CI](https://github.com/Eliksey/issue-triage-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/Eliksey/issue-triage-cli/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](package.json)
[![npm version](https://img.shields.io/badge/npm-1.1.0-blue)](package.json)

Built for real maintainer workflows: **priority ranking**, backlog scan, stale detection, label suggestions, and reports you can paste into release notes, team updates, or **AI coding agents** (Codex / ChatGPT).

## Why this exists

Maintainers spend hours clicking through the GitHub UI. This tool turns `gh` + local heuristics into a one-command triage pass:

- List open issues / PRs with age, comments, labels
- **Priority score** so the worst fire is on top
- Flag stale items (no activity N days)
- Suggest labels from title **and** body keywords
- Export markdown **or JSON** for humans and agents

Zero runtime npm dependencies — Node 18+ stdlib + `gh` CLI only.

## Requirements

- Node.js 18+
- [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`)
- Repository access (public repos work with default scopes)

## Install

```bash
git clone https://github.com/Eliksey/issue-triage-cli.git
cd issue-triage-cli
npm test
npm link   # optional global: issue-triage
```

Or run without link:

```bash
node bin/issue-triage.js --help
node bin/issue-triage.js version
```

## Usage

```bash
# Priority-ranked scan
issue-triage scan owner/repo

# Include pull requests
issue-triage scan owner/repo --prs

# Stale after 30 days (default 21)
issue-triage scan owner/repo --stale-days 30

# Markdown report (includes agent handoff block)
issue-triage scan owner/repo --out triage-report.md

# JSON for CI / Codex pipelines
issue-triage scan owner/repo --json
issue-triage scan owner/repo --json-out triage.json

# One-screen summary
issue-triage summary owner/repo --prs

# Label suggestions only
issue-triage suggest owner/repo --limit 20
```

### Example text output

```
repo: openai/example  open: 12  stale(>21d): 4
#101  p72  [stale] security: XSS in markdown   [issue] labels: - suggest: security c:5
#98   p45  bug: crash on empty config         [issue] labels: bug
...
```

## How Codex / AI maintainers use it

This project targets the **exact maintainer loop** Codex for Open Source is built for: triage, prioritization, review, release hygiene.

1. Run `issue-triage scan org/repo --out report.md` (or `--json-out report.json`).
2. Feed the **Agent handoff** section (or JSON) into Codex/ChatGPT for prioritization and draft replies.
3. Automate weekly: cron + `gh` token → open a “triage digest” issue.
4. Use API credits (if granted) to summarize stale backlogs and draft labels/replies at scale.

### Weekly digest (cron sketch)

```bash
#!/usr/bin/env bash
set -euo pipefail
REPO="${1:?owner/repo}"
OUT="/tmp/triage-$(date +%F).md"
issue-triage scan "$REPO" --prs --out "$OUT"
gh issue create --repo "$REPO" --title "Weekly triage $(date +%F)" --body-file "$OUT" || true
```

## Configuration

```bash
cp triage.config.example.json triage.config.json
```

```json
{
  "staleDays": 21,
  "labelRules": [
    { "label": "bug", "keywords": ["crash", "error", "exception", "fails"] },
    { "label": "documentation", "keywords": ["docs", "readme", "typo"] },
    { "label": "enhancement", "keywords": ["feature", "add support", "improve"] },
    { "label": "security", "keywords": ["cve", "xss", "vulnerability"] }
  ]
}
```

## Development

```bash
npm test
node bin/issue-triage.js --help
```

See [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md).

## License

MIT — free for open-source and commercial use. See [LICENSE](LICENSE).

## Maintainer

**Primary maintainer:** [@Eliksey](https://github.com/Eliksey)

Issues and PRs welcome. Actively maintained personal OSS tool for the GitHub maintainer workflow.
