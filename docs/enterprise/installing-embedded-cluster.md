import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"

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

    * For the latest version of the application:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
      ```

    * For a specific version of the application, use the `app-version-label` flag and the version label for a particular version of your vendor's application:

      ```shell
      curl https://k8s.kurl.sh/APP_SLUG | sudo bash -s app-version-label=VERSION_LABEL
      ```
    
    * For high availability mode:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ha
        ```
    
    Replace, where applicable:
     * `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.
     * `VERSION_LABEL` with the label for the version of the application to install. For example, `--app-version-label=3.0.1`.

1. (High Availability Only) If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

    - If you are using the internal load balancer, leave the prompt blank and proceed with the installation.

    - If you are using an external load balancer, pass the load balancer address.

1. Note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. 

1. Install the application using one of the following methods:

  - **Admin console:** Use the `kotsadm` and password from the previous step to log into the admin console. For information about using the admin console, see [Deploying the Application using the Admin Console](installing-app-setup).

  - **kots CLI:**

      1. Install the kots CLI. See [Install without Root Access](/reference/kots-cli-getting-started#install-without-root-access) in the _Installing the kots CLI_ reference section.

      1. Use the following command to install the application. For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

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