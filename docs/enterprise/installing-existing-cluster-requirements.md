# Cluster Requirements

This topic describes the requirements for installing an application with the Replicated app manager on an existing cluster.

In addition to the requirements listed on this page, you must also meet the general system requirements as well as any additional requirements from your software vendor. For more information about the system requirements, see [General System Requirements](installing-general-requirements).

To install an application on an existing cluster with Replicated, the cluster must meet the following requirements:

* **Kubernetes version compatibility**: The version of Kubernetes running on the cluster must be compatible with the version of KOTS that you use to install the application. KOTS is an open source project maintained by Replicated. The Replicated app manager is based on the KOTS project. This compatibility requirement does not include any specific and additional requirements defined by the software vendor for the application.

   For more information about the versions of Kubernetes that are compatible with each version of KOTS, see [Kubernetes Version Compatibility](installing-general-requirements/#kubernetes-version-compatibility) in _General System Requirements_.
* **Storage class**: The cluster must have an existing storage class available. For more information, see [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) in the Kubernetes documentation.
* **Role-based access control (RBAC)**: Replicated requires the following RBAC permissions on the cluster:
   * An existing namespace and an RBAC binding that permits the user of the kubectl command-line tool to create workloads, ClusterRoles, and ClusterRoleBindings.
   * cluster-admin permissions to create namespaces and assign RBAC roles across the cluster.

:::note
If the `requireMinimalRBACPrivileges` property is set to `true` in the Application custom resource manifest, or if the `supportsMinimalRBACPrivileges` property is set to `true` in the Application custom resource manifest and the `--use-minimal-rbac` flag is passed to the `kots install` command, the app manager does not require the ability to create ClusterRoles and ClusterRoleBindings and uses a namespace-scoped Role and RoleBinding instead. For more information about the Application custom resource, see [Application](../reference/custom-resource-application) in _Custom resources_.
:::

**Note**: Root access on nodes or workstations is *not* required to install an application on an existing cluster.
