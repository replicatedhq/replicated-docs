---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Replicated SDK Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## 1.0.0-beta.9

Released on October 6, 2023

### Improvements {#improvements-1-0-0-beta-9}
* Adds support for adding additional environment variables to the replicated deployment via the `extraEnv` value.
* Updates the helm.sh/helm/v3 go module to v3.13.0 to resolve GHSA-6xv5-86q9-7xr8 with medium severity.

### Bug Fixes {#bug-fixes-1-0-0-beta-9}
* Fixes an issue where data returned from API endpoints and instance reporting was outdated after a chart was upgraded.

## 1.0.0-beta.8

Released on September 19, 2023

### Bug Fixes {#bug-fixes-1-0-0-beta-8}
* Fixes an issue where the `replicated` Pod/API failed to come up due to the inability to generate status informers if the application contains empty YAML documents, or documents that only have comments.

## 1.0.0-beta.7

Released on September 15, 2023

### Improvements {#improvements-1-0-0-beta-7}
* The [custom metrics](/vendor/custom-metrics#configure-custom-metrics) API no longer requires authorization header.

## 1.0.0-beta.6

Released on September 7, 2023

### New Features {#new-features-1-0-0-beta-6}

Renames the SDK's Kubernetes resources and the library SDK chart from `replicated-sdk` to `replicated` to better align with standard SDK naming conventions.

The `replicated-sdk` naming convention is still supported and existing integrations can continue to use `replicated-sdk` as the name of the SDK Kubernetes resources and SDK chart name. However, Replicated recommends that new integrations use the `replicated` naming convention.

To update the naming convention of an existing integration from `replicated-sdk` to `replicated`, do the following before you upgrade to 1.0.0-beta.6 to avoid breaking changes:

* Update the dependencies entry for the SDK in the parent chart:

   ```yaml
   dependencies:
   - name: replicated
     repository: oci://registry.replicated.com/library
     version: 1.0.0-beta.6
   ```

* Update any requests to the SDK service in the cluster to use `replicated:3000` instead of `replicated-sdk:3000`.

* Update any automation that references the installation command for integration mode to `helm install replicated oci://registry.replicated.com/library/replicated --version 1.0.0-beta.6`.

* If the SDK's values are modified in the `values.yaml` file of the parent chart, change the field name for the SDK subchart in the `values.yaml` file from `replicated-sdk` to `replicated`.

* Change the field name of any values that are provided at runtime to the SDK from `replicated-sdk` to `replicated`. For example, `--set replicated.integration.enabled=false`.

For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

## 1.0.0-beta.5

Released on September 1, 2023

### New Features {#new-features-1-0-0-beta-5}
* Adds support for sending [custom application metrics](/vendor/custom-metrics) via the `/api/v1/app/custom-metrics` endpoint.
* Adds support for installing the Helm chart via `helm template` then `kubectl apply` the generated manifests. Limitations to installing with this approach include:
  - The [app history endpoint](/reference/replicated-sdk-apis#get-apphistory) will always return an empty array because there is no Helm history in the cluster.
  - Status informers will not be automatically generated and would have to be provided via the [replicated-sdk.statusInformers](/vendor/insights-app-status#helm-installations) Helm value.

## 0.0.1-beta.4

Released on August 17, 2023

### New Features {#new-features-0-0-1-beta-4}
* Adds support for OpenShift clusters.

### Improvements {#improvements-0-0-1-beta-4}
* Application updates returned by the `/api/v1/app/updates` endpoint show in order from newest to oldest.

## 0.0.1-beta.3

Released on August 11, 2023

### Bug Fixes {#bug-fixes-0-0-1-beta-3}
* Fixes an issue where generating a support bundle failed when using the Replicated SDK support bundle Secret in the Helm chart. The failure occurred due to a syntax issue where the `selector` field expected an array of strings instead of a map.

## 0.0.1-beta.2

Released on August 4, 2023

### New Features {#new-features-0-0-1-beta-2}
* Includes the application status as part of the [/app/info](/reference/replicated-sdk-apis#get-appinfo) endpoint response.

### Improvements {#improvements-0-0-1-beta-2}
* The replicated-sdk image is now built using a distroless base image from Chainguard, which significantly reduces the overall size and attack surface.

## 0.0.1-beta.1

Released on July 28, 2023

### Improvements {#improvements-0-0-1-beta-1}
* Renames the SDK's Kubernetes resources and the library SDK chart from `replicated` to `replicated-sdk` to distinguish them from other replicated components.
