import ImageRegistryAirgap from "../partials/image-registry/_image-registry-airgap.mdx"
import KurlAbout from "../partials/install/_kurl-about.mdx"

# Air Gap Installation using a Kubernetes Installer

This topic describes how to use Replicated to install an application in an air gap environment, using the Replicated Kubernetes installer to provision an embedded cluster on a virtual machine or on bare metal.

<KurlAbout/>

## Prerequisites

Complete the following prerequisites:

- Meet the system requirements. See [Kubernetes Installer Cluster Requirements](installing-general-requirements#embedded-cluster-requirements) in _Installation Requirements_.

- If you are installing in high availability mode:
  - (Optional) If you are going to use the internal load balancer, you can preconfigure it by passing `| sudo bash -s ha ekco-enable-internal-load-balancer`.
  - For an external load balancer, ensure that your load balancer is:
    - A TCP forwarding external load balancer.
    - Configured to distribute traffic to all healthy control plane nodes in its target list.
    - (Optional) Preconfigured by passing the `load-balancer-address=HOST:PORT` flag.
    
- <ImageRegistryAirgap/>

## Install using a Kubernetes Installer {#air-gap}

To install in an air gapped environment using the Kubernetes installer:

1. Run the following commands:

    ```bash
    curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
    tar -xvzf FILENAME.tar.gz
    cat install.sh | sudo bash -s airgap
    ```

    Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

    After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. You can use these in the next step to log in to the admin console and install the application.

    :::note
    You can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#online).
    :::

  1. Install the application using one of the following methods:

      - **Admin console:** Use the `kotsadm` and password from the previous step to log into the admin console. For information about using the admin console, see [Completing Application Setup and Deploying](installing-app-setup).

      - **kots CLI:**

          1. Install the kots CLI. See [Install without Root Access](/reference/kots-cli-getting-started#install-without-root-access) in the _Installing the kots CLI_ reference section.
          1. Use the following command to install the application `.airgap` bundle. For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

              ```
                kubectl kots install APP_NAME \
                --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
                --license-file PATH_TO_LICENSE_FILE \
                  --config-values PATH_TO_CONFIG_VALUES \
                  --namespace default \
                  --shared-password PASSWORD
              ```

              Replace:
              * `APP_NAME` with the name for the application.
              * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle file.
              * `PATH_TO_LICENSE_FILE` with the path to the license file.
              * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
              * `PASSWORD` with a shared password.

## Install with High Availability Mode

Air gap installations can be installed in high availability (HA) mode with the Kubernetes installer.

A load balancer is required for high availability mode. If your vendor has chosen to use the internal load balancer with the EKCO add-on, you do not need to provide your own external load balancer. An external load balancer can be preferred when clients outside the cluster need access to the cluster's Kubernetes API.

If you decide to use an external load balancer, the external load balancer must be a TCP forwarding load balancer. For more information, see [Prerequisites](#prerequisites).

The health check for an apiserver is a TCP check on the port that the kube-apiserver listens on. The default value is `:6443`. For more information about the kube-apiserver external load balancer, see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

To install with high availability in an air gapped environment:

1. Run the following commands:

  ```bash
  curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
  tar xvzf FILENAME.tar.gz
  cat install.sh | sudo bash -s airgap ha
  ```

  Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

  After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. You can use these in a later step to log in to the admin console and install the application.

  :::note
  You can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#online).
  :::

1. If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

    - If you are using the internal load balancer, leave the prompt blank and proceed with the installation.

    - If you are using an external load balancer, pass the load balancer address.

1. Install the application using one of the following methods:

    - **Admin console:** Use the `kotsadm` and password from the previous step to log into the admin console. For information about using the admin console, see [Completing Application Setup and Deploying](installing-app-setup).

    - **kots CLI:** Use the following command to install the application `.airgap` bundle. For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

      ```
        kubectl kots install APP_NAME \
        --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
        --license-file PATH_TO_LICENSE_FILE \
          --config-values PATH_TO_CONFIG_VALUES \
          --namespace default \
          --shared-password PASSWORD
      ```
      Replace:
      * `APP_NAME` with the name for the application.
      * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle file.
      * `PATH_TO_LICENSE_FILE` with the path to the license file.
      * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
      * `PASSWORD` with a shared password.

## Next Step

(Optional) You can add nodes to the cluster. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).