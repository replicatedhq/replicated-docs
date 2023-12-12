# About Custom Resources

You can include custom resources in releases to control the experience for applications installed with Replicated KOTS.

Custom resources are consumed by KOTS, the Replicated admin console, or by other kubectl plugins. Custom resources are packaged as part of the application, but are _not_ deployed to the cluster.

## KOTS Custom Resources

The following are custom resources in the `kots.io` API group:

| API Group/Version | Kind | Description |
|---------------|------|-------------|
| kots.io/v1beta1 | [Application](custom-resource-application) | Adds additional metadata (branding, release notes and more) to an application |
| kots.io/v1beta1 | [Config](custom-resource-config)| Defines a user-facing configuration screen in the admin console |
| kots.io/v1beta2 | [HelmChart](custom-resource-helmchart-v2) | Identifies an instantiation of a Helm Chart |
| kots.io/v1beta1 | [LintConfig](custom-resource-lintconfig) | Customizes the default rule levels for the KOTS release linter |

## Other Custom Resources

The following are custom resources in API groups other than `kots.io` that can be included in a KOTS release to configure additional functionality:

| API Group/Version | Kind | Description |
|---------------|------|-------------|
| app.k8s.io/v1beta1 | [SIG Application](https://github.com/kubernetes-sigs/application#kubernetes-applications) | Defines metadata about the application |
| cluster.kurl.sh/v1beta1 | [Installer](https://kurl.sh/docs/create-installer/) | Defines a Replicated kURL distribution |
| troubleshoot.replicated.com/v1beta2 | [Preflight](custom-resource-preflight) | Defines the data to collect and analyze for custom preflight checks |
| troubleshoot.replicated.com/v1beta2 | [Redactor](https://troubleshoot.sh/reference/redactors/overview/) | Defines custom redactors that apply to support bundles and preflight checks |
| troubleshoot.sh/v1beta2 | [Support Bundle](custom-resource-preflight) | Defines the data to collect and analyze for a support bundle |
| velero.io/v1 | [Backup](https://velero.io/docs/v1.10/api-types/backup/) | A Velero backup request, triggered when the user initiates a backup with Replicated snapshots |

