# Connecting to an Image Registry

When packaging and delivering an application with Replicated, you can include private
images for the application without distributing registry credentials
to your customer.

The customer license file can grant revokable image pull access to private images,
whether the images are stored in the Replicated private registry or a supported
external registry:

* For information about connecting to an external registry, see [About Connecting to an External Registry](#about-connecting-to-an-external-registry).
* For information about using the Replicated private registry, see [Push Images to the Replicated Private Registry](#push-images-to-the-replicated-private-registry).

## About Connecting to an External Registry

If your application images are available in a private image registry exposed to the Internet, such as Docker Hub, quay.io, Amazon Elastic Container Registry (ECR), Google Container Registry (GCR), or Artifactory, then the customer licenses for your application can grant proxy, or _pull-through_, access to the assignee without exposing registry credentials to the customer.

With proxy access, the app manager can use the Replicated registry proxy service to pull private images from an external registry. Instances of your application can then pull private images from the proxy service at `proxy.replicated.com` during deployment. The app manager determines what images are private by attempting to fetch image metadata. If the request is forbidden, the app manager pulls the image through `proxy.replicated.com` instead of pulling the image directly from an external registry.

Connecting the app manager to your external registry through a proxy is useful and recommended because it prevents you from having to modify the process you use to build and push application images in order to deploy your application with Replicated.

It also allows you to revoke a customer’s ability to pull private images without having to manage image access through separate identity or authentication systems. For example, when you connect the app manager to your external image registry, a customer's ability to pull private images is revoked when their trial license expires.

To grant proxy access to your external registry, see [Configure Access to an External Registry](#configure-access-to-an-external-registry) below.

The following diagram demonstrates how the registry proxy service pulls images from your external registry, and how deployed instances of your application pull images from the proxy service:

![Registry proxy service workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

For more information about how the app manager uses the registry proxy service, see [How the App Manager Accesses Private Images](#how-the-app-manager-accesses-private-images) below.

## Configure Access to an External Registry

You can provide the credentials for an external registry in the vendor portal to
grant the app manager proxy access to the private application images in the
registry.

All of the applications in your vendor portal Team have access to the external registry
that you add. This means that you can use the images in the external registry across
multiple applications in the Team.

The External Registries pane on the Images page displays all of the external registry connections and displays any errors in the registry log files. You can also test your connection to the registries or remove registries from this page at any time.

![External Registries Pane](/images/external-registries.png)

To follow a tutorial connecting a sample app to an Amazon Elastic Container Registry (ECR), see [Tutorial: Using ECR for Private Images](tutorial-ecr-private-images).

### Configure Access with the Vendor Portal

To configure access to your private images in an external registry using the vendor portal:

1. Log in to the [vendor portal](https://vendor.replicated.com) and go to the Images page.
1. In the External Registries pane, click **Add External Registry**.

1. In the Link a New Registry dialog, select a provider from the dropdown list. Choices include Amazon Elastic Container Registry (ECR), Docker Hub, GitHub Container Registry, Google Container Registry (GCR), quay.io, and Other. _Other_ is a generic form for any other registry provider that you want to use.

  ![Add External Registry dialog in the vendor portal](/images/add-external-registry.png)

1. Complete the additional fields in the dialog. The fields that appear depend on which provider you select and, in some cases, depend on which authorization type you select.

  **Amazon ECR:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Endpoint</td>
      <td>Enter the endpoint, such as <code>ecr.io</code>.</td>
    </tr>
    <tr>
      <td>Access Key ID</td>
      <td>Provide the access key ID for a service account user that has pull access to the registry. See <a href="tutorial-ecr-private-images#setting-up-the-service-account-user">Setting up the Service Account User</a> in Tutorial: Using ECR for Private Images.</td>
    </tr>
    <tr>
      <td>Secret Key</td>
      <td>Provide the secret key for a service account user that has pull access to the registry. The key can be entered as a string or taken from stdin. See <a href="tutorial-ecr-private-images#setting-up-the-service-account-user">Setting up the Service Account User</a> in Tutorial: Using ECR for Private Images.</td>
    </tr>
  </table>

  **Docker Hub:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Auth Type</td>
      <td>Enter the authorization type for the registry. Types are <code>Password</code> or <code>Token</code>.</td>
    </tr>
    <tr>
      <td>Username</td>
      <td>If you selected <code>Password</code> as the authorization type, enter the username used to authenticate with the registry.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>If you selected <code>Password</code> as the authorization type, enter the password used to authenticate with the registry. The password can be entered as a string or taken from stdin.</td>
    </tr>
    <tr>
      <td>Token</td>
      <td>If you selected <code>Token</code> as the authorization type, enter the API token used to access your application in the Vendor API. The token can be entered as a string or taken from stdin.</td>
    </tr>
  </table>

  **GitHub Container Registry:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>GitHub Token</td>
      <td>Enter the API token used to access your application in the Vendor API. This token can be entered as a string or taken from stdin.</td>
    </tr>
  </table>

  **Google Container Registry:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Endpoint</td>
      <td>Enter the endpoint, such as <code>gcr.io</code>.</td>
    </tr>
    <tr>
      <td>Service Account JSON Key</td>
      <td>Paste in the JSON service account key that is used to authenticate with the registry. This key can be entered as a string or taken from stdin.</td>
    </tr>
  </table>

  **quay.io:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Endpoint</td>
      <td>Enter the endpoint, such as <code>gcr.io</code>.</td>
    </tr>
    <tr>
      <td>Username</td>
      <td>Provide the username for an account that has pull access to the private registry.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>Enter the password used to authenticate with the registry. The password can be entered as a string or taken from stdin.</td>
    </tr>
  </table>

  **Other:**
  <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Username</td>
      <td>Provide the username for an account that has pull access to the private registry.<br/><br/>Replicated encrypts and securely stores your username and password. Your credentials and the encryption key do not leave Replicated servers.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>Provide the password used to authenticate with the registry.<br/><br/>Replicated encrypts and securely stores your username and password. Your credentials and the encryption key do not leave Replicated servers.</td>
    </tr>
  </table>

1. For **Image name & tag**, enter the image name and optionally a tag. Click **Test** to test the connection to the external registry.

  A success or fail status appears.

1. Click **Link Registry** to finish linking the registry to the Replicated servers.

### Configure Access with the CLI

To configure access to private images in an external registry using the replicated CLI:

1. Follow the instructions to [install and configure](/reference/replicated-cli-installing) the replicated CLI.
1. Add a registry using the `registry add` command. For complete reference information about adding a registry, see [registry add](/reference/replicated-cli-registry-add).

  **Example: `other` Provider**

  ```bash
  replicated registry add other \
      --username USERNAME \
      --password PASSWORD
  ```

  Replace:

    - USERNAME with a username that has access to pull images from the registry.
    - PASSWORD with the password for the specified username that can access the registry.

  To prevent the password from being saved in your shell history, Replicated recommends using the `--password-stdin` flag and entering the password when prompted.

1. Run the following command to test that the Replicated servers can pull the specified image:

  ```bash
  replicated registry test ENDPOINT \
      --image IMAGE:TAG
  ```

  Replace:

    - ENDPOINT with the host endpoint.
    - IMAGE with the name of the image.
    - TAG with the tag for the image, if you are using a tag.

  **Example:**

  ```bash
  replicated registry test index.docker.io my-company/my-image:v1.2.3
  ```

## Push Images to the Replicated Private Registry

You can host the private images for your application on the Replicated private registry. Hosting your images on the Replicated private registry is useful if you do not already have your images in an existing private registry. It is also useful for testing purposes.

For more information about building, tagging, and pushing Docker images, see the
[Docker CLI documentation](https://docs.docker.com/engine/reference/commandline/cli/).

To push images to the Replicated private registry:

1. Do one of the following to connect with the `registry.replicated.com` container registry:
   * **(Recommended) Log in with a user token**: Use `docker login registry.replicated.com` with your vendor portal email as the username and a vendor portal user token as the password. For more information, see [User tokens](../reference/replicated-cli-tokens#user-tokens) in _Using Vendor API tokens_.
   * **Log in with a service account or team token**: Use `docker login registry.replicated.com` with a Replicated vendor portal service account or team token as the password. You can use any string as the username. For more information, see [Service accounts](../reference/replicated-cli-tokens#service-accounts) and [Team tokens](../reference/replicated-cli-tokens#team-tokens) in _Using Vendor API tokens_.
   * **Log in with your credentials**: Use `docker login registry.replicated.com` with your vendor portal email and password as the credentials.

1. Tag your private image with the Replicated registry hostname in the standard
Docker format:

   ```
   docker tag IMAGE_NAME registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
   ```

   Where:
   * `IMAGE_NAME` is the name of the existing private image for your application.
   * `APPLICATION_SLUG` is the slug assigned to your application. You can find your application slug on the **Images** page of the vendor portal.
   * `TARGET_IMAGE_NAME` is a name for the image. Replicated recommends that the `TARGET_IMAGE_NAME` is the same as the `IMAGE_NAME`.
   * `TAG` is a tag for the image.

   For example:

   ```shell
   $ docker tag worker registry.replicated.com/myapp/worker:1.0.1
   ```

1. Push your private image to the Replicated private registry:
  ```shell
  $ docker push registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
  ```

## How the App Manager Accesses Private Images

The app manager uses Kustomize to change the location of the private image registry
in the PodSpec during application deployment from the external registry domain to
the Replicated proxy service domain.
It then creates an `imagePullSecret` to access the images through the proxy service.

### Patching the Image Location with Kustomize

When the app manager is installing an application, it attempts to load image manifests
using the image reference from the PodSpec. If the app manager receives a 401 response,
it assumes that this is a private image that must be proxied through the
registry proxy service.

The app manager uses Kustomize to patch the `midstream/kustomization.yaml` file to change the image name during deployment to reference the proxy service.

For example, a PodSpec for a Deployment references a private image hosted at `quay.io/my-org/api:v1.0.1`:

```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: example
  spec:
    template:
      spec:
        containers:
          - name: api
            image: quay.io/my-org/api:v1.0.1
```

When this application is deployed, the app manager detects that it cannot access
the image at quay.io. So, it creates a patch in the `midstream/kustomization.yaml`
file that changes the image name in all manifest files for the application:

```yaml
  apiVersion: kustomize.config.k8s.io/v1beta1
  bases:
  - ../../base
  images:
  - name: quay.io/my-org/api:v1.0.1
    newName: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
```

This causes the container runtime in the cluster to use the proxy service to pull the images,
using the license information provided to the app manager for authentication.


### Accessing the Proxy Service with an Image Pull Secret

During installation, the app manager automatically creates an `imagePullSecret`
that is based on the customer license. The app manager uses this secret to authenticate and
pull private images from `proxy.replicated.com`.

The app manager does not patch the image location URL for images hosted on the Replicated private registry
at `registry.replicated.com`. However, the app manager adds the same `imagePullSecret` to
PodSpecs that reference images in the Replicated private registry.

:::note
When deploying Pods to namespaces other than the app manager application namespace, you must add the namespace to the `additionalNamespaces` attribute of the Application custom resource manifest.
This ensures the app manager can provision the `imagePullSecret` in the namespace to allow the Pod to pull the image.
For more information about the `additionalNamespaces` attribute, see [Defining Additional Namespaces](operator-defining-additional-namespaces).
:::


## Support for Image Tags and Digests

The app manager supports image tags for applications in all use cases.

The app manager supports image digests only for online (Internet-connected) installations. You can also use image tags and digests together for online installations. Image digests are not supported for air gap installations.

## Related Topic

[Tutoiral: Using ECR for Private Images](tutorial-ecr-private-images)
