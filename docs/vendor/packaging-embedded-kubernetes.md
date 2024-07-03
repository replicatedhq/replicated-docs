# Creating a kURL Installer

This topic describes how to create a kURL installer spec to support installations with Replicated kURL.

For information about creating kURL Installers with the Replicated CLI, see [installer create](/reference/replicated-cli-installer-create).

## Overview

kURL installers define a custom Replicated kURL distribution. kURL uses the installer spec that you create to provision a cluster on a virtual machine (VM) or a bare metal server during installation.

## Create an Installer

There are two possible methods for creating a kURL installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#include-a-kubernetes-installer-in-a-release-beta">Include a kURL installer in an application release (Beta)</a></td>
    <td><p>The installer is included in an application release.</p><p>Couples the installer and the application in the release, making them easier to test and use together.</p><p>Helps with installing previous versions of the application because the installation command uses the installer that is associated with the application release.</p></td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-separate-kubernetes-installer">Create a separate kURL installer</a></td>
    <td><p>The installer is created and promoted to a channel separately from an application release.</p><p> The installation command uses the kURL installer that is currently promoted to the channel. When you install a previous application version with the currently promoted kURL installer, problems can occur because the application version might not have been tested with the current installer.</p></td>
  </tr>
</table>

### Include a kURL Installer in a Release (Beta)

You can include a kURL nstaller with an application release. This ensures that every installation uses the kURL installer that is associated with the version of the application that is being installed. We recommend this method.

To include the kURL installer spec in a release:

1. In the Replicated [Vendor Portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** or click **Edit YAML** to edit an existing release.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your Installer YAML. For guidance on which add-ons to choose, see [Requirements and Recommendations](#requirements-and-recommendations) below.

1. Copy the Installer YAML from the kURL website and paste it into a new file in your release.

1. Click **Save**. This saves a draft that you can continue to edit until you promote it.

1. Click **Promote**. The release appears on the Releases page.

  To make changes after promoting, create a new release.

### Create a Separate kURL Installer

You can create a kURL Installer and promote it to the same channel as your application release. This method creates the installer separately from the application release and only lets you have one active kURL installer for a channel at a time. All installations from that channel, regardless of the application version, will use the currently promoted installer.

To create a separate kURL installer:

1. From the [Vendor Portal](https://vendor.replicated.com), select your application and click **kURL Installers**.

1. On the **kURL Installers** page, click **Create kURL installer**.

1. Edit the file. For guidance on which add-ons to choose, see [Requirements and Recommendations](#requirements-and-recommendations) below.

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

1. Click **Promote** again. The installer appears on the kURL Installer page.

  To make changes after promoting, create a new kURL installer.

## kURL Add-on Requirements and Recommendations

Note the following requirements and guidelines for kURL add-ons:

- You must include the kURL KOTS add-on to provision the Replicated Admin Console. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the kURL documentation.

- To support the use of Replicated snapshots, Velero must be installed in the cluster. Replicated recommends that you include the Velero add-on in your kURL installer manifest so that your customers do not have to manually install Velero.

  :::note
  During installation, the Velero add-on automatically deploys internal storage for backups. The Velero add-on requires the MinIO or Rook add-on to deploy this internal storage. If you include the Velero add-on without either the MinIO add-on or the Rook add-on, installation fails with the following error message: `Only Rook and Longhorn are supported for Velero Internal backup storage`.
  :::

- You must select storage add-ons based on the Replicated KOTS requirements and the unique requirements for your application. For more information, see [About Selecting Storage Add-ons](packaging-installer-storage).

- kURL installers that are included in releases must pin specific add-on versions and cannot pin `latest` versions or x-ranges (such as 1.2.x). Pinning specific versions ensures the most testable and reproducible installations. For example, pin `Kubernetes 1.23.0` in your manifest to ensure that version 1.23.0 of Kubernetes is installed. For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.

  :::note
  For kURL installers that are _not_ included in a release, pinning specific versions of Kubernetes and Kubernetes add-ons in the kURL installer manifest is not required, though is highly recommended.
  :::

- After you configure a kURL installer, Replicated recommends that you customize host preflight checks to support the installation experience with kURL. Host preflight checks help ensure successful installation and the ongoing health of the cluster. For more information about customizing host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).

- For Installers included in a release, Replicated recommends that you define a preflight check in the release to ensure that the target kURL installer is deployed before the release is installed. For more information about how to define preflight checks, see [Defining Preflight Checks](preflight-defining).
   
   For example, the following preflight check uses the `yamlCompare` analyzer with the `kots.io/installer: "true"` annotation to compare the target kURL installer that is included in the release against the kURL installer that is currently deployed in the customer's environment. For more information about the `yamlCompare` analyzer, see [`yamlCompare`](https://troubleshoot.sh/docs/analyze/yaml-compare/) in the open source Troubleshoot documentation.

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
                  message: The kURL installer for this version differs from what you have installed. It is recommended that you run the updated kURL installer before deploying this version.
                  uri: https://kurl.sh/my-application
              - pass:
                  message: The kURL installer for this version matches what is currently installed.
    ```

    