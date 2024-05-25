import NodeAgentMemLimit from "../partials/snapshots/_node-agent-mem-limit.mdx"
import KotsadmNamespace from "../partials/kots-cli/_kotsadm-namespace.mdx"
import KotsadmRegistry from "../partials/kots-cli/_kotsadm-registry.mdx"

# Configuring Namespace Access and Memory Limit

This topic describes how to configure namespace access and the memory limit for Velero.

## Overview

The Replicated admin console requires access to the namespace where Velero is installed. If your admin console is running with minimal role-based-access-control (RBAC) privileges, you must enable the admin console to access Velero.

Additionally, if the application uses a large amount of memory, you can configure the default memory limit to help ensure that Velero runs successfully with snapshots.

## Configure Namespace Access

This section applies only to _existing cluster_ installations (online and air gap) where the admin console is running with minimal role-based-access-control (RBAC) privileges.

Run the following command to enable the admin console to access the Velero namespace:

```
kubectl kots velero ensure-permissions --namespace ADMIN_CONSOLE_NAMESPACE --velero-namespace VELERO_NAMESPACE
```
Replace:
* `ADMIN_CONSOLE_NAMESPACE` with the namespace on the cluster where the admin console is running.
* `VELERO_NAMESPACE` with the namespace on the cluster where Velero is installed.

For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation. For more information about RBAC privileges for the admin console, see [Kubernetes RBAC](/vendor/packaging-rbac).

## Configure Memory Limit

This section applies to all online and air gap installations.

Velero sets default limits for the velero Pod and the node-agent (restic) Pod during installation. There is a known issue with restic that causes high memory usage, which can result in failures during backup creation when the Pod reaches the memory limit.

<NodeAgentMemLimit/>

## Additional Resources

* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
