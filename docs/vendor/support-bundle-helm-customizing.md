import SupportBundleAddLogs from "../partials/support-bundles/_support-bundle-add-logs.mdx"
import SupportBundleCustomCollectors from "../partials/support-bundles/_support-bundle-custom-collectors.mdx"
import SupportBundleAddAnalyzers from "../partials/support-bundles/_support-bundle-add-analyzers.mdx"
import ConfigmapNote from "../partials/support-bundles/_configmap-note.mdx"
import PreflightsSbNote from "../partials/preflights/_preflights-sb-note.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"
import RedactorsAbout from "../partials/redactors/_redactors-about.mdx"
import PreflightSbHelmTemplates from "../partials/preflights/_preflight-sb-helm-templates.mdx"


# Customize Support Bundles for Helm Charts

This topic provides a basic understanding and some key considerations about support bundle specifications for Helm charts to help guide you in defining them for your application. The content in this topic applies to Helm chart-based applications installed with the Helm CLI or with Replicated KOTS v1.104.0 and later.

## About Support Bundles

Customizing a support bundle is unique to your application and depends on what kind of data you need to troubleshoot. Replicated recommends designing comprehensive support bundle specifications to give you the most insight to problems in your customer environments and the help reduce your support burden. 

<PreflightsSbNote/>

<PreflightsSpecLocations/>

## Choose an Input Kind

Support bundles are generated with the open source support-bundle kubectl plugin by running `kubectl support-bundle`. For more information about the support-bundle plugin, see [Getting Started](https://troubleshoot.sh/docs/) in the open source Troubleshoot documentation.

The support-bundle plugin requires a support bundle specification as input. You can define support bundle specifications in using the following kinds of resources:

- Kubernetes Secret or ConfigMap with `label.troubleshoot.sh/kind: support-bundle`
- SupportBundle custom resource (`apiVersion: troubleshoot.sh/v1beta2` and `kind: SupportBundle`)

### Create a Secret (Recommended)

Replicated recommends defining support bundle specifications in Secrets in your Helm chart templates. For installations with the Helm CLI or with KOTS v1.104.0 and later, defining specifications in Secrets allows your users to automatically discover and generate a support bundle without needing to provide multiple files or specify a long URL with the `kubectl support-bundle` command. Using Secrets also allows specifications to be templated using information in the `values.yaml` file.

<ConfigmapNote/>

To create a Secret for the support bundle specification:

1. Create a Secret as a YAML file with `kind: Secret` and `apiVersion: v1`. The Secret must include the following:

    - The label `troubleshoot.sh/kind: support-bundle`
    - A `stringData` field with a key named `support-bundle-spec`

    **Template:**

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      labels:
        troubleshoot.sh/kind: support-bundle
      name: {{ .Release.Name }}-support-bundle
    stringData:
      # This is the support bundle spec that is used to generate the support bundle.
      # Notes: You can use {{ .Release.Namespace }} to ensure that the support bundle
      # is scoped to the release namespace.
      # You can use any of Helm's templating features here, including {{ .Values.someValue }}
      support-bundle-spec: |
        apiVersion: troubleshoot.sh/v1beta2
        kind: SupportBundle
        metadata:
          name: support-bundle
        spec:
          collectors: []
          analyzers: []
    ```

1. Add the Secret to your Helm chart `templates/` directory.

Next, define the support bundle specification by adding collectors and analyzers. For more information, see [Define the Support Bundle Specification](#spec).

### Create a SupportBundle Custom Resource

If you do not want to use Secrets or ConfigMaps, you can create a SupportBundle custom resource instead.

Create a SupportBundle custom resource (`kind: SupportBundle`) using the following basic support bundle template. For more information about this custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: collectors
spec:
  collectors: []
  analyzers: []
```

Next, define the support bundle specification by adding collectors and analyzers. For more information, see [Define the Support Bundle Specification](#spec).

## Define the Support Bundle Specification {#spec}

Defining support bundle specifications depends on your application's needs. This section gives some guidance about how to think about using collectors and analyzers to design support bundles.

<PreflightsDefineXref/>

<PreflightSbHelmTemplates/>

### Cluster Collectors

You can add the `clusterInfo` and `clusterResources` collectors if you want to collect a large amount of data to help with installation and debugging, such as the Kubernetes version, nodes, and storage classes in the cluster. For `clusterResources`, you can use the default namespace and add additional namespaces using the `namespaces` field.

The following example shows `clusterInfo` and `clusterResources` collectors with an additional namespace specified for the application.

```yaml
spec:
  collectors:
    - clusterInfo: []
    - clusterResources:
        namespaces:
        - default
        - my-app-namespace
```

<PreflightsDefineXref/>

### Pod Log Collectors

<SupportBundleAddLogs/>

The following example shows a Pod log collector for nginx scoped to a specific namespace using `{{ .Release.Namespace }}`:

```yaml
spec:
  collectors:
    - clusterInfo: []
    - clusterResources: []
    - logs:
        selector:
          - app=someapp
          - component=nginx
        namespace: {{ .Release.Namespace }}
          limits:
          maxAge: 720h # 30*24
          maxLines: 10000
          maxBytes: 5000000
```

<PreflightsDefineXref/>

### Other Recommended Collectors

<SupportBundleCustomCollectors/>

### Analyzers

<SupportBundleAddAnalyzers/>

The following example shows a deployment status collector with messages that can inform the customer as to the cause of an issue if the deployment fails. You can customize the message to help guide customers to fix the issue on their own.

```yaml
spec:
  collectors: []
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

<PreflightsDefineXref/>

## Example

The following example shows a support bundle specification as a Secret. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/support-bundle) in GitHub.

<PreflightsDefineXref/>

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: support-bundle
  name: {{ .Release.Name }}-support-bundle
  namespace: {{ .Release.Namespace }}
type: Opaque
stringData:
  # This is the support bundle spec that will be used to generate the support bundle
  # Notes: we use {{ .Release.Namespace }} to ensure that the support bundle is scoped to the release namespace
  # We can use any of Helm's templating features here, including {{ .Values.someValue }}
  support-bundle-spec: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: support-bundle
    spec:
      collectors:
        - clusterInfo: {}
        - clusterResources: {}
        - logs:
            selector:
              - app=someapp
              - component=nginx
            namespace: {{ .Release.Namespace }}
            limits:
              maxAge: 720h # 30*24
              maxLines: 10000
              maxBytes: 5000000
        - logs:
            collectorName: all-logs
            name: all-logs
        - runPod:
            collectorName: "static-hi"
            podSpec:
              containers:
              - name: static-hi
                image: alpine:3
                command: ["echo", "hi static!"]
      analyzers:
        - clusterVersion:
            outcomes:
              - fail:
                  when: "< 1.22.0"
                  message: The application requires at least Kubernetes 1.22.0 or later
                  uri: https://kubernetes.io
              - warn:
                  when: "< 1.23.0"
                  message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.23.0 or later.
                  uri: https://kubernetes.io
              - pass:
                  message: Your cluster meets the recommended and required versions of Kubernetes.
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
            checkName: Total CPU Cores in the cluster is 4 or greater
            outcomes:
            - fail:
                when: "sum(cpuCapacity) < 4"
                message: The cluster must contain at least 4 cores
            - pass:
                message: There are at least 4 cores in the cluster
        - nodeResources:
            checkName: Each node must have at least 40 GB of ephemeral storage
            outcomes:
            - fail:
                when: "min(ephemeralStorageCapacity) < 40Gi"
                message: Nodes in this cluster do not have at least 40 GB of ephemeral storage.
                uri: https://domain.com/docs/system-requirements
            - warn:
                when: "min(ephemeralStorageCapacity) < 100Gi"
                message: Nodes in this cluster are recommended to have at least 100 GB of ephemeral storage.
                uri: https://domain.com/docs/system-requirements
            - pass:
                message: The nodes in this cluster have enough ephemeral storage.
        - ingress:
            namespace: default
            ingressName: connect-to-me
            outcomes:
              - fail:
                  message: The ingress isn't ingressing
              - pass:
                  message: All systems ok on ingress
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

## Next Step

Test your support bundle in a development environment. For more information, see [Generating Support Bundles](support-bundle-generating).