/**
 * Maps current doc path to a product identifier for the sidebar.
 * Used by Desktop/Mobile DocSidebar to show the version selector
 * and drive the slide transition when entering/leaving the embedded cluster docs.
 */

const EC_PREFIX = '/embedded-cluster';
const EC_NAME = 'Embedded Cluster';

/**
 * @param {string} path - Current doc path (e.g. /embedded-cluster/v2/embedded-overview)
 * @returns {{ key: string, name: string } | null}
 */
export function getProductForPath(path) {
  if (!path || typeof path !== 'string') return null;

  if (path.startsWith(EC_PREFIX)) {
    return { key: 'embedded-cluster', name: EC_NAME };
  }

  return null;
}
