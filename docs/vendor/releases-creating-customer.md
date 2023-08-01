import ChangeChannel from "../partials/customers/_change-channel.mdx"

# Creating and Managing Customers

This topic describes how to create and manage customers in the Replicated vendor portal. For more information about customer licenses, see [About Customers](licenses-about).

## Create a Customer

This procedure describes how to create a new customer in the vendor portal. You can edit customer details at any time in the vendor portal by going to the **Customer details** for a customer. For more information, see [Customer Details Page](licenses-about#customer-details-page) in _About Customers_.

To create a customer:

1. In the [vendor portal](https://vendor.replicated.com), click **Customers > Create customer**.

   The **Create a new customer** page opens:

   ![Customer a new customer page in the vendor portal](/images/create-customer.png)

1. For **Customer name**, enter a name for the customer.

1. For **Customer email**, enter the email address for the customer. The customer email address is required for Helm installations. This email address is never used send emails to customers.

1. For **Assigned channel**, assign the customer to one of your channels. You can select any channel that has at least one release. The channel a customer is assigned to determines the application releases that they can install. For more information, see [Channel Assignment](licenses-about#channel-assignment) in _About Customers_.

   :::note
   <ChangeChannel/>
   :::

1. For **Expiration policy**, by default, **Customer's license does not expire** is enabled. To set an expiration date for the license, enable **Customer's license has an expiration date** and specify an expiration date in the **When does this customer expire?** calendar. 

1. For **Customer type**, set the customer type. Customer type is used only for reporting purposes. Customer access to your application is not affected by the type you assign to them. By default, **Trial** is selected. For more information, see [About Customer License Types](licenses-about-types).

1. (KOTS Only) In the **License options** pane, configure any of the built-in KOTS entitlements that you support in your application. For more information, see [Built-in License Fields](licenses-using-builtin-fields).

    The available license options are:

      <table>
        <tr>
          <th width="30%">Name</th>
          <th width="70%">Description</th>
        </tr>
        <tr>
          <td>KOTS Install Enabled</td>
          <td>Enables customers to install with Replicated KOTS.</td>
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

1. (Optional) For **Custom fields**, configure any custom fields that are available for your Replicated application. For more information about how to create custom fields for your application, see [Managing Custom License Fields](licenses-adding-custom-fields).

1. Click **Save Changes**.

## Edit a Customer

You can edit the built-in and custom license fields for a customer at any time.
   
Replicated recommends that you test any licenses changes in a development environment. If needed, install the application using a developer license matching the current customer's entitlements before editing the developer license. Then validate the updated license.

:::important
For online environments, changing license entitlements can trigger changes to the customer's installed application instance during runtime. Replicated recommends that you verify the logic your application uses to query and enforce the target entitlement before making any changes.
:::

To edit license fields:

1. In the [vendor portal](https://vendor.replicated.com), click **Customers**.

1. Select the target customer and click the **Customer details** tab.

1. On the **Customer details** page, edit the desired fields and click **Save**.

   ![Full customer details page for a customer named Prestige Financial](/images/customer-details.png)

1. Test the changes by installing or updating in a development environment. Do one of the following, depending on the installation method for your application:
    * For applications installed with Helm that use the Replicated SDK, you can add logic to your application to enforce entitlements before installation or during runtime using the Replicated SDK API license endpoints. See [Checking Entitlements for Helm Installations (Beta)](licenses-reference-helm).
    * For applications installed with Replicated KOTS, update the license in the admin console. See [Update Online Licenses](/enterprise/updating-licenses#update-online-licenses) and [Update Air Gap Licenses](/enterprise/updating-licenses#update-air-gap-licenses) in _Updating Licenses_.

## Archive a Customer

When you archive a customer in the vendor portal, the customer is hidden from search by default and becomes read-only. Archival does not affect the utility of license files downloaded before the customer was archived.

To expire a license, set an expiration date and policy in the **Expiration policy** field before you archive the customer.

To archive a customer:

1. In the vendor portal, click **Customers**. Select the target customer then click the **Customer details** tab.

1. Click **Archive Customer**. In the confirmation dialog, click **Archive Customer** again.

You can unarchive by clicking **Unarchive Customer** in the customer's **Customer details** page.


## Filter and Download Customer Data

The **Customers** page provides a standard text search box and filters that help you find customers based on whether they are active, by their license type, or by channel name. You can also download customer data to a CSV file and export it for further analysis.

For example, this data can help you determine which customers are inactive and might be likely to churn, or see which customers are on a vulnerable application version so you can support them in upgrading to the latest stable version.

### Filter

To filter the list of customers:

1. On the **Customers** page, select the filter icon to the right of the Search box. 

  ![Filter customer list](/images/customers-filter.png)

  [View a larger version of this image](/images/customers-filter.png)

1. From the filter dropdown list, select active or inactive customers, license type (Any, Development, Trial, Paid, Community), or channel (Any, Stable, Beta, Unstable). 

  You can search using more than one criteria, such as Inactive, Active, Paid, and Stable. However, you can select only one license type and one channel at a time. So, if you want information about multiple license types or channels, you can download a CSV file instead. For more information, see [Download](#download).

  The search results display in the list.

1. (Optional) Enter text in the search box to refine the search results, if needed.

1. (Optional) You can deselect specific filters as needed, or select **Reset** to delete all of the filters and reset to the full customer list view.

### Download {#download}

You can download all of your customer data to a CSV file and use the data for analysis. For example, you can import the data to a spreadsheet and then sort by license types.

To download customer data, select **Download CSV** in the upper right corner of the **Customers** page.

![Filter customer list](/images/customers-download-csv.png)

[View a larger version of this image](/images/customers-download-csv.png)
