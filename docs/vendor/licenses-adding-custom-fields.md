# Managing Custom License Fields

In addition to the built-in license fields available through the Replicated vendor
portal, you can also create custom license fields for a customer.

For information about the fields that are included by default for each customer
license, see [Using built-in license fields](licenses-using-builtin-fields).

## About Custom License Fields

Custom license fields are useful when there is entitlement information that applies to a subset of customers. For example, you can create a custom license field to limit the number of active users permitted. Or, you can create a field that limits the number of nodes a customer is permitted on their cluster.

The custom license fields that you create are displayed in the vendor portal for all new and existing customers. If the custom field is not hidden, it is also displayed under the **Licenses** tab for customers in the Replicated admin console.

After you create custom license fields for a customer, you can query these fields from your application to check customer entitlements both before installation and during runtime. See [Checking Entitlements for Helm Installations](licenses-reference-helm) or [Checking Entitlements for KOTS](licenses-referencing-fields).   

## Create Custom License Fields

To create a custom license field:

1. Log in to the vendor portal and select the application.

1. On the **License Fields** page, click **Create license field**.

   <img width="500" alt="create a new License Field dialog" src="/images/license-add-custom-field.png"/>

   [View a larger version of this image](/images/license-add-custom-field.png)

1. Complete the following fields:

   | Field                  | Description           |
   |-----------------------|------------------------|
   | Field | The name used to reference the field. This value cannot be changed. |
   | Title| The display name for the field. This is how the field appears in the vendor portal and the admin console. You can change the title in the vendor portal. |
   | Type| The field type. Supported formats include integer, string, text (multi-line string), and boolean values. This value cannot be changed. |
   | Default | The default value for the field for both existing and new customers. It is a best practice to provide a default value when possible. |
   | Required | If checked, this prevents the creation of customers unless this field is explicitly defined with a value. |
   | Hidden | If checked, the field is not visible to your customer in the Replicated admin console. The field is still visible to you in the vendor portal. **Note**: The Hidden field is displayed only for vendors with access to the Replicated KOTS installer. |

## Update Custom License Fields

To update a custom license field:

1. Log in to the vendor portal and select the application.
1. On the **License Fields** page, click **Edit Field** on the right side of the target row. Changing the default value for a field updates the value for each existing customer record that has not overridden the default value.

   :::important
   Enabling **Is this field is required?** updates the license field to be required on all new and existing licenses. If you enable **Is this field is required?**, you must either set a default value for the field or manually update each existing license file to provide a value for the field.
   :::
   
## Set Customer-Specific Values for Custom License Fields

To set a customer-specific value for a custom license field:

1. Log in to the vendor portal and select the application.
1. Click **Customers**.
1. For the target customer, click the **Manage customer** button.
1. Under **Custom fields**, enter values for the target custom license fields for the customer.

   <img width="600" alt="Custom license fields section in the manage customer page" src="/images/customer-license-custom-fields.png"/>

   [View a larger version of this image](/images/customer-license-custom-fields.png)

## Delete Custom License Fields

Deleted license fields and their values do not appear in the customer's license in any location, including your view in the vendor portal, the downloaded YAML version of the license, and the admin console license screen.

By default, deleting a license field also deletes all of the values associated with the field in each customer record.

Only administrators can delete license fields.

:::important
Replicated recommends that you take care when deleting license fields.

Outages can occur for existing deployments if your application or the admin console **Config** page expect a license file to provide a required value.
:::

To delete a custom license field:

1. Log in to the vendor portal and select the application.
1. On the **License Fields** page, click **Edit Field** on the right side of the target row.
1. Click **Delete** on the bottom left of the dialog.
1. (Optional) Enable **Preserve License Values** to save values for the license field that were not set by the default in each customer record. Preserved license values are not visible to you or the customer.

   :::note
   If you enable **Preserve License Values**, you can create a new field with the same name and `type` as the deleted field to reinstate the preserved values.
   :::

1. Follow the instructions in the dialog and click **Delete**.
