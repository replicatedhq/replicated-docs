import ImageRegistryAirgap from "../partials/image-registry/_image-registry-airgap.mdx"
import KurlAbout from "../partials/install/_kurl-about.mdx"


# Installing with the Kubernetes Installer

This topic explains how to install an application on a cluster provisioned by the Replicated Kubernetes installer.

<KurlAbout/>

## Prerequisites

Complete the following before you perform this task:

- Meet the system requirements. See [Kubernetes Installer Cluster Requirements](installing-general-requirements#embedded-cluster-requirements) in _Installation Requirements_.

- If you are installing in high availability mode:
  - (Optional) If you are going to use the internal load balancer, you can preconfigure it by passing `| sudo bash -s ha ekco-enable-internal-load-balancer`.
  - For an external load balancer, ensure that your load balancer is:
    - A TCP forwarding external load balancer.
    - Configured to distribute traffic to all healthy control plane nodes in its target list.
    - (Optional) Preconfigured by passing the `load-balancer-address=HOST:PORT` flag.
    
- <ImageRegistryAirgap/>

## Install in an Online Environment {#online}

To install an application in an online environment:

Run the installation command provided by the application vendor to provision the cluster and install the kots CLI, the Replicated admin console, and the application on the cluster:
   * **Install the latest version of the application**:

   ```bash
   curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
   ```

   Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

   * **(App manager v1.67.0 and later) Install a specific version of the application**:
     With the app manager v1.67.0 and later, you can install a specific version of the application. Use the `app-version-label` flag and the version label for a particular version of your vendor's application.

     ```shell
     curl https://k8s.kurl.sh/APP_SLUG | sudo bash -s app-version-label=VERSION_LABEL
     ```
     Replace:
     * `APP_SLUG` with the unique slug for the application.
     * `VERSION_LABEL` with the label for the version of the application to install. For example, `--app-version-label=3.0.1`.

After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. Then, log in to the admin console to complete the application setup, run preflight checks, and deploy. See [Completing Application Setup and Deploying](installing-app-setup).

## Install with High Availability Mode

Online installations can be installed in high availability (HA) mode with the Kubernetes installer.

A load balancer is required for high availability mode. If your vendor has chosen to use the internal load balancer with the EKCO add-on, you do not need to provide your own external load balancer. An external load balancer can be preferred when clients outside the cluster need access to the cluster's Kubernetes API.

If you decide to use an external load balancer, the external load balancer must be a TCP forwarding load balancer. For more information, see [Prerequisites](#prerequisites).

The health check for an apiserver is a TCP check on the port that the kube-apiserver listens on. The default value is `:6443`. For more information about the kube-apiserver external load balancer, see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

To install with high availability in an online environment:

1. Run the installation command with the `-s ha` flag to install the admin console:

    ```bash
    curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ha
      ```
    Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation script provided by the vendor.

1. If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

    - If you are using the internal load balancer, leave the prompt blank and proceed with the installation.

    - If you are using an external load balancer, pass the load balancer address.

After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. Then, log in to the admin console to complete the application setup, run preflight checks, and deploy. See [Completing Application Setup and Deploying](installing-app-setup).

