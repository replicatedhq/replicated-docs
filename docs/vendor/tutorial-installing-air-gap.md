# Installing in an Air Gapped Environment

This advanced guide shows how to install the Replicated app manager in an air gapped environment.
This guide assumes that you have already completed one of the [Getting Started Guides](/vendor/guides/#getting-started) to set up a non-airgapped cluster.

It is broken into a few sections:

- [Download air gap bundle and license](#download-airgap-bundle-and-license)
- [Kubernetes installer-created cluster](#embedded-kurl-cluster)
- [Icon in Base64](#icon-in-base64)
- [Upload air gap bundle and license](#upload-airgap-bundle-and-license)
- [Automatically build bundles](#automatically-build-bundles)
- [Upload new bundle](#upload-new-bundle)

## Download air gap bundle and license

For [Kubernetes installer](/vendor/guides/airgapped-cluster/#embedded-kurl-cluster) clusters, you will need the following:

**`.airgap` bundle**: This file contains app specific files like Kubernetes YAML and Docker images.
You can view its contents with `tar -zxvf`.

**Air gap license**: The air gap license enables you to install `.airgap` bundle.
Without this enabled you will not be able to use the `.airgap` bundle.

During the installation process you'll be asked to upload both of these files, so let's download the `.airgap` bundle and license from the Replicated [vendor portal](https://vendor.replicated.com).

### Air gap bundle

To download the `.airgap` bundle, go to **[App Name]** -> **Channels** -> **[Channel Name]** -> **Release History**.

![Airgap Channels](/images/guides/kots/airgap-channels.png)

* Click on **Build** to build the `.airgap` bundle.

![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

* Once you see **Download Bundle**, click to download the `.airgap` bundle.

Keep this file on your local laptop to access the Replicated admin console in later steps.

### Air gap license

Next let's download the license. To download the air gap license, go to **[App Name]** -> **Customer** -> **[Customer Name]**.

![Airgap Customers](/images/guides/kots/airgap-customers.png)

* Select **License options** -> **Airgap Download Enabled** and **Save Changes**. This allows the the app manager to use the `.airgap` bundle.

![Airgap Download License](/images/guides/kots/airgap-download-license.png)

* When the customer is modified, the license will change along with the new air gapped entitlement, so you must download the updated license with the new entitlements.
Click on **Download license** to fetch the air gapped enabled YAML license.

## Kubernetes installer-created cluster

Clusters created by the Kubernetes installer (embedded clusters) need a third file, in addition to the `.airgap` bundle and license file.
The Kubernetes installer bundle provides the open source components to run the cluster: Docker, Kubernetes, the admin console, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).
The Kubernetes installer bundle is kept separate from the `.airgap` app bundle for a few reasons.

* The Kubernetes installer bundle can get quite large, this enables you to update your application with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the Kubernetes installer components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

### Download and install Kubernetes installer bundle

Let's download this bundle onto a jump box that has internet access.

* To download the Kubernetes installer bundle for the `Stable` channel:
```shell
export REPLICATED_APP=<app_slug>
curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}.tar.gz -o ${REPLICATED_APP}.tar.gz
```

* To download the Kubernetes installer bundle for all other channels, use the suffix `-<channel_name>`:
```shell
export REPLICATED_APP=<app_slug>
export REPLICATED_CHANNEL=<channel_name>
curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}-${REPLICATED_CHANNEL}.tar.gz -o ${REPLICATED_APP}-${REPLICATED_CHANNEL}.tar.gz
```

* `scp` the `.tar.gz` file from the jumpbox to the airgapped node:
```shell
export AIRGAP_PRIVATE_IP=<airgap_private_ip>
scp ${REPLICATED_APP}.tar.gz ${AIRGAP_PRIVATE_IP}:~
```

* Next, SSH into the air gapped node and untar the bundle:
```shell
export REPLICATED_APP=<app_slug>
tar -zxvf ${REPLICATED_APP}.tar.gz
```

* Install bundle with `airgap` flag, which will ensure the Kubernetes installer will only pull images from local source and not from online:

```shell
cat install.sh | sudo bash -s airgap
```

* After the installation completes, save the output at the end.
Then access the admin console using `http://<airgap_private_ip>:8800` to continue the installation from the browser to upload the `.airgap` bundle and license file.

* If you do not have direct access to the air gap private IP, you can access it using an SSH tunnel using the jump box's public IP. After the tunnel is up, you can access the admin console using `http://localhost:8800`. On your local workstation run the following commands:

```shell
export AIRGAP_PRIVATE_IP=<airgap_private_ip>
export JUMPBOX_PUBLIC_IP=<jumpbox_public_ip>
ssh -N -L 8800:${AIRGAP_PRIVATE_IP}:8800 ${JUMPBOX_PUBLIC_IP}
```

* * *

## Icon in Base64

In an air gapped environment, if the `icon` uses a URL, it would not be able to display because the image is fetched at the time the page is rendered. You must convert the `png` file into `base64` to be used for the image.

### Converting icon to Base64

Fetch the image using `curl`, then use `base64` to encode the image:

```shell
curl -LSs https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png | base64
```
You can verify this works in your browser by prefixing the stream with `data:image/png;base64,<encoded_base64_stream>` and putting it in the address bar, where the URL would typically go.

### Using the encoded icon

Once the base64 encoded string is copied, replace the `icon` URL with the base64 encoded string and prefix it with `data:image/png;base64,<encoded_base64_stream>`, similar to when you previously accessed it using the browser:

```yaml
spec:
  icon: data:image/png;base64,<encoded_base64_stream>
```

* * *

## Upload air gap bundle and license

Once you have the open source components installed with the [Kubernetes installer](/vendor/guides/airgapped-cluster/#embedded-kurl-cluster), log in to the admin console using the password from the installation.


### Upload air gap license

* Upload the license YAML file from [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license), which enables you to upload the `.airgap` bundle in the following step.

### Upload air gap bundle

* You are prompted to upload the `.airgap` bundle from [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license).

![Airgap Upload Bundle](/images/guides/kots/airgap-upload-bundle.png)

After the bundle is uploaded, the preflights checks begin.
After all of the checks pass, the application is automatically deployed.

* * *

## Automatically build bundles

When creating new releases, you must click **Build** every time a new release is made.
By default, only Stable and Beta channels automatically build `.airgap` bundles on new releases.
For other channels, you must enable the flag to build bundles automatically.

* To enable the flag, go to **[App Name]** -> **Channels** -> **[Channel Name]**, and click the **Edit** channel icon.

* Enable **Automatically create airgap builds for all releases in this channel**.

* Click **Save**.

![Airgap Automatic Builds](/images/guides/kots/airgap-automatic-builds.png)

* * *

## Upload new bundle

When automatic builds are enabled, you can push a release and wait a few minutes for the bundle to build (depending on the number of images). Then download the new `.airgap` bundle to make an update to your application.

After the first installation, subsequent releases can be uploaded from the Version History tab.
Download a new bundle following the [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license).

### Upload new version

* Click on **Upload new version** to upload the new bundle. As the bundle is uploaded you can see the progress.

![Airgap Upload New Version](/images/guides/kots/airgap-upload-new-version.png)

### Deploy new version

* After upload has finished, click on **Deploy** to apply the new version.

![Airgap Upload Deploy](/images/guides/kots/airgap-upload-deploy.png)
