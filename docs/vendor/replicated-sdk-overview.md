# About the Replicated SDK

This topic provides an introduction to the Replicated SDK.

## Overview

Vendors who distribute their application with Helm can use the Replicated SDK to integrate their application with Replicated features. The Replicated SDK is installed by Helm alongside the application Helm chart, providing vendors access to telemetry, licensing and entitlements, update checks, and more.

## About Installing the SDK

A release that includes your packaged Helm chart must be created and promoted to a channel. When a release containing one or more Helm charts is promoted to a channel, the charts are pushed to the Replicated registry. Your customers pull the charts from the Replicated registry to install both your application and the SDK.

The following diagram shows how the Replicated SDK 

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

As shown in the diagram above, the Replicated SDK is installed in a customer environment using a customer license ID. The SDK initializes using the Replicated License API to get license-specific entitlement information from the Replicated vendor portal. Your application APIs use Helm to query information about the customer environment, such as user-supplied configuration values. 

### License Verification

Each of your customers must log in to the Replicated registry using their license ID before they can pull your chart. For example, `helm registry login registry.replicated.com --username alexp@replicated.com --password LICENSE_ID`. This ensures that any customer who pulls your chart has a valid, unexpired license.

### SDK Initialization
When a Helm chart is pulled from the Replicated registry, the registry injects certain values into the chart in the replicated section of the values file. These values include license and release information that the SDK uses for initialization.

The following is an example of a Helm values file containing only the information injected by the Replicated registry:

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
replicated:
  app:
    configValues: YXBpVmVyc2lvbjoga290cy5pby92MWJldGExCmtpbmQ6IENvbmZpZ1ZhbHVlcwpzcGVjOgogIHZhbHVlczoge30=
  appName: alex-echo-server-helm
  channelID: 2CBDxNwDH1xyYiIXRTjiB7REjKX
  channelName: Stable
  channelSequence: 75
  created_at: "2023-05-12T17:44:10Z"
  license: |
    <Omitted to save space>
  license_id: <REDACTED>
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: ""
  releaseSequence: 81
  username: alexp@replicated.com
  versionLabel: 0.1.70
  ```

Values in the global section can be used by your Helm chart. For example, if your application needs to know about an entitlement before the SDK is up and running, your application can reference that entitlement in the global values. Once the SDK is up and running, entitlements should be retrieved using the SDK’s APIs, because those values will be continually updated, unlike the chart’s values.


## About Using Replicated Features with the SDK 

The SDK provides a number of APIs that can be used to embed Replicated functionality and application information into your application.

For example, if your application includes an admin console, the SDK APIs can be used to extend that admin console to include messages when new updates are available, license and entitlement information