# Contributing to issue-triage-cli

Thanks for helping maintainers spend less time in the GitHub UI.

## Development setup

```bash
git clone https://github.com/Eliksey/issue-triage-cli.git
cd issue-triage-cli
# no runtime npm deps — Node 18+ stdlib only
npm test
node bin/issue-triage.js --help
```

Requirements:

- Node.js 18+
- [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`) for live `scan` / `suggest`

## Project layout

| Path | Role |
|------|------|
| `bin/issue-triage.js` | CLI entry |
| `src/cli.js` | argv parse, commands |
| `src/triage.js` | stale + label heuristics, reports |
| `src/gh.js` | `gh` JSON wrappers |
| `src/config.js` | defaults + `triage.config.json` |
| `test/` | `node:test` suite |

## Commands to verify before PR

```bash
npm test
node bin/issue-triage.js --help
# optional live (needs gh auth):
# node bin/issue-triage.js scan Eliksey/issue-triage-cli --prs
```

## Pull requests

1. Fork + branch from `main`
2. Keep changes focused (one concern per PR)
3. Add/adjust tests for behavior changes
4. Update README if CLI flags or config change
5. Open PR with: what / why / how tested

## Issue reports

Use the Bug report or Feature request templates. Include:

- exact command
- Node + `gh` versions
- OS
- expected vs actual

## Code style

- CommonJS (`require` / `module.exports`)
- `'use strict'`
- no unnecessary dependencies — prefer Node built-ins
- fail with clear `Error` messages, exit code 1

## License

By contributing you agree your contributions are licensed under the MIT License.
