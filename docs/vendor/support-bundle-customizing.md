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

## Add the Support Bundle Specification to a Manifest File

This section describes how to create a blank support bundle specification that includes the following default collectors:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You can add a support bundle specification to a Kubernetes Secret or a SupportBundle custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

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

Add the following YAML to a Kubernetes Secret in your Helm chart `templates` directory:   

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: support-bundle
  name: {{ .Release.Name }}-support-bundle
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

:::note
For Helm charts installed with KOTS v1.94.2 and later, Replicated recommends that you define support bundles in a Secret in the Helm chart templates instead of using the Preflight custom resource. See [Create a Secret](#secret) above.
:::

Add the following YAML to a new manifest file in a release:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: collectors
spec:
  collectors: []
  analyzers: []
```
For more information about the SupportBundle custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

## (Optional) Customize the Specification

You can optionally customize the support bundles for your application by:
* Adding collectors and analyzers
* Editing or excluding the default `clusterInfo` and `clusterResources` collectors

### Add Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks.

The Troubleshoot open source project includes several collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

The following are some recommended collectors:

- [logs](https://troubleshoot.sh/docs/collect/logs/)
- [secret](https://troubleshoot.sh/docs/collect/secret/) and [configMap](https://troubleshoot.sh/docs/collect/configmap/)
- [postgresql](https://troubleshoot.sh/docs/collect/postgresql/), [mysql](https://troubleshoot.sh/docs/collect/mysql/), and [redis](https://troubleshoot.sh/docs/collect/redis/)
- [runPod](https://troubleshoot.sh/docs/collect/run-pod/)
- [copy](https://troubleshoot.sh/docs/collect/copy/) and [copyFromHost](https://troubleshoot.sh/docs/collect/copy-from-host/)
- [http](https://troubleshoot.sh/docs/collect/http/)

### Add Analyzers

Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

The following are some recommended analyzers:

- [textAnalyze](https://troubleshoot.sh/docs/analyze/regex/)
- [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/)
- [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
- [replicasetStatus](https://troubleshoot.sh/docs/analyze/replicaset-status/)
- [statefulsetStatus](https://troubleshoot.sh/docs/analyze/statefulset-status/)
- [postgresql](https://troubleshoot.sh/docs/analyze/postgresql/), [mysql](https://troubleshoot.sh/docs/analyze/mysql/), and [redis](https://troubleshoot.sh/docs/analyze/redis/)

### Customize the Default `clusterResources` Collector

You can edit the `clusterResources` to limit the namespaces where it collectors information.

* `namespaces`: The list of namespaces from which the resources and information will be collected. If not specified, it will default to collecting information from all namespaces.

  :::note
  The `default` namespace cannot be removed, but you can specify additional namespaces in the `namespaces` key.
  :::

* `ignoreRBAC`: Defaults to false. When set to true, skip checking for RBAC authorization before collecting resource information from each namespace. This is useful when your cluster uses authorization webhooks that do not support SelfSubjectRuleReviews.

The following example shows how to specify the namespaces where the `clusterResources` collector collects information:

```yaml
spec:
  collectors:
    - clusterInfo: {}
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
    - clusterInfo: {}
    - clusterResources:
        namespace: {{ .Release.Namespace }}
        ignoreRBAC: true
```

The following example shows how to use Replicated template functions to set the namespace:

```yaml
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources:
        namespace: '{{repl Namespace }}'
        ignoreRBAC: true
``` 

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

## Examples   

This section includes common examples of preflight check specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/support-bundle) in GitHub.

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

### Check Node Status

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <NodeStatusSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <NodeStatusCr/>
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

### Collect Logs Using Multiple Selectors

The examples below use the `logs` collector to collect logs from various Pods where application workloads are running.

Typically the `selector` attribute is matched to the labels. To get the labels for an application, either inspect the YAML or run `kubectl get pods --show-labels`. After the labels are discovered, create collectors to include logs from these pods in a bundle.

Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector as many times as needed.

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

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <LogsLimitsSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    <LogsLimitsCr/>
  </TabItem>
</Tabs> 

### Collect Redis and MySQL Server Information

The following examples use the `mysql` and `redis` collectors to collect information about MySQL and Redis servers running in the cluster.

For more information, see [MySQL](https://troubleshoot.sh/docs/collect/mysql/) and [Redis](https://troubleshoot.sh/docs/collect/redis/) in the Troubleshoot documentation.

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