import ImageRegistrySettings from "../partials/image-registry/_image-registry-settings.mdx"

# Using Private Registries

This topic describes how to configure private registry settings in the Replicated admin console.

## About Private Registries

Using a private registry lets you create a custom image pipeline. Any proprietary configurations that you make to the application are shared only with the groups that you allow access, such as your team or organization. You also have control over the storage location, logging messages, load balancing requests, and other configuration options.

Private registries can be used with online or air gap clusters. For embedded kURL clusters, if the Replicated kURL installer spec includes the kURL Registry add-on, then the embedded registry is used to host the application images. For more information about the kURL Registry add-on, see [Image Registry for Embedded kURL Clusters](image-registry-embedded-cluster).

## Prerequisites

Your domain must support a Docker V2 protocol. For more information, see [Private Registry Requirements](installing-general-requirements#private-registry-requirements) in _Installation Requirements_.

## Configure Private Registries in Online Clusters

You configure the application to use a private registry in the admin console, unless you are using a kURL Registry add-on. You can also disable the connection or remove the registry settings if needed.

For information about changing registry settings in an air gap environment, see [Change Private Registries in Air Gap Clusters](#air-gap).

To configure private registry settings in an online cluster:

1. On the Registry Settings tab in the admin console, edit the fields:
    
    <img src="/images/registry-settings.png" alt="Registry Settings" width="400"></img>

    The following table describes the fields:

    <ImageRegistrySettings/>

1. Click **Test Connection** to test the connection between Replicated KOTS and the private registry host.

1. Click **Save changes**.

1. (Optional) Click **Stop using registry** if you want to remove the registry settings from KOTS.

## Change Private Registries in Air Gap Clusters {#air-gap}

During air gap installations, you configure a private registry where KOTS pushes images. You can change the private registry settings at any time in the admin console.

To change private registry settings in an air gap cluster:

1. On the Registry Settings tab in the admin console, select the **Disable Pushing Images to Private Registry** checkbox, and click **Save changes**. 

   This is a temporary action that allows you to edit the registry namespace and hostname. If you only want to change the username or password, you do not have to disable pushing the images.

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

1. Deselect the **Disable Pushing Images to Private Registry** checkbox. This action re-enables KOTS to push images to your registry.

1. Click **Test Connection** to test the connection between KOTS and the private registry host.

1. Click **Save changes**.