# [Replicated](https://www.replicated.com/) Product Documentation

## About this repository

Welcome to the repository for the [Replicated documentation site](https://docs.replicated.com/).

This repository has been made public so that vendors and the open-source community can contribute to the content using the following methods:

- **Submit a PR** You can submit a PR directly from a specific topic in the documentation by clicking the **Create pull request or raise issue on GitHub** at the bottom of the page. This method lets you edit the content directly and commit your changes on a new branch. After submitting your proposed changes, the Replicated team will verify the accuracy of the changes and perform an editorial review. If the PR is approved, it will be merged directly into the main branch.

- **Open a Github Issue** - To open a GitHub issue for this repository, click the Issues tab and click **New Issue**. This method may be more useful when you want to report a bug specifically for the documentation. If you are having an issue with the product itself, we encourage you to report it to us in a Zendesk ticket, Slack message, or by emailing support@replicated.com.

## Site Information

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

When you submit a PR in GitHub, Netlify builds a preview automatically. However, you can preview your changes locally. To do this, you must install `yarn` and run a build to create a Docusaurus preview in your local browser.

### Install yarn

Run this command to install the `yarn` CLI:

```
$ yarn
```

### Create a Local Development Server and Preview

Run the following command to start a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```
$ yarn start
```

If `yarn start` refuses to start, try reinstalling the `yarn` CLI. You do not need to uninstall `yarn` before reinstalling it. However, if you get build errors from your content, such as broken links, the Preview itself fails and error messages appear in the terminal that can help you troubleshoot the problems in the content.


### Build

This command generates static content into the `build` directory and can be served using any static contents hosting service.

```
$ yarn build
```

### Deployment

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

## Adding and Editing Content

There are several main aspects of documentation to consider when adding content to this repo.

* Folder structure and TOC
* Topic templates
* Filenaming
* Using Markdown
* Style guidelines
* SME and editorial reviews

### Folder Structure and TOC

The folder structure is broken into several high-level categories under the main `docs` folder: vendor, enterprise, reference, release notes.

Images are under the `static` > `images` folder.

The TOC is managed in the `sidebar.js` file. You only need to edit the `sidebar.js` file when you are adding a new topic or deleting an existing topic. The `sidebar.js` file is the one that causes most of the merge conflicts because many technical writers are working on content daily. You will need to accept the changes from other contributors if you are committing a PR.

Don't worry if you're not sure where in the TOC a new topic belongs. When you submit your PR, the Documentation team will edit it and help to find the right placement.

The right-hand TOC is created automatically when you add headings to a topic.

### Topic templates

Please copy the topic templates that are located in the `templates` folder to create new content. Right now we have a template for creating a procedure (`procedure.md`), which is our main form of content creation.

Save the new topic to the correct folder and be sure to follow the [filenaming convention](#filenaming).

### Filenaming

If you are adding a new file, it must be named following our naming conventions. The file name should always start with the feature type (such as licenses, helm, or gitops). Depending on the content type, it typically also includes a secondary descriptor and a verb. Verbs are used when you are creating a task topic.

Because we author content using Markdown, you must add the `.md` the file extension to the file name.

If you are adding a new topic to an existing feature category, follow the existing naming convention for that category.

**Example: Concept topic**

snapshots-backup-hooks.md

**Example: Task topic**

releases-creating-customer.md

**Example: Tutorial**

tutorial-ha-cluster-deploying.md


### Using Markdown with our Docusaurus CSS

Replicated uses its own CSS, and Docusaurus supports its own specific Markdown syntax. The following table provides an overview of the supported syntax elements.

| Element                  | Syntax           |
|-----------------------|------------------------|
| Field name | Instructions on how to complete the field, starting with a verb. |



### Style Guidelines

Whether you are editing existing content or adding a new topic, our goal is to make it task based. The `procedure.md` template provides the formatting guidelines that you need. You can also see a published example of a task [here](https://docs.replicated.com/vendor/releases-creating-customer).

Replicated product documentation has in-house style guidelines that the Documentation team will use when reviewing your PR. Please feel free to just add the content you need, knowing that our team will be there to assist with editorial reviews. We encourage your contributions in the true open-source spirit.


### SME and Editorial Reviews

All PRs that are submitted are reviewed by the Replicated Docs team for editorial review.

Content that is submitted by our customers and the open-source community are also reviewed by our Replicated subject matter experts (SMEs) to help ensure technical accuracy.
