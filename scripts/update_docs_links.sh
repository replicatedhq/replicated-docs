#!/bin/bash

# Script to update cross-reference link text
# Run from the root of the replicated-docs repository after changing the title of one or more pages

echo "Updating cross-references..."

# Define replacement patterns with the format "[search pattern]:[replacement]"
patterns=(
  # "Adding Nodes to kURL Clusters:Add Nodes to kURL Clusters"
)

# # Count of files processed and replacements made
# files_processed=0
# replacements_made=0

echo "Searching in the /docs directory..."

# Process each file in the docs directory
# Exclude .history
find docs -type f -name "*.md*" -not -path "*/\.history/*" | while read file; do
  file_modified=false
  
  # Process each replacement pair
  for pattern_pair in "${patterns[@]}"; do
    # Split the pattern_pair into search and replacement parts
    IFS=':' read -r search replacement <<< "$pattern_pair"
    
    # Check if file contains the pattern
    if grep -q "see \[${search}\]" "$file" || grep -q "See \[${search}\]" "$file"; then
      # Make the replacements
      sed -i '' "s/see \[${search}\]/see \[${replacement}\]/g" "$file"
      sed -i '' "s/See \[${search}\]/See \[${replacement}\]/g" "$file"
      
      echo "In $file:"
      echo "  Replaced: '$search' → '$replacement'"
      
      file_modified=true
      ((replacements_made++))
    fi
  done
  
  if $file_modified; then
    ((files_processed++))
  fi
done

echo "Done!"
# echo "Files processed: $files_processed"
# echo "Total replacements made: $replacements_made"
# Instructions for verifying changes
echo "Next steps:"
echo "1. Review the changes using 'git diff'"
echo "2. Run 'npm run build' to check for broken links"
echo "3. Commit the changes if everything looks good"