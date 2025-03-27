const fs = require('fs');
const path = require('path');

// Recursively get all .md files from a directory
function getMDFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getMDFiles(filePath, fileList);
    } else if (path.extname(file) === '.md') {
      // Convert Windows path separators to forward slashes if needed
      const normalizedPath = filePath.replace(/\\/g, '/');
      // Remove the /docs prefix to get relative path
      const relativePath = normalizedPath.replace(/^docs\//, '');
      fileList.push(relativePath);
    }
  });

  return fileList;
}

// Generate the llms.txt file
function generateLLMsFile() {
  const docsDir = path.join(process.cwd(), 'docs');
  const mdFiles = getMDFiles(docsDir);
  
  // Create content with one file per line
  const content = mdFiles.map(file => `https://docs.cursor.com/${file}`).join('\n');
  
  // Write to llms.txt
  fs.writeFileSync('llms.txt', content);
  console.log('Generated llms.txt with', mdFiles.length, 'files');
}

// Run the generator
generateLLMsFile();
