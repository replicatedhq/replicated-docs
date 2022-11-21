import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"

# Using Automation to Install on an Existing Cluster

This topic describes installing an application with the kots CLI in online and air gap environments.

## Online Installation

To install an application with the kots CLI in an online environment, provide your license file and a ConfigValues file with the `kots install` command.

The following example shows how to use the kots CLI to install an application in an online environment:

```
kubectl kots install app-name \
  --namespace app-name \
  --shared-password password \
  --license-file ./license.yaml \
  --config-values ./configvalues.yaml \
  --no-port-forward
```

In the example above:
* `--namespace` defines the namespace where the app manager installs the application.
* `--shared-password` defines the shared password used for accessing the admin console.
* `--license-file` is your unique license YAML file. When starting, the admin console automatically installs the license file provided.
* `--config-values` is the ConfigValues YAML file where your application configuration values are defined. For more information about how to create the ConfigValues file, see [Define Application Configuration Values](#config-values) below.
* `--no-port-forward` disables the default port forward to the admin console that the `kots install` command opens.

  If you include `--no-port-forward`, you can run the following command after the installation command completes to access the admin console at `http://localhost:8800`:

  ```
  kubectl kots admin-console --namespace NAMESPACE
  ```
  Replace `NAMESPACE` with the namespace you specified in the `kots install` command.

For more information about the required and optional flags for online installations, see [install](/reference/kots-cli-install) in the kots CLI documentation.  

## Air Gap Installation

Before you can install an application in an air gap environment, you must push admin console images to a private registry using the  `kubectl kots admin-console push-images` command. For more information, see [Install in an Air Gapped Environment](installing-existing-cluster#air-gap) in _Installing on an Existing Cluster_.

To install an application with the kots CLI in an air gap environment, provide the following with the `kots install` command:
* The license file
* The ConfigValues file where your application configuration values are defined. For more information about how to create the ConfigValues file, see [Define Application Configuration Values](#config-values) below.
* The air gap bundle
* The hostname for the private registry where you pushed admin console images
* Credentials to access the private registry
* A namespace where the admin console will be installed

The following example shows how to use the kots CLI to install an application in an air gap environment:

```
kubectl kots install app-name \
  --namespace app-name \
  --shared-password password \
  --license-file ./license.yaml \
  --config-values ./configvalues.yaml \
  --airgap-bundle /path/to/application.airgap \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace app-name \
  --registry-username rw-username \
  --registry-password rw-password \
  --no-port-forward
```

For more information about the required and optional flags for air gap installations, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## Define Application Configuration Values {#config-values}

Many applications need configuration. You supply application configuration values by defining the values in a local YAML file. Then, you pass the YAML file with the `--config-values` flag when you run the `kots install` command.

To do this, create a YAML manifest file with `kind: ConfigValues` and `apiVersion: kots.io/v1beta1` that contains the configuration values for the application.

Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file.

The following is an example of a ConfigValues file:

<ConfigValuesExample/>

As shown in the example above, the ConfigValues file includes the following:
* Each of the custom configuration fields for the application
* The default values for each field, if applicable
* The user-supplied configuration value for each field

Alternatively, if you have access to an already installed instance of the application, you can also download the ConfigValues file for the installed instance to edit.

To download and edit an existing ConfigValues file:

1. Run the following command to download all the manifest files for the installed application:

    ```
    kubectl kots download --namespace APP_NAMESPACE --slug APP_SLUG --decrypt-password-values
    ```
    Replace:
    * `APP_NAMESPACE` with the namespace on the cluster where you installed your application.
    * `APP_SLUG` with the slug of the application.

    :::note
    `--decrypt-password-values` is an optional flag. When you include `--decrypt-password-values`, all configuration items with `type: password` are decrypted and the value is stored in `valuePlaintext` in the ConfigValues file.

    When you uploaded this ConfigValues file, any `valuePlaintext` is re-encrypted if the matching configuration item from the Config custom resource is `type: password`.
    :::

    The app manager downloads your application files from the cluster. The output of this command includes the location where the app manager downloaded the files in your local directory.

1. In your local directory, navigate to the folder where the app manager downloaded the files.

1. Open the `upstream/userdata/config.yaml` file in a text editor. Edit the file as necessary and save.
