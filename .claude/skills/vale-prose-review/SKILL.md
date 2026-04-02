---
name: vale-prose-review
description: This skill should be used when the user asks to "run vale on this file", "lint this file with vale", "check this file with vale", "fix vale errors in this file", "review vale comments", "address vale suggestions", "clean up vale output", "fix vale linter output", "apply vale prose fixes", "resolve vale errors", or shares vale linter output and asks what to change.
version: 0.2.0
---

# Vale Prose Review

A workflow for running the vale prose linter on a documentation file and automatically applying fixes for the reported issues.

## Overview

Vale is a prose linter that reports issues at three severity levels — **error**, **warning**, and **suggestion** — along with a rule name. Not every flagged item needs to be changed. Use judgment to prioritize fixes that improve clarity without distorting meaning.

## Workflow

### Step 1: Run vale (or use provided output)

If the user has not already provided vale output, run vale on the target file from the repo root (where `.vale.ini` lives):

```bash
vale --output=line <file_path>
```

The `--output=line` flag produces one flag per line in the format:
```
<file>:<line>:<col>:<rule>:<message>
```

Read the target file before making any changes.

### Step 2: Locate the vale accept lists (for spelling errors)

In Replicated docs repos, accept lists live at:
- `styles/config/vocabularies/TechJargon/accept.txt` — acronyms, protocols, general tech terms
- `styles/config/vocabularies/ReplicatedTerms/accept.txt` — Replicated-specific product terms
- `styles/config/vocabularies/ThirdPartyProducts/accept.txt` — third-party tool and product names

Read whichever lists are relevant before deciding how to handle `Vale.Spelling` errors.

### Step 3: Triage and fix by severity

Work through the flagged items in severity order: **errors first**, then **warnings**, then **suggestions**. For each item:

1. Read the flagged line in context
2. Determine whether to fix, add to accept list, or skip (see rule guidance in `references/vale-rules.md`)
3. Apply the change

### Step 4: Skip non-prose lines

Do not apply prose fixes to:
- Import/require statements (e.g., MDX `import X from "..."`)
- Inline code spans and code blocks
- URLs and file paths
- YAML frontmatter values

Vale sometimes flags these; ignore those warnings.

### Step 5: Verify

After making all changes, do a quick pass to confirm:
- No introduced grammatical errors
- Product names and proper nouns remain correctly capitalized
- Meaning is preserved in all rewritten sentences

## Severity Guidance

| Severity | Default action |
|---|---|
| **error** | Always fix or add to accept list |
| **warning** | Fix unless rewrite loses important meaning |
| **suggestion** | Fix where the improvement is clear; skip where it hurts readability |

## Quick Rule Reference

See `references/vale-rules.md` for full fix patterns, before/after examples, and edge cases for every rule.

### Most common rules at a glance

**`Vale.Spelling`** — Add legitimate technical terms/acronyms to the right accept list; fix actual typos in prose.

**`Replicated.Passive`** — Convert passive to active: "can be used to [do X]" → "use [it] to [do X]". See the full pattern table in the reference file.

**`Replicated.SentenceLength`** — Split or condense sentences over ~26 words at natural break points (semicolons, "and also", between distinct ideas).

**`Replicated.PositionalLanguage`** — Replace "above/below" with "the following" or a section link; replace directional "right/left" with "the following" or a UI element name.

**`Replicated.Headings`** — Apply sentence case: lowercase all words except the first word and proper nouns (product names, trademarks).

**`Replicated.WordsToAvoid`** — Remove "easy/easily", "simple/simply", "just" (when minimizing). Rephrase or omit.

**`Replicated.Acronyms`** — Spell out on first prose use: "independent software vendors (ISVs)". Subsequent uses of the short form are fine.

## Additional Resources

- **`references/vale-rules.md`** — Detailed fix patterns, edge cases, and examples for every common Replicated vale rule
