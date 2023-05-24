# Connecting to an Image Registry

This topic describes how to connect to an external private registry using the Replicated vendor portal or the replicated CLI.

For information about how Replicated KOTS processes images in external private registries, see [About Using an External Registry](private-images-about).

For information about using the Replicated private registry, see [Push Images to the Replicated Private Registry](private-images-replicated).

## About Using External Private Registries

When packaging an application with Replicated KOTS, you can include private
images for the application without distributing registry credentials
to your customer.

The customer license file can grant revokable image pull access to private images, whether the images are stored in the Replicated private registry or a supported external registry.

If you use the Replicated private registry or proxy service, you can configure custom domains to alias registry.replicated.com and proxy.replicated.com, to remove the Replicated domains from a customer security review and reduce exposure. This feature is configured at the Team level. For more information about custom domains, see [Using Custom Domains](custom-domains).

## Supported Registries

Replicated recommends that application vendors use one the following external private registries, which have been tested for compatibility with KOTS:

* Amazon Elastic Container Registry (ECR)
* DockerHub
* GitHub Container Registry
* Google Container Registry
* Quay.io

You can also configure access to most other external registries if the registry conforms to the Open Container Initiative (OCI) standard. 

## Configure Access to an External Registry

You can provide the credentials for an external registry in the vendor portal to grant KOTS proxy access to the private application images in the registry.

All applications in your vendor portal Team have access to the external registry that you add. This means that you can use the images in the external registry across multiple apps in the Team.

### Using the Vendor Portal

To configure access to your private images in an external registry using the vendor portal:

1. Log in to the [vendor portal](https://vendor.replicated.com) and go to the Images page.
1. Click **Add external registry**.

   <img src="/images/add-external-registry.png" alt="/images/add-external-registry.png" width="400px"></img>

1. Click the **Other Registry** or **DockerHub** tab.
1. Complete the fields in the dialog:
<table>
  <tr>
    <th width="30%">Field</th>
    <th width="70%">Instructions</th>
  </tr>
  <tr>
    <td>Endpoint</td>
    <td>Enter the endpoint, such as quay.io, index.docker.io, or gcr.io.</td>
  </tr>
  <tr>
    <td>Username and Password</td>
    <td>Provide the username and password for an account that has pull access to the private registry.<br/><br/>For Amazon ECR registries, provide the Access Key ID and Secret Key for a Service Account User that has pull access to the registry. See <a href="tutorial-ecr-private-images#setting-up-the-service-account-user">Setting up the Service Account User</a>.<br/><br/>Replicated stores your username and password encrypted and securely. Your credentials and the encryption key do not leave Replicated servers.</td>
  </tr>
</table>

### Using the CLI

To configure access to private images in an external registry using the replicated CLI:

1. Install and configure the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

1. Run the `registry add` command for your external private registry. For more information about the `registry add` command, see [registry add](/reference/replicated-cli-registry-add) in _replicated CLI_.

  For example, to add a DockerHub registry:

  ```bash
  replicated registry add dockerhub --username USERNAME \
    --password PASSWORD
  ```
  Where:
    * `USERNAME` is the username for DockerHub credentials with access to the registry.
    * `PASSWORD` is the password for DockerHub credentials with access to the registry.

    :::note
    To prevent the password from being saved in your shell history, Replicated recommends that you use the `--password-stdin` flag and entering the password when prompted.
    :::

## Test External Registry Credentials

Replicated recommends that you test external registry credentials to ensure that the saved credentials on Replicated servers can pull the specified image.

To validate that the configured registry can pull specific images:

```bash
replicated registry test HOSTNAME \
    --image IMAGE_NAME
```
Where:
* `HOSTNAME` is the name of the host, such as `index.docker.io`.
* `IMAGE_NAME` is the name of the target image in the registry.

For example:

```bash
replicated registry test index.docker.io --image my-company/my-image:v1.2.3
```

## Related Topic

[Tutorial: Using ECR for Private Images](tutorial-ecr-private-images)
