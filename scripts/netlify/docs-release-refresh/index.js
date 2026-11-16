const { setTimeout: sleep } = require('node:timers/promises');

async function sendRefresh(callbackUrl, token) {
  const url = new URL(callbackUrl);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('DOCS_RELEASE_REFRESH_URL must be an HTTPS URL without credentials');
  }

  let lastError;
  for (const delay of [0, 1000, 3000]) {
    if (delay) await sleep(delay);
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'X-Docs-Release-Refresh-Token': token },
        redirect: 'error',
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      lastError = err;
      continue;
    }
    if (response.status === 202) return;
    lastError = new Error('Docs release refresh returned HTTP ' + response.status);
    if (response.status < 500 && response.status !== 429) break;
  }
  throw lastError;
}

async function onSuccess({ constants, utils }) {
  if (constants.IS_LOCAL || process.env.CONTEXT !== 'production') return;

  const { DOCS_RELEASE_REFRESH_URL, DOCS_RELEASE_REFRESH_TOKEN } = process.env;
  if (!DOCS_RELEASE_REFRESH_URL) return;
  if (!DOCS_RELEASE_REFRESH_TOKEN) {
    utils.build.failPlugin('Docs release refresh is configured but DOCS_RELEASE_REFRESH_TOKEN is missing');
    return;
  }
  try {
    await sendRefresh(DOCS_RELEASE_REFRESH_URL, DOCS_RELEASE_REFRESH_TOKEN);
    console.log('Docs release refresh queued');
  } catch (error) {
    utils.build.failPlugin('Could not queue docs release refresh: ' + error.message);
  }
}

module.exports = { onSuccess };
