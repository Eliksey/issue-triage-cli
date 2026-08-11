---
title: Building a Zero-Dependency GitHub Issue Triage CLI for OpenAI Codex & ChatGPT
published: true,
tags: nodejs, github, open-source, devops
---

# Building a Zero-Dependency GitHub Issue Triage CLI for OpenAI Codex & ChatGPT

As open-source maintainers, managing a flood of GitHub issues, pull requests, and bug reports can quickly become overwhelming. Standard triage bots often require heavy cloud setups or complex third-party SaaS subscriptions.

To solve this, we built **`issue-triage-cli`** (v1.5.0) — a lightweight, zero-dependency Node.js CLI tool designed to run locally or natively inside GitHub Actions.

## 🚀 Key Architectural Features

- **0 npm Dependencies**: Built exclusively using Node 18+ stdlib and native `node:test` runner.
- **Priority Scoring Engine**: Ranks open issues based on stale duration, labels, and maintainer activity.
- **OpenAI Codex & ChatGPT Payload Generator**: Outputs clean `<issues>` XML payloads formatted specifically for LLM context windows (`--codex`).
- **GitHub Security Integration**: Outputs SARIF 2.1.0 report files (`--sarif`) to populate GitHub Code Scanning.
- **Job Summaries**: Outputs markdown tables for `$GITHUB_STEP_SUMMARY` in CI pipelines (`--summary-md`).
- **Slack & Discord Webhooks**: Generates Block Kit and Embed JSON payloads (`--slack`, `--discord`).

## 📥 Quick Start

```bash
# Scan any public repository
npx issue-triage-cli scan facebook/react

# Generate XML context payload for OpenAI Codex
npx issue-triage-cli scan facebook/react --codex

# Output HTML Dashboard Report
npx issue-triage-cli scan facebook/react --html-out report.html
```

## 🛠️ GitHub Action Setup

Add `issue-triage-cli` directly into your `.github/workflows/triage.yml`:

```yaml
name: Issue Triage Bot
on:
  schedule:
    - cron: '0 9 * * *' # Daily at 09:00 AM

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Eliksey/issue-triage-cli@v1.5.0
        with:
          repository: '${{ github.repository }}'
          stale-days: '21'
          html-out: 'triage-report.html'
```

## 🔗 Open Source Repository

`issue-triage-cli` is 100% open source under the MIT License.

- **GitHub Repository**: [https://github.com/Eliksey/issue-triage-cli](https://github.com/Eliksey/issue-triage-cli)
- **Latest Release**: `v1.5.0`

If you find it useful for your open-source workflow, feel free to give it a star on GitHub! ⭐
