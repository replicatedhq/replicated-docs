const assert = require('node:assert/strict');
const { test } = require('node:test');
const { onSuccess } = require('./index.js');

const callbackUrl = 'https://vendor.example/v3/webhook/docs-release-refresh';
const callbackToken = 'callback-token';

for (const { name, context = 'production', isLocal = false, url = callbackUrl,
  token = callbackToken, statuses = [], failure } of [
  { name: 'production queues an authenticated refresh with no deploy metadata', statuses: [202] },
  { name: 'preview skips the callback', context: 'deploy-preview' },
  { name: 'branch deploy skips the callback', context: 'branch-deploy' },
  { name: 'local build skips the callback', isLocal: true },
  { name: 'disabled callback skips the request', url: '' },
  { name: 'configured callback requires a token', token: '', failure: /DOCS_RELEASE_REFRESH_TOKEN is missing/ },
  { name: 'callback requires HTTPS', url: 'http://vendor.example/refresh', failure: /must be an HTTPS URL/ },
  { name: 'callback retries a transient error', statuses: [503, 202] },
  { name: 'callback reports a permanent error', statuses: [401], failure: /HTTP 401/ },
]) {
  test(name, async (t) => {
    const env = {
      CONTEXT: context,
      DOCS_RELEASE_REFRESH_URL: url,
      DOCS_RELEASE_REFRESH_TOKEN: token,
    };
    for (const [key, value] of Object.entries(env)) {
      const previous = process.env[key];
      process.env[key] = value;
      t.after(() => {
        if (previous === undefined) delete process.env[key];
        else process.env[key] = previous;
      });
    }

    let requests = 0;
    t.mock.method(globalThis, 'fetch', async (destination, options) => {
      assert.equal(String(destination), callbackUrl);
      assert.equal(options.method, 'POST');
      assert.equal(options.headers['X-Docs-Release-Refresh-Token'], callbackToken);
      assert.equal(options.redirect, 'error');
      return new Response(null, { status: statuses[requests++] });
    });

    const failures = [];
    const utils = { build: { failPlugin: (message) => failures.push(message) } };
    await onSuccess({ constants: { IS_LOCAL: isLocal }, utils });

    assert.equal(requests, statuses.length);
    assert.equal(failures.length, failure ? 1 : 0);
    if (failure) assert.match(failures[0], failure);
  });
}
