import ChangeChannel from "../partials/customers/_change-channel.mdx"
import RequiredReleasesLimitations from "../partials/releases/_required-releases-limitations.mdx"
import RequiredReleasesDescription from "../partials/releases/_required-releases-description.mdx"
import VersionLabelReqsHelm from "../partials/releases/_version-label-reqs-helm.mdx"
import KotsEntitlement from "../partials/customers/_kots-entitlement-overview.mdx"

# About Channels and Releases

This topic describes channels and releases, including information about the **Releases** and **Channels** pages in the Replicated vendor portal.

## Overview

A _release_ represents a single version of your application and contains your application files (Helm charts or Kubernetes manifests). Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available. Channels also control which customers are able to install a release. For example, a customer assigned to the Stable channel can only install releases that are promoted to the Stable channel, and cannot see any releases promoted to the Beta, Unstable, or other channels. For more information about assigning customers to channels, see [Channel Assignment](licenses-about#channel-assignment) in _About Customers_.

Channels and releases help you distribute your application to your customers, including both SaaS and on-prem customers, without needing to manage separate code bases, deployments, or release workflows. Instead, to make a release available to your customers, you promote it to a channel where the target customers are assigned. This reduces complexity and helps ensure that all your customers have access to the same release on the same cadence. 

You can manage channels and releases with the vendor portal, the replicated CLI, or the Vendor API v3. For more information about creating and managing releases or channels, see [Managing Releases with the Vendor Portal](releases-creating-releases) or [Creating and Editing Channels](releases-creating-channels). 

## About Channels

This section provides additional information about channels, including details about the default channels in the vendor portal and channel settings.
### Defaults

Replicated includes the following channels by default:

* **Unstable**: The Unstable channel is designed for internal testing and development. You can create and assign an internal test customer to the Unstable channel to install in a development environment. Replicated recommends that you do not license any of your external users against the Unstable channel.
* **Beta**: The Beta channel is designed for release candidates and early-adopting customers. Replicated recommends that you promote a release to the Beta channel after it has passed automated testing in the Unstable channel. You can also choose to license early-adopting customers against this channel.
* **Stable**: The Stable channel is designed for releases that are generally available. Replicated recommends that you assign most of your customers to the Stable channel. Customers licensed against the Stable channel only receive application updates when you promote a new release to the Stable channel.

You can archive or edit any of the default channels, and create new channels. For more information, see [Creating and Editing Channels](releases-creating-channels).

### Settings

Each channel has settings. You can customize the settings for a channel to control some of the behavior of releases promoted to the channel.

The following shows the **Channel Settings** dialog, accessed by clicking the settings icon on a channel:

<img src="/images/channel-settings.png" alt="Channel Settings dialog in the vendor portal" width="500"/>

[View a larger version of this image](/images/channel-settings.png)

The following describes each of the channel settings:

* **Channel name**: The name of the channel. You can change the channel name at any time. Each channel also has a unique ID listed below the channel name.
* **Description**: Optionally, add a description of the channel.
* **Set this channel to default**: When enabled, sets the channel as the default channel. The default channel cannot be archived.
* **Custom domains**: Select the customer-facing domains that releases promoted to this channel use for the Replicated registry, proxy service, Replicated app service, or download portal endpoints. If a default custom domain exists for any of these endpoints, choosing a different domain in the channel settings overrides the default. If no custom domains are configured for an endpoint, the drop-down for the endpoint is disabled.

  For more information about configuring custom domains and assigning default domains, see [Using Custom Domains](custom-domains-using).
* The following channel settings apply only to applications that support KOTS:
    * **Automatically create airgap builds for newly promoted releases in this channel**: When enabled, the vendor portal automatically builds an air gap bundle when a new release is promoted to the channel. When disabled, you can generate an air gap bundle manually for a release on the **Release History** page for the channel. For more information, see [Downloading Air Gap Bundles](releases-download-airgap-bundles).
    * **Enable semantic versioning**: When enabled, the vendor portal verifies that the version label for any releases promoted to the channel uses a valid semantic version. For more information, see [Semantic Versioning](releases-about#semantic-versioning) in _About Releases_.
    * **Enable new airgap bundle format**: When enabled, air gap bundles built for releases promoted to the channel use a format that supports image digests. This air gap bundle format also ensures that identical image layers are not duplicated, resulting in a smaller air gap bundle size. For more information, see [Using Image Digests in Air Gap Installations](private-images-tags-digests#digests-air-gap) in _Using Image Tags and Digests_.

      :::note
      The new air gap bundle format is supported for applications installed with KOTS v1.82.0 or later. 
      :::  
   
## About Releases

This section provides additional information about releases, including details about release promotion, properties, sequencing, and versioning.

### Application Files

Each release contains your application files. To support installation with the Helm CLI, the application files in a release can include one or more Helm charts. For more information about adding Helm charts to a release, see [Packaging a Helm Chart for a Release](/vendor/helm-install-release) 

Alternatively, vendors that support Replicated KOTS installations can create a release with standard Kubernetes manifests only, or use a combination of standard manifests and Helm charts. KOTS releases also support the use of Kubernetes Operators. For more information about creating releases to support KOTS installation, see [Onboarding with KOTS](/vendor/distributing-workflow).

### Promotion

Each release is promoted to one or more channels. While you are developing and testing releases, Replicated recommends promoting to a channel that does not have any real customers assigned, such as the default Unstable channel. When the release is ready to be shared externally with customers, you can then promote to a channel that has the target customers assigned, such as the Beta or Stable channel.

After being promoted to a channel, a release is immutable. This means that you can test a release on an internal development channel, and know with confidence that the same release will be available to your customers when you promote it to a channel where real customers are assigned.

Every customer license file that you create is assigned to a channel. Each time a new release is promoted to a channel, customers assigned to that channel can update their installed application instance to the new release version. For more information about customer licenses, see [About Customers](licenses-about).

#### Promoting KOTS-Only and Helm CLI-Only Releases {#kots-helm-releases}

<KotsEntitlement/>

To prevent KOTS or Helm CLI-only customers from accessing a release that they cannot install, Replicated enforces the following release promotion rules:

* A release must contain the required KOTS manifests to be promoted to a channel where one or more KOTS customers are assigned.

  <img width="400px" alt="Release without the required manifests blocked from promotion" src="/images/release-promotion-kots-customers.png"/>
  
  [View a larger version of this image](/images/release-promotion-kots-customers.png)

* A release must contain at least one Helm chart to be promoted to a channel where one or more Helm CLI-only customers are assigned.

  <img width="400px" src="/images/release-promotion-helm-customers.png" alt="Release with no helm charts blocked from being promoted"/>
  
  [View a larger version of this image](/images/release-promotion-helm-customers.png)

### Properties

Each release has properties. You define release properties when you promote a release to a channel. You can edit release properties at any time from the channel **Release History** page in the vendor portal. For more information, see [Edit Release Properties](releases-creating-releases#edit-release-properties) in _Managing Releases with the Vendor Portal_.

The following shows an example of the release properties dialog:

<img src="/images/release-properties.png" width="500px" alt="release properties dialog for a release with version label 0.1.22"/>

[View a larger version of this image](/images/release-properties.png)

As shown in the screenshot above, the release has the following properties:

* **Version label**: The version label for the release. Version labels have the following requirements:

  * For releases that support installation with KOTS, if semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Semantic Versioning](#semantic-versioning).

  * For releases that support installation with Helm only:
    <VersionLabelReqsHelm/>

* **Requirements**: For releases distributed with Replicated KOTS, you can select **Prevent this release from being skipped during upgrades** to mark the release as required.

  <RequiredReleasesDescription/> 

  <RequiredReleasesLimitations/>

* **Release notes (supports markdown)**: Detailed release notes for the release. The release notes support markdown and are shown to your customer.

### Sequencing

By default, Replicated uses release sequence numbers to organize and order releases, and uses instance sequence numbers in an instance's internal version history.

#### Release Sequences

In the vendor portal, each release is automatically assigned a unique, monotonically-increasing sequence number. You can use this number as a fallback to identify a promoted or draft release, if you do not set the `Version label` field during promotion. For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases).

The following graphic shows release sequence numbers in the vendor portal:

<img alt="Release sequence numbers" src="/images/release-sequences.png" width="750px"/>

[View a larger version of this image](/images/release-sequences.png)

#### Instance Sequences 

When a KOTS instance checks for an application update, the vendor portal returns a release identifier (a sequence number or a version label) to the instance. The Replicated admin console then assigns the release a unique instance sequence number. This instance sequence is separate from a release sequence in the vendor portal. The instance sequence in the admin console starts at 0 and increments for each release identifier that is returned when KOTS checks for an update.

A single release sequence, such as `181`, can have multiple instance sequences in the deployed instances, depending on when those instances came online and how many other releases were seen before release sequence `181`.

Note that instance sequences are only tracked by KOTS instances, and the vendor portal has no knowledge of these numbers.

The following graphic shows instance sequence numbers on the admin console dashboard:

<img alt="Instance sequence numbers" src="/images/instance-sequences.png" width="550px"/>

[View a larger version of this image](/images/instance-sequences.png)

#### Channel Sequences

When a release is promoted to a channel, a channel sequence number is assigned. This unique sequence number increases montonically and tracks the order in which releases were promoted to a channel. While the channel sequence is not visible in the vendor portal, you can see it in certain URLs. For example, a release with **release sequence** of `170` can have a **channel sequence** of `125`. The air gap download URL for that release on that channel can contain `125` in the URL, even though the release sequence is `170`.

Ordering is more complex if some or all of the releases in a channel have a semantic version label and semantic versioning is enabled for the channel. For more information, see [Semantic Versioning Sequence](#semantic-versioning-sequence).

#### Semantic Versioning Sequence

For channels with semantic versioning enabled, the admin console sequences instance releases by their semantic versions instead of their promotion dates.

If releases without a valid semantic version are already promoted to a channel, the admin console sorts the releases that do have semantic versions starting with the earliest version and proceeding to the latest. The releases with non-semantic versioning stay in the order of their promotion dates. For example, assume that you promote these releases in the following order to a channel: 

- 1.0.0
- abc
- 0.1.0
- xyz
- 2.0.0 

Then, you enable semantic versioning on that channel. The admin console sequences the version history for the channel as follows: 

- 0.1.0
- 1.0.0
- abc
- xyz
- 2.0.0

For information about how enterprise application users check for application updates in the admin console, see [Updating an Application](/enterprise/updating-apps).

### Semantic Versioning

Semantic versioning is available with the Replicated KOTS v1.58.0 and later. Note the following:

- For applications created in the vendor portal on or after February 23, 2022, semantic versioning is enabled by default on the Stable and Beta channels. Semantic versioning is disabled on the Unstable channel by default.

- For existing applications created before February 23, 2022, semantic versioning is disabled by default on all channels.

Semantic versioning is recommended because it makes versioning more predictable for users and lets you enforce versioning so that no one uses an incorrect version.

To use semantic versioning:

1. Enable semantic versioning on a channel, if it is not enabled by default. Click the **Edit channel settings** icon, and turn on the **Enable semantic versioning** toggle.
1. Assign a semantic version number when you promote a release.

Releases promoted to a channel with semantic versioning enabled are verified to ensure that the release version label is a valid semantic version. For more information about valid semantic versions, see [Semantic Versioning 2.0.0](https://semver.org).

If you enable semantic versioning for a channel and then promote releases to it, Replicated recommends that you do not later disable semantic versioning for that channel.

You can enable semantic versioning on a channel that already has releases promoted to it without semantic versioning. Any subsequently promoted releases must use semantic versioning. In this case, the channel will have releases with and without semantic version numbers. For information about how Replicated organizes these release sequences, see [Semantic Versioning Sequences](#semantic-versioning-sequence).

## Vendor Portal Pages

This section provides information about the channels and releases pages in the vendor portal.

### Channels Page

The **Channels** page in the vendor portal includes information about each channel. From the **Channels** page, you can edit and archive your channels. You can also edit the properties of the releases promoted to each channel, and view and edit the customers assigned to each channel.

The following shows an example of a channel in the vendor portal **Channels** page:

<img src="/images/channel-card.png" alt="Channel card in the vendor portal" width="400"/>

[View a larger version of this image](/images/channel-card.png)

As shown in the image above, you can do the following from the **Channels** page:

* Edit the channel settings by clicking on the settings icon, or archive the channel by clicking on the trash can icon. For information about channel settings, see [Settings](#settings).

* In the **Adoption rate** section, view data on the adoption rate of releases promoted to the channel among customers assigned to the channel.

* In the **Customers** section, view the number of active and inactive customers assigned to the channel. Click **Details** to go to the **Customers** page, where you can view details about the customers assigned to the channel.

* In the **Latest release** section, view the properties of the latest release, and get information about any warnings or errors in the YAML files for the latest release.

   Click **Release history** to access the history of all releases promoted to the channel. From the **Release History** page, you can view the version labels and files in each release that has been promoted to the selected channel.
   
   For applications that support installation with Replicated KOTS, you can also build and download air gap bundles, and edit the release properties for each release promoted to the channel from the **Release History** page.

   The following shows an example of the **Release History** page: 

   <img src="/images/channels-release-history.png" alt="Release history page in the vendor portal" width="750"/>

   [View a larger version of this image](/images/channel-card.png)

* For applications that support KOTS, you can also do the following from the **Channel** page:

   * In the **Kubernetes installer** section, view the current Kubernetes installer promoted to the channel. Click **Installer history** to view the history of Kubernetes installers promoted to the channel. For more information about creating Kubernetes installers within a release or separate from a release, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

   * In the **Install** section, view and copy the installation commands for the latest release on the channel. For more information, see the [Installing an Application](/enterprise/installing-overview) section.

### Draft Release Page

For applications that support installation with KOTS, the **Draft** page provides a YAML editor to add, edit, and delete your application files and Replicated custom resources. You click **Releases > Create Release** in the vendor portal to open the **Draft** page. 

The following shows an example of the **Draft** page in the vendor portal:

 ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger version of this image](/images/guides/kots/default-yaml.png)

You can do the following tasks on the **Draft** page:

- In the file directory, manage the file directory structure. Replicated custom resource files are grouped together above the white line of the file directory. Application files are grouped together underneath the white line in the file directory.

  Delete files using the trash icon that displays when you hover over a file. Create a new file or folder using the corresponding icons at the bottom of the file directory pane. You can also drag and drop files in and out of the folders.

    ![Manage File Directory](/images/new-file-and-trash.png)

- Edit the YAML files by selecting a file in the directory and making changes in the YAML editor.

- In the **Help** or **Config help** pane, view the linter for any errors. If there are no errors, you get an **Everything looks good!** message. If an error displays, you can click the **Learn how to configure** link. For more information, see [Linter Rules](/reference/linter).

- Select the Config custom resource to preview how your application's Config page will look to your customers. The **Config preview** pane only appears when you select that file. For more information, see [About the Configuration Screen](config-screen-about).

- Select the Application custom resource to preview how your application icon will look in the admin console. The **Application icon preview** only appears when you select that file. For more information, see [Customizing the Application Icon](admin-console-customize-app-icon).