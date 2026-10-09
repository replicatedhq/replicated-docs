# Documentation Utility Scripts

This directory contains utility scripts for maintaining the Replicated documentation.

## Available Scripts

### `ci/replicated-cli-docs.sh`

Checks out the latest published Replicated CLI release tag, runs its existing
Go documentation generator (`docs/gen.go`), and uses
`ci/update-replicated-cli-docs.cjs` to regenerate the CLI reference pages and the
Replicated CLI sidebar. The installation and configuration pages are preserved.
The script creates or updates a single PR from `automation/replicated-cli-docs`.
If there are no changes, it exits without creating a PR.

The CLI release workflow dispatches `.depot/workflows/replicated-cli-docs.yml`
after publishing a release. To run it manually:

```bash
depot ci dispatch \
  --repo replicatedhq/replicated-docs \
  --workflow replicated-cli-docs.yml \
  --ref main \
  --input dry_run=false \
  --token "$DEPOT_CI_DISPATCH_TOKEN"
```

Use `--input dry_run=true` to see the generated diff in the workflow logs without
pushing a branch or opening a PR. Manual runs default to dry-run mode.

For a local preview from a clean checkout, run
`DRY_RUN=true scripts/ci/replicated-cli-docs.sh`. This updates local files but does
not commit or push them. It requires Node.js 20+, GitHub CLI authentication, Git,
and Go with support for the release's `go.mod` (automatic toolchain downloads are
supported). The workflow uses the existing `REPLICATED_GH_PAT` secret for release lookup,
branch pushes, and PRs. The source CLI repository needs `DEPOT_CI_DISPATCH_TOKEN`
with permission to dispatch this workflow.

Roll out this repository's workflow on `main` before enabling the dispatch in
the CLI release workflow. Manual runs work with existing releases that include
`docs/gen.go`; no new CLI command is needed.

The `sidebar.yml` workflow runs one compatibility test on every pull request
that changes `sidebars.js`. It loads the sidebar, runs the CLI updater with a
sample new command in a temporary directory, and verifies the updated sidebar
still loads and includes that command. It does not compare against a CLI release.
Run the same test locally with:

```bash
node --test scripts/ci/sidebar.test.cjs
```

### `update_docs_links.sh`

This script updates cross-reference link text throughout the documentation to maintain consistency when page titles change.

#### Usage

1. Edit the `patterns` array in the script to include the search and replacement patterns in the format `"[old title]:[new title]"`
   
   Example:
   ```bash
   patterns=(
     "Integrating Replicated GitHub Actions:Use Replicated GitHub Actions in CI/CD"
   )
   ```

2. Run the script from the root of the replicated-docs repository:
   ```
   bash scripts/update_docs_links.sh
   ```

3. Review the changes with `git diff`
4. Run `npm run build` to verify that links still work
5. Commit the changes

#### Features

- Updates both "see [Title]" and "See [Title]" references
- Searches in all markdown files under the docs directory
- Excludes .history directories from the search
- Reports the number of files processed and replacements made

#### Troubleshooting

If the script isn't working as expected:
- Make sure your pattern is correctly formatted with a colon separating the old and new titles
- Check that the exact text matches what's in the documentation

## Adding New Scripts

When adding new utility scripts to this directory:

- Make sure the script is executable: `chmod +x scripts/your_script.sh`
- Document the script's purpose and usage in this README
- Include helpful comments within the script itself
