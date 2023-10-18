# Step 7: Install the Release with the Helm CLI

After successfully installing the release with KOTS, 

To install the same release with the Helm CLI:

1. Create a new customer to test the Helm CLI installation:

   1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

      The **Create a new customer** page opens:

      ![Customer a new customer page in the vendor portal](/images/create-customer.png)

      [View a larger version of this image](/images/create-customer.png)

   1. For **Customer name**, enter a name for the customer. For example, `Helm Customer`.

   1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

   1. For **Customer email**, enter the email address for the customer. The customer email address is required to install the application with the Helm CLI. This email address is never used send emails to customers.

   1. For **License type**, select Trial.

   1. For **License options**, _disable_ the **KOTS Install Enabled** entitlement.

   1. Click **Save Changes**.

1. Click **Helm Install Instructions**.

1. Run the first command to log in to the registry using the customer's license ID.

1. Run the third command to install the application.

1. Watch the `gitea` service until an `EXTERNAL-IP` is available:

   ```
   kubectl get svc gitea --watch
   ```

1. Follow the instructions in the output of the installation command to get the Gitea URL and open the application in a browser.

1. In another browser window, log in to the vendor portal and go to **Customers**. Select the customer that you created for the Helm CLI installation.

  On the **Reporting** page for the customer, you can see details about the customer, including the customer's license details and information about the customer's installed instances:

  ![Customer reporting](/images/tutorial-gitea-helm-reporting.png)

  [View a larger version of this image](/images/tutorial-gitea-helm-reporting.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page. You can see details about the instance, including the version of the Replicated SDK that is running in the cluster.

  ![Customer instance details](/images/tutorial-gitea-helm-instance.png)

  [View a larger version of this image](/images/tutorial-gitea-helm-instance.png)

## Related Topics

* [About Customers](/vendor/licenses-about)
* [Creating and Managing Customers](/vendor/releases-creating-customer)