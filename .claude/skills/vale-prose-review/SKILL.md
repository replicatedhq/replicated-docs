---
name: vale-prose-review
description: This skill should be used when the user asks to "run vale on this file", "lint this file with vale", "check this file with vale", "fix vale errors in this file", "review vale comments", "address vale suggestions", "clean up vale output", "fix vale linter output", "apply vale prose fixes", "resolve vale errors", "run vale on my diff", "vale on changed lines", "vale on the Prerequisites section" (or any named section), or shares vale linter output and asks what to change.
version: 0.2.0
---

# Vale Prose Review

A workflow for running the vale prose linter on a documentation file and automatically applying fixes for the reported issues.

## Overview

Vale is a prose linter that reports issues at three severity levels — **error**, **warning**, and **suggestion** — along with a rule name. Not every flagged item needs to be changed. Use judgment to prioritize fixes that improve clarity without distorting meaning.

## Scoping the Review

By default, the review applies to the **whole file**. Two narrower scopes are supported — check whether the user has requested one before proceeding.

### Git diff scope (changed lines only)

**When to use:** The user asks to review only their edits, the git diff, or "what I changed".

1. Run `git diff <file_path>` (or `git diff HEAD <file_path>` if the file is already staged).
2. Parse the diff to collect the line ranges of added or modified content. Each hunk header looks like `@@ -old,count +new,start @@`. Walk the `+` lines to build a set of new-file line numbers. Unchanged context lines (`space`-prefixed) do not count; removed lines (`-`-prefixed) have no new-file line number.
3. Proceed through Steps 1–5 below, but **only act on vale flags whose line number falls within the collected set**. Skip flags on unchanged lines entirely.

If `git diff` returns no output (file is clean / no local changes), tell the user and fall back to whole-file mode.

### Section scope (named heading(s) only)

**When to use:** The user names one or more section headings (e.g., "only review the Prerequisites section").

1. Read the file and scan for Markdown headings (`#`, `##`, etc.) to build a list of `(heading_text, start_line)` pairs. A section ends at the next heading of equal or higher level (or end of file).
2. Match the user's requested heading(s) against that list (case-insensitive, partial match is fine).
3. Proceed through Steps 1–5 below, but **only act on vale flags whose line number falls within the matched section range(s)**. Skip flags outside those ranges.

If no heading matches, report the mismatch and list the available headings so the user can clarify.

---

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

If a scope has been established (git diff or section), apply the line-range filter to the vale output now — discard any flag outside the allowed ranges before triaging.

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

**Exception — markdown inside HTML tables:** When `Vale.Spelling` flags a word like `_Using` inside an HTML `<td>` or `<p>` element, the cause is markdown italic syntax (`_text_`) used inside raw HTML. Do NOT add `_Using` to an accept list. Instead, convert the markdown formatting to HTML (`_foo_` → `<em>foo</em>`). See `references/vale-rules.md` for details.

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

**`Replicated.Headings`** — Apply sentence case, with three exceptions: (1) **Skip entirely** when the heading IS a CLI command name or YAML field name (e.g., `# install (Beta)`, `## helmCharts`) — those follow the thing's own casing conventions. (2) **Parentheticals reset sentence case** — `(Beta)` is correct, not `(beta)`. (3) **Kubernetes custom resource kind names stay capitalized** — `Preflight`, `SupportBundle`, `Config`, `HelmChart` are proper names; check context to confirm the word refers to a `kind:` value before lowercasing. See `references/vale-rules.md` for full patterns.

**`Replicated.WordsToAvoid`** — Remove "easy/easily", "simple/simply", "just" (when minimizing). Rephrase or omit.

**`Replicated.Acronyms`** — Spell out on first prose use: "independent software vendors (ISVs)". Subsequent uses of the short form are fine.

## Additional Resources

- **`references/vale-rules.md`** — Detailed fix patterns, edge cases, and examples for every common Replicated vale rule
- **`README.md` (repo root)** — The Replicated Docs style guide lives in the "Style Guide" section of this file. Read it when deciding how to rewrite a flagged sentence, choose word alternatives, or apply formatting conventions. This is the authoritative source — do not rely on cached knowledge of its contents.
