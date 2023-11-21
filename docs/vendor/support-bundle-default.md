# Adding a Default Support Bundle Specification

This topic describes how to add the default support bundle to a release for your application. The information in this topic applies to Helm chart- and standard manifest-based application installed with the Helm CLI or with Replicated KOTS.

## Overview

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate the support bundle. 

The following default collectors are included automatically to gather information about the cluster and cluster resources:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

You can add more collectors and analyzers to add to the defaults. 

## Create the Manifest File

You can create a support bundle specification in a Kubernetes Secret or in a Preflight custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

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