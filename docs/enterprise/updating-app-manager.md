# Updating KOTS

This topic describes how to update the version of Replicated KOTS running in your cluster. For information about the latest versions of KOTS, see [App Manager (KOTS) Release Notes](/release-notes/rn-app-manager).

:::note
Downgrading KOTS to a version earlier than what is currently deployed is not supported.
:::

## Update KOTS in Existing Clusters

Updating the version of KOTS in an existing cluster requires that you first install or update the Replicated KOTS CLI.

You then run the KOTS CLI `admin-console upgrade` command to update KOTS to the same version of the KOTS CLI. For example, if you use version 1.97.0 of the KOTS CLI to run the `admin-console upgrade` command, then KOTS is updated to 1.97.0.

### Online Environments

To update KOTS in an online existing cluster:

1. (Optional) If you already have the KOTS CLI installed, run `kubectl kots version` to see the currently installed version.

1. Run _one_ of the following commands to install or update the KOTS CLI:

    - **Install or update to the latest version**:

      ```
      curl https://kots.io/install | bash
      ```

    - **Install or update to a specific version**:

      ```
      curl https://kots.io/install/VERSION | bash
      ```
      Where `VERSION` is the target KOTS version.

    For more KOTS CLI installation options, including information about how to install or update without root access, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

1. Run the following command to update KOTS to the same version as the KOTS CLI:

   ```bash
   kubectl kots admin-console upgrade -n NAMESPACE
   ```
   Replace `NAMESPACE` with the namespace in your cluster where KOTS is installed.

   For help information, run `kubectl kots admin-console upgrade -h`.

### Air Gap Environments

For air gap installations, you first download the air gap bundle for the target version of KOTS and push the images from the air gap bundle to a private image registry.

To update KOTS in an existing air gap cluster:

1. Download the target version of the KOTS air gap bundle from [Github](https://github.com/replicatedhq/kots/releases) or from the customer download page provided by your vendor. The air gap bundle is named `kotsadm.tar.gz`.

1. Install or update the KOTS CLI to the _same_ version of the air gap bundle:

   ```
   curl https://kots.io/install/VERSION | bash
   ```
   Replace `VERSION` with the same version of KOTS that is in the air gap bundle that you downloaded.

   For more KOTS CLI installation options, including information about how to install or update without root access, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

1. Push the KOTS images from the air gap bundle to a private registry:

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz PRIVATE_REGISTRY_HOST \
      --registry-username RW_USERNAME \
      --registry-password RW_PASSWORD
    ```
    Replace:
    * `PRIVATE_REGISTRY_HOST` with the hostname for the private registry. For example, `private.registry.host/app-name`.
    * `RW_USERNAME` with the username for credentials with read and write permissions to the registry.
    * `RW_PASSWORD` with the password associated with the username. 

1. Run the following command using registry read-only credentials to update KOTS:

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
    * `NAMESPACE` with the namespace on your cluster where KOTS is installed.

    For help information, run `kubectl kots admin-console upgrade -h`.

## Update KOTS in Embedded kURL Clusters

To update the version of KOTS running in embedded clusters created with Replicated kURL, rerun the kURL installation script. The installation script uses the specification provided by the application vendor to determine if any updates are required to the version of Kubernetes running in the cluster, or to any of the kURL add-ons that the vendor included.

The version of the kURL KOTS add-on provided in the kURL Installer specification determines the version of KOTS installed in your cluster. For example, if the version of KOTS running in your cluster is 1.92.0, and the vendor updates the KOTS add-on in the kURL installer specification to use 1.92.1, then you can run the installation script to update the KOTS version in your cluster to 1.92.1.

For information about how to rerun the installation script to update embedded kURL clusters, see [Updating Embedded kURL Clusters](updating-embedded-cluster).