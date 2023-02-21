import DockerCompatibility from "../partials/image-registry/_docker-compatibility.mdx"


# Using Private Registries

This topic describes how to configure private registry settings in the Replicated admin console.

## About Private Registries

Using a private registry lets you create a custom image pipeline. Any proprietary configurations that you make to the application are shared only with the groups that you allow access, such as your team or organization. You also have control over the storage location, logging messages, load balancing requests, and other configuration options.

Private registries can be used with online or air gap clusters. For embedded clusters, if the Kubernetes installer includes the kURL Registry add-on, then the embedded registry is used to host the application images. For more information about the kURL Registry add-on, see [Image Registry for Kubernetes Installer-created Clusters](image-registry-embedded-cluster).

## Prerequisites

Your domain must support a Docker V2 protocol. For more information, see [Docker Image Registry Compatibility](installing-general-requirements#docker-compatibility) in _Requirements for Installation_.

For information about air gap requirements, see [Requirements for Air Gap Image Registry](image-registry-airgap).

## Configure Private Registry Settings

You configure the application to use a private registry in the admin console, unless you are using a kURL Registry add-on. You can also disable the connection or remove the registry settings if needed.

To configure private registry settings:

1. On the Registry Settings tab in the admin console, edit the fields:

     ![Registry Settings](/images/registry-settings.png)

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
      <td>Specify the registry namespace. For air gap environments, this setting overwrites the registry namespace that you pushed images to when you installed the Replicated app manager.</td>
    </tr>
    <tr>
      <td>Disable Pushing Images to Registry</td>
      <td>(Optional) Select this option to disable the app manager from pushing images. Make sure that an external process is configured to push images to your registry instead. Your images are still read from your registry when the application is deployed.</td>
    </tr>
  </table>

1. Click **Test Connection** to test the connection between the admin console and the private registry host.

1. Click **Save changes**.

1. (Optional) Click **Stop using registry** if you want to remove the registry settings from the app manager.

