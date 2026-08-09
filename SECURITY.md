# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.x     | yes       |

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Email or GitHub Security Advisories for this repository if enabled. Include:

- description of the issue
- steps to reproduce
- impact (e.g. command injection via crafted repo names, token leakage)

## Scope notes

- This CLI shells out to the local `gh` binary. Keep `gh` and your OS updated.
- Do not pass untrusted shell-interpolated strings into custom wrappers; this project uses `execFileSync` with argument arrays (no shell).
- Tokens live in `gh` auth — never commit tokens or `.env` files.

## Response

We aim to acknowledge valid reports within 7 days and ship fixes as soon as practical for a small maintainer project.
