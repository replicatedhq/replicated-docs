# Patching with Kustomize

Kustomize allows you to make last-mile patches to an application outside of the options available in the Replicated admin console Configuration page.

For more information about Kustomize, see the [Kustomize website](https://kustomize.io).

## About the Directory Structure

The **View files** page in the admin console shows the Kubernetes manifests files for the application.

The following image shows an example of the file directory on the **View files** page:

![Kustomize Dir Structure](/images/kustomize-dir-structure.png)

[View a larger version of this image](/images/kustomize-dir-structure.png)

<table>
  <tr>
    <th width="25%">Directory</th>
    <th width="75%">Description</th>
  </tr>
  <tr>
    <td>upstream</td>
    <td><p>The <code>upstream</code> directory mirrors exactly the content pushed to a release.</p>
    <p>This includes the template functions, preflight checks, support-bundle, config options, license, and so on.
    In addition, it has a <code>userdata</code> directory which includes the license file, config file, and so on.</p>
    <p><strong>Note:</strong> With the exception of <code>upstream/userdata</code>, no changes should be made in the <code>upstream</code> directory as they are overwritten on each new release.</p></td>
  </tr>
  <tr>
    <td>base</td>
    <td><p>After the Replicated app manager processes and renders the <code>upstream</code>, it puts those files in the <code>base</code> directory.</p>
    <p>Any non-deployable manifests such as template functions, preflight checks, config options, and so on are removed, and only the deployable application (such as, deployable with <code>kubectl apply</code>) will be placed here.</p>
    <p><strong>Note:</strong> No changes should be made in the <code>base</code> directory as they are overwritten on each new release.</p></td>
  </tr>
  <tr>
    <td>overlays</td>
    <td><p>The <code>overlays</code> directory references the <code>base</code> directory, and this is where your local Kustomize patches should be placed.</p>
    <p>Unlike <code>upstream</code> and <code>base</code>, any changes made here will persist between releases.</p></td>
  </tr>
</table>

## Patch the Overlays Directory

To use Kustomize to patch the application that persists between application updates, you can edit the files in the `overlays/downstream/` directory.

The admin console overwrites the `upstream` and `base` directories each time you upgrade the application to a later version.

1. Go to **View files** and click **Need to edit these files? Click here to learn how**.

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

   **Example**:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: example-nginx
   spec:
     replicas: 2
   ```

   The example above shows editing the `replicas` count by creating a file in `~/my-kots-app/overlays/downstreams/this-cluster/kustomization.yaml` with the following contents:

1. Add the file that you created in the previous step to the Kustomization file in the `overlays` directory at `~/my-kots-app/overlays/downstreams/this-cluster/kustomization.yaml`:

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

1. In the admin console, click **View History** to see the new version of the application with the diff of the changes that you uploaded.

   ![kustomize-view-history-diff](/images/kustomize-view-history-diff.png)

1. Click **Deploy** to apply the changes.

   ![kustomize-view-history-deploy](/images/kustomize-view-history-deploy.png)
