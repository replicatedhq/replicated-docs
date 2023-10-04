# Step 5: Create a Customer

After promoting the first release, create a customer so that you can install.

A _customer_ represents a single licensed user of your application. When you create a customer, you define entitlement information for the user.

To create a customer:

1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

   The **Create a new customer** page opens:

   ![Customer a new customer page in the vendor portal](/images/create-customer.png)

   [View a larger version of this image](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer. For example, `Test Customer`.

1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

1. For **Customer email**, enter the email address for the customer. The customer email address is required to install the application with the Helm CLI. This email address is never used send emails to customers.

1. For **License type**, select Trial.

1. For **License options**, verify that **KOTS Install Enabled** is selected. This is the option that allows the customer to install with KOTS.

1. Click **Save Changes**.

## Next Step

Use the customer's license to install. See [Install the Release with KOTS](tutorial-helm-install-kots).

## Related Topics

* [About Customers](/vendor/licenses-about)
* [Creating and Managing Customers](/vendor/releases-creating-customer)
