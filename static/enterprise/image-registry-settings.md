# Configure Local Image Registries

This topic describes how to configure private registry settings in the Replicated KOTS Admin Console.

The information in this topic applies to existing cluster installations with KOTS and installations with Replicated kURL. This topic does _not_ apply to Replciated Embedded Cluster installations.

## Overview

Using a private registry lets you create a custom image pipeline. Any proprietary configurations that you make to the application are shared only with the groups that you allow access, such as your team or organization. You also have control over the storage location, logging messages, load balancing requests, and other configuration options. Private registries can be used with online or air gap clusters.

## Requirement

The domain of the image registry must support a Docker V2 protocol. KOTS has been tested for compatibility with the following registries:

- Docker Hub

  :::note
  To avoid the November 20, 2020 Docker Hub rate limits, use the `kots docker ensure-secret` CLI command. For more information, see [Avoiding Docker Hub Rate Limits](image-registry-rate-limits).
  :::

- Quay
- Amazon Elastic Container Registry (ECR)
- Google Container Registry (GCR)
- Azure Container Registry (ACR)
- Harbor
- Sonatype Nexus

## Configure Local Private Registries in Online Clusters

In online (internet-connected) installations, you can optionally use a local private image registry. You can also disable the connection or remove the registry settings if needed.

To configure private registry settings in an online cluster:

1. In the Admin Console, on the **Registry settings** tab, edit the fields:
    
    <img src="/images/registry-settings.png" alt="Registry Settings" width="400"></img>

    [View a larger version of this image](/images/registry-settings.png)

    The following table describes the fields:

    <table>
    <tr>
      <th width="30%">Field</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <td>Hostname</td>
      <td>Specify a registry domain that uses the Docker V2 protocol.</td>
    </tr>
    <tr>
      <td>Username</td>
      <td>Specify the username for the domain.</td>
    </tr>
    <tr>
      <td>Password</td>
      <td>Specify the password for the domain.</td>
    </tr>
    <tr>
      <td>Registry Namespace</td>
      <td>Specify the registry namespace. The registry namespace is the path between the registry and the image name. For example, `my.registry.com/namespace/image:tag`. For air gap environments, this setting overwrites the registry namespace where images where pushed when KOTS was installed.</td>
    </tr>
    <tr>
      <td>Disable Pushing Images to Registry</td>
      <td>(Optional) Select this option to disable KOTS from pushing images. Make sure that an external process is configured to push images to your registry instead. Your images are still read from your registry when the application is deployed.</td>
    </tr>
  </table>

1. Click **Test Connection** to test the connection between KOTS and the registry host.

1. Click **Save changes**.

## Change Private Registries in Air Gap Clusters {#air-gap}

You can change the private registry settings at any time in the Admin Console.

To change private registry settings in an air gap cluster:

1. In the Admin Console, on the **Registry settings** tab, select the **Disable Pushing Images to Private Registry** checkbox. Click **Save changes**. 

   :::note
   This is a temporary action that allows you to edit the registry namespace and hostname. If you only want to change the username or password for the registry, you do not have to disable pushing the images.
   :::

1. Edit the fields as needed, and click **Save changes**.

     <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Hostname</td>
        <td>Specify a registry domain that uses the Docker V2 protocol.</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>Specify the username for the domain.</td>
      </tr>
      <tr>
        <td>Password</td>
        <td>Specify the password for the domain.</td>
      </tr>
      <tr>
        <td>Registry Namespace</td>
        <td>Specify the registry namespace. For air gap environments, this setting overwrites the registry namespace that you pushed images to when you installed KOTS.</td>
      </tr>
     </table>

1. Deselect the **Disable Pushing Images to Private Registry** checkbox. This action re-enables KOTS to push images to the registry.

1. Click **Test Connection** to test the connection between KOTS and the private registry host.

1. Click **Save changes**.

## Stop Using a Registry and Remove Registry Settings

To stop using a registry and remove registry settings from the Admin Console:

1. Log in to the Admin Console and go to **Registry Settings**.

1. Click **Stop using registry** to remove the registry settings from the Admin Console.