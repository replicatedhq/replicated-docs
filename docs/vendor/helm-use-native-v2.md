# Deploying with Native Helm v2

This topic describes how to use native Helm v2 to deploy your Helm charts with Replicated KOTS.

## Limitations

Native Helm v2 has the following limitations:

* You must configure the HelmChart v2 custom resource to use template functions to rewrite images, inject pull-secrets, and add labels for backups. In native Helm v1, KOTS automatically rewrites 

* To support online installations that are configured to push and pull from a private registry, In order to support online installations that are configured to push and pull from a private registry (aka “disable image push” is NOT selected), vendors must provide the necessary values in the `builder` field to render the helm chart with all necessary images - this is the same concept that is used in the airgap builder. If the vendor is already doing this to support airgap installs, then no changes would be required, but if they are not supporting airgap installs and are not using the builder field, then they would need to add the necessary values there to support this install flow for this specific use case.

* Last-mile changes with Kustomize is not supported.

* Existing Replicated Helm installs cannot be upgraded to native Helm v2.

* The rendered manifests shown in the `rendered` directory, which are used for diffing, may not exactly reflect the final manifests that will be deployed to the cluster. This is because those manifests are generated using `helm template`, which is not run with cluster context, so may contain different values for the `lookup` and `Capabilities` functions.  These functions are not supported at all in the native Helm v1, so this is still a net benefit since they can be used, just not shown in the diff.

* When migrating a release from native Helm v1 to native Helm v2, the diff viewer shows a large diff since the underlying file structure of the rendered manifests is completely different.  In the old flow, we `helm template` the chart, split up the resources, build a new chart with it, run kustomize, and then write the results back to the new chart.  In the new flow, we simply run `helm template` and just show the user that output in the diff viewer.

## Configure a HelmChart v2 Custom Resource

### Add a HelmChart v2 Custom Resource to a Release

### Rewrite Images

### Inject Pull Secrets

### Add Labels for Backups