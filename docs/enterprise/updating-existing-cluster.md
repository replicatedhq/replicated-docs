# Updating the admin console on an existing cluster

This topic explains how to upgrade the Replicated admin console on an existing cluster.
For information about how to upgrade the admin console on a Kubernetes installer-created cluster (embedded cluster), see [Updating the admin console on a Kubernetes installer cluster](updating-embedded-cluster).

Updating the admin console requires upgrading the kots CLI KOTS first. You have the option to upgrade to the latest version of the kots CLI or to a specific earlier version. Then, when you upgrade the admin console, the version that is installed matches the kots CLI version.

### Update an Online Installations

To update an online installation of the admin console:

1. Run the `kubectl kots version` to download the latest binary.

1. Do one of the following actions to update your kots CLI version:

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

To update an air gap installation of the admin console:

1. Download the the latest Replicated app manager binary from [Github](https://github.com/replicatedhq/kots/releases) or the customer download page in the Replicated [vendor portal](https://vendor.replicated.com).

1. Do one of the following actions to update your kots CLI version:

    - For the latest version, run `curl https://kots.io/install | bash`

    - For a particular version, run `curl https://kots.io/install/<version> | bash`

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
