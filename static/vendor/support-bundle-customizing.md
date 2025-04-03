# Adding and Customizing Support Bundles

This topic describes how to add a default support bundle spec to a release for your application. It also describes how to customize the default support bundle spec based on your application's needs. For more information about support bundles, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

The information in this topic applies to Helm applications and Kubernetes manifest-based application installed with Helm or with Replicated KOTS.

## Step 1: Add the Default Spec to a Manifest File

You can add the support bundle spec to a Kubernetes Secret or a SupportBundle custom resource. The type of manifest file that you use depends on your application type (Helm or manifest-based) and installation method (Helm or KOTS).

Use the following guidance to determine which type of manifest file to use for creating a support bundle spec:

* **Helm Applications**: For Helm applications, see the following guidance:

   * **(Recommended) Helm or KOTS v1.94.2 and Later**: For Helm applications installed with Helm or KOTS v1.94.2 or later, create the support bundle spec in a Kubernetes Secret in your Helm chart `templates`. See [Kubernetes Secret](#secret).

   * **KOTS v1.94.1 and Earlier**: For Helm applications installed with KOTS v1.94.1 or earlier, create the support bundle spec in a Preflight custom resource. See [SupportBundle Custom Resource](#sb-cr).

* **Kubernetes Manifest-Based Applications**: For Kubernetes manifest-based applications, create the support bundle spec in a Preflight custom resource. See [SupportBundle Custom Resource](#sb-cr).

### Kubernetes Secret {#secret}

You can define support bundle specs in a Kubernetes Secret for the following installation types:
* Installations with Helm
* Helm applications installed with KOTS v1.94.2 and later

In your Helm chart `templates` directory, add the following YAML to a Kubernetes Secret:   

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: support-bundle
  name: example
stringData:
  support-bundle-spec: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: support-bundle
    spec:
      collectors: []
      analyzers: []
```

As shown above, the Secret must include the following:

* The label `troubleshoot.sh/kind: support-bundle`
* A `stringData` field with a key named `support-bundle-spec`  

This empty support bundle spec includes the following collectors by default:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You do not need manually include the `clusterInfo` or `clusterResources` collectors in the spec.

:::note
If your application is deployed as multiple Helm charts, Replicated recommends that you create separate support bundle specs for each subchart. This allows you to make specs that are specific to different components of your application. When a support bundle is generated, all the specs are combined to provide a single bundle.
:::

After you create this empty support bundle spec, you can test the support bundle by following the instructions in [Generating a Support Bundle](/vendor/support-bundle-generating). You can customize the support bundle spec by adding collectors and analyzers or editing the default collectors. For more information, see [Step 2: Customize the spec](/vendor/support-bundle-customizing#customize-the-spec) below.

### SupportBundle Custom Resource {#sb-cr}

You can define support bundle specs in a SupportBundle custom resource for the following installation types:
* Kubernetes manifest-based applications installed with KOTS
* Helm applications installed with KOTS v1.94.1 and earlier

In a release for your application, add the following YAML to a new `support-bundle.yaml` manifest file:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors: []
  analyzers: []
```
For more information about the SupportBundle custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

This empty support bundle spec includes the following collectors by default:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You do not need manually include the `clusterInfo` or `clusterResources` collectors in the spec.

After you create this empty support bundle spec, you can test the support bundle by following the instructions in [Generating a Support Bundle](/vendor/support-bundle-generating). You can customize the support bundle spec by adding collectors and analyzers or editing the default collectors. For more information, see [Step 2: Customize the spec](/vendor/support-bundle-customizing#customize-the-spec) below.

## Step 2: Customize the Spec {#customize-the-spec}

You can customize the support bundles for your application by:
* Adding collectors and analyzers
* Editing or excluding the default `clusterInfo` and `clusterResources` collectors

### Add Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define.

In addition to the default `clusterInfo` and `clusterResources` collectors, the Troubleshoot open source project includes several collectors that you can include in the spec to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

The following are some recommended collectors:

- [logs](https://troubleshoot.sh/docs/collect/logs/)
- [secret](https://troubleshoot.sh/docs/collect/secret/) and [configMap](https://troubleshoot.sh/docs/collect/configmap/)
- [postgresql](https://troubleshoot.sh/docs/collect/postgresql/), [mysql](https://troubleshoot.sh/docs/collect/mysql/), and [redis](https://troubleshoot.sh/docs/collect/redis/)
- [runPod](https://troubleshoot.sh/docs/collect/run-pod/)
- [copy](https://troubleshoot.sh/docs/collect/copy/) and [copyFromHost](https://troubleshoot.sh/docs/collect/copy-from-host/)
- [http](https://troubleshoot.sh/docs/collect/http/)

### Add Analyzers

Analyzers use the data from the collectors to generate output for the support bundle. Good analyzers clearly identify failure modes and provide troubleshooting guidance for the user. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log and provides a description of the error to the user.

The Troubleshoot open source project includes several analyzers that you can include in the spec. To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

The following are some recommended analyzers:

- [textAnalyze](https://troubleshoot.sh/docs/analyze/regex/)
- [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/)
- [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
- [replicasetStatus](https://troubleshoot.sh/docs/analyze/replicaset-status/)
- [statefulsetStatus](https://troubleshoot.sh/docs/analyze/statefulset-status/)
- [postgresql](https://troubleshoot.sh/docs/analyze/postgresql/), [mysql](https://troubleshoot.sh/docs/analyze/mysql/), and [redis](https://troubleshoot.sh/docs/analyze/redis/)

### Customize the Default `clusterResources` Collector

You can edit the default `clusterResources` using the following properties:

* `namespaces`: The list of namespaces where the resources and information is collected. If the `namespaces` key is not specified, then the `clusterResources` collector defaults to collecting information from all namespaces. The `default` namespace cannot be removed, but you can specify additional namespaces.

* `ignoreRBAC`: When true, the `clusterResources` collector does not check for RBAC authorization before collecting resource information from each namespace. This is useful when your cluster uses authorization webhooks that do not support SelfSubjectRuleReviews. Defaults to false. 

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

The following example shows how to specify the namespaces where the `clusterResources` collector collects information:

```yaml
spec:
  collectors:
    - clusterResources:
        namespaces:
        - default
        - my-app-namespace
        ignoreRBAC: true
```

The following example shows how to use Helm template functions to set the namespace:

```yaml
spec:
  collectors:
    - clusterResources:
        namespaces: {{ .Release.Namespace }}
        ignoreRBAC: true
```

The following example shows how to use the Replicated Namespace template function to set the namespace:

```yaml
spec:
  collectors:
    - clusterResources:
        namespaces: '{{repl Namespace }}'
        ignoreRBAC: true
```
For more information, see [Namespace](/reference/template-functions-static-context#namespace) in _Static Context_. 

### Exclude the Default Collectors

Although Replicated recommends including the default `clusterInfo` and `clusterResources` collectors because they collect a large amount of data to help with installation and debugging, you can optionally exclude them. 

The following example shows how to exclude both the clusterInfo and clusterResources collectors from your support bundle spec:

```yaml
spec:
  collectors:
    - clusterInfo:
        exclude: true
    - clusterResources:
        exclude: true
```

### Examples

For common examples of collectors and analyzers used in support bundle specs, see [Examples of Support Bundle Specs](/vendor/support-bundle-examples).