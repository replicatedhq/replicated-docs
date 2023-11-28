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

### Add Collectors and Analyzers

Add additional collectors and analyzers to customize the support bundle specification based on the needs of your application. This section provides guidance for selecting and configuring collectors and analyzers.

#### Collectors

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate results for the preflight checks.

The Troubleshoot open source project includes several collectors that you can include in the specification to gather more information from the installation environment. To view all the available collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

The following are some recommended collectors:

- [logs](https://troubleshoot.sh/docs/collect/logs/)
- [secret](https://troubleshoot.sh/docs/collect/secret/) and [configMap](https://troubleshoot.sh/docs/collect/configmap/)
- [postgresql](https://troubleshoot.sh/docs/collect/postgresql/), [mysql](https://troubleshoot.sh/docs/collect/mysql/), and [redis](https://troubleshoot.sh/docs/collect/redis/)
- [runPod](https://troubleshoot.sh/docs/collect/run-pod/)
- [copy](https://troubleshoot.sh/docs/collect/copy/) and [copyFromHost](https://troubleshoot.sh/docs/collect/copy-from-host/)
- [http](https://troubleshoot.sh/docs/collect/http/)

#### Analyzers

Analyzers use the output from the collectors to generate 

Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

The Troubleshoot open source project includes several analyzers that you can include in your preflight check specification. To view all the available analyzers, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section of the Troubleshoot documentation.

The following are some recommended analyzers:

- [regex](https://troubleshoot.sh/docs/analyze/regex/)
- [deploymentStatus](https://troubleshoot.sh/docs/analyze/deployment-status/) Check the status of various resources, such as Deployments, StatefulSets, Jobs, and so on.
- [clusterPodStatuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/)
- [replicasetStatus](https://troubleshoot.sh/docs/analyze/replicaset-status/)
- [statefulsetStatus](https://troubleshoot.sh/docs/analyze/statefulset-status/)
- [postgresql](https://troubleshoot.sh/docs/analyze/postgresql/), [mysql](https://troubleshoot.sh/docs/analyze/mysql/), and [redis](https://troubleshoot.sh/docs/analyze/redis/)


### Edit or Exclude the Default Collectors and Analyzers

Although Replicated recommends including the default `clusterInfo` and `clusterResources` collectors because they collect a large amount of data to help with installation and debugging, you can optionally exclude them. You can also optionally edit the `clusterResources` to limit the namespaces where it collectors information.

To edit or remove the default `clusterInfo` and `clusterResources` collectors, first copy the full contents of the default [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) file and add it to your existing support bundle specification.

After you add the default specification to your existing support bundle specification, you can exclude or edit collectors and analyzers.

#### Exclude

The following example shows how to exclude both the clusterInfo and clusterResources collectors from your support bundle specification:

```yaml
spec:
  collectors:
    - clusterInfo:
        exclude: true
    - clusterResources:
        exclude: true
```

#### Edit `clusterResources`

`namespaces` (Optional)
The list of namespaces from which the resources and information will be collected. If not specified, it will default to collecting information from all namespaces.

`ignoreRBAC` (Optional)
Defaults to false. When set to true, skip checking for RBAC authorization before collecting resource information from each namespace. This is useful when your cluster uses authorization webhooks that do not support SelfSubjectRuleReviews.

If `clusterResources` is defined in your specification, the `default` namespace cannot be removed, but you can specify additional namespaces in the `namespaces` key.

The following example shows how to specify the namespaces where the `clusterResources` collector collects information:

```yaml
spec:
  collectors:
    - clusterInfo:
        exclude: true
    - clusterResources:
        namespaces:
        - default
        - my-app-namespace
        ignoreRBAC:
        - 
```  

## Examples       

The following example shows a simplified specification with some edits to the default settings:

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
      - logs:
          selector:
            - app=api
          namespace: my-app-namespace
          limits:
            maxLines: 10000
      - http:
          name: healthz
          get:
            url: http://api:3000/healthz
      - exec:
        name: mysql-version
        selector:
          - app=mysql
        namespace: default
        command: ["mysql"]
        args: ["-V"]
        timeout: 5s   
    analyzers:
      - clusterVersion:
          outcomes:
            - fail:
                when: "< 1.22.0"
                message: The Admin Console requires at least Kubernetes 1.22.0
            - pass:
                message: Your cluster meets the recommended and required versions of Kubernetes
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

### API Log File

The following example shows an API log file set with the default value for `maxLines`:

```yaml
spec:
    collectors:
      - logs:
            selector:
              - app=api
            namespace: my-app-namespace
            limits:
              maxLines: 10000
```

Typically the selector attribute is matched to the labels. To get the labels for an application, either inspect the YAML or run `kubectl get pods --show-labels`. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector as many times as needed. The `limits` field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines: 10000`

### HTTP Requests

Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.