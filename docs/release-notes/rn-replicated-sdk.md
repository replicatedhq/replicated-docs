---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Replicated SDK Release Notes

<!--RELEASE_NOTES_PLACEHOLDER-->

## 1.0.0-beta.6

Released on September 7, 2023

### New Features {#new-features-1-0-0-beta-6}

Renames the SDK's Kubernetes resources and the library SDK chart from `replicated-sdk` to `replicated`. The `replicated-sdk`. 
Early beta adopters using `replicated-sdk` as the name of the SDK Kubernetes resources and SDK chart name are still supported. However, we recommend new integrations use the recommended `replicated` naming convention for these resources.

Switching existing integrations to use the new `replicated` naming convention can cause them to break. To avoid this breaking change, do the following before upgrading:

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

:::important
v0.0.1-beta.1 of the Replicated SDK includes a name change that can cause existing integrations to break. For information about how to avoid this breaking change, see [Breaking Change](#breaking-changes-0-0-1-beta-1).
:::
### Improvements {#improvements-0-0-1-beta-1}
* Renames the SDK's Kubernetes resources and the library SDK chart from `replicated` to `replicated-sdk` to distinguish them from other replicated components.

### Breaking Change {#breaking-changes-0-0-1-beta-1}

v0.0.1-beta.1 renames the SDK's Kubernetes resources and the library SDK chart. This can cause existing integrations that use an alpha version of the SDK to break.

To avoid this breaking change, do the following before upgrading:

* Update the dependencies entry for the SDK in the parent chart:

   ```yaml
   dependencies:
   - name: replicated-sdk
     repository: oci://registry.replicated.com/library
     version: 0.0.1-beta.1
   ```

* Update any requests to the SDK service in the cluster to use `replicated-sdk:3000` instead of `replicated:3000`.

* Update any automation that references the installation command for integration mode to `helm install replicated-sdk oci://registry.replicated.com/library/replicated-sdk --version 0.0.1-beta.1`.

* If the SDK's values are modified in the `values.yaml` file of the parent chart, change the field name for the SDK subchart in the `values.yaml` file from `replicated` to `replicated-sdk`.

* Change the field name of any values that are provided at runtime to the SDK from `replicated` to `replicated-sdk`. For example, `--set replicated-sdk.integration.enabled=false`.

For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).
