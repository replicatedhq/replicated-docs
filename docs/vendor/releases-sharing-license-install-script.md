# Sharing License Files and Releases

This topic describes how to share license files and installation commands for any promoted application version with
your customers.

For more information about how customers use license files and installation commands to install your application,
see [Overview of Installing an Application with the App Manager](../enterprise/installing-overview).

## Download the Customer License

To install your application, your customer must upload a valid license file. This section describes how to download a license file for online or air gap installations so that you can share it with your customer.

### Download Online Licenses

To download a license file for online installations:

1. In the [vendor portal](https://vendor.replicated.com), open the Customers page.
1. Click the download license icon on the right side of a customer row.

### Download Air Gap Licenses {#air-gap-license}

The air gap license option lets you install the `.airgap` bundle. Without this enabled, you cannot use the `.airgap` bundle.

To enable the air gap entitlement and download the updated license:

1. Click **[App Name] > Customer > [Customer Name]**.

  ![Airgap Customers](/images/guides/kots/airgap-customers.png)

1. Click **License options > Airgap Download Enabled**, and **Save Changes**. This lets the app manager use the `.airgap` bundle.

  ![Airgap Download License](/images/guides/kots/airgap-download-license.png)

1. Click **Download license** to download the updated air gapped enabled YAML license.

## Share Installation Commands

Your customers install your application using an installation command that you share. The installation command is unique to the channel and the installation method for the application.

You can also share installation commands for specific versions of the application. This is useful when a customer needs to install a particular version or when you need to install and troubleshoot a version.

Typically you do not need to share a specific version for air gap installations because the customer can select the application version in the download portal, and the correct assets are available automatically. For more information, see [Share Files through the Download Portal](#download-portal).

To view the installation commands that you can share with customers:

1. In the [vendor portal](https://vendor.replicated.com), on the **Channels** page, find the channel to which the customer is assigned.

1. Do one of the following:
   * **Share the latest release version**: Under **Install**, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.
   * **Share a specific release version**:
      1. Click **Release history**.
      1. Click **Install Commands** for a specific version. Then, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.

        ![Existing Cluster Command](/images/existing-cluster-command.png)

## Download Bundles for Air Gap Installations

To support air gap installations, you must share an air gap bundle in addition to the customer license.

For air gap installations on Kubernetes installer provisioned clusters, you must also share the Kubernetes installer air gap bundle. The Kubernetes installer bundle provides the open source components to run the cluster: Docker, Kubernetes, the admin console, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).

The Kubernetes installer bundle is kept separate from the `.airgap` app bundle for the following reasons:

* The Kubernetes installer bundle can get quite large, so this method lets you update your application with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the Kubernetes installer components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

### Build and Download the Air Gap Bundle {#air-gap-bundle}

The `airgap` bundle contains application-specific files, such as Kubernetes YAML and Docker images. You can view its contents with `tar -zxvf`.

To download the `.airgap` bundle:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **[App Name] > Channels > [Channel Name] > Release History**.

  ![Airgap Channels](/images/guides/kots/airgap-channels.png)

1. Click **Build** to build the `.airgap` bundle.

    :::note
    By default, the Stable and Beta channels automatically build `.airgap` bundles on new releases.
    To edit this functionality on any channel, enable or disable the **Automatically create airgap builds for all releases in this channel** toggle in the channel settings.
    :::

    ![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

1. Click **Download Bundle** to download the `.airgap` bundle. Keep this file on your local laptop to access the Replicated admin console in later steps.

### Download the Kubernetes Installer Bundle {#installer-bundle}

For installations on clusters created by the Kubernetes installer (embedded clusters), customers must provide a Kubernetes installer air gap bundle in addition to the `.airgap` bundle and license file.

The Kubernetes installer bundle is specific to the channel. Run the following commands to download the Kubernetes installer bundle for the Stable channel or other channels.

**Download the Kubernetes installer bundle for the Stable channel**

```shell
export REPLICATED_APP=YOUR_APP_SLUG
curl -LS https://k8s.kurl.sh/bundle/$REPLICATED_APP.tar.gz -o $REPLICATED_APP.tar.gz
```

Replace `YOUR_APP_SLUG` with the application slug. You can find the slug on the Application Settings page in the [vendor portal](https://vendor.replicated.com/apps).

**Download the Kubernetes installer bundle for other channels**

To download the Kubernetes installer bundle for channels other than Stable:

1. Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
1. Run the following command to get the air gap URL:

    ```shell
    replicated channel inspect CHANNEL_NAME
    ```
    Replace `CHANNEL_NAME` with the exact name of the channel, which can include uppercase letters or special characters, such as `Unstable` or `my-custom-channel`.

    The output shows valid URLs for all three installation types. Copy the `curl` command with the air gap URL.

## Share Files through the Download Portal {#download-portal}

To share a license file and any required air gap bundles with a customer, you can do the following:

* Download the license file and air gap bundles and send them to your customer directly.
* Send your customer a link to the Replicated download portal where they can download
the license file and bundles.

To share the license file and any air gap bundles through the download portal:

1. In the [vendor portal](https://vendor.replicated.com), on the Customer page, click on the name of the customer.
1. In the Download portal section, click **Generate new password**.
1. Save the password that appears in the pop-up window. Your customer uses
this password to log in to the download portal.
1. Click **Copy URL** to copy the URL to the download portal to your clipboard.
This is the URL where your customer can access the download portal.
1. (Optional) Click **Visit download portal** to log in to the download portal
and preview your customer's experience.
1. Send the URL and password for the download portal to your customer.

## Related Topics

- [How to Package and Distribute an Application](distributing-workflow)
- [Creating a Kubernetes Installer](packaging-embedded-kubernetes)
