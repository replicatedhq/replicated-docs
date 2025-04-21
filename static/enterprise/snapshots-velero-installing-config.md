# Configure Namespace Access and Memory Limit

This topic describes how to configure namespace access and the memory limit for Velero.

## Overview

The Replicated KOTS Admin Console requires access to the namespace where Velero is installed. If your Admin Console is running with minimal role-based-access-control (RBAC) privileges, you must enable the Admin Console to access Velero.

Additionally, if the application uses a large amount of memory, you can configure the default memory limit to help ensure that Velero runs successfully with snapshots.

## Configure Namespace Access

This section applies only to _existing cluster_ installations (online and air gap) where the Admin Console is running with minimal role-based-access-control (RBAC) privileges.

Run the following command to enable the Admin Console to access the Velero namespace:

```
kubectl kots velero ensure-permissions --namespace ADMIN_CONSOLE_NAMESPACE --velero-namespace VELERO_NAMESPACE
```
Replace:
* `ADMIN_CONSOLE_NAMESPACE` with the namespace on the cluster where the Admin Console is running.
* `VELERO_NAMESPACE` with the namespace on the cluster where Velero is installed.

For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the KOTS CLI documentation. For more information about RBAC privileges for the Admin Console, see [Kubernetes RBAC](/vendor/packaging-rbac).

## Configure Memory Limit

This section applies to all online and air gap installations.

Velero sets default limits for the velero Pod and the node-agent (restic) Pod during installation. There is a known issue with restic that causes high memory usage, which can result in failures during backup creation when the Pod reaches the memory limit.

Increase the default memory limit for the node-agent (restic) Pod if your application is particularly large. For more information about configuring Velero resource requests and limits, see [Customize resource requests and limits](https://velero.io/docs/v1.10/customize-installation/#customize-resource-requests-and-limits) in the Velero documentation.

For example, the following kubectl commands will increase the memory limit for the node-agent (restic) daemon set from the default of 1Gi to 2Gi.

**Velero  1.10 and later**:

```
kubectl -n velero patch daemonset node-agent -p '{"spec":{"template":{"spec":{"containers":[{"name":"node-agent","resources":{"limits":{"memory":"2Gi"}}}]}}}}'
```

**Velero versions earlier than 1.10**:

```
kubectl -n velero patch daemonset restic -p '{"spec":{"template":{"spec":{"containers":[{"name":"restic","resources":{"limits":{"memory":"2Gi"}}}]}}}}'
```

Alternatively, you can potentially avoid the node-agent (restic) Pod reaching the memory limit during snapshot creation by running the following kubectl command to lower the memory garbage collection target percentage on the node-agent (restic) daemon set:

**Velero  1.10 and later**:

```
kubectl -n velero set env daemonset/node-agent GOGC=1
```

**Velero versions earlier than 1.10**:

```
kubectl -n velero set env daemonset/restic GOGC=1
```

## Additional Resources

* [Troubleshooting Snapshots](snapshots-troubleshooting-backup-restore)