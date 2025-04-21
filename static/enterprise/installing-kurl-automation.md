# Install with kURL from the Command Line

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

This topic describes how to install an application with Replicated kURL from the command line.

## Overview

You can use the command line to install an application with Replicated kURL. A common use case for installing from the command line is to automate installation, such as performing headless installations as part of CI/CD pipelines.

To install from the command line, you provide all the necessary installation assets, such as the license file and the application config values, with the installation command rather than through the Admin Console UI. Any preflight checks defined for the application run automatically during headless installations from the command line rather than being displayed in the Admin Console.

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

When you use the KOTS CLI to install an application in a kURL cluster, you first run the kURL installation script to provision the cluster and automatically install KOTS in the cluster. Then, you can run the `kots install` command to install the application.

To install with kURL on a VM or bare metal server:

1. Create the kURL cluster:

   ```bash
   curl -sSL https://k8s.kurl.sh/APP_NAME | sudo bash
   ```

1. Install the application in the cluster:

    ```bash
    kubectl kots install APP_NAME \
      --shared-password PASSWORD \
      --license-file PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --namespace default \
      --no-port-forward
    ```

    Replace:

    * `APP_NAME` with a name for the application. This is the unique name that KOTS will use to refer to the application that you install.

* `PASSWORD` with a shared password for accessing the Admin Console.

* `PATH_TO_LICENSE` with the path to your license file. See [Downloading Customer Licenses](/vendor/licenses-download). For information about how to download licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

* `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.

    * `NAMESPACE` with the namespace where Replicated kURL installed Replicated KOTS when creating the cluster. By default, kURL installs KOTS in the `default` namespace.

## Air Gap Installation

To install in an air-gapped kURL cluster:

1. Download the kURL `.tar.gz` air gap bundle:

   ```bash
export REPLICATED_APP=APP_SLUG
curl -LS https://k8s.kurl.sh/bundle/$REPLICATED_APP.tar.gz -o $REPLICATED_APP.tar.gz
```
Where `APP_SLUG` is the unqiue slug for the application.

1. In your installation environment, extract the contents of the kURL `.tar.gz` bundle that you downloaded:

   ```bash
   tar -xvzf $REPLICATED_APP.tar.gz
   ```

1. Create the kURL cluster:

   ```
   cat install.sh | sudo bash -s airgap
   ```

1. Install the application:

    ```bash
    kubectl kots install APP_NAME \
      --shared-password PASSWORD \
      --license-file PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
      --namespace default \
      --no-port-forward
    ```

    Replace:

    * `APP_NAME` with a name for the application. This is the unique name that KOTS will use to refer to the application that you install.

* `PASSWORD` with a shared password for accessing the Admin Console.

* `PATH_TO_LICENSE` with the path to your license file. See [Downloading Customer Licenses](/vendor/licenses-download). For information about how to download licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

* `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.

    * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle for the application release. You can build and download the air gap bundle for a release in the [Vendor Portal](https://vendor.replicated.com) on the **Release history** page for the channel where the release is promoted.

     Alternatively, for information about building and downloading air gap bundles with the Vendor API v3, see [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild) and [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl) in the Vendor API v3 documentation.

    * `NAMESPACE` with the namespace where Replicated kURL installed Replicated KOTS when creating the cluster. By default, kURL installs KOTS in the `default` namespace.