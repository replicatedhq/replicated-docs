const { setTimeout: sleep } = require('node:timers/promises');

async function refreshPublishedDeploy({ siteId, deployId, apiToken, callbackUrl, callbackToken,
  request = fetch, wait = sleep }) {
  const destination = new URL(callbackUrl);
  if (destination.protocol !== 'https:' || destination.username || destination.password) {
    throw new Error('DOCS_RELEASE_REFRESH_URL must be an HTTPS URL without credentials');
  }

  // Give the published deploy pointer a short window to catch up to onSuccess.
  const siteUrl = 'https://api.netlify.com/api/v1/sites/' + encodeURIComponent(siteId);
  let lastError;
  for (const delay of [0, 1000, 3000]) {
    if (delay) await wait(delay);
    let response;
    try {
      response = await request(siteUrl, {
        headers: { Authorization: 'Bearer ' + apiToken },
        redirect: 'error',
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      lastError = error;
      continue;
    }
    if (!response.ok) {
      lastError = new Error('Netlify site lookup returned HTTP ' + response.status);
      if (response.status < 500 && response.status !== 429) throw lastError;
      continue;
    }

    let site;
    try {
      site = await response.json();
    } catch (error) {
      lastError = error;
      continue;
    }
    lastError = undefined;
    if (site.published_deploy?.id === deployId) {
      await sendRefresh(destination, callbackToken, request, wait);
      return true;
    }
  }
  if (lastError) throw lastError;
  return false;
}

async function sendRefresh(url, token, request, wait) {
  let lastError;
  for (const delay of [0, 1000, 3000]) {
    if (delay) await wait(delay);
    let response;
    try {
      response = await request(url, {
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

  const { DOCS_RELEASE_REFRESH_URL, DOCS_RELEASE_REFRESH_TOKEN, DOCS_RELEASE_NETLIFY_API_TOKEN,
    DEPLOY_ID } = process.env;
  if (!DOCS_RELEASE_REFRESH_URL) return;
  if (!DOCS_RELEASE_REFRESH_TOKEN || !DOCS_RELEASE_NETLIFY_API_TOKEN || !DEPLOY_ID || !constants.SITE_ID) {
    utils.build.failPlugin('Docs release refresh is configured but credentials or deploy metadata are missing');
    return;
  }
  try {
    const queued = await refreshPublishedDeploy({
      siteId: constants.SITE_ID,
      deployId: DEPLOY_ID,
      apiToken: DOCS_RELEASE_NETLIFY_API_TOKEN,
      callbackUrl: DOCS_RELEASE_REFRESH_URL,
      callbackToken: DOCS_RELEASE_REFRESH_TOKEN,
    });
    console.log(queued ? 'Docs release refresh queued' : 'Docs release refresh skipped: could not confirm this deploy was published within the retry window');
  } catch (error) {
    utils.build.failPlugin('Could not queue docs release refresh: ' + error.message);
  }
}

module.exports = { onSuccess };
