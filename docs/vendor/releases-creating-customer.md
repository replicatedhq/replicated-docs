# Creating a Customer

After you promote your first release to a channel, you create a customer. Additional customers can be added as needed.

Each customer that you create in the Replicated vendor portal has a unique license file. Each customer license uniquely identifies the customer and the application, specifies their release channel, and defines entitlement information about the customer. For more information about customer licenses, see [About Customers](licenses-about).

To create a customer:

1. From the [vendor portal](https://vendor.replicated.com), select Customers from the left menu.
1. Click **Create Customer**.

  The Create a new customer page opens.

1. Enter a customer name, customer email, and assign a channel in the corresponding fields.
1. In the **Expiration policy** pane, by default **Customer's license does not expire** is set. To set an expiration date for the license, enable **Customer's license has an expiration date** and specify an expiration date in the **When does this customer expire?** calendar. 

1. In the **Customer type** pane, set the customer type, which is used solely for reporting purposes. Customer access to your application is not affected by the type you assign to them. **Options:** Development, Trial, Paid, Community **Default:** Trial. For more information, see [About Customer License Types](licenses-about-types).

1. In the **License options** pane, enable the options that you have added to your application package. For more information, see [About built-in license fields](licenses-using-builtin-fields).

    The available license options are:

    <table>
        <tr>
          <th width="30%">Name</th>
          <th width="70%">Description</th>
        </tr>
        <tr>
          <td>Air gap</td>
          <td>Enables new installations with this license to install from an air gap package or from an online installation.</td>
        </tr>
        <tr>
          <td>Gitops Enabled</td>
          <td>Enables existing cluster and embedded cluster installations to transition to a GitOps workflow for deployment.</td>
        </tr>
        <tr>
          <td>Identity Service Enabled</td>
          <td>Enables installations to integrate with third-party identity service providers to provision RBAC for customer authenticating from the admin console.</td>
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

1. (Optional) You can add custom fields that let you securely deliver customer-specific values or entitlements to the installation. The custom fields you create apply to all customers. For more information, see [Managing Custom License Fields](licenses-adding-custom-fields).|

1. Click **Save Changes**.

1. Click the **Download license** icon on the **Customers** page to test your application and distribute your production release to customers.
