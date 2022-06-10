# Sharing License Files and Application Releases

This topic describes how to share license files and installation commands for current and previous versions of application releases with
your customers.

For more information about how customers use license files and installation commands to install your application,
see [Overview of Installing an Application with the App M](../enterprise/installing-overview).

## Share License Files

After you create a customer, assign the customer to a channel, and define the customer's
license file in the Replicated vendor portal, you can share the license file with your customer.

Your customer uploads the license file to the Replicated admin console when they
are installing your application.

To share a license file with a customer, you can do one of the following:
* Download the license file and send it to your customer directly. See
[Download and Share License Files](#download-and-share-license-files).
* Send your customer a link to the Replicated download portal where they can download
the license file. See [Share Licenses Files Through the Download Portal](#share-license-files-through-the-download-portal).

### Download and Share License Files

To download and share a license file:

1. In the [vendor portal](https://vendor.replicated.com), on the Customer page, click on the name of the customer.
1. Click the download license icon on the right side of the row.
1. In the Opening _filename_ dialog, use the Save File default and click **OK**.
    The file is saved to your Downloads folder by default.
1. Share the license file to your customer along with an installation command.

### Share License Files Through the Download Portal

To share the license file through the download portal:

1. In the [vendor portal](https://vendor.replicated.com), on the Customer page, click on the name of the customer.
1. In the Download portal section, click **Generate new password**.
1. Save the password that appears in the pop-up window. Your customer uses
this password to log in to the download portal.
1. Click **Copy URL** to copy the URL to the download portal to your clipboard.
This is the URL where your customer can access the download portal.
1. (Optional) Click **Visit download portal** to log in to the download portal
and preview your customer's experience.
1. Send the URL and password for the download portal to your customer.


## Share Current Release Versions

Installation commands are unique to each channel. Within each channel, there are installation commands for existing clusters and for Kubernetes installer-created clusters (embedded clusters).

To locate and share an installation command for a current release version:

1. In the [vendor portal](https://vendor.replicated.com), on the **Channels** page, find the channel to which the
customer is assigned.
1. Under **Install**:
   * Click **Existing Cluster** for installations on an existing Kubernetes cluster.
   * Click **Embedded Cluster** to install the application on a cluster created by the Kubernetes
   installer.
1. Copy the command that is displayed in the Install section, and send it to your customer along with their
license file.

## Share Previous Release Versions

You can share previous versions of application releases for existing clusters or Kubernetes installer-created clusters for troubleshooting purposes.

Typically you do not need to use these procedures for air gap installations because you choose which versions to upload or download.

### Use an Existing Cluster Installation Command

To use a previous application release version using an existing cluster installation command, run:

```
curl https://kots.io/install | bash
kubectl kots install APP-SLUG -s app-version-label=VERSION
```

Replace:

- `APP-SLUG` with the name of the application slug.
- `VERSION` with the version number.

**Example:**

```
curl https://kots.io/install | bash
kubectl kots install my-awesome-app -s app-version-label=3.1.0
```

### Include an Kubernetes Installer (Beta)

If you created a Kubernetes installer as part of your release, the version of the Kubernetes installer is included with the version of the application. This coupling makes it easy to provide users with a previous version of the installer and application, which is helpful for situations such as disaster recovery. For more information about Kubernetes installer methods, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

To use an previous release version that includes the installer manifest:

1. From the [vendor portal](https://vendor.replicated.com), select **Channel**.
1. Click **Release history** in the Latest Release pane for the channel you want to use.
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

### Use a Separate Kubernetes Installer

If you created a Kubernetes installer specification that is separate from your application release, you can use an previous version of the application but the installation command uses the currently promoted Kubernetes installer. In this case, you might not have tested the current Kubernetes installer specification with the earlier the application version. For more information about Kubernetes installer methods, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

To use a previous application release version with a separate Kubernetes installer, run:

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

## Additional Resources

[How to Package and Distribute an Application](distributing-workflow)
