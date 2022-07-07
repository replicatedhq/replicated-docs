# Sharing License Files and Application Releases

This topic describes how to share license files and installation commands for currently and previously promoted versions of application releases with
your customers.

For more information about how customers use license files and installation commands to install your application,
see [Overview of Installing an Application with the App Manager](../enterprise/installing-overview).

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


## Share Currently Promoted Releases

Installation commands are unique to each channel. Within each channel, there are installation commands for existing clusters and for Kubernetes installer provisioned clusters (embedded clusters).

To locate and share an installation command for the most recently promoted release:

1. In the [vendor portal](https://vendor.replicated.com), on the **Channels** page, find the channel to which the
customer is assigned.
1. Under **Install**:
   * Click **Existing Cluster** for installations on an existing Kubernetes cluster.
   * Click **Embedded Cluster** to install the application on a cluster created by the Kubernetes
   installer.
1. Copy the command that is displayed in the Install section, and send it to your customer along with their
license file.

## Share Specific Release Versions

You can share specific versions of application releases for existing clusters or Kubernetes installer provisioned clusters. This is useful when a customer needs to install a particular version or when you need to install and troubleshoot a specific version.

Typically you do not need to use these procedures for air gap installations because the application version can be selected in the download portal, and the correct assets are available automatically.

### Install on an Existing Cluster

To install a specific application version on an existing cluster:

From the [vendor portal](https://vendor.replicated.com), select **Channels**.
1. Click **Release history** for the channel that you want to use.
1. Click **Install Commands** for a specific version. From the Existing Cluster tab, click **Copy command** and share it with your customer.

  ![Existing Cluster Command](/images/existing-cluster-command.png)

### Install with an Included Kubernetes Installer (Alpha)

If you included a Kubernetes installer as part of your application release, this coupling makes it easy to provide users with an installation command that uses the correct version of both the installer and the application. For more information about methods for creating Kubernetes installers, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

To install a specific application version that includes a Kubernetes installer in the application release:

1. From the [vendor portal](https://vendor.replicated.com), select **Channels**.
1. Click **Release history** for the channel that you want to use.
1. Click **Install Commands** for a specific version. From the Embedded Cluster tab, click **Copy command** and share it with your customer.

  ![Existing Cluster Command](/images/embedded-cluster-command.png)

### Install with a Separate Kubernetes Installer

When you share an installation command for a previous application version that uses a separate Kubernetes installer, the installation command always uses the currently promoted Kubernetes installer. In this case, you might not have tested the latest Kubernetes installer with the earlier application version. For more information about Kubernetes installer methods, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

To install a specific application version with a separate Kubernetes installer, run:

```
curl -sSL https://k8s.kurl.sh/APP_SLUG-CHANNEL | sudo bash -s app-version-label=VERSION
```

Replace:

- `APP_SLUG` with the name of the application slug.
- `CHANNEL` with the name of the channel.
- `VERSION` with the version number.


**Example:**

```
curl -sSL https://k8s.kurl.sh/mygoodapplication-beta | sudo bash -s app-version-label=3.1.0
```

## Additional Resources

[How to Package and Distribute an Application](distributing-workflow)
