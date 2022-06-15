# Installing with Native Helm

With the native Helm installation, you can exercise more control over chart deployment via Helm hooks and weights. 

> Currently, migrating existing applications to the native Helm implementation is not supported. Vendors who are interested in delivering applications using the native Helm workflow can promote releases to a new channel for new customer installations.

## Native Helm Limitations
The native Helm chart support currently has the following limitations:
* Only available for Helm V3.
* Only supported for new installations.
* Not supported on existing charts deployed on existing applications.
* The test hook is not supported.
* Hook weights below -9999. All hook weights must be set to a value above -9999 to ensure the Replicated image pull secret is deployed before any resources are pulled.
* Not supported with the [GitOps workflows](../enterprise/gitops-single-app-workflow).
* The name specified in the [HelmChart CRD](/reference/custom-resource-helmchart) must be an exact match to the actual Helm Chart name that is provided to Replicated; failure to do this will result in errored installations. 

### Helm hooks and weights

Native Helm hooks and weights enable more control over when resources are deployed. This is useful if you want to bundle actions as part of a release. For example, you can build in a database backup as part of the upgrade process while ensuring that the backup occurs prior to upgrading the rest of the resources. The Helm weights provide even more control by governing the order of operations within each hook.

The following hooks are currently supported:
* pre-install - executes after resources are rendered but before any resources are installed.
* post-install - executes after resources are installed.
* pre-upgrade - executes after resources are rendered but before any resources are upgraded.
* post-upgrade - executes after resources are upgraded.

The following hooks may be used but no actions will be taken by Replicated:
* pre-rollback - executes after resources are rendered but before any resources are rolled back.
* post-rollback - executes after resources are rolled back.
* pre-delete - executes before any resources are deleted.
* post-delete - executes after resources are deleted.

For more information about Helm hooks and weights, see the [Helm docs](https://helm.sh/docs/topics/charts_hooks/).

## Enabling and using native Helm chart support

To leverage this option, set `useHelmInstall: true` in the `HelmChart` CRD. Then promote these changes to a channel and install new instances of the application with the native Helm installation. For any existing installations of the application, you can update these via the Replicated admin console or kots CLI. Once updated, any new helm charts added to the application will be deployed with the native Helm installation.

For more information about adding charts to applications, see [optional charts](helm-optional-charts) and the [Helm docs](https://helm.sh/docs/topics/charts/). For information on ordering the Helm chart installations, see[Defining Installation Order for Native Helm Charts](https://docs.replicated.com/vendor/helm-native-helm-install-order).

![Use Helm Install Flag](/images/vendor-use-helm-install-flag.png)

> This is a chart level flag that is only supported for new charts. Modifying existing charts in existing applications is not supported.
