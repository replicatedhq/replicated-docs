# Step 4: Create a Test Customer

After promoting the release, create a customer so that you can install the release. A _customer_ represents a single licensed user of your application.

To create a customer:

1. In the [Vendor Portal](https://vendor.replicated.com), under the application drop down, select the SlackerNews application that you created.

    <img alt="App drop down" src="/images/quick-start-app-dropdown-slackernews.png" width="250px"/>

    [View a larger version of this image](/images/quick-start-app-dropdown-slackernews.png)

1. Click **Customers > Create customer**.

    The **Create a new customer** page opens:

    ![Customer a new customer page in the Vendor Portal](/images/create-customer.png)

    [View a larger version of this image](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer. For example, `Example Customer`.

1. For email, enter an email address for the customer.

    Helm CLI installations require that the customer has a valid email address to authenticate with the Replicated registry.  

1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

1. For **Customer type**, select **Development**.

1. For **Install types**, enable **Existing Cluster (Helm install)**.

1. Click **Save Changes**.


## Next Step

Get the KOTS installation command and install. See [Step 6: Install the Release with KOTS](tutorial-kots-helm-install-kots).

## Related Topics

* [About Customers](/vendor/licenses-about)
* [Creating and Managing Customers](/vendor/releases-creating-customer)
