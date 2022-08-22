# Configuring Image Registry Settings

If you are installing in an air gap environment or you want to use a private registry to scan and run the installation image from, you can push the installation image to the private registry using the Replicated admin console.

This procedure applies to air gap and existing cluster installations. Note that the Kubernetes installer for embedded cluster installations has its own internal registry. For more information about the requirements and limitations, see [Image Registry for Air Gap Clusters](image-registry-airgap) and [Image Registry for Kubernetes Installer-Created Clusters](image-registry-embedded-cluster).

To configure image registry settings for air gap or online installations:

1. From the admin console, click the Registry Settings tab.

  ![Registry Settings](/images/image-registry-settings.png)

1. For **Hostname**, enter a domain that supports the Docker V2 protocol. For more information about Docker inage registry requirements and compatibility, see [Image Registry for Air Gap Clusters](https://docs.replicated.com/enterprise/image-registry-airgap).
1. For **Username** and **Password**, enter credentials that have `push` permissions. The registry credentials are located in the `registry-creds` secret in the default namespace.
1. Click **Test connection** to test that the connection works.
1. (Air gap only) For **Registry namespace**, enter the namespace that you want to use to rewrite all of the air gap images and push them to your registry. The namespace name can be any valid URL-safe string that is supplied during the installation. The registry expects that the namespace exists before images are pushed to it.

  :::note
  Amazon Elastic Container Registry (ECR) does not use namespaces.
  :::
1. (Optional) Select the **Disable Pushing Images to Registry** checkbox.
1. Click **Save Changes**.
