# Referencing License Fields With the SDK

This topic describes how to reference license fields in your Helm chart when you are distributing your application with the Replicated SDK.

## Overview

When you distribute the Replicated SDK alongside your Helm chart application, you can use either the SDK APIs or the Helm chart values file to check license fields and customer entitlements at the time of deployment or during runtime.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see [Verifying Licenses Fields With the SDK](licenses-verify-fields-sdk-api).

## Requirement

Declare the Replicated SDK as a dependency in your Helm chart application. See [Deploying the Replicated SDK With Your Application](replicated-sdk-using).

## Reference License Fields at Runtime

After the Replicated SDK is initialized and running in the customer environment, you can retrieve entitlements using the SDK APIs.

License information, including license fields, is kept up to date by the SDK to reflect changes to the license in real time.

You can check a customer’s license information with the get license info API. License entitlements can be checked with the get license fields and get license field APIs. You can check the license expiration with the get license field API by setting expires_at as the license field path parameter. For example, /api/v1/license/fields/expires_at.

Although customers must have a valid license to log in to the registry and pull your chart, you can check the license expiration at runtime if you want to revoke access to the application when a license expires.

For example, you can revoke access when a license expires, expose additional product functionality dynamically based on entitlement values, and more.

## Reference License Fields Before Installation

You can reference license entitlements in the `global` field of your Helm chart values file so that you can check customer entitlements before the Replicated SDK is initialized in the customer environment.

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