# Configuring Namespace Access and Memory Limit

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

1. (Optional) Increase the default memory limit for the node-agent (restic) Pod if your application is particularly large. Velero sets default limits for the velero Pod and the node-agent (restic) Pod during installation. There is a known issue with restic that causes high memory usage, which can result in failures during backup creation when the Pod reaches the memory limit. For more information about configuring Velero resource requests and limits, see [Customize resource requests and limits](https://velero.io/docs/v1.10/customize-installation/#customize-resource-requests-and-limits) in the Velero documentation.

   Alternatively, you can potentially avoid the node-agent (restic) Pod reaching the memory limit during backup creation by running the following kubectl command to lower the memory garbage collection target percentage on the node-agent (restic) daemon set:

   **Velero version 1.10 and later**:

   ```
   kubectl -n velero set env daemonset/node-agent GOGC=1
   ```

   **Velero versions less than 1.10**:

   ```
   kubectl -n velero set env daemonset/restic GOGC=1
   ```

## Additional Resources

* [How to Set Up Backup Storage](snapshots-config-workflow)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
