// sidebar heading is set in src/utils/sidebarProductFromPath.js in SIDEBAR_CONFIG

module.exports = {
  compatibilityMatrixSidebar: [
    "vendor/testing-about",
    "vendor/testing-supported-clusters",
    "vendor/testing-how-to",
    "vendor/testing-vm-create",
    "vendor/testing-ingress",
    "vendor/testing-network-policy",
    "vendor/testing-cluster-addons",
    "vendor/testing-ci-cd",
    {
      type: "category",
      label: "Manage cost and usage",
      items: [
        "vendor/testing-pricing",
        "vendor/compatibility-matrix-usage",
      ],
    },
  ],
};