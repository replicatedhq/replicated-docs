# Referencing License Fields With the SDK

This topic describes how to reference license fields in your Helm chart when you distribute the Replicated SDK with your application. For more information about the Replicated SDK, see [About the Replicated SDK](replicated-sdk-overview).

## Overview

When you distribute the Replicated SDK alongside your Helm chart application, you can use the SDK APIs to reference license fields and check customer entitlements during runtime. You can also add references to license fields in the Helm chart values file to check customer entitlements at the time of deployment, before the SDK has been initialized.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see [Verifying Licenses Fields With the SDK](licenses-verify-fields-sdk-api).

## Referencing License Fields at Runtime

The SDK retrieves up-to-date customer license information from the vendor portal during runtime. This means that any changes that you make to customer licenses are reflected in real time in the customer environment. For example, you can revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more.

After the Replicated SDK is initialized and running in a customer environment, you can use the following Replicated SDK API endpoints to get information about the license that was used to install:
* `/api/v1/license/info`: List license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK APIs (Beta)_.

When you include logic in your application to check customer license entitlements at runtime, Replicated recommends that you also use signature verification to ensure the integrity of each license field you use. For more information, see 

### Example: Revoke Access at Runtime

You can use the Replicated SDK API `/api/v1/license/fields/{field_name}` endpoint to revoke a customer's access to your application during runtime when their license file expires.

To revoke access to your application when a license expires:

1. In the vendor portal, click **Customers**. Select the target customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer.

1. Under **Expiration policy**:

   1. Enable **Customer's license has an expiration date**.

   1. For **When does this customer expire?**, use the calendar to set an expiration date for the license.

  <img alt="expiration policy field in the customer details page" src="/images/customer-expiration-policy.png" width="500px"/>

  [View a larger version of this image](/images/customer-expiration-policy.png)

1. Call the `/license` API from your application to retrieve the `expires_at` field that you defined in the previous step:

    ```bash
    curl replicated:3000/api/v1/license/fields/expires_at
    ```

    **Example response**:

    ```json
    {
      "name": "expires_at",
      "title": "Expiration",
      "description": "License Expiration",
      "value": "2023-05-30T00:00:00Z",
      "valueType": "String",
      "signature": {
        "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2MD0YBlIAZEs1zXpmvwLdfcoTsZMOj0lZbxkPN5dPhEPIVcQgrzfzwU5HIwQbwc2jwDrLBQS4hGOKdxOWXnBUNbztsHXMqlAYQsmAhspRLDhBiEoYpFV/8oaaAuNBrmRu/IVAW6ahB4KtP/ytruVdBup3gn1U/uPAl5lhzuBifaW+NDFfJxAXJrhdTxMBxzfdKa6dGmlGu7Ou/xqDU1bNF3AuWoP3C78GzSBQrD1ZPnu/d+nuEjtakKSX3EK6VUisNucm8/TFlEVKUuX7hex7uZ9Of+UgS1GutQXOhXzfMZ7u+0zHXvQ=="
      }
    }
    ```

1. Add logic to your application to revoke access if the current date and time matches the expiration date of the license.

1. Use signature verification in your application to ensure the integrity of the license field. See [Verifying License Fields With the SDK](licenses-verify-fields-sdk-api).

## Referencing License Fields Before Installation

You can reference license entitlements in the `global.licenseFields` field of your Helm chart values file to verify customer entitlements before the Replicated SDK is initialized in the customer environment. For example, you could include an `expires_at` field under `global` with the unique license expiry date for the customer to reference before the SDK is installed and running in the customer environment.
### Example: Prevent Access at Deployment

You can use the Replicated SDK API `/api/v1/license/fields/{field_name}` endpoint to revoke a customer's access to your application during runtime when their license file expires.

To revoke access to your application when a license expires:

1. In the vendor portal, click **Customers**. Select the target customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer.

1. Under **Expiration policy**:

   1. Enable **Customer's license has an expiration date**.

   1. For **When does this customer expire?**, use the calendar to set an expiration date for the license.

  <img alt="expiration policy field in the customer details page" src="/images/customer-expiration-policy.png" width="500px"/>

  [View a larger version of this image](/images/customer-expiration-policy.png)

1. Call the `/license` API to get information about the `expires_at` field that you defined in the previous step:

    ```bash
    curl replicated:3000/api/v1/license/fields/expires_at
    ```

    **Example response**:

    ```json
    {
      "name": "expires_at",
      "title": "Expiration",
      "description": "License Expiration",
      "value": "2023-05-30T00:00:00Z",
      "valueType": "String",
      "signature": {
        "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2MD0YBlIAZEs1zXpmvwLdfcoTsZMOj0lZbxkPN5dPhEPIVcQgrzfzwU5HIwQbwc2jwDrLBQS4hGOKdxOWXnBUNbztsHXMqlAYQsmAhspRLDhBiEoYpFV/8oaaAuNBrmRu/IVAW6ahB4KtP/ytruVdBup3gn1U/uPAl5lhzuBifaW+NDFfJxAXJrhdTxMBxzfdKa6dGmlGu7Ou/xqDU1bNF3AuWoP3C78GzSBQrD1ZPnu/d+nuEjtakKSX3EK6VUisNucm8/TFlEVKUuX7hex7uZ9Of+UgS1GutQXOhXzfMZ7u+0zHXvQ=="
      }
    }
    ```

1. Copy the contents of the `/api/v1/license/fields/expires_at` JSON response.

1. Open the `values.yaml` file for your Helm chart. Under the `global.license` fields, paste the contents of the `/api/v1/license/fields/expires_at` JSON response using the indentation shown in the following example:

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
            v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA/3NmNhbTty7gbibvvmw6rbsCEFvaKBTW4zoEWKicQ9hJWKVIWsYH27HYZghvRCxxz4akUxW5/BWsX5DTwfcEAyEUSUvgCo9ba9IYchvrQSEupHzG/r5LM/dKV4aojCqIodkdB+yZKyfm4xo4e9ZWtWyQgVVmzOlIPOwUspTi0GtUK3T99r/JkPd4od8q6CdkuNKDJ9lg2h5/TQSRrJtkp7DeJT1byUkELw4t2mTXMmNK/nMMl8u/TWt1rvKrR2KOBw1i+nFG5N8sfRbfyPOYSxbhR8CkXatnVKA==   
    ```