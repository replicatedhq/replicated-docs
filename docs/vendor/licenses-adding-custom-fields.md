# Manage Customer License Fields

This topic describes how to manage customer license fields in the Replicated Vendor Portal, including how to add custom fields and set initial values for the built-in fields.

## About License Fields

License fields allow you to control customer entitlements and configure application behavior. The Replicated Vendor Portal includes built-in fields (such as license expiration and install options) and supports custom fields for application-specific requirements.

For information about how to access license field values in your application, see:
- For the Replicated SDK: [Get License Fields with the Replicated SDK API](licenses-reference-sdk)
- For Replicated installers (Embedded Cluster, KOTS, kURL): [Get License Fields in KOTS Applications](licenses-reference-kots-runtime)
- For Helm installations: [Get License Fields in Helm Installations](licenses-reference-helm)
- For verification: [Verify Signature and Get License Fields with the SDK API](licenses-verify-fields-sdk-api)

## Configure License Field Defaults

You can configure default values for both built-in and custom license fields from the **License Fields** page. These defaults are automatically applied when you create new customers, reducing repetitive configuration and enforcing consistency across your customer base.

Defaults are especially useful when:
- Most of your customers share the same license configuration (for example, all customers are `production` type with a 30-day expiration).
- You want to standardize which install types are enabled by default.
- You want to pre-populate custom entitlement values like seat counts or feature tiers.

### Set a Default Value for a Built-In Field

1. In the Vendor Portal, go to **License Fields**.
1. In the **Built-in License Options** table, click **Edit** on the field you want to configure.
1. In the modal, set the **Initial value**.
1. (Optional) Check **Locked** to prevent the value from being changed during customer creation in the Vendor Portal. For more information, see [Lock Built-In License Fields](#lock-built-in-license-fields).
1. Click **Update**.

To revert a built-in field to its original default, click **Reset initial value** in the edit modal.

The following built-in fields support configurable defaults:

| Field | Type | Default |
|-------|------|---------|
| License Type | Text | `trial` |
| Assigned Channel | Text | `Stable` |
| Expiration | Date (days) | 30 days |
| KOTS Install Enabled | Boolean | Varies by app |
| Helm Install Enabled | Boolean | Varies by app |
| Embedded Cluster Enabled | Boolean | Varies by app |
| Airgap Enabled | Boolean | `false` |
| Support Bundle Upload Enabled | Boolean | `true` |
| GitOps Supported | Boolean | `false` |
| Snapshots Supported | Boolean | `false` |

Additional install-type and feature fields may be available depending on which installers are enabled for your application.

:::note
The `name`, `email`, and `custom_id` fields cannot have defaults configured.
:::

### Set a Default Value for a Custom Field

1. In the Vendor Portal, go to **License Fields**.
1. In the **Custom License Fields** table, click **Edit** on the field.
1. Set the **Default** value.
1. Click **Update**.

Default values are supported for all custom field types: Integer, String, Text, Boolean, Password, and Enum.

### How Defaults Are Applied

When you create a new customer in the **Vendor Portal**, the default values pre-populate the Create Customer form. You can override them before saving, unless the field is locked.

When you create a new customer through the **Vendor API**, defaults are applied only to fields that are omitted from the request. If you explicitly set a field in the API request — even to an empty or `false` value — the default is not applied. This lets you use defaults as a convenience while retaining full control through the API.

## Manage Built-In License Fields

This section describes how to manage the built-in license fields that are included in the licenses for all customer records by default. For a list of the built-in license fields, see [Built-In License Fields](/vendor/licenses-using-builtin-fields).

### Set Initial Values for Built-In License Fields

You can set initial values to populate the **Create Customer** form in the Vendor Portal when a new customer is created. This ensures that each new customer created from the Vendor Portal UI starts with the same set of built-in license field values. These _initial_ values differ from _default_ values in that setting initial values does not update the license field values for any existing customers.

:::note
For details on how initial values are applied differently in the Vendor Portal versus the API, see [How Defaults Are Applied](#how-defaults-are-applied).
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

You can lock a built-in field to prevent it from being changed when creating customers in the Vendor Portal. This is useful when you want to enforce a standard value across all new customers — for example, always setting the license type to `production` or always enabling a specific install type.

Locked fields:
- Display a lock icon on both the **Create a new customer** and **Manage customer** pages.
- Cannot be edited unless you click the lock icon to temporarily unlock the field.
- Can still be overridden through the Vendor API (locking is a Vendor Portal UI-only constraint).
- Can still be changed when editing an existing customer after unlocking.

To lock a built-in license field:

1. In the Vendor Portal, go to **License Fields**.

1. Under **Built-in license options**, open the menu for the license field that you want to lock and click **Edit**.

1. In the **Edit built-in license field** dialog, enable the **Locked** checkbox to lock the license field.

1. Click **Update** to save your changes.

## Manage Custom License Fields

You can create custom license fields to add business- and application-specific data to customer licenses. The following are some common use cases for custom license fields:

- Set usage or capacity limits with fields like `max_users`, `seats`, `storage_gb`, or `api_calls_per_month`
- Enable access to certain features or tiers. For example, you could add a `tier` license field with values such as "basic", "premium", or "enterprise". You could also add a `support_level` field with options for "standard" or "priority".
- Store configuration settings like `api_endpoint`, `region`, `data_center`, or `environment`
- Include credentials in the license like `api_key`, `auth_token`, or `encryption_key` using the "Password" license field type to mask values in the UI
- Add metadata such as `contract_type`, `renewal_date`, or `account_manager` for reporting and workflows

The custom license fields that you create are displayed in the Vendor Portal for all new and existing customers. If the custom field is not hidden, it is also displayed to customers under the **Licenses** tab in the Replicated Admin Console and in the **License Details** tab in the Enterprise Portal.

Custom license fields can also be created and managed through the Vendor API v3, which enables automation and integration with your existing systems. For more information, see [Create a custom license field](https://replicated-vendor-api.readme.io/reference/createcustomlicensefield) in the Vendor API v3 documentation.

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
   | Type| The field type. This value cannot be changed. See [Custom License Field Types](#custom-license-field-types).
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

| Type | Description | Use cases | Widget |
|------|-------------|-----------|--------|
| Integer | A whole number numeric value | Use for numeric capacity limits, quotas, or counts. For example, `seats: 100` or `max_nodes: 5`. | Text field |
| String | Single-line text values | Use for short form text that fits on a single line, like short identifiers or environment names. For example, `account_manager: jeff_noble`. | Text field |
| Text | Longer form text that can contain multiple lines | Use for multi-line content like JSON configurations, certificates, or long descriptions. | Text area |
| Boolean | True or false value |  Use for on/off features or capabilities like feature flags and support options. For example, `premium_support: true`, `analytics_enabled: false`. | Checkbox |
| Password | A short string of text that is masked on display in the UI. Note: Values are cleartext in the license file. | Use for sensitive values that should be masked in the UI like API keys, tokens, or credentials. | Password field |
| Enum | Provides a list of possible values | Use when there is a set of predefined options for the field. For example, a `tier` field might have options like basic, premium, and enterprise. | Dropdown |

:::note
String, Text, Password, and Enum types are all represented as strings in the license.
:::

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
