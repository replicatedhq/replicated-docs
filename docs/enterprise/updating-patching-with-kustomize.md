# Patching with Kustomize

[Kustomize](https://kustomize.io) allows for last-mile patches (i.e. modifications) to the app that are otherwise not configurable via `Config` page.

## Directory Structure

Click on `View files` and lets take a look at the directory structure.

![Kustomize Dir Structure](/images/kustomize-dir-structure.png)

### Upstream

The `upstream` directory mirrors exactly the content pushed to a release.
This includes the template functions, preflight checks, support-bundle, config options, license etc.
In addition, it has a `userdata` directory which includes the license file, config file, etc.

**Note:** With the exception of `upstream/userdata`, no changes should be made in the `upstream` directory as they are overwritten on each new release.

### Base

After KOTS processes and renders the `upstream`, it puts those files in the `base` directory.
Any non-deployable manifests such as template functions, preflight checks, config options, and so on are removed, and only the "deployable" application (such as, deployable with `kubectl apply`) will be placed here.

**Note:** No changes should be made in the `base` directory as they are overwritten on each new release.

### Overlays

The `overlays` directory references the `base` directory, and this is where your local kustomize patches should be placed.
Unlike `upstream` and `base`, any changes made here will persist between releases.

* * *

## Patching the Overlays

Since `upstream` and `base` are ephemeral, let's make a kustomize patch in `overlays/downstreams/this-cluster/` so it persists between releases.

Go to View Files and click on **Need to edit these files? Click here to learn how**.

![edit-patches-kots-app](/images/edit-patches-kots-app.png)

To download the KOTS app locally:

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

Upload the KOTS app to the cluster:

```shell
export APP_NAMESPACE=app-namespace
export APP_SLUG=app-slug
kubectl kots upload --namespace ${APP_NAMESPACE} --slug ${APP_SLUG} ~/my-kots-app
  • Uploading local application to Admin Console ✓
```

Under View history, you should see a new version ready to deploy along with the diff of the changes we pushed in the last few steps.

![kustomize-view-history-diff](/images/kustomize-view-history-diff.png)

Before deploying, ensure there is only 1 nginx pod running:

```shell
$ kubectl get po | grep example-nginx
example-nginx-f5c49fdf6-bf584         1/1     Running     0          1h
```

Click **Deploy** to apply the changes.

![kustomize-view-history-deploy](/images/kustomize-view-history-deploy.png)

You should now see 2 nginx pods running:

```shell
$ kubectl get po | grep example-nginx
example-nginx-f5c49fdf6-bf584         1/1     Running     0          1h
example-nginx-t6ght74jr-58fhr         1/1     Running     0          1m
```
