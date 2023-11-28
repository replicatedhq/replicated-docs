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

By default, an empty support bundle specification includes the following default collectors to gather information about the cluster and cluster resources:
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

## (Optional) Customize the Default Specification

You can customize the support bundles that you collect for your application, including:
* Removing the default collectors and analyzers
* Editing the default collectors and analyzers
* Adding new collectors and analyzers

### Copy the Full Default Specification

To customize the default support bundle specification, first copy the contents of the default [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) file and add it to your existing support bundle manifest file.

You can copy the default specification at [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

### Edit the Default Collectors and Analyzers

If `clusterResources` is defined in your specification, the default namespace cannot be removed, but you can add a namespace to the `namespaces` field.

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

### Add Collectors and Analyzers

Add any custom collectors and analyzers to the file. Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

Collectors that Replicated recommends considering are:

- **Pod logs:** Replicated recommends adding application Pod logs and set the collection limits for the number of lines logged. Typically the selector attribute is matched to the labels. To get the labels for an application, either inspect the YAML or run `kubectl get pods --show-labels`. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector as many times as needed. The `limits` field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines: 10000`
- **Kubernetes resources:** Use for custom resource definitions (CRDs), Secrets, and ConfigMaps, if they are required for your application to work.
- **Databases:** Return a selection of rows or entire tables.
- **Volumes:** Ensure that an application's persistent state files exist, are readable/writeable, and have the right permissions.
- **Pods:** Run a Pod from a custom image.
- **Files:** Copy files from Pods and hosts.
- **HTTP:** Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

Analyzers that Replicated recommends considering are:

- **Resource statuses:** Check the status of various resources, such as Deployments, StatefulSets, Jobs, and so on.
- **Regular expressions:** Analyze arbitrary data. See [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/).
- **Databases:** Check the version and connection status.

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

At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

The following example shows an analyzer for a minimum version of Kubernetes that can be run on the cluster, and an analyzer to check the status of the nodes. You can customize the messages to help guide customers to fix the issue on their own.

```yaml
  spec:
    collectors:
      - clusterInfo:
      - clusterResources:
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