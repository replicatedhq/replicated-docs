# Installing and Configuring Velero

Before you can configure a storage destination and use the snapshots feature, you must install and configure Velero. Velero and Restic are the underlying technologies for snapshots.

## Install Velero

Velero must be installed on the cluster to use snapshots.

  * **Existing clusters:** Install Velero on the cluster. See [Basic Install](https://velero.io/docs/v1.9/basic-install/) in the Velero documentation.
  * **Kubernetes installer clusters:** If your application vendor provided the Velero add-on in the Kubernetes installer, Velero is installed in the cluster automatically and you only need to configure Velero.

    If Velero is not already installed on the Kubernetes installer cluster, the snapshots configuration dialog in the admin console notifies you to install Velero before you can proceed with the configuration.


## Configure Velero

You must configure the default memory limit and namespace to help ensure that Velero runs successfully with snapshots.

To configure Velero:

1. Enable access to the Velero namespace. The admin console requires access to the namespace where Velero is installed. If the admin console is running with minimal role-based-access-control (RBAC) privileges, you must run `kots velero ensure-permissions` to enable the admin console to access Velero:

   ```
   kubectl kots velero ensure-permissions --namespace ADMIN_CONSOLE_NAMESPACE --velero-namespace VELERO_NAMESPACE
   ```
   Replace:
   * `ADMIN_CONSOLE_NAMESPACE` with the namespace on the cluster where the admin console is running.
   * `VELERO_NAMESPACE` with the namespace on the cluster where Velero is installed.

  For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation. For more information about RBAC privileges for the admin console, see [Kubernetes RBAC](../vendor/packaging-rbac).

1. Increase the default memory limit for the restic Pod on the Velero deployment. Velero sets default limits for the Velero Pod and the restic Pod during installation. There is a known issue with restic that causes high memory usage on the restic Pod, which can result in failures during snapshot creation when the restic Pod reaches the memory limit. For more information, see the [Restic backup — OOM-killed on raspberry pi after backing up another computer to same repo](https://github.com/restic/restic/issues/1988) issue in the restic GitHub repository.

   To avoid the restic Pod reaching the memory limit during snapshot creation, run the following kubectl command to increase the memory limit on the restic daemon set on the Velero deployment:

   ```
   kubectl -n velero set env daemonset/restic GOGC=1
   ```

   For more information, see [Customize resource requests and limits](https://velero.io/docs/main/customize-installation/#customize-resource-requests-and-limits) in the Velero documentation.

## Next Step

After you install and configure Velero, you must configure an external storage destination. For more information, see [Storage Destinations](snapshots-storage-destinations).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
