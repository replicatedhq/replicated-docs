# About the Replicated SDK

The Replicated SDK is a Helm chart that you can install alongside your application Helm chart as a dependency. The Replicated SDK allows you to use Replicated features with your application, such as getting telemetry on instances of your application running in customer environments, enforcing customer licenses and entitlements during installation and at runtime, and adding update checks to alert your customers when new versions of your application are available for upgrade.

To get started with the Replicated SDK, edit your application Helm chart to declare the SDK as a dependency, then promote a new release with your Helm chart to a channel in the Replicated vendor portal. For more information about using the Replicated SDK, see [Deploying the Replicated SDK with Your Application](/vendor/replicated-sdk-using).

## How the SDK Initializes in a Customer Environment

After a release containing one or more Helm charts is promoted to a channel in the vendor portal, the vendor portal automatically pushes the charts to the Replicated registry. The Replicated registry is a private image registry hosted by Replicated at `registry.replicated.com`. For information about security for the Replicated registry, see [Replicated Private Registry Security](packaging-private-registry-security).

Your customers install both your application and the Replicated SDK in their environment using the helm CLI. As part of the installation process, your customers first pull your Helm chart from the Replicated registry by authenticating with their unique license ID. This step ensures that any customer who pulls your chart has a valid, unexpired license. The following diagram shows how the Replicated SDK uses the customer license during installation to initialize in a customer environment:

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

As shown in the diagram above, the Replicated SDK is installed in a customer environment using a customer license ID. The SDK initializes using the Replicated License API to get license-specific entitlement information for the customer from the vendor portal. In the customer environment, your application APIs use Helm to query information about the environment. 

When a Helm chart is pulled from the Replicated registry, the Replicated registry also injects certain values into the chart in the `replicated` field in the Helm values file. These values include license and release information that the Replicated SDK uses for initialization.

Additionally, the `global` section of the Helm values file contains values that your Helm chart can use before the SDK is initialized.

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
    <The full customer license appears in the license field>
  license_id: WJldGExCmtpbmQ6IEN...
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: "My release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

## SDK APIs 

The SDK provides APIs that can be used to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the get application updates API to include messages in the UI when new versions of the application are available for upgrade. You could also use the get license field API to check the customer's license expiration at runtime. This would allow you to revoke access to the application when a license expires.

For more information about the available Replicated SDK APIs, including example use cases, see [Replicated SDK APIs (Beta)](/reference/replicated-sdk-apis).

## Development Mode

You can also run the Replicated SDK in development mode by initializing with a developer license. Development mode allows you to test changes locally without having to create a release in the vendor portal or pull your Helm chart from the Replicated registry in a development environment.

For more information about developing against the Replicated SDK in development mode, see [Using Development Mode](replicated-sdk-development).