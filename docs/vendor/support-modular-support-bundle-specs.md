# About Modular and Discoverable Support Bundles

Support bundle specifications can be designed using a modular approach. This helps teams develop specifications that are scoped to individual components or microservices in a large application and avoid merge conflicts. 

You can create separate manifest files or use a combination of manifest files, URLs, and Kubernetes Secrets or ConfigMaps. Then, customers can use the support-bundle CLI to generate a merged support bundle archive. For more information, see [Create Specifications by Component](#component) below.

When you create support bundle specifications within Kubernetes Secret or ConfigMap resources, your customers can automatically discover support bundle specifications and generate a merged support bundle. For more information, see [Enable Discoverability of Specifications](#discoverable) below.

You can also host any support bundle specifications that you create online, which can be updated with collectors and analyzers to notify customers of potential problems and fixes in between application updates. For more information, see [About Online Support Bundle Specifications](/vendor/support-online-support-bundle-specs).

:::note
Preflight checks also support using multiple specifications and resources. For more information, see [Run Preflights using multiple specs](https://troubleshoot.sh/docs/preflight/cluster-checks/#run-preflights-using-multiple-specs) in the Troubleshoot documentation.
:::

## Examples

### Create Specifications by Component {#component}

Using a modular approach for an application that ships MySQL, NGINX, and Redis, your team can add collectors and analyzers for each component.

`manifests/nginx/troubleshoot.yaml`

This collector and analyzer checks compliance for the minimum number of replicas for the NGINX component:

  ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: nginx
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

`manifests/mysql/troubleshoot.yaml`

This collector and analyzer checks compliance for the minimum version of the MySQL component:

  ```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: mysql
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

`manifests/redis/troubleshoot.yaml`

This collector and analyzer checks that the Redis server is responding:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: redis
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:password@hostname:6379
```

A single support bundle archive can be generated from a combination of these manifests: 

```bash
kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
```

For more information about generating merged support bundles, see [Generate a Merged Support Bundle](/enterprise/troubleshooting-an-app/#generate-a-merged-support-bundle).

### Enable Discoverability of Specifications {#discoverable}

To make support bundle specifications discoverable in a cluster, you must wrap them in a Secret or ConfigMap. For example, to use a Secret, you add a specification as `Kind: Secret` and include the label `troubleshoot.io/kind: supportbundle` and a `data` key matching `support-bundle-spec`. For more information about adding Secrets, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.

The following example shows using an online collector and analyzers specification. For an example Secret that shows the collector and analyzer specifications in the manifest file itself, see [`kURL/addons/flannel/template/yaml/troubleshoot.yaml`](https://github.com/adamancini/kURL/blob/main/addons/flannel/template/base/yaml/troubleshoot.yaml) in GitHub.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: flannel-troubleshoot-spec
  labels:
    troubleshoot.io/kind: supportbundle
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

Create the resource from your manifest:

```bash
kubectl apply -f kURL/addons/flannel/template/yaml/troubleshoot.yaml
# secret default/flannel-troubleshoot-spec created
```
Then you can collect a merged support bundle for some or all of the specifications in the cluster. To generate an aggregate bundle, first use `kubectl get secrets` to get a list of specifications that match the label and key in the Secret specification. 

```bash
kubectl get secrets --all-namespaces -l troubleshoot.io/kind=support-bundle-spec
```
  **Example output:**

```shell
# NAMESPACE   NAME                        TYPE     DATA   AGE
# default     flannel-troubleshoot-spec   Opaque   1      94s
# default     kotsadm-troubleshoot-spec   Opaque   1      9s
# default     velero-troubleshoot-spec    Opaque   1      52s
```
Then generate a merged support bundle for any of the specifications listed. The following example uses two of the specifications in the list from the output above:

```bash
kubectl support-bundle secret/default/flannel-troubleshoot-spec secret/default/velero-troubleshoot-spec
```

To automatically discover and generate a bundle for all of the specifications in a given namespace or cluster, you can use the `troubleshoot.io/kind` label with the `--load-cluster-specs` flag. This flag can also be combined with input for a URL. For more information about using this flag, see [Generate a Merged Support Bundle](/enterprise/troubleshooting-an-app/#generate-a-merged-support-bundle).

The Troubleshoot analysis screen in the admin console shows the results of all of the analyzers defined in your chosen manifests, and the contents are available in a single bundle.

 For real use case specifications that you can use as templates, see the [troubleshoot-specs repo](https://github.com/replicatedhq/troubleshoot-specs) on GitHub.