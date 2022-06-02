# Creating a Kubernetes Installer Specification

This topic describes creating a specification file for your application to support
installations on clusters created by the Replicated Kubernetes installer.

## About installing an application without an existing cluster

When you package and release your application with Replicated, your customers can
install the application on either an existing Kubernetes cluster or a cluster created
by the Kubernetes installer.

The Kubernetes installer is a feature of the Replicated product that provisions
a new cluster on your customer's VM. This allows customers who do not have an
existing cluster to install your application without manually provisioning a new
cluster themselves.

There are two possible methods for creating a Kubernetes installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-in-the-release-application">Included with the release (Beta)</a></td>
    <td>The installer manifest file is added to the application release. <br></br><br></br> Couples the installer and the application in the release, making them easier to test and use together. <br></br><br></br> Helpful for installing previous versions of the application, because the installer associated with the application release will be used.</td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-specification">As a separate specification</a></td>
    <td>The installer specification is created separately from the application release. <br></br><br></br> With this option, it is only possible to use the Kubernetes installer that is currently promoted to the channel. This poses problems when installing previous versions of the application, since previous versions may not be tested with the currently promoted installer.</td>
  </tr>
</table>

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

## Create a Kubernetes Installer in the Application Release

You can create a Kubernetes installer specification as part of the application release. This allows multiple Kubernetes installers to be active for a channel at a time, and it ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed.

To add the Kubernetes installer manifest to the application release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), select **Releases > Create Release**.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your installer YAML. Make sure to include the KOTS add-on to provision the Replicated admin console.

  For more information about creating a Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Create a new file in the YAML editor in the vendor portal. Copy the installer YAML content from [kurl.sh](https://kurl.sh) and paste it in this new file.

1. Save and promote the release to your development environment to test your changes.


## Create a Kubernetes Installer Specification

You can create a Kubernetes installer specification file and promote it to the same channel as your application release. This method creates the specification separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations, regardless of the application version, will use the currently promoted installer.

To create a Kubernetes installer specification:

1. From the Replicated [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

1. Edit the file. Make sure to include the KOTS add-on to provision the Replicated admin console. For information about creating a Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    :::note
       Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification, rather than `latest` versions. This ensures easily-reproducible versions across your customer installations.

       For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

       For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**.
