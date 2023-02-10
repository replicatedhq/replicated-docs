# Configuring App Manager RBAC

This topic describes role-based access control (RBAC) for the Replicated app manager in existing cluster installations, including information about how to change the default cluster-scoped RBAC permissions granted to the app manager.

## About Cluster-scoped RBAC

When a user installs your application in an existing cluster, Kubernetes RBAC resources are created to allow the app manager to install and manage the application.

By default, the following ClusterRole and ClusterRoleBinding resources are created that grant the app manager access to all resources across all namespaces in the cluster:

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

Alternatively, if your application does not require access to resources across all namespaces in the cluster, then you can enable namespace-scoped RBAC for the app manager. For information, see [About Namespace-scoped RBAC](#min-rbac) below.

## About Namespace-scoped RBAC {#min-rbac}

Rather that use the default cluster-scoped RBAC, you can configure your application so that the RBAC permissions granted to the app manager are limited to a target namespace or namespaces.

Namespace-scoped RBAC is supported for applications that use Kubernetes Operators or multiple namespaces. During application installation, if there are `additionalNamespaces` specified in the Application custom resource manifest file, then Roles and RoleBindings are created to grant the app manager access to resources in all specified namespaces.

By default, for namespace-scoped installations, the following Role and RoleBinding resources are created that grant the app manager permissions to all resources in a target namespace:

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

For information about how to enable namespace-scoped RBAC for your application, see [Enable Namespace-scoped RBAC](#enable) below.

### Enable Namespace-scoped RBAC {#enable}

To enable namespace-scoped RBAC permissions for the app manager, specify one of the following options in the Application custom resource manifest file:

* `supportMinimalRBACPrivileges`: Set to `true` to make namespace-scoped RBAC optional for existing cluster installations. When `supportMinimalRBACPrivileges` is `true`, cluster-scoped RBAC is used by default and users must pass the `--use-minimal-rbac` flag with the installation or upgrade command to use namespace-scoped RBAC. 

* `requireMinimalRBACPrivileges`: Set to `true` to require that all installations to existing clusters use namespace-scoped access. When `requireMinimalRBACPrivileges` is `true`, all installations use namespace-scoped RBAC automatically and users do not pass the `--use-minimal-rbac` flag.  

For more information about these options, see [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireMinimalRBACPrivileges) and [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportMinimalRBACPrivileges) in _Application_.

For information about limitations that apply to using namespace-scoped access, see [Limitations](#limitations) below.

### Limitations

The following limitations apply when using the `requireMinimalRBACPrivileges` or `supportMinimalRBACPrivileges` options to enable namespace-scoped RBAC for the app manager:

* **Existing clusters only**: The `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` options apply only to installations in existing clusters.

* **Preflight checks**: When namespace-scoped access is enabled, preflight checks cannot read resources outside the namespace where the app manager is installed. The preflight checks continue to function, but return less data. For more information, see [Define Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating#define-preflight-checks).

* **Velero namespace access**: Namespace-scoped RBAC does not grant access to the namespace where Velero is installed in the cluster. Velero is a requirement for configuring backup and restore with snapshots. 

   To set up snapshots when the app manager has namespace-scoped access, users can run the `kubectl kots velero ensure-permissions` command. This command creates additional Roles and RoleBindings to allow the necessary cross-namespace access. For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation.

   For more information about snapshots, see [About Backup and Restore](/enterprise/snapshots-understanding).

* **Air Gap Installations**: For air gap installations, the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags are supported only in automated, or _headless_, installations. In headless installations, the user passes all the required information to install both the app manager and the application with the `kots install` command. In non-headless installations, the user provides information to install the application through the admin console UI after the app manager is installed.

   In non-headless installations in air gap environments, the app manager does not have access to the application's `.airgap` package during installation. This means that the app manager does not have the information required to determine whether namespace-scoped access is needed, so it defaults to the more permissive, default cluster-scoped RBAC policy.

   For more information about how to do headless installations in air gap environments, see [Installing in an Air Gap Environment](/enterprise/installing-existing-cluster-automation#installing-in-an-air-gap-environment) in _Using Automation to Install in an Existing Cluster_.

* **Changing RBAC permissions for installed instances**: The RBAC permissions for the app manager are set during its initial installation. The app manager runs using the assumed identity and cannot change its own authorization. When you update your application to add or remove the `requireMinimalRBACPrivileges` and `supportMinimalRBACPrivileges` flags in the Application custom resource, the RBAC permissions for the app manager are affected only for new installations. Existing app manager installations continue to run with their current RBAC permissions.

   To expand the scope of RBAC for the app manager from namespace-scoped to cluster-scoped in new installations, Replicated recommends that you include a preflight check to ensure the permission is available in the cluster. 