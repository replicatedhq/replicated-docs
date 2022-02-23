# Defining Additional Images

To ensure that images will be available locally, the Replicated app manager finds all images defined in the application manifests and includes them in `.airgap` bundles.
During the application install or update workflow, the app manager collects these images from the internet or from the `.airgap` bundle, if the application is installed in an air gap environment. The app manager then retags and pushes all the images to a customer-defined registry.

If there are required images that are not defined in any of the Kubernetes manifests, these should be listed in the `additionalImages` attribute of the Application custom resource manifest file.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-operator
spec:
  additionalImages:
    - elasticsearch:7.6.0
    - registry.replicated.com/my-operator/my-private-image:abd123f
    - quay.io/orgname/private-image:v1.2.3
```

The app manager supports additional images that are:

- public images: referenced by the docker pullable image name
- images pushed to the Replicated registry: referenced by the `registry.replicated.com` name
- images pushed to another [private, linked registry](packaging-private-images): referenced by the docker pullable name

## Authentication

When creating the `.airgap` bundle or performing an online install, the app manager will ensure that private images are available, without sharing registry credentials with the installation.
Air gap packages include the image layers in the bundle. Online installs will rewrite externally hosted private images to be pulled from `proxy.replicated.com`.
When the installation sends credentials to `proxy.replicated.com` or `registry.replicated.com`, the credentials are based on the customer license file, and the credentials stop working when the license expires.
