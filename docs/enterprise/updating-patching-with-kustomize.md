# Patching with Kustomize

Replicated leverages Kustomize to let you make customization patches to an application outside of the options available in the Replicated admin console Configuration page. These patches, which are configured on the View files page of the admin console, overlay the application resource files and can persist after release updates. For example, you can customize the number of replicas that you want to continually use in your environment or specify what `nodeSelectors` to use for a deployment.

For more information, see the [Kustomize website](https://kustomize.io).

## About the Directory Structure

You can patch an application with Kutomize from the View files page in the admin console. The View files page shows the Kubernetes manifest files for the application.

The following images shows an example of the file directory on the View files page:

![Kustomize Dir Structure](/images/kustomize-dir-structure.png)

[View a larger version of this image](/images/kustomize-dir-structure.png)

For more information about each of the sections in the file directory, see the following sections:

- [Upstream](#upstream)
- [Base](#base)
- [Overlays](#overlays)
- [skippedFiles](#skippedfiles)

### Upstream

The following table describes the `upstream` directory and whether the changes persist after an update:

<table>
  <thead>
    <tr>
      <th width="16%">Directory</th>
      <th width="15%">Changes Persist?</th>
      <th width="67%">Description</th>
    </tr>
  </thead>
    <tr>
      <td><code>upstream</code></td>
      <td>No, except for the <code>userdata</code> subdirectory</td>
      <td><p>The <code>upstream</code> directory exactly mirrors the content pushed to a release.</p><p>Contains the template functions, preflight checks, support bundle, config options, license, and so on.</p><p>Contains a <code>userdata</code> subdirectory that includes user data files such as the license file and the config file.</p></td>
    </tr>
</table>

### Base

The following table describes the `base` directory and whether the changes persist after an update:

<table>
  <thead>
    <tr>
      <th width="16%">Directory</th>
      <th width="15%">Changes Persist?</th>
      <th width="67%">Description</th>
    </tr>
  </thead>
    <tr>
      <td><code>base</code></td>
      <td>No</td>
      <td><p>After the Replicated app manager processes and renders the <code>upstream</code>, it puts those files in the <code>base</code> directory.</p><p>Only the deployable application files, such as deployable with <code>kubectl apply</code>, are placed here.</p><p>Any non-deployable manifests, such as template functions, preflight checks, and config options, are removed.</p></td>
    </tr>
</table>


### Overlays

The `overlays` directory contains the following subdirectories that apply specific kustomizations to the `base` directory when deploying a version to the cluster:
 The table also specifies for each subdirectory whether the changes persist after an update.
  <table>
    <thead>
      <tr>
        <th width="16%">Subdirectory</th>
        <th width="15%">Changes Persist?</th>
        <th width="67%">Description</th>
      </tr>
    </thead>
      <tr>
        <td><code>midstream</code></td>
        <td>No</td>
        <td><p>Contains app manager-specific kustomizations, such as:</p>
        <ul>
          <li>Backup labels, such as those used to configure Velero.</li>
          <li>Image pull secret definitions and patches to inject the <code>imagePullSecret</code> field into relevant manifests (such as deployments, stateful sets, and jobs).</li>
        </ul>
        </td>
      </tr>
      <tr>
        <td><code>downstream</code></td>
        <td>Yes</td>
        <td><p>Contains user-defined kustomizations that are applied to the <code>midstream</code> directory and deployed to the cluster.</p><p>Only one <code>downstream</code> subdirectory is supported. It is automatically created and named <code>this-cluster</code> when the admin console is installed.</p><p>To add kustomizations, see <a href="#patch-your-application">Patch Your Application</a>.</p></td>
      </tr>
      <tr>
        <td><code>midstream/charts</code></td>
        <td>No</td>
        <td><p>Appears only when the <code>useHelmInstall</code> property is set to <code>true</code>.</p><p>Contains a subdirectory for each Helm chart. Each Helm chart has its own kustomizations because each chart is rendered and deployed separately from other charts and manifests.</p><p>The subcharts of each Helm chart also have their own kustomizations and are rendered separately. However, these subcharts are included and deployed as part of the parent chart.</p></td>
      </tr>
      <tr>
        <td><code>downstream/charts</code></td>
        <td>Yes</td>
        <td><p>Appears only when the <code>useHelmInstall</code> property is set to <code>true</code>.</p><p>Contains a subdirectory for each Helm chart. Each Helm chart has its own kustomizations because each chart is rendered and deployed separately from other charts and manifests.</p><p>The subcharts of each Helm chart also have their own kustomizations and are rendered separately. However, these subcharts are included and deployed as part of the parent chart.</p></td>
      </tr>
  </table>

### skippedFiles

The `skippedFiles` directory lists files that the app manager is not able to process or render, such as invalid YAML files.

The `_index.yaml` file contains metadata and details about the errors, such as which files they were found in and sometimes the line number of the error.

## Patch an Application

To patch the application with Kustomize so that your changes persist between updates, edit the files in the `overlays/downstream/` directory.

The admin console overwrites the `upstream` and `base` directories each time you upgrade the application to a later version.

To patch your application:

1. On the View Files tab in the admin console, click **Need to edit these files? Click here to learn how**.

   ![edit-patches-kots-app](/images/edit-patches-kots-app.png)

1. To download the application bundle locally:

   ```shell
   kubectl kots download --namespace APP_NAMESPACE --slug APP_SLUG --dest ~/MY_KOTS_APP
     • Connecting to cluster ✓
   ```
   Replace:
   * `APP_NAMESPACE` with the namespace on the cluster where the application is deployed.
   * `APP_SLUG` with the unique slug for the application.
   * `MY_KOTS_APP` with the name of the application.

   You can copy these values from the dialog that appears when you click **Need to edit these files? Click here to learn how**. For more information about the `--dest` flag, see [download](/reference/kots-cli-download).

1. Create a Kubernetes manifest YAML file and make any desired edits.

  The following example shows an edit to the number of replicas:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: example-nginx
   spec:
     replicas: 2
   ```

1. Add the file that you created in the previous step to the `kustomization.yaml` file located in `~/MY_KOTS_APP/overlays/downstreams/this-cluster/kustomization.yaml`.

  **Example:**

   ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../midstream
    kind: Kustomization
    patches:
    - ./FILENAME.yaml
   ```

1. Upload your changes to the cluster:

   ```shell
   export APP_NAMESPACE=app-namespace
   export APP_SLUG=app-slug
   kubectl kots upload --namespace ${APP_NAMESPACE} --slug ${APP_SLUG} ~/MY_KOTS_APP
     • Uploading local application to Admin Console ✓
   ```

1. On the Version History tab in the admin console, click **Diff** to see the new version of the application with the diff of the changes that you uploaded.

   ![kustomize-view-history-diff](/images/kustomize-view-history-diff.png)

1. Click **Deploy** to apply the changes.

1. Verify your changes. For example, running the following command shows that there are two NGINX pods running after deploying two replicas in the example YAML above:

  ```shell
  $ kubectl get po | grep example-nginx
  ```
  **Example output:**

  ```shell
  example-nginx-f5c49fdf6-bf584         1/1     Running     0          1h
  example-nginx-t6ght74jr-58fhr         1/1     Running     0          1m
  ```
