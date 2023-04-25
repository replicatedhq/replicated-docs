# About HelmChart Custom Resources and Processing

This topic describes how the HelmChart custom resource works with native Helm and Replicated Helm releases. It also describes how the Replicated app manager processes native Helm charts for deployment.

## About the HelmChart Custom Resource

Replicated supports using native Helm and Replicated Helm to deliver an enterprise applications as Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

You start by adding add one or more Helm charts to a release in the vendor portal by uploading each Helm chart as a `.tgz` file. When you add a Helm chart to a release, Replicated displays a copy of the `Chart.yaml` file and the `values.yaml` file from the Helm chart to the release. For information about how to create a new release, see [Creating Releases with the Vendor Portal](releases-creating-release).

You must also add a HelmChart custom resource manifest file for each Helm chart that you add to a release. When you drag and drop a Helm chart <code>.tgz</code> to a release in the vendor portal, Replicated automatically creates a corresponding HelmChart custom resource manifest that uses the naming convention <code>CHART_NAME.yaml</code>. For example, <code>postgresql.yaml</code>. If you are using the CLI, you must add the HelmChart custom resource manually.

The following table provides more information about these files:

<table>
<tr>
  <th width="30%">File</th>
  <th>Description</th>
</tr>
<tr>
  <td>HelmChart custom resource</td>
  <td>A HelmChart custom resource is a YAML file with <code>kind: HelmChart</code>.
  <br/>
  <br/>
  The HelmChart custom resource references the <code>.tgz</code> export of the Helm chart and provides the necessary instructions to the app manager for processing and preparing the chart for deployment.
  <br/>
  <br/>
  For more information, see <a href="/reference/custom-resource-helmchart">HelmChart</a> in the <em>Custom Resources</em> section.</td>
</tr>
<tr>
  <td>Chart.yaml</td>
  <td>Replicated extracts the <code>Chart.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
<tr>
  <td>values.yaml</td>
  <td>Replicated extracts the <code>values.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
</table>

For example, the following screenshot shows how a Postgres Helm chart displays in the file tree of a release in the vendor portal:

![Postgres Helm Chart](/images/postgres-helm-chart.png)

[View a larger image](/images/postgres-helm-chart.png)

## About Native Helm Processing

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

## About Updating Replicated Helm Releases

`useHelmInstall` is a chart-level flag that is set to `true` to specify the use of native Helm. Native Helm can only be set for new charts. Modifying this flag in existing charts for existing applications is not supported because charts installed with Replicated Helm cannot be migrated to native Helm.

However, you can add native Helm charts to an existing release that already uses Replicated Helm. Each chart is installed using the specified installation method for that chart, indicated by the value of the `useHelmInstall` flag.

