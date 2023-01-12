# Setting Minimum and Target Versions for KOTS

Minimum and target KOTS versions are optional features that are configured in the Application custom resource file. The attributes in this custom resource help to control the application experience, but the custom resource is not deployed to the cluster. For more information, see [Application Custom Resource](../reference/custom-resource-application).

:::note
The Replicated app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.
:::

## Using Minimum KOTS Versions (Beta)

>Introduced in app manager v1.62.0.

The `minKotsVersion` attribute in the Application manifest file defines the minimum KOTS version that is required by the application release. This can be useful when you want to get users who are lagging behind to update to a more recent KOTS version, or if your application requires functionality that was introduced in a particular KOTS version.

Including this attribute enforces compatibility checks for both new installations and application updates. An installation or update is blocked if the currently deployed KOTS version is earlier than the specified minimum KOTS version. Users must upgrade to at least the specified minimum version of KOTS before they can install or update the application.

### How the Admin Console Handles minKotsVersion

When you promote a new release specifying a minimum KOTS version that is later than what a user currently has deployed, and that user checks for updates, that application version appears in the version history of the admin console. However, it is not downloaded.

The admin console temporarily displays an error message that informs the user that they must update KOTS before downloading the application version. This error also displays when the user checks for updates with the [`kots upstream upgrade`](../reference/kots-cli-upstream-upgrade) command.

KOTS cannot update itself automatically, and users cannot update KOTS from the admin console. For more information on updating KOTS, see [Updating the Admin Console on an Existing Cluster](../enterprise/updating-existing-cluster) and [Updating the Admin Console on a Kubernetes Installer-Created Cluster](../enterprise/updating-embedded-cluster).

After updating KOTS to the minimum version or later, users can use the admin console or the [`kots upstream download`](../reference/kots-cli-upstream-download) command to download the release and subsequently deploy it.


## Using Target KOTS Versions

>Introduced in app manager v1.62.0.

 Including `targetKotsVersion` in the Application manifest file enforces compatibility checks for new installations. It blocks the installation if a user tries to install a version of KOTS that is later than the target version. For example, this can prevent users from installing a version of KOTS that you have not tested yet.

If the latest release in a channel includes `targetKotsVersion`, the install command for existing clusters is modified to install that specific version of KOTS. The install command for existing clusters is on the channel card in the [vendor portal](https://vendor.replicated.com).

### How the Admin Console Handles targetKotsVersion

Specifying a `targetKotsVersion` does not prevent an end user from upgrading to a later version of KOTS after the initial installation.

If a new version of the application specifies a later target KOTS version than what is currently installed, users are not prevented from deploying that version of the application.

If a user's admin console is running a version of KOTS that is earlier than the target version specified in a new version of the application, the admin console displays a notification in the footer, indicating that a newer supported version of KOTS is available.

### Using Target Versions with the Kubernetes Installer

For installations to a cluster created by the Replicated Kubernetes installer, the version of the KOTS add-on must not be later than the target KOTS version specified in the Application manifest file. If the KOTS add-on version is later than the version specified for `targetKotsVersion`, the initial installation fails.

For more information about the KOTS add-on, see [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.
