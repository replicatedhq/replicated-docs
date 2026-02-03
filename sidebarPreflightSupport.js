module.exports = {
  preflightSupportSidebar: [
    "vendor/preflight-support-bundle-about",
    {
      type: "category",
      label: "Preflight Checks",
      items: [
        "vendor/preflight-defining",
        "vendor/preflight-examples",
        "vendor/preflight-running",
        "vendor/preflight-host-preflights",
      ],
    },
    {
      type: "category",
      label: "Support Bundles",
      items: [
        "vendor/support-bundle-customizing",
        "vendor/support-bundle-examples",
        "vendor/support-online-support-bundle-specs",
        "vendor/support-modular-support-bundle-specs",
        {
          type: "category",
          label: "Generate Support Bundles",
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
      label: "Troubleshoot Custom Resources",
      items: [
        "reference/custom-resource-preflight",
        "reference/custom-resource-redactor",
      ],
    },
  ],
};
