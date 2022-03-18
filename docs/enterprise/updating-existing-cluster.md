# Updating the Admin Console on an Existing Cluster

This topic explains how to update the Replicated admin console on an existing cluster.
For information about how to update the admin console on a Kubernetes installer-created cluster (embedded cluster), see [Updating the admin console on a Kubernetes installer-created cluster](updating-embedded-cluster).

Updating the admin console requires updating the kots CLI first. You have the option to update to the latest version of the kots CLI or to a specific version.

Downgrading the admin console to a version earlier than what is currently deployed is not supported.

### Update an Online Installation

For online installations, the admin console is updated to the same version as the version of the kots CLI that you use to perform the update. For example, if you use v1.56.0 of the kots CLI to update the admin console, then the admin console is updated to v1.56.0.

To update an online installation of the admin console:

1. (Optional) Run the `kubectl kots version` command to see the current version of the kots CLI.

1. Do _one_ of the following actions to update your kots CLI version:

    - For the latest version, run `curl https://kots.io/install | bash`.

    - For a particular version, run `curl https://kots.io/install/<version> | bash`.

1. Run the following command to update the admin console on an existing cluster:

  ```bash
  kubectl kots admin-console upgrade -n <namespace>
  ```

  :::note
  For help information, run `kubectl kots admin-console upgrade -h`.
  :::

### Update an Air Gap Installation

For air gap installations, the version of the kots CLI that is used to perform the update must match the version of the Replicated app manager air gap bundle used for the update.

To update an air gap installation of the admin console:

1. Download your desired version of the app manager air gap bundle from [Github](https://github.com/replicatedhq/kots/releases) or from the customer download page provided by your vendor. The air gap bundle is named `kotsadm.tar.gz`.

1. Do _one_ of the following actions to update your kots CLI version:

    - For the latest version, run `curl https://kots.io/install | bash`.

    - For a particular version, run `curl https://kots.io/install/<version> | bash`.

    :::important
    The kots CLI version must match the air gap bundle version.
    :::

1. Push images to a private registry:

    ```shell
    kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/application-name \
      --registry-username rw-username \
      --registry-password rw-password
    ```

1. Run the following command using registry read-only credentials to update the admin console:

    ```bash
    kubectl kots admin-console upgrade \
      --kotsadm-registry private.registry.host/application-name \
      --registry-username ro-username \
      --registry-password ro-password \
      -n <namespace>
    ```
