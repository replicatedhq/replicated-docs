---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Replicated SDK Release Notes

## 1.0.0-beta.26

Released on July 31, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-26}
* Fixes an issue that caused k8s minor version parsing errors to be logged repeatedly.

## 1.0.0-beta.25

Released on July 3, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-25}
* Various bug fixes and refactoring of tests.

## 1.0.0-beta.24

Released on July 2, 2024

### Improvements {#improvements-1-0-0-beta-24}
* Adds caching and rate-limiting to the `/api/v1/app/custom-metrics` and `/api/v1/app/instance-tags` endpoints
* Adds a ten-second default timeout to the SDK's HTTP client

## 1.0.0-beta.23

Released on June 21, 2024

### New Features {#new-features-1-0-0-beta-23}
* Adds support for `PATCH` and `DELETE` methods on the [custom application metrics](/vendor/custom-metrics) endpoint: `/api/v1/app/custom-metrics`.

## 1.0.0-beta.22

Released on June 12, 2024

### Improvements {#improvements-1-0-0-beta-22}
* The `/app/info` and `/license/info` endpoints now return additional app and license info, respectively.
* Updates the SDK's support bundle spec to extract license, app, history, and release information with an exec collector.

## 1.0.0-beta.21

Released on June 6, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-21}
* Fixes an issue where the replicated pod logs collector could fail in environments with namespace-restricted RBAC.

## 1.0.0-beta.20

Released on May 14, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-20}
* Fixes an issue where the namespace fields in the support bundle spec were not quoted, which caused the linter to show schema warnings.

## 1.0.0-beta.19

Released on April 26, 2024

### New Features {#new-features-1-0-0-beta-19}
* Adds Supply-chain Levels for Software Artifacts (SLSA) generation for the Replicated SDK image.

   For example, you can run the following to validate the attestation for the SDK image:
   ```bash
   cosign download attestation replicated/replicated-sdk:VERSION | jq -r .payload | base64 -d | jq
   ```
   Where `VERSION` is the target version of the SDK.

   You can also search Sigstor using Rekor at https://search.sigstore.dev/

## 1.0.0-beta.18

Released on April 26, 2024

### Improvements {#improvements-1-0-0-beta-18}
* Updates the Replicated SDK image to resolve CVE-2024-2961 with high severity, and CVE-2023-6237, CVE-2024-24557, and CVE-2023-45288 with medium severity.

## 1.0.0-beta.17

Released on April 8, 2024

### New Features {#new-features-1-0-0-beta-17}
* Adds a new [`POST /app/instance-tags`](/reference/replicated-sdk-apis#post-appinstance-tags) endpoint that allows an application to programmatically send instance tags to the vendor portal.

## 1.0.0-beta.16

Released on February 19, 2024

### New Features {#new-features-1-0-0-beta-16}
* Adds support for running the SDK on ARM64 nodes.

## 1.0.0-beta.15

Released on February 15, 2024

### Improvements {#improvements-1-0-0-beta-15}
* Upgrades the helm.sh/helm/v3 go module to 3.14.0 to resolve GHSA-7ww5-4wqc-m92c and GHSA-45x7-px36-x8w8 with medium severity.
* Upgrades the go version used to build the Replicated SDK to 1.21.7 to resolve CVE-2023-45285, CVE-2023-44487, CVE-2023-39325, and CVE-2023-39323 with high severity, and CVE-2023-39326, CVE-2023-39319, and CVE-2023-39318 with medium severity.

## 1.0.0-beta.14

Released on February 5, 2024

### Improvements {#improvements-1-0-0-beta-14}
* Adds `fsGroup` and `supplementalGroups` to the default PodSecurityContext for the Replicated SDK deployment.

## 1.0.0-beta.13

Released on January 2, 2024

### Improvements {#improvements-1-0-0-beta-13}
* Upgrades the helm.sh/helm/v3 go module to v3.13.3 to resolve CVE-2023-39325 and GHSA-m425-mq94-257g with high severity and CVE-2023-44487 and GHSA-jq35-85cj-fj4p with medium severity.

## 1.0.0-beta.12

Released on November 6, 2023

### New Features {#new-features-1-0-0-beta-12}
* Adds support for custom metrics in air gapped installs.

## 1.0.0-beta.11

Released on October 30, 2023

### New Features {#new-features-1-0-0-beta-11}
* Adds support for running in air gapped mode.
* Renames the `images.replicated` Helm value to `images.replicated-sdk`.

## 1.0.0-beta.10

Released on October 13, 2023

### Improvements {#improvements-1-0-0-beta-10}
* Adds support for adding custom tolerations to the SDK deployment via the `tolerations` value.
* Status informers will no longer be automatically generated if the user explicitly passes an empty array for the `statusInformers` value.

### Bug Fixes {#bug-fixes-1-0-0-beta-10}
* Fixes a bug that caused no status code to be returned from the custom metrics API requests.

## 1.0.0-beta.9

Released on October 6, 2023

### Improvements {#improvements-1-0-0-beta-9}
* Adds support for setting additional environment variables in the replicated deployment via the `extraEnv` value.
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
