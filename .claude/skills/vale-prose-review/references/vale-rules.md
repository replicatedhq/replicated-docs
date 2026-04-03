# Vale Rule Reference

Detailed fix patterns and examples for every common Replicated vale rule.

---

## Vale.Spelling (error)

### When to add to an accept list

Add the term to an accept list when vale doesn't recognize a legitimate word. Choose the right list:

| List | Use for |
|---|---|
| `TechJargon/accept.txt` | Acronyms, protocols, general tech terminology (e.g., ISV, ISVs, RBAC, CVE, SDK) |
| `ReplicatedTerms/accept.txt` | Replicated product and UI terms (e.g., KOTS, kURL, CMX) |
| `ThirdPartyProducts/accept.txt` | Third-party tool and product names (e.g., Helm, OpenShift, Prometheus) |

Add the exact form flagged (e.g., if `ISVs` is flagged, add `ISVs`; add both `ISV` and `ISVs` if both forms are used).

### When to fix in prose

Fix if the flagged word is a genuine misspelling. Vale flags these as errors, so fix them in the file.

### Edge cases to skip

- Import/component names in MDX files (e.g., `import SDKOverview from "..."`) — these are code, not prose
- Flagged words inside inline code or code blocks
- Acronyms in YAML frontmatter keys

---

## Replicated.Passive (suggestion)

Convert passive constructions to active voice where the subject is clear and the rewrite is natural.

### Common patterns

| Passive | Active rewrite |
|---|---|
| "can be used to [do X]" | "use [it] to [do X]" or "you can use [it] to [do X]" |
| "is used by X to [do Y]" | "X uses [it] to [do Y]" |
| "are designed to [do X]" | replace with direct verb: "support", "enable", "allow" |
| "is installed [by/in X]" | "X installs [it]" or "install [it] in X" |
| "are promoted to [channel]" | "vendors promote [releases] to [channel]" |
| "are subscribed to" | "subscribe to" or "to which they subscribe" |
| "be developed against" | "develop against" or "you can develop against" |
| "be interacted with" | "interact with" |
| "be used" (general) | rephrase with active subject |

### When to skip

- When the subject of the action is genuinely unknown or unimportant (true passive is acceptable)
- When the rewrite would be awkward or change the emphasis in a way that hurts the sentence
- "is embedded" when used as an adjective describing the product concept (e.g., "_embedded_ Kubernetes")

---

## Replicated.SentenceLength (suggestion)

Aim for sentences of 26 words or fewer.

### How to shorten

1. **Split at natural breaks**: semicolons, "and also", "which", or between two distinct ideas
2. **Remove filler**: "in order to" → "to"; "at any time" → remove if implied
3. **Tighten lists**: if a sentence lists 3+ items, consider whether each item needs a clause or can be a single word/phrase
4. **Convert relative clauses**: "a portal where customers can view X" → "a portal for viewing X"

### When to skip

- Sentence length suggestions on bullet list items where splitting would create an awkward fragment
- Lead-in sentences for images/diagrams — these often need to name several items
- Sentences that would lose important connective meaning if split

---

## Replicated.PositionalLanguage (warning)

Avoid directional and spatial language that assumes a page layout. Users may be reading in a different format.

### Replacements

| Flagged word | Replacement |
|---|---|
| "above" (referring to content earlier on the page) | "the preceding section", link to the section, or restructure |
| "above" (referring to an image just shown) | "in the diagram" or remove the phrase |
| "below" (referring to content later on the page) | "the following", "the following sections", or link |
| "below" (referring to an image immediately after) | "in the following diagram" |
| "right" / "left" (directional on page) | "the following", or rephrase to remove layout reference |
| "on the right" / "on the left" | describe the UI element by name instead |

### Edge cases

- "right" meaning "correct" or "appropriate" (e.g., "the right access") → replace with "correct" or "appropriate" to avoid the flag
- "above" in a non-layout context (e.g., "above the fold", "the above example") → rewrite to avoid

---

## Replicated.Headings (warning)

Headings should use sentence case: capitalize only the first word and proper nouns.

### Skip this rule entirely for reference page headings

Do NOT apply sentence case to headings that are the exact name of a CLI command, YAML field, or other code identifier. These headings document the thing itself, so their capitalization is determined by the thing's own conventions, not sentence case.

**Skip examples (leave unchanged):**
- `# install (Beta)` — CLI command name; do not capitalize "install"
- `# create-join-bundle (Beta)` — CLI command name
- `### helmCharts` — YAML field name; do not change to `### HelmCharts`
- `#### roles.controller` — dotted YAML field path
- `## metadata` — YAML field name
- `## unsupportedOverrides` — YAML field name

### Parentheticals reset sentence case

A parenthetical like `(Beta)` or `(Preview)` opens a new "sentence" within the heading. Capitalize the first word inside the parenthetical.

- `(Beta)` is correct — **not** `(beta)`
- `(Preview)` is correct — **not** `(preview)`
- `(Deprecated)` is correct — **not** `(deprecated)`

### Kubernetes custom resource kinds — always capitalize

Custom resource kind names are proper names and must remain capitalized wherever they appear in headings, even mid-sentence. The key examples in Replicated docs:

- `Preflight`
- `SupportBundle`
- `Config`
- `HelmChart`

**How to decide:** Look at the surrounding context. If the page or section is about a Kubernetes custom resource and the word refers to its `kind:` value, keep it capitalized. If the word is used in a different sense (for example, `config` as a generic noun, or `install` as a CLI command), lowercase it per the normal rules.

**Examples:**
- `## About the Preflight custom resource` — `Preflight` is the kind name, keep capital P
- `## Configure your HelmChart` — `HelmChart` is the kind name, keep capital H
- `## Embedded Cluster Config` — `Config` is the kind name (`kind: Config`), keep capital C
- `## Override the k0s config` — `config` here is a generic noun referring to a k0s configuration file, lowercase is correct

### What to capitalize (proper nouns and trademarks)

- Replicated product names: Embedded Cluster, KOTS, Vendor Portal, Enterprise Portal, Compatibility Matrix, Replicated SDK, Admin Console, Replicated CLI
- Third-party product names: Kubernetes, Helm, Docker, AWS, etc.
- Acronyms that are always all-caps: CMX, KOTS, API, CLI

### What to lowercase

- Descriptive words that aren't proper names: "config", "overview", "lifecycle", "portal" (when standalone), "guide", "about"
- Capitalized common words mid-heading: "Matrix" → "matrix" (when not a product name), "Values" → "values", "Built-In" → "built-in"

### Examples

| Before | After |
|---|---|
| `### Compatibility Matrix` | `### Compatibility matrix` |
| `### Enterprise Portal (Beta)` | `### Enterprise Portal (Beta)` ← keep capital B |
| `## Commercial Software Distribution Lifecycle` | `## Commercial software distribution lifecycle` |
| `### Vendor Portal Overview` | `### Vendor Portal overview` |
| `# install (Beta)` | `# install (Beta)` ← CLI command, do not change |
| `### helmCharts` | `### helmCharts` ← YAML field, do not change |

**Note:** Only headings are subject to this rule. Body text references to product names keep their standard capitalization.

---

## Replicated.WordsToAvoid (warning)

Avoid words that minimize user effort or make subjective difficulty claims.

### Common flagged words and replacements

| Flagged word | Replacement strategy |
|---|---|
| "easy" / "easily" | Remove the word, or replace with a neutral adverb ("quickly", "directly") if needed |
| "simple" / "simply" | Remove, or replace with "directly" / the action verb itself |
| "just" (minimizing) | Remove — e.g., "just click" → "click" |
| "obviously" | Remove |
| "straightforward" | Remove or replace with specific description |

### Examples

| Before | After |
|---|---|
| "Licenses are customized to each customer and are easy to issue, manage, and update." | "Customize licenses for each customer and issue, manage, and update them as needed." |
| "Simply run the following command." | "Run the following command." |
| "It's easy to configure the SDK." | "To configure the SDK, ..." |

---

## Replicated.Acronyms (suggestion)

Spell out the full term on first prose use in the document, then use the acronym freely.

### Format

> Full term (ACRONYM)

Example: "independent software vendors (ISVs)"

### When to skip

- The acronym is in an import or variable name (code, not prose)
- The acronym was already spelled out earlier in the same file
- The acronym is universally known (e.g., API, CLI, URL) — use judgment about the audience

### First-use placement

- Spell out in the first body paragraph where the term appears, not in a heading
- If the term only appears in headings, spell it out in the first sentence of the section

