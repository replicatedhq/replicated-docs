# Creating a Kubernetes Installer

This topic describes how to create a Kubernetes installer specification to support embedded cluster installations with Replicated kURL.

For information about creating installers with the replicated CLI, see [installer create](/reference/replicated-cli-installer-create).

## Overview

You can configure a Kubernetes installer specification for Replicated kURL to define a custom Kubernetes distribution. Your customers can then run an installation script to provision a cluster on a virtual machine (VM) or a bare metal server based on the specification that you created. This allows customers who do not have an existing cluster to install Replicated KOTS and install your application without needing to provision a cluster themselves.

## Create an Installer

There are two possible methods for creating a Kubernetes installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#include-a-kubernetes-installer-in-an-application-release-beta">Include a Kubernetes installer in an application release (Beta)</a></td>
    <td><p>The installer is included in an application release.</p><p>Couples the installer and the application in the release, making them easier to test and use together.</p><p>Helps with installing previous versions of the application because the installation command uses the installer that is associated with the application release.</p></td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-separate-kubernetes-installer">Create a separate Kubernetes installer</a></td>
    <td><p>The installer is created and promoted to a channel separately from an application release.</p><p> The installation command uses the Kubernetes installer that is currently promoted to the channel. When you install a previous application version with the currently promoted Kubernetes installer, problems can occur because the application version might not have been tested with the current installer.</p></td>
  </tr>
</table>

### Include a Kubernetes Installer in a Release (Beta)

You can include a Kubernetes installer with an application release. This ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed. We recommend this method.

To include the Kubernetes installer specification in a release:

1. In the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** or click **Edit YAML** to edit an existing release.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your Installer YAML. For guidance on which add-ons to choose, see [Requirements and Recommendations](#requirements-and-recommendations) below.

1. Copy the installer YAML from the kURL website and paste it into a new file in your release.

1. Click **Save**. This saves a draft that you can continue to edit until you promote it.

1. Click **Promote**. The release appears on the Releases page.

  To make changes after promoting, create a new release.

### Create a Separate Kubernetes Installer

You can create a Kubernetes installer and promote it to the same channel as your application release. This method creates the installer separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations from that channel, regardless of the application version, will use the currently promoted installer.

To create a separate Kubernetes installer:

1. From the [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

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

1. Click **Promote** again. The installer appears on the Kubernetes Installer page.

  To make changes after promoting, create a new Kubernetes installer.

## Requirements and Recommendations

Note the following requirements and guidelines for Kubernetes installers:

- You must include the kURL KOTS add-on to provision the Replicated admin console. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the kURL documentation.

- To support the use of Replicated snapshots, Velero must be installed on the cluster. Replicated recommends that you include the Velero add-on in your Kubernetes installer manifest so that your customers do not have to manually install Velero.

  :::note
  During installation, the Velero add-on automatically deploys internal storage for backups. The Velero add-on requires the MinIO or Rook add-on to deploy this internal storage. If you include the Velero add-on without either the MinIO add-on or the Rook add-on, installation fails with the following error message: `Only Rook and Longhorn are supported for Velero Internal backup storage`.
  :::

- You must select storage add-ons based on the Replicated KOTS requirements and the unique requirements for your application. For more information, see [About Selecting Storage Add-ons](packaging-installer-storage).

- Kubernetes installers that are included in releases must pin specific add-on versions and cannot pin `latest` versions or x-ranges (such as 1.2.x). Pinning specific versions ensures the most testable and reproducible installations. For example, pin `Kubernetes 1.23.0` in your manifest to ensure that version 1.23.0 of Kubernetes is installed. For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.

  :::note
  For Kubernetes installers that are _not_ included in a release, pinning specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer manifest is not required, though is highly recommended.
  :::

- (Introduced in kURL v2021.09.24-0) After you configure a Kubernetes installer, Replicated recommends that you customize host preflight checks to support the installation experience with kURL. Host preflight checks help ensure successful installation and the ongoing health of the cluster. For more information about customizing host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).

- (Introduced in Replicated KOTS v1.74.0) For Installers included in a release, Replicated recommends that you define a preflight check in the release to ensure that the target Kubernetes installer is deployed before the release is installed. For more information about how to define preflight checks, see [Defining Preflight Checks](preflight-defining).
   
   For example, the following preflight check uses the `yamlCompare` analyzer with the `kots.io/installer: "true"` annotation to compare the target Kubernetes installer that is included in the release against the Kubernetes installer that is currently deployed in the customer's environment. For more information about the `yamlCompare` analyzer, see [`yamlCompare`](https://troubleshoot.sh/docs/analyze/yaml-compare/) in the open source Troubleshoot documentation.

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

    