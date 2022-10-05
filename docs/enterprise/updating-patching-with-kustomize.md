# Patching with Kustomize

Kustomize lets you make last-mile patches to an application outside of the options available in the Replicated admin console Configuration page.

For more information, see the [Kustomize website](https://kustomize.io).

## About the Directory Structure

The View files page in the admin console shows the Kubernetes manifest files for the application.

The following images shows an example of the file directory on the View files page:

![Kustomize Dir Structure](/images/kustomize-dir-structure.png)

[View a larger version of this image](/images/kustomize-dir-structure.png)

### Upstream

The `upstream` directory exactly mirrors the content pushed to a release.
This includes the template functions, preflight checks, support-bundle, config options, license, and so on.
It also has a `userdata` directory which includes the license file, the config file, and so on.

**Note:** With the exception of `upstream/userdata`, no changes should be made in the `upstream` directory because it is overwritten on each new release.

### Base

After the Replicated app manager processes and renders the `upstream`, it puts those files in the `base` directory.
Any non-deployable manifests such as template functions, preflight checks, config options, and so on are removed, and only the deployable application (such as, deployable with `kubectl apply`) is placed here.

**Note:** No changes should be made in the `base` directory because it is overwritten on each new release.

### Overlays

The `overlays` directory contains subdirectories that apply specific kustomizations to the `base` directory when deploying a version to the cluster. Only the `downstream` subdirectory contains user-defined kustomizations.

<table>
  <tr>
    <th width="20%">Subdirectory</th>
    <th width="10%">Changes Persist?</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>midstream</td>
    <td>No</td>
    <td><p>Contains app manager-specific kustomizations, such as:</p><p>- Backup labels, such as those used to configure Velero.</p><p>- Image pull secret definitions and patches to inject the <code>imagePullSecret</code> field into relevant manifests (such as deployments, stateful sets, and jobs).</p></td>
  </tr>
  <tr>
    <td>downstream</td>
    <td>Yes</td>
    <td><p>Contains user-defined kustomizations that are applied to the <code>midstream</code> directory and deployed to the cluster.</p><p>Only one <code>downstream</code> subdirectory is supported. It is automatically created and named <code>this-cluster</code> when the admin console is installed.</p><p>To add kustomizations, see <a href="#kustomize-your-application">Kustomize Your Application</a>.</p></td>
  </tr>
  <tr>
    <td>charts</td>
    <td>Yes</td>
    <td><p><code>Charts</code> only appears if a native Helm installation workflow is used.</p><p>Contains a subdirectory for each Helm chart. Each Helm chart has its own kustomizations because each chart is rendered and deployed separately from other charts and manifests.</p><p>The subcharts of each Helm chart also have their own kustomizations and are rendered separately. However, these subcharts are included and deployed as part of the parent chart.</p></td>
  </tr>
</table>

### skippedFiles

The `skippedFiles` directory lists files that the app manager was not able to process or render, such as invalid YAML files.

The `_index.yaml` file continas metadata and details about the errors, such as which files they were found in and sometimes the line number of the error.

## Kustomize Your Application

To use Kustomize to patch the application so that your changes persist between updates, edit the files in the `overlays/downstream/` directory.

The admin console overwrites the `upstream` and `base` directories each time you upgrade the application to a later version.

To kustomize your application:

1. On the View Files tab, click **Need to edit these files? Click here to learn how**.

   ![edit-patches-kots-app](/images/edit-patches-kots-app.png)

1. To download the application bundle locally:

   ```shell
   kubectl kots download --namespace APP_NAMESPACE --slug APP_SLUG --dest ~/my-kots-app
     • Connecting to cluster ✓
   ```
   Replace:
   * `APP_NAMESPACE` with the namespace on the cluster where the application is deployed.
   * `APP_SLUG` with the unique slug for the application.

   You can copy these values from the dialog that appears when you click **Need to edit these files? Click here to learn how**.

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

1. Add the file that you created in the previous step to the `kustomization.yaml` file in the `overlays/downstreams/this-cluster` directory, located at `~/my-kots-app/overlays/downstreams/this-cluster/kustomization.yaml`:

   ```diff
   @@ -2,3 +2,5 @@
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../midstream
    kind: Kustomization
   +patches:
   +- ./FILENAME.yaml
   ```
   Replace `FILENAME` with the name of the manifest file that you created in the previous step.

1. Upload your changes to the cluster:

   ```shell
   export APP_NAMESPACE=app-namespace
   export APP_SLUG=app-slug
   kubectl kots upload --namespace ${APP_NAMESPACE} --slug ${APP_SLUG} ~/my-kots-app
     • Uploading local application to Admin Console ✓
   ```

1. In the admin console, go to the Version History tab and click **Diff** to see the new version of the application with the diff of the changes that you uploaded.

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
