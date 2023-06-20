import LicenseExpirationExample from "../partials/replicated-sdk/_license-expiration-sdk-example.mdx"

# Checking Entitlements for Helm Installations

This topic describes how to get entitlement information from customer licenses in applications installed with Helm.

## Overview

When you distribute your Helm chart application with Replicated, you can add references to customer license fields in the `global` section of the Helm chart values file to check customer entitlements at the time of deployment. For more information, see [About Distributing with Helm (Beta)](helm-install).

Additionally, when you distribute the Replicated SDK alongside your Helm chart, you can use the SDK API `license` endpoints to reference license fields and check customer entitlements during runtime.  For more information about the Replicated SDK, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

## Checking Entitlements at Runtime with the SDK API {#runtime}

The Replicated SDK retrieves up-to-date customer license information from the vendor portal during runtime. This means that any changes to customer licenses are reflected in real time in the customer environment. For example, you can revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more.

After the Replicated SDK is initialized and running in a customer environment, you can use the following SDK API endpoints to get information about the license that was used to install:
* `/api/v1/license/info`: List license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information about these endpoints, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API (Beta)_.

License fields are cryptographically signed to ensure their integrity. When you include logic in your application to check customer license entitlements at runtime, Replicated recommends that you also use signature verification to ensure the integrity of each license field you use. For more information, see [Verifying Licenses Field Signatures](licenses-verify-fields-sdk-api).

### Example: Revoke Access at Runtime

<LicenseExpirationExample/>

## Checking Entitlements Before Installation {#before-install}

You can reference license entitlements in the `global.licenseFields` field of your Helm chart values file to verify customer entitlements before the Replicated SDK is initialized in the customer environment. For example, you could include an `expires_at` field under `global` with the unique license expiry date for the customer to reference before the SDK is installed and running in the customer environment.
### Example: Prevent Access Before Installation

You can use the license `expires_at` field and the Replicated SDK API `/api/v1/license/fields/{field_name}` endpoint to revoke a customer's access to your application during runtime when their license expires.

To revoke access to your application when a license expires:

1. In the vendor portal, click **Customers**. Select the target customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer.

1. Under **Expiration policy**:

   1. Enable **Customer's license has an expiration date**.

   1. For **When does this customer expire?**, use the calendar to set an expiration date for the license.

  <img alt="expiration policy field in the customer details page" src="/images/customer-expiration-policy.png" width="500px"/>

  [View a larger version of this image](/images/customer-expiration-policy.png)

1. In the `values.yaml` file for your Helm chart, under the `global.license` field, paste the contents of the `/api/v1/license/fields/expires_at` JSON response using the indentation shown in the following example:

    ```yaml
    # Helm chart values.yaml
    global:
      licenseFields:
        expires_at:
          name: expires_at
          title: Expiration
          description: License Expiration
          value: "2023-05-30T00:00:00Z"
          valueType: String
          signature:
            v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA... 
    ```

1. To test your changes, create a new release and promote it to a development channel, such as Unstable. Install the release in a development environment using the license ID for the customer that you created or edited. 