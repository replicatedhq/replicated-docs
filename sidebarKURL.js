module.exports = {
  kurlSidebar: [
    "vendor/kurl-about",
    {
      type: "category",
      label: "Configure kURL Installers",
      items: [
        "vendor/packaging-embedded-kubernetes",
        "vendor/packaging-installer-storage",
        "vendor/installer-history",
        "vendor/kurl-nodeport-services",
      ],
    },
    {
      type: "category",
      label: "Install with kURL",
      items: [
        "enterprise/installing-kurl-requirements",
        "enterprise/installing-kurl",
        "enterprise/installing-kurl-airgap",
        "enterprise/installing-kurl-automation",
      ],
    },
    "enterprise/cluster-management-add-nodes",
    {
      type: "category",
      label: "Perform Updates with kURL",
      items: [
        "enterprise/updating-kurl-about",
        "enterprise/updating-kurl",
      ],
    },
    "vendor/packaging-using-tls-certs",
    "enterprise/updating-tls-cert",
    "enterprise/image-registry-kurl",
    "enterprise/monitoring-external-prometheus",
    "vendor/kurl-reset",
  ],
};
