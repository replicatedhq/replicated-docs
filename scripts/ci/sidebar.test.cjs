const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const { updateDocs } = require("./update-replicated-cli-docs.cjs");

function readSidebar(file) {
  const context = { module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file, timeout: 1000 });
  return context.module.exports;
}

function cliCategory(sidebar) {
  const matches = [];
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (value.type === "category" && value.label === "Replicated CLI") matches.push(value);
    Object.values(value).forEach(visit);
  }
  visit(sidebar);
  assert.equal(matches.length, 1, "Expected exactly one exported Replicated CLI category");
  assert.ok(Array.isArray(matches[0].items), "CLI category must have an items array");
  return matches[0];
}

test("sidebar parses and the CLI updater can still add a command", t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sidebar-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const sidebarPath = path.join(root, "sidebars.js");
  fs.copyFileSync(path.resolve(__dirname, "../../sidebars.js"), sidebarPath);

  const commandId = "reference/replicated-cli-sidebar-test-command";
  assert.ok(!cliCategory(readSidebar(sidebarPath)).items.includes(commandId));

  const generated = path.join(root, "generated");
  fs.mkdirSync(generated);
  fs.mkdirSync(path.join(root, "docs/reference"), { recursive: true });
  fs.writeFileSync(path.join(generated, "replicated.md"), "## replicated\n");
  fs.writeFileSync(path.join(generated, "replicated_sidebar_test_command.md"), "## replicated sidebar test command\n");
  updateDocs(generated, root);

  assert.ok(
    cliCategory(readSidebar(sidebarPath)).items.includes(commandId),
    "Generated command must appear in the exported CLI sidebar after updating",
  );
});
