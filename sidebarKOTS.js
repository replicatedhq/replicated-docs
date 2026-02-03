module.exports = {
  kotsSidebar: [
    "intro-kots",
    {
      type: "category",
      label: "Configure KOTS",
      items: [
        {
          type: "category",
          label: "Configure the HelmChart Custom Resource",
          items: [
            "vendor/helm-native-about",
            "vendor/helm-native-v2-using",
            "vendor/helm-packaging-airgap-bundles",
            "vendor/helm-optional-value-keys",
            "vendor/helm-v2-migrate",
          ],
        },
        {
          type: "category",
          label: "Customize the Admin Console and Download Portal",
          items: [
            "vendor/admin-console-customize-app-icon",
            "vendor/admin-console-adding-buttons-links",
            "vendor/admin-console-port-forward",
            "vendor/admin-console-prometheus-monitoring",
          ],
        },
        {
          type: "category",
          label: "Configure the Admin Console Config Screen",
          items: [
            "vendor/config-screen-about",
            "vendor/admin-console-customize-config-screen",
            "vendor/config-screen-map-inputs",
            "vendor/config-screen-conditional",
          ],
        },
        {
          type: "category",
          label: "Manage Resources and Objects",
          items: [
            "vendor/admin-console-display-app-status",
            {
              type: "category",
              label: "Conditionally Deploy Resources",
              items: [
                "vendor/packaging-include-resources",
                "vendor/tutorial-adding-db-config",
              ],
            },
            "vendor/resources-annotations-templating",
            "vendor/orchestrating-resource-deployment",
            "vendor/database-config-adding-options",
            "vendor/packaging-cleaning-up-jobs",
            "vendor/packaging-ingress",
          ],
        },
        {
          type: "category",
          label: "Manage KOTS",
          items: [
            "vendor/packaging-kots-versions",
            "vendor/packaging-rbac",
            "vendor/packaging-air-gap-excluding-minio",
          ],
        },
        {
          type: "category",
          label: "Distribute Kubernetes Operators with KOTS",
          items: [
            "vendor/operator-packaging-about",
            "vendor/operator-defining-additional-images",
            "vendor/operator-referencing-images",
            "vendor/operator-defining-additional-namespaces",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Install in Existing Clusters with KOTS",
      items: [
        "enterprise/installing-overview",
        "enterprise/installing-general-requirements",
        "enterprise/installing-existing-cluster",
        "enterprise/installing-existing-cluster-airgapped",
        "enterprise/installing-existing-cluster-automation",
        "enterprise/installing-stateful-component-requirements",
      ],
    },
    {
      type: "category",
      label: "Perform Updates in Existing Cluster KOTS Installations",
      items: [
        "enterprise/updating-app-manager",
        "enterprise/updating-apps",
        "enterprise/updating-patching-with-kustomize",
      ],
    },
    {
      type: "category",
      label: "Configure Local Image Registries",
      items: [
        "enterprise/image-registry-settings",
        "enterprise/image-registry-rate-limits",
      ],
    },
    "enterprise/updating-licenses",
    {
      type: "category",
      label: "Perform Backup and Restore with Snapshots",
      items: [
        "vendor/snapshots-overview",
        {
          type: "category",
          label: "Enable and Configure Snapshots",
          items: [
            "vendor/snapshots-configuring-backups",
            "reference/custom-resource-backup",
            "vendor/snapshots-hooks",
          ],
        },
        {
          type: "category",
          label: "Configure Backup Storage for Snaphots",
          items: [
            "enterprise/snapshots-velero-cli-installing",
            "enterprise/snapshots-configuring-hostpath",
            "enterprise/snapshots-configuring-nfs",
            "enterprise/snapshots-storage-destinations",
            "enterprise/snapshots-velero-installing-config",
          ],
        },
        "enterprise/snapshots-creating",
        "enterprise/snapshots-restoring-full",
        "enterprise/snapshots-updating-with-admin-console",
        "enterprise/snapshots-troubleshooting-backup-restore",
      ],
    },
    {
      type: "category",
      label: "Manage Admin Console User Access",
      items: [
        "enterprise/auth-changing-passwords",
        "enterprise/auth-identity-provider",
        "enterprise/auth-configuring-rbac",
      ],
    },
    {
      type: "category",
      label: "Monitor Applications with Prometheus",
      items: [
        "enterprise/monitoring-applications",
        "enterprise/monitoring-access-dashboards",
      ],
    },
    "enterprise/status-viewing-details",
    "enterprise/delete-admin-console",
    {
      type: "category",
      label: "Use a GitOps Workflow",
      items: [
        "enterprise/gitops-workflow",
        "enterprise/gitops-managing-secrets",
      ],
    },
  ],
};
