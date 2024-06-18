import AdminConsole from "../partials/updating/_admin-console.mdx"

# Performing Updates in Existing Clusters

This topics describes how to update application and Replicated KOTS in existing cluster installations.

## Update the Application

You can update an application using the Replicated Admin Console or the Replicated KOTS CLI.
See [Update an Application in the Admin Console](#update-an-application-in-the-admin-console)
or [Update an Application with the KOTS CLI](#update-an-application-with-the-kots-cli) below.

### Using the Admin Console

<AdminConsole/>

### Using the KOTS CLI

The KOTS CLI can be used to install and deploy updates for both online and air gapped instances as well.

#### Online Environments

In order to download updates from the internet, the following command can be used:

```bash
kubectl kots upstream upgrade <app slug> -n <Admin Console namespace>
```

Adding the `--deploy` flag will also automatically deploy the latest version.

The application slug is provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

#### Air Gap Environments

In order to install an update from an air gap file, the following command can be used:

```bash
kubectl kots upstream upgrade <app slug> \
  --airgap-bundle new-app-release.airgap \
  --kotsadm-registry <registry host>[/<registry namespace>] \
  --registry-username <username> \
  --registry-password <password> \
  -n <Admin Console namespace>
```

Adding the `--deploy` flag will also automatically deploy this version.

The application slug is provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

## Update KOTS

This section describes how to update the version of Replicated KOTS running in your cluster. For information about the latest versions of KOTS, see [KOTS Release Notes](/release-notes/rn-app-manager).

:::note
Downgrading KOTS to a version earlier than what is currently deployed is not supported.
:::

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