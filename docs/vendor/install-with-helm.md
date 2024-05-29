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
* A base64 encoded Docker configuration file. To proxy images from an external private registry with the Replicated proxy service, you can use the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy service. For more information, see [Proxying Images for Helm Installations](/vendor/helm-image-registry). 

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