# Online Installation with Embedded Cluster

This topic describes how to install an application in an online (internet-connected) environment with the Replicated Embedded Cluster installer. For information about air gap installations with Embedded Cluster, see [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap).

## Prerequisites

Before you install, complete the following prerequisites:

* Ensure that your installation environment meets the Embedded Cluster requirements. See [Embedded Cluster Requirements](/enterprise/installing-embedded-requirements).

* The application release that you want to install must include an [Embedded Cluster Config](/reference/embedded-config).

* The license used to install must have the **Embedded Cluster Enabled** license field enabled. See [Create and Manage Customers](/vendor/releases-creating-customer).

* Ensure that the required domains are accessible from servers performing the installation. See [Firewall Openings for Online Installations](/enterprise/installing-embedded-requirements#firewall).

## Install

To install an application with Embedded Cluster:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Customers** and click on the target customer. Click **Install instructions > Embedded Cluster**.

     ![Customer install instructions drop down button](/images/customer-install-instructions-dropdown.png)

     [View a larger version of this image](/images/customer-install-instructions-dropdown.png)

     The **Embedded Cluster install instructions** dialog is displayed.

     <img alt="Embedded cluster install instruction dialog" src="/images/embedded-cluster-install-dialog.png" width="500px"/>

     [View a larger version of this image](/images/embedded-cluster-install-dialog.png)

1. (Optional) In the **Embedded Cluster install instructions** dialog, under **Select a version**, select a specific application version to install. By default, the latest version is selected.

1. SSH onto the machine where you will install.

1. Run the first command in the **Embedded Cluster install instructions** dialog to download the installation assets as a `.tgz`.

1. Run the second command to extract the `.tgz`. The will produce the following files:

    * The installer
    * The license

1. Run the third command to install the release:

    ```bash
    sudo ./APP_SLUG install --license LICENSE_FILE
    ```
    Where:
    * `APP_SLUG` is the unique slug for the application.
    * `LICENSE_FILE` is the customer license.
    <br/>
    :::note
    Embedded Cluster supports installation options such as installing behind a proxy and changing the data directory used by Embedded Cluster. For the list of flags supported with the Embedded Cluster `install` command, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).
    :::

1. When prompted, enter a password for accessing the KOTS Admin Console.

     The installation command takes a few minutes to complete. During installation, Embedded Cluster completes tasks to prepare the cluster and install KOTS in the cluster. Embedded Cluster also automatically runs a default set of [_host preflight checks_](/vendor/embedded-using#about-host-preflight-checks) which verify that the environment meets the requirements for the installer.

      **Example output:**

      ```bash
      ? Enter an Admin Console password: ********
      ? Confirm password: ********
      ✔  Host files materialized!
      ✔  Running host preflights
      ✔  Node installation finished!
      ✔  Storage is ready!
      ✔  Embedded Cluster Operator is ready!
      ✔  Admin Console is ready!
      ✔  Additional components are ready!
      Visit the Admin Console to configure and install gitea-kite: http://104.155.145.60:30000
      ```

      At this point, the cluster is provisioned and the Admin Console is deployed, but the application is not yet installed.

1. Go to the URL provided in the output to access to the Admin Console.

1. On the Admin Console landing page, click **Start**.

1. On the **Secure the Admin Console** screen, review the instructions and click **Continue**. In your browser, follow the instructions that were provided on the **Secure the Admin Console** screen to bypass the warning.

1. On the **Certificate type** screen, either select **Self-signed** to continue using the self-signed Admin Console certificate or click **Upload your own** to upload your own private key and certificacte.

    By default, a self-signed TLS certificate is used to secure communication between your browser and the Admin Console. You will see a warning in your browser every time you access the Admin Console unless you upload your own certificate.

1. On the login page, enter the Admin Console password that you created during installation and click **Log in**.

1. On the **Nodes** page, you can view details about the machine where you installed, including its node role, status, CPU, and memory. 

     Optionally, add nodes to the cluster before deploying the application. For more information about joining nodes, see [Manage Multi-Node Clusters with Embedded Cluster](/enterprise/embedded-manage-nodes). Click **Continue**.

1. On the **Configure [App Name]** screen, complete the fields for the application configuration options. Click **Continue**.

1. On the **Validate the environment & deploy [App Name]** screen, address any warnings or failures identified by the preflight checks and then click **Deploy**.

    Preflight checks are conformance tests that run against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

The Admin Console dashboard opens.

On the Admin Console dashboard, the application status changes from Missing to Unavailable while the application is being installed. When the installation is complete, the status changes to Ready. For example:

![Admin console dashboard showing ready status](/images/gitea-ec-ready.png)

[View a larger version of this image](/images/gitea-ec-ready.png)