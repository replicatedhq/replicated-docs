import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HelmCLILimitations from "../partials/helm/_helm-cli-limitations.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"

# About Deploying Helm Charts 

This topic describes the options for using Replicated to deploy applications that are packaged with Helm charts.

## Overview of Helm with Replicated

Helm is a popular package manager for Kubernetes applications. Using Replicated to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, support for using private images, and more.

## Helm Chart Installation Options

When you distribute an application packaged with Helm, your users can install and manage the application with either the Replicated app manager or the helm CLI.

This section describes the processes for installing Helm charts with the app manager or the helm CLI.

### App Manager

Users can install an application packaged with Helm charts using the app manager in either an existing cluster or a cluster provisioned by the Replicated Kubernetes installer. The app manager also supports Helm installations into air gap environments. For more information, see [Air Gap](#air-gap) below.

As an application vendor, you specify whether the app manager uses the _native Helm_ or _Replicated Helm_ method to deploy your Helm chart-based application. You specify the deployment method in the `useHelmInstall` field of the Replicated HelmChart custom resource manifest file for the Helm chart. For more information, see [useHelmInstall](/reference/custom-resource-helmchart#usehelminstall) in _HelmChart_.

The following sections provide more information about how the app manager processes Helm charts in both deployment methods:

* [Native Helm (Recommended)](#native)
* [Replicated Helm](#replicated-helm)
#### Native Helm (Recommended) {#native}

With the native Helm deployment method, the app manager uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. Native Helm is the preferred method because it supports more features of Helm, such as hooks and weights.


#### Replicated Helm

:::note
<ReplicatedHelmDeprecated/>
:::

With the Replicated Helm deployment method, the app manager renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. The app manager also has additional functionality for specific Helm hooks. For example, when the app manager encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it automatically adds the same `kots.io/hook-delete-policy` to the Job object.

The resulting deployment is comprised of standard Kubernetes manifests. Therefore, cluster operators can view the exact differences between what is currently deployed and what an update will deploy.
### helm CLI (Beta)

Users can also install an application packaged with a Helm chart into an existing cluster using the helm CLI. When users install with the helm CLI directly, Helm, rather than the app manager, manages the lifecycle of the application.

Deploying an application with the helm CLI differs from the _native Helm_ deployment method described above because, when users install with the helm CLI directly, they have access to all Helm functionality. Some enterprise users prefer or require using the helm CLI because their existing CI/CD pipeline is already compatible with Helm charts. Similarly, enterprise users might have organizational policies that require using Helm to manage applications.

Users do not have access to certain Replicated features when they install and manage the application with the helm CLI directly. This is because the app manager does not manage the lifecycle of the application. For example, users must update the application using the `helm upgrade` command, rather than using the admin console UI or the kots CLI.

For more information about how to package an application with Replicated so that users can install using the helm CLI, see [Supporting helm CLI Installations (Beta)](helm-install).

### Air Gap

The app manager supports native Helm and Replicated Helm installations into air gap environments. When a user installs a Helm chart-based application in an air gap environment, the chart processing is managed in the end user environment. This means that the app manager can use user-supplied values, license values, and existing values to create deployable manifests.

To create an `.airgap` bundle for a release that uses Helm charts, the Replicated vendor portal renders templates of the Helm charts with `helm template`. To specify which values from the Helm chart `values.yaml` file are included in the `.airgap` bundle, you add a `builder` key in the HelmChart custom resource manifest file. For more information, see [builder](/reference/custom-resource-helmchart#builder) in the _HelmChart_ reference.

:::note
The helm CLI installation method does not support installations into air gap environments. See [helm CLI Limitations](#helm-cli-limitations) below.
:::

<HelmBuilderRequirements/>

**Example:**

The following example demonstrates how to add a conditional `postgresql` resource to the `builder` key.

`postgresql` is defined as a conditional resource in the `values` key of the HelmChart custom resource:

```yaml
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}
```
As shown above, `postgresql` is included only when the user selects the `embedded_postgres` option.

To ensure the vendor portal includes this conditional `postgresql` resource in `.airgap` bundles, add the same `postgresql` value to the `builder` key with `enabled` set to `true`:

```yaml
  builder:
    postgresql:
      enabled: true
```

## Limitations

This section lists the limitations for the Helm chart installation methods.

There are different limitations depending on if your customers install and manage the application with the app manager or if they use the helm CLI directly:

* [Native Helm and Replicated Helm Limitations](#replicated-helm-limitations)
* [helm CLI Limitations](#helm-cli-limitations)

### Native Helm and Replicated Helm Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager to install and manage Helm charts:
* <ReplicatedHelmDeprecated/>
* <TemplateLimitation/>
* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.
* The name specified in the HelmChart custom resource must be an exact match to the actual Helm chart name that is provided to Replicated. If the Helm chart names do not match, then the installation can error or fail. See [HelmChart](/reference/custom-resource-helmchart) in _Custom Resources_.

* The following limitations apply to the native Helm deployment method only:

  <NativeHelmLimitations/>

  * <HooksLimitation/>

### helm CLI Limitations {#helm-cli-limitations}

The helm CLI installation method is Beta and has the following limitations:

<HelmCLILimitations/>