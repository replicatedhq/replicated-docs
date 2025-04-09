# Configure KOTS RBAC

This topic describes role-based access control (RBAC) for Replicated KOTS in existing cluster installations. It includes information about how to change the default cluster-scoped RBAC permissions granted to KOTS.

## Cluster-scoped RBAC

When a user installs your application with KOTS in an existing cluster, Kubernetes RBAC resources are created to allow KOTS to install and manage the application.

By default, the following ClusterRole and ClusterRoleBinding resources are created that grant KOTS access to all resources across all namespaces in the cluster:

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
metadata:
  name: kotsadm-rolebinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kotsadm-role
subjects:
- kind: ServiceAccount
  name: kotsadm
  namespace: appnamespace
```

Alternatively, if your application does not require access to resources across all namespaces in the cluster, then you can enable namespace-scoped RBAC for KOTS. For information, see [About Namespace-scoped RBAC](#min-rbac) below.

## Namespace-scoped RBAC {#min-rbac}

Rather than use the default cluster-scoped RBAC, you can configure your application so that the RBAC permissions granted to KOTS are limited to a target namespace or namespaces. By default, for namespace-scoped installations, the following Role and RoleBinding resources are created that grant KOTS permissions to all resources in a target namespace:

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
metadata:
  name: kotsadm-rolebinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kotsadm-role
subjects:
- kind: ServiceAccount
  name: kotsadm
  namespace: appnamespace
```

Namespace-scoped RBAC is supported for applications that use Kubernetes Operators or multiple namespaces. During application installation, if there are `additionalNamespaces` specified in the Application custom resource manifest file, then Roles and RoleBindings are created to grant KOTS access to resources in all specified namespaces.

### Enable Namespace-scoped RBAC {#enable}

To enable namespace-scoped RBAC permissions for KOTS, specify one of the following options in the Application custom resource manifest file:

* `supportMinimalRBACPrivileges`: Set to `true` to make namespace-scoped RBAC optional for existing cluster installations. When `supportMinimalRBACPrivileges` is `true`, cluster-scoped RBAC is used by default and users must pass the `--use-minimal-rbac` flag with the installation or upgrade command to use namespace-scoped RBAC. 

* `requireMinimalRBACPrivileges`: Set to `true` to require that all installations to existing clusters use namespace-scoped access. When `requireMinimalRBACPrivileges` is `true`, all installations use namespace-scoped RBAC automatically and users do not pass the `--use-minimal-rbac` flag.  

For more information about these options, see [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireminimalrbacprivileges) and [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportminimalrbacprivileges) in _Application_.

### About Installing with Minimal RBAC

In some cases, it is not possible to grant the user `* * *` permissions in the target namespace. For example, an organization might have security policies that prevent this level of permissions.

If the user installing or upgrading KOTS cannot be granted `* * *` permissions in the namespace, then they can instead request the following:
* The minimum RBAC permissions required by KOTS
* RBAC permissions for any CustomResourceDefinitions (CRDs) that your application includes

Installing with the minimum KOTS RBAC permissions also requires that the user manually creates a ServiceAccount, Role, and RoleBinding for KOTS, rather than allowing KOTS to automatically create a Role with `* * *` permissions.

For more information about how users can install KOTS with minimal RBAC when namespace-scoped RBAC is enabled, see [Namespace-scoped RBAC Requirements](/enterprise/installing-general-requirements#namespace-scoped) in _Installation Requirements_.

### Limitations

The following limitations apply when using the `requireMinimalRBACPrivileges` or `supportMinimalRBACPrivileges` options to enable namespace-scoped RBAC for KOTS:

* **Existing clusters only**: The `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` options apply only to installations in existing clusters.

* **Preflight checks**: When namespace-scoped access is enabled, preflight checks cannot read resources outside the namespace where KOTS is installed. The preflight checks continue to function, but return less data. For more information, see [Define Preflight Checks](/vendor/preflight-defining).

* **Velero namespace access for KOTS snapshots**: Velero is required for enabling backup and restore with the KOTS snapshots feature. Namespace-scoped RBAC does not grant access to the namespace where Velero is installed in the cluster. 

   To set up snapshots when KOTS has namespace-scoped access, users can run the `kubectl kots velero ensure-permissions` command. This command creates additional Roles and RoleBindings to allow the necessary cross-namespace access. For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the KOTS CLI documentation.

   For more information about snapshots, see [About Backup and Restore with Snapshots](/vendor/snapshots-overview).

* **Air Gap Installations**: For air gap installations, the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags are supported only in automated, or _headless_, installations. In headless installations, the user passes all the required information to install both KOTS and the application with the `kots install` command. In non-headless installations, the user provides information to install the application through the Admin Console UI after KOTS is installed.

   In non-headless installations in air gap environments, KOTS does not have access to the application's `.airgap` package during installation. This means that KOTS does not have the information required to determine whether namespace-scoped access is needed, so it defaults to the more permissive, default cluster-scoped RBAC policy.

   For more information about how to do headless installations in air gap environments, see [Air Gap Installation](/enterprise/installing-existing-cluster-automation#air-gap) in _Install with the KOTS CLI_.

* **Changing RBAC permissions for installed instances**: The RBAC permissions for KOTS are set during its initial installation. KOTS runs using the assumed identity and cannot change its own authorization. When you update your application to add or remove the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags in the Application custom resource, the RBAC permissions for KOTS are affected only for new installations. Existing KOTS installations continue to run with their current RBAC permissions.

   To expand the scope of RBAC for KOTS from namespace-scoped to cluster-scoped in new installations, Replicated recommends that you include a preflight check to ensure the permission is available in the cluster. 
