# Manage Customer License Fields

This topic describes how to manage customer license fields in the Replicated Vendor Portal, including how to add custom fields and set initial values for the built-in fields.

## About License Fields

License fields allow you to control customer entitlements and configure application behavior. The Replicated Vendor Portal includes built-in fields (such as license expiration and install options) and supports custom fields for application-specific requirements.

For information about how to access license field values in your application, see:
- For Replicated SDK: [Get License Fields with the Replicated SDK API](licenses-reference-sdk)
- For KOTS installers: [Get License Fields in KOTS Applications](licenses-reference-kots-runtime)
- For Helm installations: [Get License Fields in Helm Installations](licenses-reference-helm)
- For verification: [Verify Signature and Get License Fields with the SDK API](licenses-verify-fields-sdk-api)

## Common Use Cases for Custom License Fields

Custom license fields allow you to add business-specific data to customer licenses. Common use cases include:

- **Capacity limits**: Control usage with fields like `max_users`, `seats`, `storage_gb`, or `api_calls_per_month`
- **Feature tiers**: Use fields like `tier` (basic/premium/enterprise) or `support_level` (standard/priority) to enable different features
- **Configuration**: Store `api_endpoint`, `region`, `data_center`, or `environment` settings
- **Credentials**: Include `api_key`, `auth_token`, or `encryption_key` (use Password type to mask values in the UI)
- **Business logic**: Track `contract_type`, `renewal_date`, or `account_manager` for reporting and workflows

## Manage Built-In License Fields

This section describes how to manage the built-in license fields that are included in the licenses for all customer records by default. For a list of the built-in license fields, see [Built-In License Fields](/vendor/licenses-using-builtin-fields).

### Set Initial Values for Built-In License Fields

You can set initial values to populate the **Create Customer** form in the Vendor Portal when a new customer is created. This ensures that each new customer created from the Vendor Portal UI starts with the same set of built-in license field values. These _initial_ values differ from _default_ values in that setting initial values does not update the license field values for any existing customers.

:::note
Initial values are not applied to new customers created through the Vendor API v3. For more information, see [Create a customer](https://replicated-vendor-api.readme.io/reference/createcustomer-1) in the Vendor API v3 documentation.
:::

To set initial values for built-in license fields:

1. In the Vendor Portal, go to **License Fields**.

1. Under **Built-in license options**, open the menu for the license field where you want to set an initial value and click **Edit**. 

     ![Edit Initial Value](/images/edit-initial-value.png)

     [View a larger version of this image](/images/edit-initial-value.png)

1. In the **Edit built-in license field** dialog, edit the **Initial value** field.

    ![Edit license field dialog](/images/edit-built-in-license-field-dialog.png)

    [View a larger version of this image](/images/edit-built-in-license-field-dialog.png)

    :::note
    Click **Reset initial value** to reset the value for the field to its default.
    :::

1. (Optional) Enable the **Locked** checkbox to lock the license field.
    
    When a license field is locked, a lock icon is displayed on both the **Create a new customer** and **Manage customer** pages.

1. Click **Update** to save your changes.

### Lock Built-In License Fields

When a license field is locked, a lock icon is displayed on both the **Create a new customer** and **Manage customer** pages. To edit a locked field, click the lock icon to temporarily unlock it. Locking a license field makes it more difficult to accidentally change the field's value.

To lock a built-in license field:

1. Under **Built-in license options**, open the menu for the license field that you want to lock and click **Edit**.

1. In the **Edit built-in license field** dialog, enable the **Locked** checkbox to lock the license field.

1. Click **Update** to save your changes.

## Manage Custom License Fields

You can create custom license fields in the Vendor Portal. For example, you can create a custom license field to set the number of active users permitted. Or, you can create a field that sets the number of nodes a customer is permitted on their cluster.

The custom license fields that you create are displayed in the Vendor Portal for all new and existing customers. If the custom field is not hidden, it is also displayed to customers under the **Licenses** tab in the Replicated Admin Console and in the **License Details** tab in the Enterprise Portal.

Custom license fields can also be created and managed through the Vendor API v3, which enables automation and integration with your existing systems. For more information, see [Create a custom license field](https://replicated-vendor-api.readme.io/reference/createcustomlicensefield) in the Vendor API v3 documentation.

### How Custom Fields Appear in Licenses

Custom license fields appear in the customer's license YAML under `spec.entitlements`. Your application can read these values to enforce limits or configure behavior.

The following example shows a license with custom fields:

```yaml
apiVersion: kots.io/v1beta1
kind: License
spec:
  licenseID: "customer-123"
  customerName: "Acme Corp"
  entitlements:
    expires_at:
      title: Expiration
      value: "2026-12-31T00:00:00Z"
      valueType: String
    seats:
      title: Maximum Users
      value: 100
      valueType: Integer
    tier:
      title: Support Tier
      value: "enterprise"
      valueType: String
    premium_support:
      title: Premium Support Enabled
      value: true
      valueType: Boolean
```

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
   | Type| The field type. This value cannot be changed. See [Understanding Custom License Field Types](#understanding-custom-license-field-types) for more information.
   | Default | The default value for the field for both existing and new customers. It is a best practice to provide a default value when possible. The maximum size for a license field value is 64KB. |
   | Required | If checked, this prevents the creation of customers unless this field is explicitly defined with a value. |
   | Hidden | If checked, the field is not visible to your customer in the Replicated Admin Console or in their Enterprise Portal. The field is still visible to you in the Vendor Portal. **Note**: The Hidden field is displayed only for vendors with access to the Replicated installers (KOTS, kURL, Embedded Cluster). |

### Update Custom License Fields

To update a custom license field:

1. Log in to the Vendor Portal and select the application.
1. On the **License Fields** page, click **Edit Field** on the right side of the target row. Changing the default value for a field updates the value for each existing customer record that has not overridden the default value.

   :::important
   Enabling **Is this field is required?** updates the license field to be required on all new and existing customers. If you enable **Is this field is required?**, you must either set a default value for the field or manually update each existing customer to provide a value for the field.
   :::

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

### Custom License Field Types

Each custom license field has a _type_ that is used to validate its value. The type also determines the widget that you use to set the license field's value on the **Manager customer** page.

| Type | Description | Purpose | When to Use | Widget |
|------|-------------|---------|-------------|--------|
| Integer | A whole number numeric value | Capacity limits, quotas, counts | Use for numeric limits like seats, storage amounts, or API call quotas (e.g., `seats: 100`, `max_nodes: 5`) | Text field |
| String | Short form text that typically fits on a single line | Short identifiers, tier names, regions | Use for short text values like tier levels, regions, or environment names (e.g., `tier: enterprise`, `region: us-west-2`) | Text field |
| Text | Longer form text that can contain multiple lines | Long configurations, JSON data, descriptions | Use for multi-line content like JSON configurations, certificates, or long descriptions | Text area |
| Boolean | True or false value | Feature flags, support options | Use for on/off features or capabilities (e.g., `premium_support: true`, `analytics_enabled: false`) | Checkbox |
| Password | A short string of text that is masked on display | API keys, tokens, credentials | Use for sensitive values that should be masked in the UI. Note: Values are still cleartext in the license file (e.g., `api_key`, `auth_token`) | Password field |
| Enum | Provides a list of possible values | Limited choices like tier levels or regions | Use when there are predefined options to choose from (e.g., tier with options: basic, premium, enterprise) | Dropdown |

:::note
String, Text, Password, and Enum types are all represented as strings in the license.
:::   

## Set Customer-Specific Values for Custom License Fields

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
