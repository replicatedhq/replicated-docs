# Customize the Replicated SDK

This topic describes various ways to customize the Replicated SDK, including customizing RBAC, setting environment variables, adding tolerations, and more. For a complete list of supported configuration options for the SDK, see the [`values.yaml`](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml) file for the SDK Helm chart in GitHub.

For information about how to use a custom domain for the Replicated SDK image, see [Use a Custom Domain for the Replicated SDK Image](custom-domains-using#sdk) in _Using Custom Domains_.

## Customize RBAC for the SDK

This section describes role-based access control (RBAC) for the Replicated SDK, including the default RBAC, minimum RBAC requirements, and how to install the SDK with custom RBAC.

It also describes how to enable the `replicated.minimalRBAC` field to use a less-permissive default RBAC role for the Replicated SDK version 1.7.0 and later. 

### Default RBAC

This section describes the default RBAC role that is created for the Replicated SDK when the `replicated.minimalRBAC` field is false.

The SDK creates default Role, RoleBinding, and ServiceAccount objects during installation. The default Role allows the SDK to get, list, and watch all resources in the namespace, to create Secrets, and to update the `replicated`, `replicated-instance-report`, `replicated-custom-app-metrics-report`, and `replicated-meta-data` Secrets:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
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
  - 'create'
- apiGroups:
  - ''
  resources:
  - 'secrets'
  verbs:
  - 'update'
  resourceNames:
  - replicated
  - replicated-instance-report
  - replicated-custom-app-metrics-report
  - replicated-meta-data
```

### Minimal RBAC

This section describes the default RBAC role that is created for the Replicated SDK when the `replicated.minimalRBAC` field is true in version 1.7.0 and later.

The permissions included in the default `minimalRBAC` Role vary depending on if you defined custom _status informers_ for your application. See one of the following sections for more information:
* [Default `minimalRBAC` Role Without Custom Status Informers](#default-no-status-informers)
* [Default `minimalRBAC` Role With Custom Status Informers](#default-status-informers)

<details>
  <summary>What are status informers?</summary>
  
  The Replicated Vendor Portal uses status informers to provide application status data. For more information about status informers, see [Helm Installations](/vendor/insights-app-status#helm-installations) in _Enabling and Understanding Application Status_.
</details>

#### Default `minimalRBAC` Role Without Custom Status Informers {#default-no-status-informers}

If you did _not_ define custom status informers for your application, then the default `minimalRBAC` Role includes permissions for the SDK to `get`, `list`, and `watch` the following resources in the namespace:
* Secrets 
* Deployments 
* StatefulSets 
* DaemonSets 
* Services 
* Ingresses 
* PVCs 
* Pods 
* ReplicaSets 
* Endpoints

These permissions allow the SDK to discover the Helm chart secret for your application, parse it to determine what resources to monitor, and then monitor those resources.

To enable `minimalRBAC`, set the value in your Helm chart as shown below:

```yaml
# Helm chart values.yaml

replicated:
  minimalRBAC: true
```

The following shows the default RBAC role for the SDK when `minimalRBAC` is enabled and no customer status informers are defined:

```yaml
# Generated RBAC role with no statusInformers

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: replicated-role
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - create
- apiGroups:
  - ""
  resourceNames:
  - replicated
  - replicated-instance-report
  - replicated-custom-app-metrics-report
  - replicated-meta-data
  resources:
  - secrets
  verbs:
  - update
- apiGroups:
  - apps
  resourceNames:
  - replicated
  resources:
  - deployments
  verbs:
  - get
- apiGroups:
  - apps
  resources:
  - replicasets
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - ""
  resourceNames:
  - replicated
  resources:
  - secrets
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
  - list
- apiGroups:
  - apps
  resources:
  - deployments
  - replicasets
  - statefulsets
  - daemonsets
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - services
  - endpoints
  - persistentvolumeclaims
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - list
```

#### Default `minimalRBAC` Role With Custom Status Informers {#default-status-informers}

If you defined custom status informers for your application, then the default `minimalRBAC` role is _not_ created with the ability to access all secrets, and other resources are specified by name when possible.

For example, the following custom `statusInformer` configuration defines specific Deployment and Service resources as status informers for the application:

```yaml
# Helm chart values.yaml

replicated:
  minimalRBAC: true
  statusInformers:
  - deployment/replicated
  - deployment/myapp
  - service/replicated
  - service/myapp
```

Given the custom `statusInformer` configuration above, the following `minimalRBAC` role is created:

```yaml
# Generated RBAC role with deployment/replicated, deployment/myapp, service/replicated and service/myapp statusinformers

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: replicated-role
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - create
- apiGroups:
  - ""
  resourceNames:
  - replicated
  - replicated-instance-report
  - replicated-custom-app-metrics-report
  - replicated-meta-data
  resources:
  - secrets
  verbs:
  - update
- apiGroups:
  - apps
  resourceNames:
  - replicated
  resources:
  - deployments
  verbs:
  - get
- apiGroups:
  - apps
  resources:
  - replicasets
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - ""
  resourceNames:
  - replicated
  resources:
  - secrets
  verbs:
  - get
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - list
  - watch
- apiGroups:
  - apps
  resourceNames:
  - replicated
  - myapp
  resources:
  - deployments
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - services
  - endpoints
  verbs:
  - list
  - watch
- apiGroups:
  - ""
  resourceNames:
  - replicated
  - myapp
  resources:
  - services
  - endpoints
  verbs:
  - get
```

### Install the SDK with Custom RBAC

This section describes how to install the SDK with custom RBAC permissions, include the minimum RBAC requirements for custom roles. To install with custom RBAC, you can use a custom ServiceAccount or a custom ClusterRole. See the sections below for more information.

#### Minimum RBAC Requirements

This section describes the minimum RBAC permissions required by the Replicated SDK. Any custom RBAC role that you create must include these permissions at minimum.

The SDK requires the following minimum RBAC permissions to start:
* Create Secrets.
* Get and update Secrets named `replicated`, `replicated-instance-report`, `replicated-meta-data`, and `replicated-custom-app-metrics-report`.
* Get the `replicated` deployment.
* Get the `replicaset` and `pods` corresponding to the `replicated` deployment.

The SDK requires the following minimum RBAC permissions for status informers:
* If you defined custom status informers, then the SDK must have permissions to `list` and `watch` all the types of resources listed in the `replicated.statusInformers` array in your Helm chart `values.yaml` file, as well as the ability to `get` the named resource.

  For example, if you have a single status informer `deployment/myapp`, then the SDK requires permissions to `list` and `watch` all deployments as well as `get` the `myapp` deployment.
* If you did _not_ define custom status informers, then the SDK must:
  * Have permissions to `get`, and `list` all secrets within the namespace in order to discover the Helm Chart secret for your app.
  * Have permissions to `get`, `list`, and `watch` the following resources:
    * Deployments
    * DaemonSets
    * Ingresses
    * PersistentVolumeClaims
    * StatefulSets
    * Services
* For any Ingress resources used as status informers, the SDK requires `get` permissions for the Service resources listed in the `backend.Service.Name` field of the Ingress resource.
* For any DaemonSet and StatefulSet resources used as status informers, the SDK requires `list` permissions for pods in the namespace.
* For any Service resources used as status informers, the SDK requires `get` permissions for Endpoint resources with the same name as the service.

#### Use a Custom ServiceAccount

To use the SDK with custom RBAC permissions, provide the name for a custom ServiceAccount object during installation. When a service account is provided, the SDK uses the RBAC permissions granted to the service account and does not create the default Role, RoleBinding, or ServiceAccount objects.

To install the SDK with custom RBAC:

1. Create custom Role, RoleBinding, and ServiceAccount objects. The Role must meet the minimum requirements described in [Minimum RBAC Requirements](#minimum-rbac-requirements) above.
1. During installation, provide the name of the service account that you created by including `--set replicated.serviceAccountName=CUSTOM_SERVICEACCOUNT_NAME`.

   **Example**:

   ```
   helm install wordpress oci://registry.replicated.com/my-app/beta/wordpress --set replicated.serviceAccountName=mycustomserviceaccount
   ```

   For more information about installing with Helm, see [Install with Helm](/vendor/install-with-helm).  

#### Use a Custom ClusterRole

To use the SDK with an existing ClusterRole, provide the name for a custom ClusterRole object during installation. When a cluster role is provided, the SDK uses the RBAC permissions granted to the cluster role and does not create the default RoleBinding. Instead, the SDK creates a ClusterRoleBinding as well as a ServiceAccount object.

To install the SDK with a custom ClusterRole:

1. Create a custom ClusterRole object. The ClusterRole must meet at least the minimum requirements described in [Minimum RBAC Requirements](#minimum-rbac-requirements) above. However, it can also provide additional permissions that can be used by the SDK, such as listing cluster Nodes.
1. During installation, provide the name of the cluster role that you created by including `--set replicated.clusterRole=CUSTOM_CLUSTERROLE_NAME`.

   **Example**:

   ```
   helm install wordpress oci://registry.replicated.com/my-app/beta/wordpress --set replicated.clusterRole=mycustomclusterrole
   ```

   For more information about installing with Helm, see [Install with Helm](/vendor/install-with-helm).

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

:::note
If the `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` variables are configured with the [kots install](/reference/kots-cli-install) command, these variables will also be set automatically in the Replicated SDK.
:::

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

## Custom Certificate Authority

When installing the Replicated SDK behind a proxy server that terminates TLS and injects a custom certificate, you must provide the CA to the SDK. This can be done by storing the CA in a ConfigMap or a Secret prior to installation and providing appropriate values during installation.

### Using a ConfigMap

To use a CA stored in a ConfigMap:

1. Create a ConfigMap and the CA as the data value. Note that name of the ConfigMap and data key can be anything.
   ```bash
   kubectl -n <NAMESPACE> create configmap private-ca --from-file=ca.crt=./ca.crt
   ```
1. Add the name of the config map to the values file:
   ```yaml
   replicated:
     privateCAConfigmap: private-ca
   ```

:::note
If the `--private-ca-configmap` flag is used with the [kots install](/reference/kots-cli-install) command, this value will be populated in the Replicated SDK automatically.
:::

### Using a Secret

To use a CA stored in a Secret:

1. Create a Secret and the CA as a data value. Note that the name of the Secret and the key can be anything.
   ```bash
   kubectl -n <NAMESPACE> create secret generic private-ca --from-file=ca.crt=./ca.crt
   ```
1. Add the name of the secret and the key to the values file:
   ```yaml
   replicated:
     privateCASecret:
       name: private-ca
       key: ca.crt
   ```

## Add Tolerations

The Replicated SDK provides a `replicated.tolerations` value that allows users to add custom tolerations to the deployment. For more information about tolerations, see [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) in the Kubernetes documentation.

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

## Add Affinity

The Replicated SDK provides a `replicated.affinity` value that allows users to add custom affinity to the deployment. For more information about affinity, see [Affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) in the Kubernetes documentation.

To add affinity to the Replicated SDK deployment, include the `replicated.affinity` map in your Helm chart `values.yaml` file. The `replicated.affinity` map accepts a standard Kubernets affinity object in the following format:

```yaml
# Helm chart values.yaml

replicated:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: production/node-pool
            operator: In
            values:
            - private-node-pool
```
## Add Custom Labels

With the Replicated SDK version 1.1.0 and later, you can pass custom labels to the Replicated SDK Helm Chart by setting the `replicated.commonLabels` and `replicated.podLabels` Helm values in your Helm chart.

### Requirement

The `replicated.commonLabels` and `replicated.podLabels` values are available with the Replicated SDK version 1.1.0 and later.

### commonLabels

The `replicated.commonLabels` value allows you to add one or more labels to all resources created by the SDK chart.

For example:

```yaml
# Helm chart values.yaml

replicated:
  commonLabels:
    environment: production
    team: platform
```

### podLabels

The `replicated.podLabels` value allows you to add pod-specific labels to the pod template.

For example:

```yaml
# Helm chart values.yaml

replicated:
  podLabels:
    monitoring: enabled
    custom.company.io/pod-label: value
```

## Enable SSL

With the Replicated SDK version 1.6.0 and later, you can serve traffic from the Replicated SDK pod by setting the `replicated.tlsCertSecretName` Helm value in your Helm chart.

To configure the Replicated SDK pod to serve traffic over SSL:

1. Ensure a secret exists in the namespace with keys `tls.crt` and `tls.key` containing the TLS certificate and key.
This is the format produced by `kubectl create secret tls <secret_name> --cert=<cert_file> --key=<key_file>`.

1. Set `tlsCertSecretName` to the name of the secret, as shown below:

    ```yaml
    # Helm chart values.yaml
    
    replicated:
      tlsCertSecretName: YOUR_TLS_SECRET
    ```
    Where `YOUR_TLS_SECRET` is the secret in the namespace containing the TLS certificate and key. 