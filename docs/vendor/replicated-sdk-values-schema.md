# Helm global.replicated Values Schema

This document describes the global.replicated values schema injected by the Replicated registry when using the Helm CLI installation method. It includes information on the structure and purpose of fields to help developers integrate seamlessly with the Replicated SDK.

## Overview

The `global.replicated` values schema is a set of values that are injected by the Replicated registry when using the Helm CLI installation method. These values are used by the Replicated SDK to provide information about the replicated application and the environment in which it is running. These values are critical for licensing, release management, and enabling key features of the Replicated Vendor Portal.

For additional information about the Replicated SDK, see [Replicated SDK Overview](/vendor/replicated-sdk-overview).

## Values Schema Structure

The `global.replicated` values schema is a set of values that are injected by the Replicated registry when using the Helm CLI installation method. The schema is a JSON object that contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `global.imageRegistry` | String | The URL of the image registry where the replicated-sdk images are stored. |
| `image.registry` | String | The URL of the image registry where the replicated-sdk images are stored. |
| `image.repository` | String | The name of the replicated/replicated-sdk image repository. |
| `image.tag` | String | The tag of the replicated/replicated-sdk image. |
| `image.pullPolicy` | String | The Kubernetes image pull policy for the replicated/replicated-sdk image. |
| `license` | String | The yaml representation of the customer license. |
| `licenseFields` | string | The license fields of the customer. |
| `appName` | String | The name of the application, as specified in the Replicated Vendor Portal. |
| `channelID` | String | The unique ID of the release channel. |
| `channelName` | String | The name of the release channel (e.g., “Stable”, “Beta”). |
| `channelSequence` | Integer | The sequence number of the channel, sed to track updates in channel. |
| `releaseSequence` | Integer | The sequence number of the release associated with this deployment. |
| `releaseCreatedAt` | String | The timestamp when the release was created. |
| `releaseNotes` | String | Release notes for the current release, as provided in the Vendor Portal. |
| `versionLabel` | String | The version label for the release, often displayed in UI dashboards. |
| `parentChartURL` | String | The URL of the parent Helm chart if the application is nested in a chart hierarchy. |
| `statusInformers` | map | Configuration for custom status informers. Used for application health and status insights. |
| `replicatedAppEndpoint` | String | If it is not using the default Replicated App endpoint https://replicated.app, this field specifies the endpoint to use. |
| `serviceAccountName` | String | The name of the Kubernetes service account used by the Replicated SDK. |
| `clusterRole` | String | The name of the Kubernetes cluster role used by the Replicated SDK. |
| `imagePullSecrets` | Array | An array of Kubernetes image pull secrets that are used to pull images from private registries. |
| `nameOverride` | String | Overrides the name of the chart. |
| `namespaceOverride` | String | Overrides the namespace of the chart. |
| `containerSecurityContext.enabled` | Boolean | Enables the security context for the container. |
| `containerSecurityContext.runAsNonRoot`| Boolean | Runs the container as a non-root user. |
| `containerSecurityContext.readOnlyRootFilesystem` | Boolean | Mounts the container’s root filesystem as read-only. |
| `containerSecurityContext.allowPrivilegeEscalation` | Boolean | Allows privilege escalation for the container. |
| `containerSecurityContext.capabilities.drop` | Array | Define which capabilities for dropping. |
| `podSecurityContext.enabled` | Boolean | Enables the security context for the pod. |
| `podSecurityContext.runAsUser` | Integer | The user ID for the pod. |
| `podSecurityContext.runAsGroup` | Integer | The group ID for the pod. |
| `podSecurityContext.fsGroup` | Integer | The group ID for the pod’s filesystem. |
| `podSecurityContext.supplementalGroups` | Array | The supplemental groups for the pod. |
| `podSecurityContext.seccompProfile.type` | String | The type of seccomp profile. |
| `service.type` | String | The replicated-sdk service type. |
| `service.port` | Integer | The port for the replicated-sdk service. |
| `privateCAConfigmap` | String | The name of the ConfigMap that contains the private CA certificate. |
| `privateCASecret` | String | The name of the Secret that contains the private CA certificate. |
| `extraEnv` | Array | Additional environment variables to inject into the container. |
| `integration.licenseID` | String | The license ID of the customer. |
| `integration.enabled` | Boolean | Enables the integration. |
| `integration.mockData` | string | The mock data for the integration. |
| `isAirgap` | Boolean | Indicates whether the replicated is installed in airgap environment. |
| `replicatedID` | String | The unique ID of the replicated-sdk instance cluster ID. |
| `appID` | String | The unique ID of the replicated app slug. |
| `tolerations` | Array | The tolerations for the pod. |
| `affinity` | Object | The affinity for the pod. |

## license Values Schema

The `license` field in the `global.replicated` values schema is a string that contains the YAML representation of the customer license. The license schema is a yaml object that contains the following fields:

```yaml
apiVersion: kots.io/v1beta1
kind: License
metadata:
  name: name of the license
spec:
  appSlug: The unique application slug that the customer is associated with. This value never changes.
  channelID: The ID of the channel where the customer is assigned.
  channelName: The name of the channel where the customer is assigned.
  channels:
    - channelID: The ID of the channel where the customer is assigned.
      channelName: The name of the channel where the customer is assigned.
      channelSlug: The unique channel slug.
      endpoint: The default Replicated App endpoint https://replicated.app
      replicatedProxyDomain: The domain of Replicated Proxy Registry.
  customerEmail: The customer email address.
  customerName: The name of the customer.
  endpoint: This is the endpoint that the KOTS Admin Console uses to synchronize the licenses and download updates.
  entitlements:
    expires_at:
        description: License Expiration
        signature: {}
        title: Expiration
        value: ""
        valueType: String
  isAirgapSupported: If a license supports air gap installations with the Replicated installers (KOTS, kURL, Embedded Cluster), then this field is set to true.
  isDisasterRecoverySupported: If a license supports the Embedded Cluster disaster recovery feature, this field is set to true.
  isEmbeddedClusterDownloadEnabled: If a license supports installation with Replicated Embedded Cluster, this field is set to true or missing.
  isKotsInstallEnabled: If a license supports installation with Replicated KOTS, this field is set to true.
  isSnapshotSupported: If a license supports the snapshots backup and restore feature, this field is set to true.
  isSupportBundleUploadSupported: If a license supports uploading a support bundle in the Admin Console, this field is set to true.
  licenseID: Unique ID for the installed license. This value never changes.
  licenseSequence: This value represents the license sequence that the client currently has.
  licenseType: A string value that describes the type of the license
  replicatedProxyDomain: proxy.replicated.com
  signature: The base64-encoded license signature. This value will change when the license is updated.
  parentChartURL: The URL of the parent Helm chart if the application is nested in a chart hierarchy.
  releaseCreatedAt: The timestamp when the release was created. 
  releaseNotes: Release notes for the current release, as provided in the Vendor Portal.
  releaseSequence: The sequence number of the release associated with this deployment.
  replicatedAppEndpoint: https://replicated.app
  versionLabel: Unstable-1457889-dirty
```
