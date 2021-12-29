# Creating custom license fields

This topic describes how to create custom license fields for a customer. For information about the fields that are included by default for each customer license, see [Using built-in license fields](licenses-using-builtin-fields).

## Overview of creating custom license fields

You can add custom license fields for a customer. Examples of custom license fields are “seats” to limit the number of active users, or “hostname” in order to specify the domain that the application can be run on.

After you create a custom license field, it is displayed for all customers that you created in the Replicated vendor portal.
If the custom field is not hidden, it is also displayed under the **Licenses** tab for customers in the Replicated admin console.

## Create custom license fields

To create a custom license field:

1. Log in to the vendor portal and select the application.

1. On the **License Fields** page, click **Create a custom field**.

1. Complete the following fields:
   * **Field** The name of the field.
This is the name used to reference the field, and as such, is generally not changeable.
   * **Title** The display name of the field.
This is how the field will appear in the Vendor UI and the Admin Console (if visible). Easily changed through Vendor UI.
   * **Type** The field type. Supported formats include integer, string, text (multi-line string), and boolean values.
   * **Default** The default value for the field for both existing and new customers.
It is generally considered good practice to provide a default, where possible.
   * **Is this field is required?** If checked, this prevents the creation of customers unless this field is explicitly defined with a value.
   * **Is this field hidden?** If checked, the field is not visible to your customer in the admin console. The field is still visible to you in the vendor portal.
