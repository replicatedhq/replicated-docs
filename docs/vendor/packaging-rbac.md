# Edit App Manager Cluster Access

This topic describes how to change the default RBAC permissions granted to the Replicated app manager for existing cluster installations.

## About App Manager RBAC Resources

When a user installs your application in their existing cluster, Kubernetes role-based access control (RBAC) resources are created in the cluster to allow the app manager to manage the application. For more information about Kubernetes RBAC resources, see [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) in the Kubernetes documentation.

By default, the following ClusterRole and ClusterRoleBinding are created. These RBAC resources grant the app manager access to all resources across all namespaces in the cluster:

```yaml
apiVersion: "rbac.authorization.k8s.io/v1"
kind: "ClusterRole"
metadata:
  name: "kotsadm-role"
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kotsadm-role
subjects:
- kind: ServiceAccount
  name: kotsadm
  namespace: appnamespace
```

Using this default cluster-scoped access for the app manager is valuable if your application requires access to resources across multiple different namespaces in the cluster. Alternatively, you can limit the app manager's access to only the namespace where it is installed. For information, see [Use Namespace-scoped Access](#min-rbac) below.

## Use Namespace-scoped Access {#min-rbac}

You can limit the access granted to the app manager to a single namespace, rather than the default cluster-wide access. Replicated recommends that you use namespace-scoped access for the app manager unless your application requires access to cluster-wide resources.

To grant the app manager access to a single namespace only, specify one of the following options in the Application custom resource manifest file:

* `requireMinimalRBACPrivileges`: When set to `true`, the app manager creates a Role and RoleBinding that grant the app manager access to all resources in the namespace, but not to any resources outside the namespace. Use this option to require that all installations to existing cluster use minimal RBAC.

* `supportMinimalRBACPrivileges`: When set to `true`, the app manager supports creating a Role and RoleBinding, granting the admin console access to all resources in the namespace, but not to any resources outside of the namespace. Minimal RBAC is not used by default. It is used only when the `--use-minimal-rbac` flag is passed to the `kots install` command. Use this option if you want a subset of customer installations to use minimal RBAC.

For more information, see [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireMinimalRBACPrivileges) and [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportMinimalRBACPrivileges) in _Application_.

:::note
You can also use namespace-scoped access for Kubernetes Operators and multi-namespace applications. During application installation, if there are `additionalNamespaces` specified in the Application manifest, Roles and RoleBindings are created to give the app manager access to all specified namespaces.
:::

The following Role and RoleBinding are created automatically for namespace-scoped applications.

As shown in the Role below, the kotsadm component receives an authorization for all verbs, resources, and apiGroups in the namespace.

```yaml
apiVersion: "rbac.authorization.k8s.io/v1"
kind: "Role"
metadata:
  name: "kotsadm-role"
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kotsadm-role
subjects:
- kind: ServiceAccount
  name: kotsadm
  namespace: appnamespace
```

### Minimal RBAC Limitations

* **Existing clusters only**: The `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` options apply to installations on existing clusters only.
* **Strict preflight checks**: Without access to cluster-scoped resources, some preflight checks are not be able to read the resources. These tools continue to function, but return less data. For more information, see [Define Preflight Checks and Support Bundles](../vendor/preflight-support-bundle-creating#define-preflight-checks).
* **Velero namespace access**: Velero is a prerequisite for [admin console snapshots](../enterprise/snapshots-understanding). The namespace-scoped permission does not grant access to Velero's namespace if Velero is installed.

   The `kubectl kots velero ensure-permissions` command can be used to create additional Roles and RoleBindings to allow the necessary cross-namespace access. For more information, see [`velero ensure-permissions`](../reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation.
* **Air Gap Installations**: Air gap installations support the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags in headless installations only. For more information, see [Installing in Existing Clusters](/enterprise/installing-existing-cluster-automation#airgap-install).
Without access to the internet or the application's `.airgap` package as provided in a headless install, the app manager does not have the information required to determine whether minimal RBAC is appropriate and so it defaults to the more permissive RBAC policy.
* **Changing RBAC permissions for installed instances**: The RBAC permissions are set during the initial installation. The  app manager runs using the assumed identity and cannot change its own authorization. Changing the RBAC scope from cluster to namespace or from namespace to cluster affects only new installations. Existing installations continue to run with their current authorization.
For applications that need to elevate their permission from namespace to cluster, we recommend including a preflight check to ensure the permission is available.

### Minimal RBAC Installation Requirements

The user who installs an application must have the wildcard privileges in the cluster.
If the user has insufficient privileges, the following error is shown when attempting to install or upgrade:

```bash
$  kubectl kots install appslug
  • Current user has insufficient privileges to install Admin Console.
For more information, please visit https://kots.io/vendor/packaging/rbac
To bypass this check, use the --skip-rbac-check flag
Error: insufficient privileges
```

By default, In minimal RBAC installations, KOTS will attempt to acquire * * * permissions on the target namespace. If the user running the install/upgrade command does not have * * * permissions on the target namespace, the installation will fail with an error message:

```
failed to ensure kotsadm role: failed to create role: [roles.rbac.authorization.k8s.io](http://roles.rbac.authorization.k8s.io/) "kotsadm-role" is forbidden: user "<user>" (groups=["system:authenticated:oauth" "system:authenticated"]) is attempting to grant RBAC permissions not currently held
```