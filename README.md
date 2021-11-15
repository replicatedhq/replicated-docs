# Replicated Docs
[View development preview](https://replicated-docs.netlify.app)

## Status

This site and the [theme](https://github.com/replicatedhq/smooth-asciidoc)
that drives it are both in very early development, not much of asciidoc syntax has been tested. A
fair amount of the functionality of smooth-doc is built with mdx, and
still needs to be converted for use with asciidoc. Landing pages could optionally stay as mdx.

## Authoring

The docs are located in `pages/docs`. Edit these asciidoc files, and submit your changes in a pull
request. This will trigger a deploy preview that will be linked by Netlify in the pull request,
allowing you and the reviewer(s) to see the change results before merging.

If you would like to run the site locally to view changes as you make them, follow the Local
Development steps.

## Local Development

The local development server can be run two ways: directly on your machine, which is faster but
can be complicated, or via docker, which should "just work", but startup takes a bit longer.

### Run on your machine

#### Prerequisites

1. If you don't have a newer version of Node, or you're not sure, [install it
here](https://nodejs.org/en/).

2. If you don't have yarn, or you're unsure, install it with `npm install -g yarn`.

#### Starting the server

1. Run with `yarn develop`.

2. If things get wonky, try `yarn clean && yarn develop`.

3. Run a production build locally with `yarn build && yarn serve`.

4. Write your asciidocs in `pages/docs/`.

### Run with Docker

1. If you don't have Docker on your machine, [install it](https://docs.docker.com/get-docker/).

2. Next, run `docker-compose up` from the project root.

## Meta

This site consumes the [smooth-asciidoc theme](https://github.com/replicatedhq/smooth-asciidoc), an
asciidoc converted fork of [smooth-doc](https://github.com/gregberge/smooth-doc/) that we maintain.
Parsing of asciidoc and basic functionality should be kept in the theme itself, while
changes specific to this site will happen in this repo.

Built with Gatsby, deployed with Netlify.

Based on the [smooth-doc](https://github.com/gregberge/smooth-doc/) theme.
