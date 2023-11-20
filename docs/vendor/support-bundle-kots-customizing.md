import SupportBundleAddLogs from "../partials/support-bundles/_support-bundle-add-logs.mdx"
import SupportBundleCustomCollectors from "../partials/support-bundles/_support-bundle-custom-collectors.mdx"
import SupportBundleAddAnalyzers from "../partials/support-bundles/_support-bundle-add-analyzers.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsSbNote from "../partials/preflights/_preflights-sb-note.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"


# Customizing Support Bundles

This topic describes how to customize the default support bundle specification in Helm chart- and standard Kubernetes manifest-based applications. The information in this topic applies to applications that are installed with the Helm CLI or with Replicated KOTS.

## Step 1: Create the Manifest File with the Defaults

You can create a support bundle specification in a Kubernetes Secret or in a Preflight custom resource. The type of manifest file that you use depends on your application type (Helm chart- or standard manifest-based) and installation method (Helm CLI or KOTS).

In this template, the collectors field is empty, so only the default collectors run until you customize this file. You can add more collectors and analyzers to add to the defaults.

Collectors gather information from the cluster, the environment, the application, or other sources. Collectors generate output that is then used by the analyzers that you define to generate the support bundle. 

The following default collectors are included automatically to gather information about the cluster and cluster resources:
* [clusterInfo](https://troubleshoot.sh/docs/collect/cluster-info/)
* [clusterResources](https://troubleshoot.sh/docs/collect/cluster-resources/)

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

## (Optional) Step 2: Customize Collectors and Analyzers

To fully customize the support bundle, including editing or excluding the default collectors and analyzers, copy the default `spec.yaml` file to your manifest file. For the default YAML file, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

### Collectors

#### Pod Log Collectors

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

#### Other Recommended Collectors

<SupportBundleCustomCollectors/>

### Analyzers

Analyzers use the output from the collectors to generate results for the preflight checks, including the criteria for pass, fail, and warn outcomes and custom messages for each outcome.

Add analyzers based on conditions that you expect for your application. For example, you might require that a cluster have at least 2 CPUs and 4GB memory available.

Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

#### Log Analyzers

At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

#### Other Recommended Analyzers

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

## Example Specifications

### Simplified Specification

The following example shows a simplified specification with some edits to the default settings. If  `clusterResources` is defined in your specification, the default namespace cannot be removed, but you can add a namespace to the `namespaces` field.

```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: SupportBundle
  metadata:
    name: collectors
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

### Full Specification

The following example shows a full specification for KOTS. To get the most current full specification, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: collector-sample
spec:
  collectors:
    - clusterInfo: {}
    - clusterResources: {}
    - ceph: {}
    - longhorn: {}
    - exec: # this is removable when we don't need to support kots <= 1.87
        args:
          - "-U"
          - kotsadm
        collectorName: kotsadm-postgres-db
        command:
          - pg_dump
        containerName: kotsadm-postgres
        name: kots/admin_console
        selector:
          - app=kotsadm-postgres
        timeout: 10s
    - exec:
        collectorName: kotsadm-rqlite-db
        name: kots/admin_console
        selector:
          - app=kotsadm-rqlite
        command:
          - sh
          - -c
          - |
            wget -qO- kotsadm:${RQLITE_PASSWORD}@localhost:4001/db/backup?fmt=sql  
        timeout: 10s
    - exec:
        args:
          - "http://localhost:3030/goroutines"
        collectorName: kotsadm-goroutines
        command:
          - curl
        containerName: kotsadm
        name: kots/admin_console
        selector:
          - app=kotsadm
        timeout: 10s
    - exec:
        args:
          - "http://localhost:3030/goroutines"
        collectorName: kotsadm-operator-goroutines
        command:
          - curl
        containerName: kotsadm-operator
        name: kots/admin_console
        selector:
          - app=kotsadm-operator
        timeout: 10s
    - logs: # this is removable when we don't need to support kots <= 1.87
        collectorName: kotsadm-postgres-db
        name: kots/admin_console
        selector:
          - app=kotsadm-postgres
    - logs:
        collectorName: kotsadm-rqlite-db
        name: kots/admin_console
        selector:
          - app=kotsadm-rqlite
    - logs:  # this is removable when we don't need to support kots <= 1.19
        collectorName: kotsadm-api
        name: kots/admin_console
        selector:
          - app=kotsadm-api
    - logs:
        collectorName: kotsadm-operator
        name: kots/admin_console
        selector:
          - app=kotsadm-operator
    - logs:
        collectorName: kotsadm
        name: kots/admin_console
        selector:
          - app=kotsadm
    - logs:
        collectorName: kurl-proxy-kotsadm
        name: kots/admin_console
        selector:
          - app=kurl-proxy-kotsadm
    - logs:
        collectorName: kotsadm-dex
        name: kots/admin_console
        selector:
          - app=kotsadm-dex
    - logs:
        collectorName: kotsadm-fs-minio
        name: kots/admin_console
        selector:
          - app=kotsadm-fs-minio
    - logs:
        collectorName: kotsadm-s3-ops
        name: kots/admin_console
        selector:
          - app=kotsadm-s3-ops
    - logs:
        collectorName: registry
        name: kots/kurl
        selector:
          - app=registry
        namespace: kurl
    - logs:
        collectorName: ekc-operator
        name: kots/kurl
        selector:
          - app=ekc-operator
        namespace: kurl
    - secret:
        collectorName: kotsadm-replicated-registry
        name: kotsadm-replicated-registry # NOTE: this will not live under the kots/ directory like other collectors
        includeValue: false
        key: .dockerconfigjson
    - logs:
        collectorName: rook-ceph-logs
        namespace: rook-ceph
        name: kots/rook
    - exec:
        collectorName: weave-status
        command:
          - /home/weave/weave
        args:
          - --local
          - status
        containerName: weave
        exclude: ""
        name: kots/kurl/weave
        namespace: kube-system
        selector:
          - name=weave-net
        timeout: 10s
    - exec:
        collectorName: weave-report
        command:
          - /home/weave/weave
        args:
          - --local
          - report
        containerName: weave
        exclude: ""
        name: kots/kurl/weave
        namespace: kube-system
        selector:
          - name=weave-net
        timeout: 10s
    - logs:
        collectorName: weave-net
        selector:
          - name=weave-net
        namespace: kube-system
        name: kots/kurl/weave
    - logs:
        collectorName: kube-flannel
        selector:
          - app=flannel
        namespace: kube-flannel
        name: kots/kurl/flannel
    - exec:
        args:
          - "http://goldpinger.kurl.svc.cluster.local:80/check_all"
        collectorName: goldpinger-statistics
        command:
          - curl
        containerName: kotsadm
        name: kots/goldpinger
        selector:
          - app=kotsadm
        timeout: 10s
    - copyFromHost:
        collectorName: kurl-host-preflights
        name: kots/kurl/host-preflights
        hostPath: /var/lib/kurl/host-preflights
        extractArchive: true
        image: alpine
        imagePullPolicy: IfNotPresent
        timeout: 1m
    - configMap:
        collectorName: kurl-current-config
        name: kurl-current-config # NOTE: this will not live under the kots/ directory like other collectors
        namespace: kurl
        includeAllData: true
    - configMap:
        collectorName: kurl-last-config
        name: kurl-last-config # NOTE: this will not live under the kots/ directory like other collectors
        namespace: kurl
        includeAllData: true
    - collectd:
        collectorName: collectd
        hostPath: /var/lib/collectd/rrd
        image: alpine
        imagePullPolicy: IfNotPresent
        timeout: 5m

  analyzers:
    - clusterVersion:
        outcomes:
          - fail:
              when: "< 1.16.0"
              message: The Admin Console requires at least Kubernetes 1.16.0
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes
    - containerRuntime:
        outcomes:
          - fail:
              when: "== gvisor"
              message: The Admin Console does not support using the gvisor runtime
          - pass:
              message: A supported container runtime is present on all nodes
    - cephStatus: {}
    - longhorn: {}
    - clusterPodStatuses:
        outcomes:
          - fail:
              when: "!= Healthy"
              message: "Status: {{ .Status.Reason }}"
    - statefulsetStatus: {}
    - deploymentStatus: {}
    - jobStatus: {}
    - replicasetStatus: {}
    - weaveReport:
        reportFileGlob: kots/kurl/weave/kube-system/*/weave-report-stdout.txt
    - textAnalyze:
        checkName: Weave Status
        exclude: ""
        ignoreIfNoFiles: true
        fileName: kots/kurl/weave/kube-system/weave-net-*/weave-status-stdout.txt
        outcomes:
          - fail:
              message: Weave is not ready
          - pass:
              message: Weave is ready
        regex: 'Status: ready'
    - textAnalyze:
        checkName: Weave Report
        exclude: ""
        ignoreIfNoFiles: true
        fileName: kots/kurl/weave/kube-system/weave-net-*/weave-report-stdout.txt
        outcomes:
          - fail:
              message: Weave is not ready
          - pass:
              message: Weave is ready
        regex: '"Ready": true'
    - textAnalyze:
        checkName: "Flannel: can read net-conf.json"
        ignoreIfNoFiles: true
        fileName: kots/kurl/flannel/kube-flannel-ds-*/kube-flannel.log
        outcomes:
          - fail:
              when: "true"
              message: "failed to read net-conf.json"
          - pass:
              when: "false"
              message: "can read net-conf.json"
        regex: 'failed to read net conf'
    - textAnalyze:
        checkName: "Flannel: net-conf.json properly formatted"
        ignoreIfNoFiles: true
        fileName: kots/kurl/flannel/kube-flannel-ds-*/kube-flannel.log
        outcomes:
          - fail:
              when: "true"
              message: "malformed net-conf.json"
          - pass:
              when: "false"
              message: "properly formatted net-conf.json"
        regex: 'error parsing subnet config'
    - textAnalyze:
        checkName: "Flannel: has access"
        ignoreIfNoFiles: true
        fileName: kots/kurl/flannel/kube-flannel-ds-*/kube-flannel.log
        outcomes:
          - fail:
              when: "true"
              message: "RBAC error"
          - pass:
              when: "false"
              message: "has access"
        regex: 'the server does not allow access to the requested resource'
    - textAnalyze:
        checkName: Inter-pod Networking
        exclude: ""
        ignoreIfNoFiles: true
        fileName: kots/goldpinger/*/kotsadm-*/goldpinger-statistics-stdout.txt
        outcomes:
          - fail:
              when: "OK = false"
              message: Some nodes have pod communication issues
          - pass:
              message: Goldpinger can communicate properly
        regexGroups: '"OK": ?(?P<OK>\w+)'
    - nodeResources:
        checkName: Node status check
        outcomes:
          - fail:
              when: "nodeCondition(Ready) == False"
              message: "Not all nodes are online."
          - fail:
              when: "nodeCondition(Ready) == Unknown"
              message: "Not all nodes are online."
          - pass:
              message: "All nodes are online."
    - clusterPodStatuses:
        checkName: contour pods unhealthy
        namespaces:
          - projectcontour
        outcomes:
          - fail:
              when: "!= Healthy" # Catch all unhealthy pods. A pod is considered healthy if it has a status of Completed, or Running and all of its containers are ready.
              message: A Contour pod, {{ .Name }}, is unhealthy with a status of {{ .Status.Reason }}. Restarting the pod may fix the issue.
```
