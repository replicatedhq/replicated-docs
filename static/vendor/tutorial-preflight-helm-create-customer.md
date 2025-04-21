# Step 4: Create a Customer

After promoting the release, create a customer so that you can run the preflight checks and install.

To create a customer:

1. In the [Vendor Portal](https://vendor.replicated.com), click **Customers > Create customer**.

   The **Create a new customer** page opens:

   ![Customer a new customer page in the Vendor Portal](/images/create-customer.png)

   [View a larger version of this image](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer. For example, `Preflight Customer`.

1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

1. For **Customer email**, enter the email address for the customer. The customer email address is required to install the application with the Helm CLI. This email address is never used send emails to customers.

1. For **License type**, select Development.

1. Click **Save Changes**.

## Next Step

Use the Helm CLI to run the preflight checks you defined and install Gitea. See [Run Preflights with the Helm CLI](tutorial-preflight-helm-install).

## Related Topics

* [About Customers](/vendor/licenses-about)
* [Creating and Managing Customers](/vendor/releases-creating-customer)