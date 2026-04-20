/**
 * LLM Documentation Generator
 * 
 * This script generates LLM-accessible documentation files by processing all markdown
 * files in the docs/ directory. It runs automatically via the prebuild npm hook.
 * 
 * Output files:
 * - static/llms.txt - Hand-curated (tracked in git); not produced by this script
 * - static/llms-full.txt - Complete archive of all documentation (generated; gitignored)
 * - static/vendor/*.md - Plain markdown copies of vendor docs
 * - static/embedded-cluster/**/*.md - Plain markdown copies of Embedded Cluster docs (v2/v3)
 * - static/enterprise/*.md - Plain markdown copies of enterprise docs
 * - static/reference/*.md - Plain markdown copies of reference docs
 * - static/release-notes/*.md - Plain markdown copies of release notes
 * 
 * Requirements:
 * - Must be run via `npm run build` (or `npm run generate-llms`) to execute
 * - Netlify build command MUST be `npm run build`, not `docusaurus build` directly
 * - Most generated outputs are excluded from git via .gitignore (see `.gitignore`)
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, "../../docs");
const EC_V3_DOCS_DIR = path.join(__dirname, "../../embedded-cluster");
const EC_DOCS_DIR = path.join(__dirname, "../../embedded-cluster_versioned_docs/version-2.0.0");
const STATIC_DIR = path.join(__dirname, "../../static");
const OUTPUT_FULL_FILE = path.join(STATIC_DIR, "llms-full.txt");

// Store partials content
const partialsCache = {};

// Load all partials from the docs directory
function loadPartials(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !shouldSkipDirectory(fullPath)) {
            loadPartials(fullPath);
        } else if (entry.isFile() && entry.name.startsWith('_') && 
                  (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Remove any front matter from the partial
            const cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();
            // Store using the filename without extension as the key
            const partialName = path.basename(entry.name, path.extname(entry.name)).substring(1);
            partialsCache[partialName] = cleanContent;
        }
    });
}

// Process content to include partials
function processContent(content, filePath) {
    // Extract only partial imports (those referencing the /partials directory)
    const imports = [];
    content = content.replace(/^import\s+(\w+)\s+from\s+["']([^"']*\/partials\/[^"']+)["']/gm, (match, importName, importPath) => {
        imports.push({ name: importName, path: importPath });
        return ''; // Remove import statement
    });

    // Other import statements will be left unchanged
    content = content.replace(/^import.*$/gm, ''); // Remove remaining import statements

    // Replace partial references with their content, preserving indentation
    imports.forEach(importInfo => {
        const partialName = path.basename(importInfo.path, path.extname(importInfo.path)).substring(1);
        if (partialsCache[partialName]) {
            // Use a regex that captures leading whitespace on the same line as the partial tag
            const regex = new RegExp(`^([ \\t]*)<${importInfo.name}\\s*/>`, 'gm');
            content = content.replace(regex, (match, leadingWhitespace) => {
                // If there's no indentation, just return the partial content as-is
                if (!leadingWhitespace) {
                    return partialsCache[partialName];
                }
                // Apply the leading whitespace to each line of the partial content
                // This preserves the original indentation within code blocks while adding
                // the list indentation prefix to maintain proper markdown structure
                const indentedContent = partialsCache[partialName]
                    .split('\n')
                    .map((line) => {
                        // Empty lines don't need indentation
                        if (line.trim() === '') {
                            return line;
                        }
                        // Add the captured indentation to all non-empty lines
                        return leadingWhitespace + line;
                    })
                    .join('\n');
                return indentedContent;
            });
        } else {
            console.warn(`Warning: Partial '${partialName}' not found for file ${filePath}`);
        }
    });

    return content.trim();
}

function shouldSkipDirectory(filePath, excludedDirs = ['.history', 'templates', 'pdfs']) {
    return excludedDirs.some(dir => filePath.includes(dir));
}

function getAllMarkdownFiles(dir, fileList = [], excludeReleaseNotes = true, baseDir = null) {
    if (!baseDir) baseDir = dir;
    const urlPrefix = (baseDir === EC_DOCS_DIR) ? 'embedded-cluster/v2/' : (baseDir === EC_V3_DOCS_DIR) ? 'embedded-cluster/v3/' : '';

    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        
        // Skip release-notes if excludeReleaseNotes is true
        if (excludeReleaseNotes && filePath.includes('release-notes')) {
            return;
        }
        
        if (shouldSkipDirectory(filePath)) {
            return;
        }
        
        if (fs.statSync(filePath).isDirectory()) {
            getAllMarkdownFiles(filePath, fileList, excludeReleaseNotes, baseDir);
        } else if ((path.extname(file) === '.md' || path.extname(file) === '.mdx') && !file.startsWith('_')) {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Process the content to include partials
            const processedContent = processContent(content, filePath);
            
            const titleMatch = processedContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : file.replace(/\.(md|mdx)$/, '');
            
            const relativePath = urlPrefix + filePath
                .replace(`${baseDir}/`, '')
                .replace(/\.(md|mdx)$/, '');
                
            fileList.push({
                path: relativePath,
                title: title,
                content: processedContent
            });
        }
    });
    return fileList;
}

// Get all markdown files including release-notes (only for static folder)
function getAllMarkdownFilesForStatic(dir, fileList = []) {
    return getAllMarkdownFiles(dir, fileList, false, dir);
}

function generateFullLLMsTxt(files) {
    const fullContent = files.map(file => {
        return `${file.content}\n\n---\n\n`;
    }).join('\n');
    
    fs.writeFileSync(OUTPUT_FULL_FILE, fullContent);
    console.log("✅ llms-full.txt generated!");
}

function copyProcessedMarkdownToStatic(files) {
    files.forEach(file => {
        // Add error checking
        if (!file.content) {
            console.warn(`Warning: No content found for file ${file.path}`);
            return;
        }
        
        const staticPath = path.join(STATIC_DIR, `${file.path}.md`);
        
        const staticDir = path.dirname(staticPath);
        if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir, { recursive: true });
        }
        
        fs.writeFileSync(staticPath, file.content);
        // console.log(`✅ Copied processed markdown to: ${file.path}.md`);
    });
}

// Update the main execution
loadPartials(DOCS_DIR);

// Get files for llms-full.txt (excluding release-notes) from both docs sources
const allFiles = getAllMarkdownFiles(DOCS_DIR);
getAllMarkdownFiles(EC_V3_DOCS_DIR, allFiles);
getAllMarkdownFiles(EC_DOCS_DIR, allFiles);

// Get all files including release-notes for copying to static
const allFilesForStatic = getAllMarkdownFilesForStatic(DOCS_DIR);
getAllMarkdownFilesForStatic(EC_V3_DOCS_DIR, allFilesForStatic);
getAllMarkdownFilesForStatic(EC_DOCS_DIR, allFilesForStatic);

// Generate llms-full.txt (excluding release-notes)
generateFullLLMsTxt(allFiles);
// Copy all files including release-notes to static
copyProcessedMarkdownToStatic(allFilesForStatic);
console.log("ℹ️  static/llms.txt is hand-curated (tracked in git), not generated by this script.");