# Creating a Kubernetes Installer

This topic describes creating a Replicated Kubernetes installer to distribute your application without an existing cluster.

## About Installing an Application Without an Existing Cluster

When you package and release your application with Replicated, your customers can
install the application without an existing Kubernetes cluster. You use the Replicated Kubernetes installer to provision a new cluster on a virtual machine (VM). This allows customers who do not have an existing cluster to install your application without provisioning a cluster themselves.

There are two possible methods for creating a Kubernetes installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-in-the-release-application">Included with the release (Alpha)</a></td>
    <td>The installer is added to the application release. <br></br><br></br> Couples the installer and the application in the release, making them easier to test and use together. <br></br><br></br> Helps with installing previous versions of the application because the installer associated with the application release is used.</td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-separate-kubernetes-installer">As a separate installer</a></td>
    <td>The installer is created separately from the application release. <br></br><br></br> This option uses the Kubernetes installer that is currently promoted to the channel. Using a separate installer can pose problems when installing previous versions of the application, since previous versions may not be tested with the currently promoted installer.</td>
  </tr>
</table>

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

## Create a Kubernetes Installer in the Application Release (Beta)

You can create a Kubernetes installer as part of the application release. This allows multiple Kubernetes installers to be active for a channel at the same time. It also ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed. We recommend this method.

To create the Kubernetes installer in the application release:

1. In the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** or click **Edit YAML** to edit an existing release.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your Installer YAML. Note the following:

    - You must include the KOTS add-on to provision the Replicated admin console.

    - To use Replicated snapshots, Velero must be installed on the cluster. We recommend that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Create a new file in the YAML editor in the vendor portal. Copy the Installer YAML content from [kurl.sh](https://kurl.sh) and paste it in this new file.

    :::note
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer manifest, rather than `latest` or x-ranges (such as 1.2.x). This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.0` in your manifest to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

    For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Save and promote the release to your development environment to test your changes.

## Create a Separate Kubernetes Installer

You can create a Kubernetes installer and promote it to the same channel as your application release. This method creates the installer separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations, regardless of the application version, will use the currently promoted installer.

To create a separate Kubernetes installer:

1. From the [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

1. Edit the file. Note the following:

    - You must include the KOTS add-on to provision the Replicated admin console.

    - To use Replicated snapshots, Velero must be installed on the cluster. We recommend that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero. For more information, see [Velero Add-On](https://kurl.sh/docs/add-ons/velero) and [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    :::note
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer manifest, rather than `latest` or x-ranges (such as 1.2.x). This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.0` in your manifest to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

    For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**.

1. Save and promote a release to your development environment to test your changes.
