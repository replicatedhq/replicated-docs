# About Custom Resources

An application can include several custom resources. Custom resources are packaged as part of the application, but are _not_ deployed to the cluster.

You can include KOTS custom resources to control the application experience. They are consumed by Replicated KOTS, the Replicated admin console, or by other kubectl plugins.

## KOTS Custom Resources

| API Version | Kind | Description |
|---------------|------|-------------|
| kots.io/v1beta1 | [Application](custom-resource-application) | Adds additional metadata (branding, release notes and more) to an application. |
| kots.io/v1beta1 | [Config](custom-resource-config)| Defines a user-facing configuration screen. |
| kots.io/v1beta2 | [HelmChart](custom-resource-helmchart-v2) | Identifies an instantiation of a Helm Chart. |
| kots.io/v1beta1 (Deprecated) | [HelmChart](custom-resource-helmchart) | Identifies an instantiation of a Helm Chart. |
| kots.io/v1beta1 | [LintConfig](custom-resource-lintconfig) | Customizes the default rule levels for the linter. |

## Other Custom Resources

The following are custom resources in groups other than KOTS that you can include in your release to configure functionality for KOTS installations:

| API Version | Kind | Description |
|---------------|------|-------------|
| troubleshoot.replicated.com/v1beta2 | [Preflight](custom-resource-preflight) | Defines the data to collect and analyze for custom preflight checks. |
| troubleshoot.sh/v1beta2 | [Support Bundle](custom-resource-preflight) | Defines the data to collect and analyze for a support bundle. |
| troubleshoot.replicated.com/v1beta2 | [Redactor](https://troubleshoot.sh/reference/redactors/overview/) | Defines custom redactors that apply to support bundle contents and preflight checks. |
| app.k8s.io/v1beta1 | [SIG Application](https://github.com/kubernetes-sigs/application#kubernetes-applications) | Defines metadata about the application. |
| velero.io/v1 | [Backup](https://velero.io/docs/v1.10/api-types/backup/) | A Velero backup request, triggered when the user initiates a backup with Replicated snapshots. For more information about snapshots, see [About Backup and Restore](/vendor/snapshots-overview). |
