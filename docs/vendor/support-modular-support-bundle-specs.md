# Modular & Discoverable Support Bundle and Redactor specs

## Merge specs into a single Support Bundle archive

Support bundle specs can be designed in a modular fashion.  The Troubleshoot CLI can take [multiple specs as input](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs), and will handle merging the `collectors:` and `analyzers:` property into a single support bundle.  Thus, teams can more easily develop specs that are scoped to individual components or microservices in a large application.

For instance, in an application that ships MySQL, nginx, and redis, your team might consider adding some [collectors](https://troubleshoot.sh/docs/collect/) and [analyzers](https://troubleshoot.sh/docs/analyze/) for each component:

> manifests/nginx/troubleshoot.yaml

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

> manifests/mysql/troubleshoot.yaml

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

> manifests/redis/troubleshoot.yaml

```yaml
...
spec:
  collectors:
    - redis:
        collectorName: redis
        uri: rediss://default:password@hostname:6379
```

And a bundle can be generated from a combination of these manifests:

```bash
kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
```

Troubleshoot can consume preflights and support bundles from file, URL, and from Kubernetes resources.

## Adding specs to the cluster as Kubernetes resources for discoverability

You can also add [Support Bundle specs to a cluster as Secrets](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-specs-discovered-from-the-cluster).  Native CRDs are not yet available for Support Bundles or Preflights, so we'll wrap them in a Secret for now.  Make sure your spec has the label `troubleshoot.io/kind: support-bundle` and a data key `support-bundle-spec`:

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
