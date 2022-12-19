# Modular and Discoverable Support Bundle Specifications

Support bundle specifications are modular. Teams that are working on different parts of an application can create separate, smaller support bundle manifests that get merged. This helps to avoid merge conflicts that can happen when working together in one, larger specification. For more information, see [Bundling Modular Specifications](#modular).

You can also discover all of the specifications in a cluster or namespace and merge the contents in a single bundle to improve your debugging workflow. For more information, see [Adding Specifications for Discoverability](#discoverability).

Support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about specific types of collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/docs/collect/) documentation.

## Merging Modular Specifications {#modular}

When you design support bundle specs in a modular convention, the support-bundle CLI can take multiple specifications as input and merge the `collectors:` and `analyzers:` properties into a single support bundle.  This lets teams develop specifications that are scoped to individual components or microservices in a large application.

For example, in an application that ships MySQL, NGINX, and Redis, your team can consider adding some collectors and analyzers for each component, as follows:

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

You run the following command to generate a bundle from a combination of these manifests:

```bash
kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
```

Troubleshoot can consume preflight checks and support bundles from files, URLs, and from Kubernetes resources.

For more information about using multiple specifications, see [Collecting a Support Bundle from Multiple Specs](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs) in the Troubleshoot.sh documentation.

## Adding Specifications for Discoverability {#discoverability}

To discover specifications in a cluster and generate them into one support bundle:

1. Add support bundle specifications to a cluster as secrets. Make sure your specification has the label `troubleshoot.io/kind: supportbundle-kind` and a data key `support`.

  **Example:**

  > [`kURL/addons/flannel/template/yaml/troubleshoot.yaml`](https://github.com/adamancini/kURL/blob/main/addons/flannel/template/base/yaml/troubleshoot.yaml)

  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: flannel-troubleshoot-spec
    labels:
      troubleshoot.io/kind: supportbundle-kind
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

  The analysis screen shows the results of all the analyzers defined in your chosen manifests, and all the contents are available in a single bundle. To view real world use cases, see the[troubleshoot-specs repo](https://github.com/replicatedhq/troubleshoot-specs) in GitHub.
