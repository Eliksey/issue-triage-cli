# Hacker News (Show HN) Launch Kit

## 📌 Submission URL
Submit to: `https://news.ycombinator.com/submit`

## 🏷️ Title Options (Choose one)
1. `Show HN: issue-triage-cli – Zero-dependency Node.js CLI to triage GitHub issues & format OpenAI Codex context`
2. `Show HN: issue-triage-cli v1.5.0 – Zero-dependency CLI tool for GitHub issue scoring and SARIF security reports`

## 🔗 URL Field
`https://github.com/Eliksey/issue-triage-cli`

## 💬 Top Comment / Post Text (If submitted as text post)

> Hey HN!
> 
> I built `issue-triage-cli`, a zero-dependency CLI tool in Node.js designed for open-source maintainers to triage issues, detect stale PRs, and format structured context payloads for OpenAI Codex & ChatGPT.
> 
> **Why we built it:**
> Existing triage tools either require SaaS subscriptions or heavy cloud backends. We wanted a zero-dependency CLI (`0 npm packages`) that runs instantly on Node 18+ and can be embedded directly inside GitHub Actions or local maintainer terminal scripts.
> 
> **Key Features:**
> - Priority scoring algorithm for open issues & PRs
> - OpenAI Codex XML context window payload formatter (`--codex`)
> - SARIF 2.1.0 security report output for GitHub Security tab (`--sarif`)
> - GitHub Job Summaries markdown table generation (`--summary-md`)
> - Webhooks for Slack Block Kit & Discord Embeds
> - 100% test coverage using native Node test runner (`node:test`)
> 
> Source code & documentation: https://github.com/Eliksey/issue-triage-cli
> 
> Would love your feedback and thoughts!
