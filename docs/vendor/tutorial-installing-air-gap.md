# Installing in an Air Gapped Environment

This tutorial shows how to install the Replicated app manager in an air gapped environment.

The tutorial assumes that you have already completed one of the quick start tutorials and set up a non-air gapped cluster. See:
* [Installing without an Existing Cluster](tutorial-installing-without-existing-cluster)
* [Installing with an Existing Cluster](tutorial-installing-with-existing-cluster)
* [Managing Releases with the CLI](tutorial-installing-with-cli)

This content is broken into a few sections:

- [Downloading the air gap bundle and license](#download-the-air-gap-bundle-and-license)
- [Kubernetes installer-created cluster](#kubernetes-installer-created-cluster)
- [Icon in Base64](#icon-in-base64)
- [Upload the air gap bundle and license](#upload-the-air-gap-bundle-and-license)
- [Automatically build bundles](#automatically-build-bundles)
- [Upload a new bundle](#upload-a-new-bundle)

## Downloading the Air Gap Bundle and License

For [Kubernetes installer](#kubernetes-installer-created-cluster) clusters, you will need the following:

- **`.airgap` bundle**: This file contains application-specific files, such as Kubernetes YAML and Docker images.
You can view its contents with `tar -zxvf`.

- **Air gap license**: The air gap license option lets you install the `.airgap` bundle.
Without this enabled, you cannot use the `.airgap` bundle.

This section explains how to download the `.airgap` bundle and license from the Replicated [vendor portal](https://vendor.replicated.com). You will upload these files later in the installation process.

### Download the Air Gap Bundle

To download the `.airgap` bundle:

1. From the vendor portal, click **[App Name]** > **Channels** > **[Channel Name]** > **Release History**.

  ![Airgap Channels](/images/guides/kots/airgap-channels.png)

1. Click **Build** to build the `.airgap` bundle.

  ![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

1. Click **Download Bundle** to download the `.airgap` bundle.

1. Keep this file on your local laptop to access the Replicated admin console in later steps.

### Download the Air Gap License

To download the air gap license:

1. Click **[App Name]** > **Customer** > **[Customer Name]**.

  ![Airgap Customers](/images/guides/kots/airgap-customers.png)

1. Click **License options** > **Airgap Download Enabled**. and **Save Changes**. This allows the the app manager to use the `.airgap` bundle.

  ![Airgap Download License](/images/guides/kots/airgap-download-license.png)

  When the customer is modified, the license changes along with the new air gapped entitlement, so you must download the updated license with the new entitlements.

1. Click **Download license** to download the air gapped enabled YAML license.

## Kubernetes Installer-created Cluster

Clusters created by the Kubernetes installer (embedded clusters) need a third file, in addition to the `.airgap` bundle and license file.
The Kubernetes installer bundle provides the open source components to run the cluster: Docker, Kubernetes, the admin console, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).
The Kubernetes installer bundle is kept separate from the `.airgap` app bundle for the following reasons:

* The Kubernetes installer bundle can get quite large, so this method lets you update your application with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the Kubernetes installer components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

### Install the Kubernetes Installer Bundle

To install the Kubernetes installer bundle:

1.  Run one of the following commands to download this bundle onto a jump box that has internet access:

    * To download the Kubernetes installer bundle for the `Stable` channel:

      ```shell
      export REPLICATED_APP=<app_slug>
      curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}.tar.gz -o ${REPLICATED_APP}.tar.gz
      ```

      * To download the Kubernetes installer bundle for all other channels, use the suffix `-<channel_name>`:

      ```shell
      export REPLICATED_APP=<app_slug>
      export REPLICATED_CHANNEL=<channel_name>
      curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}-${REPLICATED_CHANNEL}.tar.gz -o ${REPLICATED_APP}-{REPLICATED_CHANNEL}.tar.gz
        ```

1. Run `scp` for the `.tar.gz` file from the jumpbox to the air gapped node:

    ```shell
    export AIRGAP_PRIVATE_IP=<airgap_private_ip>
    scp ${REPLICATED_APP}.tar.gz ${AIRGAP_PRIVATE_IP}:~
    ```

1. Use SSH to access the air gapped node and extract the bundle:
  ```shell
  export REPLICATED_APP=<app_slug>
  tar -zxvf ${REPLICATED_APP}.tar.gz
  ```

1. Install the bundle with `airgap` flag, which helps ensure that the Kubernetes installer only pulls images from local source and not from online:

  ```shell
  cat install.sh | sudo bash -s airgap
  ```

1. After the installation completes, save the output at the end.

1. Access the admin console using `http://<airgap_private_ip>:8800` to continue the installation from the browser to upload the `.airgap` bundle and license file.

  If you do not have direct access to the air gap private IP, you can access it using an SSH tunnel using the jump box public IP. After the tunnel is up, you can access the admin console using `http://localhost:8800`. On your local workstation run the following commands:

  ```shell
  export AIRGAP_PRIVATE_IP=<airgap_private_ip>
  export JUMPBOX_PUBLIC_IP=<jumpbox_public_ip>
  ssh -N -L 8800:${AIRGAP_PRIVATE_IP}:8800 ${JUMPBOX_PUBLIC_IP}
  ```


## Icon in Base64

In an air gapped environment, if the `icon` uses a URL, it would not be able to display because the image is fetched at the time the page is rendered. You must convert the `png` file into `base64` to be used for the image.

### Converting icon to Base64

Fetch the image using `curl`, then use `base64` to encode the image:

```shell
curl -LSs https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png | base64
```
You can verify this works in your browser by prefixing the stream with `data:image/png;base64,<encoded_base64_stream>` and putting it in the address bar, where the URL would typically go.

### Using the Encoded icon

After the base64 encoded string is copied, replace the `icon` URL with the base64 encoded string and prefix it with `data:image/png;base64,<encoded_base64_stream>`, similar to when you previously accessed it using the browser:

```yaml
spec:
  icon: data:image/png;base64,<encoded_base64_stream>
```

## Upload the Air Gap Bundle and License

After you have the open source components installed with the [Kubernetes installer](/vendor/guides/airgapped-cluster/#embedded-kurl-cluster), log in to the admin console using the password from the installation.


### Upload the Air Gap License

* Upload the license YAML file from the [previous step](#download-air-gap-bundle-and-license), which enables you to upload the `.airgap` bundle in the following step.

### Upload the Air Gap Bundle

* You are prompted to upload the `.airgap` bundle from the [previous step](#download-air-gap-bundle-and-license).

![Airgap Upload Bundle](/images/guides/kots/airgap-upload-bundle.png)

After the bundle is uploaded, the preflights checks begin.
After all of the checks pass, the application is automatically deployed.

* * *

## Automatically Build Bundles

When creating new releases, you must click **Build** every time a new release is made.
By default, only Stable and Beta channels automatically build `.airgap` bundles on new releases.
For other channels, you must enable the flag to build bundles automatically.

* To enable the flag, go to **[App Name]** -> **Channels** -> **[Channel Name]**, and click the **Edit** channel icon.

* Enable **Automatically create airgap builds for all releases in this channel**.

* Click **Save**.

![Airgap Automatic Builds](/images/guides/kots/airgap-automatic-builds.png)

* * *

## Upload a New Bundle

When automatic builds are enabled, you can push a release and wait a few minutes for the bundle to build (depending on the number of images). Then download the new `.airgap` bundle to make an update to your application.

After the first installation, subsequent releases can be uploaded from the Version History tab.
Download a new bundle following the [previous step](#download-air-gap-bundle-and-license).

### Upload a New Version

* Click on **Upload new version** to upload the new bundle. As the bundle is uploaded you can see the progress.

![Airgap Upload New Version](/images/guides/kots/airgap-upload-new-version.png)

### Deploy a New Version

* After upload has finished, click on **Deploy** to apply the new version.

![Airgap Upload Deploy](/images/guides/kots/airgap-upload-deploy.png)
