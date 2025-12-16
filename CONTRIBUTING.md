# Replicated Documentation Style Guide

The Replicated docs use the Google Developer Docs Style Guide: https://developers.google.com/style/

Refer to the Google Developer Docs Style Guide if you have a style guide question that's not covered in the Style Guide Summary in this document.

## Style Guide Summary

This is a summary of the most important elements of our style guide, plus some house rules that aren't captured or differ from what's in the Google Developer Docs Style Guide:

- Word Choice, Tone, and Voice:
  - Use active voice
  - Use the second person "you" to address the reader. Never use "let's" or "we" to refer to an action that the user is doing
  - Instead of "we", use "Replicated" to talk about recommendations/suggestions. As in "Replicated recommends that you test your releases..."
  - Use present tense (for example, use "returns" and not "will return")
  - Write in a friendly tone without using slang, jargon, or frivolous words
  - Avoid marketing language that is overly promotional
  - Avoid terms like "simple" or "easy"
  - Use common words. Don't use words like "utilize" or "leverage" when you mean "use". This make the docs more suitable for a global audience
  - Try to use fewer than 26 words per sentence
  - Avoid time-bound terminology like "currently", "new", "at this time", and "now". Instead, write timeless documentation that makes no assumptions about a reader's prior knowledge.

- Formatting:
  - Use bold text only to identify UI elements. For example, "Click **Save**." Do not use bold text for emphasis.
  - Use title case for titles and headings
  - Use a bare infinitive verb form for how-to titles/headings. As in, use "Create a Release" instead of "Creating a Release"
  - Procedural/how-to content must use numbered steps. For one-step procedures, use a bullet point. See https://developers.google.com/style/procedures#single-step-procedures for examples
  - Use the following formats for cross references:
    - "For more information about X, see [Topic Title](mdc:url)"
    - "For more information about X, see [Section Heading](mdc:url#section-heading) in _Topic Title_."
    - "For more information about X, see [Section Heading](#section-heading) in this document."
  - We use "Note" and "Important" admonitions.
    - Notes are for informational asides. Only use notes if the info is relevant but not required to succeed in whatever the user is doing right now. Don't use notes to state expected results or to include information that simply describes what precedes.
      ```md
      :::note
      note content
      :::
      ```
    - Important admonitions are to provide cautionary/warning messages.
    ```md
      :::impotant
      important content
      :::
      ```

## Cheatsheet for LLMs

When generating content for Replicated Docs with LLMs, add the following to the context window:

```
- Refer to the style guidelines in this repo at `CONTRIBUTING.md`
- Don't add Troubleshooting, Best Practices, Conclusion, Summary, or Next Steps sections unless specifically asked
- Never use bold text for emphasis or as section/category headings
- Don't repeat the same information mutiple times. Focus on being concise and using as few words as possible to get the point across
- Use paragraphs instead of bulleted lists unless specifically asked
```

## Use the @doc-reviewer Claude Subagent

The `@docs-reviewer` subagent reviews documentation files against this style guide and identifies issues with suggestions for fixes. You can use it to help you catch common style problems before submitting PRs.

To use it, invoke `@docs-reviewer` in Claude Desktop or Claude Code and specify the file you want reviewed.

For example:
```
@docs-reviewer please review docs/example.md
```
