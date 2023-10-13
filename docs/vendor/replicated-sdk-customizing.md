# Customizing the Replicated SDK

This topic describes various ways to customize the Replicated SDK, including customizing RBAC, setting environment variables, and adding tolerations.

## Customize RBAC for the SDK

This section describes role-based access control (RBAC) for the Replicated SDK, including the default RBAC, minimum RBAC requirements, and how to install the SDK with custom RBAC.

### Default RBAC

The SDK creates default Role, RoleBinding, and ServiceAccount objects during installation. The default Role allows the SDK to get, list, and watch all resources in the namespace and to update the `replicated` Secret and ConfigMap:

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
  - 'secrets'
  verbs:
  - 'update'
  resourceNames:
  - replicated
```

### Minimum RBAC Requirements

The SDK requires the following minimum RBAC permissions:
* Get and update a Secret named `replicated`.
* The SDK requires the following minimum RBAC permissions for status informers:
  * If you defined custom status informers, then the SDK must have permissions to get, list, and watch all the resources listed in the `replicated.statusInformers` array in your Helm chart `values.yaml` file.
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
### Install the SDK with Custom RBAC

To use the SDK with custom RBAC permissions, provide the name for a custom ServiceAccount object during installation. When a service account is provided, the SDK uses the RBAC permissions granted to the service account and does not create the default Role, RoleBinding, or ServiceAccount objects.

To install the SDK with custom RBAC:

1. Create custom Role, RoleBinding, and ServiceAccount objects. The Role must meet the minimum requirements described in [Minimum RBAC Requirements](#minimum-rbac-requirements) above.
1. During installation, provide the name of the service account that you created by including `--set replicated.serviceAccountName=CUSTOM_SERVICEACCOUNT_NAME`.

  **Example**:

  ```
  helm install wordpress oci://registry.replicated.com/my-app/beta/wordpress --set replicated.serviceAccountName=mycustomserviceaccount
  ```

 For more information about installing with Helm, see [Installing with Helm](/vendor/install-with-helm).  

## Set Environment Variables {#env-var}

The Replicated SDK provides a `replicated.extraEnv` value that allows users to set additional environment variables for the deployment that are not exposed as Helm values.

This ensures that users can set the environment variables that they require without the SDK Helm chart needing to be modified to expose the values. For example, if the SDK is running behind an HTTP proxy server, then the user could set `HTTP_PROXY` or `HTTPS_PROXY` environment variables to provide the hostname or IP address of their proxy server.

To add environment variables to the Replicated SDK deployment, include the `replicated.extraEnv` array in your Helm chart `values.yaml` file. The `replicated.extraEnv` array accepts a list of environment variables in the following format:

```yaml
# Helm chart values.yaml

replicated:
  extraEnv:
  - name: ENV_VAR_NAME
    value: ENV_VAR_VALUE
```

**Example**:

```yaml
# Helm chart values.yaml

replicated:
  extraEnv:
  - name: MY_ENV_VAR
    value: my-value
  - name: MY_ENV_VAR_2
    value: my-value-2  
```

## Add Tolerations

The Replicated SDK provides a `replicated.tolerations` value that allows users to add custom tolerations to the deployment. For more information about tolerations, see [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

To add tolerations to the Replicated SDK deployment, include the `replicated.tolerations` array in your Helm chart `values.yaml` file. The `replicated.tolerations` array accepts a list of tolerations in the following format:

```yaml
# Helm chart values.yaml

replicated:
  tolerations:
  - key: "key"
    operator: "Equal"
    value: "value"
    effect: "NoSchedule"
```
