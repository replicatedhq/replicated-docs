const fs = require('fs');
const path = require('path');

// Fix path resolution to use /docs and /static at project root
const DOCS_DIR = path.join(__dirname, "../../docs");
const OUTPUT_FILE = path.join(__dirname, "../../static", "llms.txt");
const BASE_URL = "https://docs.replicated.com";

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

// Recursively get all .md files from a directory
function getMarkdownFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        
        // Skip .history and release-notes directories
        if (filePath.includes('.history') || filePath.includes('release-notes') || filePath.includes('templates') || filePath.includes('pdfs')) {
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
                description: description
            });
        }
    });
    return fileList;
}

// Generate the llms.txt file
function generateLLMSTxt() {
    const files = getMarkdownFiles(DOCS_DIR);
    
    const output = [
        "## Docs\n",
        ...files.map(file => 
            `- [${file.title}](${BASE_URL}/${file.path}.md): ${file.description}`
        )
    ].join('\n');
    
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log("✅ llms.txt generated!");
}

// Run the generator
generateLLMSTxt();
