module.exports = {
  vendorPlatformSidebar: [
    {
      type: "category",
      label: "Vendor Portal",
      items: [
        {
          type: "category",
          label: "Vendor Portal Teams and Accounts",
          items: [
            "vendor/vendor-portal-creating-account",
            "vendor/team-management",
            "vendor/team-management-github-username",
            {
              type: "category",
              label: "Configure Role-based Access Control",
              items: [
                "vendor/team-management-rbac-configuring",
                "vendor/team-management-rbac-resource-names",
              ],
            },
            {
              type: "category",
              label: "Configure Authentication",
              items: [
                "vendor/team-management-two-factor-auth",
                "vendor/team-management-google-auth",
                "vendor/team-management-saml-auth",
                "vendor/team-management-scim-provisioning",
              ],
            },
            "vendor/team-management-slack-config",
            "vendor/replicated-api-tokens",
          ],
        },
        {
          type: "category",
          label: "Applications",
          items: [
            "vendor/vendor-portal-manage-app",
            "vendor/vendor-portal-application-settings",
          ],
        },
        {
          type: "category",
          label: "Channels and Releases",
          items: [
            "vendor/releases-about",
            "vendor/releases-creating-channels",
            "vendor/releases-creating-releases",
            "vendor/releases-creating-cli",
            "vendor/helm-install-release",
            "vendor/releases-sharing-license-install-script",
            "reference/linter",
          ],
        },
        {
          type: "category",
          label: "Customers and Licenses",
          items: [
            "vendor/licenses-about",
            "vendor/releases-creating-customer",
            "vendor/licenses-adding-custom-fields",
            "vendor/licenses-install-types",
            "vendor/releases-share-download-portal",
            "vendor/licenses-about-types",
            "vendor/licenses-download",
            {
              type: "category",
              label: "Query License Entitlements",
              items: [
                "vendor/licenses-using-builtin-fields",
                "vendor/licenses-reference-sdk",
                "vendor/licenses-reference-helm",
                "vendor/licenses-referencing-fields",
                "vendor/licenses-reference-kots-runtime",
                "vendor/licenses-verify-fields-sdk-api",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Custom Domains",
          items: ["vendor/custom-domains", "vendor/custom-domains-using"],
        },
        {
          type: "category",
          label: "Insights and Telemetry",
          items: [
            "vendor/instance-insights-event-data",
            "vendor/insights-app-status",
            "vendor/telemetry-air-gap",
            "vendor/customer-adoption",
            "vendor/customer-reporting",
            "vendor/instance-insights-details",
            "vendor/instance-notifications-config",
            "vendor/custom-metrics",
            "vendor/instance-data-export",
          ],
        },
        "vendor/support-submit-request",
      ],
    },
    {
      type: "category",
      label: "Replicated Proxy Registry",
      items: [
        "vendor/private-images-about",
        "vendor/packaging-private-images",
        "vendor/helm-image-registry",
        "vendor/private-images-kots",
        "vendor/private-images-tags-digests",
        {
          type: "category",
          label: "Replicated Private Registry",
          items: [
            "vendor/private-images-replicated",
            "vendor/packaging-private-registry-security",
          ],
        },
        "vendor/packaging-public-images",
        "vendor/tutorial-ecr-private-images",
      ],
    },
    {
      type: "category",
      label: "Add Replicated to CI/CD Workflows",
      items: [
        "vendor/ci-overview",
        "vendor/ci-workflows",
        "vendor/ci-workflows-github-actions",
      ],
    },
  ],
};
