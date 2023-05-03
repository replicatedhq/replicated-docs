import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import HAStep from "../partials/install/_embedded-ha-step.mdx"
import LoginPassword from "../partials/install/_embedded-login-password.mdx"
import InstallApp from "../partials/install/_embedded-admin-console-step.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"

# Online Installation with the Kubernetes Installer

This topic explains how to install an application on an embedded cluster provisioned by the Replicated Kubernetes installer.

<KurlAbout/>

## About High Availability Mode

Online installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<HaLoadBalancerPrereq/>

## Install the Application

This procedure explains how to install the the application in an online environment, with and without high availability mode.

To install the application:

1. Run one of the following commands to install the app manager:

    * For a regular installation, run:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
      ```
    
    * For high availability mode:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ha
        ```
    
    Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

    :::note
    <LoginPassword/>
    :::

1. <HAStep/> 

1. Install the application using one of the following methods:

    <InstallApp/>

    - **kots CLI:** Use the following command to install the application. For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

      ```
        kubectl kots install APP_NAME \
        --license-file PATH_TO_LICENSE_FILE \
        --config-values PATH_TO_CONFIG_VALUES \
        --namespace ADMIN_CONSOLE_NAMESPACE \
        --shared-password PASSWORD
      ```

      Replace:
        * `APP_NAME` with the name for the application.
        * `PATH_TO_LICENSE_FILE` with the path to the license file.
        * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
        * `ADMIN_CONSOLE_NAMESPACE` with the namespace where the admin console will be installed. **Default:** `default`
        * `PASSWORD` with a shared password.

## Next Step

(Optional) You can add nodes to the cluster. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).