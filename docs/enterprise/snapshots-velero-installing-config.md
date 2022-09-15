# Configure Namespace Access and Memory Limit

The Replicated admin console requires access to the namespace where Velero is installed. If your admin console is running with minimal role-based-access-control (RBAC) privileges, you must enable the admin console to access Velero.

Additionally, if the application uses a large amount of memory, you can configure the default memory limit to help ensure that Velero runs successfully with snapshots.

To configure Velero:

1. (Existing clusters only) Run the following command to enable access to the Velero namespace, if your admin console is running with minimal role-based-access-control (RBAC) privileges:

   ```
   kubectl kots velero ensure-permissions --namespace ADMIN_CONSOLE_NAMESPACE --velero-namespace VELERO_NAMESPACE
   ```
   Replace:
   * `ADMIN_CONSOLE_NAMESPACE` with the namespace on the cluster where the admin console is running.
   * `VELERO_NAMESPACE` with the namespace on the cluster where Velero is installed.

  For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation. For more information about RBAC privileges for the admin console, see [Kubernetes RBAC](../vendor/packaging-rbac).

1. (Optional) Increase the default memory limit for the restic Pod on the Velero deployment if your application is particularly large. Velero sets default limits for the Velero Pod and the restic Pod during installation. There is a known issue with restic that causes high memory usage on the restic Pod, which can result in failures during backup creation.

   Run the following kubectl command to increase the memory limit on the restic daemon set on the Velero deployment:

   ```
   kubectl -n velero set env daemonset/restic GOGC=1
   ```

   For more information about Velero resources and limits, see [Customize resource requests and limits](https://velero.io/docs/main/customize-installation/#customize-resource-requests-and-limits) in the Velero documentation.

## Additional Resources

* [How to Set Up Backup Storage](snapshots-config-workflow)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
