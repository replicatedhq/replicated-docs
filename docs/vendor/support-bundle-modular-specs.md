# Modular and Discoverable Support Bundle Specifications

The support bundle manifest file that contains all of the collection and analysis logic for the application and Kubernetes control plane. The following features make configuration of and debugging with support bundles easier.

## Using Modular Support Bundles {#modular}

You can use a modular approach to creating support bundle manifest files. This helps teams more easily develop specs that are scoped to individual components or microservices in a large application and avoid merge conflicts. You can create separate manifest files or a combination of manifest files, URLs, and Kubernetes secrets. 

Customers can generate a single support bundle that merges the specifications from these separate resources, instead of generating a separate support bundle for each manifest file.

Troubleshoot can also consume preflight checks and support bundles from files, URLs, and Kubernetes secrets. For more information, see [Collecting a Support Bundle from Multiple Specs](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs) in the Troubleshoot documentation.

For example, in an application that ships MySQL, NGINX, and Redis:

1. Your team can add collectors and analyzers for each component:

  **Example: `manifests/nginx/troubleshoot.yaml`**

  ```yaml
  ...
  spec:
    collectors:
      - logs:
          selector:
            - app=nginx
    analyzers:
      - deploymentStatus:
          name: nginx
          outcomes:
            - fail:
                when: replicas < 2
  ```

  **Example: `manifests/mysql/troubleshoot.yaml`**

  ```yaml
  ...
  spec:
    collectors:
      - mysql:
          uri: 'dbuser:**REDACTED**@tcp(db-host)/db'
    analyzers:
      - mysql:
          checkName: Must be version 8.x or later
          outcomes:
            - fail:
                when: version < 8.x
  ```

  **Example: `manifests/redis/troubleshoot.yaml`**

  ```yaml
  ...
  spec:
    collectors:
      - redis:
          collectorName: redis
          uri: rediss://default:password@hostname:6379
  ```

1. Do one of the following:

    -  Run the following command to generate a single support bundle manifest file from multiple files:

      ```bash
        kubectl support-bundle ./PATH_TO_FILE1 ./PATH_TO_FILE2
      ```

        Replace each `PATH_TO_FILE` with the path and YAML filename for each support bundle. A minimum of two files are required to run this command.

        **Example:**

        ```bash
        kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
        ```

    - Run the following command to generate a single support bundle manifest file from a file, and URL, and a Kubernetes secret:

      ```bash
        kubectl support-bundle URL \
      ./PATH_TO_FILE \
      PATH_TO_SECRET 
      ```

      Replace:

      - `URL` with the URL location of your YAML
      - `PATH_TO_FILE` with the path and YAML file name
      - `PATH_TO_SECRET` with the path to the secret specification




## Discover and Aggregate Support Bundles in a Cluster {#discoverability}
You can add a support bundle manifest that can lets customers discover all of the Kubernetes resources in a cluster and generate a merged support bundle with the aggregated information. 

To discover multiple specifications and generate them into one support bundle:

1. Add a support bundle specification to a cluster as `Kind: Secret`. Add the label `troubleshoot.io/kind: support-bundle` and a data key `support-bundle-spec`.

  **Example:**

  > [`kURL/addons/flannel/template/yaml/troubleshoot.yaml`](https://github.com/adamancini/kURL/blob/main/addons/flannel/template/base/yaml/troubleshoot.yaml)

  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: flannel-troubleshoot-spec
    labels:
      troubleshoot.io/kind: support-bundle
  stringData:
    support-bundle-spec: |
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
        name: flannel
      spec:
        uri: https://raw.githubusercontent.com/replicatedhq/kURL/main/addons/flannel/template/yaml/troubleshoot.yaml
        collectors: [...]
        analyzers: [...]
  ```

1. Create the resource from your manifest.

  **Example:**

  ```shell
  kubectl apply -f kURL/addons/flannel/template/yaml/troubleshoot.yaml
  # secret default/flannel-troubleshoot-spec created
  ```

1. Use any of the specifications from your cluster to collect an aggregate support bundle.

  **Example:**

  ```shell
  kubectl get secrets --all-namespaces -l troubleshoot.io/kind=supportbundle-spec
  # NAMESPACE   NAME                        TYPE     DATA   AGE
  # default     flannel-troubleshoot-spec   Opaque   1      94s
  # default     kotsadm-troubleshoot-spec   Opaque   1      9s
  # default     velero-troubleshoot-spec    Opaque   1      52s

  kubectl support-bundle secret/default/flannel-troubleshoot-spec secret/default/kotsadm-troubleshoot-spec secret/default/velero-troubleshoot-spec
  ```

1. Run the following command to discover all the specs in a given namespace or cluster based on the `troubleshoot.io/kind` label with the `--load-cluster-specs` flag:

  ```shell
  kubectl support-bundle --load-cluster-specs
  ```

  You can also combine this command with input from a file or URL.

  **Example:**

  ```shell
  kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/sample-troubleshoot.yaml --load-cluster-specs
  ```

  The analysis screen shows the results of all the analyzers defined in your chosen manifests, and all the contents are available in a single bundle. For real world use cases, see the [troubleshoot-specs repo](https://github.com/replicatedhq/troubleshoot-specs) in GitHub.
