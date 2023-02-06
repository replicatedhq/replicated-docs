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

You can include a Kubernetes installer with an application release. This ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed. We recommend this method.

To include the Kubernetes installer in the application release:

1. In the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** or click **Edit YAML** to edit an existing release.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your Installer YAML. Note the following requirements and guidelines for configuring the Installer:

    - You must include the KOTS add-on to provision the Replicated admin console. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the kURL documentation.

    - You must include the ECKO add-on, which performs maintenance tasks to ensure the cluster is healthy with minimal manual operation. See [ECKO Add-on](https://kurl.sh/docs/add-ons/ekco) in the kURL documentation.

    - To use Replicated snapshots, Velero must be installed on the cluster. Replicated recommends that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero.

    - You must select storage add-ons based on the app manager requirements and the unique requirements for your application. For more information, see [About Selecting Storage Add-ons](packaging-installer-storage).

    - Kubernetes installers that are included in releases must pin specific add-on versions and cannot pin `latest` versions or x-ranges (such as 1.2.x). Pinning specific versions ensures the most testable and reproducible installations.

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Copy the installer YAML from the kURL website and paste it into a new file in your release.

1. Click **Save**. This saves a draft that you can continue to edit until you promote it.

1. Click **Promote**. The release appears on the Releases page.

  To make changes after promoting, create a new release.

### Include Supporting Preflight Checks

> Introduced in Replicated app manager v1.74.0

One goal of including a Kubernetes installer in a release is to more tightly couple a particular release with a particular Kubernetes installer. If you want to encourage or ensure that your customers run the updated Kubernetes installer before upgrading to the corresponding release, a preflight check can be used to compare the installer that is included in the release against the installer that is currently deployed.

Since this is a preflight check, you can customize the message and URI for each outcome. For example, you can provide instructions on how to rerun the Kubernetes installer, or link to your documentation on how to do that. Additionally, you can make this a strict preflight check if you want to prevent customers from deploying a release before appropriately updating their Kubernetes installer. For more information about defining preflight checks and strict preflight checks, see [Define Preflight Checks](preflight-support-bundle).

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

You can create a Kubernetes installer and promote it to the same channel as your application release. This method creates the installer separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations from that channel, regardless of the application version, will use the currently promoted installer.

To create a separate Kubernetes installer:

1. From the [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

1. Edit the file. Note the following requirements and guidelines for configuring the Installer:

    - You must include the KOTS add-on to provision the Replicated admin console. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the kURL documentation.

    - You must include the ECKO add-on, which performs maintenance tasks to ensure the cluster is healthy with minimal manual operation. See [ECKO Add-on](https://kurl.sh/docs/add-ons/ekco) in the kURL documentation.

    - To use Replicated snapshots, Velero must be installed on the cluster. Replicated recommends that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero.

    - You must select storage add-ons based on the app manager requirements and the unique requirements for your application. For more information, see [About Selecting Storage Add-ons](packaging-installer-storage).

    For more information about creating a Kubernetes installer and the available add-ons, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    :::note
    Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer manifest, rather than use `latest` or x-ranges (such as 1.2.x). This ensures easily-reproducible versions across your customer installations.

    For example, pin `Kubernetes 1.23.0` in your manifest to ensure that version 1.23.0 of Kubernetes is installed.

    For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**. You can continue to edit your file until it is promoted.

1. Click **Promote**. In the Promote Release dialog that opens, edit the fields:

    <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Channel</td>
        <td>Select the channel where you want to promote the release. The defaults are Stable, Beta, and Unstable. If you created custom channels, they are listed here also.</td>
      </tr>
      <tr>
        <td>Version label</td>
        <td>Enter a version label.</td>
      </tr>
    </table>

1. Click **Promote** again. The installer appears on the Kubernetes Installer page.

  To make changes after promoting, create a new Kubernetes installer.

## Customize Host Preflight Checks

> Introduced in Kubernetes installer v2021.09.24-0

Default host preflight checks run automatically with both Kubernetes installer types to verify that infrastructure requirements are met for Kubernetes and Kubernetes installer add-ons.
You can customize the host preflight checks and include checks for your application. Host preflight checks help ensure successful installation and the ongoing health of the cluster. For more information about customizing host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).
