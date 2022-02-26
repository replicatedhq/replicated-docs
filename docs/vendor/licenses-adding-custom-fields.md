# Manage custom license fields

This topic describes how to create custom license fields for a customer. For
information about the fields that are included by default for each customer license,
see [Using built-in license fields](licenses-using-builtin-fields).

## Overview of creating custom license fields

You can add custom license fields in the Replicated vendor portal. Custom license
fields are useful when there is entitlement information that applies to a subset
of customers.

For example, you can create a custom license field to limit the number of active
users permitted. Or, you can create a field that limits the number of nodes a
customer is permitted on their cluster.

After you create a custom license field, it is displayed in the vendor portal for
all new and existing customers.
If the custom field is not hidden, it is also displayed under the **Licenses**
tab for customers in the Replicated admin console.

## Create custom license fields

To create a custom license field:

1. Log in to the vendor portal and select the application.

1. On the **License Fields** page, click **Create a custom field**.

1. Complete the following fields:
   * **Field** The name used to reference the field. This value cannot be changed.
   * **Title** The display name for the field. This is how the field appears in
   the vendor portal and the admin console. You can change the title in the vendor portal.
   * **Type** The field type. Supported formats include integer, string, text
   (multi-line string), and boolean values. This value cannot be changed.
   * **Default** The default value for the field for both existing and new customers.
It is a best practice to provide a default value when possible.
   * **Is this field is required?** If checked, this prevents the creation of
   customers unless this field is explicitly defined with a value.
   * **Is this field hidden?** If checked, the field is not visible to your
   customer in the admin console. The field is still visible to you in the vendor
   portal.

## Update custom license fields
To update a custom license field:
1. Log in to the vendor portal and select the application.
1. On the **License Fields** page, click **Edit Field** icon on the right side of the target row.
   
The following attributes of the custom license fields can be updated.
   * **Title** This can be changed without any special behavior.
   * **Default** Updating the default will update each customer record that hasn't overridden the default value.
   * **Is this field is required?** When updated to on, this field will become required on all existing licenses. If you do not set a default, you'll need to update each license manually.
   * **Is this field hidden?** This can be changed without any special behavior.

## Delete custom license fields
To delete a custom license field:
1. Log in to the vendor portal and select the application.
1. On the **License Fields** page, click **Edit Field** icon on the right side of the target row.
1. Select delete on the bottom left of the modal and follow the instructions on the following screen to confirm.

License fields can be deleted, but this should be carefully considered. Outages can occur when existing deployments where your application or the app manager config screen are expecting a license to provide a required value. As such, we have limited the RBAC policy to administrators and added several levels of warnings on deletion.

Deleted license fields and their values do not show up in the customer's license in any location (such as your view in the vendor portal, the downloaded YAML version of the license or the app manager license screen).

By default, deleting a license field also deletes all of the values associated with that field in each customer record. 

When the Preserve License Values option is selected, the values for the field not set by the default are orphaned in each customer record (this is not visible to you or your customer). If you recreate a field with this exact name and `type`, the orphaned values are reinstated. To bring default values back to licenses that didn't override the value, use the same default value during recreation. 