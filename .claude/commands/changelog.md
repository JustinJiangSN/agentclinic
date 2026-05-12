Maintain the CHANGELOG.md at the project root. Follow these steps exactly.

## Step 1 — Gather commits

Run:
```
git log --format="%ad|%s" --date=short --no-merges
```

Each line is `DATE|SUBJECT`. Skip any line whose subject starts with "Merge".

## Step 2 — Decide: create or update

**If CHANGELOG.md does not exist:**
- Use all commits from Step 1.
- Create CHANGELOG.md from scratch.

**If CHANGELOG.md already exists:**
- Read it and find the most recent `## YYYY-MM-DD` heading.
- Filter commits from Step 1 to only those whose date is strictly after that heading's date.
- If no new commits exist, report "CHANGELOG.md is already up to date" and stop.
- Prepend the new entries above the existing file content.

## Step 3 — Format

```
# Changelog

## YYYY-MM-DD

- Commit subject
- Commit subject

## YYYY-MM-DD

- Commit subject
```

Rules:
- Most recent date at the top, just below the `# Changelog` heading.
- One `## YYYY-MM-DD` section per date.
- One bullet per commit, in log order (newest first within a date).
- No trailing blank line at end of file.
