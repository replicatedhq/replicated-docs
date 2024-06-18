# Setting Minimum and Target Versions for KOTS

This topic describes how to set minimum and target version for Replicated KOTS in the KOTS [Application](/reference/custom-resource-application) custom resource.

## Limitation

Setting minimum and target versions for KOTS is not supported for installations with [Replicated Embedded Cluster](/vendor/embedded-overview).

This is because each version of Embedded Cluster includes a particular version of KOTS. Setting `targetKotsVersion` or `minKotsVersion` to a version of KOTS that does not coincide with the version that is included in the specified version of Embedded Cluster will cause Embedded Cluster installations to fail with an error message like: `Error: This version of App Name requires a different version of KOTS from what you currently have installed.`.

To avoid installation failures, do not use `targetKotsVersion` or `minKotsVersion` in releases that support installation with Embedded Cluster.

## Using Minimum KOTS Versions (Beta)

The `minKotsVersion` attribute in the Application custom resource defines the minimum version of Replicated KOTS that is required by the application release. This can be useful when you want to get users who are lagging behind to update to a more recent KOTS version, or if your application requires functionality that was introduced in a particular KOTS version.

Including this attribute enforces compatibility checks for both new installations and application updates. An installation or update is blocked if the currently deployed KOTS version is earlier than the specified minimum KOTS version. Users must upgrade to at least the specified minimum version of KOTS before they can install or update the application.

### How the Admin Console Handles minKotsVersion

When you promote a new release specifying a minimum KOTS version that is later than what a user currently has deployed, and that user checks for updates, that application version appears in the version history of the Admin Console. However, it is not downloaded.

The Admin Console temporarily displays an error message that informs the user that they must update KOTS before downloading the application version. This error also displays when the user checks for updates with the [`kots upstream upgrade`](/reference/kots-cli-upstream-upgrade) command.

KOTS cannot update itself automatically, and users cannot update KOTS from the Admin Console. For more information on updating KOTS, see [Updating KOTS](/enterprise/updating-app-manager) and [Updating kURL Clusters](/enterprise/updating-kurl).

After updating KOTS to the minimum version or later, users can use the Admin Console or the [`kots upstream download`](/reference/kots-cli-upstream-download) command to download the release and subsequently deploy it.


## Using Target KOTS Versions

Including `targetKotsVersion` in the Application custom resource enforces compatibility checks for new installations. It blocks the installation if a user tries to install a version of KOTS that is later than the target version. For example, this can prevent users from installing a version of KOTS that you have not tested yet.

If the latest release in a channel includes `targetKotsVersion`, the install command for existing clusters is modified to install that specific version of KOTS. The install command for existing clusters is on the channel card in the [Vendor Portal](https://vendor.replicated.com).

### How the Admin Console Handles targetKotsVersion

Specifying a `targetKotsVersion` does not prevent an end user from upgrading to a later version of KOTS after the initial installation.

If a new version of the application specifies a later target KOTS version than what is currently installed, users are not prevented from deploying that version of the application.

If a user's Admin Console is running a version of KOTS that is earlier than the target version specified in a new version of the application, the Admin Console displays a notification in the footer, indicating that a newer supported version of KOTS is available.

### Using Target Versions with kURL

For installations in a cluster created by Replicated kURL, the version of the KOTS add-on must not be later than the target KOTS version specified in the Application custom resource. If the KOTS add-on version is later than the version specified for `targetKotsVersion`, the initial installation fails.

For more information about the KOTS add-on, see [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.
