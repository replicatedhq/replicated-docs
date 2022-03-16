# About Custom Resources

An application can include several recommended, but optional, custom resources.
These custom resources are packaged as part of the application, but are not deployed to the cluster.
The custom resources defined here are included to control the application experience. They are consumed by the Replicated app manager, the Replicated admin console, or by other kubectl plugins.

| Group/Version | Kind | Description |
|---------------|------|-------------|
| kots.io/v1beta1 | [Config](custom-resource-config)| Define a user-facing config screen |
| kots.io/v1beta1 | [Application](custom-resource-application) | Add additional metadata (branding, release notes and more) to an application |
| troubleshoot.replicated.com/v1beta1 | [Preflight](custom-resource-preflight) | Define custom preflight checks for an application version |
| troubleshoot.replicated.com/v1beta1 | [Analyzer](https://troubleshoot.sh/reference/analyzers/overview/) | Define custom support bundle analyzers to run in the admin console |
| troubleshoot.replicated.com/v1beta1 | [Collector](https://troubleshoot.sh/reference/collectors/overview/) | Define custom data to include in a support bundle |
| troubleshoot.replicated.com/v1beta1 | [Redactor](https://troubleshoot.sh/reference/redactors/overview/) | Define custom redactors that apply to support bundle contents. Only configurable via the admin console |
| app.k8s.io/v1beta1 | [SIG Application](custom-resource-sig-application) | Define metadata about the application |
| kots.io/v1beta1 | [HelmChart](custom-resource-helmchart) | Identifies an instantiation of a Helm Chart |
| velero.io/v1 | [Backup](https://velero.netlify.app/docs/v1.3.2/api-types/backup/) | A Velero backup request, triggered when the user initiates a [snapshot](../vendor/snapshots-overview) |
| kots.io/v1beta1 | [Identity](custom-resource-identity) | Contains vendor-supplied configuration for the Replicated identity service. |
