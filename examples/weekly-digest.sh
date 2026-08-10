#!/usr/bin/env bash
# Weekly triage digest → GitHub issue (requires gh + issue-triage on PATH)
set -euo pipefail
REPO="${1:?usage: weekly-digest.sh owner/repo}"
OUT="$(mktemp -t triage-XXXX.md)"
issue-triage scan "$REPO" --prs --out "$OUT"
gh issue create --repo "$REPO" \
  --title "Weekly triage digest $(date +%F)" \
  --body-file "$OUT"
rm -f "$OUT"
