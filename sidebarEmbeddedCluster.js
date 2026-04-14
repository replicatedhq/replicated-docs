module.exports = {
  embeddedClusterSidebar: [
    "embedded-overview",
    "embedded-using",
    "embedded-v3-migrate",
    {

      type: "category",
      label: "Install with Embedded Cluster",
      items: [
        "installing-embedded-requirements",
        "installing-embedded",
        "installing-embedded-air-gap",
      ]
    },
    "embedded-manage-nodes",
    "updating-embedded",
    "embedded-troubleshooting",
    //REFERENCE DOCS
    { type: "html", value: "<h5>Reference</h5>", defaultStyle: true },
    "embedded-config",
    "template-functions",
    {
      type: "category",
      label: "Embedded Cluster Commands",
      items: [
        "embedded-cluster-completion",
        "embedded-cluster-create-join-bundle",
        "embedded-cluster-create-upgrade-bundle",
        "embedded-cluster-enable-ha",
        "embedded-cluster-install",
        "embedded-cluster-node-join",
        "embedded-cluster-node-upgrade",
        "embedded-cluster-remove-node",
        "embedded-cluster-reset",
        "embedded-cluster-shell",
        "embedded-cluster-status",
        "embedded-cluster-support-bundle",
        "embedded-cluster-upgrade",
        "embedded-cluster-version",
      ],
    },
  ],
};
