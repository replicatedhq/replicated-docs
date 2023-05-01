import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import PrereqsConfigValues from "../partials/install/_prereqs-configvalues.mdx"
import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import PrereqsKotsInstall from "../partials/install/_prereqs-kots-install.mdx"
import PortForwardStep from "../partials/install/_port-forward-step.mdx"

# Using Automation to Install in an Existing Cluster

This topic describes how to use the the kots CLI to automate installation in an existing online or air gap cluster.

## About Automating Installation

Automating installation refers to using a single script to install both the Replicated app manager and the application.

Automating installation is useful because you can reference this installation script from an existing CI/CD workflow, 

## Prerequisites

Complete the following prerequisites:

<PrereqsExistingCluster/>

* <PrereqsKotsInstall/>

* <PrereqsConfigValues/>

    The following is an example of a ConfigValues file:

    <ConfigValuesExample/>

    As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application, along with a user-supplied value for each field.

    Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file. For more information, see [Downloading the ConfigValues File](/vendor/releases-configvalues).

## Automate Online Installations

You can use a single script to automatically install both the app manager and the application in an existing cluster that has access to the internet.

To automate the installation of the app manager and an application in an online environment:

1. Create the installation command:

    ```
    kubectl kots install APP_NAME \
      --namespace NAMESPACE \
      --shared-password PASSWORD \
      --license-file PATH_TO_LICENSE_FILE \
      --config-values PATH_TO_CONFIGVALUES_FILE \
      --no-port-forward
    ```
    Replace:
      * `APP_NAME` with the name of the application. This is provided by your application vendor.
      * `NAMESPACE` with the namespace where you want the app manager to install the application.
      * `PASSWORD` with the shared password for accessing the admin console.
      * `PATH_TO_LICENSE_FILE` with the path in your local directory to your unique license YAML file. The admin console automatically installs the license file provided.
      * `PATH_TO_CONFIGVALUES_FILE` with the path in your local directory to the ConfigValues YAML file where your application configuration values are defined. For more information about the ConfigValues file, see [About the ConfigValues File](#config-values) below.

1. <PortForwardStep/>


## Automate Air Gap Installations

To automate the installation of the app manager and an application in an air gap environment:

1. Push admin console images to a private registry using the  `kubectl kots admin-console push-images` command. For more information, see [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped).

1. Run the following command:

  ```
  kubectl kots install APP_NAME \
    --namespace APP_NAMESPACE \
    --shared-password PASSWORD \
    --license-file PATH_TO_LICENSE_FILE \
    --config-values PATH_TO_CONFIGVALUES_FILE \
    --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
    --kotsadm-namespace ADMIN_CONSOLE_NAMESPACE \
    --kotsadm-registry PRIVATE_REGISTRY_HOST \
    --registry-username READ_WRITE_USERNAME \
    --registry-password READ_WRITE_PASSWORD \
    --no-port-forward
  ```

  Replace:
    * `APP_NAME` with the name of the application. This is provided by your application vendor.
    * `NAMESPACE` with the namespace where you want the app manager to install the application.
    * `PASSWORD` with the shared password for accessing the admin console.
    * `PATH_TO_LICENSE_FILE` with the path in your local directory to your unique license YAML file. The admin console automatically installs the license file provided.
    * `PATH_TO_CONFIGVALUES_FILE` with the path in your local directory to the ConfigValues YAML file where your application configuration values are defined. For more information about the ConfigValues file, see [About the ConfigValues File](#config-values) below.
    * `PATH_TO_AIRGAP_BUNDLE` with the path in your local directory to the `.airgap` bundle for the application. The air gap bundle is provided by your application vendor.
    * `ADMIN_CONSOLE_NAMESPACE` with the namespace where you want the admin console to be installed.
    * `PRIVATE_REGISTRY_HOST` with the hostname for the private image registry where you pushed the admin console images in the previous step.
    * `READ_WRITE_USERNAME` and `READ_WRITE_PASSWORD` with credentials with read write permissions to the private image registry where you pushed the admin console images in the previous step.

1. <PortForwardStep/>    