# Customizing RBAC for the SDK

This topic describes role-based access control (RBAC) for the Replicated SDK, including the default RBAC, minimum RBAC requirements, and how to install the SDK with custom RBAC.

## Default RBAC

The SDK creates default Role, RoleBinding, and ServiceAccount objects during installation. The default Role allows the SDK to get, list, and watch all resources in the namespace and to update the `replicated-sdk` Secret and ConfigMap:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    {{- include "replicated-sdk.labels" . | nindent 4 }}
  name: replicated-sdk-role
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
  - replicated-sdk
```

## Minimum RBAC Requirements

The SDK requires the following minimum RBAC permissions:
* Get and update a Secret and a ConfigMap named `replicated-sdk`.
* The SDK requires the following minimum RBAC permissions for status informers:
  * If you defined custom status informers, then the SDK must have permissions to get, list, and watch all the resources listed in the `replicated-sdk.statusInformers` array in your Helm chart `values.yaml` file.
  * If you did _not_ define custom status informers, then the SDK must have permissions to get, list, and watch the following resources:
    * Deployments
    * Daemonsets
    * Ingresses
    * PersistentVolumeClaims
    * Statefulsets
    * Services   
  * For any Ingress resources used as status informers, the SDK requires `get` permissions for the Service resources listed in the `backend.Service.Name` field of the Ingress resource.
  * For any Daemonset and Statefulset resources used as status informers, the SDK requires `list` permissions for pods in the namespace.
  * For any Service resources used as status informers, the SDK requires `get` permissions for Endpoint resources with the same name as the service.  

  The Replicated vendor portal uses status informers to provide application status data. For more information, see [Helm Installations](/vendor/insights-app-status#helm-installations) in _Enabling and Understanding Application Status_.
## Install the SDK with Custom RBAC

To use the SDK with custom RBAC permissions, provide the name for a custom ServiceAccount object during installation. When a service account is provided, the SDK uses the RBAC permissions granted to the service account and does not create the default Role, RoleBinding, or ServiceAccount objects.

To install the SDK with custom RBAC:

1. Create custom Role, RoleBinding, and ServiceAccount objects. The Role must meet the minimum requirements described in [Minimum RBAC Requirements](#minimum-rbac-requirements) above.
1. During installation, provide the name of the service account that you created by including `--set replicated-sdk.serviceAccountName=CUSTOM_SERVICEACCOUNT_NAME`.

  **Example**:

  ```
  helm install wordpress oci://registry.replicated.com/my-app/beta/wordpress --set replicated-sdk.serviceAccountName=mycustomserviceaccount
  ```

 For more information about installing with Helm, see [Installing with Helm](/vendor/install-with-helm).  