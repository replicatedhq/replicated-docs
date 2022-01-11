# Installing on an embedded cluster

This article refers to installing the Admin Console along with an embedded cluster.
When running the Admin Console on an existing cluster, see [Installing in an online (Internet-connected) environment](installing-existing-cluster-online) in _Installing on an existing cluster_.

### Powered by kURL
Replicated KOTS leverages a deep integration with the open-source kURL project in order to provide native embedded Kubernetes cluster support.
For more information about installing with kURL, including advanced installation options, see the [kURL documentation](https://kurl.sh/docs/introduction/).

For information about the kURL project, see the [kURL repository](https://github.com/replicatedhq/kurl) on GitHub.

### Online Installations

To install the Admin Console with an embedded cluster, simply run the installation script provided by the application developer.

```bash
curl -sSL https://kurl.sh/supergoodtool | sudo bash
```

### Airgapped Installations

To install an airgapped embedded cluster, download the airgap bundle, untar it, and run the install.sh script.
You can construct the URL for the bundle by prefixing the above online URL path with `/bundle` and adding `.tar.gz` to the end.

```bash
curl -LO https://k8s.kurl.sh/bundle/supergoodtool.tar.gz
tar xvzf supergoodtool.tar
cat install.sh | sudo bash -s airgap
```

kURL currently uses `.tar.gz` extension for a `.tar` file, hence the `-o *.tar`.

Note that the airgap bundle above only includes the Admin Console components, which are required in order to install the application.
After this command completes, the application can be installed using the application airgap bundle.

```bash
kubectl kots install myapp \
  --airgap-bundle ./myapp-1.0.165.airgap \
  --license-file ./license.yaml \
  --config-values ./config.yaml \
  --namespace default \
  --shared-password password
```

### HA Installations

Both online and airgapped installations can be configured in high-availability mode.

When installing a highly available cluster, the script will prompt for a load balancer address.
The load balancer can be preconfigured by passing in the `load-balancer-address=<host:port>` flag.

This load balancer should be configured to distribute traffic to all healthy control plane nodes in its target list.
This should be a TCP forwarding load balancer.

The health check for an apiserver is a TCP check on the port the kube-apiserver listens on (default value :6443).

For more information on the kube-apiserver load balancer see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

In the absence of a load balancer, all traffic will be routed to the first primary.

```bash
curl -sSL https://kurl.sh/supergoodtool | sudo bash -s ha
```

or

```bash
cat install.sh | sudo bash -s airgap ha
```

## System Requirements

Supported operating systems and minimum system requirements are specified by kURL. For more information, see [System Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements) in the kURL documentation.

## Joining Nodes

Visit the `/cluster/manage` page in the Kotsadm web console to generate scripts for joining additional secondary and primary nodes.

For airgapped installations, the airgap bundle must also be downloaded and extracted on the remote node prior to running the join script.
