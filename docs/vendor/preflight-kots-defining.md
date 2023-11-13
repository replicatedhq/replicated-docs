import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsAbout from "../partials/preflights/_preflights-about.mdx"
import PreflightsDefine from "../partials/preflights/_preflights-define.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"
import PreflightsCrNote from "../partials/preflights/_preflights-cr-note.mdx"
import AnalyzersNote from "../partials/preflights/_analyzers-note.mdx"
import HttpSecret from "../partials/preflights/_http-requests-secret.mdx"
import HttpCr from "../partials/preflights/_http-requests-cr.mdx"
import MySqlSecret from "../partials/preflights/_mysql-secret.mdx"
import MySqlCr from "../partials/preflights/_mysql-cr.mdx"
import K8sVersionSecret from "../partials/preflights/_k8s-version-secret.mdx"
import K8sVersionCr from "../partials/preflights/_k8s-version-cr.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Define Preflight Checks

This topic describes how to define preflight checks in Helm chart- and standard Kubernetes manifest-based applications. The information in this topic applies to applications that are installed with the Helm CLI or with Replicated KOTS.

## Step 1: Create the Manifest File

You can define preflight checks in a Kubernetes Secret or in a Preflight custom resource.

The method you choose depends on your application type (Helm chart or standard manifests) and installation method (Helm CLI or KOTS), as shown in the following table:

<table>
  <tr>
    <th width="25%"></th>
    <th width="15%">Helm CLI</th>
    <th width="30%">KOTS v1.101.0 and Later</th>
    <th width="30%">KOTS v1.100.3 and Earlier</th>
  </tr>
  <tr>
    <th>Helm Charts</th>
    <td><a href="#secret">Secret</a></td>
    <td><a href="#secret">Secret</a></td>
    <td><a href="#preflight-cr">Custom Resource</a></td>
  </tr>
  <tr>
    <th>Standard Manifests</th>
    <td>N/A</td>
    <td><a href="#preflight-cr">Custom Resource</a></td>
    <td><a href="#preflight-cr">Custom Resource</a></td>
  </tr>
</table>  

### Create a Secret {#secret}

Define preflight check specifications in a Kubernetes Secret for the following installation types:
  * Installations with the Helm CLI
  * Helm chart-based applications installed with KOTS v1.101.0 and later

Add the following YAML to a Kubernetes Secret in your Helm chart `templates/` directory:

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

### (KOTS Only) Create a Preflight Custom Resource {#preflight-cr}

Define preflight check specifications in a Preflight custom resource for the following installation types:
* Standard manifest-based applications installed with KOTS
* Helm chart-based applications installed with KOTS v1.100.3 and earlier

:::note
For Helm charts installed with KOTS v1.101.0 and later, Replicated recommends that you define preflight checks in a Secret in the Helm chart templates instead of using the Preflight custom resource. See [Create a Secret](#secret) above.

In KOTS v1.101.0 and later, preflights defined in the Helm chart override the Preflight custom resource used by KOTS. During installation, if KOTS v1.101.0 and later cannot find preflights specified in the Helm chart archive, then KOTS searches for `kind: Preflight` in the root of the release.
:::

Add the following YAML for a Preflight custom resource (`apiVersion: troubleshoot.sh/v1beta2` and `kind: Preflight`) to a release for your application:

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

## Step 2: Define Collectors and Analyzers

This section describes how to define collectors and analyzers for preflight checks based on your application needs. You add the collectors and analyzers that you want to use in the `spec.collectors:` and `spec.analyzers:` fields in the manifest file that you created.

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

### (KOTS Only) `strict` Analyzers

<PreflightsAddStrict/> 

For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

## Example Specifications

This section includes common examples of preflight check specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight) in GitHub.

### Check HTTP or HTTPS Requests from the Cluster

The following example uses the `http` collector and the `regex` analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <HttpSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <HttpCr/>
    <p>The following shows an example of how the `pass` outcome for this preflight check is displayed in the admin console:</p>
    <img alt="Preflight checks in admin console showing pass message" src="/images/preflight-http-pass.png"/>
    <a href="/images/preflight-http-pass.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

### Check Kubernetes Version

The following example uses the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector. The `clusterInfo` collector is automatically included.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <K8sVersionSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <K8sVersionCr/>
    <p>The following shows an example of how the `warn` outcome for this preflight check is displayed in the admin console:</p>
    <img alt="Preflight checks in admin console showing warning message" src="/images/preflight-k8s-version-warn.png"/>
    <a href="/images/preflight-k8s-version-warn.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

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

### Check MySQL Version Using Template Functions

The following example uses the `mysql` collector and the `mysql` analyzer to check the version of MySQL running in the cluster.

For more information, see [Collect > MySQL](https://troubleshoot.sh/docs/collect/mysql/) and [Analyze > MySQL](https://troubleshoot.sh/docs/analyze/mysql/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    <p>This example uses Helm template functions to render the credentials and connection details for the MySQL server that were supplied by the user. Additionally, it uses Helm template functions to create a conditional statement so that the MySQL collector and analyzer are included in the preflight checks only when MySQL is deployed, as indicated by a <code>.Values.global.mysql.enabled</code> field evaluating to true.</p>
    <p>For more information about using Helm template functions to access values from the values file, see <a href="https://helm.sh/docs/chart_template_guide/values_files/">Values Files</a>.</p>
    <MySqlSecret/>
  </TabItem>
  <TabItem value="custom-resource" label="Preflight Custom Resource">
    <p>This example uses Replicated template functions in the Config context to render the credentials and connection details for the MySQL server that were supplied by the user in the Replicated admin console <strong>Config</strong> page. Replicated recommends using a template function for the URI, as shown above, to avoid exposing sensitive information. For more information about template functions, see <a href="/reference/template-functions-about">About Template Functions</a>.</p>
    <p>This example also uses an analyzer with <code>strict: true</code>, which prevents installation from continuing if the preflight check fails.</p>
    <MySqlCr/>
    <p>The following shows an example of how a <code>fail</code> outcome for this preflight check is displayed in the admin console when <code>strict: true</code> is set for the analyzer:</p>
    <img alt="Strict preflight checks in admin console showing fail message" src="/images/preflight-mysql-fail-strict.png"/>
    <a href="/images/preflight-mysql-fail-strict.png">View a larger version of this image</a>
  </TabItem>
</Tabs>

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

### Spec with Helm Templating

<PreflightsDefineXref/>

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: preflight
  name: "{{ .Release.Name }}-preflight-config"
stringData:
  # This is the preflight spec that will be used to run the preflight checks
  # Note: here we demonstrate using Helm's templating to conditionally run a preflight check based on a value
  # plus getting some configuration from the local values.yaml file
  preflight.yaml: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: preflight-sample
    spec:
      {{ if eq .Values.global.mariadb.enabled false }}
      collectors:
        - mysql:
            collectorName: mysql
            uri: '{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'
      {{ end }}
      analyzers:
        - nodeResources:
            checkName: Node Count Check
            outcomes:
              - fail:
                  when: 'count() > {{ .Values.global.maxNodeCount }}'
                  message: "The cluster has more than {{ .Values.global.maxNodeCount }} nodes."
              - pass:
                  message: You have the correct number of nodes.
        - clusterVersion:
            outcomes:
              - fail:
                  when: "< 1.22.0"
                  message: The application requires at least Kubernetes 1.22.0, and recommends 1.23.0.
                  uri: https://kubernetes.io
              - warn:
                  when: "< 1.23.0"
                  message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.18.0 or later.
                  uri: https://kubernetes.io
              - pass:
                  message: Your cluster meets the recommended and required versions of Kubernetes.
        {{ if eq .Values.global.mariadb.enabled false }}
        - mysql:
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
        {{ end }}
```