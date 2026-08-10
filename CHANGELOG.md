# Changelog

All notable changes to this project are documented in this file.

## [1.1.0] — 2026-08-10

### Added

- Priority scoring (`pNN`) for backlog ranking (stale, comments, PR, security/bug labels)
- `summary` command for one-screen maintainer snapshot
- `--json` / `--json-out` for agent/CI pipelines
- Body-aware label suggestions (title + body)
- Security + performance default label rules
- Agent handoff block in markdown reports (paste into Codex/ChatGPT)
- Priority queue (top 10) section in markdown reports

### Changed

- Default sort is priority score, then age
- Issue/PR fetch includes `body` for better suggestions

## [1.0.1] — 2026-08-09

### Added

- CONTRIBUTING, SECURITY, CODE_OF_CONDUCT
- GitHub Actions CI (`npm test` on Node 18/20/22)
- Feature request + PR templates
- Example `triage.config.example.json`
- Extra unit tests for config load and edge cases
- `version` command on CLI

### Fixed

- Safer markdown table escaping for titles with pipes

## [1.0.0] — 2026-08-08

### Added

- Initial public release
- `scan` with stale detection and markdown export
- `suggest` label heuristics
- MIT license, bug report template, README
