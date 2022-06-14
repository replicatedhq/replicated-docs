# Installing with the Kubernetes Installer

This document explains how to install an application and the Replicated admin console on a cluster created by the Replicated Kubernetes installer.

The Kubernetes installer is based on the open source kURL project, which is maintained by Replicated. For more information about installing with kURL, including advanced installation options, see the [kURL documentation](https://kurl.sh/docs/introduction/).

## About Installing in High Availability Mode

Both online and air gap installations can be installed in high availability (HA) mode with the Kubernetes installer.

We recommend that you use a load balancer. If your vendor has provided an internal load balancer with the EKCO add-on, you do not need to provide your own external load balancer. An external load balancer can be preferred when clients outside the cluster need access to the cluster's Kubernetes API.

In the absence of any load balancer, all traffic is routed to the first primary node.

If you decide to use a external load balancer, the external load balancer must be a TCP forwarding load balancer. For more information, see [Prerequisites](#prerequisites).

The health check for an apiserver is a TCP check on the port that the kube-apiserver listens on. The default value is `:6443`. For more information about the kube-apiserver external load balancer, see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

## Prerequisites

Complete the following before you perform this task:

- Meet the general system requirements. See [General System Requirements](installing-general-requirements).
- Meet the system requirements for the Kubernetes installer. See [Kubernetes Installer Requirements](installing-embedded-cluster-requirements).
- (Optional) If you are installing with high availability and want to use the internal load balancer, you can preconfigure the internal load balancer by passing the `ekco-enable-internal-load-balancer` flag.
- If you are installing with high availability and want to use an external load balancer, ensure that your load balancer is:
  - A TCP forwarding external load balancer.
  - Configured to distribute traffic to all healthy control plane nodes in its target list.
  - (Optional) Preconfigured with the load balancer address by passing the `load-balancer-address=HOST:PORT` flag. Replace `HOST:PORT` with the host and port number of the external load balancer.

## Install in an Online Environment

To install an application and the admin console in an online environment, do one of the following:

- To install without high availability, run the installation command provided by the application vendor:

  ```bash
  curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
  ```
  Replace `APP-SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

  :::note
  With KOTS v1.67.0 and later, you can install a specific version of the application. Use the app-version-label flag and the version label for a particular version of your vendor's application. For example, curl https://kurl.sh/supergoodtool | sudo bash -s app-version-label=3.1.0.
  :::

- To install with high availability:

    1. Run the installation command with the `-s ha` flag:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ha
      ```
      Replace `APP-SLUG` with the unique slug for the application. The application slug is included in the installation script provided by the vendor.

      :::note
      With KOTS v1.67.0 and later, you can install a specific version of the application. Use the app-version-label flag and the version label for a particular version of your vendor's application. For example, curl https://kurl.sh/supergoodtool | sudo bash -s app-version-label=3.1.0.
      :::

    1. If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

        - If you are using the internal load balancer, pass the following flag:

          ```bash
          ekco-enable-internal-load-balancer
          ```

        - If you are using an external load balancer, pass the following flag:

          ```bash
          load-balancer-address=HOST:PORT
          ```

          Replace `HOST:PORT` with the host and port number of the external load balancer.

## Install in an Air Gapped Environment

To install an application and the admin console in an air gapped environment:

1. Download and extract the kURL air gap `.tar.gz` file. The air gap `.tar.gz` includes only the admin console components, which are required to install the application.
1. Do one of the following:

    - To install without high availability, run:

      ```bash
      curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
      tar xvzf FILENAME.tar.gz
      cat install.sh | sudo bash -s airgap
      ```

      Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

    - To install with high availability:

      1. Run the following commands:

        ```bash
        curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
        tar xvzf FILENAME.tar.gz
        cat install.sh | sudo bash -s airgap ha
        ```

        Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

        :::note
        For both installation types, you can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#install-in-an-online-environment).
        :::

      1. If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

          - If you are using the internal load balancer, pass the following flag:

            ```bash
            ekco-enable-internal-load-balancer
            ```

          - If you are using an external load balancer, pass the following flag:

            ```bash
            load-balancer-address=HOST:PORT
            ```

            Replace `HOST:PORT` with the host and port number of the external load balancer.

1. Install the application with the application `.airgap` bundle:

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

    For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

## Join Primary and Secondary Nodes

You can generate commands in the admin console to join additional primary and secondary nodes to the cluster. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that your application runs smoothly.

To add primary and secondary nodes:

1. (Air gap only) Download and extract the `.airgap` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster > Add Node**.
1. Copy the command and run it on the node that you are joining to the cluster.

  **Example:**

  ```
  curl -sSL https://k8s.kurl.sh/my-test-app-unstable/join.sh | sudo bash -s \
  kubernetes-master-address=192.0.2.0:6443 \
  kubeadm-token=8z0hjv.s9wru9z \
  kubeadm-token-ca-hash=sha256:289f5c0d61775edec20d4e980602deeeeeeeeeeeeeeeeffffffffffggggggg \
  docker-registry-ip=198.51.100.3 \
  kubernetes-version=v1.19.16 \
  primary-host=203.0.113.6
  ```
