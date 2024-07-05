import Installers from "../partials/kurl/_installers.mdx"

# Creating a kURL Installer

This topic describes how to create a kURL installer spec in the Replicated Vendor Portal to support installations with Replicated kURL.

For information about creating kURL installers with the Replicated CLI, see [installer create](/reference/replicated-cli-installer-create).

## Overview

<Installers/>

For more information about kURL, see [Introduction to kURL](kurl-about).

## Create an Installer

To distribute a kURL installer alongside your application, you can include the installer as a manifest file within a given release or promote the installer to a channel:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#release">Include the installer in a release (Beta)</a></td>
    <td><p>The installer is included as a manifest file in a release. This allows you to couple the installer with a particular release, making them easier to test and use together.</p></td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#channel">Promote the installer to a channel</a></td>
    <td><p>The installer is promoted to a channel. All releases on the channel use the kURL installer that is currently promoted. There can be only one active kURL installer on each channel.</p><p>This method can cause problems because it is possible that not all releases on the channel have been tested with the active kURL installer.</p></td>
  </tr>
</table>

### Include an Installer in a Release (Beta) {#release}

To include the kURL installer in a release:

1. In the [Vendor Portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create Release** to create a new release, or click **Edit YAML** to edit an existing release.

   The YAML editor opens.

1. Create a new file in the release with `apiVersion: cluster.kurl.sh/v1beta1` and `kind: Installer`:

    ```yaml
    apiVersion: cluster.kurl.sh/v1beta1
    kind: Installer
    metadata:
      name: "latest"
    spec:
    
    ```

1. Edit the file to customize the installer. For guidance on which add-ons to choose, see [ kURL Add-on Requirements and Recommendations](#requirements-and-recommendations) below.

   You can also go to the landing page at [kurl.sh](https://kurl.sh/) to build an installer then copy the provided YAML:

   <img alt="kurl.sh landing page" src="/images/kurl-build-an-installer.png" width="650px"/>

   [View a larger version of this image](/images/kurl-build-an-installer.png)

1. Click **Save**. This saves a draft that you can continue to edit until you promote it.

1. Click **Promote**.

   To make changes after promoting, create a new release.  

### Promote the Installer to a Channel {#channel}

To promote a kURL installer to a channel:

1. In the [Vendor Portal](https://vendor.replicated.com), click **kURL Installers**.

1. On the **kURL Installers** page, click **Create kURL installer**.

   <img alt="vendor portal kurl installers page" src="/images/kurl-installers-page.png" width="650px"/>

   [View a larger version of this image](/images/kurl-installers-page.png)

1. Edit the file to customize the installer. For guidance on which add-ons to choose, see [Requirements and Recommendations](#requirements-and-recommendations) below.

   You can also go to the landing page at [kurl.sh](https://kurl.sh/) to build an installer then copy the provided YAML:

   <img alt="kurl.sh landing page" src="/images/kurl-build-an-installer.png" width="650px"/>

   [View a larger version of this image](/images/kurl-build-an-installer.png)

1. Click **Save installer**. You can continue to edit your file until it is promoted.

1. Click **Promote**. In the **Promote Installer** dialog that opens, edit the fields:

    <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Channel</td>
        <td>Select the channel or channels where you want to promote the installer.</td>
      </tr>
      <tr>
        <td>Version label</td>
        <td>Enter a version label for the installer.</td>
      </tr>
    </table>

1. Click **Promote** again. The installer appears on the **kURL Installers** page.

   To make changes after promoting, create and promote a new installer.

## kURL Add-on Requirements and Recommendations {#requirements-and-recommendations}

KURL includes several add-ons for networking, storage, ingress, and more. The add-ons that you choose depend on the requirements for KOTS and the unique requirements for your application. For more information about each add-on, see the open source [kURL documentation](https://kurl.sh/docs/introduction/).

When creating a kURL installer, consider the following requirements and guidelines for kURL add-ons:

- You must include the KOTS add-on to support installation with KOTS and provision the KOTS Admin Console. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the kURL documentation.

- To support the use of KOTS snapshots, Velero must be installed in the cluster. Replicated recommends that you include the Velero add-on in your kURL installer so that your customers do not have to manually install Velero.

  :::note
  During installation, the Velero add-on automatically deploys internal storage for backups. The Velero add-on requires the MinIO or Rook add-on to deploy this internal storage. If you include the Velero add-on without either the MinIO add-on or the Rook add-on, installation fails with the following error message: `Only Rook and Longhorn are supported for Velero Internal backup storage`.
  :::

- You must select storage add-ons based on the KOTS requirements and the unique requirements for your application. For more information, see [About Selecting Storage Add-ons](packaging-installer-storage).

- kURL installers that are included in releases must pin specific add-on versions and cannot pin `latest` versions or x-ranges (such as 1.2.x). Pinning specific versions ensures the most testable and reproducible installations. For example, pin `Kubernetes 1.23.0` in your manifest to ensure that version 1.23.0 of Kubernetes is installed. For more information about pinning Kubernetes versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.

  :::note
  For kURL installers that are _not_ included in a release, pinning specific versions of Kubernetes and Kubernetes add-ons in the kURL installer manifest is not required, though is highly recommended.
  :::

- After you configure a kURL installer, Replicated recommends that you customize host preflight checks to support the installation experience with kURL. Host preflight checks help ensure successful installation and the ongoing health of the cluster. For more information about customizing host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).

- For installers included in a release, Replicated recommends that you define a preflight check in the release to ensure that the target kURL installer is deployed before the release is installed. For more information about how to define preflight checks, see [Defining Preflight Checks](preflight-defining).
   
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

    