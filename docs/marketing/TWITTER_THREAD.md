# Viral Twitter / X Launch Thread

### 🧵 Tweet 1 (Hook)
🚀 Excited to announce `issue-triage-cli` v1.5.0!

A zero-dependency Node.js CLI tool built for open-source maintainers to triage GitHub issues, detect stale PRs, and generate context payloads for OpenAI Codex & ChatGPT.

0 npm dependencies. 100% fast. 🛠️

https://github.com/Eliksey/issue-triage-cli

---

### 🧵 Tweet 2 (Core Value)
Why zero dependencies?

Standard maintainer tools pull hundreds of transitive npm packages.
`issue-triage-cli` uses ONLY Node 18+ stdlib, `gh` CLI, and the native `node:test` runner.

Fast setup. Zero supply chain risk. ⚡

---

### 🧵 Tweet 3 (AI / Codex Integration)
Need to feed GitHub issue backlogs into OpenAI Codex or ChatGPT?

Run:
`npx issue-triage-cli scan owner/repo --codex`

Outputs clean, token-optimized XML context payloads ready to paste into LLM context windows! 🤖

---

### 🧵 Tweet 4 (GitHub Actions & Security)
`issue-triage-cli` integrates natively with GitHub:
- SARIF 2.1.0 report files (`--sarif`) for GitHub Code Scanning tab
- Job Summaries (`--summary-md`) for CI step summaries
- GitHub Action (`uses: Eliksey/issue-triage-cli@v1.5.0`)

---

### 🧵 Tweet 5 (Call to Action)
Check out the source code, run it on your repositories, and give it a star on GitHub! ⭐

👉 https://github.com/Eliksey/issue-triage-cli
