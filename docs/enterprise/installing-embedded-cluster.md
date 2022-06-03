# Installing with the Kubernetes Installer

This sections explains how to install an application and the Replicated admin console on a cluster created by the Replicated Kubernetes installer.

The Kubernetes installer is based on the open source kURL project, which is maintained by Replicated. For more information about installing with kURL, including advanced installation options, see the [kURL documentation](https://kurl.sh/docs/introduction/).

## Prerequisites

Complete the following items before you perform this task:

- Meet the general system requirements. See [General System Requirements](installing-general-requirements).
- Meet the system requirements for the Kubernetes installer. See [Kubernetes Installer Requirements](installing-embedded-cluster-requirements).

## Install in an Online Environment

To install the admin console on a cluster created by the Kubernetes installer, run the installation script provided by the application vendor.

**Example:**

```bash
curl -sSL https://kurl.sh/APP-SLUG | sudo bash
```
Replace `APP-SLUG` with the unique slug for the application. The application slug is included in the installation script provided by the vendor.

:::note
With KOTS v1.67.0 and later, you can install a specific version of the application. Use the `app-version-label` flag and the version label for a particular version of your vendor's application. For example, `curl https://kurl.sh/supergoodtool | sudo bash -s app-version-label=3.1.0`.
:::

## Install in an Air Gapped Environment

To install in an air gapped environment:

1. Download and extract the kURL air gap `.tar.gz` file. The air gap `.tar.gz` includes only the admin console components, which are required to install the application.
1. Run the install.sh script:

    ```bash
    curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
    tar xvzf FILENAME.tar.gz
    cat install.sh | sudo bash -s airgap
    ```

    Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

    :::note
    You can construct the URL for the air gap bundle by prefixing the URL path for online installations, as described in [Install in an Online Environment](#install-in-an-online-environment) above, with `/bundle` and adding `.tar.gz` to the end.
    :::

1. Install the application with the application `.airgap` bundle:

    ```
    kubectl kots install APP-NAME \
      --airgap-bundle PATH-TO-AIRGAP-BUNDLE \
      --license-file PATH-TO-LICENSE-FILE \
      --config-values PATH-TO-CONFIG-VALUES \
      --namespace default \
      --shared-password PASSWORD
    ```
    Replace:
    * `APP-NAME` with the name for the application.
    * `PATH-TO-AIRGAP-BUNDLE` with the path to the `.airgap` bundle file.
    * `PATH-TO-LICENSE-FILE` with the path to the license file.
    * `PATH-TO-CONFIG-VALUES` with the path to the ConfigValues manifest file.
    * `PASSWORD` with a shared password.

    For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

## Installing with the Kubernetes Installer in High Availability Mode

Both online and air gap installations can be installed in high availability (HA) mode with the Kubernetes installer.

When installing on a highly available cluster, the script prompts for a load balancer address.
You can preconfigure the load balancer by passing in the `load-balancer-address=<host:port>` flag.

This load balancer should be:
- A TCP forwarding load balancer
- Configured to distribute traffic to all healthy control plane nodes in its target list

The health check for an apiserver is a TCP check on the port that the kube-apiserver listens on (the default value is `:6443`).

For more information about the kube-apiserver load balancer, see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

In the absence of a load balancer, all traffic is routed to the first primary node.

### Install with HA in an Online Environment

To install with high availability in an online environment, run:

```bash
curl -sSL https://kurl.sh/APP-SLUG | sudo bash -s ha
```
Replace `APP-SLUG` with the unique slug for the application. The application slug is included in the installation script provided by the vendor.

### Install with HA in an Air Gap Environment

To install with high availability in an air gap environment:

1. Extract the `.tar.gz` file.

1. Run the following command:

    ```bash
    cat install.sh | sudo bash -s airgap ha
    ```

## Join Primary and Secondary Nodes

You can generate commands in the admin console to join additional primary and secondary nodes.

To add primary and secondary nodes:

1. (Air gap only) Download and extract the `.airgap` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster > Add Node**.
1. Copy the command and run it on the node that you are joining to the cluster.

  **Example:**

  ```
  curl -sSL https://kurl.sh/my-test-app-2-unstable/join.sh | sudo bash -s \
  kubernetes-master-address=192.0.2.0:6443 \
  kubeadm-token=8z0hjv.s9wru9z \
  kubeadm-token-ca-hash=sha256:289f5c0d61775edec20d4e980602deeeeeeeeeeeeeeeeeffffffffffggggggg \
  docker-registry-ip=198.51.100.3 \
  kubernetes-version=v1.19.16 \
  primary-host=203.0.113.6
  ```
