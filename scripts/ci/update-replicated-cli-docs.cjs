const fs = require("node:fs");
const path = require("node:path");

function updateDocs(generatedDir, repoRoot) {
  const referenceDir = path.join(repoRoot, "docs/reference");
  const sidebarPath = path.join(repoRoot, "sidebars.js");
  const files = fs.readdirSync(generatedDir).filter(f => /^replicated(?:_.*)?\.md$/.test(f)).sort();
  if (!files.includes("replicated.md") || files.length < 2) {
    throw new Error("Expected a root page and CLI command pages; refusing to replace existing docs");
  }

  const docId = file => file.replace(/\.md$/, "").replace(/^replicated_/, "replicated-cli-").replaceAll("_", "-");
  const manualIds = ["replicated-cli-installing", "replicated-config-file"];
  const pages = files.map(file => {
    const id = docId(file);
    if (manualIds.includes(id)) throw new Error(`Generated page would overwrite manual page: ${id}`);
    let content = fs.readFileSync(path.join(generatedDir, file), "utf8").replace(/^## /, "# ");
    content = content.replace(/\]\((replicated(?:_[A-Za-z0-9_-]+)?\.md)(#[^)]*)?\)/g,
      (_, target, fragment = "") => `](${docId(target)}${fragment})`);
    return { id, content: content.trimEnd() + "\n" };
  });

  const sidebar = fs.readFileSync(sidebarPath, "utf8");
  // Keep the surrounding sidebar and comments, including comments after the label.
  const pattern = /(label:\s*["']Replicated CLI["'],?[^\n]*\n\s*items:\s*\[)([^\]]*)(\])/g;
  if ([...sidebar.matchAll(pattern)].length !== 1) {
    throw new Error("Expected exactly one Replicated CLI sidebar section");
  }
  const items = [...manualIds, ...pages.map(page => page.id).sort()];
  const updatedSidebar = sidebar.replace(pattern, (_, start, oldItems, end) => {
    const comment = oldItems.match(/^[^\n]*\/\/[^\n]*/)?.[0] || "";
    const trailingComments = oldItems.match(/((?:\n[ \t]*\/\/[^\n]*)*\n[ \t]*)$/)?.[0] || "\n    ";
    return `${start}${comment}\n${items.map(id => `      "reference/${id}",`).join("\n")}${trailingComments}${end}`;
  });

  // Validate all input before removing any existing generated pages.
  for (const file of fs.readdirSync(referenceDir)) {
    if ((file === "replicated.mdx" || /^replicated-cli-.*\.mdx$/.test(file)) &&
        !manualIds.includes(file.replace(/\.mdx$/, ""))) {
      fs.unlinkSync(path.join(referenceDir, file));
    }
  }
  for (const { id, content } of pages) {
    fs.writeFileSync(path.join(referenceDir, `${id}.mdx`), content);
  }
  fs.writeFileSync(sidebarPath, updatedSidebar);
}

if (require.main === module) {
  if (process.argv.length !== 3) throw new Error("Usage: node update-replicated-cli-docs.cjs GENERATED_DIR");
  updateDocs(process.argv[2], path.resolve(__dirname, "../.."));
}
module.exports = { updateDocs };
