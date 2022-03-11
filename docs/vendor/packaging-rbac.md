# Configuring Role-Based Access Control

When an application is installed, [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) resources are created to allow the Replicated admin console to manage the application.

By default, the admin console will create a ClusterRole and ClusterRoleBinding with permissions to all namespaces.
This behavior can be controlled by editing the Application custom resource manifest file. For more information about the Application manifest, see [Application](../reference/custom-resource-application) in the _Custom Resources_ section.

As listed above, an application may require cluster scoped access across all namespaces on all/wildcard k8 objects or to have access limited to its given namespace.
In either case, the user who installs an application with the kots CLI must have the wildcard privileges in the cluster.
If the user has insufficient privileges the following error will be shown when attempting install or upgrade.

```bash
$  kubectl kots install appslug
  • Current user has insufficient privileges to install Admin Console.
For more information, please visit https://kots.io/vendor/packaging/rbac
To bypass this check, use the --skip-rbac-check flag
Error: insufficient privileges
```

For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

## Cluster-scoped access

For compatibility with earlier versions of the Replicated app manager, the default behavior of an application is to create a ClusterRole and ClusterRoleBinding with permissions to all namespaces.

Applications that need access to cluster-wide resources should continue to use cluster-scoped access installers.

#### Reference objects

The following ClusterRole and ClusterRoleBinding are created for cluster-scoped applications:

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

The following Role and RoleBinding are created for namespace-scoped applications.

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

## Namespace-scoped access

An application developer can limit the RBAC grants for the admin console to be limited to a single namespace by specifying the `requireMinimalRBACPrivileges` flag in the Application manifest file. When this is set, the app manager will create a Role and RoleBinding, granting the admin console access to select resources in the namespace, but not outside of the cluster.

Without access to cluster-scoped resources, some preflight checks and support bundle collectors will not be able to read the resources.
These tools will continue to function, but will return less data.
In this situation, the admin console will present an option for the user to either proceed with limited data or a command to execute the preflight checks or support bundle remotely, using the user's RBAC authorizations.

Additionally, the namespace-scoped permission does not grant access to Velero's namespace if installed - Velero is a prerequisite for [admin console snapshots](../enterprise/snapshots-understanding).

The `kubectl kots velero ensure-permissions` command can be used to create additional Roles and RoleBindings to allow the necessary cross-namespace access. For more information, see [`velero ensure-permissions`](../reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation.

Please note that air gap installations honor the `requireMinimalRBACPrivileges` flag in [headless mode only](../enterprise/installing-existing-cluster-automation#airgap-install).
Without access to the internet or the app's `.airgap` package as provided in a headless install, the app manager does not have the information required to determine whether minimal RBAC is appropriate and so defaults to the more permissive RBAC policy.

### Operators and multiple namespaces

It is possible to use namespace-scoped access for Operators and multi-namespace applications.
During the installation, if there are `additionalNamespaces` specified in the Application manifest, Roles and RoleBindings will be created to give the admin console access to all namespaces specified.

To enable namespace-scoped access for an application:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: https://support.io/img/logo.png
  requireMinimalRBACPrivileges: true
```

#### Reference Objects

The following Role is created for namespace-scoped applications:

```yaml
apiVersion: "rbac.authorization.k8s.io/v1"
kind: "Role"
metadata:
  name: "kotsadm-role"
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verb: "*"
```

(Note that the kotsadm-operator component receives an authorization for all verb, all resources and all apiGroups in the namespace).

## Converting

The RBAC permissions are set during the initial installation.
The admin console is running using the assumed identity and cannot change its own authorization.
Changing the RBAC scope from cluster to namespace or from namespace to cluster will only affect new installations of the application; existing installations will continue to run with their current authorization.
For applications that need to elevate their permission from namespace to cluster, we recommend including a preflight check to ensure the permission is available.
