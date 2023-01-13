import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"

# Installing with Native Helm

With the native Helm installation, you can exercise more control over chart deployment using Helm hooks and weights. In the native Helm installation workflow, the app manager deploys the app's v3 Helm charts with a `helm install` command. This means that Helm owns the installation and lifecycle management of the chart resources. For new applications, native Helm is the preferred method because it supports more Helm features, such as hook and weights.

:::note
Migrating existing installations to the native Helm workflow is not supported. However, new Helm charts within an existing application can use the native Helm workflow and the features that come with it.
:::

## Native Helm Limitations
The native Helm chart support has the following limitations:
<TemplateLimitation/>
<NativeHelmLimitations/>

### Helm Hooks and Weights

Native Helm hooks and weights enable more control over when resources are deployed. This is useful if you want to bundle actions as part of a release. For example, you can build in a database backup as part of the upgrade process while ensuring that the backup occurs prior to upgrading the rest of the resources. The Helm weights provide even more control by governing the order of operations within each hook.

The following hooks are supported:
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

## Enabling and Using Native Helm Charts

To leverage this option, set `useHelmInstall: true` in the `HelmChart` custom resource. Then promote these changes to a channel and install new instances of the application with the native Helm installation. For any existing installations of the application, you can update these in the Replicated admin console or using the kots CLI. After they are updated, any new Helm charts added to the application are deployed with the native Helm installation.

For more information about adding charts to applications, see [optional charts](helm-optional-charts) and the [Helm docs](https://helm.sh/docs/topics/charts/). For information on ordering the Helm chart installations, see [Defining Installation Order for Native Helm Charts](https://docs.replicated.com/vendor/helm-native-helm-install-order).

![Use Helm Install Flag](/images/vendor-use-helm-install-flag.png)

:::note
This is a chart level flag that is only supported for new charts. Modifying existing charts in existing applications is not supported.
:::
