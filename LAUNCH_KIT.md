# 🚀 STAR & TRAFFIC LAUNCH KIT — issue-triage-cli

This kit contains multi-channel launch campaigns to drive real open-source developer stars, npm downloads, and maintainer adoption for `Eliksey/issue-triage-cli`.

---

## 📍 1. Hacker News (Show HN)

**URL:** https://news.ycombinator.com/submit  
**Title:** Show HN: issue-triage-cli – Zero-dependency CLI for GitHub issue triage & Codex context generation

**Text:**
```text
Hi HN! As an open-source maintainer, I spent too many hours sorting through backlogs, triaging issues, and drafting release notes.

I built `issue-triage-cli` (MIT) — a zero-dependency CLI tool written in Node.js that runs on top of the official GitHub CLI (`gh`).

What it does:
1. Calculates a weighted Priority Score for open issues and PRs based on age, comments, reactions, and keywords.
2. Identifies stale issues requiring maintainer attention.
3. Suggests labels automatically based on title & body content.
4. Generates Markdown digests and structured XML/JSON payloads specifically designed for LLMs (OpenAI Codex / ChatGPT context windows).
5. Ships as a standalone GitHub Action (`uses: Eliksey/issue-triage-cli@v1.2.0`).

Repo: https://github.com/Eliksey/issue-triage-cli

I'd love your feedback on the priority scoring heuristics!
```

---

## 📍 2. Reddit — r/node

**URL:** https://www.reddit.com/r/node/submit  
**Title:** Built a zero-dependency CLI tool in Node.js to triage GitHub issues & generate AI context windows

**Text:**
```text
Hey r/node!

I recently released `issue-triage-cli` (v1.2.0), a Node.js CLI tool built using only Node 18+ stdlib and `node:test` runner.

Key Highlights:
- 0 npm dependencies (super lightweight & fast)
- Calculates priority scores for issues & PRs
- Generates JSON / XML context payloads for ChatGPT & Codex integration
- Runs locally via CLI or as a GitHub Action

Check out the source & test suite:
https://github.com/Eliksey/issue-triage-cli

If you find it useful for your projects, star the repo on GitHub! ⭐
```

---

## 📍 3. Reddit — r/opensource

**URL:** https://www.reddit.com/r/opensource/submit  
**Title:** issue-triage-cli: Open-source maintainer CLI for issue ranking & Codex LLM triage

**Text:**
```text
Hello open source maintainers!

Triage burnout is real. I built `issue-triage-cli` (MIT License) to automate the routine pass of sorting backlogs, finding stale items, and generating summaries for release notes or AI coding agents.

Repo: https://github.com/Eliksey/issue-triage-cli

Feature list:
- Priority ranking algorithm
- Stale detection
- GitHub Action wrapper (`action.yml`)
- Zero dependencies

Stars & feedback appreciated! ⭐
```

---

## 📍 4. Dev.to Article Draft

**Title:** How I Automated GitHub Issue Triage with Node.js and OpenAI Codex

**Body:**
```markdown
Maintainers carry a heavy load when reviewing pull requests, triaging issues, and tracking backlog state. 

To streamline this workflow, I created **issue-triage-cli** — an open-source MIT CLI that analyzes issues and PRs, ranks them by urgency, and formats context blocks for OpenAI Codex.

### Quick Start
```bash
git clone https://github.com/Eliksey/issue-triage-cli.git
cd issue-triage-cli
npm test
node bin/issue-triage.js scan owner/repo --prs
```

### GitHub Action Integration
Add this to your `.github/workflows/triage.yml`:
```yaml
name: Issue Triage
on:
  schedule:
    - cron: '0 9 * * 1'
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: Eliksey/issue-triage-cli@v1.2.0
```

⭐ **Check out the repository on GitHub:** [https://github.com/Eliksey/issue-triage-cli](https://github.com/Eliksey/issue-triage-cli)
```

---

## 📍 5. X / Twitter Thread

```text
🧵 1/4 Excited to announce issue-triage-cli v1.2.0! 🚀

A zero-dependency CLI tool built for open-source maintainers to rank issues, detect stale PRs, and format LLM context blocks for Codex & ChatGPT.

🔗 https://github.com/Eliksey/issue-triage-cli

2/4 📦 Zero npm dependencies — uses Node 18+ stdlib and `gh` CLI under the hood.

3/4 🤖 Exports structured XML & JSON payloads designed specifically for AI coding agents to assist with triage & review.

4/4 ⭐ Give it a star on GitHub if you find it helpful! Retweets appreciated!
```
