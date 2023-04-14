# Updating the App Manager

This topic describes how to update the version of the Replicated app manager running in your cluster. For information about the latest versions of the app manager, see [App Manager Release Notes](/release-notes/rn-app-manager).

:::note
Downgrading the app manager to a version earlier than what is currently deployed is not supported.
:::

## Update the App Manager in Existing Clusters

Updating the version of the app manager in an existing cluster requires that you first install or update the kots CLI.

You then run the kots CLI `admin-console upgrade` command to update the app manager to the same version of the kots CLI. For example, if you use version 1.97.0 of the kots CLI to run the `admin-console upgrade` command, then the app manager is updated to 1.97.0.

### Online Environments

To update the app manager in an online existing cluster:

1. (Optional) If you already have the kots CLI installed, run `kubectl kots version` to see the currently installed version.

1. Run _one_ of the following commands to install or update the kots CLI:

    - **Install or update to the latest version**:

      ```
      curl https://kots.io/install | bash
      ```

    - **Install or update to a specific version**:

      ```
      curl https://kots.io/install/VERSION | bash
      ```
      Where `VERSION` is the target app manager version.

    For more kots CLI installation options, including information about how to install or update without root access, see [Installing the kots CLI](/reference/kots-cli-getting-started).

1. Run the following command to update the app manager to the same version as the kots CLI:

  ```bash
  kubectl kots admin-console upgrade -n NAMESPACE
  ```
  Replace `NAMESPACE` with the namespace in your cluster where the app manager is installed.

  For help information, run `kubectl kots admin-console upgrade -h`.

### Air Gap Environments

For air gap installations, you first download the air gap bundle for the target version of the app manager and push the images from the air gap bundle to a private image registry.

To update the app manager in an existing air gap cluster:

1. Download the target version of the app manager air gap bundle from [Github](https://github.com/replicatedhq/kots/releases) or from the customer download page provided by your vendor. The air gap bundle is named `kotsadm.tar.gz`.

1. Install or update the kots CLI to the _same_ version of the air gap bundle:

   ```
   curl https://kots.io/install/VERSION | bash
   ```
   Replace `VERSION` with the same version of the app manager that is in the air gap bundle that you downloaded.

   For more kots CLI installation options, including information about how to install or update without root access, see [Installing the kots CLI](/reference/kots-cli-getting-started).

1. Push the app manager images from the air gap bundle to a private registry:

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz PRIVATE_REGISTRY_HOST \
      --registry-username RW_USERNAME \
      --registry-password RW_PASSWORD
    ```
    Replace:
    * `PRIVATE_REGISTRY_HOST` with the hostname for the private registry. For example, `private.registry.host/app-name`.
    * `RW_USERNAME` with the username for credentials with read and write permissions to the registry.
    * `RW_PASSWORD` with the password associated with the username. 

1. Run the following command using registry read-only credentials to update the app manager:

    ```
    kubectl kots admin-console upgrade \
      --kotsadm-registry PRIVATE_REGISTRY_HOST \
      --registry-username RO_USERNAME \
      --registry-password RO_PASSWORD \
      -n NAMESPACE
    ```
    Replace:
    * `PRIVATE_REGISTRY_HOST` with the same private registry from the previous step. For example, `private.registry.host/app-name`.
    * `RO_USERNAME` with the username for credentials with read-only permissions to the registry.
    * `RO_PASSWORD` with the password associated with the username.
    * `NAMESPACE` with the namespace on your cluster where the app manager is installed.

    For help information, run `kubectl kots admin-console upgrade -h`.

## Update the App Manager in Kubernetes Installer Clusters

To update the version of the app manager running in clusters created by the Kubernetes installer, you rerun the installation script. The installation script uses the specification provided by the application vendor to determine if any updates are required to the version of Kubernetes running in the cluster, or to any of the add-ons that the vendor included.

The version of the KOTS add-on provided in the Kubernetes installer specification determines the version of the app manager installed in your cluster. For example, if the version of the app manager running in your cluster is 1.92.0, and the vendor updates the KOTS add-on in the Kubernetes installer specification to use 1.92.1, then you can run the installation script to update the app manager version in your cluster to 1.92.1.

For information about how to rerun the installation script to update Kubernetes installer clusters, see [Updating Kubernetes Installer Clusters](updating-embedded-cluster).