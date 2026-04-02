#!/usr/bin/env node
/**
 * Fix broken links that point to docs which were moved to the installer docs instance.
 *
 * Mappings: old path prefix → new doc id (under /installer/{version}/)
 * - /vendor/embedded-* and /enterprise/embedded-* and /enterprise/installing-embedded*
 *   and /enterprise/updating-embedded and /reference/embedded-*
 *
 * Skips: release-notes (per user request)
 *
 * Usage: node scripts/fix-installer-links.js [--dry-run]
 *   --dry-run  Log changes without writing files
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..');

// Old path (without leading slash) → new doc id in installer
const MAPPINGS = [
  ['vendor/embedded-overview', 'embedded-overview'],
  ['vendor/embedded-disaster-recovery', 'embedded-disaster-recovery'],
  ['vendor/embedded-troubleshooting', 'embedded-troubleshooting'],
  ['vendor/embedded-using', 'embedded-using'],
  ['enterprise/installing-embedded', 'installing-embedded'],
  ['enterprise/installing-embedded-air-gap', 'installing-embedded-air-gap'],
  ['enterprise/installing-embedded-automation', 'installing-embedded-automation'],
  ['enterprise/installing-embedded-requirements', 'installing-embedded-requirements'],
  ['enterprise/embedded-manage-nodes', 'embedded-manage-nodes'],
  ['enterprise/updating-embedded', 'updating-embedded'],
  ['reference/embedded-config', 'embedded-config'],
  ['reference/embedded-cluster-install', 'embedded-cluster-install'],
  ['reference/embedded-cluster-reset', 'embedded-cluster-reset'],
];

function getAllDocFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'release-notes') continue; // skip release notes
      if (e.name === '.history') continue; // skip local history
      getAllDocFiles(full, files);
    } else if (/\.(md|mdx)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

function getVersionForFile(filePath) {
  // All installer doc content lives under v2; v3 is placeholder-only. Use v2 so links resolve.
  return 'v2';
}

function fixContent(content, version) {
  let updated = content;
  let changeCount = 0;

  for (const [oldPath, newDocId] of MAPPINGS) {
    // Match: optional leading /, oldPath, optional .md or .mdx, optional #anchor
    // Capture hash so we can preserve it
    const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(/?)(?:${escaped})(\\.mdx?)?(#[^)\\s"'\\]]*)?`,
      'gi'
    );

    const newPath = `/installer/${version}/${newDocId}`;
    updated = updated.replace(regex, (match, slash, ext, hash) => {
      changeCount++;
      return newPath + (hash || '');
    });
  }

  return { content: updated, changeCount };
}

function main() {
  const docsDir = path.join(ROOT, 'docs');
  const installerDir = path.join(ROOT, 'installer');
  const versionedDir = path.join(ROOT, 'installer_versioned_docs');

  const files = [
    ...getAllDocFiles(docsDir),
    ...getAllDocFiles(installerDir),
    ...getAllDocFiles(versionedDir),
  ];

  console.log(`Found ${files.length} doc files (excluding release-notes).`);
  if (DRY_RUN) console.log('DRY RUN - no files will be modified.\n');

  let totalReplacements = 0;
  let filesModified = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const version = getVersionForFile(file);
    const { content: updated, changeCount } = fixContent(content, version);

    if (changeCount > 0) {
      const rel = path.relative(ROOT, file);
      console.log(`${rel} (version=${version}): ${changeCount} link(s) updated`);
      totalReplacements += changeCount;
      filesModified++;
      if (!DRY_RUN) {
        fs.writeFileSync(file, updated, 'utf8');
      }
    }
  }

  console.log('\n---');
  console.log(`Files with changes: ${filesModified}`);
  console.log(`Total link replacements: ${totalReplacements}`);
  if (DRY_RUN && totalReplacements > 0) {
    console.log('\nRun without --dry-run to apply changes.');
  }
}

main();
