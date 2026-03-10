/**
 * Version selector for the installer docs, displayed at the top of the
 * installer sidebar. Allows switching between Embedded Cluster 3.0 and 2.x.
 */
import React from 'react';
import { useHistory } from '@docusaurus/router';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import { useHistorySelector } from '@docusaurus/theme-common';

const DOCS_PLUGIN_ID = 'installer';

function getVersionMainDoc(version) {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function getVersionTargetDoc(version, activeDocContext) {
  return (
    activeDocContext.alternateDocVersions?.[version.name] ??
    getVersionMainDoc(version)
  );
}

export default function InstallerVersionSelector() {
  const history = useHistory();
  const search = useHistorySelector((h) => h.location.search);
  const hash = useHistorySelector((h) => h.location.hash);
  const versions = useVersions(DOCS_PLUGIN_ID);
  const activeDocContext = useActiveDocContext(DOCS_PLUGIN_ID);
  const { savePreferredVersionName } = useDocsPreferredVersion(DOCS_PLUGIN_ID);
  const candidates = useDocsVersionCandidates(DOCS_PLUGIN_ID);

  if (!versions?.length || versions.length <= 1) {
    return null;
  }

  const versionItems = versions.map((v) => ({ version: v, label: v.label }));
  const displayedCandidate = candidates?.[0];
  const currentItem = versionItems.find(
    (vi) => vi.version === displayedCandidate
  ) ?? versionItems[0];

  const handleChange = (e) => {
    const versionName = e.target.value;
    const item = versionItems.find((vi) => vi.version.name === versionName);
    if (!item) return;
    const targetDoc = getVersionTargetDoc(item.version, activeDocContext);
    savePreferredVersionName(versionName);
    history.push(`${targetDoc.path}${search}${hash}`);
  };

  return (
    <div className="installer-version-selector">
      <label htmlFor="installer-version-select" className="installer-version-selector__label">
        Version
      </label>
      <select
        id="installer-version-select"
        className="installer-version-selector__select"
        value={currentItem?.version.name}
        onChange={handleChange}
        aria-label="Select Embedded Cluster version"
      >
        {versionItems.map(({ version, label }) => (
          <option key={version.name} value={version.name}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
