# Getting the Installation Commands

This topic describes how to find the Replicated KOTS and Replicated kURL installation commands for releases in the Replicated vendor portal.

For information about getting installation commands with the replicated CLI, see [channel inspect](/reference/replicated-cli-channel-inspect). For information about getting installation commands with the Vendor API v3, see [Get install commands for a specific channel release](https://replicated-vendor-api.readme.io/reference/getchannelreleaseinstallcommands) in the Vendor API v3 documentation.

## Overview

Releases can be installed with KOTS using a command that is specific to the channel where the release is promoted. Every channel in the vendor portal includes an **Install** section that lists the installation commands for the latest release promoted to the channel. The **Install** section includes the commands for KOTS installations into existing cluster or embedded clusters created with kURL.

## Get the Installation Command for the Latest Release on a Channel

To get the installation commands for the latest release promoted to a channel:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Channels** page and find the channel where the target release is promoted.

1. For the target channel, under **Install**, click either **KOTS Install** or **Embedded Cluster** to view and copy the desired installation command.

    <img alt="Install section of the channel card" src="/images/channel-card-install.png" width="400px"/>

    [View a larger version of this image](/images/channel-card-install.png)
   
## Get the Installation Command for a Specific Release

You can also retrieve the installation command for a specific release that was promoted to a channel. This is useful when a customer needs to install a particular version before they can upgrade to the latest, or when you need to install a version for the purpose of troubleshooting. Typically you do not need to share a specific version for air gap installations because the customer can select the application version in the download portal, and the correct assets are available automatically.

To get the command for a specific release version:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Channels** page and find the channel where the release was promoted.

1. For the target channel, click **Release history**.

1. Click the **Install Commands** button for the target release.

1. In the **Install Commands** dialog, click either **KOTS Install** or **Embedded Cluster** to view and copy the desired installation command.

     <img alt="Existing Cluster KOTS install Command" src="/images/existing-cluster-command.png" width="500px"/>

     [View a larger version of this image](/images/existing-cluster-command.png)
