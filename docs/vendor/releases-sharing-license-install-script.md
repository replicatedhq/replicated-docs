# Getting Installation Commands for a Release

This topic describes where to find the installation commands for releases in the Replicated Vendor Portal.

For information about getting installation commands with the Replicated CLI, see [channel inspect](/reference/replicated-cli-channel-inspect). For information about getting installation commands with the Vendor API v3, see [Get install commands for a specific channel release](https://replicated-vendor-api.readme.io/reference/getchannelreleaseinstallcommands) in the Vendor API v3 documentation.

## Get Installation Commands for the Latest Release

Every channel in the Vendor Portal includes an **Install** section that lists the different installation commands for the latest release promoted to the channel.

In most cases, first time installations should use the commands in the **Install** section to install the latest release version. It is also possible to install a specific release by providing a version label with the installation command. For more information, see [Get Installation Commands for a Specific Release](#specific-release) below.

To get the installation commands for the latest release promoted to a channel:

1. In the [Vendor Portal](https://vendor.replicated.com), go to the **Channels** page.

1. For the target channel, under **Install**, click the tab for the type of installation command that you want to view:

    * **KOTS**: View the command for installing with KOTS in existing clusters.

      <img alt="Install section of the channel card" src="/images/channel-card-install.png" width="400px"/>
      [View a larger version of this image](/images/channel-card-install.png)

    * **Embedded K8s**: View the commands for installing with Replicated Embedded Cluster or Replicated kURL on VMs or bare metal servers.
    
      In the dropdown, choose **kURL** or **Embedded Cluster** to view the command for the target installer:

      <img alt="Install section of the channel card" src="/images/channel-card-embedded-k8s.png" width="400px"/>
      [View a larger version of this image](/images/channel-card-embedded-k8s.png)

      <img alt="Install section of the channel card" src="/images/channel-card-embedded-k8s-ec.png" width="400px"/>
      [View a larger version of this image](/images/channel-card-embedded-k8s-ec.png)

      :::note
      The Embedded Cluster installation instructions are customer-specific. Click **View customer list** to get the Embedded Cluster instructions from the page for the target customer. For more information, see [Get Customer-Specific Installation Instructions for Helm or Embedded Cluster](#customer-specific) below.
      :::

    * **Helm**: View the command for installing with the Helm CLI in an existing cluster.

      <img alt="Install section of the channel card" src="/images/channel-card-helm.png" width="400px"/>
      [View a larger version of this image](/images/channel-card-helm.png)

      :::note
      The Helm installation instructions are customer-specific. Click **View customer list** to get the Helm CLI instructions from the page for the target customer. For more information, see [Get Customer-Specific Installation Instructions for Helm or Embedded Cluster](#customer-specific) below.
      :::
   
## Get Installation Commands for a Specific Release on the Release History Page {#specific-release}

It is possible to install a specific release version by providing a version label with the installation command. A customer might need to install a specific release if, for example, the latest version is not compatible with their installation environment. Additionally, software vendors might need to install a certain version for the purpose of troubleshooting or testing.

Typically, it is not necessary to specify a version label with the installation command for air gap installations because the customer can select the desired version in the Replicated Download Portal. The Download Portal will then make the correct assets available automatically. For more information, see [Download Air Gap Bundles from the Download Portal](/vendor/releases-download-airgap-bundles#download-portal).

To get the command for a specific release version:

1. In the [Vendor Portal](https://vendor.replicated.com), go to the **Channels** page.

1. For the target channel, click **Release history**.

1. Click the **Install Commands** button for the target version.

1. In the **Install Commands** dialog

    :::note
    The Helm installation instructions are customer-specific. Click **View customer list** to get the Helm CLI instructions from the page for the target customer. For more information, see [Get Customer-Specific Installation Instructions for Helm or Embedded Cluster](#customer-specific) below.
    :::

## Get Customer-Specific Installation Instructions for Helm or Embedded Cluster {#customer-specific}

Installation instructions for the Helm CLI and Replicated Embedded Cluster are customer-specific. You can find installation instructions on the page for the target customer.

To get customer-specific Helm or Embedded Cluster installation instructions:

1. In the [Vendor Portal](https://vendor.replicated.com), go to the **Customers** page and click on the target customer.

1. At the top of the page, click the **Install instructions** drop down, then click **Helm** or **Embedded cluster**. 