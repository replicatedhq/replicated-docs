import DownloadPortal from "../partials/kots/_download-portal-about.mdx"

# Downloading Air Gap Bundles

This topic describes how to download air gap bundles for your application, the Replicated KOTS admin console, and the Replicated kURL installer.
## Overview

Air gap bundles are required to install applications in air gap environments with Replicated KOTS. Air gap bundles include the images required to install and run applications in an environment that has no outbound internet access.

Replicated provides the following types of air gap bundles:
* **`.airgap` bundle**: The `.airgap` bundle for a given release contains application-specific files, such as Kubernetes YAML files and Docker images.
* **`kotsadm.tar.gz` bundle**: The `kotsadm.tar.gz` air gap bundle includes the container images for the Replicated KOTS admin console. Required for existing cluster installations.
* **kURL bundle**: The kURL `.tar.gz` air gap bundle provides the open source components to run the cluster, includng Docker, Kubernetes, the KOTS admin console, the kURL image registry and a number of other [kURL add-ons](https://kurl.sh/add-ons). Required for embedded cluster installations with kURL. 

The following sections describe how to download each type of air gap bundle for a given release.

## Build and Download the Application Bundle {#air-gap-bundle}

This section describes how to build and download the application `.airgap` bundle from the vendor portal. For information about building and downloading `.airgap` bundles with the Vendor API v3, see [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild) and [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl) in the Vendor API v3 documentation.

To build and download the `.airgap` bundle for a release:

1. In the [vendor portal](https://vendor.replicated.com), go to **Channels**. On the target channel, click **Release history**.

    <img alt="Release history link on a channel card" src="/images/release-history-link.png" width="400px"/>

    [View a larger version of this image](/images/release-history-link.png)

1. On the **Release history** page, click **Build** to build the `.airgap` bundle.

    :::note
    By default, the Stable and Beta channels automatically build `.airgap` bundles on new releases.
    To edit this functionality on any channel, enable or disable the **Automatically create airgap builds for all releases in this channel** toggle in the channel settings.
    :::

    ![Build button on the Release history page](/images/release-history-build-airgap-bundle.png)

    [View a larger version of this image](/images/release-history-build-airgap-bundle.png)

1. After the `.airgap` bundle is built, click **Download Bundle**.

1. (Optional) View the contents of the downloaded bundle: 

     ```bash
     tar -zxvf AIRGAP_BUNDLE
     ```
     Where `AIRGAP_BUNDLE` is the filename for the `.airgap` bundle that you downloaded.

## Download the KOTS Admin Console Bundle

Air gap installations in existing clusters require the `kotsadm.tar.gz` air gap bundle, which includes the images for the KOTS admin console. The version of the `kotsadm.tar.gz` air gap bundle used must be compatible with the version of the application `.airgap` bundle.

The `kotsadm.tar.gz` air gap bundle for each version of KOTS is available for download on the [Releases](https://github.com/replicatedhq/kots/releases) page in the kots repository in GitHub.

You can also download the `kotsadm.tar.gz` air gap bundle from the Replicated download portal. For more information, see [Download Air Gap Bundles from the Download Portal](#download-air-gap-bundles-from-the-download-portal) below. 

## Download the kURL Bundle {#installer-bundle}

Air gap installations in embedded clusters created with Replicated kURL require the kURL `.tar.gz` air gap bundle, which includes the components required to run the cluster. The version of the kURL air gap bundle used must be compatible with the version of the application `.airgap` bundle.

The kURL bundle is kept separate from the `.airgap` app bundle for the following reasons:
* The kURL bundle can get quite large, so this method lets you update your application with a smaller bundle size.
* Whereas air gap bundles for an application often need to be rebuilt with each new release, kURL air gap bundles only need to be built when the underlying cluster components or add-ons must be updated.

The kURL bundle is specific to the channel where the target release is promoted.

#### Stable channel

To download the kURL air gap bundle for the Stable channel:

```shell
export REPLICATED_APP=APP_SLUG
curl -LS https://k8s.kurl.sh/bundle/$REPLICATED_APP.tar.gz -o $REPLICATED_APP.tar.gz
```

Where `APP_SLUG` is the unqiue slug for the application. You can find the slug on the **Application Settings** page in the [vendor portal](https://vendor.replicated.com/apps). For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

#### Other channels

To download the kURL bundle for channels other than Stable:

1. Run the following command to get the air gap URL:

    ```shell
    replicated channel inspect CHANNEL
    ```
    Replace `CHANNEL` with the exact name of the target channel, which can include uppercase letters or special characters, such as `Unstable` or `my-custom-channel`.

    The output shows valid URLs for all three installation types.
    
1. In the output of the command, copy the `curl` command with the air gap URL. Run the command to get the kURL air gap bundle.

## Download Air Gap Bundles from the Download Portal {#download-portal}

In addition to downloading air gap bundles using the vendor portal, replicated CLI, or Vendor API v3, you can also download air gap bundles from the Replicated download portal.

<DownloadPortal/>

To download air gap bundles from the download portal:

1. In the [vendor portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the target customer.

1. In the **Download portal** section, click **Generate new password**. Copy the password to your clipboard.

1. Click **Visit download portal** and log in using the password that you copied.

     The following is an example of the download portal for an air gap customer:

     ![download portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

     [View a larger version of this image](/images/download-portal-existing-cluster.png)

1. On the left side of the screen, select one of the following:
     * **Bring my own cluster**: View the air gap bundles required for existing cluster installations.
     * **Embedded cluster**: View the air gap bundles required for embedded cluster installations with kURL.

1. Under **Select application version**, use the dropdown to select the target application version. The download portal automatically makes the correct air gap bundles available for download based on the selected application version.

1. Click the download button to download each air gap bundle.     