# Referencing Images

The Replicated app manager is responsible for delivering and ensuring that all container images (automatically detected and additionalImages) are pushed to the customer's private, internal registry.
Additionally, the app manager creates Kustomize patches to rewrite image names and inject image pull secrets to all pods.

The app manager cannot modify pods that are created at runtime by the Operator.
To support this in all environments, the Operator code should use app manager functionality to determine the image name and image pull secrets for all pods when they are created.

There are several template functions available to assist with this.
This may require 2 new environment variables to be added to a manager to read these values.
The steps to ensure that an Operator is using the correct image names and has the correct image pull secrets in dynamically created pods are:

1. Add a new environment variables to the Manager Pod so that the Manager knows the location of the private registry, if one is set.
2. Add a new environment variable to the Manager Pod so that the Manager also knows the `imagePullSecret` that's needed to pull the local image.

### Adding a reference to the local registry

The manager of an Operator is often a `Statefulset`, but could be a `Deployment` or another kind.
Regardless of where the spec is defined, the location of the private images can be read using the Replicated template functions. For more information about using template functions, see [About Template Functions](/reference/template-functions-about).

#### Option 1: Define each image
If an Operator only requires one additional image, the easiest way to determine this location is to use the `LocalImageName` function.
This will always return the image name to use, whether the customer's environment is configured to use a local registry or not.

**Example:**

```yaml
env:
  - name: IMAGE_NAME_ONE
    value: 'repl{{ LocalImageName "elasticsearch:7.6.0" }}'
```

For online installations (no local registry), this will be written with no changes -- the variable will contain `elasticsearch:7.6.0`.
For installations that are air gapped or have a locally-configured registry, this will be rewritten as the locally referenceable image name. For example, `registry.somebigbank.com/my-app/elasticsearch:7.6.0`.

**Example:**

```yaml
env:
  - name: IMAGE_NAME_TWO
    value: 'repl{{ LocalImageName "quay.io/orgname/private-image:v1.2.3" }}'
```

In the above example, this is a private image, and will always be rewritten. For online installations, this will return `proxy.replicated.com/proxy/app-name/quay.io/orgname/private-image:v1.2.3` and for installations with a locally-configured registry it will return `registry.somebigbank.com/org/my-app-private-image:v.1.2.3`.

#### Option 2: Build image names manually

For applications that have multiple images or dynamically construct the image name at runtime, the Replicated template functions can also return the elements that make up the local registry endpoint and secrets, and let the application developer construct the locally-referenceable image name.

**Example:**

```yaml
env:
  - name: REGISTRY_HOST
    value: 'repl{{ LocalRegistryHost }}'
  - name: REGISTRY_NAMESPACE
    value: 'repl{{ LocalRegistryNamespace }}'
```

### Determining the imagePullSecret

Private, local images will need to reference an image pull secret to be pulled.
The value of the secret's `.dockerconfigjson` is provided in a template function, and the application can write this pull secret as a new secret to the namespace.
If the application is deploying the pod to the same namespace as the Operator, the pull secret will already exist in the namespace, and the secret name can be obtained using the [ImagePullSecretName](../reference/template-functions-config-context/#imagepullsecretname) template function.
The app manager will create this secret automatically, but only in the namespace that the Operator is running in.
It's the responsibility of the application developer (the Operator code) to ensure that this secret is present in any namespace that new pods will be deployed to.

This template function returns the base64-encoded, docker auth that can be written directly to a secret, and referenced in the `imagePullSecrets` attribute of the PodSpec.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: myregistrykey
  namespace: awesomeapps
data:
  .dockerconfigjson: '{{repl LocalRegistryImagePullSecret }}'
type: kubernetes.io/dockerconfigjson
```

This will return an image pull secret for the locally configured registry.

If your application has both public and private images, it is recommended that the image name is passed to the image pull secret for the locally configured registry. This will ensure that installs without a local registry can differentiate between private, proxied and public images.

**Example:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-pull-secret
  namespace: awesomeapps
data:
  .dockerconfigjson: '{{repl LocalRegistryImagePullSecret }}'
type: kubernetes.io/dockerconfigjson
```

In the above example, the `LocalRegistryImagePullSecret()` function will return an empty auth array if the installation is not air gapped, does not have a local registry configured, and the `elasticsearch:7.6.0` image is public.
If the image is private, the function will return the license-key derived pull secret.
And finally, if the installation is using a local registry, the image pull secret will contain the credentials needed to pull from the local registry.

**Example:**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-pull-secret
  namespace: awesomeapps
data:
  .dockerconfigjson: '{{repl LocalRegistryImagePullSecret }}'
type: kubernetes.io/dockerconfigjson
```

The above example will always return an image pull secret.
For installations without a local registry, it will be the Replicated license secret, and for installations with a local registry, it will be the local registry.

## Using the local registry at runtime

The developer of the Operator should use these environment variables to change the `image.name` in any deployed PodSpec to ensure that it will work in air gapped environments.
