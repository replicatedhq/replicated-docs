import Beta from "../partials/replicated-sdk/_beta.mdx"

# About the Replicated SDK

This topic provides an introduction to how to use the Replicated SDK with your Helm chart application.

<Beta/>

## Overview

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application Helm chart. The Replicated SDK allows you to install your application with Helm while having access to Replicated features such as:

* Insights on instances of your application running in customer environments 
* Customer license and entitlements enforcement during installation and at runtime 
* Preflight checks to verify the customer environment meets requirements before installation 
* Update checks to alert your customers when new versions of your application are available for upgrade

To get started with the Replicated SDK, edit your application Helm chart to declare the SDK as a dependency, then promote a new release with your Helm chart to a channel in the Replicated vendor portal. For more information about using the Replicated SDK, see [Deploying the Replicated SDK With Your Application](/vendor/replicated-sdk-using).

## How the SDK Initializes in a Customer Environment {#about-sdk-initialize}

The following diagram shows how the Replicated SDK uses the customer license during installation to initialize in a customer environment:

![diagram of the replicated sdk in a custom environment](/images/sdk-overview-diagram.png)

As shown in the diagram above, after a release containing one or more Helm charts is promoted to a channel in the vendor portal, the vendor portal automatically pushes the charts to the Replicated registry. The Replicated registry is a private image registry hosted by Replicated at `registry.replicated.com`. For information about security for the Replicated registry, see [Replicated Private Registry Security](packaging-private-registry-security).

Your customers install the Replicated SDK alongside your application using Helm. First, customers pull your Helm chart from the Replicated registry by authenticating with their unique license ID. This step ensures that any customer who pulls your chart has a valid, unexpired license.

When a customer pulls your Helm chart from the Replicated registry, the Replicated registry injects values into the `replicated` field of the Helm chart values file. These values provide information about the following:
* The customer's license and entitlement details
* The target application release from the vendor portal

The following is an example of a Helm values file containing only the information injected by the Replicated registry when your customer pulls the Helm chart during installation:

```yaml
# Helm values.yaml
replicated:
  app:
    configValues: YXBpVmVyc2lvbjoga290cy5pby92MWJldGExCmtpbmQ6IENvbmZpZ1ZhbHVlcwpzcGVjOgogIHZhbHVlczoge30=
  appName: my-app
  channelID: 2CBDxNwDH1xyYiIXRTjiB7REjKX
  channelName: Stable
  channelSequence: 75
  created_at: "2023-05-12T17:44:10Z"
  license: |
# The full customer license appears in the license field
  license_id: WJldGExCmtpbmQ6IEN...
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: "Some release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

For more information about how to install an application and the Replicated SDK with Helm, see [Installing an Application and the SDK](replicated-sdk-installing).

## SDK APIs 

The Replicated SDK provides APIs that you can use to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the `/api/v1/app/updates` API to include messages in the UI to encourage users to upgrade when new versions are available. You could also use the `/api/v1/license/fields` API to check the customer's license expiration at runtime, which allows you to revoke access to the application when a license expires.

For more information about the available Replicated SDK APIs, including example use cases, see [Replicated SDK APIs (Beta)](/reference/replicated-sdk-apis).

## Customer Reporting and Instance Insights {#insights}

The Replicated SDK provides access to operational telemetry like customer reporting and insights on application instances running in customer environments. 

The following shows an example of the **Instance Details** page in the vendor portal, including application version and status details, instance uptime, and cluster details such as the cloud provider, cloud region, and the Kubernetes version and distribution:

![instance details full page](/images/instance-details.png)

For more information about view customer and instance insights in the vendor portal, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

The Replicated SDK does not require any additional configuration to get access to instance data. The SDK uses the values injected by the Replicated registry in your Helm chart values file during initialization to automatically send information about the instance back to the vendor portal.

## Development Mode

You can run the Replicated SDK in development mode to more quickly add features and test releases of your application. Development mode allows you to test changes locally without having to create a release in the vendor portal or pull your Helm chart from the Replicated registry in a development environment.

To use development mode, you initialize the SDK with a developer license, rather than pulling the chart from the Replicated registry. For more information about using development mode, see [Using Development Mode](replicated-sdk-development).