import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import ChartRequirements from "../partials/replicated-sdk/_chart-requirements-note.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# About the Replicated SDK (Beta)

This topic provides an introduction to using the Replicated SDK with your Helm chart application.

## Overview

<SDKOverview/>

For more information about the Replicated SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis). For information about developing against the SDK API locally, see [Developing Against the SDK API (Beta)](replicated-sdk-development).

## Limitations

The Replicated SDK has the following limitations:

* **SDK-Enabled Helm Charts with KOTS**: When a Helm chart that includes the SDK as a dependency is installed with KOTS, instance data might be duplicated because both KOTS and the SDK are reporting data. To install an SDK-enabled Helm chart with KOTS, you must update both the chart and the HelmChart custom resource so that the SDK is excluded from KOTS installations. For more information, see [Using an SDK-Enabled Chart for KOTS Installations](helm-kots-using-sdk).

* **Installing with `helm template` and `kubectl apply`**: Some popular enterprise continuous delivery tools, such as ArgoCD and Pulumi, deploy Helm charts by running `helm template` then `kubectl apply` on the generated manifests, rather than running `helm install` or `helm upgrade`.  The following limitations apply to applications installed by running `helm template` then `kubectl apply`:

  * The `/api/v1/app/history` SDK API endpoint always returns an empty array because there is no Helm history in the cluster. See [GET /app/history](/reference/replicated-sdk-apis#get-apphistory) in _Replicated SDK API (Beta)_.

  * The SDK does not automatically generate status informers to report status data for installed instances of the application. To get instance status data, you must enable custom status informers by overriding the `replicated-sdk.statusInformers` Helm value. See [Enable Application Status Insights](/vendor/insights-app-status#enable-application-status-insights) in _Enabling and Understanding Application Status_.


## How to Distribute the SDK

You can distribute the Replicated SDK with your application by declaring it as a dependency in your application Helm chart `Chart.yaml` file:

<DependencyYaml/>

Consider the following guidelines for adding the SDK as a dependency:

* <ChartRequirements/>

* Replicated recommends that your application is installed as a single chart that includes all necessary charts as dependencies. However, if your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first.

## How the SDK Runs in a Customer Environment {#about-sdk-initialize}

The following diagram shows how the Replicated SDK is installed and runs in a customer environment:

<img src="/images/sdk-overview-diagram.png" alt="diagram of the replicated sdk in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

Finally, the SDK is initialized in the customer environment using values that the Replicated registry injects in the Helm chart values file. After the SDK is initialized, you can use the SDK API to get customer-specific license information from the vendor portal during runtime. You can also use the API to get details about the instance from the customer environment and from the vendor portal.

For more information about installing with Helm, see [Installing with Helm](install-with-helm).

### Replicated Helm Values {#replicated-values}

When a customer installs your Helm chart from the Replicated registry, the Replicated registry injects values into the `global.replicated` field of the Helm chart values file. Additionally, when the Replicated SDK is installed alongside your application, the registry injects values into the `replicated-sdk` field. 

The Replicated SDK uses the values in the `replicated-sdk` field to initialize in a customer environment and to send information about the instance back to the vendor portal, such as the Kubernetes version and distribution of the cluster and the cloud provider where the instance is running.

The following is an example of a Helm values file containing both the `global.replicated` and `replicated-sdk` fields injected by the Replicated registry:

```yaml
# Helm values.yaml
global:
  replicated:
    channelName: Stable
    customerEmail: username@example.com
    customerName: Example Customer
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
    licenseID: YiIXRTjiB7R...
    licenseType: dev
replicated-sdk:
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
  releaseNotes: "Some release notes"
  releaseSequence: 81
  username: username@example.com
  versionLabel: 0.1.70
```

The values in the `global.replicated` field provide information about the following:
* Details about the fields in the customer's license, such as the field name, description, signature, value, and any custom license fields that you define.
* A base64 encoded Docker configuration file. If you use the Replicated proxy service to proxy images from an external private registry, you can use the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy service. For more information, see [Proxying Images for Helm Installations](/vendor/helm-image-registry). 

The values in the `replicated-sdk` field provide information about the following:
* The full customer license and the license ID
* The target application release from the vendor portal

### SDK Resiliency

At startup and when serving requests, the SDK retrieves and caches the latest information from the upstream Replicated APIs, including customer license information.

If the upstream APIs are not available at startup, the SDK does not accept connections or serve requests until it is able to communicate with the upstream APIs. If communication fails, the SDK retries every 10 seconds and the SDK pod is at `0/1` ready.

When serving requests, if the upstream APIs become unavailable, the SDK serves from the memory cache and sets the `X-Replicated-Served-From-Cache` header to `true`.
