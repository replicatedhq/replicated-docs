# Customizing RBAC for the SDK

This topic describes role-based access control (RBAC) for the Replicated SDK, including the default RBAC, minimum RBAC requirements, and how to install the SDK with custom RBAC.

## Default RBAC

The SDK creates a default Role, RoleBinding, and ServiceAccount during installation. The default Role allows the SDK to get, list, and watch all resources in the Helm release and to update the `replicated` Secret and ConfigMap:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    {{- include "replicated.labels" . | nindent 4 }}
  name: replicated-role
rules:
- apiGroups:
  - '*'
  resources:
  - '*'
  verbs:
  - 'get'
  - 'list'
  - 'watch'
- apiGroups:
  - ''
  resources:
  - 'configmaps'
  - 'secrets'
  verbs:
  - 'update'
  resourceNames:
  - replicated
```

## Minimum RBAC Requirements

The SDK requires the following minimum RBAC permissions:
* Get, list, and watch any resources included in the application Helm release that are used as status informers. The Replicated vendor portal uses status informers to provide application status data. For more information, see [Helm Installations](/vendor/insights-app-status#helm-installations) in _Enabling and Understanding Application Status_.

  The minimum RBAC requirements for resources are different depending on if the Helm chart includes custom status informers:
  * If you defined custom status informers, then the SDK must have permissions to get, list, and watch all the resources listed in the `replicated.statusInformers` array in your Helm chart `values.yaml` file.
  * If you did _not_ define custom status informers, then the SDK must have permissions to get, list, and watch all resources in the application Helm release.   
* Get and update a Secret and a ConfigMap named `replicated`.

## Install the SDK with Custom RBAC

To use the SDK with custom RBAC permissions, provide the name for a custom ServiceAccount object during installation. When a ServiceAccount is provided, the SDK does not create the default Role, RoleBinding, or ServiceAccount.

To install the SDK with custom RBAC:

1. Create custom Role, RoleBinding, and ServiceAccount objects. The Role must meet the minimum RBAC requirements described in [Minimum RBAC Requirements](#minimum-rbac-requirements) above.
1. During installation, provide the name of the custom ServiceAccount object that you created by including `--set serviceAccountName=CUSTOM_SERVICEACCOUNT_NAME`.

   **Example**:

   ```
   helm install wordpress oci://registry.replicated.com/my-app/beta/wordpress --set serviceAccountName=mycustomserviceaccount
   ```

 For more information about installing with Helm, see [Installing an Application with Helm (Beta)](/vendor/install-with-helm).  