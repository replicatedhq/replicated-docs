# Step 3: Create a Customer

After promoting the first release, create a customer and download the license file so that you can install the application.

A _customer_ is an object in the Replicated vendor portal that represents a single licensed user of your application. When you create a customer, you define entitlement information for the user, and the vendor portal generates a YAML license file for the customer that you can download.

When you install the application later in this tutorial, you will upload the license file that you create in this step. The license allows the Replicated admin console to create the application containers.

To create a customer license and download the license file:

1. From the vendor portal, select **Customers** from the left menu.

1. Click **Create your first customer**.

  The Create a new customer page opens.

1. Edit the following fields, leaving the rest of the fields set to the default values:

    1. Enter a name for the **Customer Name**.
    1. Select **Unstable** for the **Assigned Channel**. The Unstable channel is where you promoted the release in [Step 3: Create a Release](tutorial-ui-create-release). Assigning the customer to a channel allows them to install the releases that are promoted to that channel.

      ![Create Customer](/images/guides/kots/create-customer.png)

    1. Click **Save Changes**.

    1. Click **Download license** from the dropdown menu in the upper right corner.

      The license file with your customer name and a YAML extension is downloaded. This is the license file that your customer uses to install your application. You will also use this license file to install and test the application on the test server.

## Next Step

Continue to [Step 4: Install the App Manager](tutorial-ui-install-app-manager) to get the installation commands from the Unstable channel and install the Replicated app manager components on your Kubernetes cluster.
