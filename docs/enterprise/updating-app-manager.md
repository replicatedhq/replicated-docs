# Updating the App Manager

This topic describes how to update the version of the Replicated app manager running in existing cluster or in clusters created by the Replicated Kubernetes installer.

For information about the latest versions of the app manager, see [App Manager Release Notes](/release-notes/rn-app-manager).

## Limitation

Downgrading the app manager to a version earlier than what is currently deployed is not supported.

## Update the App Manager on an Existing Cluster

Updating the version of the app manager on an existing cluster requires that you first update the kots CLI. You have the option to update to the latest version of the kots CLI or to a specific version.

### Online Installations

For online installations, the app manager is updated to the same version as the version of the kots CLI that you use to perform the update. For example, if you use v1.56.0 of the kots CLI to update the app manager, then the app manager is updated to v1.56.0.

To update an online installation of the app manager:

1. (Optional) Run the `kubectl kots version` command to see the current version of the kots CLI.

1. Do _one_ of the following actions to update your kots CLI version:

    - For the latest version, run `curl https://kots.io/install | bash`.

    - For a particular version, run `curl https://kots.io/install/<version> | bash`.

1. Run the following command to update the app manager on an existing cluster:

  ```bash
  kubectl kots admin-console upgrade -n <namespace>
  ```

  :::note
  For help information, run `kubectl kots admin-console upgrade -h`.
  :::

### Air Gap Installations

For air gap installations, the version of the kots CLI that is used to perform the update must match the version of the app manager air gap bundle used for the update.

To update the app manager in an existing air gap cluster:

1. Download the desired version of the app manager air gap bundle from [Github](https://github.com/replicatedhq/kots/releases) or from the customer download page provided by your vendor. The air gap bundle is named `kotsadm.tar.gz`.

1. Do _one_ of the following actions to update your kots CLI version to the same version of the air gap bundle:

    - For the latest version, run `curl https://kots.io/install | bash`.

    - For a specific version, run `curl https://kots.io/install/VERSION | bash`, where `VERSION` is the desired kots CLI version.

    :::important
    The kots CLI version must match the air gap bundle version.
    :::

1. Push images to a private registry:

    ```
    kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/application-name \
      --registry-username rw-username \
      --registry-password rw-password
    ```

1. Run the following command using registry read-only credentials to update the app manager:

    ```
    kubectl kots admin-console upgrade \
      --kotsadm-registry private.registry.host/application-name \
      --registry-username ro-username \
      --registry-password ro-password \
      -n <namespace>
    ```

## Update the App Manager on Kubernetes Installer Clusters

This section provides information about how to update the version of the app manager running in a cluster created by the Kubernetes installer.

### Online Installations

To update the app manager in an online environment, re-run the installation script on the first primary node where the installation was initialized. All of the flags that were passed to the script for the initial installation must be passed again.

```bash
curl -sSL https://kurl.sh/APP_SLUG | sudo bash
```

Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

### Air Gapped Installations

To update the app manager in an air gapped environment, download the new Kubernetes installer air gap bundle, extract it, and run the install.sh script:

```bash
curl -SL -o APP_SLUG.tar.gz https://kurl.sh/bundle/APP_SLUG.tar.gz
tar xzvf APP_SLUG.tar.gz
cat install.sh | sudo bash -s airgap
```

Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.
