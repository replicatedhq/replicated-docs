import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsAbout from "../partials/preflights/_preflights-about.mdx"
import PreflightsDefine from "../partials/preflights/_preflights-define.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"
import PreflightsCrNote from "../partials/preflights/_preflights-cr-note.mdx"
import AnalyzersNote from "../partials/preflights/_analyzers-note.mdx"

# Define Preflight Checks for KOTS

This topic provides information about creating preflight checks for releases that are distributed with Replicaed KOTS and that use standard Kubernetes manifests or Kubernetes Operators. For information about defining preflight checks for Helm chart-based applications, see [Define Preflight Checks for Helm Charts](preflight-helm-defining).

For information about defining host preflight checks for Replicated kURL, see [Customizing Host Preflight Checks for kURL](preflight-host-preflights).

## Define the Preflight Checks Specification

Preflight checks are not included by default. For releases that use standard Kubernetes manifests or Kubernetes Operators, you can add a Preflight custom resource to your release to define preflight checks.

The following is an empty template for the Preflight custom resource (`apiVersion: troubleshoot.sh/v1beta2` and `kind: Preflight`):

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflights
spec:
  collectors: []
  analyzers: []
```

<PreflightsCrNote/>

:::note
>Introduced in KOTS v1.101.0

If you have already created a KOTS release using Helm charts and want to add support for Helm CLI installations, Replicated recommends defining preflight checks directly in the Helm charts instead of using the Preflight custom resource. This lets you maintain one set of preflight specifications for all installation types. 

Preflights specified in the Helm chart override the Preflight custom resource used by KOTS. During installation, if KOTS cannot find preflights specified in the Helm chart archive, then KOTS searches for `kind: Preflight` in the root of the release. For more information, see [Define Preflight Checks for Helm Charts](preflight-helm-defining).
:::

### Collectors

Add collectors to gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks. 

The default `clusterInfo` and `clusterResources` collectors are always automatically included in the specification to gather information about the cluster and cluster resources. You do not need to manually included these default collectors. For more information, see [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

The Troubleshoot open source project includes several additional collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors that you can add, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

### Analyzers

Analyzers use the output from the collectors to generate results for the preflight checks, including the criteria for pass, fail, and warn outcomes and custom messages for each outcome.

For example, in a preflight check that checks the version of Kubernetes running in the target cluster, the analyzer can define a fail outcome when the cluster is running a version of Kubernetes less than 1.25 that includes the following message to the user: `The application requires Kubernetes 1.25.0 or later, and recommends 1.27.0`.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. The following are some of the analyzers in the Troubleshoot project that use the default `clusterInfo` or `clusterResources` collectors:
* [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
* [clusterVersion](https://troubleshoot.sh/docs/analyze/cluster-version/)
* [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/)
* [distribution](https://troubleshoot.sh/docs/analyze/distribution/)
* [nodeResources](https://troubleshoot.sh/docs/analyze/node-resources/)
* [statefulsetStatus](https://troubleshoot.sh/docs/analyze/stateful-set-status/)
* [storageClass](https://troubleshoot.sh/docs/analyze/storage-class/)

To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

### `strict` Analyzers

<PreflightsAddStrict/> 

For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

## Example Specifications

This section includes common examples of preflight check specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight) in GitHub.

### Check HTTP or HTTPS Requests from the Cluster

The following example uses the `http` collector and the `regex` analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.


```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: preflight-checks
spec:
  collectors:
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

The following shows an example of how the `pass` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing pass message](/images/preflight-http-pass.png)

[View a larger version of this image](/images/preflight-http-pass.png)

### Check Kubernetes Version

The following example uses the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector. The `clusterInfo` collector is automatically included.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.25.0"
              message: The application requires Kubernetes 1.25.0 or later, and recommends 1.28.0.
              uri: https://www.kubernetes.io
          - warn:
              when: "< 1.28.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.28.0 or later.
              uri: https://kubernetes.io
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes.
``` 

The following shows an example of how the `warn` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing warning message](/images/preflight-k8s-version-warn.png)

[View a larger version of this image](/images/preflight-k8s-version-warn.png)

### Check Kubernetes Distribution

The following example uses the `distribution` analyzer to check the Kubernetes distribution of the cluster. The `distribution` analyzer uses data from the default `clusterInfo` collector. The `clusterInfo` collector is automatically included.

For more information, see [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) and [Distribution](https://troubleshoot.sh/docs/analyze/distribution/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:              
    - distribution:
        checkName: Kubernetes distribution
        outcomes:
          - fail:
              when: "== docker-desktop"
              message: The application does not support Docker Desktop Clusters
          - fail:
              when: "== microk8s"
              message: The application does not support Microk8s Clusters
          - fail:
              when: "== minikube"
              message: The application does not support Minikube Clusters
          - pass:
              when: "== eks"
              message: EKS is a supported distribution
          - pass:
              when: "== gke"
              message: GKE is a supported distribution
          - pass:
              when: "== aks"
              message: AKS is a supported distribution
          - pass:
              when: "== kurl"
              message: KURL is a supported distribution
          - pass:
              when: "== digitalocean"
              message: DigitalOcean is a supported distribution
          - warn:
              message: Unable to determine the distribution of Kubernetes
```

The following shows an example of how the `pass` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing pass message](/images/preflight-k8s-distro.png)

[View a larger version of this image](/images/preflight-k8s-distro.png)

### Check Requirements Are Met By At Least One Node

The following example uses the `nodeResources` analyzer with filters to check that the requirements for memory, CPU cores, and architecture are met by at least one node in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:  
    - nodeResources:
        checkName: Node requirements
        filters:
        # Must have 1 node with 16 GB (available) memory and 5 cores (on a single node) with amd64 architecture
          allocatableMemory: 16Gi
          cpuArchitecture: amd64
          cpuCapacity: "5"
        outcomes:
          - fail:
              when: "count() < 1"
              message: This application requires at least 1 node with 16GB available memory and 5 cpu cores with amd64 architecture
          - pass:
              message: This cluster has a node with enough memory and cpu cores
```  

The following shows an example of how the `fail` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing fail message](/images/preflight-node-filters-faill.png)

[View a larger version of this image](/images/preflight-node-filters-faill.png)

### Check MySQL Version Using Replicated Template Functions

The following example uses the `mysql` collector and the `mysql` analyzer to check the version of MySQL running in the cluster.

For more information, see [Collect > MySQL](https://troubleshoot.sh/docs/collect/mysql/) and [Analyze > MySQL](https://troubleshoot.sh/docs/analyze/mysql/) in the Troubleshoot documentation.

This example uses Replicated template functions in the Config context to render the credentials and connection details for the MySQL server that were supplied by the user in the Replicated admin console **Config** page. Replicated recommends using a template function for the URI, as shown above, to avoid exposing sensitive information. For more information about template functions, see [About Template Functions](/reference/template-functions-about).

This example also uses an analyzer with `strict: true`, which prevents installation from continuing if the preflight check fails.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
  analyzers:
    - mysql:
        # `strict: true` prevents installation from continuing if the preflight check fails
        strict: true
        checkName: Must be MySQL 8.x or later
        collectorName: mysql
        outcomes:
          - fail:
              when: connected == false
              message: Cannot connect to MySQL server
          - fail:
              when: version < 8.x
              message: The MySQL server must be at least version 8
          - pass:
              message: The MySQL server is ready
```

The following shows an example of how a `fail` outcome for this preflight check is displayed in the admin console when `strict: true` is set for the analyzer:

![Strict preflight checks in admin console showing fail message](/images/preflight-mysql-fail-strict.png)

[View a larger version of this image](/images/preflight-mysql-fail-strict.png)


### Check Node Memory

The following example uses the `nodeResources` analyzer to check that a required storage class is available in the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:
    - nodeResources:
        checkName: Every node in the cluster must have at least 8 GB of memory, with 32 GB recommended
        outcomes:
        - fail:
            when: "min(memoryCapacity) < 8Gi"
            message: All nodes must have at least 8 GB of memory.
            uri: https://kurl.sh/docs/install-with-kurl/system-requirements
        - warn:
            when: "min(memoryCapacity) < 32Gi"
            message: All nodes are recommended to have at least 32 GB of memory.
            uri: https://kurl.sh/docs/install-with-kurl/system-requirements
        - pass:
            message: All nodes have at least 32 GB of memory.
```  

The following shows an example of how a `warn` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing warn message](/images/preflight-node-memory-warn.png)

[View a larger version of this image](/images/preflight-node-memory-warn.png)

### Check Node Storage Class Availability

The following example uses the `storageClass` analyzer to check that a required storage class is available in the nodes in the cluster. The `storageClass` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:
    - storageClass:
        checkName: Required storage classes
        storageClassName: "default"
        outcomes:
          - fail:
              message: Could not find a storage class called "default".
          - pass:
              message: A storage class called "default" is present.
``` 

The following shows an example of how a `fail` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing fail message](/images/preflight-storageclass-fail.png)

[View a larger version of this image](/images/preflight-storageclass-fail.png)

### Check Node Ephemeral Storage

The following example uses the `nodeResources` analyzer to check the ephemeral storage available in the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  analyzers:
    - nodeResources:
        checkName: Every node in the cluster must have at least 40 GB of ephemeral storage, with 100 GB recommended
        outcomes:
        - fail:
            when: "min(ephemeralStorageCapacity) < 40Gi"
            message: All nodes must have at least 40 GB of ephemeral storage.
            uri: https://kurl.sh/docs/install-with-kurl/system-requirements
        - warn:
            when: "min(ephemeralStorageCapacity) < 100Gi"
            message: All nodes are recommended to have at least 100 GB of ephemeral storage.
            uri: https://kurl.sh/docs/install-with-kurl/system-requirements
        - pass:
            message: All nodes have at least 100 GB of ephemeral storage.
```  

The following shows an example of how a `pass` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing pass message](/images/preflight-ephemeral-storage-pass.png)

[View a larger version of this image](/images/preflight-ephemeral-storage-pass.png)

### Check Total CPU Cores Across Nodes

The following example uses the `nodeResources` analyzer to check the version of Kubernetes running in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector. The `clusterResources` collector is automatically included.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
  analyzers:
    - nodeResources:
        checkName: Total CPU Cores in the cluster is 4 or greater
        outcomes:
          - fail:
              when: "sum(cpuCapacity) < 4"
              message: The cluster must contain at least 4 cores
              uri: https://kurl.sh/docs/install-with-kurl/system-requirements
          - pass:
              message: There are at least 4 cores in the cluster
```

The following shows an example of how a `pass` outcome for this preflight check is displayed in the admin console:

![Preflight checks in admin console showing pass message](/images/preflight-cpu-pass.png)

[View a larger version of this image](/images/preflight-cpu-pass.png)

## Next Step

Save and promote the release to a development environment to test your changes. For more information about installing with KOTS, see [About Installing an Application](/enterprise/installing-overview).