---
toc_max_heading_level: 2
---

# App Manager Release Notes

## 1.68.0

Released on April 4, 2022

Support for Kubernetes: 1.21, 1.22, and 1.23

### New Features
* Adds the ability to make a KOTS application version required and blocking.
* Adds ability to choose minimal RBAC at install time if application supports it.
* Adds pagination to the version history page and improves the admin console API performance.

### Improvements
* Displays the node labels on the the cluster management page node row.
* The default troubleshoot analyzers will now specifically call out issues with envoy/contour if detected.

### Bug Fixes
* Fixes a bug with auto deploys where deployments would happen regardless of preflight success or failure. Auto-deploys will now only deploy if the preflights succeed.
* Fixes an issue where NFS snapshots could not be configured when Minio is enabled in the cluster.
* Fixes an issue where updating the snapshot storage location to NFS or Host Path would incorrectly display a dialog indicating that Velero was not installed and configured properly.
* Fixes an issue that could cause wrong metadata to be used at application install time when `--app-version-label` flag is used.
* Fixes an issue which causes the support bundle analysis and/or redactions to not show up in the troubleshoot page in the admin console in some cases.
* Fixes an issue where deployments weren't blocked when strict preflight analyzers fail due to parse/process errors.
* Fixes a style bug that causes the grid of metric graphs to be broken when there are more than three graphs.
* Fixed an issue on the config editor page that caused an element to be hidden under the navbar when the corresponding config item was clicked on from the sidebar.
* Fixed an issue where a version that was pulled in via automatic checks and deployed via automatic deployments would not be properly updated on the dashboard version card.
* Fixed an issue where a version that was pulled in via automatic checks and deployed via automatic deployments  and the previously deployed version would both show as the currently deployed version on the version history page.
* Fixes an issue where AWS IAM instance roles could not be used when configuring the snapshot storage destination.

## 1.67.0

Released on March 21, 2022

Support for Kubernetes: 1.21, 1.22, and 1.23

### New Features
* Adds support for installing a specific application version. For more information about installing a specific application version, see [Installing in an Online (Internet-connected) Environment](/enterprise/installing-existing-cluster-online) and [Installing with the Kubernetes Installer](/enterprise/installing-embedded-cluster).
* Extends the ability of status informers to detect if the application is being updated.
* Adds the ability to provide a strict preflight, which cannot be skipped and must not have any failure outcomes. Any failure outcomes will prevent the user from deploying the application. For more information on strict preflights, see [About preflight checks and support bundles​](/vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles) in Creating Preflight Checks and Support Bundles.
* New versions can automatically be deployed in the admin console, regardless of whether the vendor uses semantic versioning. For more information about automatically deploying new versions, see [Configure Automatic Updates​](/enterprise/updating-apps#configure-automatic-updates) in Updating an Application.

### Bug Fixes
* Fixes an issue that could cause images that are still used by the application to be deleted from the private registry in a Kubernetes installer-created cluster during image garbage collection.
* Fixes an issue where the same license could be installed more than once in some cases.
* Fixes an issue where the Cluster Management tab was not always initially present for Kubernetes installer-created clusters.
* Fixes an issue where attempting to re-download a pending application version would fail after upgrading the admin console from KOTS 1.65.
* Fixes an issue where the application icon in the metadata did not show as the favicon on the TLS pages.

## 1.66.0

Released on March 8, 2022

Support for Kubernetes: 1.21, 1.22, and 1.23

### New Features
* Adds the ability to exclude the applications or the admin console from full snapshot restores using the [`kots restore`](/reference/kots-cli-restore-index) command.
* Adds the ability to display the command to restore only the admin console from a [full snapshot](/enterprise/snapshots-understanding#full-snapshots-recommended) on the Full Snapshots page in the admin console.

### Improvements
* Adds the [`--no-port-forward`](/reference/kots-cli-install#usage) flag to the `kots install` command to disable automatic port-forwarding. The old `--port-forward` flag has been deprecated.

### Bug Fixes
* Corrects the placeholder Prometheus URL in the admin console dashboard so that it is accurate for embedded installations.
* Fixes a bug where the warning message sometimes printed incorrectly when a mismatch was detected between the kots CLI version and the version of the admin console that was running in the cluster.
* Fixes a bug where the **See details** button on the support bundle analysis page did not show any information about an unhealthy pod.
* Allows a user to re-upload a license if the application is not yet installed.
* Allows GitOps to be disabled when it is enabled but has an invalid configuration. Previously, you were required to fix the configuration before disabling GitOps.

## 1.65.0

Released on February 25, 2022

Support for Kubernetes: 1.20, 1.21, 1.22, and 1.23

### New Features
* Permanently enables the redesigned admin console app dashboard and version history pages introduced in [KOTS 1.60.0](#1600).
* Application versions that fail to download now appear in the version history. A new button is also present with the version to allow the download to be retried. Previously, these failures were lost when a newer version was downloaded successfully.
* Introduces the [`kots upstream download`](../reference/kots-cli-upstream-download) command to retry downloading a failed update of the upstream application.

### Improvements
* The port-forward initiated to access the admin console will continually retry when it is disconnected. If a new kotsadm pod comes up, the port forward will switch and forward to the new pod.
* If the `kots` CLI version doesn't match the KOTS API version in the cluster, a warning message is displayed advising the user to update the `kots` CLI to the appropriate version.

### Bug Fixes
* Fixes uploading preflight results from the CLI.
* Fixes a bug where the app icon in the metadata would not show as the favicon in Google Chrome.

## 1.64.0

Released on February 18, 2022

Support for Kubernetes: 1.20, 1.21, 1.22, and 1.23

### Improvements
* A MinIO image will no longer be present in new deployments when MinIO is not specified as an add-on in the Kubernetes installer specification.
* Enables an alternative that does not use MinIO for `hostPath` snapshots if the MinIO image is not present on the instance.

### Bug Fixes
* Fixes a bug that showed an incorrect diff on the version history page.
* Fixes deploy log errors for PVCs when using OpenEBS with Kubernetes 1.19 through 1.21.

## 1.63.0

Released on February 11, 2022

Supported on Kubernetes: 1.20, 1.21, 1.22, and 1.23

### New Features
* Changes the [`kots upstream upgrade`](../reference/kots-cli-upstream-upgrade) command to be synchronous by default and exposes error messages for it.

### Improvements
* Sets the Native Helm timeout to 60 minutes instead of 5 minutes.

## 1.62.0

Released on February 4, 2022

Supported on Kubernetes: 1.20, 1.21, 1.22, and 1.23

### New Features
* Adds [`targetKotsVersion`](../reference/custom-resource-application#targetkotsversion) as a field in the application spec. This field allows you to set a target version of KOTS for a release. The initial installation of an application will fail if the currently installed KOTS version is greater than the target version. When a target version is set, end users will receive a notification in the admin console if their currently deployed version of KOTS is less than the target version. For more informaiton, see the documentation.

* Adds [`minKotsVersion`](../reference/custom-resource-application/#minkotsversion-beta) (Beta) as a field in the application spec. This allows you to specify the minimum supported KOTS version for a release. An application cannot be installed if the currently deployed KOTS version is less than the minimum KOTS version specified for a release. See the [`minKotsVersion` documentation](../reference/custom-resource-application/#minkotsversion-beta) for caveats since this is a Beta feature.

### Improvements
* Defaults [`kubectl kots get config --appslug`](../reference/kots-cli-get-config) to the app slug of the deployed application if there is only one in the namespace.
* Defaults [`kubectl kots get config --sequence`](../reference/kots-cli-get-config) to the sequence of the latest available version.

### Bug Fixes
* Fixes a bug that caused the "Details" link, which shows the [application status](../vendor/admin-console-display-app-status), to be not visible in the new dashboard UI.
* Fixes the omission of certain password values from the rendered YAML file when using [`kubectl kots pull`](../reference/kots-cli-get-config).
* Fixes an issue that caused the license file included in a support bundle to contain a long array of integers instead of a string in the signature field.
* Fixes an issue which caused setting up a host path as a snapshot storage destination to fail.

## 1.61.0

Released on February 1, 2022

Supported on Kubernetes: 1.20, 1.21, 1.22, and 1.23

### New Features
* Adds a CLI command to [get all available versions for an application](../reference/kots-cli-get-versions) from the app manager.
* Adds the ability to block installing or upgrading an application if the current KOTS version is incompatible with the KOTS version required by the application. This feature is experimental and is only available to vendors who have requested access.

### Bug Fixes
* Fixes a bug that caused images to be pushed to a private registry multiple times during an air gap installation.
* Fixes a bug that erroneously displays a message to edit the current config when performing a new installation.
* Fixes an issue that caused [image garbage collection](../enterprise/image-registry-embedded-cluster#enable-and-disable-image-garbage-collection) to only remove images with the "latest" tag.

## 1.60.0

Released on January 25, 2022

Supported on Kubernetes: 1.20, 1.21, and 1.22

### New Features
* The admin console app dashboard and version history pages have been redesigned! This redesign improves the aesthetics of these pages and brings key functionality directly to the app dashboard. See [this blog](https://www.replicated.com/blog/new-features-announced-improvements-to-ux-host-preflights/) for more details.

### Improvements
* Updates MinIO to RELEASE.2022-01-08T03-11-54Z (resolves CVE-2021-43858 CVE).
* Updates Postgres to version 10.19.

### Bug Fixes
* Fixes an issue that caused images to be pushed multiple times during an [airgap installation](../enterprise/installing-existing-cluster-airgapped#upload-the-airgap-bundle) when the [Native Helm](../vendor/helm-processing/#native-helm) feature is enabled.
* Fixes an issue that prevented the deployment status labels from breaking into multiple lines on small displays.

## 1.59.3

Released on January 21, 2022

Supported on Kubernetes: 1.20, 1.21, and 1.22

### Improvements
* Updates the [kubectl](../reference/custom-resource-application#kubectlversion) patch versions and added kubectl version 1.22.x.

### Bug Fixes
* Fixes an issue that caused the load balancer services to regenerate, resulting in downtime.

## 1.59.2

Release on January 18, 2022

Supported on Kubernetes: 1.19, 1.20, and 1.21

### Bug Fixes
* Adds a more descriptive error message to the KOTS CLI when the provided host path does not exist for snapshots storage.
* Fixes a bug that caused the "Send bundle to vendor" link to display when this feature is not enabled.
* Resolves CSS style issues.
* Fixes a bug where excluded Helm charts could not change between `UseHelmInstall: true` and `UseHelmInstall: false` without errors.
* Fixes a problem where the "Internal Storage" option was not selected by default in kURL clusters with the `disableS3` option set.
* Fixes a bug when Helm dependencies are aliased for Helm-native releases.

## 1.59.1

Released on December 29, 2021

Supported on Kubernetes: 1.19, 1.20, and 1.21

### Bug Fixes
* Fixes a `panic: runtime error` that occurs when the [`kots upstream upgrade`](../reference/kots-cli-upstream-upgrade) command is run.

## 1.59.0

Released on December 22, 2021

Supported on Kubernetes: 1.19, 1.20, and 1.21

### New Features
* Adds the `kubectl kots get config` command to export config values. This includes a `--decrypt` flag to decrypt sensitive values.
* The internal storage location for snapshots now uses a persistent volume instead of object storage when the `disableS3` flag is set to `true` for embedded clusters. For more information about removing KOTS use of object storage, see the [kURL add-on documentation](https://kurl.sh/docs/add-ons/kotsadm).

### Improvements
* Adds version output for current and new releases to the [`upstream upgrade`](../reference/kots-cli-upstream-upgrade) CLI command.

### Bug Fixes
* Fixes a bug that caused analyzers to surface errors in namespaces not used by the application when the admin console has cluster access in existing cluster installations.
* Fixes an issue that caused image pull secrets to be rendered in the admin console namespace instead of the `namespace` specified in the kots.io/v1beta1.HelmChart when using `useHelmInstall`.
* Fixes the `kots pull` CLI command to properly inject `imagePullSecrets` when using Helm Charts with `useHelmInstall` set to `true`.
* Fixes a bug that causes application images to not be deleted from a [private registry](../enterprise/image-registry-embedded-cluster).
* Fixes a bug that causes images included in support bundle's [`run` collector](https://troubleshoot.sh/docs/collect/run/#image-required) to not be deleted from a private registry.

## 1.58.2

Released on December 14, 2021

Supported on Kubernetes: 1.19, 1.20, and 1.21

### Bug Fixes
* Fixes a bug that caused config updates to take a long time.

## 1.58.1

Released on December 1, 2021

Supported on Kubernetes: 1.19, 1.20, and 1.21

### Bug Fixes
* Fixes a bug that caused Native Helm to skip deploying some Helm resources on automated installations.

## 1.58.0

Released on December 1, 2021

Supported on Kubernetes: 1.19, 1.20, and 1.21

### New Features
 * Adds support for the semantic versioning of releases when the version labels are [valid](https://semver.org/). To use this feature, [enable semantic versioning for the channel](../vendor/releases-semantic-versioning) that the license is currently on.
 * Adds the ability to automatically deploy new patch, minor, or major [valid](https://semver.org/) semantic versions when [semantic versioning is enabled](../vendor/releases-semantic-versioning). This new capability can be configured from the **Version History** page under the 'Configure automatic updates' option.

## 1.57.0 and earlier

For release notes for app manager versions earlier than 1.58.0, see [Replicated App Manager Release Notes v1.9.0 - v1.65.0](../pdfs/app-manager-release-notes.pdf) in GitHub.
