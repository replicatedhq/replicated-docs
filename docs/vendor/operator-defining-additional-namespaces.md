# Defining Additional Namespaces

Operators often need to be able to manage resources in multiple namespaces in the cluster.
When deploying an application to an existing cluster, the Replicated app manager creates a Kubernetes Role and RoleBinding that are limited to only accessing the namespace that the application is being installed into.

In addition to RBAC policies, clusters running in air gap environments or clusters that are configured to use a local registry also need to ensure that image pull secrets exist in all namespaces that the operator will manage resource in.

## Creating additional namespaces

An application can identify additional namespaces to create during installation time.
You can define these additional namespaces in the Application custom resource by adding an `additionalNamespaces` attribute to the Application custom resource manifest file. For more information, see [Application](../reference/custom-resource-application) in the _Custom Resources_ section.

When these are defined, `kots install` will create the namespaces and ensure that the Replicated admin console has full access to manage resources in these namespaces.
This is accomplished by creating a Role and RoleBinding per namespace, and setting the Subject to the admin console service account.
If the current user account does not have access to create these additional namespaces, the installer will show an error and fail.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-operator
spec:
  additionalNamespaces:
    - namespace1
    - namespace2
```

In addition to creating these namespaces, the admin console will ensure that the application pull secret exists in them, and that this secret has access to pull the application images. This includes both images that are used and additional images defined in the Application custom resource manifest. For more information, see [Defining Additional Images](operator-defining-additional-images).

Pull secret name can be obtained using the [ImagePullSecretName](../reference/template-functions-config-context/#imagepullsecretname) template function.
An operator can reliably depend on this secret existing in all installs (online and air gapped), and can use this secret name in any created `podspec` to pull private images.

## Dynamic namespaces

Some applications need access to dynamically created namespaces or even all namespaces.
In this case, an application spec can list `"*"` as one of its `addtionalNamespaces` in the Application manifest file.
When the app manager encounters the wildcard, it will not create any namespaces, but it will ensure that the application image pull secret is copied to all namespaces.
The admin console will run an informer internally to watch namespaces in the cluster, and when a new namespace is created, the secret will automatically be copied to it.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-operator
spec:
  additionalNamespaces:
    - "*"
```

When the wildcard (`"*"`) is listed in `additionalNamespaces`, the app manager will use a ClusterRole and ClusterRoleBinding for the admin console.
This will ensure that the admin console will continue to have permissions to all newly created namespaces, even after the install has finished.
