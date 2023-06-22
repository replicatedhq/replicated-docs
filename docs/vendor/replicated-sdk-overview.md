import Beta from "../partials/replicated-sdk/_beta.mdx"
import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"

# About the Replicated SDK (Alpha)

This topic provides an introduction to using the Replicated SDK with your Helm chart application.

<Beta/>

## Overview

<SDKOverview/>

For more information about using the Replicated SDK, see [Using the SDK With Your Application (Alpha)](/vendor/replicated-sdk-using).

## How the SDK Runs in a Customer Environment {#about-sdk-initialize}

The following diagram shows how the Replicated SDK is installed and runs in a customer environment:

<img src="/images/sdk-overview-diagram.png" alt="diagram of the replicated sdk in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

Finally, the SDK is initialized in the customer environment using values that the Replicated registry injects in the Helm chart values file. After the SDK is initialized, you can use the SDK API to get customer-specific license information from the vendor portal during runtime. You can also use the API to get details about the instance from the customer environment and from the vendor portal.

For more information about installing with Helm, see [Installing an Application with Helm (Beta)](install-with-helm).

## Replicated Helm Values {#replicated-values}

When a customer installs your Helm chart from the Replicated registry, the Replicated registry injects values into the `global.replicated` and `replicated` fields of the Helm chart values file. 

The following is an example of a Helm values file containing only the information injected by the Replicated registry:

```yaml
# Helm values.yaml
global:
  replicated:
    dockerconfigjson: eyJhdXRocyI6eyJd1dIRk5NbEZFVGsxd2JGUmFhWGxYWm5scloyNVRSV1pPT2pKT2NGaHhUVEpSUkU1...
    licenseFields:
      expires_at:
        description: License Expiration
        name: expires_at
        signature:
          v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA... 
        title: Expiration
        value: "2023-05-30T00:00:00Z"
        valueType: String
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
  # The full customer license is injected
  license_id: WJldGExCmtpbmQ6IEN...
  releaseCreatedAt: "2023-05-12T17:43:51Z"
  releaseIsRequired: false
  releaseNotes: "Some release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

The values in the `global.replicated` field provide information about the following:
* Details about the fields in the customer's license, such as the field name, description, signature, and value
* A base64 encoded Docker configuration file. If you use the Replicated proxy service to proxy images from an external private registry, you can use the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy service. For more information, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) in the Kubernetes documentation. 

The values in the `replicated` field provide information about the following:
* The full customer license and the license ID
* The target application release from the vendor portal

The Replicated SDK uses the values in the `replicated` field to initialize in a customer environment.

## SDK API 

The Replicated SDK provides an API that you can use to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the `/api/v1/app/updates` endpoint to include messages in the UI that encourage users to upgrade when new versions are available. You could also revoke access to the application during runtime when a license expires using the `/api/v1/license/fields` endpoint.

For more information about the Replicated SDK API endpoints, see [Replicated SDK API (Alpha)](/reference/replicated-sdk-apis).

## Customer Reporting and Instance Insights {#insights}

The Replicated SDK provides access to operational telemetry including customer reporting and insights on application instances running in customer environments. When you distribute your application with the SDK, you can view these insights in the vendor portal.

The SDK uses the values injected by the Replicated registry in your Helm chart values file to automatically send information about the instance back to the vendor portal. Additionally, to enable the SDK to report instance status to the vendor portal, such as if the instance is in a ready, degraded, or down state, you can add standard Helm labels to all resources deployed by your Helm chart. For more information, see [Prerequisite](replicated-sdk-using#prerequisite) in _Using the SDK With Your Application (Alpha)_

The following shows an example of the **Instance Details** page in the vendor portal, including application version and status details, instance uptime, and cluster details such as the cloud provider, cloud region, and the Kubernetes version and distribution:

![instance details full page](/images/instance-details.png)
[View a larger version of this image](/images/instance-details.png)

For more information about viewing customer and instance insights in the vendor portal, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

## Integration Mode

You can run the Replicated SDK in integration mode to more quickly test new functionality for your application. Integration mode allows you to use mock data to test changes locally without having to create a release in the vendor portal and then install your Helm chart from the Replicated registry.

For more information, see [Developing Against the SDK (Alpha)](replicated-sdk-development).