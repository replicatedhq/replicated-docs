# Step 5: Create a Customer

After promoting the first release, create a customer so that you can install.

A _customer_ is an object in the vendor portal that represents a single licensed user of your application. When you create a customer, you define entitlement information for the user. In order to install your application, your users must be associated with a customer in the vendor portal.

To create a customer:

1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

   The **Create a new customer** page opens:

   ![Customer a new customer page in the vendor portal](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer. For example, `Test Customer`.

1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

1. For **Customer email**, enter the email address for the customer. The customer email address is required to install the application with the Helm CLI. This email address is never used send emails to customers.

1. Click **Save Changes**.

## Related Topics

[Creating and Managing Customers](/vendor/releases-creating-customer)

## Next Step
