/**
 * Version selector for the installer docs, displayed at the top of the
 * installer sidebar. Uses Docusaurus dropdown styles to match navbar dropdowns.
 */
import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import { useHistorySelector } from '@docusaurus/theme-common';
import clsx from 'clsx';

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
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const search = useHistorySelector((h) => h.location.search);
  const hash = useHistorySelector((h) => h.location.hash);
  const versions = useVersions(DOCS_PLUGIN_ID);
  const activeDocContext = useActiveDocContext(DOCS_PLUGIN_ID);
  const { savePreferredVersionName } = useDocsPreferredVersion(DOCS_PLUGIN_ID);
  const candidates = useDocsVersionCandidates(DOCS_PLUGIN_ID);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, []);

  if (!versions?.length || versions.length <= 1) {
    return null;
  }

  const versionItems = versions.map((v) => ({ version: v, label: v.label }));
  const displayedCandidate = candidates?.[0];
  const currentItem = versionItems.find(
    (vi) => vi.version === displayedCandidate
  ) ?? versionItems[0];

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'installer-version-selector',
        'dropdown',
        'dropdown--nocaret',
        { 'dropdown--show': showDropdown }
      )}
    >
      <button
        type="button"
        className="installer-version-selector__trigger"
        onClick={() => setShowDropdown((v) => !v)}
        aria-haspopup="true"
        aria-expanded={showDropdown}
        aria-label="Select Embedded Cluster version"
      >
        <span className="installer-version-selector__trigger-label">
          {currentItem?.label}
        </span>
        <svg
          className="installer-version-selector__trigger-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul className="dropdown__menu">
        {versionItems.map(({ version, label }) => {
          const targetDoc = getVersionTargetDoc(version, activeDocContext);
          const to = `${targetDoc.path}${search}${hash}`;
          const isActive = version === currentItem?.version;
          return (
            <li key={version.name}>
              <Link
                className={clsx('dropdown__link', {
                  'dropdown__link--active': isActive,
                })}
                to={to}
                onClick={() => {
                  savePreferredVersionName(version.name);
                  setShowDropdown(false);
                }}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}