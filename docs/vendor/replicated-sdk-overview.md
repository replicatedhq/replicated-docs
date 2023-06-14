import Beta from "../partials/replicated-sdk/_beta.mdx"

# About the Replicated SDK

This topic provides an introduction to using the Replicated SDK with your Helm chart application.

<Beta/>

## Overview

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application Helm chart. The Replicated SDK allows you to install your application with Helm while having access to Replicated features such as:

* Insights and telemetry for instances of your application running in customer environments 
* Customer license and entitlements enforcement before installation and at runtime 
* Preflight checks to verify that the environment meets requirements before installation 
* Update checks to alert your customers when new versions of your application are available for upgrade

To get started with the Replicated SDK, edit your application Helm chart to declare the SDK as a dependency, then promote a new release with your Helm chart to a development channel in the Replicated vendor portal. For more information about using the Replicated SDK, see [Deploying the Replicated SDK With Your Application](/vendor/replicated-sdk-using).

## How the SDK Runs in a Customer Environment {#about-sdk-initialize}

The following diagram shows how the Replicated SDK is installed and runs in a customer environment:

<img src="/images/sdk-overview-diagram.png" alt="diagram of the replicated sdk in a custom environment" width="600px"/> 

As shown in the diagram above, after a release containing one or more Helm charts is promoted to a channel in the vendor portal, the vendor portal automatically pushes the charts to the Replicated registry. The Replicated registry is a private image registry hosted by Replicated at `registry.replicated.com`. For information about security for the Replicated registry, see [Replicated Private Registry Security](packaging-private-registry-security).

Then, customers can install the Replicated SDK alongside your application by first logging in to the Replicated registry with their unique license ID. This step ensures that any customer who pulls your chart from the registry has a valid, unexpired license. After the customer pulls your Helm chart from the Replicated registry, they can run `helm install`.

Finally, when the SDK is installed and initialized in the customer environment, you can use the SDK API to get customer-specific license information from the vendor portal during runtime. You can also use the API to get details about the instance from the customer environment and from the vendor portal. For more information about working with the SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

## SDK Initialization with Replicated Values {#replicated-values}

When a customer pulls your Helm chart from the Replicated registry, the Replicated registry injects values into the `replicated` field of the Helm chart values file to initialize the SDK. These values provide information about the following:
* The customer's license and entitlement details
* The target application release from the vendor portal

The following is an example of a Helm values file containing only the information injected by the Replicated registry when your customer pulls the Helm chart during installation:

```yaml
# Helm values.yaml
global:
  replicated:
    dockerconfigjson: eyJhdXRocyI6eyJd1dIRk5NbEZFVGsxd2JGUmFhWGxYWm5scloyNVRSV1pPT2pKT2NGaHhUVEpSUkU1...
replicated:
  appName: my-app
  channelID: 2CBDxNwDH1xyYiIXRTjiB7REjKX
  channelName: Stable
  channelSequence: 75
  created_at: "2023-05-12T17:44:10Z"
  license: | 
    apiVersion: kots.io/v1beta1
    kind: License
    metadata:
      name: examplename
    spec:
      appSlug: my-app
      ...       
  # The full customer license is displayed
  license_id: WJldGExCmtpbmQ6IEN...
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: "Some release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

As shown in the example above, the Replicated registry injects information about the release and the unique customer license under the `replicated` field, such as `replicated.releaseSequence` and `replicated.license_id`. 

Additionally, if you use the Replicated proxy service to proxy images from an external private registry, you can use the value injected in the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy service. For more information, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) in the Kubernetes documentation.

For more information about how to install an application and the Replicated SDK with Helm, see [Installing an Application and the SDK](replicated-sdk-installing).

## SDK API 

The Replicated SDK provides and API that you can use to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the `/api/v1/app/updates` endpoint to include messages in the UI that encourage users to upgrade when new versions are available. You could also revoke access to the application when a license expires using the `/api/v1/license/fields` endpoint.

For more information about the available Replicated SDK API, including example use cases, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

## Customer Reporting and Instance Insights {#insights}

The Replicated SDK provides access to operational telemetry including customer reporting and insights on application instances running in customer environments. When you distribute your application with the SDK, you can view these insights in the vendor portal.

The Replicated SDK does not require any additional configuration to get access to instance data. The SDK uses the values injected by the Replicated registry in your Helm chart values file during initialization to automatically send information about the instance back to the vendor portal.

The following shows an example of the **Instance Details** page in the vendor portal, including application version and status details, instance uptime, and cluster details such as the cloud provider, cloud region, and the Kubernetes version and distribution:

![instance details full page](/images/instance-details.png)
[View a larger version of this image](/images/instance-details.png)

For more information about viewing customer and instance insights in the vendor portal, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

## Integration Mode

You can run the Replicated SDK in integration mode to more quickly test new functionality for your application. Integration mode allows you to use mock data to test changes locally without having to create a release in the vendor portal and then pull your Helm chart from the Replicated registry.

For more information, see [Using Integration Mode](replicated-sdk-development).