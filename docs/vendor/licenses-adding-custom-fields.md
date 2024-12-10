# Managing Customer License Fields

This topic describes how to manage customer license fields in the Replicated Vendor Portal, including how to add custom fields and set initial values for the built-in fields.

## Set Initial Values for Built-In License Fields (Beta)

You can set initial values to populate the **Create Customer** form in the Vendor Portal when a new customer is created. This ensures that each new customer created from the Vendor Portal UI starts with the same set of built-in license field values.

:::note
Initial values are not applied to new customers created through the Vendor API v3. For more information, see [Create a customer](https://replicated-vendor-api.readme.io/reference/createcustomer-1) in the Vendor API v3 documentation.
:::

These _initial_ values differ from _default_ values in that setting initial values does not update the license field values for any existing customers.

To set initial values for built-in license fields:

1. In the Vendor Portal, go to **License Fields**.

1. Under **Built-in license options**, click **Edit** next to each license field where you want to set an initial value. 

     ![Edit Initial Value](/images/edit-initial-value.png)

     [View a larger version of this image](/images/edit-initial-value.png)

## Manage Custom License Fields

You can create custom license fields in the Vendor Portal. For example, you can create a custom license field to set the number of active users permitted. Or, you can create a field that sets the number of nodes a customer is permitted on their cluster.

The custom license fields that you create are displayed in the Vendor Portal for all new and existing customers. If the custom field is not hidden, it is also displayed to customers under the **Licenses** tab in the Replicated Admin Console.

### Limitation

The maximum size for a license field value is 64KB.

### Create Custom License Fields

To create a custom license field:

1. Log in to the Vendor Portal and select the application.

1. On the **License Fields** page, click **Create license field**.

   <img width="500" alt="create a new License Field dialog" src="/images/license-add-custom-field.png"/>

   [View a larger version of this image](/images/license-add-custom-field.png)

1. Complete the following fields:

   | Field                  | Description           |
   |-----------------------|------------------------|
   | Field | The name used to reference the field. This value cannot be changed. |
   | Title| The display name for the field. This is how the field appears in the Vendor Portal and the Admin Console. You can change the title in the Vendor Portal. |
   | Type| The field type. Supported formats include integer, string, text (multi-line string), and boolean values. This value cannot be changed. |
   | Default | The default value for the field for both existing and new customers. It is a best practice to provide a default value when possible. The maximum size for a license field value is 64KB. |
   | Required | If checked, this prevents the creation of customers unless this field is explicitly defined with a value. |
   | Hidden | If checked, the field is not visible to your customer in the Replicated Admin Console. The field is still visible to you in the Vendor Portal. **Note**: The Hidden field is displayed only for vendors with access to the Replicated installers (KOTS, kURL, Embedded Cluster). |

### Update Custom License Fields

To update a custom license field:

1. Log in to the Vendor Portal and select the application.
1. On the **License Fields** page, click **Edit Field** on the right side of the target row. Changing the default value for a field updates the value for each existing customer record that has not overridden the default value.

   :::important
   Enabling **Is this field is required?** updates the license field to be required on all new and existing customers. If you enable **Is this field is required?**, you must either set a default value for the field or manually update each existing customer to provide a value for the field.
   :::
   
### Set Customer-Specific Values for Custom License Fields

To set a customer-specific value for a custom license field:

1. Log in to the Vendor Portal and select the application.
1. Click **Customers**.
1. For the target customer, click the **Manage customer** button.
1. Under **Custom fields**, enter values for the target custom license fields for the customer.

   :::note
   The maximum size for a license field value is 64KB.
   :::

   <img width="600" alt="Custom license fields section in the manage customer page" src="/images/customer-license-custom-fields.png"/>

   [View a larger version of this image](/images/customer-license-custom-fields.png)

### Delete Custom License Fields

Deleted license fields and their values do not appear in the customer's license in any location, including your view in the Vendor Portal, the downloaded YAML version of the license, and the Admin Console **License** screen.

By default, deleting a custom license field also deletes all of the values associated with the field in each customer record.

Only administrators can delete license fields.

:::important
Replicated recommends that you take care when deleting license fields.

Outages can occur for existing deployments if your application or the Admin Console **Config** page expect a license file to provide a required value.
:::

To delete a custom license field:

1. Log in to the Vendor Portal and select the application.
1. On the **License Fields** page, click **Edit Field** on the right side of the target row.
1. Click **Delete** on the bottom left of the dialog.
1. (Optional) Enable **Preserve License Values** to save values for the license field that were not set by the default in each customer record. Preserved license values are not visible to you or the customer.

   :::note
   If you enable **Preserve License Values**, you can create a new field with the same name and `type` as the deleted field to reinstate the preserved values.
   :::

1. Follow the instructions in the dialog and click **Delete**.