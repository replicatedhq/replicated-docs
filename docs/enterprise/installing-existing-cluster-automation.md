import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import PlaceholdersGlobal from "../partials/install/_placeholders-global.mdx"
import PlaceholderAirgapBundle from "../partials/install/_placeholder-airgap-bundle.mdx"
import PlaceholderNamespaceEmbedded from "../partials/install/_placeholder-namespace-embedded.mdx"
import PlaceholderNamespaceExisting from "../partials/install/_placeholder-namespace-existing.mdx"
import IntroExisting from "../partials/install/_automation-intro-existing.mdx"
import IntroEmbedded from "../partials/install/_automation-intro-embedded.mdx"

# Installing with the CLI

This topic describes how to use the Replicated kots CLI to install an application rather than using the Replicated KOTS admin console UI.

## Overview

You can use the kots CLI to install an application rather than using the KOTS admin console UI. In a CLI installation, you provide all the necessary artifacts to configure and install the application with the `kots install` command. For example, rather than uploading your license file in the admin console, you provide your license file with the `kots install` command using the `--license-file` flag. Additionally, any preflight checks defined for the application automatically run from the CLI rather than being displayed in the admin console.

The following shows an example of the output from the `kots install` command:

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

One common use case for installing with the CLI is to automate installation, such as installing applications as part of CI/CD pipelines. CLI installations are supported for _online_ environments (with outbound internet access), _air gap_ environments (without outbound internet access), existing clusters, and clusters created with Replicated kURL on a VM or bare metal server.

For more information about the advanced options for the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

For a tutorial that demonstrates how to install a sample application using the kots CLI, see [KOTS Tutorial (CLI)](/vendor/tutorial-cli-setup).

## Prerequisite

Create a ConfigValues manifest file to define the configuration settings for the application. For air gap environments, ensure that you can access the ConfigValues file that you create from your installation environment.

**Example:**

<ConfigValuesExample/>

As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application along with a user-supplied `value` for each field.

The ConfigValues file is specific to the application. For more information, see [Sharing a ConfigValues File](/vendor/releases-configvalues).
   
## Install with the CLI

This section provides the steps for installing an application with the kots CLI in different types of environments.

### Online Existing Cluster

<IntroExisting/>

To install in an online existing cluster:

1. Install the kots CLI:

   ```
   curl https://kots.io/install | bash
   ```

   For more installation options, see [Installing the kots CLI](/reference/kots-cli-getting-started).

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

    <PlaceholdersGlobal/>

    <PlaceholderNamespaceExisting/>

### Online kURL Cluster

<IntroEmbedded/>

To install in an online kURL cluster on a VM or bare metal server:

1. Create the kURL cluster:

   ```
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

    <PlaceholdersGlobal/>

### Air Gap Existing Cluster 

<IntroExisting/>

To install in an air gap existing cluster:

1. Install the kots CLI:

   ```
   curl https://kots.io/install | bash
   ```

   For more installation options, see [Installing the kots CLI](/reference/kots-cli-getting-started).

1. Extract container images from the `kotsadm.tar.gz` bundle and push the images to your private registry:

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz REGISTRY_HOST \
      --registry-username RW_USERNAME \
      --registry-password RW_PASSWORD
    ```

    Replace:

    * `REGISTRY_HOST` with the hostname for the private registry. For example, private.registry.host.

    * `RW_USERNAME` with the username for an account that has read and write access to the private image registry.

    * `RW_PASSWORD` with the password for the account with read and write access.

       :::note
       KOTS does not store or reuse these credentials.
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
        --kotsadm-namespace REGISTRY_NAMESPACE \
        --registry-username READ_WRITE_USERNAME \
        --registry-password READ_WRITE_PASSWORD \
        --no-port-forward
      ```

      Replace:

      <PlaceholdersGlobal/>

      <PlaceholderAirgapBundle/>

      <PlaceholderNamespaceExisting/>

      * `REGISTRY_HOST` with the hostname for the private registry where you pushed the images. For example, `private.registry.host`.

      * `REGISTRY_NAMESPACE` with the namespace in the private registry where you pushed the images. For example, if you pushed the images to `my-registry.example.com/app-name/image:tag`, then `app-name` is the registry namespace.

      * `READ_WRITE_USERNAME` and `READ_WRITE_PASSWORD` with credentials with read write permissions to the private registry where you pushed the images.

### Air Gap kURL Cluster

<IntroEmbedded/>

To install in an online kURL cluster on a VM or bare metal server:

1. Extract the contents of the kURL `.tar.gz` bundle:

    ```
    tar -xvzf FILENAME.tar.gz
    ```
    Replace `FILENAME` with the name of the kURL `.tar.gz` bundle.

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

    <PlaceholdersGlobal/>

    <PlaceholderAirgapBundle/>

## (Optional) Access the Admin Console

When you install an application in an existing cluster or when you provision a cluster with the kURL installer, you also install KOTS in the cluster. KOTS deploys the admin console. The admin console is a user interface where you can manage and upgrade your application instances.

By default, during installation, KOTS automatically opens localhost port 8800 to provide access to the admin console. The `--no-port-forward` flag in the `kots install` command prevents KOTS from creating a port forward to the admin console.

After you install with the `--no-port-forward` flag, you can optionally create a port forward so that you can log in to the admin console in a browser window.

To access the admin console:

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

1. Run the following kots CLI command to open localhost port 8800, which forwards to the admin console service:

   ```bash
   kubectl kots admin-console --namespace NAMESPACE
   ```
   Replace `NAMESPACE` with the namespace where the admin console was installed.

   For more information about the `kots admin-console` command, see [admin-console](/reference/kots-cli-admin-console-index) in the _kots CLI_ documentation.

1. Open a browser window and go to `https://localhost:8800`.

1. Log in to the admin console using the password that you created as part of the `kots install` command.