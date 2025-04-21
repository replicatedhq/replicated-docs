# Install with the KOTS CLI

This topic describes how to install an application with Replicated KOTS in an existing cluster using the KOTS CLI.

## Overview

You can use the KOTS CLI to install an application with Replicated KOTS. A common use case for installing from the command line is to automate installation, such as performing headless installations as part of CI/CD pipelines.

To install with the KOTS CLI, you provide all the necessary installation assets, such as the license file and the application config values, with the installation command rather than through the Admin Console UI. Any preflight checks defined for the application run automatically from the CLI rather than being displayed in the Admin Console.

The following shows an example of the output from the kots install command:

  ```
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
  • Waiting for Admin Console to be ready ✓
  • Waiting for installation to complete ✓
  • Waiting for preflight checks to complete ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console

  • Go to http://localhost:8888 to access the application
  ```

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

To install with KOTS in an online existing cluster:

1. Install the KOTS CLI:

   ```
   curl https://kots.io/install | bash
   ```

   For more installation options, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

1. Install the application:

    ```bash 
    kubectl kots install APP_NAME \
      --shared-password PASSWORD \
      --license-file PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --namespace NAMESPACE \
      --no-port-forward
    ```
    Replace:

    * `APP_NAME` with a name for the application. This is the unique name that KOTS will use to refer to the application that you install.

* `PASSWORD` with a shared password for accessing the Admin Console.

* `PATH_TO_LICENSE` with the path to your license file. See [Downloading Customer Licenses](/vendor/licenses-download). For information about how to download licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

* `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.

    * `NAMESPACE` with the namespace where you want to install both the application and KOTS.

## Air Gap Installation {#air-gap}

To install with KOTS in an air-gapped existing cluster:

1. Install the KOTS CLI. See [Manually Download and Install](/reference/kots-cli-getting-started#manually-download-and-install) in _Installing the KOTS CLI_.

1. Download the `kotsadm.tar.gz` air gap bundle from the [Releases](https://github.com/replicatedhq/kots/releases) page in the kots repository in GitHub. Ensure that you can access the downloaded bundle from the environment where you will install the application.

:::note
The version of the `kotsadm.tar.gz` air gap bundle used must be compatible with the version of the `.airgap` bundle for the given application release.
:::

    :::note
The versions of the KOTS CLI and the `kotsadm.tar.gz` bundle must match. You can check the version of the KOTS CLI with `kubectl kots version`.
:::

1. Extract the KOTS Admin Console container images from the `kotsadm.tar.gz` bundle and push the images to your private registry:

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz REGISTRY_HOST \
      --registry-username RW_USERNAME \
      --registry-password RW_PASSWORD
    ```

    Replace:

    * `REGISTRY_HOST` with the hostname for the private registry. For example, `private.registry.host` or `my-registry.example.com/my-namespace`.
    
    * `RW_USERNAME` and `RW_PASSWORD` with the username and password for an account that has read and write access to the private registry.
       
       :::note
       KOTS does not store or reuse these read-write credentials.
       :::

1. Install the application:

      ```bash
      kubectl kots install APP_NAME \
        --shared-password PASSWORD \
        --license-file PATH_TO_LICENSE \
        --config-values PATH_TO_CONFIGVALUES \
        --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
        --namespace NAMESPACE \
        --kotsadm-registry REGISTRY_HOST \
        --registry-username RO_USERNAME \
        --registry-password RO_PASSWORD \
        --no-port-forward
      ```

      Replace:

      * `APP_NAME` with a name for the application. This is the unique name that KOTS will use to refer to the application that you install.

* `PASSWORD` with a shared password for accessing the Admin Console.

* `PATH_TO_LICENSE` with the path to your license file. See [Downloading Customer Licenses](/vendor/licenses-download). For information about how to download licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

* `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.
      
      * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle for the application release. You can build and download the air gap bundle for a release in the [Vendor Portal](https://vendor.replicated.com) on the **Release history** page for the channel where the release is promoted.

     Alternatively, for information about building and downloading air gap bundles with the Vendor API v3, see [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild) and [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl) in the Vendor API v3 documentation.

      * `NAMESPACE` with the namespace where you want to install both the application and KOTS.
      
      * `REGISTRY_HOST` with the same hostname for the private registry where you pushed the Admin Console images.

* `RO_USERNAME` and `RO_PASSWORD` with the username and password for an account that has read-only access to the private registry.
    
    :::note
    KOTS stores these read-only credentials in a Kubernetes secret in the same namespace where the Admin Console is installed.

    KOTS uses these credentials to pull the images. To allow KOTS to pull images, the credentials are automatically created as an imagePullSecret on all of the Admin Console Pods.
    :::

## (Optional) Access the Admin Console

By default, during installation, KOTS automatically opens localhost port 8800 to provide access to the Admin Console. Using the `--no-port-forward` flag with the `kots install` command prevents KOTS from creating a port forward to the Admin Console.

After you install with the `--no-port-forward` flag, you can optionally create a port forward so that you can log in to the Admin Console in a browser window.

To access the Admin Console:

1. If you installed in a VM where you cannot open a browser window, forward a port on your local machine to `localhost:8800` on the remote VM using the SSH client:

   ```bash
   ssh -L LOCAL_PORT:localhost:8800 USERNAME@IP_ADDRESS
   ```
   Replace:
    * `LOCAL_PORT` with the port on your local machine to forward. For example, `9900` or `8800`.
    * `USERNAME` with your username for the VM.
    * `IP_ADDRESS` with the IP address for the VM.

   **Example**:

   The following example shows using the SSH client to forward port 8800 on your local machine to `localhost:8800` on the remote VM.
  
   ```bash
   ssh -L 8800:localhost:8800 user@ip-addr
   ```

1. Run the following KOTS CLI command to open localhost port 8800, which forwards to the Admin Console service:

   ```bash
   kubectl kots admin-console --namespace NAMESPACE
   ```
   Replace `NAMESPACE` with the namespace where the Admin Console was installed.

   For more information about the `kots admin-console` command, see [admin-console](/reference/kots-cli-admin-console-index) in the _KOTS CLI_ documentation.

1. Open a browser window and go to `https://localhost:8800`.

1. Log in to the Admin Console using the password that you created as part of the `kots install` command.