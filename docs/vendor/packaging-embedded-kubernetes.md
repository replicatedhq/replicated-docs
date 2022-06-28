# Creating a Kubernetes Installer Specification

This topic describes creating a specification file for your application to support
installations on clusters created by the Replicated Kubernetes installer.

## About installing an application without an existing cluster

When you package and release your application with Replicated, your customers can
install the application on either an existing Kubernetes cluster or a cluster created
by the Kubernetes installer.

The Kubernetes installer is a feature of the Replicated product that provisions
a new cluster on your customer's virtual machine (VM). This allows customers who do not have an
existing cluster to install your application without manually provisioning a new
cluster themselves.

There are two possible methods for creating a Kubernetes installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-in-the-release-application">Included with the release (Alpha)</a></td>
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

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your installer YAML. Note the following:

    - You must include the KOTS add-on to provision the Replicated admin console.

    - To use Replicated snapshots, Velero must be installed on the cluster. We recommend that you include the Velero add-on in your Kubernetes installer so that your customers do not have to manually install Velero.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Create a new file in the YAML editor in the vendor portal. Copy the installer YAML content from [kurl.sh](https://kurl.sh) and paste it in this new file.

    :::note
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification, rather than `latest` versions. This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

    For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Save and promote the release to your development environment to test your changes.

### Include a Supporting Preflight Check

One goal of including a Kubernetes installer in a release is to more tightly couple a particular release with a particular Kubernetes installer. If you want to encourage or ensure that your customers run the updated Kubernetes installer before upgrading to the corresponding release, a preflight check can be used to compare the installer that is included in the release against the installer that is currently deployed.

Since this is a preflight check, you can customize the message and URI for each outcome. For example, you can provide instructions on how to rerun the Kubernetes installer, or link to your documentation on how to do that. Additionally, you can make this a [strict preflight check](/vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles) if you want to prevent customers from deploying a release before appropriately updating their Kubernetes installer.

To invoke this optional preflight check, include a [`yamlCompare`](https://troubleshoot.sh/docs/analyze/yaml-compare/) analyzer in your Preflight spec with the `kots.io/installer: "true"` annotation. The following is an example Preflight spec that utilizes this additional behavior:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: installer-preflight-example
spec:
  analyzers:
    - yamlCompare:
        annotations:
          kots.io/installer: "true"
        checkName: Kubernetes Installer
        outcomes:
          - fail:
              message: The Kubernetes installer for this version differs from what you have installed. It is recommended that you run the updated Kubernetes installer before deploying this version.
              uri: https://kurl.sh/my-application
          - pass:
              message: The Kubernetes installer for this version matches what is currently installed.
```

## Create a Kubernetes Installer Specification

You can create a Kubernetes installer specification file and promote it to the same channel as your application release. This method creates the specification separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations, regardless of the application version, will use the currently promoted installer.

To create a Kubernetes installer specification:

1. From the Replicated [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

1. Edit the file. Note the following:

    - You must include the KOTS add-on to provision the Replicated admin console.

    - To use Replicated snapshots, Velero must be installed on the cluster. We recommend that you include the Velero add-on in your Kubernetes installer so that your customers do not have to manually install Velero. For more information, see [Velero Add-On](https://kurl.sh/docs/add-ons/velero) and [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    :::note
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification, rather than `latest` versions. This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

    For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**.

1. Save and promote a release to your development environment to test your changes.
