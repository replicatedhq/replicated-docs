# Configuring Versions for KOTS Installations

The Replicated app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.

You can configure these optional KOTS installation version features in the Application custom resource. The attributes in this file help to control the application experience but are not deployed to the cluster. For more information, see [Application Custom Resource](../reference/custom-resource-application).

## Using Minimum KOTS versions (Beta)

>Introduced in app manager v1.62.0.

The `minKotsVersion` attribute in the Application custom resource file defines the minimum KOTS version that is required by the application release. Including this attribute enforces compatibility checks for both new installations and application updates. It also blocks an installation or an update if the currently deployed KOTS version is earlier than the `minKotsVersion`.

For existing installations, using `minKotsVersion` requires users to upgrade to the specified version of KOTS before they can update the application. This can be useful when you want to get users on the same version of KOTS that you are using for testing or when you want them to start using new features that you have added to a minimum version of KOTS. For example, if you do not have a backup and restore option, you can add the Replicated snapshots feature to your minimum KOTS version.

For more information about the user experience for updates, see [How the Admin Console Handles minKotsVersion](#how-the-admin-console-handles-minkotsversion).

### How the Admin Console Handles minKotsVersion

When you promote a new release specifying a minimum KOTS version that is later than what a user currently has deployed, that application version appears in the version history of the admin console after the user checks for updates. However, it is not downloaded.

The admin console temporarily displays an error message that informs the user that they must update KOTS before downloading the application version. This error also displays when the user checks for updates with the [`kots upstream upgrade`](../reference/kots-cli-upstream-upgrade) command. KOTS cannot update itself automatically, and users cannot update KOTS from the admin console.

After updating KOTS to the minimum version or later, users can return to the admin console and click **Download** next to the version to download the release. Alternatively, they can use the [`kots upstream download`](../reference/kots-cli-upstream-download) command.

:::note
When you promote a new release that changes the minimum KOTS version to a later version, you can also inform your users directly of the need to update KOTS if you are not certain that they will know how to proceed based on the error message in the admin console.
:::

## Using Target KOTS Versions

>Introduced in app manager v1.62.0.

The KOTS version that is targeted by the release.

Including `targetKotsVersion` in the Application manifest file of the release enforces compatibility checks for new installations and blocks the installation if the version used is later than the target version.

If the latest release in a channel includes `targetKotsVersion`, the install command for existing clusters is modified to install that specific version of KOTS. The install command for existing clusters is on the channel card in the [vendor portal](https://vendor.replicated.com).

Specifying a `targetKotsVersion` does not prevent an end user from upgrading to a later version of KOTS after the initial installation.

If a new version of the application specifies a later target KOTS version than what is currently installed, the end user is not prevented from deploying that version of the application.

If an end-user's admin console is running a version of KOTS that is earlier than the target version specified in the new version of the application, the admin console displays a message in the footer to indicate that a newer supported version of KOTS is available.

For installations to a cluster created by the Replicated Kubernetes installer, the version of the KOTS add-on must not be later than the target KOTS version specified in the Application manifest file. If the KOTS add-on version is later than the version specified for `targetKotsVersion`, the initial installation fails.

For more information about the KOTS add-on, see [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.
