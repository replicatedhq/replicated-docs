# Referencing License Fields With the SDK

This topic describes how to reference license fields in your Helm chart when you distribute the Replicated SDK with your application.

## Overview

When you distribute the Replicated SDK alongside your Helm chart application, you can use the SDK APIs to reference license fields and check customer entitlements during runtime. You can also add references to license fields in the Helm chart values file to check customer entitlements at the time of deployment, before the SDK has been initialized.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see [Verifying Licenses Fields With the SDK](licenses-verify-fields-sdk-api).

## Requirement

Declare the Replicated SDK as a dependency in your Helm chart application. See [Deploying the Replicated SDK With Your Application](replicated-sdk-using).

## About Referencing License Fields at Runtime

The SDK retrieves up-to-date customer license information from the vendor portal during runtime. This means that any changes that you make to customer licenses are reflected in real time in the customer environment. For example, you could revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more.

After the Replicated SDK is initialized and running in a customer environment, you can use the following SDK APIs to get information about the license that was used to install:
* `/api/v1/license/info`: Get license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information about the SDK APIs for checking license details, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK APIs (Beta)_.

## About Referencing License Fields Before Installation

You can reference license entitlements in the `global.licenseFields` field of your Helm chart values file so that you can check customer entitlements before the Replicated SDK is initialized in the customer environment.

For example, you could include an `expires_at` field under `global` with the unique license expiry date for the customer to reference before the SDK is installed and running in the customer environment.

```yaml
# Helm chart values.yaml
global:
  licenseFields:
    expires_at:
      description: License Expiration
      name: expires_at
      signature:
        v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA/3NmNhbTty7gbibvvmw6rbsCEFvaKBTW4zoEWKicQ9hJWKVIWsYH27HYZghvRCxxz4akUxW5/BWsX5DTwfcEAyEUSUvgCo9ba9IYchvrQSEupHzG/r5LM/dKV4aojCqIodkdB+yZKyfm4xo4e9ZWtWyQgVVmzOlIPOwUspTi0GtUK3T99r/JkPd4od8q6CdkuNKDJ9lg2h5/TQSRrJtkp7DeJT1byUkELw4t2mTXMmNK/nMMl8u/TWt1rvKrR2KOBw1i+nFG5N8sfRbfyPOYSxbhR8CkXatnVKA==
      title: Expiration
      value: "2023-05-30T00:00:00Z"
      valueType: String
```