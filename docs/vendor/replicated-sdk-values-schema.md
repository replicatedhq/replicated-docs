# Helm global.replicated Values Schema

This document describes the values injected by the Replicated registry when using the Helm CLI installation method. It describes the structure and purpose of fields to help developers integrate seamlessly with the Replicated SDK.

## Overview

When a user installs a Helm application using the Helm CLI, the Replicated registry injects a set of customer-specific values into the `replicated` and `global.replicated` keys.

For additional information about the Replicated SDK, see [Replicated SDK Overview](/vendor/replicated-sdk-overview).

## Values Schema Structure

The `replicated` schema contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | Boolean | Whether the Replicated SDK is enabled |
| `appName` | String | The name of the application |
| `channelID` | String | The unique ID of the release channel |
| `channelName` | String | The name of the release channel (e.g., "Stable", "Beta") |
| `channelSequence` | Integer | The sequence number of the channel |
| `integration.enabled` | Boolean | Whether integration features are enabled |
| `license` | String | The YAML representation of the customer license |
| `parentChartURL` | String | The URL of the parent Helm chart |
| `releaseCreatedAt` | String | The timestamp when the release was created |
| `releaseNotes` | String | Release notes for the current release |
| `releaseSequence` | Integer | The sequence number of the release |
| `replicatedAppEndpoint` | String | The Replicated app endpoint URL |
| `versionLabel` | String | The version label for the release |

The `global.replicated` values schema contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `channelName` | String | The name of the release channel |
| `customerEmail` | String | The email address of the customer |
| `customerName` | String | The name of the customer |
| `dockerconfigjson` | String | Base64 encoded docker config json for pulling images |
| `licenseFields.expires_at.description` | String | Description of the license expiration |
| `licenseFields.expires_at.signature` | Object | Signature data for the expiration field |
| `licenseFields.expires_at.title` | String | Title of the expiration field |
| `licenseFields.expires_at.value` | String | Value of the expiration field |
| `licenseFields.expires_at.valueType` | String | Type of the expiration value |
| `licenseFields.expires_at.signature.v1` | String | Signature data for the license |
| `licenseID` | String | The unique identifier for the license |
| `licenseType` | String | The type of license (e.g., "dev", "prod") |

## license Values Schema

The `license` field in the `global.replicated` values schema is a string that contains the YAML representation of the customer license:

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
```
