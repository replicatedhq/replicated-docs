const assert = require('node:assert/strict');
const { test } = require('node:test');
const { onSuccess } = require('./index.js');

const constants = { SITE_ID: 'docs-site', IS_LOCAL: false };
const utils = { build: { failPlugin: (message) => assert.fail(message) } };

for (const [name, context, site, expectedRequests, lookupFailure] of [
  ['preview skips lookup and callback', 'deploy-preview', {}, []],
  ['published production deploy queues refresh', 'production',
    { published_deploy: { id: 'new-deploy' } }, ['GET', 'POST']],
  ['Netlify lookup retries a transient HTTP error', 'production',
    { published_deploy: { id: 'new-deploy' } }, ['GET', 'GET', 'POST'], 429],
  ['Netlify lookup retries a timeout', 'production',
    { published_deploy: { id: 'new-deploy' } }, ['GET', 'GET', 'POST'], new Error('timeout')],
  ['unpublished deploy never queues refresh', 'production',
    { published_deploy: { id: 'older-deploy' } }, ['GET', 'GET', 'GET']],
]) {
  test(name, async (t) => {
    const env = {
      CONTEXT: context,
      DEPLOY_ID: 'new-deploy',
      DOCS_RELEASE_REFRESH_URL: 'https://vendor.example/v3/webhook/docs-release-refresh',
      DOCS_RELEASE_REFRESH_TOKEN: 'callback-token',
      DOCS_RELEASE_NETLIFY_API_TOKEN: 'netlify-token',
    };
    for (const [key, value] of Object.entries(env)) {
      const previous = process.env[key];
      process.env[key] = value;
      t.after(() => {
        if (previous === undefined) delete process.env[key];
        else process.env[key] = previous;
      });
    }
    const calls = [];
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      const method = options.method || 'GET';
      calls.push(method);
      if (method === 'GET') {
        assert.equal(String(url), 'https://api.netlify.com/api/v1/sites/docs-site');
        assert.equal(options.headers.Authorization, 'Bearer netlify-token');
        if (lookupFailure && calls.length === 1) {
          if (lookupFailure instanceof Error) throw lookupFailure;
          return new Response(null, { status: lookupFailure });
        }
        return Response.json(site);
      }
      assert.equal(String(url), env.DOCS_RELEASE_REFRESH_URL);
      assert.equal(options.headers['X-Docs-Release-Refresh-Token'], 'callback-token');
      return new Response(null, { status: 202 });
    });
    await onSuccess({ constants, utils });
    assert.deepEqual(calls, expectedRequests);
  });
}
