# About Channels

This topic describes release channels, including the default channels and the **Channels** page in the Replicated vendor portal.

## Overview of Channels

The vendor portal includes release channels where you promote your application releases and assign customers. These channels are designed to align with your software development lifecycle. For example, you can have a channel in the vendor portal where you promote alpha or beta releases, and a separate channel where you promote releases that are generally available.

You assign customers to channels in the vendor portal to control access to your application releases. Customers can install or upgrade to releases that are promoted to the channel to which they are assigned. For example, assigning a customer to your Beta channel allows that customer to install or upgrade to only releases promoted to the Beta channel. You can change the channel to which a customer is assigned at any time. For more information, see [Creating and Managing Customers](releases-creating-customer).

The vendor portal includes the following channels by default:

* **Unstable**: The Unstable channel is designed for internal testing and development. You can create and assign a test customer to the Unstable channel to use the license in your development environment. Replicated recommends that you do not license any of your customers against the Unstable channel.
* **Beta**: The Beta channel is designed for release candidates and early-adopting customers. Replicated recommends that you promote a release to the Beta channel after it has passed automated testing in the Unstable channel. You can also choose to license early-adopting customers against this channel.
* **Stable**: The Stable channel is designed for releases that are generally available to your customers. Replicated recommends that you assign most of your customers to the Stable channel. Customers licensed against the Stable channel only receive application updates when you promote a new release to the Stable channel.

You can archive or edit any of the default channels. You can also create new channels. For more information, see [Creating and Editing Channels](releases-creating-channels).

## Channels Page

The **Channels** page in the vendor portal includes information about each channel. From the **Channels** page, you can edit and archive your channels. You can also edit the properties of the releases promoted to each channel, and view and edit the customers assigned to each channel.

The following shows an example of a channel in the vendor portal **Channels** page:

<img src="/images/channel-card.png" alt="Channel card in the vendor portal" width="400"/>

[View a larger version of this image](/images/channel-card.png)

As shown in the image above, you can do the following from the **Channels** page:

* Edit the channel settings by clicking on the settings icon, or archive the channel by clicking on the trash can icon. For information about managing channel settings, see [Channel Settings](#channel-settings) below.

* In the **Adoption rate** section, view data on the adoption rate of releases promoted to the channel among customers assigned to the channel.

* In the **Customers** section, view the number of active and inactive customers assigned to the channel. Click **Details** to go to the **Customers** page, where you can view details about the customers assigned to the channel.

* In the **Latest release** section, view the properties of the latest release, and get information about any warnings or errors in the YAML files for the latest release.

   You can also click **Release history** to access the history of all releases promoted to the channel. From the **Release History** page, you can view the version labels and files in each release that has been promoted to the selected channel.
   
   For applications that support installation with Replicated KOTS, you can also build and download air gap bundles and edit the release properties for each release promoted to the channel from the **Release History** page.

   The following shows an example of the **Release History** page: 

   <img src="/images/channels-release-history.png" alt="Release history page in the vendor portal" width="750"/>

   [View a larger version of this image](/images/channel-card.png)

* For applications that support KOTS, you can also do the following from the **Channel** page:

   * In the **Kubernetes installer** section, view the current Kubernetes installer promoted to the channel. You can also click **Installer history** to view the history of Kubernetes installers promoted to the channel. For more information about creating Kubernetes installers within a release or separate from a release, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

   * In the **Install** section, view and copy the installation commands for the latest release on the channel. For more information, see the [Installing an Application](/enterprise/installing-overview) section.

## Channel Settings

Each release channel has settings. You can customize the settings for a channel to control some of the behavior of releases promoted to the channel.

The following shows the **Channel Settings** dialog that you can access by clicking the settings icon on a channel:

<img src="/images/channel-settings.png" alt="Channel Settings dialog in the vendor portal" width="500"/>

[View a larger version of this image](/images/channel-settings.png)

The following describes each of the channel settings:

* **Channel name**: The name of the channel. You can change the channel name at any time. Each channel also has a unique ID listed below the channel name.
* **Description**: Optionally, add a description of the channel.
* **Set this channel to default**: When enabled, sets the channel as the default channel. The default channel cannot be archived.
* **Custom domains**: Select the customer-facing domains that releases promoted to this channel use for the Replicated registry, proxy service, or download portal endpoints. If a default custom domain exists for any of these endpoints, choosing a different domain in the channel settings overrides the default. If no custom domains are configured for an endpoint, the drop-down for the endpoint is disabled.

  For more information about configuring custom domains and assigning default domains, see [Using Custom Domains for the Replicated Registry and Proxy Service](custom-domains) and [Using a Custom Domain for the Download Portal](custom-domains-download-portal).
* The following channel settings apply only to applications that support KOTS:
    * **Automatically create airgap builds for newly promoted releases in this channel**: When enabled, the vendor portal automatically builds an air gap bundle when a new release is promoted to the channel. When disabled, you can generate an air gap bundle manually for a release on the **Release History** page for the channel. For more information, see [Download Bundles for Air Gap Installations](releases-sharing-license-install-script#download-bundles-for-air-gap-installations) in _Sharing a Release_.
    * **Enable semantic versioning**: When enabled, the vendor portal verifies that the version label for any releases promoted to the channel uses a valid semantic version. For more information, see [Semantic Versioning](releases-about#semantic-versioning) in _About Releases_.
    * **Enable new airgap bundle format**: When enabled, air gap bundles built for releases promoted to the channel use a format that supports image digests. This air gap bundle format also ensures that identical image layers are not duplicated, resulting in a smaller air gap bundle size. For more information, see [Using Image Digests in Air Gap Installations](private-images-tags-digests#digests-air-gap) in _Using Image Tags and Digests_.

      :::note
      The new air gap bundle format is supported for applications installed with KOTS v1.82.0 or later. 
      :::  