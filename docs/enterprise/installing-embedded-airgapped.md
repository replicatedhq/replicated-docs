import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import HAStep from "../partials/install/_embedded-ha-step.mdx"
import LoginPassword from "../partials/install/_embedded-login-password.mdx"
import InstallApp from "../partials/install/_embedded-admin-console-step.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"
import KotsCliInstall from "../partials/install/_kots-cli-install.mdx"

# Air Gap Installation with the Kubernetes Installer

This topic describes how to use Replicated to install an application in an air gap environment, using the Replicated Kubernetes installer to provision an embedded cluster on a virtual machine or on bare metal. The procedure explains how to install with and without high availability mode.

<KurlAbout/>

## About High Availability Mode

Air gap installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<AirGapBundle/>

<LicenseFile/>

<HaLoadBalancerPrereq/>

## Install the Application {#air-gap}

This procedure describes how to provision a cluster with the Kubernetes installer, install the app manager, then install and deploy the application.

To install the application:

1. In your installation environment, run the following command to download the `.tar.gz` air gap bundle for the Kubernetes installer:

   ```bash
   curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
   ```

   Replace `FILENAME` with the name of the `.tar.gz` bundle provided by your application vendor. For example, `curl -LO https://k8s.kurl.sh/bundle/my-app.tar.gz`.

1. Extract the contents of the bundle that you downloaded:

   ```bash
   tar -xvzf FILENAME.tar.gz
   ```

1. Run one of the following commands to create the cluster with the Kubernetes installer and install the app manager in air gap mode: 

    - For a regular installation, run:

      ```bash
      cat install.sh | sudo bash -s airgap
      ```

    - For high availability, run:

      ```bash
      cat install.sh | sudo bash -s airgap ha
      ```

    :::note
    <LoginPassword/>
    :::

  1. <HAStep/>
  
  1. Install the application using one of the following methods:

      <InstallApp/>

      - **kots CLI:** To install and deploy the application with the kots CLI, run the following command:
        
        ```bash
        kubectl kots install APP_NAME \
        --license-file PATH_TO_LICENSE_FILE \
        --config-values PATH_TO_CONFIG_VALUES \
        --namespace ADMIN_CONSOLE_NAMESPACE \
        --shared-password PASSWORD \
        --airgap-bundle PATH_TO_AIRGAP_BUNDLE
        ```

        Replace:
        <KotsCliInstall/>
        
        * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle that you downloaded.

        For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.
## Next Step

(Optional) You can add nodes to the cluster. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).