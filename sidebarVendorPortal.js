module.exports = {
  vendorPortalSidebar: [
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
      label: "Channels and releases",
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
      label: "Customers and licenses",
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
          label: "Query license entitlements",
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
      label: "Custom domains",
      items: ["vendor/custom-domains", "vendor/custom-domains-using"],
    },
    {
      type: "category",
      label: "Insights and telemetry",
      items: [
        "vendor/instance-insights-event-data",
        "vendor/insights-app-status",
        "vendor/custom-metrics",
        "vendor/telemetry-air-gap",
        "vendor/customer-adoption",
        "vendor/customer-reporting",
        "vendor/instance-insights-details",
        {
          type: "category",
          label: "Event Notifications (Beta)",
          items: [
            "vendor/event-notifications",
            "vendor/event-notifications-create",
            "vendor/event-notifications-manage",
            "vendor/event-notifications-webhooks",
          ],
        },
        "vendor/instance-notifications-config",
        "vendor/instance-data-export",
      ],
    },
    "vendor/support-submit-request",
  ],
};
