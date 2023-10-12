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

Preflight checks are not included by default, so you must enable them. For releases that use standard Kubernetes manifests or Kubernetes Operators, you add a Preflight custom resource to your release to define a specification for preflight checks.

The following is a template manifest file for the Preflight custom resource (`apiVersion: troubleshoot.sh/v1beta2` and `kind: Preflight`):

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

In the spec of the Preflight custom resource, define collectors and analyzers. The collectors and analyzers that you choose to add dependent on your application needs.

<PreflightsDefineXref/>

### Collectors

Add collectors to gather information from the cluster, the environment, the application, and other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks. 

The default `clusterInfo` and `clusterResources` collectors are always automatically included in the specification to gather information about the cluster and cluster resources. You do not need to manually included these default collectors. For more information, see [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

You can add additional collectors to gather more information about the installation environment. For example, you can use the `logs` collector to include logs from pods in the collected output. To view all the available collectors that you can add, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

### Analyzers

Analyzers use the output from the collectors to generate results for the preflight checks, including the criteria for pass, fail, and warn outcomes and custom messages for each outcome.

For example, in a preflight check that checks the version of Kubernetes running in the target cluster, the analyzer can define a fail outcome when the cluster is running a version of Kubernetes less than 1.25 that includes the following message to the user: `The application requires at Kubernetes 1.25.0 or later, and recommends 1.27.0`.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

<AnalyzersNote/>

### `strict` Analyzers

<PreflightsAddStrict/> 

For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

## Example Specifications

This section includes common examples of preflight check specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight) in GitHub.

### Check Node Memory

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
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

### Check Node Storage Class Availability

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
  analyzers:
    - storageClass:
        checkName: Required storage classes
        storageClassName: "default"
        outcomes:
          - fail:
              message: Could not find a storage class called default.
          - pass:
              message: All good on storage classes
```              

### Check Node Ephemeral Storage


```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
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

### Check Total CPU Cores Across Nodes

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

### Check Kubernetes Version

The following example uses the `clusterVersion` collector to check the version of Kubernetes running in the cluster. 

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.25.0"
              message: The application requires at Kubernetes 1.25.0 or later, and recommends 1.27.0.
              uri: https://www.kubernetes.io
          - warn:
              when: "< 1.27.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.27.0 or later.
              uri: https://kubernetes.io
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes.
``` 

### Check Kubernetes Distribution

The following example uses the `distribution` analyzer to check the Kubernetes distribution of the cluster.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
spec:
  collectors:
  analyzers:              
    - distribution:
        checkName: Check Kubernetes environment.
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

### Check HTTP or HTTPS Requests from the Cluster

The following example uses the http collector and the regex analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.


```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: my-app
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

### Check MySQL Version

The following example shows how to use Replicated template functions 

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

## Next Step

Save and promote the release to a development environment to test your changes. For more information about installing with KOTS, see [About Installing an Application](/enterprise/installing-overview).