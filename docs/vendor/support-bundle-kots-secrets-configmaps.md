# Configure KOTS Discoverable Support Bundles

When you create support bundle specifications within Kubernetes Secret or ConfigMap resources, your customers can automatically discover support bundle specifications and generate a merged support bundle.

To make support bundle specifications discoverable in a cluster, you must wrap them in a Secret or ConfigMap. 

For example, to use a Secret, you add a specification as `Kind: Secret` and include the label `troubleshoot.io/kind: supportbundle` and a `data` key matching `support-bundle-spec`. For more information about adding Secrets, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.

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

## Test Your Specifications

For testing purposes, you can install the application in a development environment and collect a merged support bundle for some or all of the specifications in the cluster.

There are multiple ways to generate a merged support bundle. For example, to automatically discover and generate a bundle for all of the specifications in a given namespace or cluster, you can run `kubectl supportbundle --load-cluster-specs`. This command can also be combined with input for a URL. For more information, see [Generate a Bundle (KOTS v1.94.2 and Later)](/enterprise/troubleshooting-an-app/#generate-a-bundle-kots-v1942-and-later).

To generate an aggregate bundle using labels, you can first use `kubectl get secrets` to get a list of specifications that match the label and key in the Secret specification: 

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

The Troubleshoot analysis screen in the Replicated admin console shows the results of all of the analyzers defined in your chosen manifests, and the contents are available in a single bundle.

 For real use case specifications that you can use as templates, see the [troubleshoot-specs repo](https://github.com/replicatedhq/troubleshoot-specs) on GitHub.