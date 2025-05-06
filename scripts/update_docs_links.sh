#!/bin/bash

# Script to update cross-reference link text
# Run from the root of the replicated-docs repository after changing the title of one or more pages

# Define replacement patterns with the format "[search pattern]:[replacement]"
patterns=(
  # "Replicated Onboarding:Onboard to the Replicated Platform"
  # Add patterns here, one per line
  # "Old Title:New Title"
  "Configure Local Image Registries:Configure Local Image Registries in the Admin Console"
  "Configuring Local Image Registries:Configure Local Image Registries in the Admin Console"
)

# Count of files processed and replacements made
files_processed=0
replacements_made=0

echo "Updating cross-references..."
echo "Searching in the /docs directory..."

# Get all markdown files, excluding .history directories
files=$(find docs -type f -name "*.md*" -not -path "*/\.history/*")

# Process each file without using a pipe to avoid subshell issues
for file in $files; do
  file_modified=false
  
  # Process each replacement pair
  for pattern_pair in "${patterns[@]}"; do
    # Split the pattern_pair into search and replacement parts
    IFS=':' read -r search replacement <<< "$pattern_pair"
    
    # Check if file contains the pattern - look for the link format [Title]
    if grep -q "\[${search}\]" "$file"; then
      # Make the replacements - use | as delimiter instead of / to avoid issues with paths
      sed -i '' "s|\[${search}\]|\[${replacement}\]|g" "$file"
      
      echo "In $file:"
      echo "  Replaced: '$search' → '$replacement'"
      
      file_modified=true
      replacements_made=$((replacements_made+1))
    fi
  done
  
  if [ "$file_modified" = true ]; then
    files_processed=$((files_processed+1))
  fi
done

echo "Done!"
echo "Files processed: $files_processed"
echo "Total replacements made: $replacements_made"
# Instructions for verifying changes
echo "Next steps:"
echo "1. Review the changes using 'git diff'"
echo "2. Run 'npm run build' to check for broken links"
echo "3. Commit the changes if everything looks good"