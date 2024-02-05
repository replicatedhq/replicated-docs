# Sharing a Release

This topic describes how to share a release with your customers. It includes information about accessing the Replicated download portal, downloading license files and air gap bundles, and retrieving the installation commands from the Replicated vendor portal.

## About Sharing Releases

After you promote a release to a channel in the vendor portal, you can share the release with your customers. Your customers require the following assets to install your application for the first time with Replicated KOTS:

* A license file
* The installation command available in the vendor portal
* (Air Gap Only) The `.airgap` bundle for the release

Additionally, to support automated installations with the Replicated kots CLI, you must provide a template of the ConfigValues file for the release. For more information, see [Sharing a ConfigValues File](releases-configvalues).

You can either share these files and installation commands directly with a customer, or you can provide the customer with a link to the Replicated download portal. See [(Optional) Share Files through the Download Portal](#download-portal) below.

## (Optional) Share Files through the Download Portal {#download-portal}

To share a license file and air gap bundles with a customer, you can send the customer their unique link and password for the download portal. Users can log in to the download portal to access their license file and air gap bundles, if applicable.

For information about using a custom domain for the download portal, see [Using Custom Domains](custom-domains-using).

To share license files and air gap bundles through the download portal:

1. In the [vendor portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the customer.
1. In the Download portal section, click **Generate new password**.
1. Save the password that appears in the pop-up window. Your customer uses
this password to log in to the download portal.
1. Click **Copy URL** to copy the URL to the download portal to your clipboard.
This is the URL where your customer can access the download portal.
1. (Optional) Click **Visit download portal** to log in to the download portal
and preview your customer's experience.
1. Send the URL and password for the download portal to your customer.

## Download the Customer License

To install your application, your customer must provide a valid license file. This section describes how to download a license file for online or air gap installations so that you can share it with your customer.

For information about how to download customer licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

### Download Online Licenses

To download a license file for online installations:

1. In the [vendor portal](https://vendor.replicated.com), open the **Customers** page.
1. Click the download license icon on the right side of a customer row.

### Download Air Gap Licenses {#air-gap-license}

The air gap license option lets you install the `.airgap` bundle. Without this enabled, you cannot use the `.airgap` bundle.

To enable the air gap entitlement and download the updated license:

1.  In the [vendor portal](https://vendor.replicated.com), click **[App Name] > Customer > [Customer Name]**.

    ![Airgap Customers](/images/guides/kots/airgap-customers.png)

1. Click **License options > Airgap Download Enabled**, and **Save Changes**. This lets KOTS use the `.airgap` bundle.

    ![Airgap Download License](/images/guides/kots/airgap-download-license.png)

1. Click **Download license** to download the updated air gapped enabled YAML license.

## Get Installation Commands

Your customers install your application using an installation command that you share. The installation command is unique to the channel and the installation method for the application.

You can also share installation commands for specific versions of the application. This is useful when a customer needs to install a particular version or when you need to install and troubleshoot a version. Typically you do not need to share a specific version for air gap installations because the customer can select the application version in the download portal, and the correct assets are available automatically. For more information, see [(Optional) Share Files through the Download Portal](#download-portal) above.

For information about getting installation commands with the replicated CLI, see [channel inspect](/reference/replicated-cli-channel-inspect).

For information about getting installation commands with the Vendor API v3, see [Get install commands for a specific channel release](https://replicated-vendor-api.readme.io/reference/getchannelreleaseinstallcommands) in the Vendor API v3 documentation.

To get the installation commands from the vendor portal:

1. In the [vendor portal](https://vendor.replicated.com), on the **Channels** page, find the channel to which the customer is assigned.

1. Do one of the following:
   * **Share the latest release version**: Under **Install**, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.
   * **Share a specific release version**:
      1. Click **Release history**.
      1. Click **Install Commands** for a specific version. Then, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.

        ![Existing Cluster Command](/images/existing-cluster-command.png)


## Download Bundles for Air Gap Installations

To support air gap installations, you must share an air gap bundle in addition to the customer license.

For air gap installations in _embedded clusters_ provisioned by Replicated kURL, you must also share the kURL air gap bundle. The kURL bundle provides the open source components to run the cluster: Docker, Kubernetes, the admin console, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).

The kURL bundle is kept separate from the `.airgap` app bundle for the following reasons:

* The kURL bundle can get quite large, so this method lets you update your application with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the kURL components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

### Build and Download the Air Gap Bundle {#air-gap-bundle}

The `airgap` bundle contains application-specific files, such as Kubernetes YAML and Docker images. You can view its contents with `tar -zxvf`.

For information about building and downloading air gap bundles with the Vendor API v3, see [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild) and [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl) in the Vendor API v3 documentation.

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

### Download the kURL Bundle {#installer-bundle}

For embedded cluster installations, customers must provide a kURL air gap bundle in addition to the `.airgap` bundle and license file.

The kURL bundle is specific to the channel. Run the following commands to download the kURL bundle for the Stable channel or other channels.

**Download the kURL bundle for the Stable channel**

```shell
export REPLICATED_APP=YOUR_APP_SLUG
curl -LS https://k8s.kurl.sh/bundle/$REPLICATED_APP.tar.gz -o $REPLICATED_APP.tar.gz
```

Replace `YOUR_APP_SLUG` with the application slug. You can find the slug on the **Application Settings** page in the [vendor portal](https://vendor.replicated.com/apps). For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

**Download the kURL bundle for other channels**

To download the kURL bundle for channels other than Stable:

1. Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
1. Run the following command to get the air gap URL:

    ```shell
    replicated channel inspect CHANNEL_NAME
    ```
    Replace `CHANNEL_NAME` with the exact name of the channel, which can include uppercase letters or special characters, such as `Unstable` or `my-custom-channel`.

    The output shows valid URLs for all three installation types. Copy the `curl` command with the air gap URL.
