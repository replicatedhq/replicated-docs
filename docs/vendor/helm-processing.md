# Helm processing

The Replicated Helm installation is compatible with both Helm v2 and Helm v3 as it does not rely on Tiller to deploy the chart into the cluster. Instead, KOTS treats a Helm Chart as the packaging spec rather than the deployment tool. The Replicated Helm installation creates deployable YAML by leveraging the same functionality that the `helm template` command uses (with some extended functionality for [specific Helm hooks](/vendor/packaging/cleaning-up-jobs/#helm-charts)).

When a [Helm chart based KOTS application is installed via airgap](/vendor/helm/helm-airgap-builder), the processing of the chart is managed in the end customer environment (via the KOTS CLI or as part of the Admin Console). This means that the customer supplied values, license values, and existing values can be used to create the deployable manifests.


In either scenario the resulting deployment is comprised of raw Kubernetes manifests. Therefore, cluster operator's are always able to view the exact diff between what is currently deployed and what the update will deploy. This level of change management provides the necessary transparency to provide the level of assurance that cluster operators require.

## Helm v3

To determine if Helm v3 is necessary, KOTS will check the apiVersion supplied in the `Chart.yaml` file of the Helm Chart. By default (if **Chart.yaml** is not supplied or apiVersion is not present), KOTS will use Helm V2 to process all Helm Charts to create deployable YAML. Optionally, an API version can be specified in the KOTS [`HelmChart`](https://kots.io/reference/v1beta1/helmchart/) resource. When the `helmVersion` property is set to `"v3"`, KOTS will use Helm v3 to process the Helm Chart.

In the future KOTS may be updated to use Helm v3 by default.

## Native Helm

Our [Native Helm](https://kots.io/vendor/helm/using-native-helm-charts/) feature utilizes the Helm binary to deploy charts instead of `kubectl apply`. This helps support Helm lifecycle instruments such as Helm Hooks and Weights.

Processing Helm charts for the Replicated App Manager is accomplished with five high-level steps:

1) **Check for Previous Installations of the Chart**

Replicated checks previous versions of the installed app, checking if the chart has been installed previously without Native Helm.

This step ensures the app manager will not attempt a Native Helm install of a chart that has already been deployed by the App Manager without Native Helm. If this check fails, the following error will be displayed:
```
Deployment method for chart <chart> has changed
```
**Note:** We do not yet support migrating existing app installations to Native Helm installations. Until migrations are supported, the recommended path is removing the application from the Replicated App Manager and installing fresh with Native Helm. This will cause data loss as PVCs will be removed in the process.


2) **Write Base Files**

The Helm manifests are extracted, rendered with Replicated templating, and added to `base/charts`.

Replicated's [`HelmChart` spec](https://kots.io/reference/v1beta1/helmchart/) can be modified to allow the `ConfigOptions` to [overwrite a chart's values](https://kots.io/reference/v1beta1/helmchart/#values). This allows vendors to surface a chart's value options inside the Replicated Config page. After Replicated templating is processed on the `values.yaml` file, all files from the original Helm tarball are written to the `base/charts/` directory, maintaining the original directory structure of the Helm Chart. A `kustomization.yaml` file is included in each chart and sub chart directory. This is used later to merge kustomization instructions up to the chart resources.

**Example**
	In this example, a `base` directory is illustrated and the `base/charts/postgresql/kustomization.yaml` targets chart resources:

![Base directory example for Native Helm charts](/images/native-helm-base.png)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- secrets.yaml
- statefulset.yaml
- svc-headless.yaml
- svc.yaml
```


3) **Write Midstream Files**

Midstream contains Replicated kustomize instructions for all deployed resources, such as imagePullSecrets, image proxies, and backup labels.

The directory structure in `base/charts` is copied to `overlays/midstream/charts`. Replicated searches all manifests for private images. These images are added to a `kustomization.yaml` file, which is written at the chart or subchart level matching the resource being kustomized. For example, if the postgres image is found at `base/charts/postgres/templates/deployment.yaml`, the `kustomization.yaml` to overwrite the image will be added to `overlays/midstream/charts/postgres/kustomization.yaml`. This midstream kustomization has a `bases` entry that points to the corresponding `kustomization.yaml` file from `base`. Other midstream kustomizations are processed here as well, such as backup label transformers and image pull secrets. They are appended to the same file as above for each chart and subchart.

**Example**
	In this example, a `midstream` directory is illustrated and the `overlays/midstream/charts/postgresql/kustomization.yaml` adds Replicated customization:

![Midstream directory example for Native Helm charts](/images/native-helm-midstream.png)

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


4) **Write Downstream Files**

Replicated allows last-mile customization on Helm resources using downstream kustomize files.

As above, the directory structure in `base/charts` is copied to `overlays/downstream/this-cluster/charts`. Each chart and subchart directory receives a `kustomization.yaml`. These files only have `bases` defined, which points to the corresponding `midstream` kustomization file from step 3. These downstream `kustomization.yaml` files can be edited before deploying the application. Any kustomize instructions here will take priority over `midstream` and `base` kustomizations.

**Example**
	In this example, a `downstream` directory is illustrated and the `overlays/downstream/this-cluster/charts/postgresql/kustomization.yaml` provides a template for last-mile overrides:

![Downstream directory example for Native Helm charts](/images/native-helm-downstream.png)

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
bases:
- ../../../../midstream/charts/postgresql
kind: Kustomization

```


5) **Deploy Helm Chart**

Replicated leverages the Helm binary to install the fully-rendered chart resources.

When deploying the application, Replicated walks the `overlays/downstream/charts` directory looking for `kustomization.yaml` files. Upon finding them, App Manager will run `kustomize build` on the files. The resulting manifests are packaged together into a new tarball for Helm to consume.

Replicated finally runs `helm upgrade -i chart.tar.gz`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a Release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.
