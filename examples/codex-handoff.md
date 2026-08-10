# Feeding triage output into Codex / ChatGPT

1. Generate a report:

```bash
issue-triage scan owner/repo --prs --out triage.md
# or
issue-triage scan owner/repo --json-out triage.json
```

2. Open `triage.md` and copy the **Agent handoff** fenced block.

3. Prompt template:

```
You are assisting an OSS maintainer. Here is today's triage snapshot.
For each top priority: (1) restate the problem, (2) propose label changes,
(3) draft a short maintainer reply, (4) say close / keep / need-info.
Do not invent issue numbers not in the list.

[paste agent handoff or JSON]
```

4. Human reviews every AI suggestion before applying labels or closing issues.
