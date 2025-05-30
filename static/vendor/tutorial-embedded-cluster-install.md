# Step 5: Install the Release on a VM

Next, get the customer-specific Embedded Cluster installation commands and then install the release on a Linux VM.

To install the release with Embedded Cluster:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Customers**. Click on the name of the customer you created.

1. Click **Install instructions > Embedded cluster**.

    <img alt="Customer install instructions dropdown" src="/images/customer-install-instructions-dropdown.png" width="600px"/>

    [View a larger version of this image](/images/customer-install-instructions-dropdown.png) 

    The **Embedded cluster install instructions** dialog opens.

    <img alt="Embedded Cluster install instructions dialog" src="/images/embedded-cluster-install-dialog-latest.png" width="600px"/>

    [View a larger version of this image](/images/embedded-cluster-install-dialog-latest.png)

1. On the command line, SSH onto your Linux VM.

1. Run the first command in the **Embedded cluster install instructions** dialog to download the latest release.

1. Run the second command to extract the release.

1. Run the third command to install the release.

1. When prompted, enter a password for accessing the KOTS Admin Console.

    The installation command takes a few minutes to complete.

1. When the installation command completes, go to the URL provided in the output to log in to the Admin Console.

    **Example output:**

    ```bash
    ✔  Host files materialized
    ? Enter an Admin Console password: ********
    ? Confirm password: ********
    ✔  Node installation finished
    ✔  Storage is ready!
    ✔  Embedded Cluster Operator is ready!
    ✔  Admin Console is ready!
    ✔  Finished!
    Visit the admin console to configure and install gitea-kite: http://104.155.145.60:30000
    ```

    At this point, the cluster is provisioned and the KOTS Admin Console is deployed, but the application is not yet installed.

1. Bypass the browser TLS warning by clicking **Continue to Setup**.

1. Click **Advanced > Proceed**.

1. On the **HTTPS for the Gitea Admin Console** page, select **Self-signed** and click **Continue**.

1. On the login page, enter the Admin Console password that you created during installation and click **Log in**.

1. On the **Nodes** page, you can view details about the VM where you installed, including its node role, status, CPU, and memory. Users can also optionally add additional nodes on this page before deploying the application. Click **Continue**. 

    The Admin Console dashboard opens.
    
1. In the **Version** section, for version `0.1.0`, click **Deploy** then **Yes, Deploy**. 

    The application status changes from Missing to Unavailable while the `gitea` Deployment is being created.

1. After a few minutes when the application status is Ready, click **Open App** to view the Gitea application in a browser:

    ![Admin console dashboard showing ready status](/images/gitea-ec-ready.png)

    [View a larger version of this image](/images/gitea-ec-ready.png)

    <img alt="Gitea app landing page" src="/images/gitea-app.png" width="600px"/>

    [View a larger version of this image](/images/gitea-app.png)

1. In another browser window, open the [Vendor Portal](https://vendor.replicated.com/) and go to **Customers**. Select the customer that you created.

    On the **Reporting** page for the customer, you can see details about the customer's license and installed instances:

    ![Customer reporting page](/images/gitea-customer-reporting-ec.png)

    [View a larger version of this image](/images/gitea-customer-reporting-ec.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page.

    On the instance details page, you can see additional insights such as the version of Embedded Cluster that is running, instance status and uptime, and more:

    ![Customer instance details page](/images/gitea-instance-insights-ec.png)

    [View a larger version of this image](/images/gitea-instance-insights-ec.png)

1. (Optional) Reset the node to remove the cluster and the application from the node. This is useful for iteration and development so that you can reset a machine and reuse it instead of having to procure another machine.

   ```bash
   sudo ./APP_SLUG reset --reboot
   ```
   Where `APP_SLUG` is the unique slug for the application that you created. You can find the appication slug by running `replicated app ls` on the command line on your local machine.

## Summary

Congratulations! As part of this tutorial, you created a release in the Replicated Vendor Portal and installed the release with Replicated Embedded Cluster in a VM. To learn more about Embedded Cluster, see [Embedded Cluster Overview](embedded-overview).

## Related Topics

* [Embedded Cluster Overview](embedded-overview)
* [Customer Reporting](/vendor/customer-reporting)
* [Instance Details](/vendor/instance-insights-details)
* [Reset a Node](/vendor/embedded-using#reset-a-node)