# Docs release refresh

This Netlify plugin runs after a successful production deploy. It checks the
site's published deploy ID and sends Vendor API a refresh request when it matches
the deploy that just ran.

Set these variables in the Netlify production build context:

- `DOCS_RELEASE_REFRESH_URL`: the HTTPS Vendor API URL for
  `POST /v3/webhook/docs-release-refresh`, including any API path prefix.
- `DOCS_RELEASE_REFRESH_TOKEN`: the dedicated token sent in the
  `X-Docs-Release-Refresh-Token` header. Set the same
  variable on Vendor API to enable the receiver and worker.
- `DOCS_RELEASE_NETLIFY_API_TOKEN`: a Netlify token with access to read the
  docs site's details.

The plugin activates when the callback URL is configured. Apply the two Vandoor
SchemaHero tables and deploy the receiver before enabling the plugin. To import
existing release notes or recover from a missed callback, send an authenticated
POST to the same receiver. A successful request returns `202 Accepted`.

Run the local hook checks with
`node --test scripts/netlify/docs-release-refresh/index.test.js`.
