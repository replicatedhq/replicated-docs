// sidebar heading is set in src/utils/sidebarProductFromPath.js in SIDEBAR_CONFIG
module.exports = {
    proxyRegistrySidebar: [
      "vendor/private-images-about",
      "vendor/packaging-private-images",
      "vendor/helm-image-registry",
      "vendor/private-images-kots",
      "vendor/private-images-tags-digests",
      "vendor/packaging-public-images",
      {
        type: "category",
        label: "Replicated Private Registry",
        items: [
          "vendor/private-images-replicated",
          "vendor/packaging-private-registry-security",
        ],
      },
      "vendor/tutorial-ecr-private-images",
    ],
  };