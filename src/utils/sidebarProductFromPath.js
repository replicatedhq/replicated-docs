/**
 * Maps current doc path to a product name for the sidebar heading.
 * Built from the same sidebar configs as sidebars.js so product boundaries stay in sync.
 *
 * Order matters: first sidebar that contains a doc id wins (main sidebar is not listed,
 * so main docs get no product heading).
 */

function extractDocIds(items, ids = new Set()) {
  if (!items || !Array.isArray(items)) return ids;
  for (const item of items) {
    if (typeof item === 'string') {
      ids.add(item);
    } else if (item && typeof item === 'object' && item.items) {
      extractDocIds(item.items, ids);
    }
  }
  return ids;
}

// Sidebar module path (from repo root) -> display name
const SIDEBAR_CONFIG = [
  ['vendorPortalSidebar', 'Vendor Portal'],
  ['enterprisePortalSidebar', 'Enterprise Portal'],
  ['securityCenterSidebar', 'Security Center (Alpha)'],
  ['compatibilityMatrixSidebar', 'Compatibility Matrix'],
  ['kotsSidebar', 'KOTS'],
  ['kurlSidebar', 'kURL'],
  ['helmSidebar', 'Helm installations with Replicated'],
  ['replicatedSdkSidebar', 'Replicated SDK'],
  ['troubleshootSidebar', 'Troubleshoot'],
  ['proxyRegistrySidebar', 'Replicated proxy registry'],
];

// Lazy-build docId -> product name (avoids require at module load if not needed)
let docIdToProduct = null;

function buildDocIdMap() {
  if (docIdToProduct) return docIdToProduct;
  docIdToProduct = {};
  try {
    const sidebars = [
      require('../../sidebarVendorPortal'),
      require('../../sidebarEnterprisePortal'),
      require('../../sidebarSecurityCenter'),
      require('../../sidebarCompatibilityMatrix'),
      require('../../sidebarKots'),
      require('../../sidebarKurl'),
      require('../../sidebarHelm'),
      require('../../sidebarReplicatedSdk'),
      require('../../sidebarTroubleshoot'),
      require('../../sidebarProxyRegistry'),
    ];
    SIDEBAR_CONFIG.forEach(([key, name], i) => {
      const items = sidebars[i]?.[key];
      if (!items) return;
      const ids = extractDocIds(items);
      ids.forEach((id) => {
        if (!docIdToProduct[id]) docIdToProduct[id] = name;
      });
    });
  } catch (e) {
    console.warn('[sidebarProductFromPath] Could not load sidebars:', e.message);
  }
  return docIdToProduct;
}

/**
 * Path prefix for the installer docs (separate plugin). Takes precedence over main-docs mapping.
 */
const INSTALLER_PREFIX = '/installer';
const INSTALLER_NAME = 'Embedded Cluster';

/**
 * @param {string} path - Current doc path (e.g. /vendor/kurl-about or /intro-kots)
 * @returns {{ name: string } | null} Product to show in sidebar heading, or null for main/generic docs
 */
export function getProductForPath(path) {
  if (!path || typeof path !== 'string') return null;

  // Installer (separate docs plugin) has its own path prefix
  if (path.startsWith(INSTALLER_PREFIX)) {
    return { key: 'installer', name: INSTALLER_NAME };
  }

  const docId = path.replace(/^\//, '');
  const map = buildDocIdMap();
  const name = map[docId];
  if (!name) return null;

  // Use a stable key for main-docs product sidebars (for transition/animation)
  const key = docId.split('/')[0] + '-' + name.replace(/\s+/g, '-').toLowerCase().slice(0, 12);
  return { key, name };
}
