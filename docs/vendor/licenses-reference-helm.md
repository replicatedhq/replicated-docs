import LicenseExpirationExample from "../partials/replicated-sdk/_license-expiration-sdk-example.mdx"

# Checking Entitlements for Helm Installations (Alpha)

This topic describes how to check entitlement information from customer licenses in applications that are installed with Helm. For information about how to check entitlement information for application installed with Replicated KOTS, see [Checking Entitlements for KOTS](licenses-referencing-fields).

## Checking Entitlements at Runtime with the SDK API {#runtime}

The Replicated SDK retrieves up-to-date customer license information from the vendor portal during runtime. This means that any changes to customer licenses are reflected in real time in the customer environment. For example, you can revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more.

To check entitlements at runtime in your Helm chart application, you must include the Replicated SDK as a dependency of your application. For more information, see [Using the SDK with Your Application (Beta)](replicated-sdk-using).

After the Replicated SDK is initialized and running in a customer environment, you can use the following SDK API endpoints to get information about the license that was used to install:
* `/api/v1/license/info`: List license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information about these endpoints, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API (Beta)_.

License fields are cryptographically signed to ensure their integrity. Replicated recommends that you use signature verification to ensure the integrity of each license field you use. For more information, see [Verifying Licenses Field Signatures (Alpha)](licenses-verify-fields-sdk-api).

### Example: Revoke Access at Runtime

<LicenseExpirationExample/>

## Checking Entitlements Before Installation {#before-install}

The Replicated registry automatically injects customer entitlement information in the `global.replicated.licenseFields` field of your Helm chart values. For example:

```yaml
# Helm chart values.yaml
global:
  replicated:
    licenseFields:
      expires_at:
        description: License Expiration
        name: expires_at
        signature:
          v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA... 
        title: Expiration
        value: "2023-05-30T00:00:00Z"
        valueType: String  
```

You can access the values in the `global.replicated.licenseFields` field from your Helm templates to check customer entitlements before installation. For more information about the fields that the Replicated registry automatically injects, see [Replicated Helm Values](/vendor/replicated-sdk-overview#replicated-values) in _About the Replicated SDK (Beta)_.

### Example: Prevent Access Before Installation

You can use the license `expires_at` field to prevent a customer from installing your application if their license is expired.

To prevent access to your application if a license is expired:

1. In the vendor portal, click **Customers**. Select the target customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer.

1. Under **Expiration policy**:

   1. Enable **Customer's license has an expiration date**.

   1. For **When does this customer expire?**, use the calendar to set an expiration date for the license.

  <img alt="expiration policy field in the customer details page" src="/images/customer-expiration-policy.png" width="500px"/>

  [View a larger version of this image](/images/customer-expiration-policy.png)

1. Update your Helm templates with one or more directives to access the `global.replicated.licenseFields.expires_at` field. For example, `{{ .Values.global.replicated.licenseFields.expires_at }}`. For more information about accessing values files from Helm templates, see [Values Files](https://helm.sh/docs/chart_template_guide/values_files/) in the _Chart Template Guide_ section of the Helm documentation.

1. To test your changes, create a new release and promote it to a development channel, such as Unstable. Install the release in a development environment using the license ID for the customer that you created or edited. 