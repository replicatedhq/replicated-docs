# [Replicated](https://www.replicated.com/) Product Documentation

Welcome to the repository for the [Replicated documentation site](https://docs.replicated.com/).

## Contribute to Replicated Docs

This repository has been made public so that the Replicated community can contribute to the content.

### Submit a PR

You can submit a PR directly from a specific topic in the documentation by clicking **Propose Changes** at the bottom of the page. This method lets you edit the content directly and commit your changes on a new branch. After submitting your proposed changes, the Replicated Docs team will verify the accuracy of the changes and perform an editorial review. If the PR is approved, it will be merged directly into the main branch.

### Open a Github Issue

You can open a GitHub issue in this repo to provide feedback or report a bug for the documentation. To open an issue, either go to **Issues > New Issue** in this repo in GitHub, or click **Provide Feedback** at the bottom of any page in the documentation.

If you are having an issue with the product itself, report it to the Replicated team in a support issue submitted in the Vendor Portal.

## Style Guide

The Replicated docs use the Google Developer Docs Style Guide: https://developers.google.com/style/. Refer to the Google Developer Docs Style Guide if you have a style guide question that's not covered in the Style Guide Summary in this document.

The following is a summary of the most important elements of our style guide, plus some house rules that aren't captured or differ from what's in the Google Developer Docs Style Guide:

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

### Cheatsheet for Generating Content with LLMs

When generating content for Replicated Docs with LLMs, add the following to the context window:

```md
- Refer to the style guidelines in this repo at `README.md`
- Don't add Troubleshooting, Best Practices, Conclusion, Summary, or Next Steps sections unless specifically asked
- Never use bold text for emphasis or as section/category headings
- Don't repeat the same information mutiple times. Focus on being concise and using as few words as possible to get the point across
- Use paragraphs instead of bulleted lists unless specifically asked
```

### Use the @doc-reviewer Claude Subagent

The `@docs-reviewer` subagent reviews documentation files against this style guide and identifies issues with suggestions for fixes. You can use it to help you catch common style problems before submitting PRs.

To use it, invoke `@docs-reviewer` in Claude Desktop or Claude Code and specify the file you want reviewed.

For example:
```
@docs-reviewer please review docs/example.md
```

## Folder Structure and Sidebar

The folder structure is broken into several high-level categories under the main `docs` folder: vendor, enterprise, reference, release notes.

Images are under the `static` > `images` folder.

The TOC is managed in the `sidebar.js` file. You only need to edit the `sidebar.js` file when you are adding a new topic or deleting an existing topic. The `sidebar.js` file is the one that causes most of the merge conflicts because many technical writers are working on content daily. You will need to accept the changes from other contributors if you are committing a PR.

Don't worry if you're not sure where in the TOC a new topic belongs. When you submit your PR, the Documentation team will edit it and help to find the right placement.

The right-hand TOC is created automatically when you add headings to a topic.

## Setting Up Local WYSIWYG Previews

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

When you submit a PR in GitHub, Netlify builds a preview automatically. However, you can preview your changes locally using Node.js and npm. This repository uses npm as its package manager.

### Prerequisites

- Node.js version 18 or higher
- npm (comes bundled with Node.js)

### Start the local dev server with `npm start`

1. Install dependencies using npm:

  ```bash
  npm install
  ```

2. Start a local development server in a browser window:

  ```bash
  npm start
  ```

Most changes are reflected live without having to restart the server (changes to the sidebar file typically require restarting the dev server). This preview shows the formatting and styles as they would render on the live site.

If you encounter any build errors, they will appear in the terminal and often indicate issues like broken links or formatting problems in the content.

## Build and test locally with `npm run build` and `npm run serve`

Before pushing changes to the remote repository, build and serve the site locally to check for errors, including broken links.

1. Install dependencies using npm:

  ```bash
  npm install
  ```
1. Build the static site files:
   
   ```bash
   npm run build
   ```
   Any broken links and anchor links are listed in the output.

1. Serve the `build` directory locally to test:

   ```bash
   npm run serve
   ```

## Replicated Documentation for LLMs

Replicated supports the [llms.txt](https://llmstxt.org/) convention for making documentation available to LLMs.

- [llms.txt](https://docs.replicated.com/llms.txt): This file contains Markdown versions of key docs pages.
- [llms-full.txt](https://docs.replicated.com/llms-full.txt): This file contains the contents of the docs/ directory in the [replicated-docs](https://github.com/replicatedhq/replicated-docs) repository.

### How LLM Files Are Generated

The `static/js/generate-llms.js` script generates LLM files and plain Markdown versions of documentation pages:
   - `static/llms.txt`: Curated list of key documentation pages
   - `static/llms-full.txt`: Complete archive of all documentation
   - Plain `.md` files in `static/vendor/`, `static/enterprise/`, `static/reference/`, and `static/release-notes/`

This script runs automatically with the `prebuild` npm hook before every production build. The `prebuild` hook is defined in `package.json`. To ensure the `prebuild` npm hook runs, the Netlify build command must be `npm run build` (not `docusaurus build`).

Generated files are excluded from version control (listed in `.gitignore`) because they are created fresh on every build.