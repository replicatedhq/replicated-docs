import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HttpSecret from "../partials/support-bundles/_http-requests-secret.mdx"
import HttpCr from "../partials/support-bundles/_http-requests-cr.mdx"
import NodeStatusSecret from "../partials/support-bundles/_node-status-secret.mdx"
import NodeStatusCr from "../partials/support-bundles/_node-status-cr.mdx"
import K8sVersionSecret from "../partials/support-bundles/_k8s-version-secret.mdx"
import K8sVersionCr from "../partials/support-bundles/_k8s-version-cr.mdx"
import DeployStatusSecret from "../partials/support-bundles/_deploy-status-secret.mdx"
import DeployStatusCr from "../partials/support-bundles/_deploy-status-cr.mdx"
import NodeResourcesSecret from "../partials/support-bundles/_node-resources-secret.mdx"
import NodeResourcesCr from "../partials/support-bundles/_node-resources-cr.mdx"
import LogsSelectorsSecret from "../partials/support-bundles/_logs-selectors-secret.mdx"
import LogsSelectorsCr from "../partials/support-bundles/_logs-selectors-cr.mdx"
import LogsLimitsSecret from "../partials/support-bundles/_logs-limits-secret.mdx"
import LogsLimitsCr from "../partials/support-bundles/_logs-limits-cr.mdx"
import RedisMysqlSecret from "../partials/support-bundles/_redis-mysql-secret.mdx"
import RedisMysqlCr from "../partials/support-bundles/_redis-mysql-cr.mdx"
import RunPodsSecret from "../partials/support-bundles/_run-pods-secret.mdx"
import RunPodsCr from "../partials/support-bundles/_run-pods-cr.mdx"

# Adding and Customizing Support Bundles

This topic describes how to add a default support bundle specification to a release for your application. It also describes how to optionally customize the default support bundle specification based on your application's needs. For more information about support bundles, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

The information in this topic applies to Helm chart- and standard manifest-based application installed with the Helm CLI or with Replicated KOTS.

## Add the Specification to a Manifest File

This section describes how to add an empty support bundle specification to a manifest file. An empty support bundle specification includes the following collectors by default:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You do not need manually include the `clusterInfo` or `clusterResources` collectors in the specification.

After you create this empty support bundle specification, you can test the support bundle by following the instructions in [Generating a Support Bundle](/vendor/support-bundle-generating). You can also optionally customize the support bundle specification by adding collectors and analyzers or editing the default collectors. For more information, see [(Optional) Customize the Specification](/vendor/support-bundle-customizing#optional-customize-the-specification) below.

You can add the support bundle specification to a Kubernetes Secret or a SupportBundle custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

Use the following table to determine which type of manifest file to use for creating a support bundle specification:

<table>
  <tr>
    <th width="25%"></th>
    <th width="25%">Helm CLI</th>
    <th width="25%">KOTS v1.94.2 and Later</th>
    <th width="25%">KOTS v1.94.1 and Earlier</th>
  </tr>
  <tr>
    <th>Helm Chart-Based Application</th>
    <td><a href="#secret">Kubernetes Secret</a></td>
    <td><a href="#secret">Kubernetes Secret</a></td>
    <td><a href="#supportbundle-cr">SupportBundle Custom Resource</a></td>
  </tr>
  <tr>
    <th>Standard Manifest-Based Application</th>
    <td>N/A</td>
    <td><a href="#supportbundle-cr">SupportBundle Custom Resource</a></td>
    <td><a href="#supportbundle-cr">SupportBundle Custom Resource</a></td>
  </tr>
</table>  

### Kubernetes Secret

You can define support bundle specifications in a Kubernetes Secret for the following installation types:
* Installations with the Helm CLI
* Helm chart-based applications installed with KOTS v1.94.2 and later

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

### (KOTS Only) SupportBundle Custom Resource

You can define support bundle specifications in a SupportBundle custom resource for the following installation types:
* Standard manifest-based applications installed with KOTS
* Helm chart-based applications installed with KOTS v1.94.1 and earlier

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

## (Optional) Customize the Specification

You can optionally customize the support bundles for your application by:
* Adding collectors and analyzers
* Editing or excluding the default `clusterInfo` and `clusterResources` collectors

For examples of collectors and analyzers defined in Kubernetes Secrets and Preflight custom resources, see [Example Specifications](#example-specifications) below. 

### Add Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define.

In addition to the default `clusterInfo` and `clusterResources` collectors, the Troubleshoot open source project includes several collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

The following are some recommended collectors:

- [logs](https://troubleshoot.sh/docs/collect/logs/)
- [secret](https://troubleshoot.sh/docs/collect/secret/) and [configMap](https://troubleshoot.sh/docs/collect/configmap/)
- [postgresql](https://troubleshoot.sh/docs/collect/postgresql/), [mysql](https://troubleshoot.sh/docs/collect/mysql/), and [redis](https://troubleshoot.sh/docs/collect/redis/)
- [runPod](https://troubleshoot.sh/docs/collect/run-pod/)
- [copy](https://troubleshoot.sh/docs/collect/copy/) and [copyFromHost](https://troubleshoot.sh/docs/collect/copy-from-host/)
- [http](https://troubleshoot.sh/docs/collect/http/)

### Add Analyzers

Analyzers use the data from the collectors to generate output for the support bundle. Good analyzers clearly identify failure modes and provide troubleshooting guidance for the user. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log and provides a description of the error to the user.

The Troubleshoot open source project includes several analyzers that you can include in the specification. To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

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
        namespace: {{ .Release.Namespace }}
        ignoreRBAC: true
```

The following example shows how to use the Replicated Namespace template function to set the namespace:

```yaml
spec:
  collectors:
    - clusterResources:
        namespace: '{{repl Namespace }}'
        ignoreRBAC: true
```
For more information, see [Namespace](/reference/template-functions-static-context#namespace) in _Static Context_. 

### Exclude the Default Collectors

Although Replicated recommends including the default `clusterInfo` and `clusterResources` collectors because they collect a large amount of data to help with installation and debugging, you can optionally exclude them. 

The following example shows how to exclude both the clusterInfo and clusterResources collectors from your support bundle specification:

```yaml
spec:
  collectors:
    - clusterInfo:
        exclude: true
    - clusterResources:
        exclude: true
```

## Example Specifications

This section includes common examples of support bundle specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/support-bundle) in GitHub.

### Check API Deployment Status

The examples below use the `deploymentStatus` analyzer to check the version of Kubernetes running in the cluster. The `deploymentStatus` analyzer uses data from the default `clusterResources` collector.

For more information, see [Deployment Status](https://troubleshoot.sh/docs/analyze/deployment-status/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <DeployStatusSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <DeployStatusCr/>
  </TabItem>
</Tabs> 

### Check HTTP Requests

If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

The examples below use the `http` collector and the `textAnalyze` analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <HttpSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <HttpCr/>
  </TabItem>
</Tabs>

### Check Kubernetes Version

The examples below use the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <K8sVersionSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <K8sVersionCr/>
  </TabItem>
</Tabs> 

### Check Node Resources

The examples below use the `nodeResources` analyzer to check that the minimum requirements are met for memory, CPU cores, number of nodes, and ephemeral storage. The `nodeResources` analyzer uses data from the default `clusterResources` collector.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeResourcesSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <NodeResourcesCr/>
  </TabItem>
</Tabs> 

### Check Node Status

The following examples use the `nodeResources` analyzers to check the status of the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector.

For more information, see [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeStatusSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <NodeStatusCr/>
  </TabItem>
</Tabs> 

### Collect Logs Using Multiple Selectors

The examples below use the `logs` collector to collect logs from various Pods where application workloads are running. They also use the `textAnalyze` collector to analyze the logs for a known error.

For more information, see [Pod Logs](https://troubleshoot.sh/docs/collect/logs/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

You can use the `selector` attribute of the `logs` collector to find Pods that have the specified labels. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector, as shown in the examples below. You can include the `logs` collector as many times as needed.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <LogsSelectorsSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <LogsSelectorsCr/>
  </TabItem>
</Tabs> 

### Collect Logs Using `limits`

The examples below use the `logs` collector to collect Pod logs from the Pod where the application is running. These specifications use the `limits` field to set a `maxAge` and `maxLines` to limit the output provided. 

For more information, see [Pod Logs](https://troubleshoot.sh/docs/collect/logs/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <LogsLimitsSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <LogsLimitsCr/>
  </TabItem>
</Tabs> 

### Collect Redis and MySQL Server Information

The following examples use the `redis` and `mysql` collectors to collect information about Redis and MySQL servers running in the cluster.

For more information, see [Redis](https://troubleshoot.sh/docs/collect/redis/) and [MySQL](https://troubleshoot.sh/docs/collect/mysql/) and in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <RedisMysqlSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <RedisMysqlCr/>
  </TabItem>
</Tabs>

### Run and Analyze a Pod

The examples below use the `textAnalyze` analyzer to check that a command successfully executes in a Pod running in the cluster. The Pod specification is defined in the `runPod` collector.

For more information, see [Run Pods](https://troubleshoot.sh/docs/collect/run-pod/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <RunPodsSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <RunPodsCr/>
  </TabItem>
</Tabs>