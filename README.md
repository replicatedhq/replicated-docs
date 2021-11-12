# Replicated Docs

## Status

This site and the [theme](https://github.com/replicatedhq/smooth-asciidoc)
that drives it are both in very early development, not much of asciidoc syntax has been tested. A
fair amount of the functionality of smooth-doc is built with mdx, and
still needs to be converted for use with asciidoc. Landing pages could optionally stay as mdx.

## Authoring

Run locally with `yarn dev`.

If things get wonky, try `yarn clean && yarn dev`.

Run a production build locally with `yarn build && yarn serve`.

Write your asciidocs in `pages/docs/`.


## Development

Running the development server works the same for both development and authoring - see authoring
steps.

This site consumes the [smooth-asciidoc theme](https://github.com/replicatedhq/smooth-asciidoc), an
asciidoc converted fork of [smooth-doc](https://github.com/gregberge/smooth-doc/) that we maintain.
Parsing of asciidoc and basic functionality should be kept in the theme itself, while
changes specific to this site will happen in this repo.

## Meta

Built with Gatsby, deployed with Netlify.

Based on the [smooth-doc](https://github.com/gregberge/smooth-doc/) theme.
