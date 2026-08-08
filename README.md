# issue-triage-cli

**CLI for open-source maintainers** to triage GitHub issues and pull requests without leaving the terminal.

Built for real maintainer workflows: backlog scan, stale detection, label suggestions, and markdown reports you can paste into release notes or team updates.

## Why this exists

Maintainers spend hours clicking through the GitHub UI. This tool turns `gh` + local heuristics into a one-command triage pass:

- List open issues / PRs with age, comments, labels
- Flag stale items (no activity N days)
- Suggest labels from title/body keywords
- Export a triage report (markdown)

## Requirements

- Node.js 18+
- [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`)
- Repository access (public repos work with default scopes)

## Install

```bash
git clone https://github.com/Eliksey/issue-triage-cli.git
cd issue-triage-cli
npm install
npm link   # optional global: issue-triage
```

Or run without link:

```bash
node bin/issue-triage.js --help
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
repo: openai/example  open issues: 12  stale(>21d): 4
#101  [stale] docs: fix typo in README          labels: documentation
#98   bug: crash on empty config               labels: bug, needs-repro
...
```

## How Codex / AI maintainers use it

1. Run `issue-triage scan org/repo --out report.md` in CI or locally after each sprint.
2. Feed `report.md` into Codex/ChatGPT for prioritization and draft replies.
3. Automate weekly: cron + `gh` token → open a “triage digest” issue.

This is the exact maintainer loop Codex for Open Source is designed to accelerate (triage, review, release hygiene).

## Configuration

Optional `triage.config.json` in repo root:

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

## License

MIT — free for open-source and commercial use.

## Maintainer

Primary maintainer: [@Eliksey](https://github.com/Eliksey)

Issues and PRs welcome.
