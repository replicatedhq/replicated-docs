# About the Replicated SDK

This topic provides an introduction to how to use the Replicated SDK with your Helm chart application.

## Overview

The Replicated SDK is a Helm chart that can be installed alongside your application Helm chart as a dependency. The Replicated SDK allows you to install your application with Helm while still having access to Replicated features such as:

* Getting telemetry and insights on instances of your application running in customer environments 
* Enforcing customer licenses and entitlements during installation and at runtime 
* Adding preflight checks to verify the customer environment meets requirements before installation 
* Adding update checks to alert your customers when new versions of your application are available for upgrade

To get started with the Replicated SDK, edit your application Helm chart to declare the SDK as a dependency, then promote a new release with your Helm chart to a channel in the Replicated vendor portal. For more information about using the Replicated SDK, see [Deploying the Replicated SDK With Your Application](/vendor/replicated-sdk-using).

## How the SDK Initializes in a Customer Environment

After a release containing one or more Helm charts is promoted to a channel in the vendor portal, the vendor portal automatically pushes the charts to the Replicated registry. The Replicated registry is a private image registry hosted by Replicated at `registry.replicated.com`. For information about security for the Replicated registry, see [Replicated Private Registry Security](packaging-private-registry-security).

Your customers install the Replicated SDK alongside your application using Helm. To install, your customers first pull your Helm chart from the Replicated registry by authenticating with their unique license ID. This step ensures that any customer who pulls your chart has a valid, unexpired license.

<!-- The following diagram shows how the Replicated SDK uses the customer license during installation to initialize in a customer environment:

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

As shown in the diagram above, the Replicated SDK is installed in a customer environment using a customer license ID. The SDK initializes using the Replicated License API to get license-specific entitlement information for the customer from the vendor portal. In the customer environment, your application APIs use Helm to query information about the environment.  -->

When a customer pulls your Helm chart from the Replicated registry, the Replicated registry injects certain values into the chart in the `replicated` field in the Helm values file. These values include information about the customer's license and about the target release from the vendor portal that the Replicated SDK uses for initialization.

The following is an example of a Helm values file containing only the information injected by the Replicated registry when your customer pulls the Helm chart from the Replicated registry during installation:

```yaml
# Helm values.yaml
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

As shown in the example above, you can also add values to the `global` field of the Helm values file that your Helm chart uses before the Replicated SDK is initialized. For example, you could include an `expires_at` field under `global` with the unique license expiry date for the customer to reference before the SDK is installed and running in the customer environment.

For more information about how to install an application and the Replicated SDK with Helm, see [Installing an Application and the SDK](replicated-sdk-installing).

## SDK APIs 

The SDK provides APIs that can be used to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the app API to include messages in the UI when new versions of your application are available for upgrade. You could also use the license API to check the customer's license expiration at runtime, which would allow you to revoke access to the application when a license expires.

For more information about the available Replicated SDK APIs, including example use cases, see [Replicated SDK APIs (Beta)](/reference/replicated-sdk-apis).

## Development Mode

You can also run the Replicated SDK in development mode to more quickly add and test new Replicated features to your application. Development mode allows you to test changes locally without having to create a release in the vendor portal or pull your Helm chart from the Replicated registry in a development environment.

To use development mode, you initialize the SDK with a developer license, rather than pulling the chart from the Replicated registry with a customer license. For more information about using development mode, see [Using Development Mode](replicated-sdk-development).