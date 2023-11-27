# Adding the Default Support Bundle Specification

This topic describes how to add the default support bundle specification to a release for your application. The information in this topic applies to Helm chart- and standard manifest-based application installed with the Helm CLI or with Replicated KOTS.

## Overview

A support bundle will collect data from the cluster, redact sensitive fields, and then perform analysis on the data to provide remediation steps.

## Add the Default Specification to a Manifest File

The following default collectors are included automatically to gather information about the cluster and cluster resources:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You can create a support bundle specification in a Kubernetes Secret or in a SupportBundle custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

Use the following table to determine which type of manifest file to use for defining preflight checks:

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

### Create a Secret

Add the following YAML to a Kubernetes Secret in your Helm chart `templates` directory:   

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

As shown in the example above, the Secret must include the following:

- The label `troubleshoot.sh/kind: support-bundle`
- A `stringData` field with a key named `support-bundle-spec`  

### (KOTS Only) Create a SupportBundle Custom Resource

Add a SupportBundle custom resource manifest file (`kind: SupportBundle`) to your release.

Use one of the following support bundle template options to start populating your manifest file:

  ```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: SupportBundle
  metadata:
      name: collectors
  spec:
      collectors: []
      analyzers: []
  ```

## (Optional) Customize the Default Specification

You can customize the support bundles that you collect for your application, including:
* Removing the default collectors and analyzers
* Editing the default collectors and analyzers
* Adding new collectors and analyzers

### Copy the Full Default Specification

To customize the default support bundle specification, first copy the contents of the default [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) file and add it to your existing support bundle manifest file.

You can copy the default specification at [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

### Customize Collectors

#### Add Log Collectors

<SupportBundleAddLogs/>

The following example shows an API log file set with the default value for `maxLines`:

```yaml
spec:
    collectors:
      - clusterInfo:
      - clusterResources:
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
```

#### Add Other Recommended Collectors

<SupportBundleCustomCollectors/>

### Customize Analyzers

Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

#### Add Log Analyzers

At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

#### Add Other Recommended Analyzers

Analyzers that Replicated recommends considering are:

- **Resource statuses:** Check the status of various resources, such as Deployments, StatefulSets, Jobs, and so on.
- **Regular expressions:** Analyze arbitrary data.
- **Databases:** Check the version and connection status.

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

### Example Specification

The following example shows a simplified specification with some edits to the default settings. If  `clusterResources` is defined in your specification, the default namespace cannot be removed, but you can add a namespace to the `namespaces` field.

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