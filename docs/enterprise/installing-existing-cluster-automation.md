# Installing with the kots CLI

This topic describes how to automate the installation of an application using the kots CLI.

## Overview of Installing with the kots CLI

You can install an application using the kots CLI, rather than the Replicated admin console. Installing an application with the kots CLI allows you to automate the installation process.

To install an application with the kots CLI, provide your license file and your user-specific configuration values for the application when you run the `kots install` command.

When you run the kots CLI install command, the app manager writes the license file and configuration values as ConfigMaps to the cluster.

## Install on an Existing Cluster

This section describes how to use the kots CLI to install an application on an existing cluster in both online and air gap environments.

### Install in an Online Environment

To install with the kots CLI in an online environment:

1. In your local directory, create a YAML file with `kind: ConfigValues` and `apiVersion: kots.io/v1beta1`. Save the file as `configvalues.yaml`.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: ConfigValues
   ```
1. In the `configvalues.yaml` file, for each required and optional configuration item, add the desired value in the `value` field. Or, leave the `value` field blank to use the default.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: ConfigValues
   spec:
     values:
       config_item:
         default: "2"
         value: "4"
       boolean_config_item:
         default: false
         value: true
   ```

   :::note
   Your application vendor provides details about the required and optional configuration items to include in the ConfigValues file. For information about how to download a sample ConfigValues from an installed instance of an application, see LINK.
   :::

1. Run the kots CLI install command, specifying the namespace, admin console password, license file, configuration values. Optionally, include the `--no-port-forward` flag to disable the automatic port forward:

  ```
  kubectl kots install APP_SLUG \
    --namespace APP_NAMESPACE \
    --shared-password PASSWORD \
    --license-file ./LICENSE_YAML \
    --config-values ./CONFIGVALUES_YAML \
    --no-port-forward
  ```
  Replace:
  * `APP_SLUG` with the unique slug for the application provided by your application vendor.
  * `APP_NAMESPACE` with a new or existing namespace on the cluster where the kots CLI installs the application. If the namespace does not exist, the kots CLI creates the namespace.
  * `PASSWORD` with a shared password for accessing the admin console.
  * `LICENSE_YAML` with the local path to your license YAML file.
  * `CONFIGVALUES_YAML` with the local path to the ConfigValues YAML file that you created in the previous step.

  For more information about each of the flags for the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

  The kots CLI installs the admin console and the application on the cluster. If port forwarding is enabled, the kots CLI output includes the URLs where you can access the application and the admin console.

1. (Optional) If you included the `--no-port-forward` flag, after the `kots install` command completes, you can run the following command to access the admin console at http://localhost:8800:

  ```
  kubectl kots admin-console --namespace NAMESPACE
  ```
  Replace `NAMESPACE` with the namespace you specified in the `kots install` command.

### Install in an Air Gap Environment

To install with the kots CLI in an air gap environment:

1. Push the admin console images to a private registry using the `kubectl kots admin-console push-images` command. For more information, see [Install in an Air Gapped Environment](installing-existing-cluster#air-gap) in _Installing on an Existing Cluster_.

1. Run the kots CLI install command, specifying the namespace, admin console password, license file, configuration values. Optionally, include the `--no-port-forward` flag to disable the automatic port forward:

  ```
  kubectl kots install APP_SLUG \
    --namespace APP_NAMESPACE \
    --shared-password PASSWORD \
    --license-file ./LICENSE_YAML \
    --config-values ./CONFIGVALUES_YAML \
    --airgap-bundle /PATH_TO_AIRGAP_BUNDLE \
    --kotsadm-registry PRIVATE_REGISTRY_HOST \
    --kotsadm-namespace ADMIN_CONSOLE_NAMESPACE \
    --registry-username REGISTRY_USERNAME \
    --registry-password REGISTRY_PASSWORD \
    --no-port-forward
  ```
  Replace:
  * `APP_SLUG` with the unique slug for the application provided by your application vendor.
  * `APP_NAMESPACE` with a new or existing namespace on the cluster where the kots CLI installs the application. If the namespace does not exist, the kots CLI creates the namespace.
  * `PASSWORD` with a shared password for accessing the admin console.
  * `LICENSE_YAML` with the local path to your license YAML file.
  * `CONFIGVALUES_YAML` with the local path to the ConfigValues YAML file that you created in the previous step.
  * `PATH_TO_AIRGAP_BUNDLE`
  * `PRIVATE_REGISTRY_HOST`
  * `ADMIN_CONSOLE_NAMESPACE`
  * `REGISTRY_USERNAME` with the username for the registry account with read and write permissions.
  * `REGISTRY_PASSWORD` with the password for the registry account with read and write permissions.
