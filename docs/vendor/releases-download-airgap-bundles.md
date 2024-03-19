# Downloading Air Gap Bundles

This topic describes how to download air gap bundles for your application, the Replicated KOTS admin console, and the Replicated kURL installer.
## Overview

Air gap bundles are required to install applications in air gap environments with Replicated KOTS. Air gap bundles include the images required to install and run applications in an environment that has no outbound internet access.

The following describes the air gap bundles that Replicated provides:
* **Application `.airgap` bundle**: The `.airgap` bundle for a given release contains application-specific files, such as Kubernetes YAML files and Docker images.
* **KOTS admin console `kotsadm.tar.gz` bundle**: The `kotsadm.tar.gz` air gap bundle includes the container images for the Replicated KOTS admin console. Required for existing cluster installations only.
* **kURL `.tar.gz` bundle**: The kURL `.tar.gz` air gap bundle provides the open source components to run the cluster, includng Docker, Kubernetes, the KOTS admin console, the kURL image registry and a number of other [kURL add-ons](https://kurl.sh/add-ons). Required for embedded cluster installations with kURL only. 

## Download the Application Air Gap Bundle {#air-gap-bundle}

This section describes how to build and download the application `.airgap` bundle from the vendor portal. For information about building and downloading `.airgap` bundles with the Vendor API v3, see [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild) and [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl) in the Vendor API v3 documentation.

To download the `.airgap` bundle for a release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **[App Name] > Channels > [Channel Name] > Release History**.

    ![Airgap Channels](/images/guides/kots/airgap-channels.png)

1. Click **Build** to build the `.airgap` bundle.

    :::note
    By default, the Stable and Beta channels automatically build `.airgap` bundles on new releases.
    To edit this functionality on any channel, enable or disable the **Automatically create airgap builds for all releases in this channel** toggle in the channel settings.
    :::

    ![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

1. Click **Download Bundle** to download the `.airgap` bundle.

1. (Optional) View the contents of the downloaded bundle: 

     ```bash
     tar -zxvf AIRGAP_BUNDLE
     ```
     Where `AIRGAP_BUNDLE` is the `.airgap` file that you downloaded.


## Download the KOTS Admin Console Bundle

Air gap installations in existing clusters require the `kotsadm.tar.gz` air gap bundle, which includes the images for the KOTS admin console.

The `kotsadm.tar.gz` air gap bundle for each version of KOTS is available for download on the [Releases](https://github.com/replicatedhq/kots/releases) page in the kots repository in GitHub.

## Download the kURL Bundle {#installer-bundle}

Air gap installations in embedded clusters created with Replicated kURL require the kURL `.tar.gz` air gap bundle, which includes the components required to run the cluster.

The kURL bundle is kept separate from the `.airgap` app bundle for the following reasons:
* The kURL bundle can get quite large, so this method lets you update your application with a smaller bundle size.
* Whereas air gap bundles for an application often need to be rebuilt with each new release, kURL air gap bundles only need to be built when the underlying cluster components or add-ons must be updated.

The kURL bundle is specific to the channel where the target release is promoted.

### Stable Channel

To download the kURL air gap bundle for the Stable channel:

```shell
export REPLICATED_APP=APP_SLUG
curl -LS https://k8s.kurl.sh/bundle/$REPLICATED_APP.tar.gz -o $REPLICATED_APP.tar.gz
```

Where `APP_SLUG` is the unqiue slug for the application. You can find the slug on the **Application Settings** page in the [vendor portal](https://vendor.replicated.com/apps). For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

### Other Channels

To download the kURL bundle for channels other than Stable:

1. Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
1. Run the following command to get the air gap URL:

    ```shell
    replicated channel inspect CHANNEL
    ```
    Replace `CHANNEL` with the exact name of the target channel, which can include uppercase letters or special characters, such as `Unstable` or `my-custom-channel`.

    The output shows valid URLs for all three installation types.
    
1. In the output of the command, copy the `curl` command with the air gap URL. Run the command to get the kURL air gap bundle.