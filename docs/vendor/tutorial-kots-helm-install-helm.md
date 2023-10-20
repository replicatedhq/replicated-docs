# Step 7: Install the Release with the Helm CLI

Next, install the same release using the Helm CLI. All releases that contain one or more Helm charts can be installed with the Helm CLI.

All Helm charts included in a release are automatically pushed to the Replicated registry when the release is promoted to a channel. Helm CLI installations require that the customer has a valid email address to authenticate with the Replicated registry.  

To install the release with the Helm CLI:

1. Create a new customer to test the Helm CLI installation:

   1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

      The **Create a new customer** page opens:

      ![Customer a new customer page in the vendor portal](/images/create-customer.png)

      [View a larger version of this image](/images/create-customer.png)

   1. For **Customer name**, enter a name for the customer. For example, `Helm Customer`.

   1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

   1. For **Customer email**, enter the email address for the customer. The customer email address is required to install the application with the Helm CLI. This email address is never used send emails to customers.

   1. For **License type**, select Trial.

   1. (Optional) For **License options**, _disable_ the **KOTS Install Enabled** entitlement. 

   1. Click **Save Changes**.

1. On the **Customer details** page for the new customer, click **Helm install instructions**.

   ![Helm install instrucitons button](/images/tutorial-gitea-helm-customer-install-button.png)

   [View a larger version of this image](/images/tutorial-gitea-helm-customer-install-button.png)

1. Run the commands in the provided in the **Helm install instructions** dialog to log in to the registry and install the Helm chart.

   <img alt="Helm install instructions dialog" src="/images/tutorial-gitea-helm-install-instructions.png" width="500px"/>

   [View a larger version of this image](/images/tutorial-gitea-helm-install-instructions.png)

   :::note
   You can ignore the **No preflight checks found** warning for the purpose of this tutorial. This warning appears because there are no specifications for preflight checks in the Helm chart archive.
   :::

1. After the installation command completes, watch the `gitea` LoadBalancer service until an external IP is available:

   ```
   kubectl get svc gitea --watch
   ```

1. After an external IP address is available for the `gitea` LoadBalancer service, follow the instructions in the output of the installation command to get the Gitea URL and then confirm that you can open the application in a browser.

1. In another browser window, open the [vendor portal](https://vendor.replicated.com/) and go to **Customers**. Select the customer that you created for the Helm CLI installation.

  On the **Reporting** page for the customer, because the Replicated SDK was installed alongside the Gitea Helm chart, you can see details about the customer's license and installed instances:

  ![Customer reporting](/images/tutorial-gitea-helm-reporting.png)

  [View a larger version of this image](/images/tutorial-gitea-helm-reporting.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page.

  On the instance details page, you can see additional insights such as the cluster where the application is installed, the version of the Replicated SDK running in the cluster, instance status and uptime, and more:

  ![Customer instance details](/images/tutorial-gitea-helm-instance.png)

  [View a larger version of this image](/images/tutorial-gitea-helm-instance.png)

## Next Step

Congratulations! As part of this tutorial, you created a release in the Replicated vendor platform and installed the release with both KOTS and the Helm CLI. To learn more about how to iterate on releases to add more functionality, such as defining preflight checks or custom license entitlements, see [Replicated Quick Start](replicated-onboarding). 

## Related Topics

* [About Installations with the Helm CLI](/vendor/distributing-overview#helm)
* [Installing with Helm](/vendor/install-with-helm)
* [About the Replicated SDK](/vendor/replicated-sdk-overview)