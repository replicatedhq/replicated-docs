# About the Replicated SDK

This topic provides an introduction to using the Replicated SDK with your application.

## Overview

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application. The SDK can be installed alongside applications packaged as Helm charts or Kubernetes manifests. The SDK can be installed using the Helm CLI or KOTS.

For information about how to distribute and install the SDK with your application, see [Install the Replicated SDK](/vendor/replicated-sdk-installing).

Replicated recommends that the SDK is distributed with all applications because it provides access to key Replicated functionality, such as:

* Automatic access to insights and operational telemetry for instances running in customer environments, including granular details about the status of different application resources. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).
* An in-cluster API that you can use to embed Replicated features into your application, including:
  * Collect custom metrics on instances running in online or air gap environments. See [Configure Custom Metrics](/vendor/custom-metrics).
  * Check customer license entitlements at runtime. See [Query Entitlements with the Replicated SDK API](/vendor/licenses-reference-sdk) and [Verify License Field Signatures with the Replicated SDK API](/vendor/licenses-verify-fields-sdk-api). 
  * Provide update checks to alert customers when new versions of your application are available for upgrade. See [Support Update Checks in Your Application](/reference/replicated-sdk-apis#support-update-checks-in-your-application) in _Replicated SDK API_.
  * Programmatically name or tag instances from the instance itself. See [Programatically Set Tags](/reference/replicated-sdk-apis#post-appinstance-tags).

For more information about the Replicated SDK API, see [Replicated SDK API](/reference/replicated-sdk-apis). For information about developing against the SDK API locally, see [Develop Against the SDK API](replicated-sdk-development).

## Limitations

The Replicated SDK has the following limitations:

* Some popular enterprise continuous delivery tools, such as ArgoCD and Pulumi, deploy Helm charts by running `helm template` then `kubectl apply` on the generated manifests, rather than running `helm install` or `helm upgrade`.  The following limitations apply to applications installed by running `helm template` then `kubectl apply`:

  * The `/api/v1/app/history` SDK API endpoint always returns an empty array because there is no Helm history in the cluster. See [GET /app/history](/reference/replicated-sdk-apis#get-apphistory) in _Replicated SDK API_.

  * The SDK does not automatically generate status informers to report status data for installed instances of the application. To get instance status data, you must enable custom status informers by overriding the `replicated.statusInformers` Helm value. See [Enable Application Status Insights](/vendor/insights-app-status#enable-application-status-insights) in _Enabling and Understanding Application Status_.
 
## SDK Resiliency

At startup and when serving requests, the SDK retrieves and caches the latest information from the upstream Replicated APIs, including customer license information.

If the upstream APIs are not available at startup, the SDK does not accept connections or serve requests until it is able to communicate with the upstream APIs. If communication fails, the SDK retries every 10 seconds and the SDK pod is at `0/1` ready.

When serving requests, if the upstream APIs become unavailable, the SDK serves from the memory cache and sets the `X-Replicated-Served-From-Cache` header to `true`.  Additionally, rapid successive requests to same SDK endpoint with the same request properties will be rate-limited returning the last cached payload and status code without reaching out to the upstream APIs. A `X-Replicated-Rate-Limited` header will set to `true`.

## Replicated SDK Helm Values

When a user installs a Helm chart that includes the Replicated SDK as a dependency, a set of default SDK values are included in the `replicated` key of the parent chart's values file.

For example:

```yaml
# values.yaml 

replicated:
  enabled: true
  appName: gitea
  channelID: 2jKkegBMseH5w...
  channelName: Beta
  channelSequence: 33
  integration:
    enabled: true
  license: {}
  parentChartURL: oci://registry.replicated.com/gitea/beta/gitea
  releaseCreatedAt: "2024-11-25T20:38:22Z"
  releaseNotes: 'CLI release'
  releaseSequence: 88
  replicatedAppEndpoint: https://replicated.app
  versionLabel: Beta-1234
```

These `replicated` values can be referenced by the application or set during installation as needed. For example, if users need to add labels or annotations to everything that runs in their cluster, then they can pass the labels or annotations to the relevant value in the SDK subchart.

For the default Replicated SDK Helm chart values file, see [values.yaml](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml) in the [replicated-sdk](https://github.com/replicatedhq/replicated-sdk) repository in GitHub.

The SDK Helm values also include a `replicated.license` field, which is a string that contains the YAML representation of the customer license. For more information about the built-in fields in customer licenses, see [Built-In License Fields](licenses-using-builtin-fields).