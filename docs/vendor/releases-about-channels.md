# About Release Channels

This topic describes release channels, including the default channels and the Channels page in the Replicated vendor portal.

## Overview of Channels

The vendor portal includes release channels where you promote your application releases and assign customers. These channels are designed to align with your software development lifecycle. For example, you can have a channel in the vendor portal where you promote alpha or beta releases, and a separate channel where you promote releases that are generally available.

To automate the release process, Replicated recommends that you integrate your release channels with your existing CI/CD pipelines. For more information, see [Repository Workflow and Tagging Releases](https://docs.replicated.com/vendor/repository-workflow-and-tagging-releases).

You assign customers to channels in the vendor portal to control access to your application releases. Customers can install or upgrade to releases that are promoted to the channel to which they are assigned. For example, assigning a customer to your Beta channel allows that customer to install or upgrade to only releases promoted to the Beta channel. You can change the channel to which a customer is assigned at any time. For more information, see [Creating a Customer](releases-creating-customer).

The vendor portal includes the following channels by default:

* **Unstable**: The Unstable channel is designed for internal testing and development. You can create and assign a test customer to the Unstable channel to use the license in your development environment. Replicated recommends that you do not license any of your customers against the Unstable channel.
* **Beta**: The Beta channel is designed for release candidates and early-adopting customers. Replicated recommends that you promote a release to the Beta channel after it has passed automated testing in the Unstable channel. You can also choose to license early-adopting customers against this channel.
* **Stable**: The Stable channel is designed for releases that are generally available to your customers. Replicated recommends that you assign most of your customers to the Stable channel. Customers licensed against the Stable channel only receive application updates when you promote a new release to the Stable channel.

You can archive or edit any of the default channels. You can also create new channels. For more information, see [Creating and Editing Channels](releases-creating-channels).

## About the Channels Page

The Channels page in the vendor portal includes information about each channel. From the Channels page, you can edit and archive your channels. You can also edit the properties of the releases promoted to each channel, and view and edit the customers assigned to each channel.

The following shows an example of a channel in the vendor portal Channels page:

<img src="/images/channel-card.png" alt="Channel card in the vendor portal" width="300"/>

[View a larger version of this image](/images/channel-card.png)

As shown in the image above, you can do the following to manage a channel from the Channels page:

* Edit the channel settings by clicking on the settings icon, or archive the channel by clicking on the trash can icon. See [Creating and Editing Channels](releases-creating-channels).

* In the **Adoption rate** section, view data on the adoption rate of releases promoted to the channel among customers assigned to the channel.

* In the **Customers** section, view the number of active and inactive customers assigned to the channel. Click **Details** to go to the Customers page, where you can view details about the customers assigned to the channel.

* In the **Latest release** section, view the properties of the latest release, and get information about any warnings or errors in the YAML files for the latest release.

   You can also click **Release history** to access the history of all releases promoted to the channel. From the Release History page, you can view the installation commands and YAML files, build and download the air gap bundle, and edit the release properties for each release promoted to the channel.

   <img src="/images/channels-release-history.png" alt="Release history page in the vendor portal" width="600"/>

   [View a larger version of this image](/images/channel-card.png)

* In the **Kubernetes installer** section, view the current Kubernetes installer promoted to the channel. You can also click **Installer history** to view the history of Kubernetes installers promoted to the channel. For more information about creating Kubernetes installers within a release or separate from a release, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

* In the **Install** section, view and copy the installation commands for the latest release on the channel. For more information, see the [Installing an Application](/enterprise/installing-overview) section.
