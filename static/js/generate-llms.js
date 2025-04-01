const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, "../../docs");
const OUTPUT_FILE = path.join(__dirname, "../../static", "llms.txt");
const OUTPUT_FULL_FILE = path.join(__dirname, "../../static", "llms-full.txt");
const BASE_URL = "https://docs.replicated.com";

// Define static header content
const STATIC_HEADER = `# Replicated Documentation

> Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated Platform to distribute modern commercial software into complex, customer-controlled environments, including on-prem and air gap.

`;

// Define list of md files
const INCLUDED_FILES = [
    // Add specific file paths, relative to the docs directory
    // Compatibility Matrix docs
    'vendor/testing-about.md',
    'vendor/testing-how-to.md',
    'vendor/testing-supported-clusters.md',
    // Embedded Cluster docs
    'enterprise/embedded-manage-nodes.mdx',
    'enterprise/installing-embedded-air-gap.mdx',
    'enterprise/installing-embedded-automation.mdx',
    'enterprise/installing-embedded-requirements.mdx',
    'enterprise/installing-embedded.mdx',
    'reference/embedded-cluster-install.mdx',
    'vendor/embedded-overview.mdx',
    // Helm Install docs
    'vendor/helm-install-airgap.mdx',
    'vendor/helm-install-overview.mdx',
    'vendor/helm-install-release.md',
    'vendor/install-with-helm.mdx',
    'vendor/helm-install-values-schema.mdx',
    // Intro and onboarding
    'intro-replicated.mdx',
    'vendor/kots-faq.mdx',
    'vendor/quick-start.mdx',
    'vendor/replicated-onboarding.mdx',
    // KOTS CLI docs
    'reference/kots-cli-getting-started.md',
    // KOTS docs
    'enterprise/installing-existing-cluster-airgapped.mdx',
    'enterprise/installing-general-requirements.mdx',
    'enterprise/snapshots-creating.md',
    'enterprise/snapshots-restoring-full.mdx',
    'enterprise/snapshots-velero-cli-installing.md',
    'enterprise/updating-app-manager.mdx',
    'reference/custom-resource-about.md',
    'reference/custom-resource-application.mdx',
    'reference/custom-resource-config.mdx',
    'reference/custom-resource-helmchart-v2.mdx',
    'reference/template-functions-about.mdx',
    'reference/template-functions-examples.mdx',
    'reference/template-functions-config-context.md',
    'reference/template-functions-license-context.md',
    'reference/template-functions-static-context.md',
    'vendor/helm-native-about.mdx',
    'vendor/helm-native-v2-using.md',
    'vendor/helm-packaging-airgap-bundles.mdx',
    'vendor/resources-annotations-templating.md',
    'vendor/snapshots-overview.mdx',
    // kURL docs
    'vendor/kurl-about.mdx',
    'enterprise/installing-kurl-requirements.mdx',
    'enterprise/installing-kurl.mdx',
    'enterprise/installing-kurl-airgap.mdx',
    'vendor/packaging-embedded-kubernetes.mdx',
    // Preflight checks and support bundles
    'vendor/preflight-support-bundle-about.mdx',
    // Proxy registry docs
    'vendor/private-images-about.md',
    'vendor/helm-image-registry.mdx',
    'vendor/private-images-kots.mdx',
    'vendor/packaging-public-images.mdx',
    // Replicated CLI docs
    'reference/replicated-cli-installing.mdx',
    // Replicated SDK docs
    'reference/replicated-sdk-apis.md',
    'vendor/replicated-sdk-installing.mdx',
    'vendor/replicated-sdk-overview.mdx',
    'vendor/replicated-sdk-customizing.md',
    // Vendor Portal docs
    'vendor/custom-domains-using.md',
    'vendor/custom-domains.md',
    'vendor/custom-metrics.md',
    'vendor/insights-app-status.md',
    'vendor/instance-insights-event-data.mdx',
    'vendor/licenses-about.mdx',
    'vendor/licenses-adding-custom-fields.md',
    'vendor/licenses-install-types.mdx',
    'vendor/licenses-reference-sdk.mdx',
    'vendor/releases-about.mdx',
    'vendor/releases-creating-channels.md',
    'vendor/releases-creating-cli.mdx',
    'vendor/releases-share-download-portal.md',
    'vendor/replicated-api-tokens.md',
    'vendor/team-management-rbac-configuring.md',
    'vendor/team-management-rbac-resource-names.md',
    'vendor/team-management.md',
    'vendor/telemetry-air-gap.mdx',
    'vendor/vendor-portal-manage-app.md',
];

// Get the description of the page from the first sentence
function extractFirstSentence(text) {
    // Remove front matter
    text = text.replace(/^---[\s\S]*?---/, '');
    
    // Remove import statements
    text = text.replace(/^import.*$/gm, '');
    
    // Remove markdown headings
    text = text.replace(/^#+\s.*$/gm, '');
    
    // Find the first non-empty paragraph
    const firstParagraph = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)[0];
    
    if (!firstParagraph) return 'No description available.';

    // Check if a period is likely the end of a sentence
    function isEndOfSentence(text, periodIndex) {
        // Check if period is inside a URL
        if (text.lastIndexOf('http', periodIndex) > text.lastIndexOf(' ', periodIndex)) {
            return false;
        }
        
        // Check if period is inside a markdown link
        if (text.lastIndexOf('[', periodIndex) > text.lastIndexOf(']', periodIndex)) {
            return false;
        }
        
        // Check if period is followed by a space or end of string
        if (periodIndex < text.length - 1 && !/[\s\n]/.test(text[periodIndex + 1])) {
            return false;
        }

        return true;
    }

    // Find the first real sentence ending
    let index = 0;
    while (index < firstParagraph.length) {
        const char = firstParagraph[index];
        if ('.!?'.includes(char) && isEndOfSentence(firstParagraph, index)) {
            return firstParagraph.slice(0, index + 1).trim();
        }
        index++;
    }

    // If no sentence ending is found, return the whole paragraph
    return firstParagraph.trim();
}

function getMarkdownFiles(dir, fileList = []) {
    INCLUDED_FILES.forEach(relativePath => {
        const filePath = path.join(dir, relativePath);
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : path.basename(relativePath).replace(/\.(md|mdx)$/, '');
            
            const description = extractFirstSentence(content);
            
            fileList.push({
                path: relativePath.replace(/\.(md|mdx)$/, ''),
                title: title,
                description: description,
                content: content
            });
        } catch (error) {
            console.warn(`Warning: Could not process file ${relativePath}: ${error.message}`);
        }
    });
    
    return fileList;
}

// Generate llms-full.txt (full docs site content in single md file)
function generateFullLLMsTxt(files) {
    const fullContent = files.map(file => {
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

    const fullContent = STATIC_HEADER + dynamicContent;

    fs.writeFileSync(OUTPUT_FILE, fullContent);
    console.log("✅ llms.txt generated!");
}

// Generate both files
const files = getMarkdownFiles(DOCS_DIR);
generateFullLLMsTxt(files);
generateLLMsTxt(files);