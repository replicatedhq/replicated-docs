# How the App Manager Processes Helm Charts

This topic describes how the Replicated app manager deploys Helm chart when using either the Native Helm or Replicated KOTS Helm chart installation method.

## Native Helm

The Native Helm installation method uses the Helm binary to deploy charts instead of `kubectl apply`. This helps support Helm lifecycle instruments such as Helm Hooks and Weights.

To process Helm charts using the Native Helm method, the app manager does the following:

* **Checks for previous installations of the chart**: The app manager checks previous versions of the installed app, checking if the chart has been installed previously without Native Helm. This step ensures the app manager will not attempt a Native Helm install of a chart that has already been deployed by the app manager without Native Helm. If this check fails, the following error will be displayed: `Deployment method for chart <chart> has changed`
* **Writes base files**:  The app manager extracts Helm manifests, renders them with Replicated templating, and adds them to `base/charts`.

   After Replicated templating is processed on the `values.yaml` file, all files from the original Helm tarball are written to the `base/charts/` directory, maintaining the original directory structure of the Helm Chart. A `kustomization.yaml` file is included in each chart and sub chart directory. This is used later to merge [kustomization](https://kustomize.io) instructions up to the chart resources.

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
* **Writes midstream files**: The `midstream` directory contains Replicated kustomize instructions for all deployed resources, such as imagePullSecrets, image proxies, and backup labels.

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


* **Writes downstream files**: Replicated allows last-mile customization on Helm resources using downstream kustomize files.

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


* **Deploys the Helm chart**: Replicated uses the Helm binary to install the fully-rendered chart resources.

   When deploying the application, Replicated walks the `overlays/downstream/charts` directory looking for `kustomization.yaml` files. Upon finding them, the app manager will run `kustomize build` on the files. The resulting manifests are packaged together into a new tarball for Helm to consume.

   The app manager finally runs `helm upgrade -i chart.tar.gz`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.

## Replicated KOTS

The Replicated KOTS Helm installation is compatible with both Helm v2 and Helm v3 as it does not rely on Tiller to deploy the chart into the cluster. Instead, the Replicated app manager treats a Helm Chart as the packaging spec rather than the deployment tool.

* **Creates deployable YAML**: The Replicated Helm installation creates deployable YAML by using the same functionality that the `helm template` command uses, with some extended functionality for [specific Helm hooks](packaging-cleaning-up-jobs#helm-charts).

* **Runs Helm upgrade command**: Replicated runs the following command: `helm upgrade -i chart.tar.gz --timeout 60m -n {namespace}`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a Release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.

When a Helm chart-based application is installed in an air gap environment, the processing of the chart is managed in the end customer environment (with the kots CLI or as part of the Replicated admin console). This means that the customer supplied values, license values, and existing values can be used to create the deployable manifests. For more information, see [builder](/reference/custom-resource-helmchart#builder) in _HelmChart_.

In both online and air gap scenarios, the resulting deployment is comprised of raw Kubernetes manifests. Therefore, cluster operator's are always able to view the exact difference between what is currently deployed and what the update will deploy. This level of change management provides the necessary transparency to provide the level of assurance that cluster operators require.