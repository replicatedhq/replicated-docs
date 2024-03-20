# About Sharing Releases with Customers

This topic describes sharing releases so that your application can be installed by your customers.

## Overview

After you promote a release to a channel in the vendor portal, you can share the release with your customers.

The following assets are required to install your application with Replicated KOTS:

Additionally, to support automated installations with the Replicated kots CLI, you must provide a template of the ConfigValues file for the release. For more information, see [Sharing a ConfigValues File](releases-configvalues).

You can either share these files and installation commands directly with a customer, or you can provide the customer with a link to the Replicated download portal.

## About Sharing KOTS Installation Commands

KOTS installation commands are unique to the channel where the target release is promoted.

You can also share installation commands for specific versions of the application. This is useful when a customer needs to install a particular version or when you need to install and troubleshoot a version. Typically you do not need to share a specific version for air gap installations because the customer can select the application version in the download portal, and the correct assets are available automatically.

For information about getting installation commands with the replicated CLI, see [channel inspect](/reference/replicated-cli-channel-inspect).

For information about getting installation commands with the Vendor API v3, see [Get install commands for a specific channel release](https://replicated-vendor-api.readme.io/reference/getchannelreleaseinstallcommands) in the Vendor API v3 documentation.

To get the installation commands from the vendor portal:

1. In the [vendor portal](https://vendor.replicated.com), on the **Channels** page, find the channel to which the customer is assigned.

1. Do one of the following:
   * **Share the latest release version**: Under **Install**, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.
   * **Share a specific release version**:
      1. Click **Release history**.
      1. Click **Install Commands** for a specific version. Then, click either **Existing Cluster** or **Embedded Cluster** to view and copy the desired installation command.

        ![Existing Cluster Command](/images/existing-cluster-command.png)


## Download Bundles for Air Gap Installations

### Build and Download the Air Gap Bundle {#air-gap-bundle}

### Download the kURL Bundle {#installer-bundle}
