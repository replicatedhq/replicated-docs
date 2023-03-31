import ImageRegistryAirgapAbout from "../partials/image-registry/_image-registry-airgap-about.mdx"
import ImageRegistryAirgapPrereq from "../partials/image-registry/_image-registry-airgap-prereq.mdx"
import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"

# Air Gap Installation with the Kubernetes Installer

This topic describes how to use Replicated to install an application in an air gap environment, using the Replicated Kubernetes installer to provision an embedded cluster on a virtual machine or on bare metal. The procedure explains how to install with and without high availability mode.

<KurlAbout/>

## About Private Registries

<ImageRegistryAirgapAbout/>

## About High Availability Mode

Air gap installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<ImageRegistryAirgapPrereq/>

<HaLoadBalancerPrereq/>

## Install the App Manager and Application {#air-gap}

This procedure explains how to install the app manager and the application in an air gapped environment, with and without high availability mode.

To install the app manager and application:

1. Run one of the following commands:

    - For a regular installation, run:

      ```bash
      curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
      tar -xvzf FILENAME.tar.gz
      cat install.sh | sudo bash -s airgap
      ```

    - For high availability, run:

      ```bash
      curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
      tar xvzf FILENAME.tar.gz
      cat install.sh | sudo bash -s airgap ha
      ```

    Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

    After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. You can use these in the next step to log in to the admin console and install the application.

    :::note
    You can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#online).
    :::

  1. (High Availability Only) If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

      - If you are using the internal load balancer, leave the prompt blank and proceed with the installation.

      - If you are using an external load balancer, pass the load balancer address.
  
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

## Next Step

(Optional) You can add nodes to the cluster. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).