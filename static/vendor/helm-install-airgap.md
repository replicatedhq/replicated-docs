# Install and Update with Helm in Air Gap Environments

This topic describes how to use Helm to install releases that contain one or more Helm charts in air-gapped environments.

## Overview

Replicated supports installing and updating Helm charts in air-gapped environments with no outbound internet access. In air gap Helm installations, customers are guided through the process with instructions provided in the [Replicated Download Portal](/vendor/releases-share-download-portal).

When air gap Helm installations are enabled, an **Existing cluster with Helm** option is displayed in the Download Portal on the left nav. When selected, **Existing cluster with Helm** displays three tabs (**Install**, **Manual Update**, **Automate Updates**), as shown in the screenshot below:

![download helm option](/images/download-helm.png)

[View a larger version of this image](/images/download-helm.png)

Each tab provides instructions for how to install, perform a manual update, or configure automatic updates, respectively.

These installing and updating instructions assume that your customer is accessing the Download Portal from a workstation that can access the internet and their internal private registry. Direct access to the target cluster is not required.

Each method assumes that your customer is familiar with `curl`, `docker`, `helm`, `kubernetes`, and a bit of `bash`, particularly for automating updates.

## Prerequisites

Before you install, complete the following prerequisites:

* Reach out to your account rep to enable the Helm air gap installation feature.

* The customer used to install must have a valid email address. This email address is only used as a username for the Replicated registry and is never contacted. For more information about creating and editing customers in the Vendor Portal, see [Creating a Customer](/vendor/releases-creating-customer).

* The customer used to install must have the **Existing Cluster (Helm CLI)** install type enabled. For more information about enabling install types for customers in the Vendor Portal, see [Manage Install Types for a License](licenses-install-types).

* To ensure that the Replicated proxy registry can be used to grant proxy access to your application images during Helm installations, you must create an image pull secret for the proxy registry and add it to your Helm chart. To do so, follow the steps in [Using the Proxy Registry with Helm Installations](/vendor/helm-image-registry).

* Declare the SDK as a dependency in your Helm chart. For more information, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_.

## Install

The installation instructions provided in the Download Portal are designed to walk your customer through the first installation of your chart in an air gap environment.

To install with Helm in an air gap environment:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Customers > [Customer Name] > Reporting**.

1. In the **Download portal** section, click **Visit download portal** to log in to the Download Portal for the customer.

1. In the Download Portal left nav, click **Existing cluster with Helm**. 

     ![download helm option](/images/download-helm.png)

     [View a larger version of this image](/images/download-helm.png)

1. On the **Install** tab, in the **App version** dropdown, select the target application version to install.

1. Run the first command to authenticate into the Replicated proxy registry with the customer's credentials (the `license_id`).

1. Under **Get the list of images**, run the command provided to generate the list of images needed to install.

1. For **(Optional) Specify registry URI**, provide the URI for an internal image registry where you want to push images. If a registry URI is provided, Replicatd automatically updates the commands for tagging and pushing images with the URI.    

1. For **Pull, tag, and push each image to your private registry**, copy and paste the docker commands provided to pull, tag, and push each image to your internal registry.

    :::note
    If you did not provide a URI in the previous step, ensure that you manually replace the image names in the `tag` and `push` commands with the target registry URI.
    :::

1. Run the command to authenticate into the OCI registry that contains your Helm chart.

1. Run the command to install the `preflight` plugin. This allows you to run preflight checks before installing to ensure that the installation environment meets the requirements for the application.

1. For **Download a copy of the values.yaml file** and **Edit the values.yaml file**, run the `helm show values` command provided to download the values file for the Helm chart. Then, edit the values file as needed to customize the configuration of the given chart.

    If you are installing a release that contains multiple Helm charts, repeat these steps to download and edit each values file.

    :::note
    For installations with mutliple charts where two or more of the top-level charts in the release use the same name, ensure that each values file has a unique name to avoid installation error. For more information, see [Installation Fails for Release With Multiple Helm Charts](helm-install-troubleshooting#air-gap-values-file-conflict) in _Troubleshooting Helm Installations_.
    :::

1. For **Determine install method**, select one of the options depending on your ability to access the internet and the cluster from your workstation.

1. Use the commands provided and the values file or files that you edited to run preflight checks and then install the release.

## Perform Updates

This section describes the processes of performing manual and automatic updates with Helm in air gap environments using the instructions provided in the Download Portal.

### Manual Updates

The manual update instructions provided in the Download Portal are similar to the installation instructions.

However, the first step prompts the customer to select their current version an the target version to install. This step takes [required releases](/vendor/releases-about#properties) into consideration, thereby guiding the customer to the versions that are upgradable from their current version. 

The additional steps are consistent with installation process until the `preflight` and `install` commands where customers provide the existing values from the cluster with the `helm get values` command. Your customer will then need to edit the `values.yaml` to reference the new image tags.

If the new version introduces new images or other values, Replicated recommends that you explain this at the top of your release notes so that customers know they will need to make additional edits to the `values.yaml` before installing. 

### Automate Updates

The instructions in the Download Portal for automating updates use API endpoints that your customers can automate against. 

The instructions in the Download Portal provide customers with example commands that can be put into a script that they run periodically (nightly, weekly) using GitHub Actions, Jenkins, or other platforms.

This method assumes that the customer has already done a successful manual installation, including the configuration of the appropriate `values`.

After logging into the registry, the customer exports their current version and uses that to query an endpoint that provides the latest installable version number (either the next required release, or the latest release) and export it as the target version. With the target version, they can now query an API for the list of images. 

With the list of images the provided `bash` script will automate the process of pulling updated images from the repository, tagging them with a name for an internal registry, and then pushing the newly tagged images to their internal registry. 

Unless the customer has set up the `values` to preserve the updated tag (for example, by using the `latest` tag), they need to edit the `values.yaml` to reference the new image tags. After doing so, they can log in to the OCI registry and perform the commands to install the updated chart.

## Use a Harbor or Artifactory Registry Proxy

You can integrate the Replicated proxy registry with an existing Harbor or jFrog Artifactory instance to proxy and cache images on demand. For more information, see [Using a Registry Proxy for Helm Air Gap Installations](using-third-party-registry-proxy).