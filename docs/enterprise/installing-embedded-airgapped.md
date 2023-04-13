import ImageRegistryAirgapAbout from "../partials/image-registry/_image-registry-airgap-about.mdx"
import ImageRegistryAirgapPrereq from "../partials/image-registry/_image-registry-airgap-prereq.mdx"
import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import InstallAdmconsoleOnline from "../partials/install/_install-admconsole-airgap.mdx"

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

## Install the Application {#air-gap}

This procedure explains how to install the app manager and the application in an air gapped environment, with and without high availability mode.

To install the application:

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
  
  1. <InstallAdmconsoleAirgap/>

## Next Step

(Optional) You can add nodes to the cluster. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).