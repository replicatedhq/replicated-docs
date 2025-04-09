# Documentation Utility Scripts

This directory contains utility scripts for maintaining the Replicated documentation.

## Available Scripts

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