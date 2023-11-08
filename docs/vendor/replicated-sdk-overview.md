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

* Some popular enterprise continuous delivery tools, such as ArgoCD and Pulumi, deploy Helm charts by running `helm template` then `kubectl apply` on the generated manifests, rather than running `helm install` or `helm upgrade`.  The following limitations apply to applications installed by running `helm template` then `kubectl apply`:

  * The `/api/v1/app/history` SDK API endpoint always returns an empty array because there is no Helm history in the cluster. See [GET /app/history](/reference/replicated-sdk-apis#get-apphistory) in _Replicated SDK API (Beta)_.

  * The SDK does not automatically generate status informers to report status data for installed instances of the application. To get instance status data, you must enable custom status informers by overriding the `replicated.statusInformers` Helm value. See [Enable Application Status Insights](/vendor/insights-app-status#enable-application-status-insights) in _Enabling and Understanding Application Status_.

## How to Distribute the SDK

The SDK can be installed alongside Helm chart- or standard manifest-based applications using the Helm CLI or Replicated KOTS. You can also install the SDK separately from an application as a standalone component in integration mode.

For more information, see [Installing the Replicated SDK](/vendor/replicated-sdk-installing).

## SDK Resiliency

At startup and when serving requests, the SDK retrieves and caches the latest information from the upstream Replicated APIs, including customer license information.

If the upstream APIs are not available at startup, the SDK does not accept connections or serve requests until it is able to communicate with the upstream APIs. If communication fails, the SDK retries every 10 seconds and the SDK pod is at `0/1` ready.

When serving requests, if the upstream APIs become unavailable, the SDK serves from the memory cache and sets the `X-Replicated-Served-From-Cache` header to `true`.