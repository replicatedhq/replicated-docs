# [Replicated](https://www.replicated.com/) Product Documentation

Welcome to the repository for the [Replicated documentation site](https://docs.replicated.com/).

## Contribute to the Replicated Docs

This repository has been made public so that vendors and the open-source community can contribute to the content using the following methods:

- **Submit a PR** You can submit a PR directly from a specific topic in the documentation by clicking the **Create pull request or raise issue on GitHub** at the bottom of the page. This method lets you edit the content directly and commit your changes on a new branch. After submitting your proposed changes, the Replicated team will verify the accuracy of the changes and perform an editorial review. If the PR is approved, it will be merged directly into the main branch.

- **Open a Github Issue** - To open a GitHub issue for this repository, click the Issues tab and click **New Issue**. This method may be more useful when you want to report a bug specifically for the documentation. If you are having an issue with the product itself, we encourage you to report it to us in a support issue submitted in the vendor portal.

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