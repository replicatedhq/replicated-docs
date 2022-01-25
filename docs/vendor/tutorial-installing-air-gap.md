# Installing in an air gapped environment

The KOTS Airgapped Cluster guide is an advanced guide that shows how to install a KOTS app in an Airgapped environment.
This guide will assume you've already completed one of the [Getting Started Guides](/vendor/guides/#getting-started) to set up a non-airgapped cluster.

It is broken into a few sections:

- [Download Airgap Bundle and License](#download-airgap-bundle-and-license)
- [Embedded kURL Cluster](#embedded-kurl-cluster)
- [Icon in Base64](#icon-in-base64)
- [Upload Airgap Bundle and License](#upload-airgap-bundle-and-license)
- [Automatically Build Bundles](#automatically-build-bundles)
- [Upload New Bundle](#upload-new-bundle)

## Download Airgap Bundle and License

For [Embedded](/vendor/guides/airgapped-cluster/#embedded-kurl-cluster) kURL clusters you will need the following:

**`.airgap` bundle**: This file contains app specific files like Kubernetes YAML and Docker images.
You can view its contents with `tar -zxvf`.

**Airgap License**: The Airgapped license enables you to install `.airgap` bundle.
Without this enabled you will not be able to use the `.airgap` bundle.

During the installation process you'll be asked to upload both of these files, so let's download the `.airgap` bundle and license from [vendor.replicated.com](https://vendor.replicated.com).

### Airgap Bundle

To download the `.airgap` bundle, go to `[App Name] -> Channels -> [Channel Name] -> Release History`.

![Airgap Channels](/images/guides/kots/airgap-channels.png)

* Click on `Build` to build the `.airgap` bundle.

![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

* Once you see `Download Bundle`, click to download the `.airgap` bundle.

Keep this file on your local laptop from where you will be accessing the Admin Console UI.

### Airgap License

Next let's download the license. To download the airgapped license, go to `[App Name] -> Customer -> [Customer Name]`.

![Airgap Customers](/images/guides/kots/airgap-customers.png)

* Select `License options -> Airgap Download Enabled` and `Save Changes`. As mentioned earlier, without this enabled KOTS will not be able to use the `.airgap` bundle.

![Airgap Download License](/images/guides/kots/airgap-download-license.png)

* When the customer is modified the license will change as well with the new Airgapped entitlement, so you need to re-download the license with the new entitlements.
Click on `Download license` to fetch the airgapped enabled yaml license.

## Embedded kURL Cluster

Embedded clusters also need a third file in addition to the `.airgap` bundle and License file.
The kURL bundle provides the open source components to run the cluster: Docker, Kubernetes, KOTS Adm, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).
The kURL bundle is kept separate from the `.airgap` app bundle for a few reasons.

* The kURL bundle can get quite large, this enables you to update your app with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the kURL components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

### Download and Install kURL bundle

Let's download this bundle onto a jumpbox which has internet access.

* To download the kURL bundle for the `Stable` channel.
```shell
export REPLICATED_APP=<app_slug>
curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}.tar.gz -o ${REPLICATED_APP}.tar.gz
```

* To download the kURL bundle for all other channels, use the suffix `-<channel_name>`.
```shell
export REPLICATED_APP=<app_slug>
export REPLICATED_CHANNEL=<channel_name>
curl -LS https://k8s.kurl.sh/bundle/${REPLICATED_APP}-${REPLICATED_CHANNEL}.tar.gz -o ${REPLICATED_APP}-${REPLICATED_CHANNEL}.tar.gz
```

* `scp` the `.tar.gz` file from the jumpbox to the airgapped node.
```shell
export AIRGAP_PRIVATE_IP=<airgap_private_ip>
scp ${REPLICATED_APP}.tar.gz ${AIRGAP_PRIVATE_IP}:~
```

* Next, SSH into the airgapped node and untar the bundle.
```shell
export REPLICATED_APP=<app_slug>
tar -zxvf ${REPLICATED_APP}.tar.gz
```

* Install bundle with `airgap` flag, which will ensure kURL will only pull images from local source and not from online.

```shell
cat install.sh | sudo bash -s airgap
```

* Once the install is completed, save the output at the end.
Thereafter you should access the Admin Console via `http://<airgap_private_ip>:8800` to continue the installation from the browser to upload the `.airgap` bundle and License file.

* If you do not have direct access to the airgap private IP, you can access it via an SSH tunnel using the jumpbox's public IP. Once the tunnel is up you can access the Admin Console via `http://localhost:8800`. On your local workstation run the following commands:

```shell
export AIRGAP_PRIVATE_IP=<airgap_private_ip>
export JUMPBOX_PUBLIC_IP=<jumpbox_public_ip>
ssh -N -L 8800:${AIRGAP_PRIVATE_IP}:8800 ${JUMPBOX_PUBLIC_IP}
```

* * *

## Icon in Base64

In an Airgapped environment, if the `icon` uses a URL, it would not be able to display because the image is fetched at the time the page is rendered.
In Airgapped, you need to convert the `png` file into `base64` to be used for the image.

### Converting Icon to Base64

Fetch the image using `curl`, then use `base64` to encode the image.

```shell
curl -LSs https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png | base64
```
You can verify this works in your browser by prefixing the stream with `data:image/png;base64,<encoded_base64_stream>` and putting it in the address bar (where the URL would generally go).

### Using the Encoded Icon

Once the base64 encoded string is copied, replace the `icon` URL with the base64 encoded string and prefix it with `data:image/png;base64,<encoded_base64_stream>` similar to above when you accessed it via the browser.

```yaml
spec:
  icon: data:image/png;base64,<encoded_base64_stream>
```

* * *

## Upload Airgap Bundle and License

Once you have the open source components installed for the [Embedded](/vendor/guides/airgapped-cluster/#embedded-kurl-cluster), login to the Admin Console using the password from the installation.


### Upload Airgap License

* Upload the License yaml file from [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license) which will enable you to upload the `.airgap` bundle in the next step.

### Upload Airgap Bundle

* You should be prompted to upload the `.airgap` bundle from [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license).

![Airgap Upload Bundle](/images/guides/kots/airgap-upload-bundle.png)

Once the bundle is uploaded the Preflights checks will commence.
Once all checks pass the app will with automatically deployed.

* * *

## Automatically Build Bundles

When creating new releases, you might have noticed you have to click the `Build` button everytime a new release is made.
By default only `Stable` and `Beta` channels automatically build `.airgap` bundles on new releases.
For other channels, you need to enable the flag to build bundles automatically.

* To enable, go to `[App Name] -> Channels -> [Channel Name]` and click on `Edit` channel icon.

* Enable `Automatically create airgap builds for all releases in this channel`.

* Click `Save`.

![Airgap Automatic Builds](/images/guides/kots/airgap-automatic-builds.png)

* * *

## Upload New Bundle

When automatic builds are enabled, you should be able to push a release and wait a few mins for the bundle to build (depending on the number of images) and download the new `.airgap` bundle to make an update to your app.

After the first install, subsequent releases can be uploaded from `Version history`.
Download a new bundle from [previous step](/vendor/guides/airgapped-cluster/#download-airgap-bundle-and-license).

### Upload New Version

* Click on `Upload new version` to upload the new bundle. As the bundle is uploaded you can see the progress.

![Airgap Upload New Version](/images/guides/kots/airgap-upload-new-version.png)

### Deploy New Version

* After upload has finished, click on `Deploy` to apply the new version.

![Airgap Upload Deploy](/images/guides/kots/airgap-upload-deploy.png)
