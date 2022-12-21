# Configuring Modular and Discoverable Support Bundles

This topic provides information about using a modular approach to support bundles and adding specifications to discover Kubernetes resources in a cluster.

## Configure Modular Support Bundles

Support bundle manifest files can be designed using a modular approach. This helps teams can more easily develop specifications that are scoped to individual components or microservices in a large application and avoid merge conflicts. You can create separate manifest files or use a combination of manifest files, URLs, and Kubernetes secrets.

 Then, customers can use the support-bundle CLI to merge the multiple specifications and generate a single support bundle archive. For more information, see [Collecting a Support Bundle from Multiple Specs](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs) in the Troubleshoot documentation.

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

2. Generate a single support bundle archive in your development environment if you want to test it. For more information, see [Generate a Single Support Bundle Archive](/enterprise/troubleshooting-an-app/#generate-a-single-support-bundle-archive).

## Add Discoverability to Clusters

You can also add Kubernetes resource specifications to clusters for the purposes of discoverability.

[Support Bundle specs to a cluster as Secrets](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-specs-discovered-from-the-cluster).  We don't have CRDs yet for Support Bundles or Preflights, so we'll wrap them in a Secret for now.  Make sure your spec has the label `troubleshoot.io/kind: supporbundle-kind` and a data key `support

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

Create the resource from our manifest:

```shell
kubectl apply -f kURL/addons/flannel/template/yaml/troubleshoot.yaml
# secret default/flannel-troubleshoot-spec created
```

And now we can use any of the specs from our cluster to collect an aggregate Support Bundle

```shell
kubectl get secrets --all-namespaces -l troubleshoot.io/kind=supportbundle-spec
# NAMESPACE   NAME                        TYPE     DATA   AGE
# default     flannel-troubleshoot-spec   Opaque   1      94s
# default     kotsadm-troubleshoot-spec   Opaque   1      9s
# default     velero-troubleshoot-spec    Opaque   1      52s

kubectl support-bundle secret/default/flannel-troubleshoot-spec secret/default/kotsadm-troubleshoot-spec secret/default/velero-troubleshoot-spec
```

Troubleshoot can also discover all the specs in a given namespace or cluster based on the `troubleshoot.io/kind` label with the `--load-cluster-specs` flag:

```shell
kubectl support-bundle --load-cluster-specs
```

And this can be combined with input from a file or URL, as well:

```shell
kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot/main/sample-troubleshoot.yaml --load-cluster-specs
```

The analysis screen will show the results of all the Analyzers defined in your chosen manifests, and all the contents will be available in a single bundle.  Have a look at our [troubleshoot-specs repo on GitHub](https://github.com/replicatedhq/troubleshoot-specs) for some real world use cases.

**Note: getting a merged Support Bundle will be available from the Admin Console soon; right now this is available only from the Troubleshoot CLI**
