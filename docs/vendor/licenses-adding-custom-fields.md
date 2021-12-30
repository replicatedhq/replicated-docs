# Creating custom license fields

This topic describes how to create custom license fields for a customer. For
information about the fields that are included by default for each customer license,
see [Using built-in license fields](licenses-using-builtin-fields).

## Overview of creating custom license fields

You can add custom license fields for a customer. Custom license fields are useful
when there are entitlements specific to the customer.

For example, you can create a custom license field to limit the number of active
users permitted. Or, you can create a field that specifies the domain on which
the customer can run the application.

After you create a custom license field, it is displayed for all customers that
you created in the Replicated vendor portal.
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
   (multi-line string), and boolean values.
   * **Default** The default value for the field for both existing and new customers.
It is a best practice to provide a default value when possible.
   * **Is this field is required?** If checked, this prevents the creation of
   customers unless this field is explicitly defined with a value.
   * **Is this field hidden?** If checked, the field is not visible to your
   customer in the admin console. The field is still visible to you in the vendor
   portal.
