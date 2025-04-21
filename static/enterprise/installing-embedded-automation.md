# Automate Installation with Embedded Cluster

This topic describes how to install an application with Replicated Embedded Cluster from the command line, without needing to access the Replicated KOTS Admin Console.

## Overview

A common use case for installing with Embedded Cluster from the command line is to automate installation, such as performing headless installations as part of CI/CD pipelines.

With headless installation, you provide all the necessary installation assets, such as the license file and the application config values, with the installation command rather than through the Admin Console UI. Any preflight checks defined for the application run automatically during headless installations from the command line rather than being displayed in the Admin Console.

## Prerequisite

Create a ConfigValues YAML file to define the configuration values for the application release. The ConfigValues file allows you to pass the configuration values for an application from the command line with the install command, rather than through the Admin Console UI. For air-gapped environments, ensure that the ConfigValues file can be accessed from the installation environment. 

The KOTS ConfigValues file includes the fields that are defined in the KOTS Config custom resource for an application release, along with the user-supplied and default values for each field, as shown in the example below:

```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
spec:
  values:
    text_config_field_name:
      default: Example default value
      value: Example user-provided value
    boolean_config_field_name:
      value: "1"
    password_config_field_name:
      valuePlaintext: examplePassword
```

To get the ConfigValues file from an installed application instance:

1. Install the target release in a development environment. You can either install the release with Replicated Embedded Cluster or install in an existing cluster with KOTS. For more information, see [Online Installation with Embedded Cluster](/enterprise/installing-embedded) or [Online Installation in Existing Clusters](/enterprise/installing-existing-cluster).

1. Depending on the installer that you used, do one of the following to get the ConfigValues for the installed instance:

   * **For Embedded Cluster installations**: In the Admin Console, go to the **View files** tab. In the filetree, go to **upstream > userdata** and open **config.yaml**, as shown in the image below: 

       ![ConfigValues file in the Admin Console View Files tab](/images/admin-console-view-files-configvalues.png)

       [View a larger version of this image](/images/admin-console-view-files-configvalues.png)

   * **For KOTS installations in an existing cluster**: Run the `kubectl kots get config` command to view the generated ConfigValues file:

       ```bash
       kubectl kots get config --namespace APP_NAMESPACE --decrypt 
       ```
       Where:
       * `APP_NAMESPACE` is the cluster namespace where KOTS is running.
       * The `--decrypt` flag decrypts all configuration fields with `type: password`. In the downloaded ConfigValues file, the decrypted value is stored in a `valuePlaintext` field.

       The output of the `kots get config` command shows the contents of the ConfigValues file. For more information about the `kots get config` command, including additional flags, see [kots get config](/reference/kots-cli-get-config).

## Online (Internet-Connected) Installation

To install with Embedded Cluster in an online environment:

1. Follow the steps provided in the Vendor Portal to download and untar the Embedded Cluster installation assets. For more information, see [Online Installation with Embedded Cluster](/enterprise/installing-embedded).

1. Run the following command to install:

    ```bash
    sudo ./APP_SLUG install --license PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --admin-console-password ADMIN_CONSOLE_PASSWORD
    ```

    Replace:
    * `APP_SLUG` with the unique slug for the application.
    * `PATH_TO_LICENSE` with the path to the customer license.
    * `ADMIN_CONSOLE_PASSWORD` with a password for accessing the Admin Console.
    * `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.

## Air Gap Installation

To install with Embedded Cluster in an air-gapped environment:

1. Follow the steps provided in the Vendor Portal to download and untar the Embedded Cluster air gap installation assets. For more information, see [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap).

1. Ensure that the Embedded Cluster installation assets are available on the air-gapped machine, then run the following command to install:

    ```bash
    sudo ./APP_SLUG install --license PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --admin-console-password ADMIN_CONSOLE_PASSWORD \
      --airgap-bundle PATH_TO_AIRGAP_BUNDLE
    ```

    Replace:
    * `APP_SLUG` with the unique slug for the application.
    * `PATH_TO_LICENSE` with the path to the customer license.
    * `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.
    * `ADMIN_CONSOLE_PASSWORD` with a password for accessing the Admin Console.
    * `PATH_TO_AIRGAP_BUNDLE` with the path to the Embedded Cluster `.airgap` bundle for the release.