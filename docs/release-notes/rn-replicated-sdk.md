---
toc_max_heading_level: 2
pagination_next: null
pagination_prev: null
---

# Replicated SDK Release Notes

This topic contains release notes for the [Replicated SDK](/vendor/replicated-sdk-overview). The release notes list new features, improvements, bug fixes, known issues, and breaking changes. 

## 1.7.0

Released on Jun 20, 2025

### Improvements {#improvements-1-7-0}
* Updates the registry to point to a new proxy endpoint for improved performance and reliability.
* Adds support adding a liveness probe to the SDK deployment with the [`livenessProbe`](https://github.com/replicatedhq/replicated-sdk/blob/1.7.0/chart/values.yaml#L106) Helm value.
* Adds support for a RBAC role with reduced scope with the [`minimalRBAC`](https://github.com/replicatedhq/replicated-sdk/blob/1.7.0/chart/values.yaml#L301) Helm value.For more information, see [Minimal RBAC](/vendor/replicated-sdk-customizing#minimal-rbac) in _Customizing the Replicated SDK_.

## 1.6.0

Released on Jun 9, 2025

### Improvements {#improvements-1-6-0}
* Adds support for providing a TLS cert and key with the [`tlsCertSecretName`](https://github.com/replicatedhq/replicated-sdk/blob/1.6.0/chart/values.yaml#L280) Helm value.

## 1.5.1 

Released on Apr 16, 2025

### Improvements {#improvements-1-5-1}
* Changed the default location of the image this chart uses to be registry.replicated.com/library/replicated-sdk-image. This is anonymous and will support custom domains.

## 1.5.0

Released on April 7, 2025

### New Features {#new-features-1-5-0}
* Adds support for setting custom annotations across all resources with the [`commonAnnotations`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L16) Helm value.
* Adds support for configuring container resource requirements with the [`resources`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L93) Helm value.
* Adds support for customizing the readiness probe configuration with the [`readinessProbe`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L79) Helm value.
* Adds support for mounting custom volumes with the [`extraVolumes`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L115) and [`extraVolumeMounts`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L125) Helm values.
* Adds support for init containers with the [`initContainers`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L104) Helm value.
* Adds support for host settings including [`hostNetwork`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L171C1-L171C8), [`hostIPC`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L175), and [`hostAliases`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L179).
* Adds support for advanced scheduling with the [`topologySpreadConstraints`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L188) Helm value.
* Adds support for priority configuration with the [`priorityClassName`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L199) and [`schedulerName`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L203) Helm values.
* Adds support for using existing secrets with the [`existingSecret`](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl#L134) Helm value.

### Improvements {#improvements-1-5-0}
* Improves template organization with reusable helper functions.
* Consolidates related configuration sections in templates.
* Adds comprehensive documentation for all configuration options. See [values.yaml.tmpl](https://github.com/replicatedhq/replicated-sdk/blob/1.5.0/chart/values.yaml.tmpl) in the replicated-sdk repository in GitHub.

## 1.4.0

Released on April 1, 2025

### New Features {#new-features-1-4-0}
* Adds support for setting `nodeSelector` for the Replicated SDK deployment via the `nodeSelector` Helm value.

## 1.3.0

Released on March 27, 2025

### Bug Fixes {#bug-fixes-1-3-0}
* Fixes an issue where the `replicatedAppDomain` Helm value wasn't consistently applied across all API calls to replicated.app.

## 1.2.0

Released on March 11, 2025

### New Features {#new-features-1-2-0}
* Adds a `replicatedAppDomain` Helm value to the SDK Helm chart for configuring the domain used by the Replicated app service. This value defaults to `replicated.app` if neither the `replicatedAppDomain` Helm value nor the `replicatedAppEndpoint` from the Replicated registry is provided.

## 1.1.1

Released on February 19, 2025

### Improvements {#improvements-1-1-1}
* Addresses CVE-2025-0665, CVE-2025-0725, and CVE-2024-12797

## 1.1.0

Released on February 4, 2025

### New Features {#new-features-1-1-0}
* Adds the ability to pass custom labels to the Replicated SDK Helm Chart via the `commonLabels` and `podLabels` Helm values. For more information, see [Add Custom Labels](/vendor/replicated-sdk-customizing#add-custom-labels) in _Customizing the Replicated SDK_.

## 1.0.0

Released on December 23, 2024

This release removes the pre-release from the version number.

## 1.0.0-beta.33

Released on December 23, 2024

### New Features {#new-features-1-0-0-beta-33}
* Adds support for setting `affinity` for the Replicated SDK deployment
* Adds `/app/status` [API](/reference/replicated-sdk-apis) that returns detailed application status information. 
* Adds support for mocking channelID, channelName, channelSequence, releaseSequence in current release info returned by /app/info API.

### Bug Fixes {#bug-fixes-1-0-0-beta-33}
* Fixes a bug that could result in an instance being reported as unavailable if the application includes an Ingress resource.

## 1.0.0-beta.32

Released on December 9, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-32}
* Fixes an issue that caused [custom metrics](/vendor/custom-metrics#configure-custom-metrics) to not be collected.

## 1.0.0-beta.31

Released on October 17, 2024

### New Features {#new-features-1-0-0-beta-31}
* Adds support for specifying ClusterRole using the [clusterRole](/vendor/replicated-sdk-customizing#custom-clusterrole) key.

## 1.0.0-beta.30

Released on October 16, 2024

### New Features {#new-features-1-0-0-beta-30}
* Adds support for custom Certificate Authorities using the [privateCASecret](/vendor/replicated-sdk-customizing#custom-certificate-authority) key.

### Improvements {#improvements-1-0-0-beta-30}
* This release addresses CVE-2024-41110. 

## 1.0.0-beta.29

Released on October 9, 2024

### New Features {#new-features-1-0-0-beta-23}
* Adds support for setting individual image name component values instead of the entire image: registry, repository, and tag.

## 1.0.0-beta.28

Released on September 20, 2024

### New Features {#new-features-1-0-0-beta-23}
* Adds support for custom Certificate Authorities using the [privateCAConfigmap](/vendor/replicated-sdk-customizing#custom-certificate-authority) key.

## 1.0.0-beta.27

Released on August 16, 2024

### Bug Fixes {#bug-fixes-1-0-0-beta-27}
* Fixes an issue that caused k0s to be reported as the distribution for Embedded Clusters.

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
