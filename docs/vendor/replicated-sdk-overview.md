import Beta from "../partials/replicated-sdk/_beta.mdx"
import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"

# About the Replicated SDK (Beta)

This topic provides an introduction to using the Replicated SDK with your Helm chart application.

<Beta/>

## Overview

<SDKOverview/>

For more information about using the Replicated SDK, see [Using the SDK With Your Application (Beta)](/vendor/replicated-sdk-using).

## How the SDK Runs in a Customer Environment {#about-sdk-initialize}

The following diagram shows how the Replicated SDK is installed and runs in a customer environment:

<img src="/images/sdk-overview-diagram.png" alt="diagram of the replicated sdk in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

Finally, the SDK is initialized in the customer environment using values that the Replicated registry injects in the Helm chart values file, such as customer license and release information. You can use the SDK API to get customer-specific license information from the vendor portal during runtime. You can also use the API to get details about the instance from the customer environment and from the vendor portal.

## SDK API 

The Replicated SDK provides and API that you can use to embed Replicated functionality into your application.

For example, if your application includes a UI where users manage their application instance, then you can use the `/api/v1/app/updates` endpoint to include messages in the UI that encourage users to upgrade when new versions are available. You could also revoke access to the application when a license expires using the `/api/v1/license/fields` endpoint.

For more information about the Replicated SDK API endpoints, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

## Customer Reporting and Instance Insights {#insights}

The Replicated SDK provides access to operational telemetry including customer reporting and insights on application instances running in customer environments. When you distribute your application with the SDK, you can view these insights in the vendor portal.

The Replicated SDK does not require any additional configuration to get access to instance data. The SDK uses the values injected by the Replicated registry in your Helm chart values file during initialization to automatically send information about the instance back to the vendor portal.

The following shows an example of the **Instance Details** page in the vendor portal, including application version and status details, instance uptime, and cluster details such as the cloud provider, cloud region, and the Kubernetes version and distribution:

![instance details full page](/images/instance-details.png)
[View a larger version of this image](/images/instance-details.png)

For more information about viewing customer and instance insights in the vendor portal, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

## Integration Mode

You can run the Replicated SDK in integration mode to more quickly test new functionality for your application. Integration mode allows you to use mock data to test changes locally without having to create a release in the vendor portal and then pull your Helm chart from the Replicated registry.

For more information, see [Developing in Integration Mode (Beta)](replicated-sdk-development).