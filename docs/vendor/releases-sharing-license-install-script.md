# Getting the KOTS and kURL Installation Commands

This topic describes how to get the Replicated KOTS and Replicated kURL installation commands for releases in the Replicated vendor portal.

For information about getting installation commands with the replicated CLI, see [channel inspect](/reference/replicated-cli-channel-inspect). For information about getting installation commands with the Vendor API v3, see [Get install commands for a specific channel release](https://replicated-vendor-api.readme.io/reference/getchannelreleaseinstallcommands) in the Vendor API v3 documentation.

## Get Installation Commands for the Latest Release

Every channel in the vendor portal includes an **Install** section that lists the installation commands for the latest release promoted to the channel. This includes commands for installing in existing clusters and in embedded clusters with kURL.

In most cases, first time installations should use the commands in the **Install** section to install the latest release version. It is also possible to install a specific release by providing a version label with the installation command. For more information, see [Get Installation Commands for a Specific Release](#specific-release) below.

To get the installation commands for the latest release promoted to a channel:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Channels** page.

1. For the target channel, under **Install**, click either **KOTS Install** (for existing cluster installations) or **Embedded Cluster** (for embedded cluster installations with kURL) to view the desired installation command.

    <img alt="Install section of the channel card" src="/images/channel-card-install.png" width="400px"/>

    [View a larger version of this image](/images/channel-card-install.png)
   
## Get Installation Commands for a Specific Release {#specific-release}

It is possible to install a specific release version by providing a version label with the installation command. A customer might need to install a specific release if, for example, the latest version is not compatible with their installation environment. Additionally, software vendors might need to install a certain version for the purpose of troubleshooting or testing.

Typically, it is not necessary to specify a version label with the installation command for air gap installations because the customer can select the desired version in the Replicated download portal. The download portal will then make the correct assets available automatically. For more information, see [Download Air Gap Bundles from the Download Portal](/vendor/releases-download-airgap-bundles#download-portal).

To get the command for a specific release version:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Channels** page and find the channel where the release was promoted.

1. For the target channel, click **Release history**.

1. Click the **Install Commands** button for the target release.

1. In the **Install Commands** dialog, click either **KOTS Install** (for existing cluster installations) or **Embedded Cluster** (for embedded cluster installations with kURL) to view the desired installation command.

     <img alt="Existing Cluster KOTS install Command" src="/images/existing-cluster-command.png" width="500px"/>

     [View a larger version of this image](/images/existing-cluster-command.png)
