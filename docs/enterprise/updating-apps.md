# Updating an Application

You can update an application using the Replicated admin console or the kots CLI.
See [Update an Application in the Admin Console](#update-an-application-in-the-admin-console)
or [Update an Application with the kots CLI](#update-an-application-with-the-kots-cli) below.

## Update an Application in the Admin Console

You can manually update an application in the Version History tab of the Replicated admin console.
This method works for both online and air gapped installations.

For applications installed in an online environment, you can also configure the
admin console to automatically check for and deploy new versions of an application
on a custom cadence. For more information, see
[Configure Automatic Updates](#configure-automatic-updates) below.

To manually update an application:

1. In the admin console, go to the Version History tab.
1. Do one of the following, depending on if you are in an online or air gap environment:
   * (Online) Click **Check for updates** to manually check for new versions of the application.
   * (Air gap) Click **Upload a new version** to upload a new version of the application.

   When the admin console downloads an update (for online), or when you upload an update (for air gap),
   a new upstream version displays in the list of available versions.

   [![New Version Available](/images/new-version-available.png)](/images/new-version-available.png)

1. (Optional) When there are multiple versions of an application, you can compare
the changes between them by clicking **Diff releases** in the right corner.

   You can review changes between any two arbitrary releases by clicking the icon in the header
   of the release column. Select the two versions to compare, and click **Diff releases**
   to show the relative changes between the two releases.

   [![Diff Releases](/images/diff-releases.png)](/images/diff-releases.png)
   [![New Changes](/images/new-changes.png)](/images/new-changes.png)

1. Click the **View preflight checks** logo to view or re-run the preflight checks defined by
the application vendor.

   [![Preflight Checks](/images/preflight-checks.png)](/images/preflight-checks.png)

1. To update the application, return to the Version History tab
and click **Deploy** next to the target version.

   When you update an application, the current cluster is updated to the new version
   of the application and the Deployed status is set on that version.   

## Configure Automatic Updates

For applications installed in an online environment, the admin console automatically
checks for new versions once every 4 hours by default. After the admin console
checks for updates, it downloads any new versions of the application and displays
them on the Version History tab.

You can edit this default cadence to customize how often the admin console checks
for and downloads new versions.

You can also configure the admin console to automatically deploy new versions of
the application after it downloads them. The admin console only deploys new versions
automatically if preflight checks pass. By default, the admin console does not
automatically deploy any version of an application.

You cannot configure automatic updates for applications installed in air gapped
environments.

To configure automatic updates:

1. In the admin console, go to the Version History tab and click **Configure automatic updates**.

   The Configure automatic updates dialog opens.

1. Under Automatically check for updates, use the default or select a cadence (Hourly, Daily, Weekly, Never, Custom) from the dropdown list. 

   To turn off automatic updates, select **Never**. 
   
   To define a custom cadence, select **Custom**, then enter a cron expression in the text field. For more information about cron expressions, see [Cron Expressions](/reference/cron-expressions) in _Reference_.

   ![Configure automatic updates](/images/automatic-updates-config.png)

1. Under Automatically deploy new versions, select an option. The available options depend on whether semantic versioning is enabled for the channel.
   * **For channels that use semantic versioning**: (v1.58.0 and later) Select an option in the dropdown
   to specify the versions that the admin console automatically deploys. For example,
   to automatically deploy only new patch and minor versions, select
   **Automatically deploy new patch and minor versions**.
   * **For channels that do not use semantic versioning**: (v1.67.0 and later) Optionally select **Enable automatic deployment**.
   When this checkbox is enabled, the admin console automatically deploys each new version of the application that it downloads.

## Update an Application with the kots CLI

The kots CLI can be used to install and deploy updates for both online and air gapped instances as well.

### Online Installations

In order to download updates from the internet, the following command can be used:

```bash
kubectl kots upstream upgrade <app slug> -n <admin console namespace>
```

Adding the `--deploy` flag will also automatically deploy the latest version.

### Air Gapped Installations on an Existing Cluster

In order to install an update from an air gap file, the following command can be used:

```bash
kubectl kots upstream upgrade <app slug> \
  --airgap-bundle new-app-release.airgap \
  --kotsadm-namespace <registry namespace> \
  --kotsadm-registry <registry host> \
  --registry-username <username> \
  --registry-password <password> \
  -n <admin console namespace>
```

Adding the `--deploy` flag will also automatically deploy this version.

### Air Gapped Installations on a Kubernetes Installer-Created Cluster

> Introduced in the Replicated app manager v1.34.0

To update the application in an air gapped environment with a Kubernetes installer-created cluster, download the new application air gap bundle, and run the following command:

```bash
kubectl kots upstream upgrade APP_SLUG --airgap-bundle PATH_TO_AIRGAP_BUNDLE -n NAMESPACE
```
Adding the `--deploy` flag will also automatically deploy this version.

Replace:

* `APP_SLUG` with the unique slug for the application. The application slug is provided by the vendor.
* `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle file.
* `NAMESPACE` with the admin console namespace. Typically this value is `default`.
