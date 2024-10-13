import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"

# Installing with Helm

This topic describes how to use Helm to install releases that contain one or more Helm charts. For more information about the `helm install` command, including how to override values in a chart during installation, see [Helm Install](https://helm.sh/docs/helm/helm_install/) in the Helm documentation.

## Overview

The following diagram shows how Helm charts distributed with Replicated are installed with Helm in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="700px"/> 

[View a larger version of this image](/images/helm-install-diagram.png)

<HelmDiagramOverview/>

### Replicated Helm Values

When a customer installs your Helm chart from the Replicated registry, the Replicated registry injects values into the `global.replicated` field of the Helm chart values file.

The following is an example of a Helm values file containing the `global.replicated` field injected by the Replicated registry:

```yaml
# Helm values.yaml
global:
  replicated:
    channelName: Stable
    customerEmail: username@example.com
    customerName: Example Customer
    dockerconfigjson: eyJhdXRocyI6eyJd1dIRk5NbEZFVGsxd2JGUmFhWGxYWm5scloyNVRSV1pPT2pKT2NGaHhUVEpSUkU1...
    licenseFields:
      expires_at:
        description: License Expiration
        name: expires_at
        signature:
          v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA... 
        title: Expiration
        value: "2023-05-30T00:00:00Z"
        valueType: String
    licenseID: YiIXRTjiB7R...
    licenseType: dev
```

The values in the `global.replicated` field provide information about the following:
* Details about the fields in the customer's license, such as the field name, description, signature, value, and any custom license fields that you define. You can use this license information to check license entitlments before the application is installed. For more information, see [Checking Entitlements in Helm Charts Before Deployment](/vendor/licenses-reference-helm).
* A base64 encoded Docker configuration file. To proxy images from an external private registry with the Replicated proxy registry, you can use the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy registry. For more information, see [Proxying Images for Helm Installations](/vendor/helm-image-registry). 

### Limitations

Helm CLI installations do not provide access to any of the features of the Replicated KOTS installer, such as:
* Air gap bundles for installations into air gapped environments
* The KOTS Admin Console
* Strict preflight checks that block installation
* Backup and restore with snapshots
* Required releases with the **Prevent this release from being skipped during upgrades** option

## Prerequisites

Before you install, complete the following prerequisites:

* You must have a customer in the Replicated Vendor Portal with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted. For more information about creating and editing customers in the Vendor Portal, see [Creating a Customer](/vendor/releases-creating-customer).
* (Recommended) To install the Replicated SDK alongside the application, declare the SDK as a dependency. For more information, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_.

## Install

To install a Helm chart:

1. In the Vendor Portal, go to **Customers** and click on the target customer.

1. Click **Helm install instructions**.

     <img alt="Helm install button" src="/images/helm-install-button.png" width="700px"/>

     [View a larger image](/images/helm-install-button.png)

1. In the **Helm install instructions** dialog, run the first command to log in to the Replicated registry:

     ```bash
     helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
     ```
     Where:
     * `EMAIL_ADDRESS` is the customer's email address
     * `LICENSE_ID` is the ID of the customer's license

     :::note
     You can safely ignore the following warning message: `WARNING: Using --password via the CLI is insecure.` This message is displayed because using the `--password` flag stores the password in bash history. This login method is not insecure.

     Alternatively, to avoid the warning message, you can click **(show advanced)** in the **Helm install instructions** dialog to display a login command that excludes the `--password` flag. With the advanced login command, you are prompted for the password after running the command.  
     :::

1. (Optional) Run the second and third commands to install the preflight plugin and run preflight checks. If no preflight checks are defined, these commands are not displayed. For more information about defining and running preflight checks, see [About Preflight Checks and Support Bundles](preflight-support-bundle-about).

1. Run the fourth command to install using Helm:

     ```bash
     helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL/CHART_NAME
     ```
     Where:
     * `RELEASE_NAME` is the name of the Helm release.
     * `APP_SLUG` is the slug for the application. For information about how to find the application slug, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).
     * `CHANNEL` is the lowercased name of the channel where the release was promoted, such as `beta` or `unstable`. Channel is not required for releases promoted to the Stable channel.
     * `CHART_NAME` is the name of the Helm chart.

     :::note
     To install the SDK with custom RBAC permissions, include the `--set` flag with the `helm install` command to override the value of the `replicated.serviceAccountName` field with a custom service account. For more information, see [Customizing RBAC for the SDK](/vendor/replicated-sdk-customizing#customize-rbac-for-the-sdk).
     :::

1. (Optional) In the Vendor Portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and the details about the application instance are listed under the customer name. 

     **Example**:

     ![example customer in the Vendor Portal with an active instance](/images/sdk-customer-active-example.png)
     [View a larger version of this image](/images/sdk-customer-active-example.png)


## Helm installs for Airgap Environments (Alpha)
Replicated now supports installing and updating Helm charts in Airgapped environments and guiding end customers through the process with the [Download Portal](/vendor/releases-share-download-portal). Please ask your account rep to enable this feature if you're interested in trying it and providing feedback.

When this feature is enabled, a new option will be displayed for the Download Portal on the left nav, that when selected, will display 3 tabs (Install, Manual Update, Automate Updates):
![download helm option](/images/download-helm.png)

Each of these instruction sets assumes that your customer is accessing the Download Portal from a workstation that can access the internet and their internal private registry. Direct access to the target cluster is not require. Each method assumes that your customer is familiar with `curl`, `docker`, `helm`, `kubernetes`, and a bit of `bash`, particularly for automate.

### Install
The install instructions are designed to walk your customer through the first installation of your chart in a disconnected environment. They'll be presented with credentials (the license_id) to authenticate into the proxy registry that Replicated manages for you. From there, we present them with the full list of images and the corresponding `docker` `pull`, `tag`, and `push` commands for each. If they've provided their registry URI, we pre-configure the commands, else they'll need to manually replace the image names in the `tag` and `push` commands. Next they'll authenticate into the OCI registry that contains your Helm chart, and then install the `preflight` plugin. In the next steps, they'll get your default `values.yaml` and edit it to meet their environment's configuration needs. We recommend that your accompanying documentation include detailed instructions on what values they need to configure. Finally, your customer will specify how they access their cluster and then use the corresponding commands and their edited `values.yaml` to run the Preflight Checks and install the chart.

### Manual Updates
The manual update instructions follow closely with the install instructions. However, the first step prompts the customer to select their current version and target version to install. This step takes [required releases](/vendor/releases-about#properties) into consideration, thereby guiding the customer to the versions that are upgradable from their current version. The additional steps are very consistent with install process until the `preflight` and `install` commands where we need to get the existing values from the cluster with the `helm get values` and `--reuse-values` commands. Should you introduce new images, or other values, you should call this out at the top of your release notes so that customers know they will need to make additional edits to the `values.yaml` before installing. 

### Automate Updates
The automate update instructions rely on a few new API endpoints that your customers can automate against. We provide each customer with example commands that can be put into a script that they run periodically (i.e. nightly, weekly) via GitHub Actions, Jenkins etc. This method assumes that the customer has already done a successful manual installation, including the configuration the appropriate `values`.

After logging into the registry, we have the customer export their current version and use that to query an endpoint that provides the latest installable version number (either the next required release, or the latest release) and export it as the target version. With the target version, they can now query an API for the list of images. With this list of images the provided `bash` script will automate the process of pulling updated images from the repository, tagging them with a name for an internal registry, and then pushing the newly tagged images to their internal registry. With the assumption that the customer has set up the `values` to preserve the updated tag, they should now be able to login to the OCI registry and perform the commands to install the updated chart.