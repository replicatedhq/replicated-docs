// sidebar heading is set in src/utils/sidebarProductFromPath.js in SIDEBAR_CONFIG
module.exports = {
    troubleshootSidebar: [
      "vendor/preflight-support-bundle-about",
        {
          type: "category",
          label: "Preflight checks",
          items: [
            "vendor/preflight-defining",
            "vendor/preflight-examples",
            "vendor/preflight-running",
            "vendor/preflight-host-preflights",
          ],
        },
        {
          type: "category",
          label: "Support bundles",
          items: [
            "vendor/support-bundle-customizing",
            "vendor/support-bundle-examples",
            "vendor/support-online-support-bundle-specs",
            "vendor/support-modular-support-bundle-specs",
            {
              type: "category",
              label: "Generate support bundles",
              items: [
                "vendor/support-bundle-generating",
                "vendor/support-bundle-embedded",
                "enterprise/troubleshooting-an-app",
                "vendor/support-host-support-bundles",
              ],
            },
            "vendor/support-inspecting-support-bundles",
            "vendor/support-enabling-direct-bundle-uploads",
          ],
        },
        "vendor/preflight-sb-helm-templates-about",
        {
          type: "category",
          label: "Troubleshoot custom resources",
          items: [
            "reference/custom-resource-preflight",
            "reference/custom-resource-redactor",
          ],
        },
    ],
  };