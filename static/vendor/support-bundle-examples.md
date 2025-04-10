# Example Support Bundle Specs

This topic includes common examples of support bundle specifications. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/support-bundle) in GitHub.

## Check API Deployment Status

The examples below use the `deploymentStatus` analyzer to check the version of Kubernetes running in the cluster. The `deploymentStatus` analyzer uses data from the default `clusterResources` collector.

For more information, see [Deployment Status](https://troubleshoot.sh/docs/analyze/deployment-status/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
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
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
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
  </TabItem>
</Tabs> 

## Check HTTP Requests

If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

The examples below use the `http` collector and the `textAnalyze` analyzer to check that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

For more information, see [HTTP](https://troubleshoot.sh/docs/collect/http/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
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
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
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
  </TabItem>
</Tabs>

## Check Kubernetes Version

The examples below use the `clusterVersion` analyzer to check the version of Kubernetes running in the cluster. The `clusterVersion` analyzer uses data from the default `clusterInfo` collector.

For more information, see [Cluster Version](https://troubleshoot.sh/docs/analyze/cluster-version/) and [Cluster Info](https://troubleshoot.sh/docs/collect/cluster-info/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors: []
      analyzers:      
        - clusterVersion:
            outcomes:
              - fail:
                  message: This application relies on kubernetes features only present in 1.16.0
                  and later.
                  uri: https://kubernetes.io
                  when: < 1.16.0
              - warn:
                  message: Your cluster is running a version of kubernetes that is out of support.
                  uri: https://kubernetes.io
                  when: < 1.24.0
              - pass:
                  message: Your cluster meets the recommended and quired versions of Kubernetes.
```
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors: []
  analyzers:      
    - clusterVersion:
        outcomes:
          - fail:
              message: This application relies on kubernetes features only present in 1.16.0
                and later.
              uri: https://kubernetes.io
              when: < 1.16.0
          - warn:
              message: Your cluster is running a version of kubernetes that is out of support.
              uri: https://kubernetes.io
              when: < 1.24.0
          - pass:
              message: Your cluster meets the recommended and quired versions of Kubernetes.
```
  </TabItem>
</Tabs> 

## Check Node Resources

The examples below use the `nodeResources` analyzer to check that the minimum requirements are met for memory, CPU cores, number of nodes, and ephemeral storage. The `nodeResources` analyzer uses data from the default `clusterResources` collector.

For more information, see [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) and [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors: []
      analyzers:
        - nodeResources:
            checkName: One node must have 2 GB RAM and 1 CPU Cores
            filters:
              allocatableMemory: 2Gi
              cpuCapacity: "1"
            outcomes:
              - fail:
                  when: count() < 1
                  message: Cannot find a node with sufficient memory and cpu
              - pass:
                  message: Sufficient CPU and memory is available
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
            checkName: Each node must have at least 40 GB of ephemeral storage
            outcomes:
              - fail:
                  when: "min(ephemeralStorageCapacity) < 40Gi"
                  message: Noees in this cluster do not have at least 40 GB of ephemeral storage.
                  uri: https://kurl.sh/docs/install-with-kurl/system-requirements
              - warn:
                  when: "min(ephemeralStorageCapacity) < 100Gi"
                  message: Nodes in this cluster are recommended to have at least 100 GB of ephemeral storage.
                  uri: https://kurl.sh/docs/install-with-kurl/system-requirements
              - pass:
                  message: The nodes in this cluster have enough ephemeral storage.          
```
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors: []
  analyzers:
    - nodeResources:
        checkName: One node must have 2 GB RAM and 1 CPU Cores
        filters:
            allocatableMemory: 2Gi
            cpuCapacity: "1"
        outcomes:
            - fail:
                when: count() < 1
                message: Cannot find a node with sufficient memory and cpu
            - pass:
                message: Sufficient CPU and memory is available
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
        checkName: Each node must have at least 40 GB of ephemeral storage
        outcomes:
            - fail:
                when: "min(ephemeralStorageCapacity) < 40Gi"
                message: Noees in this cluster do not have at least 40 GB of ephemeral storage.
                uri: https://kurl.sh/docs/install-with-kurl/system-requirements
            - warn:
                when: "min(ephemeralStorageCapacity) < 100Gi"
                message: Nodes in this cluster are recommended to have at least 100 GB of ephemeral storage.
                uri: https://kurl.sh/docs/install-with-kurl/system-requirements
            - pass:
                message: The nodes in this cluster have enough ephemeral storage.          
```
  </TabItem>
</Tabs> 

## Check Node Status

The following examples use the `nodeResources` analyzers to check the status of the nodes in the cluster. The `nodeResources` analyzer uses data from the default `clusterResources` collector.

For more information, see [Node Resources](https://troubleshoot.sh/docs/analyze/node-resources/) and [Cluster Resources](https://troubleshoot.sh/docs/collect/cluster-resources/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
        collectors: []
        analyzers:
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
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors: []
  analyzers:
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
  </TabItem>
</Tabs> 

## Collect Logs Using Multiple Selectors

The examples below use the `logs` collector to collect logs from various Pods where application workloads are running. They also use the `textAnalyze` collector to analyze the logs for a known error.

For more information, see [Pod Logs](https://troubleshoot.sh/docs/collect/logs/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

You can use the `selector` attribute of the `logs` collector to find Pods that have the specified labels. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector, as shown in the examples below. You can include the `logs` collector as many times as needed.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-nginx
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-api
        - logs:
            namespace: {{ .Release.Namespace }}
            selector:
              - app=slackernews-frontend
        - logs:
            selector:
              - app=postgres
      analyzers:      
        - textAnalyze:
            checkName: Axios Errors
            fileName: slackernews-frontend-*/slackernews.log
            regex: "error - AxiosError"
            outcomes:
              - pass:
                  when: "false"
                  message: "Axios errors not found in logs"
              - fail:
                  when: "true"
                  message: "Axios errors found in logs"
```
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - logs:
        namespace: example-namespace
        selector:
          - app=slackernews-nginx
    - logs:
        namespace: example-namespace
        selector:
          - app=slackernews-api
    - logs:
        namespace: example-namespace
        selector:
          - app=slackernews-frontend
    - logs:
        selector:
          - app=postgres
  analyzers:      
    - textAnalyze:
        checkName: Axios Errors
        fileName: slackernews-frontend-*/slackernews.log
        regex: "error - AxiosError"
        outcomes:
          - pass:
              when: "false"
              message: "Axios errors not found in logs"
          - fail:
              when: "true"
              message: "Axios errors found in logs"
```
  </TabItem>
</Tabs> 

## Collect Logs Using `limits`

The examples below use the `logs` collector to collect Pod logs from the Pod where the application is running. These specifications use the `limits` field to set a `maxAge` and `maxLines` to limit the output provided. 

For more information, see [Pod Logs](https://troubleshoot.sh/docs/collect/logs/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:
        - logs:
            selector:
              - app.kubernetes.io/name=myapp
            namespace: {{ .Release.Namespace }}
            limits:
              maxAge: 720h
              maxLines: 10000
```
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - logs:
        selector:
          - app.kubernetes.io/name=myapp
        namespace: '{{repl Namespace }}'
        limits:
          maxAge: 720h
          maxLines: 10000
```
  </TabItem>
</Tabs> 

## Collect Redis and MySQL Server Information

The following examples use the `redis` and `mysql` collectors to collect information about Redis and MySQL servers running in the cluster.

For more information, see [Redis](https://troubleshoot.sh/docs/collect/redis/) and [MySQL](https://troubleshoot.sh/docs/collect/mysql/) and in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:
        - mysql:
            collectorName: mysql
            uri: 'root:my-secret-pw@tcp(localhost:3306)/mysql'
            parameters:
              - character_set_server
              - collation_server
              - init_connect
              - innodb_file_format
              - innodb_large_prefix
              - innodb_strict_mode
              - log_bin_trust_function_creators
        - redis:
            collectorName: my-redis
            uri: rediss://default:replicated@server:6380
```
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - mysql:
        collectorName: mysql
        uri: 'root:my-secret-pw@tcp(localhost:3306)/mysql'
        parameters:
          - character_set_server
          - collation_server
          - init_connect
          - innodb_file_format
          - innodb_large_prefix
          - innodb_strict_mode
          - log_bin_trust_function_creators
    - redis:
        collectorName: my-redis
        uri: rediss://default:replicated@server:6380
```
  </TabItem>
</Tabs>

## Run and Analyze a Pod

The examples below use the `textAnalyze` analyzer to check that a command successfully executes in a Pod running in the cluster. The Pod specification is defined in the `runPod` collector.

For more information, see [Run Pods](https://troubleshoot.sh/docs/collect/run-pod/) and [Regular Expression](https://troubleshoot.sh/docs/analyze/regex/) in the Troubleshoot documentation.

<Tabs>
  <TabItem value="secret" label="Kubernetes Secret" default>
    ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: example
  labels:
    troubleshoot.sh/kind: support-bundle
stringData: 
  support-bundle-spec: |-
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: example
    spec:
      collectors:
        - runPod:
            collectorName: "static-hi"
            podSpec:
              containers:
              - name: static-hi
                image: alpine:3
                command: ["echo", "hi static!"]
      analyzers:
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
  </TabItem>
  <TabItem value="custom-resource" label="SupportBundle Custom Resource">
    ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: example
spec:
  collectors:
    - runPod:
        collectorName: "static-hi"
        podSpec:
          containers:
          - name: static-hi
            image: alpine:3
            command: ["echo", "hi static!"]
  analyzers:
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
  </TabItem>
</Tabs>