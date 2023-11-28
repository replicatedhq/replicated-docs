import SupportBundleAddLogs from "../partials/support-bundles/_support-bundle-add-logs.mdx"
import SupportBundleCustomCollectors from "../partials/support-bundles/_support-bundle-custom-collectors.mdx"
import SupportBundleAddAnalyzers from "../partials/support-bundles/_support-bundle-add-analyzers.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsSbNote from "../partials/preflights/_preflights-sb-note.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"

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

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:      
        - clusterInfo: {}
        - clusterResources: {}
        - http:
            collectorName: slack
            get:
              url: https://api.slack.com/methods/api.test
      analyzers:      
        - textAnalyze:
            checkName: Slack Accessible
            fileName: slack.json
            regex: '"status": 200,'
            outcomes:
              - pass:
                  when: "true"
                  message: "Can access the Slack API"
              - fail:
                  when: "false"
                  message: "Cannot access the Slack API. Check that the server can reach the internet and check [status.slack.com](https://status.slack.com)."
```

### Check Node Status

```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: SupportBundle
  metadata:
    name: example
  spec:
    collectors:
      - clusterInfo:
          exclude: false
      - clusterResources:
          namespaces:
          - default
          - my-app-namespace
    analyzers:
      - nodeResources:
        checkName: Node status check
        outcomes:
          - fail:
              when: "nodeCondition(Ready) == False"
              message: "Not all nodes are online."
          - warn:
              when: "nodeCondition(Ready) == Unknown"
              message: "Not all nodes are online."
          - pass:
              message: "All nodes are online."
  ``` 

### Check Kubernetes Version

The examples below use the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:      
        - clusterInfo: {}
        - clusterResources: {}
      analyzers:      
        - clusterVersion:
            outcomes:
            - fail:
                message: This application relies on kubernetes features only present in 1.16.0
                  and later.
                uri: https://kubernetes.io
                when: < 1.16.0
            - warn:
                message: Your cluster is running a version of kubernetes that is out of support.
                uri: https://kubernetes.io
                when: < 1.24.0
            - pass:
                message: Your cluster meets the recommended and quired versions of Kubernetes.
```

### Check API Deployment Status

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:      
        - clusterInfo: {}
        - clusterResources: {}
      analyzers: 
        - deploymentStatus:
            name: api
            namespace: default
            outcomes:
              - fail:
                  when: "< 1"
                  message: The API deployment does not have any ready replicas.
              - warn:
                  when: "= 1"
                  message: The API deployment has only a single ready replica.
              - pass:
                  message: There are multiple replicas of the API deployment ready.
```

### Check Node Resources

The examples below use the `nodeResources` analyzer to check that the minimum requirements are met for memory, CPU cores, number of nodes, and ephemeral storage. The `nodeResources` analyzer uses data from the default `clusterResources` collector.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:      
        - clusterInfo: {}
        - clusterResources: {}
      analyzers:
        - nodeResources:
            checkName: One node must have 2 GB RAM and 1 CPU Cores
            filters:
              allocatableMemory: 2Gi
              cpuCapacity: "1"
            outcomes:
              - fail:
                  when: count() < 1
                  message: Cannot find a node with sufficient memory and cpu
              - pass:
                  message: Sufficient CPU and memory is available
        - nodeResources:
            checkName: Must have at least 3 nodes in the cluster
            outcomes:
              - fail:
                  when: "count() < 3"
                  message: This application requires at least 3 nodes
              - warn:
                  when: "count() < 5"
                  message: This application recommends at last 5 nodes.
              - pass:
                  message: This cluster has enough nodes.
        - nodeResources:
            checkName: Each node must have at least 40 GB of ephemeral storage
            outcomes:
              - fail:
                  when: "min(ephemeralStorageCapacity) < 40Gi"
                  message: Noees in this cluster do not have at least 40 GB of ephemeral storage.
                  uri: https://kurl.sh/docs/install-with-kurl/system-requirements
              - warn:
                  when: "min(ephemeralStorageCapacity) < 100Gi"
                  message: Nodes in this cluster are recommended to have at least 100 GB of ephemeral storage.
                  uri: https://kurl.sh/docs/install-with-kurl/system-requirements
              - pass:
                  message: The nodes in this cluster have enough ephemeral storage.          
```

### Collect All Logs

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources: {}
    - logs:
        collectorName: all-logs
        name: all-logs
``` 

### Collect Logs with Limits

Typically the selector attribute is matched to the labels. To get the labels for an application, either inspect the YAML or run `kubectl get pods --show-labels`. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector as many times as needed. The `limits` field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines: 10000`

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources: {}
    - logs:
        selector:
          - app.kubernetes.io/name=myapp
        namespace: '{{repl Namespace }}'
        limits:
          maxAge: 720h
          maxLines: 10000
```

### Collect Logs Using Multiple Selectors

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:      
        - clusterInfo: {}
        - clusterResources: {}
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-nginx
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-api
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-frontend
        - logs:
            selector:
              - app=postgres
      analyzers:      
        - textAnalyze:
            checkName: Axios Errors
            fileName: slackernews-frontend-*/slackernews.log
            regex: "error - AxiosError"
            outcomes:
              - pass:
                  when: "false"
                  message: "Axios errors not found in logs"
              - fail:
                  when: "true"
                  message: "Axios errors found in logs"
```

### Collect Information About MySQL and Redis Servers

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'root:my-secret-pw@tcp(localhost:3306)/mysql'
        parameters:
          - character_set_server
          - collation_server
          - init_connect
          - innodb_file_format
          - innodb_large_prefix
          - innodb_strict_mode
          - log_bin_trust_function_creators
    - redis:
        collectorName: my-redis
        uri: rediss://default:replicated@server:6380
```

### Run and Analyze a Pod

The examples below use the `textAnalyze` analyzer to check that a command successfully runs in a Pod running in the cluster. The Pod specification is defined in the `runPod` collector.

For more information, see [Run Pods](https://troubleshoot.sh/docs/collect/run-pod/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - runPod:
        collectorName: "static-hi"
        podSpec:
          containers:
          - name: static-hi
            image: alpine:3
            command: ["echo", "hi static!"]
  analyzers:
    - textAnalyze:
        checkName: Said hi!
        fileName: /static-hi.log
        regex: 'hi static'
        outcomes:
          - fail:
              message: Didn't say hi.
          - pass:
              message: Said hi!            
```