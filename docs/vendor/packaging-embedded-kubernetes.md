# Creating a Kubernetes Installer and Using Earlier Release Versions

This topic describes creating a Replicated Kubernetes installer to distribute your application without an existing cluster and using earlier versions of the application for situations such as disaster recovery.

## About installing an application without an existing cluster

When you package and release your application with Replicated, your customers can
install the application without an existing Kubernetes cluster. You use the Replicated Kubernetes installer to provision a new cluster on a virtual machine (VM). This allows customers who do not have an existing cluster to install your application without provisioning a new cluster themselves.

There are two possible methods for creating a Kubernetes installer:

<table>
  <tr>
    <th width="30%">Method</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-in-the-release-application">Included with the release (Beta)</a></td>
    <td>The installer manifest file is added to the application release. <br></br><br></br> Couples the installer and the application in the release, making them easier to test and use together. <br></br><br></br> Helps with installing previous versions of the application because the installer associated with the application release is used.</td>
  </tr>
  <tr>
    <td><a href="packaging-embedded-kubernetes#create-a-kubernetes-installer-specification">As a separate specification</a></td>
    <td>The installer specification is created separately from the application release. <br></br><br></br> This option uses the Kubernetes installer that is currently promoted to the channel. Using a separate installer specification can pose problems when installing previous versions of the application, since previous versions may not be tested with the currently promoted installer.</td>
  </tr>
</table>

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

### Create a Kubernetes Installer in the Application Release (Beta)

You can create a Kubernetes installer manifest as part of the application release. This allows multiple Kubernetes installers to be active for a channel at a time, and it ensures that every installation uses the Kubernetes installer that is associated with the version of the application that is being installed. We recommend that you use this method, and it is the default method.

To add the Kubernetes installer manifest to the application release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), select **Releases > Create Release**.

  The YAML editor opens.

1. From the landing page at [kurl.sh](https://kurl.sh/), configure the add-ons and options for your installer YAML. You must include the KOTS add-on to provision the Replicated admin console. For more information about creating a Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

1. Create a new file in the YAML editor in the vendor portal. Copy the installer YAML content from [kurl.sh](https://kurl.sh) and paste it in this new file.

    :::note
       Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification, rather than `latest` versions. This ensures easily-reproducible versions across your customer installations.

       For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

       For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Save and promote the release to your development environment to test your changes.

### Create a Kubernetes Installer Specification

You can create a Kubernetes installer specification file and promote it to the same channel as your application release. This method creates the specification separately from the application release and only lets you have one active Kubernetes installer for a channel at a time. All installations, regardless of the application version, will use the currently promoted installer.

To create a Kubernetes installer specification:

1. From the [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.

1. On the **Kubernetes Installer** page, click **Create Kubernetes installer**.

1. Edit the file. You must include the KOTS add-on to provision the Replicated admin console. For information about creating a Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL open source documentation.

    :::note
       Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification, rather than `latest` versions. This ensures easily-reproducible versions across your customer installations.

       For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.

       For more information about pinning versions, see [Versions](https://kurl.sh/docs/create-installer/#versions) and [Versioned Releases](https://kurl.sh/docs/install-with-kurl/#versioned-releases) in the kURL open source documentation.
    :::

1. Click **Save installer**.

1. Save and promote a release to your development environment to test your changes.

## About Using Previous Release Versions

There are two methods of using previous versions of the application, depending on which method of Kubernetes installer you have used: including the installer in the release or creating a separate installer specification.

### Use Previous Release Versions that Includes the Kubernetes Installer (Beta)

If you created a Kubernetes installer as part of your release, which is the default method, the version of the Kubernetes installer is tied to the version of the application. This makes it easy to provide users with a previous version of the installer and application, which is helpful for situations such as disaster recovery.

To use an previous release version that includes the installer manifest:

1. From the [vendor portal](https://vendor.replicated.com), select **Channel**.
1. Click **Version History** next to Latest Release in the channel you want to use.
1. Copy the installation command for the version that you want to use and share it with your customer.

    - The curl command shows the application version with name of the channel if it is not the default channel.

      **Example:**
      ```
      curl -sSL https://k8s.kurl.sh/APP-SLUG-beta-2.3.30 | sudo bash
      ```

    - If you are using the default channel, the channel name is not shown in the command.

      **Example:**

      ```
      curl -sSL https://k8s.kurl.sh/APP-SLUG-2.3.30 | sudo bash
      ```

  In both examples, replace `APP-SLUG` with the name of your application.

### Use Previous Release Versions with a Separate Kubernetes Installer

If you created a Kubernetes installer specification that is separate from your application release, you can use an previous version of the application but the installation command uses the currently promoted Kubernetes installer. In this case, you might not have tested the current Kubernetes installer specification with the earlier the application version.

To use a previous application release version and a separate Kubernetes installer, run:

```
curl -sSL https://k8s.kurl.sh/APP-SLUG-CHANNEL | sudo bash -s app-version-label=VERSION
```

Replace:

- `APP-SLUG` with the name of the application slug.
- `CHANNEL` with the name of the channel.
- `VERSION` with the version number.


**Example:**

```
curl -sSL https://k8s.kurl.sh/mygoodapplication-beta | sudo bash -s app-version-label=3.1.0
```
