# Referencing License Fields With the SDK

This topic describes how to reference license fields in your Helm chart when you are distributing your application with the Replicated SDK.

## Overview



## Requirement

Declare the Replicated SDK as a dependency in your Helm chart application. See [Deploying the Replicated SDK With Your Application](replicated-sdk-using).

## Reference License Fields at Runtime

Once the SDK is up and running, entitlements should be retrieved using the SDK’s APIs, because those values will be continually updated, unlike the chart’s values.

## Reference License Fields in the Values File

You can reference license entitlements in the `global` field of your Helm chart values file so that you can check customer entitlements before the Replicated SDK is initialized in the customer environment.

This is beneficial because ...


```yaml
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

You could include an `expires_at` field under `global` with the unique license expiry date for the customer to reference before the SDK is installed and running in the customer environment.