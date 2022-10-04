# Patching with Kustomize

Kustomize lets you make last-mile patches to an application outside of the options available in the Replicated admin console Configuration page.

For more information, see the [Kustomize website](https://kustomize.io).

## About the Directory Structure

The View files page in the admin console shows the Kubernetes manifest files for the application.

The following images shows an example of the file directory on the View files page:

![Kustomize Dir Structure](/images/kustomize-dir-structure.png)

[View a larger version of this image](/images/kustomize-dir-structure.png)

The following table describes the directories and subdirectories:

<table>
  <tr>
    <th width="25%">Directory</th>
    <th width="25%">Subdirectory</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>upstream</td>
    <td></td>
    <td><p>The <code>upstream</code> directory mirrors exactly the content pushed to a release.</p>
    <p>This includes the template functions, preflight checks, support-bundle, config options, license, and so on.
    In addition, it has a <code>userdata</code> directory which includes the license file, config file, and so on.</p>
    <p><strong>Note:</strong> With the exception of <code>upstream/userdata</code>, no changes should be made in the <code>upstream</code> directory because it is overwritten on each new release.</p></td>
  </tr>
</table>
### Upstream

The `upstream` directory mirrors exactly the content pushed to a release.
This includes the template functions, preflight checks, support-bundle, config options, license, and so on.
In addition, it has a `userdata` directory which includes the license file, config file, and so on.

**Note:** With the exception of `upstream/userdata`, no changes should be made in the `upstream` directory because it is overwritten on each new release.

### Base

After the Replicated app manager processes and renders the `upstream`, it puts those files in the `base` directory.
Any non-deployable manifests such as template functions, preflight checks, config options, and so on are removed, and only the deployable application (such as, deployable with `kubectl apply`) is placed here.

**Note:** No changes should be made in the `base` directory because it is overwritten on each new release.

### Overlays

The `overlays` directory contains subdirectories that apply specific kustomizations to the base directory when you deploy a version to the cluster.

#### Midstream

The `midstream` subdirectory contains app manager-specific kustomizations that do not persist when you upgrade.

Kustomize patches in this subdirectory include backup labels that are used to configure Velero when you create backups.

It also contains the YAML definitions for image pull secrets that pulls images from the relevant registry and injects the imagePullSecret field into the applications manifests such as deployments, stateful sets, jobs, and so on.

**Note:** No changes should be made in the `midstream` subdirectory because it is overwritten on each new release.

#### Charts

The `charts` subdirectory only exists if a native Helm installation workflow is being used. This subdirectory contains



## Patch the Downstream Overlay

Since `upstream` and `base` are ephemeral, let's make a Kustomize patch in `overlays/downstreams/this-cluster/` so it persists between releases.

Go to View Files and click **Need to edit these files? Click here to learn how**.

![edit-patches-kots-app](/images/edit-patches-kots-app.png)

To download the app manager locally:

```shell
export APP_NAMESPACE=app-namespace
export APP_SLUG=app-slug
kubectl kots download --namespace ${APP_NAMESPACE} --slug ${APP_SLUG} --dest ~/my-kots-app
  • Connecting to cluster ✓
```

Let's patch something simple like the `replicas` count:
Create a file in `~/my-kots-app/overlays/downstreams/this-cluster/patch-deployment.yaml` with the following:

```shell
cat <<EOF >>~/my-kots-app/overlays/downstreams/this-cluster/patch-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-nginx
spec:
  replicas: 2
EOF
```

Don't forget to add this file under `patches` in `~/my-kots-app/overlays/downstreams/this-cluster/kustomization.yaml`:

```diff
@@ -2,3 +2,5 @@
 apiVersion: kustomize.config.k8s.io/v1beta1
 bases:
 - ../../midstream
 kind: Kustomization
+patches:
+- ./patch-deployment.yaml
```

Upload the app manager to the cluster:

```shell
export APP_NAMESPACE=app-namespace
export APP_SLUG=app-slug
kubectl kots upload --namespace ${APP_NAMESPACE} --slug ${APP_SLUG} ~/my-kots-app
  • Uploading local application to Admin Console ✓
```

Under View History, you should see a new version ready to deploy along with the diff of the changes we pushed in the last few steps.

![kustomize-view-history-diff](/images/kustomize-view-history-diff.png)

Before deploying, ensure there is only 1 NGINX pod running:

```shell
$ kubectl get po | grep example-nginx
example-nginx-f5c49fdf6-bf584         1/1     Running     0          1h
```

Click **Deploy** to apply the changes.

![kustomize-view-history-deploy](/images/kustomize-view-history-deploy.png)

You should now see 2 NGINX pods running:

```shell
$ kubectl get po | grep example-nginx
example-nginx-f5c49fdf6-bf584         1/1     Running     0          1h
example-nginx-t6ght74jr-58fhr         1/1     Running     0          1m
```
