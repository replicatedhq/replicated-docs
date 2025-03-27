const fs = require('fs');
const path = require('path');

// Fix path resolution to use /docs and /static at project root
const DOCS_DIR = path.join(__dirname, "../../docs");
const OUTPUT_FILE = path.join(__dirname, "../../static", "llms.txt");
const OUTPUT_FULL_FILE = path.join(__dirname, "../../static", "llms-full.txt");
const BASE_URL = "https://docs.replicated.com";

// Define static content
const STATIC_HEADER = `# Replicated Documentation

> Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated Platform to distribute modern commercial software into complex, customer-controlled environments, including on-prem and air gap.

`;

const STATIC_FOOTER = `

## Optional

For more information, visit:
- [Replicated Community](https://community.replicated.com/)
- [Replicated Vendor API v3 Docs](https://replicated-vendor-api.readme.io/reference/)
`;

function extractFirstSentence(text) {
    // Remove any front matter between --- markers
    text = text.replace(/^---[\s\S]*?---/, '');
    
    // Remove any import statements
    text = text.replace(/^import.*$/gm, '');
    
    // Remove markdown headings
    text = text.replace(/^#+\s.*$/gm, '');
    
    // Find the first non-empty line
    const firstParagraph = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)[0];
    
    // Extract first sentence (ends with . ! or ?)
    const sentenceMatch = firstParagraph?.match(/^[^.!?]+[.!?]/);
    return sentenceMatch ? sentenceMatch[0].trim() : 'No description available.';
}

function shouldSkipDirectory(filePath) {
    const excludedDirs = ['.history', 'release-notes', 'templates', 'pdfs'];
    return excludedDirs.some(dir => filePath.includes(dir));
}

// Recursively get all .md files from a directory
function getMarkdownFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        
        if (shouldSkipDirectory(filePath)) {
            return;
        }
        
        if (fs.statSync(filePath).isDirectory()) {
            getMarkdownFiles(filePath, fileList);
        } else if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
            // Read the file content
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Extract title from first heading
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : file.replace(/\.(md|mdx)$/, '');
            // Extract description from first sentence
            const description = extractFirstSentence(content);
            
            // Get the relative path without the extension
            const relativePath = filePath
                .replace(`${DOCS_DIR}/`, '')
                .replace(/\.(md|mdx)$/, '');
                
            fileList.push({
                path: relativePath,
                title: title,
                description: description,
                content: content
            });
        }
    });
    return fileList;
}

function generateFullLLMsTxt(files) {
    const fullContent = files.map(file => {
        // Don't add the title separately since it's already in the content
        return `${file.content}\n\n---\n\n`;
    }).join('\n');
    
    fs.writeFileSync(OUTPUT_FULL_FILE, fullContent);
    console.log("✅ llms-full.txt generated!");
}

function generateLLMsTxt(files) {
    const dynamicContent = [
        "## Docs\n",
        "For a complete archive of all documentation pages, see [llms-full.txt](https://docs.replicated.com/llms-full.txt)\n",
        ...files.map(file => 
            `- [${file.title}](${BASE_URL}/${file.path}.md): ${file.description}`
        )
    ].join('\n');
    
    // Combine static and dynamic content
    const fullContent = STATIC_HEADER + dynamicContent + STATIC_FOOTER;
    
    fs.writeFileSync(OUTPUT_FILE, fullContent);
    console.log("✅ llms.txt generated!");
}

// Generate both files
const files = getMarkdownFiles(DOCS_DIR);
generateFullLLMsTxt(files);
generateLLMsTxt(files);
