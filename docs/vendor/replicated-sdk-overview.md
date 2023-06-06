# About the Replicated SDK

The Replicated SDK is a Helm chart that you can add as a dependency in your application Helm chart. The Replicated SDK is installed in customer environments by Helm alongside your application Helm chart, providing access to Replicated features, including telemetry, customer licensing and entitlements, version update checks, and more.

## How the SDK Initializes in a Customer Environment

A release that includes your packaged Helm chart must be created and promoted to a channel. When a release containing one or more Helm charts is promoted to a channel, the charts are pushed to the Replicated registry. To install both your application and the SDK, your customers pull the charts from the Replicated registry using their unique license ID. This ensures that any customer who pulls your chart has a valid, unexpired license.

The following diagram shows how the Replicated SDK uses the customer license during installation to initialize in a customer environment:

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

As shown in the diagram above, the Replicated SDK is installed in a customer environment using a customer license ID. The SDK initializes using the Replicated License API to get license-specific entitlement information from the Replicated vendor portal. Your application APIs use Helm to query information about the customer environment, such as user-supplied configuration values. 

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
## SDK APIs 

The SDK provides APIs that can be used to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the get application updates API to include messages in the UI when new versions of the application are available for upgrade. You could also use the get license field API to check the customer's license expiration at runtime. This would allow you to revoke access to the application when a license expires.

For more information about the available Replicated SDK APIs, including example use cases, see [Replicated SDK APIs (Beta)](/reference/replicated-sdk-apis).

## Development Mode

You can also run the Replicated SDK in development mode by initializing with a developer license. Development mode allows you to test changes locally without having to create a release in the vendor portal or pull your Helm chart from the Replicated registry in a development environment.

For more information about developing against the Replicated SDK in development mode, see [Using Development Mode](replicated-sdk-development).