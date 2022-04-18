# Installing with the Kubernetes Installer

This article refers to installing an application and the Replicated admin console on a cluster created by the Replicated Kubernetes installer.

The Kubernetes installer is based on the open source kURL project, which is maintained by Replicated. For more information about installing with kURL, including advanced installation options, see the [kURL documentation](https://kurl.sh/docs/introduction/).

## Requirements

Before you install, ensure that you meet the system requirements. For more information, see [Kubernetes installer requirements](installing-embedded-cluster-requirements).

## Install in an Online Environment

To install the admin console on a cluster created by the Kubernetes installer, run the installation script provided by the application vendor.

For example:

```bash
curl -sSL https://kurl.sh/APP-SLUG | sudo bash
```
Where `APP-SLUG` is the unique slug for the application. The application slug is included in the installation script provided by the vendor.

:::note
With KOTS v1.67.0 and later, you can install a specific version of the application. Use the `app-version-label` flag and the version label for a particular version of your vendor's application. For example, `curl https://kurl.sh/supergoodtool | sudo bash -s app-version-label=3.1.0`.
:::

## Install in an Air Gapped Environment

To install in an air gapped environment, download the kURL air gap `.tar.gz`, extract it, and run the install.sh script:

```bash
curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
tar xvzf FILENAME.tar.gz
cat install.sh | sudo bash -s airgap
```
Where `FILENAME` is the name of the kURL air gap `.tar.gz` file.

:::note
You can construct the URL for the air gap bundle by prefixing the URL path for online installations as described in [Install in an Online Environment](#install-in-an-online-environment) above with `/bundle` and adding `.tar.gz` to the end.
:::

:::note
The air gap `.tar.gz` includes only the admin console components, which are required to install the application.
:::

After this command completes, you can install the application with the application `.airgap` bundle:

```
kubectl kots install APP-NAME \
  --airgap-bundle PATH-TO-AIRGAP-BUNDLE \
  --license-file PATH-TO-LICENSE-FILE \
  --config-values PATH-TO-CONFIG-VALUES \
  --namespace default \
  --shared-password PASSWORD
```
Where:
* `APP-NAME` is a name for the application.
* `PATH-TO-AIRGAP-BUNDLE` is the path to the `.airgap` bundle file.
* `PATH-TO-LICENSE-FILE` is the path to the license file.
* `PATH-TO-CONFIG-VALUES` is the path to the ConfigValues manifest file.
* `PASSWORD` is a shared password.

For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

## Install with High Availability

You can include the `ha` option to install with high availability. Both online and air gapped installations can be configured in high-availability mode.

When installing on a highly available cluster, the script will prompt for a load balancer address.
The load balancer can be preconfigured by passing in the `load-balancer-address=<host:port>` flag.

This load balancer should be configured to distribute traffic to all healthy control plane nodes in its target list.
This should be a TCP forwarding load balancer.

The health check for an apiserver is a TCP check on the port the kube-apiserver listens on (default value :6443).

For more information on the kube-apiserver load balancer see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

In the absence of a load balancer, all traffic will be routed to the first primary.

### Online

To install with high availability in an online environment, run:

```bash
curl -sSL https://kurl.sh/APP-SLUG | sudo bash -s ha
```
Where `APP-SLUG` is the unique slug for the application. The application slug is included in the installation script provided by the vendor.

### Air Gap Environment

To install with high availability in an air gapped environment, run the following command after you untar the `.tar.gz` file:
```bash
cat install.sh | sudo bash -s airgap ha
```

## Join Primary and Secondary Nodes

Visit the `/cluster/manage` page in the admin console to generate scripts for joining additional secondary and primary nodes.

For air gapped installations, the `.airgap` bundle must also be downloaded and extracted on the remote node prior to running the join script.
