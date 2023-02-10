# About Custom Resources

An application can include several recommended, but optional, custom resources.
These custom resources are packaged as part of the application, but are not deployed to the cluster.
The custom resources defined here are included to control the application experience. They are consumed by the Replicated app manager, the Replicated admin console, or by other kubectl plugins.

| Group/Version | Kind | Description |
|---------------|------|-------------|
| kots.io/v1beta1 | [Config](custom-resource-config)| Defines a user-facing configuration screen. |
| kots.io/v1beta1 | [Application](custom-resource-application) | Adds additional metadata (branding, release notes and more) to an application. |
| troubleshoot.replicated.com/v1beta2 | [Preflight](custom-resource-preflight) | Defines custom preflight checks for an application version. |
| troubleshoot.sh/v1beta2 | [Support Bundle](custom-resource-preflight) | Defines the custom diagnostic data to collect and analyze in a support bundle. |
| troubleshoot.replicated.com/v1beta2 | [Redactor](https://troubleshoot.sh/reference/redactors/overview/) | Defines custom redactors that apply to support bundle contents. Only configurable using the admin console. |
| app.k8s.io/v1beta1 | [SIG Application](custom-resource-sig-application) | Defines metadata about the application. |
| kots.io/v1beta1 | [HelmChart](custom-resource-helmchart) | Identifies an instantiation of a Helm Chart. |
| velero.io/v1 | [Backup](https://velero.io/docs/v1.10/api-types/backup/) | A Velero backup request, triggered when the user initiates a [snapshot](../vendor/snapshots-overview). |
| kots.io/v1beta1 | [LintConfig](custom-resource-lintconfig) | Customizes the default rule levels for the linter. |
| kots.io/v1beta1 | [Identity](custom-resource-identity) | Contains vendor-supplied configuration for the Replicated identity service. |
