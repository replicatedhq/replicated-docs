# [Replicated](https://www.replicated.com/) Product Documentation

## Table of Contents:

* [For Vendors: How to Create Enterprise Documentation](#for-software-vendors-using-this-repository-to-create-your-documentation)
* [How to Contribute to the Documentation](#how-to-contribute-to-the-documentation)
* [Setting Up Local WYSIWYG Previews](#setting-up-local-wysiwyg-previews)
* [Folder Structure and TOC](#folder-structure-and-toc)
* [Topic Templates](#topic-templates)
* [Filenaming](#filenaming)
* [Images](#images)
* [Using Markdown with our Docusaurus CSS](#using-markdown-with-our-docusaurus-css)
* [Style Guidelines](#style-guidelines)
* [SME and Editorial Reviews](#sme-and-editorial-reviews)

Welcome to the repository for the [Replicated documentation site](https://docs.replicated.com/).

## For Software Vendors: Using this Repository to Create Your Documentation

Software vendors using Replicated to distribute their application can copy the documentation in this repository to create docs for their own users. The following directories contain documentation for enterprise users about how to use the Replicated admin console and the kots CLI:

* **docs/enterprise**: The `docs/enterprise` directory includes documentation for installing, updating, monitoring, and managing applications with the admin console and the kots CLI. See [`docs/enterprise`](https://github.com/replicatedhq/replicated-docs/tree/main/docs/enterprise). For the published version of the enterprise content, see [https://docs.replicated.com/enterprise](https://docs.replicated.com/enterprise/installing-overview).
* **docs/reference**: The `docs/reference` directory includes reference documentation for the kots CLI commands. This includes details on each of the kots CLI commands and associated flags. See [`docs/reference`](https://github.com/replicatedhq/replicated-docs/tree/main/docs/reference). For the published version of the kots CLI reference content, see [Installing the kots CLI](https://docs.replicated.com/reference/kots-cli-getting-started).

To create your own documentation, review the content in these directories and copy and paste the markdown files into your own repository. Edit the content as necessary to add information and terminology specific to your application, and remove content that does not apply for your use cases.

After copying the generic content from the above directories in this repository, you can then add your own application-specific content. For example, there are likely prerequisites, configuration options, and troubleshooting steps that are unique to your application.

For help getting started with writing documentation that is specific to your application, see the [vendor-docs-starter](https://github.com/replicatedhq/vendor-docs-starter) repository. The `vendor-docs-starter` repository contains templates, guidance, and examples that you can use to write the end user documentation for your application.

## How to Contribute to the Documentation

This repository has been made public so that vendors and the open-source community can contribute to the content using the following methods:

- **Submit a PR** You can submit a PR directly from a specific topic in the documentation by clicking the **Create pull request or raise issue on GitHub** at the bottom of the page. This method lets you edit the content directly and commit your changes on a new branch. After submitting your proposed changes, the Replicated team will verify the accuracy of the changes and perform an editorial review. If the PR is approved, it will be merged directly into the main branch.

- **Open a Github Issue** - To open a GitHub issue for this repository, click the Issues tab and click **New Issue**. This method may be more useful when you want to report a bug specifically for the documentation. If you are having an issue with the product itself, we encourage you to report it to us in a support issue submitted in the vendor portal.

## Setting Up Local WYSIWYG Previews

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

When you submit a PR in GitHub, Netlify builds a preview automatically. However, you can preview your changes locally. To do this, you must install `yarn` and run a build to create a Docusaurus preview in your local browser.

### Install yarn

The Yarn documentation recommends installing Yarn using the npm package manager, which comes bundled with Node.js when you install it on your system.

After you install npm, you can run the following both to install and upgrade Yarn:

```
npm install --global yarn
```

If you use Homebrew, you can run this command to install Yarn:

```
$ brew install yarn
```

### Create a Local Development Server and WYSIWYG Preview

1. Install the docusaurus package using Yarn:

  ```
  yarn add docusaurus
  ```

1. Run the following command to start a local development server and open up a browser window. Most changes are reflected live without having to restart the server. This preview shows the formatting and styles as they would render on the live site (also known as what-you-see-is-what-you-get or WYSIWYG), which can be more helpful than viewing content in a VS Code preview.

  ```
  $ yarn start
  ```

  If `yarn start` refuses to start, try reinstalling the `yarn` CLI. You do not need to uninstall `yarn` before reinstalling it. However, if you get build errors from your content, such as broken links, the Preview itself fails and error messages appear in the terminal that can help you troubleshoot the problems in the content.

## Folder Structure and TOC

The folder structure is broken into several high-level categories under the main `docs` folder: vendor, enterprise, reference, release notes.

Images are under the `static` > `images` folder.

The TOC is managed in the `sidebar.js` file. You only need to edit the `sidebar.js` file when you are adding a new topic or deleting an existing topic. The `sidebar.js` file is the one that causes most of the merge conflicts because many technical writers are working on content daily. You will need to accept the changes from other contributors if you are committing a PR.

Don't worry if you're not sure where in the TOC a new topic belongs. When you submit your PR, the Documentation team will edit it and help to find the right placement.

The right-hand TOC is created automatically when you add headings to a topic.

## Topic Templates

You can find topic templates in the `docs/templates` folder. These templates are useful for anyone creating a new topic in this repository.

If you are using the templates to create a new topic in this repository, save the new file to the correct folder (`docs/vendor`, `docs/enterprise`, `docs/reference`, etc) and be sure to follow the [filenaming convention](#filenaming).

For additional templates designed for software vendors writing the end user documentation for their applications, see the [vendor-docs-starter](https://github.com/replicatedhq/vendor-docs-starter) repository.

## Filenaming

If you are adding a new file, it must be named following our naming conventions. The file name should always start with the feature type (such as licenses, helm, or gitops). Depending on the content type, it typically also includes a secondary descriptor and a verb. Verbs are used when you are creating a task topic.

Because we author content using Markdown, you must add the `.md` the file extension to the file name.

If you are adding a new topic to an existing feature category, follow the existing naming convention for that category.

**Example: Concept topic**

`snapshots-backup-hooks.md`

**Example: Task topic**

`releases-creating-customer.md`

**Example: Tutorial**

`tutorial-ha-cluster-deploying.md`


## Images

* Screenshots are use sparingly to minimize the maintenance of out-of-date content. However, we do include some screenshots to provide context.

* Use a focused area of the UI, unless the entire screen is truly needed. If using a focused area, use approximately 400 pixels for the width. If capturing the entire screen, use a maximum of 600 pixels for the width.

* We only use PNG format, which renders a better quality and lossless compression.

* For privacy and legal purposes, do not reveal personal information, IP addresses, domain information, login credentials and so on in screenshots, code blocks, or text.

* Add _alt text_ for all images to provide accessibility. The user will hear the alt text spoken out loud by the screen reader, so it is important to use succinct text that is clear and complete. For more information about alt text formatting, see the following section.

* For images that are difficult to see, add a link below the image where the reader can view a larger version: `[View a larger version of this image](PATH-TO-LARGER-IMAGE-FILE)` where `PATH-TO-LARGER-VERSION` is the path to the larger image in the `static/images` folder. For an example, see the private registry diagram in [Connecting to a Private Image Registry](https://docs.replicated.com/vendor/packaging-private-images#about-connecting-to-an-external-registry).


## Using Markdown with our Docusaurus CSS

Replicated uses its own CSS, and Docusaurus supports its own specific Markdown syntax. The following table provides an overview of the supported syntax elements.

| Element                                     | Syntax                                                |
|---------------------------------------------|-------------------------------------------------------|
| Headings                                    | `# H1`, `## H2`, `### H3`                             |
| Bold                                        | `**bold text**`                                       |
| Italic                                      | `_italicized text_`                                    |
| Ordered List                                | `1.` First item (use `1.` for each item)              |
| Unordered List                              | `-` or `*` (for each item)                            |
| Code or command in a sentence               | ``code``                                              |
| Link - external site                        | `[Title](https://www.example.com)`                    |
| Link - topic in same folder                 | `[Title](filename) without file extension`            |
| Link - topic in different folder            | `[Title](../folder/file-name) without file extension` |
| Link - section in topic in same folder      | `[Title](file-name#section-name)`                     |
| Link - section in topic in different folder | `[Title](../folder/file-name#section-name)`           |
| Image                                       | `![alt text](images/<image-name>.png)`                |

**Note:** Alt text, used with image syntax, is parsed by screen readers to support accessibility.

### Admonitions

Note admonitions are formatted as follows:

```
:::note
text
:::
```

Important admonitions, typically used as a warning, are formatted as follows:

```
:::important
text
:::
```

### Tables

Traditional markdown for tables can be limiting. Instead, we use HTML tables, which lets us manage the width of the table columns. The template topic `procedure.md` contains an example of the HTML formatting for tables.

**Note:** There are still many instances of the old markdown table formatting in the content that was carried over from the content migration, but we do not encourage the use of it going forward.

## Style Guidelines

Whether you are editing existing content or adding a new topic, our goal is to make it task-based. The `procedure.md` template provides the formatting guidelines that you need. You can also see a published example of a task [here](https://docs.replicated.com/vendor/releases-creating-customer).

Replicated product documentation has in-house style guidelines that the Documentation team uses when reviewing your PR. Please feel free to just add the content you need, knowing that our team will be there to assist with editorial reviews and information architecture, such as TOC placement, whether to create a task, and so on. The Documentation team will actively write content, not just give editorial reviews, so we take the heavy burden off of you. We encourage your contributions in the true open-source spirit.

Replicated employees can review more information in the Documentation Style Guide in the employee handbook.


## SME and Editorial Reviews

All PRs that are submitted are reviewed by the Replicated Docs team for editorial review.

Content that is submitted by our customers and the open-source community are also reviewed by our Replicated subject matter experts (SMEs) to help ensure technical accuracy.
