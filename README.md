# issue-triage-cli

**CLI for open-source maintainers** to triage GitHub issues and pull requests without leaving the terminal.

[![CI](https://github.com/Eliksey/issue-triage-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/Eliksey/issue-triage-cli/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](package.json)

Built for real maintainer workflows: backlog scan, stale detection, label suggestions, and markdown reports you can paste into release notes, team updates, or **AI coding agents** (Codex / ChatGPT).

## Why this exists

Maintainers spend hours clicking through the GitHub UI. This tool turns `gh` + local heuristics into a one-command triage pass:

- List open issues / PRs with age, comments, labels
- Flag stale items (no activity N days)
- Suggest labels from title/body keywords
- Export a triage report (markdown) for humans or agents

Zero runtime npm dependencies — Node 18+ stdlib + `gh` CLI only.

## Requirements

- Node.js 18+
- [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`)
- Repository access (public repos work with default scopes)

## Install

```bash
git clone https://github.com/Eliksey/issue-triage-cli.git
cd issue-triage-cli
npm test          # no install needed for runtime
npm link          # optional global: issue-triage
```

Or run without link:

```bash
node bin/issue-triage.js --help
node bin/issue-triage.js version
```

## Usage

```bash
# Scan open issues on a repo (owner/name)
issue-triage scan owner/repo

# Include pull requests
issue-triage scan owner/repo --prs

# Mark stale after 30 days (default 21)
issue-triage scan owner/repo --stale-days 30

# Write markdown report
issue-triage scan owner/repo --out triage-report.md

# Suggest labels only (no full list dump)
issue-triage suggest owner/repo --limit 20
```

### Example output

```
repo: openai/example  open: 12  stale(>21d): 4
#101  [stale] docs: fix typo in README          [issue] labels: documentation
#98   bug: crash on empty config               [issue] labels: bug  suggest: needs-repro
...
```

## How Codex / AI maintainers use it

This project targets the **exact maintainer loop** Codex for Open Source is built for: triage, prioritization, review, release hygiene.

1. Run `issue-triage scan org/repo --out report.md` locally or in CI after each sprint.
2. Feed `report.md` into Codex/ChatGPT for prioritization and draft replies.
3. Automate weekly: cron + `gh` token → open a “triage digest” issue or PR comment.
4. Use API credits (if granted) to summarize stale backlogs and draft labels/replies at scale.

## Configuration

Copy the example and edit:

```bash
cp triage.config.example.json triage.config.json
```

```json
{
  "staleDays": 21,
  "labelRules": [
    { "label": "bug", "keywords": ["crash", "error", "exception", "fails"] },
    { "label": "documentation", "keywords": ["docs", "readme", "typo"] },
    { "label": "enhancement", "keywords": ["feature", "add support", "improve"] }
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

Issues and PRs welcome. This is an actively maintained personal OSS tool for the GitHub maintainer workflow.
