import SupportBundleAddLogs from "../partials/support-bundles/_support-bundle-add-logs.mdx"
import SupportBundleCustomCollectors from "../partials/support-bundles/_support-bundle-custom-collectors.mdx"
import SupportBundleAddAnalyzers from "../partials/support-bundles/_support-bundle-add-analyzers.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsSbNote from "../partials/preflights/_preflights-sb-note.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"


# Customizing the Default Support Bundle Specification

This topic describes how to customize the default support bundle specification in Helm chart- and standard Kubernetes manifest-based applications. The information in this topic applies to applications that are installed with the Helm CLI or with Replicated KOTS.

## Overview

You can customize the support bundles that you collect for your application, including:
* Removing the default collectors and analyzers
* Editing the default collectors and analyzers
* Adding new collectors and analyzers

## Copy the Full Default Specification

To customize the default support bundle specification, first copy the contents of the default [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) file and add it to your existing support bundle manifest file.

You can copy the default specification at [`spec.yaml`](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

## Collectors

### Add Log Collectors

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

### Add Other Recommended Collectors

<SupportBundleCustomCollectors/>

## Analyzers

Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

### Add Log Analyzers

At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

### Add Other Recommended Analyzers

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

## Example Specification

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