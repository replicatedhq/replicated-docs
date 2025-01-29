
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

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
| `license` | String | The license ID of customer. |
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


## Using Replicated Registry Values
With the Replicated proxy registry, each customer’s license information is injected into the application’s environment and grant proxy access to images in an external private registry.
To use the Replicated registry values, you must first configure the Replicated proxy registry in your Kubernetes cluster. For more information, see [Replicated Proxy Registry](/vendor/replicated-proxy-registry).

Here is an example of how to use the `global.replicated` values schema in your application:

```yaml
dockerconfigjson: '{{ .Values.global.replicated.dockerconfigjson }}'
images:
  myapp:
    # Add image URL in the values file
    apiImageRepository: proxy.replicated.com/proxy/my-app/quay.io/my-org/api
    apiImageTag: v1.0.1
```
In your deployment manifest, you can reference the `global.replicated` values schema to access the license information and other values injected by the Replicated registry.
```yaml
# /templates/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
 name: example
spec:
  template:
    spec:
      containers:
        - name: api
          # Access the apiImageRepository field from the values file
          image: "{{ .Values.images.myapp.apiImageRepository }}:{{ .Values.images.myapp.apiImageTag }}"
          {{ if .Values.global.replicated.dockerconfigjson }}
          imagePullSecrets:
            - name: replicated-pull-secret
          {{ end }}
```
