# Installing in an Air Gapped Environment

This tutorial shows how to install the Replicated app manager in an air gapped environment.

The tutorial assumes that you have already completed one of the quick start tutorials and set up a non-air gapped cluster. See:
* [Installing without an Existing Cluster](tutorial-installing-without-existing-cluster)
* [Installing with an Existing Cluster](tutorial-installing-with-existing-cluster)
* [Managing Releases with the CLI](tutorial-installing-with-cli)

The air gap installation follows this process:

1. [Download the air gap bundle and license](#download-the-air-gap-bundle)
1. [Install the Kubernetes installer bundle](#install-the-kubernetes-installer-bundle)
1. [Convert the icon to Base64](#convert-the-icon-to-base64)
1. [Upload the air gap bundle and license](#upload-the-air-gap-bundle-and-license)
1. [Build bundles automatically](#build-bundles-automatically)
1. [Deploy a new bundle](#deploy-a-new-bundle)


## Download the Air Gap Bundle

The `airgap` bundle contains application-specific files, such as Kubernetes YAML and Docker images. You can view its contents with `tar -zxvf`.

To download the `.airgap` bundle:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **[App Name] > Channels > [Channel Name] > Release History**.

  ![Airgap Channels](/images/guides/kots/airgap-channels.png)

1. Click **Build** to build the `.airgap` bundle.

  ![Airgap Download Bundle](/images/guides/kots/airgap-download-bundle.png)

1. Click **Download Bundle** to download the `.airgap` bundle. Keep this file on your local laptop to access the Replicated admin console in later steps.

## Download the Air Gap License

The air gap license option lets you install the `.airgap` bundle. Without this enabled, you cannot use the `.airgap` bundle.

To enable the air gap entitlement and download the updated license:

1. Click **[App Name] > Customer > [Customer Name]**.

  ![Airgap Customers](/images/guides/kots/airgap-customers.png)

1. Click **License options > Airgap Download Enabled**, and **Save Changes**. This lets the app manager use the `.airgap` bundle.

  ![Airgap Download License](/images/guides/kots/airgap-download-license.png)

1. Click **Download license** to download the updated air gapped enabled YAML license.

## Install the Kubernetes Installer Bundle

Clusters created by the Kubernetes installer (embedded clusters) need a third file, in addition to the `.airgap` bundle and license file.

The Kubernetes installer bundle provides the open source components to run the cluster: Docker, Kubernetes, the admin console, Weave, Contour, Rook, Registry and a number of other [add-ons](https://kurl.sh/add-ons).
The Kubernetes installer bundle is kept separate from the `.airgap` app bundle for the following reasons:

* The Kubernetes installer bundle can get quite large, so this method lets you update your application with a smaller bundle size.

* The release cadence of the `.airgap` bundle is generally higher in comparison to the Kubernetes installer components, which only needs to be updated when the underlying cluster components or add-ons need to be updated.

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

1. After the installation completes, save the output.

1. Access the admin console using `http://<airgap_private_ip>:8800` to continue the installation from the browser to upload the `.airgap` bundle and license file.

  If you do not have direct access to the air gap private IP, you can access it using an SSH tunnel using the jump box public IP. After the tunnel is up, you can access the admin console using `http://localhost:8800`. On your local workstation run the following commands:

  ```shell
  export AIRGAP_PRIVATE_IP=<airgap_private_ip>
  export JUMPBOX_PUBLIC_IP=<jumpbox_public_ip>
  ssh -N -L 8800:${AIRGAP_PRIVATE_IP}:8800 ${JUMPBOX_PUBLIC_IP}
  ```

## Convert the icon to Base64

In an air gapped environment, if the `icon` uses a URL, it cannot display the image because it is fetched at the time the page is rendered. You must convert the PNG file into `base64`.

To convert and use the image:

1. Use `curl`, then use `base64` to encode the image:

  ```shell
  curl -LSs https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png | base64
  ```

1. Verify that this works in your browser by prefixing the stream with `data:image/png;base64,<encoded_base64_stream>` and putting it in the address bar, where the URL would typically go.

1. After the base64 encoded string is copied, replace the `icon` URL with the base64 encoded string and prefix it with `data:image/png;base64,<encoded_base64_stream>`, similar to when you previously accessed it using the browser:

  ```yaml
  spec:
    icon: data:image/png;base64,<encoded_base64_stream>
  ```

## Upload the Air Gap Bundle and License

After you have the open source components installed with the [Kubernetes installer](#install-the-kubernetes-installer-bundle), upload the air gap bundle and license.

To upload the bundle and license:

1. Log in to the admin console using the password from the installation.

1. Upload the license YAML file.

  The Install in airgapped environment dialog opens.

1. Click **Upload airgap bundle**.

  ![Airgap Upload Bundle](/images/guides/kots/airgap-upload-bundle.png)

  After the bundle is uploaded, the preflight checks begin. After all of the checks pass, the application is automatically deployed.

  :::note
  Vendors can optionally configure `strict` preflight checks that cause the application deployment to fail if specific requirements are not met. For more information about preflight checks, see [Creating Preflight Checks and Support Bundles](preflight-support-bundle-creating).

  Additionally, when installing with minimal role-based access control (RBAC), the preflight checks can fail due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that lets the end user manually run the preflight checks and upload the results automatically to the app manager. For more information about configuring RBAC privileges, see [`requireMinimalRBACPrivileges`](../reference/custom-resource-application#requireminimalrbacprivileges) in Application custom resources.
  :::


## Build Bundles Automatically

When creating new releases, you must click **Build** every time a new release is made.
By default, only Stable and Beta channels automatically build `.airgap` bundles on new releases.
For other channels, you must enable the flag to build bundles automatically.

To enable the flag:

1. Click **[App Name] > Channels > [Channel Name]**, and click the **Edit channel** icon.

1. Enable **Automatically create airgap builds for all releases in this channel**.

1. Click **Save**.

  ![Airgap Automatic Builds](/images/guides/kots/airgap-automatic-builds.png)


## Deploy a New Bundle

When automatic builds are enabled, you can push a release and wait a few minutes for the bundle to build, depending on the number of images.

To deploy an update to your application:

1. [Download a new bundle](#download-the-air-gap-bundle).

1. From the admin console, click **Version History > Upload new version** to upload the new bundle. As the bundle uploads, you can see the progress.

  ![Airgap Upload New Version](/images/guides/kots/airgap-upload-new-version.png)

1. Click **Deploy** to apply the new version.

  ![Airgap Upload Deploy](/images/guides/kots/airgap-upload-deploy.png)
