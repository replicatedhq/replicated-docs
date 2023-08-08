import ChangeChannel from "../partials/customers/_change-channel.mdx"
import RequiredReleasesLimitations from "../partials/releases/_required-releases-limitations.mdx"
import RequiredReleasesDescription from "../partials/releases/_required-releases-description.mdx"
import VersionLabelReqsHelm from "../partials/releases/_version-label-reqs-helm.mdx"

# About Releases

This topic describes concepts about creating and promoting releases, editing release properties, and information about the Releases page in the Replicated vendor portal.

## Overview of Releases

A _release_ represents a single version of your application with the Replicated platform. Your application can use Helm charts, Kubernetes manifest files, or Kubernetes Operators. 

Replicated release features help you manage your product lifecycle effectively. You can test releases in a channel reserved for development, then promote the release to a Beta channel for customer testing, and ultimately promote the release to a Stable channel when it is ready for general availability.

You can use the vendor portal to create versions of your application and promote them to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate YAML files. Alternatively, you can use the replicated CLI and vendor API to automate releases. For more information about using the CLI, see [Installing the replicated CLI](/reference/replicated-cli-installing). For information about the API, see [Using the Vendor API v3](/reference/vendor-api-using).

### Release Promotion

When you are ready to test a release, you can promote it to any of your release channels. While you are iterating on and testing releases, Replicated recommends that you promote to a channel that does not have any customers assigned, such as the default Unstable channel. When you are ready to share your application with customers, you can then promote a release to the Beta or Stable channels. You can also create custom channels. For more information about channels, see [About Release Channels](releases-about-channels).

Every customer license file that you create in the vendor portal is assigned to a channel. Each time you promote a new release to a channel, customers assigned to that channel can update their installed application instance to the new release version.

### Release Properties

Each release has properties. You define release properties when you promote a release to a channel. You can edit release properties at any time from the channel **Release History** page in the vendor portal. For more information, see [Edit Release Properties](releases-creating-releases#edit-release-properties) in _Managing Releases with the Vendor Portal_.

The following shows an example of the release properties dialog:

<img src="/images/release-properties.png" width="500px" alt="release properties dialog for a release with version label 0.1.22"/>

[View a larger version of this image](/images/release-properties.png)

As shown in the screenshot above, the release has the following properties:

* **Version label**: The version label for the release. Version labels have the following requirements:

  * For releases that support installation with KOTS, if semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Semantic Versioning](#semantic-versioning) above.

  * For releases that support installation with Helm only:
    <VersionLabelReqsHelm/>

* **Requirements**: For releases distributed with Replicated KOTS, you can select **Prevent this release from being skipped during upgrades** to mark the release as required.

  <RequiredReleasesDescription/> 

  <RequiredReleasesLimitations/>

* **Release notes (supports markdown)**: Detailed release notes for the release. The release notes support markdown and are shown to your customer.

### Release Sequencing

By default, Replicated uses release sequence numbers to organize and order releases, and uses instance sequence numbers in an instance's internal version history.

#### Release Sequences

In the vendor portal, each release is automatically assigned a unique, monotonically-increasing sequence number. You can use this number as a fallback to identify a promoted or draft release, if you do not set the `Version label` field during promotion. For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases).

The following graphic shows release sequence numbers in the vendor portal:

![Release sequence numbers](/images/release-sequences.png)

[View a larger version](/images/release-sequences.png)

#### Instance Sequences 

When a KOTS instance checks for an application update, the vendor portal returns a release identifier (a sequence number or a version label) to the instance. The Replicated admin console then assigns the release a unique instance sequence number. This instance sequence is separate from a release sequence in the vendor portal. The instance sequence in the admin console starts at 0 and increments for each release identifier that is returned when KOTS checks for an update.

A single release sequence, such as `181`, can have multiple instance sequences in the deployed instances, depending on when those instances came online and how many other releases were seen before release sequence `181`.

Note that instance sequences are only tracked by KOTS instances, and the vendor portal has no knowledge of these numbers.

The following graphic shows instance sequence numbers on the admin console dashboard:

![Instance sequence numbers](/images/instance-sequences.png)

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

For information about how enterprise application users check for application updates in the admin console, see [Checking for Updates](/enterprise/updating-apps#checking-for-updates).

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

## About the Draft Release Page

For applications that support installation with KOTS, the **Draft** page provides a YAML editor to add, edit, and delete your application files and Replicated custom resources. You click **Releases > Create Release** in the vendor portal to open the **Draft** page. 

The following shows an example of the **Draft** page in the vendor portal:

 ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger image](/images/guides/kots/default-yaml.png)

You can do the following tasks on the **Draft** page:

- In the file directory, manage the file directory structure. Replicated custom resource files are grouped together above the white line of the file directory. Application files are grouped together underneath the white line in the file directory.

  Delete files using the trash icon that displays when you hover over a file. Create a new file or folder using the corresponding icons at the bottom of the file directory pane. You can also drag and drop files in and out of the folders.

    ![Manage File Directory](/images/new-file-and-trash.png)

- Edit the YAML files by selecting a file in the directory and making changes in the YAML editor.

- In the **Help** or **Config help** pane, view the linter for any errors. If there are no errors, you get an **Everything looks good!** message. If an error displays, you can click the **Learn how to configure** link. For more information, see [Using the Linter](/reference/linter#using-the-linter) in _Linter Rules_.

- Select the Config custom resource to preview how your application's Config page will look to your customers. The **Config preview** pane only appears when you select that file. For more information, see [About the Configuration Screen](config-screen-about).

- Select the Application custom resource to preview how your application icon will look in the admin console. The **Application icon preview** only appears when you select that file. For more information, see [Customizing the Application Icon](admin-console-customize-app-icon).
