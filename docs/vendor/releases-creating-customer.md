import ChangeChannel from "../partials/customers/_change-channel.mdx"

# Creating and Managing Customers

This topic describes how to create and manage customers in the Replicated vendor portal. For more information about customer licenses, see [About Customers](licenses-about).

## Create a Customer

This procedure describes how to create a new customer in the vendor portal. You can edit customer details at any time in the vendor portal  by going to **Customers > Customer details**.

To create a customer:

1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

   The **Create a new customer** page opens:

   ![Customer a new customer page in the vendor portal](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer.

1. For **Customer email**, enter the email address for the customer. The customer email address is required for Helm installations. This email address is never used send emails to customers.

1. For **Assigned channel**, assign the customer to one of your channels. You can select any channel that has at least one release. The channel a customer is assigned determines the application releases that they can install. For more information, see [Channel Assignment](licenses-about#channel-assignment) in _About Customer Licenses_.

   :::note
   <ChangeChannel/>
   :::

1. For **Expiration policy**, by default, **Customer's license does not expire** is enabled. To set an expiration date for the license, enable **Customer's license has an expiration date** and specify an expiration date in the **When does this customer expire?** calendar. 

1. For **Customer type**, set the customer type. Customer type is used only for reporting purposes. Customer access to your application is not affected by the type you assign to them. By default, **Trial** is selected. For more information, see [About Customer License Types](licenses-about-types).

1. In the **License options** pane, enable the options that you have added to your application package. For more information, see [About built-in license fields](licenses-using-builtin-fields).

    The available license options are:

      <table>
        <tr>
          <th width="30%">Name</th>
          <th width="70%">Description</th>
        </tr>
        <tr>
          <td>Airgap Download Enabled</td>
          <td>Enables new installations with this license to install from an air gap package or from an online installation.</td>
        </tr>
        <tr>
          <td>Gitops Enabled</td>
          <td>Enables existing cluster and embedded cluster installations to transition to a GitOps workflow for deployment.</td>
        </tr>
        <tr>
          <td>Identity Service Enabled</td>
          <td>Enables customers to integrate with third-party identity service providers to provision RBAC for authenticating to the admin console.</td>
        </tr>
        <tr>
          <td>Support Bundle Upload Enabled</td>
          <td>Enables installations to upload support bundles directly from the admin console.</td>
        </tr>
        <tr>
          <td>Allow Snapshot</td>
          <td>Enables customers to create snapshots for backup and restore. Vendors must also add a Backup custom resource. See <a href="/reference/custom-resource-backup">Backup</a>.</td>
        </tr>
      </table>

1. (Optional) For **Custom fields**, you can add custom fields that let you securely deliver customer-specific values or entitlements to the installation. The custom fields you create apply to all customers. For more information, see [Managing Custom License Fields](licenses-adding-custom-fields).

1. Click **Save Changes**.

## Archive a Customer

When you archive a license in the vendor portal, it is hidden in the default license search and becomes read-only. Archival does not affect the utility of license files downloaded before the license was archived. Archiving a license affects only how the license is displayed in the vendor portal.

To expire a license, set an expiration date and policy before you archive.

To archive a customer:

1. In the vendor portal, click **Customers > Customer details**.

1. Click **Archive Customer**.
