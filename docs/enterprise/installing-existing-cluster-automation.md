import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"

# Using Automation to Install on an Existing Cluster

This topic describes installing an application with the kots CLI in online and air gap environments.

## Installing in an Online Environment

To install an application with the kots CLI in an online environment, run the following command:

```
kubectl kots install APP_NAME \
  --namespace NAMESPACE \
  --shared-password PASSWORD \
  --license-file PATH_TO_LICENSE_FILE \
  --config-values PATH_TO_CONFIGVALUES_FILE \
```

Replace:
* `APP_NAME` with the name of the application. This is provided by your application vendor.
* `NAMESPACE` with the namespace where you want the app manager to install the application.
* `PASSWORD` with the shared password for accessing the admin console.
* `PATH_TO_LICENSE_FILE` with the path in your local directory to your unique license YAML file. The admin console automatically installs the license file provided.
* `PATH_TO_CONFIGVALUES_FILE` with the path in your local directory to the ConfigValues YAML file where your application configuration values are defined. For more information about the ConfigValues file, see [About the ConfigValues File](#config-values) below.

For more information about the required and optional flags for the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## Installing in an Air Gap Environment

To use the kots CLI to install in an air gap environment:

1. Push admin console images to a private registry using the  `kubectl kots admin-console push-images` command. For more information, see [Install in an Air Gapped Environment](installing-existing-cluster#air-gap) in _Installing on an Existing Cluster_.

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
    --registry-password READ_WRITE_PASSWORD
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

For more information about the required and optional flags for the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## About the ConfigValues File {#config-values}

You supply application configuration values by defining the values in a local ConfigValues YAML file. Then, you provide the file to the app manager when you run the `kots install` command using the `--config-values` flag.

The following is an example of a ConfigValues file:

<ConfigValuesExample/>

As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application, along with a user-supplied value for each field.

Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file. For more information, see [Downloading the ConfigValues File](/vendor/releases-configvalues).

## About Disabling the Port Forward

By default, the `kots install` command opens a port forward to the admin console. `--no-port-forward` is an optional flag that disables the default port forward.

If you include `--no-port-forward`, you can run the following command after the installation command completes to access the admin console at `http://localhost:8800`:

```
kubectl kots admin-console --namespace NAMESPACE
```
Replace `NAMESPACE` with the namespace you specified in the `kots install` command.

For more information about the required and optional flags for the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.
