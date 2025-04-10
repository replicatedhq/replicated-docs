# Defining Preflight Checks

This topic describes how to define preflight checks in Helm and Kubernetes manifest-based applications. For more information about preflight checks, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

The information in this topic applies to applications that are installed with Helm or with Replicated KOTS.

## Step 1: Create the Manifest File

You can define preflight checks in a Kubernetes Secret or in a Preflight custom resource. The type of manifest file that you use depends on your application type (Helm or Kubernetes manifest-based) and the installation methods that your application supports (Helm, KOTS v1.101.0 or later, or KOTS v1.100.3 or earlier).

* **Helm Applications**: For Helm applications, see the following guidance:

   * **(Recommended) Helm or KOTS v1.101.0 or Later**: For Helm applications installed with Helm or KOTS v1.101.0 or later, define the preflight checks in a Kubernetes Secret in your Helm chart `templates`. See [Kubernetes Secret](#secret).

   * **KOTS v1.100.3 or Earlier**: For Helm applications installed with KOTS v1.100.3 or earlier, define the preflight checks in a Preflight custom resource. See [Preflight Custom Resource](#preflight-cr).

* **Kubernetes Manifest-Based Applications**: For Kubernetes manifest-based applications, define the preflight checks in a Preflight custom resource. See [Preflight Custom Resource](#preflight-cr).

### Kubernetes Secret {#secret}

For Helm applications installed with Helm or KOTS v1.101.0 or later, define preflight checks in a Kubernetes Secret in your Helm chart `templates`. This allows you to define the preflights spec only one time to support running preflight checks in both Helm and KOTS installations. 

For a tutorial that demonstrates how to define preflight checks in a Secret in chart `templates` and then run the preflight checks in both Helm and KOTS installations, see [Tutorial: Add Preflight Checks to a Helm Chart](/vendor/tutorial-preflight-helm-setup).

Add the following YAML to a Kubernetes Secret in your Helm chart `templates` directory:

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: preflight
  name: "{{ .Release.Name }}-preflight-config"
stringData:
  preflight.yaml: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: preflight-sample
    spec:
      collectors: []
      analyzers: []
```

As shown above, the Secret must include the following:

* The label `troubleshoot.sh/kind: preflight`
* A `stringData` field with a key named `preflight.yaml` so that the preflight binary can use this Secret when it runs from the CLI

### Preflight Custom Resource {#preflight-cr}

Define preflight checks in a Preflight custom resource for the following installation types:
* Kubernetes manifest-based applications installed with any version of KOTS
* Helm applications installed with KOTS v1.100.3 and earlier
    :::note
    For Helm charts installed with KOTS v1.101.0 and later, Replicated recommends that you define preflight checks in a Secret in the Helm chart `templates` instead of using the Preflight custom resource. See [Create a Secret](#secret) above.

    In KOTS v1.101.0 and later, preflights defined in the Helm chart override the Preflight custom resource used by KOTS. During installation, if KOTS v1.101.0 and later cannot find preflights specified in the Helm chart archive, then KOTS searches for `kind: Preflight` in the root of the release.
    :::

Add the following YAML to a new file in a release:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflights
spec:
  collectors: []
  analyzers: []
```

For more information about the Preflight custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

## Step 2: Define Collectors and Analyzers

This section describes how to define collectors and analyzers for preflight checks based on your application needs. You add the collectors and analyzers that you want to use in the `spec.collectors` and `spec.analyzers` keys in the manifest file that you created.

### Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks. 

The following default collectors are included automatically to gather information about the cluster and cluster resources:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You do not need manually include the `clusterInfo` or `clusterResources` collectors in the specification. To use only the `clusterInfo` and `clusterResources` collectors, delete the `spec.collectors` key from the preflight specification.

The Troubleshoot open source project includes several additional collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

### Analyzers

Analyzers use the output from the collectors to generate results for the preflight checks, including the criteria for pass, fail, and warn outcomes and custom messages for each outcome.

For example, in a preflight check that checks the version of Kubernetes running in the target cluster, the analyzer can define a fail outcome when the cluster is running a version of Kubernetes less than 1.25 that includes the following custom message to the user: `The application requires Kubernetes 1.25.0 or later, and recommends 1.27.0`.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. The following are some of the analyzers in the Troubleshoot project that use the default `clusterInfo` or `clusterResources` collectors:
* [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
* [clusterVersion](https://troubleshoot.sh/docs/analyze/cluster-version/)
* [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/)
* [distribution](https://troubleshoot.sh/docs/analyze/distribution/)
* [nodeResources](https://troubleshoot.sh/docs/analyze/node-resources/)
* [statefulsetStatus](https://troubleshoot.sh/docs/analyze/stateful-set-status/)
* [storageClass](https://troubleshoot.sh/docs/analyze/storage-class/)

To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

### Block Installation with Required (Strict) Preflights {#strict}

For applications installed with KOTS, you can set any preflight analyzer to `strict: true`. When `strict: true` is set, any `fail` outcomes for the analyzer block the deployment of the release.

:::note
Strict preflight analyzers are ignored if the `exclude` property is also included and evaluates to `true`. See [exclude](https://troubleshoot.sh/docs/analyze/#exclude) in the Troubleshoot documentation.
:::

### Examples

For common examples of collectors and analyzers used in preflight checks, see [Examples of Preflight Specs](/vendor/preflight-examples).