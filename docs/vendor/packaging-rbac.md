# Manage App Manager RBAC

This topic describes how to change the default cluster role-based access control (RBAC) permissions granted to the Replicated app manager in existing cluster installations.

## About Default Cluster-scoped RBAC

When a user installs your application in an existing cluster, Kubernetes RBAC resources are created to allow the app manager to install and manage the application.

By default, the following ClusterRole and ClusterRoleBinding resources are created that grant the app manager access to all resources across all namespaces in the cluster:

**Default ClusterRole**:

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

**Default ClusterRoleBinding**:

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

If your application requires access to resources across multiple namespaces in the cluster, then Replicated recommends that you use the default ClusterRole and ClusterRoleBinding above.

Alternatively, if your application does not require cluster-scoped access, then Replicated recommends that you configure RBAC for the app manager  . For information, see [Enable Namespace-scoped Access](#min-rbac) below.

## About Namespace-scoped RBAC {#min-rbac}

Rather that use the default cluster-scoped RBAC, you can configure your application so that access granted to the app manager is limited to the namespace where it is installed. Replicated recommends that you enable this namespace-scoped access unless your application requires access to resources across multiple namespaces in the cluster. For information about how to enable namespace-scoped RBAC for your application, see [Enable Namespace-scoped RBAC](#enable) below.

Namespace-scoped RBAC is also supported for applications that use Kubernetes Operators or multiple namespaces. During application installation, if there are `additionalNamespaces` specified in the Application manifest, then Roles and RoleBindings are created to grant the app manager access to resources in all specified namespaces.

By default, for namespace-scoped installations, the following Role and RoleBinding resources are created that grant the app manager permissions to all resources in the target namespace:

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

### Enable Namespace-scoped RBAC {#enable}

To enable namespace-scoped RBAC permissions for the app manager, specify one of the following options in the Application custom resource manifest file:

* `supportMinimalRBACPrivileges`: Set to `true` to make namespace-scoped RBAC optional for existing cluster installations. When `supportMinimalRBACPrivileges` is `true`, cluster-scoped RBAC is used by default and users must pass the `--use-minimal-rbac` flag with the `kots install` command to use namespace-scoped RBAC. 

* `requireMinimalRBACPrivileges`: Set to `true` to require that all installations to existing clusters use namespace-scoped access. When `requireMinimalRBACPrivileges` is `true`, all installations use namespace-scoped RBAC automatically and users do not pass the `--use-minimal-rbac` flag.  

For more information about these options, see [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireMinimalRBACPrivileges) and [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportMinimalRBACPrivileges) in _Application_.

Additional limitations and requirements apply for namespace-scoped installations. For more information, see [Limitations](#limitations) and [Installation and Upgrade Requirements](#installation-and-upgrade-requirements) below.

### Limitations

The following limitations apply when using the `requireMinimalRBACPrivileges` or `supportMinimalRBACPrivileges` options to require or support namespace-scoped RBAC for the app manager:

* **Existing clusters only**: The `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` options apply only to installations in existing clusters.

* **Preflight checks**: When namespace-scoped access is enabled, preflight checks cannot read resources outside the namespace where the app manager is installed. The preflight checks continue to function, but return less data. For more information, see [Define Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating#define-preflight-checks).

* **Velero namespace access**: Namespace-scoped RBAC does not grant access to the namespace where Velero is installed in the cluster. Velero is a requirement for configuring backup and restore with snapshots. 

   To set up snapshots when the app manager has namespace-scoped access, users can run the `kubectl kots velero ensure-permissions` command. This command creates additional Roles and RoleBindings to allow the necessary cross-namespace access. For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation.

   For more information about snapshots, see [About Backup and Restore](/enterprise/snapshots-understanding).

* **Air Gap Installations**: For air gap installations, the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags are supported only in automated, or _headless_, installations. In headless installations, the user passes all the required information to install both the app manager and the application with the `kots install` command. In non-headless installations, the user provides information to install the application through the admin console UI after the app manager is installed.

   In non-headless installations in air gap environments, the app manager does not have access to the application's `.airgap` package during installation. This means that the app manager does not have the information required to determine whether namespace-scoped access is needed, so it defaults to the more permissive, default cluster-scoped RBAC policy.

   For more information about how to do headless installations in air gap environments, see [Installing in an Air Gap Environment](/enterprise/installing-existing-cluster-automation#installing-in-an-air-gap-environment) in _Using Automation to Install in an Existing Cluster_.

* **Changing RBAC permissions for installed instances**: The RBAC permissions for the app manager are set during its initial installation. The app manager runs using the assumed identity and cannot change its own authorization. When you update your application to add or remove the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags in the Application custom resource, the RBAC permissions for the app manager are affected only for new installations. Existing app manager installations continue to run with their current RBAC permissions.

   To expand the scope of RBAC for the app manager from namespace-scoped to cluster-scoped, Replicated recommends that you include a preflight check to ensure the permission is available in the cluster. 

### Installation and Upgrade Requirements

This section describes the required RBAC permissions for users installing or upgrading the app manager with namespace-scoped access.

#### Install or Upgrade with Wildcard Permissions

By default, in installations where the app manager has namespace-scoped access, the app manager attempts to acquire wildcard (`* * *`) permissions to all resources in the target namespace. If the user that runs the installation or upgrade command does not have `* * *` permissions in the namespace, then an error message displays. For example:

```bash
$  kubectl kots install appslug
  • Current user has insufficient privileges to install Admin Console.
For more information, please visit https://kots.io/vendor/packaging/rbac
To bypass this check, use the --skip-rbac-check flag
Error: insufficient privileges
```

#### Install or Upgrade with App Manager-specific Permissions

To install or upgrade without `* * *` permissions in the target namespace, 

Additionally, to prevent error messages during installation or upgrade, users must include both the `--ensure-rbac=false` and `--skip-rbac-check` flags with the `kots install` command. The `--skip-rbac-check` flag prevents the app manager from checking for `* * *` permissions in the target namespace. The `--ensure-rbac=false` flag prevents the app manager from attempting to create a Role with `* * *` permissions in the namespace. For more information about these flags, see [install](/reference/kots-cli/kots-cli-install).