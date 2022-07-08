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
    <td><a href="packaging-embedded-kubernetes#include-a-kubernetes-installer-in-an-application-release-beta">Include a Kubernetes installer in an application release (Beta)</a></td>
    <td>The installer is included in an application release. <br></br><br></br> Couples the installer and the application in the release, making them easier to test and use together. <br></br><br></br> Helps with installing previous versions of the application because the installation command uses the installer that is associated with the application release.</td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-separate-kubernetes-installer">Create a separate Kubernetes installer</a></td>
    <td>The installer is created and promoted to a channel separately from an application release. <br></br><br></br> The installation command uses the Kubernetes installer that is currently promoted to the channel. When you install a previous application version with the currently promoted Kubernetes installer, problems can occur because the application version might not have been tested with the current installer.</td>
  </tr>
</table>

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

## Include a Kubernetes Installer in an Application Release (Beta)

You can include a Kubernetes installer with an application release. This allows multiple Kubernetes installers to be active for a channel at the same time. It also ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed. We recommend this method.

To include the Kubernetes installer in the application release:

1. In the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** or click **Edit YAML** to edit an existing release.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your Installer YAML. Note the following:

    - You must include the KOTS add-on to provision the Replicated admin console.

    - To use Replicated snapshots, Velero must be installed on the cluster. We recommend that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero.

    - Kubernetes installers that are included in releases must pin specific add-on versions and cannot pin `latest` versions or x-ranges (such as 1.2.x). Pinning specific versions ensures the most testable and reproducible installations.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Save and promote the release to your development environment to test your changes.

### Include a Supporting Preflight Check

> Introduced in Replicated app manager v1.74.0

One goal of including a Kubernetes installer in a release is to more tightly couple a particular release with a particular Kubernetes installer. If you want to encourage or ensure that your customers run the updated Kubernetes installer before upgrading to the corresponding release, a preflight check can be used to compare the installer that is included in the release against the installer that is currently deployed.

Since this is a preflight check, you can customize the message and URI for each outcome. For example, you can provide instructions on how to rerun the Kubernetes installer, or link to your documentation on how to do that. Additionally, you can make this a [strict preflight check](/vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles) if you want to prevent customers from deploying a release before appropriately updating their Kubernetes installer.

To invoke this optional preflight check, include a [`yamlCompare`](https://troubleshoot.sh/docs/analyze/yaml-compare/) analyzer in your Preflight specification with the `kots.io/installer: "true"` annotation. The following is an example Preflight specification that utilizes this comparison behavior:

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
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer manifest, rather than use `latest` or x-ranges (such as 1.2.x). This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.0` in your manifest to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

    For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**.

1. Save and promote a release to your development environment to test your changes.
