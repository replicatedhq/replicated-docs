# About Channels and Releases

This topic describes channels and releases, including information about the **Releases** and **Channels** pages in the Replicated Vendor Portal.

## Overview

A _release_ represents a single version of your application. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

Channels also control which customers are able to install a release. You assign each customer to a channel to define the releases that the customer can access. For example, a customer assigned to the Stable channel can only install releases that are promoted to the Stable channel, and cannot see any releases promoted to other channels. For more information about assigning customers to channels, see [Channel Assignment](licenses-about#channel-assignment) in _About Customers_.

Using channels and releases helps you distribute versions of your application to the right customer segments, without needing to manage different release workflows.

You can manage channels and releases with the Vendor Portal, the Replicated CLI, or the Vendor API v3. For more information about creating and managing releases or channels, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Creating and Editing Channels](releases-creating-channels). 

## About Channels

This section provides additional information about channels, including details about the default channels in the Vendor Portal and channel settings.

### Unstable, Beta, and Stable Channels

Replicated includes the following channels by default:

* **Unstable**: The Unstable channel is designed for internal testing and development. You can create and assign an internal test customer to the Unstable channel to install in a development environment. Replicated recommends that you do not license any of your external users against the Unstable channel.
* **Beta**: The Beta channel is designed for release candidates and early-adopting customers. Replicated recommends that you promote a release to the Beta channel after it has passed automated testing in the Unstable channel. You can also choose to license early-adopting customers against this channel.
* **Stable**: The Stable channel is designed for releases that are generally available. Replicated recommends that you assign most of your customers to the Stable channel. Customers licensed against the Stable channel only receive application updates when you promote a new release to the Stable channel.

You can archive or edit any of the default channels, and create new channels. For more information, see [Create and Edit Channels](releases-creating-channels).

### Settings

Each channel has settings. You can customize the settings for a channel to control some of the behavior of releases promoted to the channel.

The following shows the **Channel Settings** dialog, accessed by clicking the settings icon on a channel:

<img src="/images/channel-settings.png" alt="Channel Settings dialog in the Vendor Portal" width="500"/>

[View a larger version of this image](/images/channel-settings.png)

The following describes each of the channel settings:

* **Channel name**: The name of the channel. You can change the channel name at any time. Each channel also has a unique ID listed below the channel name.
* **Description**: Optionally, add a description of the channel.
* **Set this channel to default**: When enabled, sets the channel as the default channel. The default channel cannot be archived.
* **Custom domains**: Select the customer-facing domains that releases promoted to this channel use for the Replicated registry, Replicated proxy registry, Replicated app service, or Replicated Download Portal endpoints. If a default custom domain exists for any of these endpoints, choosing a different domain in the channel settings overrides the default. If no custom domains are configured for an endpoint, the drop-down for the endpoint is disabled.

  For more information about configuring custom domains and assigning default domains, see [Use Custom Domains](custom-domains-using).
* The following channel settings apply only to applications that support KOTS:
    * **Automatically create airgap builds for newly promoted releases in this channel**: When enabled, the Vendor Portal automatically builds an air gap bundle when a new release is promoted to the channel. When disabled, you can generate an air gap bundle manually for a release on the **Release History** page for the channel.
    * **Enable semantic versioning**: When enabled, the Vendor Portal verifies that the version label for any releases promoted to the channel uses a valid semantic version. For more information, see [Semantic Versioning](releases-about#semantic-versioning) in _About Releases_.
    * **Enable new airgap bundle format**: When enabled, air gap bundles built for releases promoted to the channel use a format that supports image digests. This air gap bundle format also ensures that identical image layers are not duplicated, resulting in a smaller air gap bundle size. For more information, see [Use Image Digests in Air Gap Installations](private-images-tags-digests#digests-air-gap) in _Use Image Tags and Digests_.

      :::note
      The new air gap bundle format is supported for applications installed with KOTS v1.82.0 or later. 
      :::  
   
## About Releases

This section provides additional information about releases, including details about release promotion, properties, sequencing, and versioning.

### Release Files

A release contains your application files as well as the manifests required to install the application with the Replicated installers ([Replicated Embedded Cluster](/vendor/embedded-overview) and [Replicated KOTS](../intro-kots)). 

The application files in releases can be Helm charts and/or Kubernetes manifests. Replicated strongly recommends that all applications are packaged as Helm charts because many enterprise customers will expect to be able to install with Helm.

### Promotion

Each release is promoted to one or more channels. While you are developing and testing releases, Replicated recommends promoting to a channel that does not have any real customers assigned, such as the default Unstable channel. When the release is ready to be shared externally with customers, you can then promote to a channel that has the target customers assigned, such as the Beta or Stable channel.

A release cannot be edited after it is promoted to a channel. This means that you can test a release on an internal development channel, and know with confidence that the same release will be available to your customers when you promote it to a channel where real customers are assigned.

### Properties

Each release has properties. You define release properties when you promote a release to a channel. You can edit release properties at any time from the channel **Release History** page in the Vendor Portal. For more information, see [Edit Release Properties](releases-creating-releases#edit-release-properties) in _Managing Releases with the Vendor Portal_.

The following shows an example of the release properties dialog:

<img src="/images/release-properties.png" width="500px" alt="release properties dialog for a release with version label 0.1.22"/>

[View a larger version of this image](/images/release-properties.png)

As shown in the screenshot above, the release has the following properties:

* **Version label**: The version label for the release. Version labels have the following requirements:

  * If semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Semantic Versioning](#semantic-versioning).

  * The version label for the release must match the version label from one of the `Chart.yaml` files in the release.
* If there is one Helm chart in the release, Replicated automatically uses the version from the `Chart.yaml` file.
* If there is more than one Helm chart in the release, Replicated uses the version label from one of the `Chart.yaml` files. You can edit the version label for the release to use the version label from a different `Chart.yaml` file.

* **Requirements**: Select **Prevent this release from being skipped during upgrades** to mark the release as required.

  When a release is required, KOTS requires users to upgrade to that version before they can upgrade to a later version. For example, if you select **Prevent this release from being skipped during upgrades** for release v2.0.0, users with v1.0.0 deployed must upgrade to v2.0.0 before they can upgrade to a version later than v2.0.0, such as v2.1.0. 

  Required releases have the following limitations:

  * Required releases are supported in KOTS v1.68.0 and later.
  * After users deploy a required version, they can no longer redeploy (roll back to) versions earlier than the required version, even if `allowRollback` is true in the Application custom resource manifest. For more information, see [`allowRollback`](/reference/custom-resource-application#allowrollback) in the Application custom resource topic.
  * If you change the channel an existing customer is assigned to, the Admin Console always fetches the latest release on the new channel, regardless of any required releases on the channel. For more information, see [Channel Assignment](licenses-about#channel-assignment) in _About Customers_.
  * Required releases are supported for KOTS installations only and are not supported for releases installed with Helm. The **Prevent this release from being skipped during upgrades** option has no affect if the user installs with Helm.

* **Release notes (supports markdown)**: Detailed release notes for the release. The release notes support markdown and are shown to your customer.

### Sequencing

By default, Replicated uses release sequence numbers to organize and order releases, and uses instance sequence numbers in an instance's internal version history.

#### Release Sequences

In the Vendor Portal, each release is automatically assigned a unique, monotonically-increasing sequence number. You can use this number as a fallback to identify a promoted or draft release, if you do not set the `Version label` field during promotion. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases).

The following graphic shows release sequence numbers in the Vendor Portal:

<img alt="Release sequence numbers" src="/images/release-sequences.png" width="750px"/>

[View a larger version of this image](/images/release-sequences.png)

#### Instance Sequences 

When a new version is available for upgrade, including when KOTS checks for upstream updates as well as when the user syncs their license or makes a config change, the KOTS Admin Console assigns a unique instance sequence number to that version. The instance sequence in the Admin Console starts at 0 and increments for each identifier that is returned when a new version is available.

This instance sequence is unrelated to the release sequence dispalyed in the Vendor Portal, and it is likely that the instance sequence will differ from the release sequence. Instance sequences are only tracked by KOTS instances, and the Vendor Portal has no knowledge of these numbers.

The following graphic shows instance sequence numbers on the Admin Console dashboard:

<img alt="Instance sequence numbers" src="/images/instance-sequences.png" width="550px"/>

[View a larger version of this image](/images/instance-sequences.png)

#### Channel Sequences

When a release is promoted to a channel, a channel sequence number is assigned. This unique sequence number increments by one and tracks the order in which releases were promoted to a channel. You can view the channel sequence on the **Release History** page in the Vendor Portal, as shown in the image below:

<img alt="Channel sequence on Release History page" src="/images/release-history-channel-sequence.png" width="750px"/>

[View a larger version of this image](/images/release-history-channel-sequence.png)

The channel sequence is also used in certain URLs. For example, a release with a *release sequence* of `170` can have a *channel sequence* of `125`. The air gap download URL for that release can contain `125` in the URL, even though the release sequence is `170`.

Ordering is more complex if some or all of the releases in a channel have a semantic version label and semantic versioning is enabled for the channel. For more information, see [Semantic Versioning Sequence](#semantic-versioning-sequence).

#### Semantic Versioning Sequence

For channels with semantic versioning enabled, the Admin Console sequences instance releases by their semantic versions instead of their promotion dates.

If releases without a valid semantic version are already promoted to a channel, the Admin Console sorts the releases that do have semantic versions starting with the earliest version and proceeding to the latest. The releases with non-semantic versioning stay in the order of their promotion dates. For example, assume that you promote these releases in the following order to a channel: 

- 1.0.0
- abc
- 0.1.0
- xyz
- 2.0.0 

Then, you enable semantic versioning on that channel. The Admin Console sequences the version history for the channel as follows: 

- 0.1.0
- 1.0.0
- abc
- xyz
- 2.0.0

### Semantic Versioning

Semantic versioning is available with the Replicated KOTS v1.58.0 and later. Note the following:

- For applications created in the Vendor Portal on or after February 23, 2022, semantic versioning is enabled by default on the Stable and Beta channels. Semantic versioning is disabled on the Unstable channel by default.

- For existing applications created before February 23, 2022, semantic versioning is disabled by default on all channels.

Semantic versioning is recommended because it makes versioning more predictable for users and lets you enforce versioning so that no one uses an incorrect version.

To use semantic versioning:

1. Enable semantic versioning on a channel, if it is not enabled by default. Click the **Edit channel settings** icon, and turn on the **Enable semantic versioning** toggle.
1. Assign a semantic version number when you promote a release.

Releases promoted to a channel with semantic versioning enabled are verified to ensure that the release version label is a valid semantic version. For more information about valid semantic versions, see [Semantic Versioning 2.0.0](https://semver.org).

If you enable semantic versioning for a channel and then promote releases to it, Replicated recommends that you do not later disable semantic versioning for that channel.

You can enable semantic versioning on a channel that already has releases promoted to it without semantic versioning. Any subsequently promoted releases must use semantic versioning. In this case, the channel will have releases with and without semantic version numbers. For information about how Replicated organizes these release sequences, see [Semantic Versioning Sequences](#semantic-versioning-sequence).

### Demotion

A channel release can be demoted from a channel. When a channel release is demoted, the release is no longer available for download, but is not withdrawn from environments where it was already downloaded or installed.

The demoted release's channel sequence and version are not reused. For customers, the release will appear to have been skipped. Un-demoting a release will restore its place in the channel sequence making it again available for download and installation.

For information about how to demote a release, see [Demote a Release](/vendor/releases-creating-releases#demote-a-release) in _Managing Releases with the Vendor Portal_. 

## Vendor Portal Pages

This section provides information about the channels and releases pages in the Vendor Portal.

### Channels Page

The **Channels** page in the Vendor Portal includes information about each channel. From the **Channels** page, you can edit and archive your channels. You can also edit the properties of the releases promoted to each channel, and view and edit the customers assigned to each channel.

The following shows an example of a channel in the Vendor Portal **Channels** page:

<img src="/images/channel-card.png" alt="Channel card in the Vendor Portal" width="400"/>

[View a larger version of this image](/images/channel-card.png)

As shown in the image above, you can do the following from the **Channels** page:

* Edit the channel settings by clicking on the settings icon, or archive the channel by clicking on the trash can icon. For information about channel settings, see [Settings](#settings).

* In the **Adoption rate** section, view data on the adoption rate of releases promoted to the channel among customers assigned to the channel.

* In the **Customers** section, view the number of active and inactive customers assigned to the channel. Click **Details** to go to the **Customers** page, where you can view details about the customers assigned to the channel.

* In the **Latest release** section, view the properties of the latest release, and get information about any warnings or errors in the YAML files for the latest release.

   Click **Release history** to access the history of all releases promoted to the channel. From the **Release History** page, you can view the version labels and files in each release that has been promoted to the selected channel.
   
   You can also build and download air gap bundles to be used in air gap installations with Replicated installers (Embedded Cluster, KOTS, kURL), edit the release properties for each release promoted to the channel from the **Release History** page, and demote a release from the channel.

   The following shows an example of the **Release History** page: 

   <img src="/images/channels-release-history.png" alt="Release history page in the Vendor Portal" width="750"/>

   [View a larger version of this image](/images/channel-card.png)

* For applications that support KOTS, you can also do the following from the **Channel** page:

   * In the **kURL installer** section, view the current kURL installer promoted to the channel. Click **Installer history** to view the history of kURL installers promoted to the channel. For more information about creating kURL installers, see [Create a kURL Installer](packaging-embedded-kubernetes).

   * In the **Install** section, view and copy the installation commands for the latest release on the channel.

### Draft Release Page

For applications that support installation with KOTS, the **Draft** page provides a YAML editor to add, edit, and delete your application files and Replicated custom resources. You click **Releases > Create Release** in the Vendor Portal to open the **Draft** page.

The following shows an example of the **Draft** page in the Vendor Portal:

  <img alt="Draft release page"src="/images/guides/kots/default-yaml.png" width="700px"/>

  [View a larger version of this image](/images/guides/kots/default-yaml.png)

You can do the following tasks on the **Draft** page:

- In the file directory, manage the file directory structure. Replicated custom resource files are grouped together above the white line of the file directory. Application files are grouped together underneath the white line in the file directory.

  Delete files using the trash icon that displays when you hover over a file. Create a new file or folder using the corresponding icons at the bottom of the file directory pane. You can also drag and drop files in and out of the folders.

    ![Manage File Directory](/images/new-file-and-trash.png)

- Edit the YAML files by selecting a file in the directory and making changes in the YAML editor.

- In the **Help** or **Config help** pane, view the linter for any errors. If there are no errors, you get an **Everything looks good!** message. If an error displays, you can click the **Learn how to configure** link. For more information, see [Linter Rules](/reference/linter).

- Select the Config custom resource to preview how your application's Config page will look to your customers. The **Config preview** pane only appears when you select that file. For more information, see [About the Configuration Screen](config-screen-about).

- Select the Application custom resource to preview how your application icon will look in the Admin Console. The **Application icon preview** only appears when you select that file. For more information, see [Customizing the Application Icon](admin-console-customize-app-icon).