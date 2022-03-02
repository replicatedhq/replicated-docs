# [Replicated](https://www.replicated.com/) Product Documentation

## About this repository

Welcome to the repository for the [Replicated documentation site](https://docs.replicated.com/).

This repository has been made public so that vendors and the open-source community can contribute to the content using the following methods:

- **Submit a PR** You can submit a PR directly from a specific topic in the documentation by clicking the **Create pull request or raise issue on GitHub** at the bottom of the page. This method lets you edit the content directly and commit your changes on a new branch. After submitting your proposed changes, the Replicated team will verify the accuracy of the changes and perform an editorial review. If the PR is approved, it will be merged directly into the main branch.

- **Open a Github Issue** - To open a GitHub issue for this repository, click the Issues tab and click **New Issue**. This method may be more useful when you want to report a bug specifically for the documentation. If you are having an issue with the product itself, please we encourage you to report it to us in a Zendesk ticket, Slack message, or by emailing support@replicated.com.

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
