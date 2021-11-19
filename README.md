# Replicated Docs
[View development preview](https://replicated-docs.netlify.app)

## About the Replicated docs website

This site is built with the Gatsby static site generator, and deployed with Netlify. It is based on the [smooth-doc](https://github.com/gregberge/smooth-doc/) Gatsby theme.

For more information about Gatsby, see [the Gatsby documentation](https://www.gatsbyjs.com/docs/).
For more information about Netlify, see [the Netlify documentation](https://docs.netlify.com/).

This site consumes the [smooth-asciidoc theme](https://github.com/replicatedhq/smooth-asciidoc), an
asciidoc converted fork of [smooth-doc](https://github.com/gregberge/smooth-doc/) that we maintain.

Parsing of asciidoc and basic functionality should be kept in the smooth-asciidoc theme.
Changes specific to this site happen in this repo.

**Note**: This site and the smooth-asciidoc theme
are both in early development. We have not tested much of the asciidoc syntax. A
fair amount of the functionality of the smooth-doc theme is built with mdx, and
still needs to be converted for use with asciidoc. Landing pages could optionally stay as mdx.

## Author documentation in this repository

The documentation asciidoc files are located in `pages/docs`.

After you edit any of the documentation files, submit your changes in a pull
request. This triggers a deploy preview that Netlify links in the pull request.
This allows you and the reviewer(s) to see the change results before merging.

## Preview changes locally

You can preview your changes locally as you work by running a local development server. The development server serves your local content on a localhost so that you can view it in a browser window. The browser window automatically refreshes and you save additional changes.

You can run the local development server two ways:

* **yarn and Gatsby**: You can use the yarn package manager and Gatsby to run the local development server directly on your machine. This method requires some initial local environemnt setup.
* **Docker**: You can also preview your changes using Docker. This method does not require any additional local environment setup, which makes it a good option if you are having trouble with yarn and Gatsby.

### Preview changes locally with yarn and Gatsby

We use the yarn package manager to interact with Gatsby and preview our changes locally. Using yarn helps us avoid installing Gatsby and running it globally.

The `package.json` file in our `replicated-docs` repository includes a `scripts` object that invokes Gatsby when we run a yarn command. For example, when we run `yarn develop` on the command line, `package.json` defines that command as `yarn && gatsby develop -H 0.0.0.0`. To view the `package.json` file, see [package.json](https://github.com/replicatedhq/replicated-docs/blob/main/package.json) in this repository.

#### Prerequisites

* The latest LTS version of Node.js. To install Node.js, see the [Node.js](https://nodejs.org/en/) website. Gatsby recommends that you install the latest LTS version of Node.js. For more information, see [Upgrading Your Node.js Version](https://www.gatsbyjs.com/docs/upgrading-node-js/#:~:text=Many%20of%20Gatsby's%20dependencies%20are,14%20at%20time%20of%20writing) in the Gatsby documentation.

* yarn. To install yarn with npm, run `npm install -g yarn`. To install yarn with Homebrew, run `brew install yarn`. For more information, see [Installation](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) in the yarn documentation.

#### Start the development server with yarn

This procedure describes how to use yarn to start the local development server and preview your local changes.

To start the development server:

1. `cd` into your local `replicated-docs` directory.

2. Run `yarn && yarn develop` to start the local development server. You can also run a production build locally with `yarn build && yarn serve`.

3. Copy and paste the localhost URL from your command line into a browser window to view your content locally.

If you see any error messages, try `yarn clean && yarn develop`. `yarn clean` runs `gatsby clean`, which clears the Gatsby cache and rebuilds local artifacts. This might be necessary because Gatsby does not rebuild all local artifacts each time it runs. Occassionally, an artifact that Gatsby pulled from cache must be rebuilt.

### Preview changes locally with Docker

If you are having trouble with yarn and Gatsby, you can also preview your changes with Docker.

#### Prerequisites

Docker. To install Docker, see [Get Docker](https://docs.docker.com/get-docker/) in the Docker documentation.

#### Start the development server with Docker

This procedure describes how to use Docker to preview your local changes.

To start the development server and preview your changes with Docker:

1. `cd` into your local `replicated-docs` directory.
2. Run `docker-compose up` to start the development server.

## Writing content

We use AsciiDoc to format all of our content. The following table is a quick reference for the styles we use most. For more information, see the https://asciidoctor.org/docs/asciidoc-writers-guide/#writing-in-asciidoc[AsciiDoc Writer's Guide].

[cols="1,1"]
|===
|Style |Syntax |Description

|Admonitions
|NOTE: <your text>
IMPORTANT: <your text>
|

|Code block
|[source,terminal]
----
<your_code>
----

[source,YAML]
----
<your_code>
----
| Use [source,terminal] for all types except YAML.

|Cross-references to sections within a topic
|<<section name>>
|Example: Refer to <<Installing on an existing cluster>>

|Cross reference to the top of a relative AsciiDoc document
|<<filename.adoc#,document_title>>
|See <<document-b.adoc#,Document B>> for more information.

|External links
|https://discuss.asciidoctor.org/[Asciidcotor mailing list] or https://discuss.asciidoctor.org/
|

|Images
|image::<filename.png>[alt_text]
|We require alt text for 508 compliance. We only use PNGs for images, and SVGs for diagrams.

|Lists - Ordered
|. for level 1, .. for level 2
|When writing a task, use level one for main steps, and level 2 for subtasks under a main step.

|Lists - Unordered
|*
|

|List continue
|+
|Insert `+` in the line before the text/image that

|Table
|[source,terminal]
----
[cols="1,1"]
|===
|Heading 1 |Heading 2

|Row1, Entry 1
|Row1, Entry 2

|Row 2, Entry 1
|Row 2, Entry 2
|===
----
|

|Titles and Headings
|= Document title (level 0), == Level 1 section, === Level 2 section, and so on
