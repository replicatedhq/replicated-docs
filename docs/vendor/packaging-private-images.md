# Connecting to an External Registry

This topic describes how to add credentials for an external private registry using the Replicated vendor portal or replicated CLI. Adding an external registry allows you to grant proxy access to private images using the Replicated proxy service. For more information, see [About the Replicated Proxy Service](private-images-about).

For information about adding a registry with the Vendor API v3, see [Create an external registry with the specified parameters](https://replicated-vendor-api.readme.io/reference/createexternalregistry) in the Vendor API v3 documentation.

## Supported Registries

Replicated recommends that application vendors use one the following external private registries:

* Amazon Elastic Container Registry (ECR)
* DockerHub
* GitHub Container Registry
* Google Artifact Registry
* Google Container Registry (Deprecated)
* Nexus Repository Manager 
* Quay.io

These registries have been tested for compatibility with KOTS.

You can also configure access to most other external registries if the registry conforms to the Open Container Initiative (OCI) standard. 

## Add Credentials for an External Registry

All applications in your team have access to the external registry that you add. This means that you can use the images in the external registry across multiple apps in the same team.

### Using the Vendor Portal

To add an external registry using the vendor portal:

1. Log in to the [vendor portal](https://vendor.replicated.com) and go to the **Images** page.
1. Click **Add External Registry**.

   <img src="/images/add-external-registry.png" alt="/images/add-external-registry.png" width="400px"></img>

1. In the **Provider** drop-down, select your registry provider. 

1. Complete the fields in the dialog, depending on the provider that you chose:

   :::note
   Replicated stores your credentials encrypted and securely. Your credentials and the encryption key do not leave Replicated servers.
   :::

   * **Amazon ECR**
      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as 123456689.dkr.ecr.us-east-1.amazonaws.com</td>
        </tr>
        <tr>
          <td>Access Key ID</td>
          <td>Enter the Access Key ID for a Service Account User that has pull access to the registry. See <a href="tutorial-ecr-private-images#setting-up-the-service-account-user">Setting up the Service Account User</a>.</td>
        </tr>
        <tr>
          <td>Secret Access Key</td>
          <td>Enter the Secret Access Key for the Service Account User.</td>
        </tr>
      </table>  

    * **DockerHub**

      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as index.docker.io.</td>
        </tr>
        <tr>
          <td>Auth Type</td>
          <td>Select the authentication type for a DockerHub account that has pull access to the registry.</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>Enter the host name for the account.</td>
        </tr>
        <tr>
          <td>Password or Token</td>
          <td>Enter the password or token for the account, depending on the authentication type you selected.</td>
        </tr>
      </table> 

    * **GitHub Container Registry**

      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry.</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>Enter the username for an account that has pull access to the registry.</td>
        </tr>
        <tr>
          <td>GitHub Token</td>
          <td>Enter the token for the account.</td>
        </tr>
      </table>

    * **Google Artifact Registry**
      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as <br/>us-east1-docker.pkg.dev</td>
        </tr>   
        <tr>
          <td>Auth Type</td>
          <td>Select the authentication type for a Google Cloud Platform account that has pull access to the registry.</td>
        </tr>   
        <tr>
          <td>Service Account JSON Key or Token</td>         
          <td>
          <p>Enter the JSON Key from Google Cloud Platform assigned with the Storage Object Viewer role, or token for the account, depending on the authentication type you selected.</p> 
          <p>For more information about creating a Service Account, see <a href="https://cloud.google.com/container-registry/docs/access-control">Access Control with IAM</a> in the Google Cloud documentation.</p>
          </td>
        </tr>
      </table>   
    * **Google Container Registry**
      :::important
      Google Container Registry is deprecated. For more information, see <a href="https://cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation">Container Registry deprecation</a> in the Google documentation.
      :::
      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as gcr.io.</td>
        </tr>
        <tr>
          <td>Service Account JSON Key</td>
          <td><p>Enter the JSON Key for a Service Account in Google Cloud Platform that is assigned the Storage Object Viewer role.</p><p>For more information about creating a Service Account, see <a href="https://cloud.google.com/container-registry/docs/access-control">Access Control with IAM</a> in the Google Cloud documentation.</p></td>
        </tr>
      </table>   

    * **Quay.io**

      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as quay.io.</td>
        </tr>
        <tr>
          <td>Username and Password</td>
          <td>Enter the username and password for an account that has pull access to the registry.</td>
        </tr>
      </table>

    * **Nexus Repository**

      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as example.registry.com.</td>
        </tr>
        <tr>
          <td>Username and Password</td>
          <td>Enter the username and password for an account that has pull access to the registry.</td>
        </tr>
      </table>

    * **Other**

      <table>
        <tr>
          <th width="30%">Field</th>
          <th width="70%">Instructions</th>
        </tr>
        <tr>
          <td>Hostname</td>
          <td>Enter the host name for the registry, such as example.registry.com.</td>
        </tr>
        <tr>
          <td>Username and Password</td>
          <td>Enter the username and password for an account that has pull access to the registry.</td>
        </tr>
      </table>

1. For **Image name & tag**, enter the image name and image tag and click **Test** to confirm that the vendor portal can access the image. For example, `api:v1.0.1` or `my-app/api:v1.01`.

1. Click **Link registry**.

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
