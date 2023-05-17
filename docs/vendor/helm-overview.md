import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HelmCLILimitations from "../partials/helm/_helm-cli-limitations.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"

# About Deploying Helm Charts 

This topic describes the options and processes for using Replicated to deploy applications that are packaged with Helm charts.

## Helm Chart Installation Options

Helm is a popular package manager for Kubernetes applications. Using Replicated to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, support for using private images, and more.

<!-- The following table show an overview of the Helm installation options:

<table>
<tr>
  <th width="20%">Installation Type</th>
  <th width="20%">Installs with App Manager?</th>
  <th width="20%">Supported On</th>
  <th width="40">Highlights</th>
</tr>
<tr>
  <td><a href="helm-overview#native">Native Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Existing clusters</li><li>Kubernetes installer clusters</li><li>Air gap</li></ul></td>
  <td><ul><li>Recommended type for app manager</li><li>Supports more Helm options, including hooks and weights</li></ul></td>
</tr>
<tr>
  <td><a href="helm-overview#replicated">Replicated Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Existing clusters</li><li>Kubernetes installer clusters</li><li>Air gap</li></ul></td>
  <td><ul><li>Not recommended for new installations</li><li>Limited functionality for Helm hooks</li></ul></td>
</tr>
<tr>
  <td><a href="helm-overview#helm-cli">helm CLI (Beta)</a></td>
  <td>No</td>
  <td>Existing online clusters</td>
  <td><ul><li>Limited Replicated features</li></ul></td>
</tr>
</table> -->

<!-- App Manager Deployment -->

Users can install an application packaged with Helm charts using the app manager in either an existing cluster or a cluster provisioned by the Replicated Kubernetes installer. The app manager also supports Helm installations into air gap environments.

As an application vendor, you specify whether the app manager uses the _native Helm_ or _Replicated Helm_ method to deploy your Helm chart-based application. For more information, see [Supporting Native Helm and Replicated Helm](helm-release).

The following sections provide more information about how the app manager processes Helm charts in both deployment methods:

* [Native Helm (Recommended)](#native)
* [Replicated Helm](#replicated-helm)

### Native Helm (Recommended) {#native}

With the native Helm deployment method, the app manager uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. Native Helm is the preferred method because it supports more features of Helm, such as hooks and weights.

When you use native Helm deployment, the app manager renders your Helm manifests with Replicated templating in the HelmChart custom resource, without making changes to your `Chart.yaml` and `values.yaml` file. The templating maps to your `values.yaml` file and allows the app manager to deploy the native Helm charts.

The following diagram shows how Replicated processes native Helm charts for deployment to a Kubernetes cluster:

![Native Helm Deployment to Cluster](/images/native-helm-flowchart.png)

[View a larger image](/images/native-helm-flowchart.png)

As shown in the diagram above, when given a Helm chart, the app manager:

- Uses Kustomize to merge instructions from Replicated and the end user to chart resources (see steps 2 - 4 below)
- Packages the resulting manifest files into a new Helm chart (see step 5 below)
- Deploys the new Helm chart (see step 5 below)

To deploy Helm charts using the native Helm method, the app manager does the following:

1. **Checks for previous installations of the chart**: If the Helm chart has already been deployed with the Replicated Helm method, then the app manager does not attempt the install the chart using native Helm. The following error message is displayed if this check fails: `Deployment method for chart <chart_name> has changed`.

1. **Writes base files**:  The app manager extracts Helm manifests, renders them with Replicated templating, and then adds all files from the original Helm tarball to a `base/charts/` directory.

  Under `base/charts/`, the app manager adds a Kustomization file named `kustomization.yaml` in the directories for each chart and subchart. The app manager uses these Kustomization files later in the deployment process to merge instructions from Kustomize to the chart resources. For more information about Kustomize, see the [Kustomize website](https://kustomize.io).

  The following screenshot from the Replicated admin console shows a `base/charts/` directory for a deployed application. The `base/charts/` directory contains a Helm chart named postgresql with one subchart:

  ![Base directory in the admin console UI](/images/native-helm-base.png)

  In the screenshot above, a Kustomization file that targets the resources from the postgresql Helm chart appears in the `base/charts/postgresql/` directory:

   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   resources:
   - secrets.yaml
   - statefulset.yaml
   - svc-headless.yaml
   - svc.yaml
   ```
   
1. **Writes midstream files with Kustomize instructions from Replicated**: The app manager then copies the directory structure from `base/charts/` to an `overlays/midstream/charts/` directory. The following screenshot shows an example of the midstream directory for the postgresql Helm chart: 
   
  ![Midstream directory in the admin console UI](/images/native-helm-midstream.png)

  As shown in the screenshot above, the midstream directory also contains a Kustomization file with instructions from Replicated for all deployed resources, such as image pull secrets, image rewrites, and backup labels. For example, in the midstream Kustomization file, the app manager rewrites any private images to pull from the Replicated proxy service.

  The following shows an example of a midstream Kustomization file for the postgresql Helm chart:

    ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../../../base/charts/postgresql
    commonAnnotations:
      kots.io/app-slug: native-helm-test
    images:
    - name: gcr.io/replicated-qa/postgresql
      newName: proxy.replicated.com/proxy/native-helm-test/gcr.io/replicated-qa/postgresql
    kind: Kustomization
    patchesStrategicMerge:
    - pullsecrets.yaml
    resources:
    - secret.yaml
    transformers:
    - backup-label-transformer.yaml
    ```

    As shown in the example above, all midstream Kustomization files have a `bases` entry that references the corresponding Kustomization file from the `base/charts/` directory.

1. **Writes downstream files for end user Kustomize instructions**: The app manager then creates an `overlays/downstream/this-cluster/charts` directory and again copies the directory structure of `base/charts/` to this downstream directory:

   ![Downstream directory in the admin console UI](/images/native-helm-downstream.png)

   As shown in the screenshot above, each chart and subchart directory in the downstream directory also contains a Kustomization file. These downstream Kustomization files contain only a `bases` entry that references the corresponding Kustomization file from the midstream directory. For example:

    ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../../../midstream/charts/postgresql
    kind: Kustomization
    ```
   
   End users can edit the downstream Kustomization files to make changes before deploying the application. Any instructions that users add to the Kustomization files in the downstream directory take priority over midstream and base Kustomization files. For more information about how users can make changes before deploying, see [Patching with Kustomize](/enterprise/updating-patching-with-kustomize) in _Enterprise User Documentation_.

1. **Deploys the Helm chart**: The app manager runs `kustomize build` for any Kustomization files in the `overlays/downstream/charts` directory. The app manager then packages the resulting manifests into a new chart for Helm to consume.

   Finally, the app manager runs `helm upgrade -i <release-name> <chart> --timeout 3600s -n <namespace>`. The Helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. Helm uses this secret to track upgrades and rollbacks of applications.


### Replicated Helm {#replicated}

:::note
<ReplicatedHelmDeprecated/>
:::

With the Replicated Helm deployment method, the app manager renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. The app manager also has additional functionality for specific Helm hooks. For example, when the app manager encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it automatically adds the same `kots.io/hook-delete-policy` to the Job object.

The resulting deployment is comprised of standard Kubernetes manifests. Therefore, cluster operators can view the exact differences between what is currently deployed and what an update will deploy.


## Air Gap Installations

The app manager supports native Helm and Replicated Helm installations into air gap environments. When a user installs a Helm chart-based application in an air gap environment, the chart processing is managed in the end user environment. This means that the app manager can use user-supplied values, license values, and existing values to create deployable manifests. For more information, see [`builder`](/reference/custom-resource-helmchart#builder) in the _HelmChart_ reference.