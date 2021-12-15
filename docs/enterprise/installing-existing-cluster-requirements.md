# Cluster requirements

Existing cluster compatibility is primarily determined through the version of Kubernetes the cluster is running.
Unless otherwise noted on this page, cluster infrastructure having compatibility for a supported version of Kubernetes will be compatible with KOTS.
This excludes any specific and additional requirements imposed by software vendor.

In additional to a valid Kubernetes version, KOTS requires an existing [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/) to be available in the cluster.

Root access on nodes or workstations is *not* required for installations to existing clusters. To perform an install, the user executing `kubectl kots install` will need either.

## Cluster RBAC

Unless the `requireMinimalRBACPrivileges` attribute is included and set to `true` in the [application.yaml](/reference/v1beta1/application/), KOTS will require:

- Existing namespace, and an RBAC binding that allows the `kubectl`-ing user to create workloads, ClusterRoles, and ClusterRoleBindings
- cluster-admin permissions to create namespaces and assign RBAC roles across the cluster

With the `requireMinimalRBACPrivileges` included and set to `true`, KOTS will not require the ability to create ClusterRoles and ClusterRoleBindings.
In this mode, KOTS will use a namespace-scoped Role and RoleBinding
