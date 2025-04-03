# Helm global.replicated Values Schema

This topic describes the `global.replicated` values that are injected in the values file of an application's parent Helm chart during Helm installations with Replicated.

## Overview

When a user installs a Helm application with the Helm CLI, the Replicated registry injects a set of customer-specific values into the `global.replicated` key of the parent Helm chart's values file.

The values in the `global.replicated` field include the following:

* The fields in the customer's license, such as the field names, descriptions, signatures, values, and any custom license fields that you define. Vendors can use this license information to check entitlements before the application is installed. For more information, see [Checking Entitlements in Helm Charts Before Deployment](/vendor/licenses-reference-helm).

* A base64 encoded Docker configuration file. To proxy images from an external private registry with the Replicated proxy registry, you can use the `global.replicated.dockerconfigjson` field to create an image pull secret for the proxy registry. For more information, see [Proxying Images for Helm Installations](/vendor/helm-image-registry).

The following is an example of a Helm values file containing the `global.replicated` values:

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
```

## `global.replicated` Values Schema

The `global.replicated` values schema contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `channelName` | String | The name of the release channel |
| `customerEmail` | String | The email address of the customer |
| `customerName` | String | The name of the customer |
| `dockerconfigjson` | String | Base64 encoded docker config json for pulling images |
| `licenseFields`| | A list containing each license field in the customer's license. Each element under `licenseFields` has the following properties: `description`, `signature`, `title`, `value`, `valueType`. `expires_at` is the default `licenseField` that all licenses include. Other elements under `licenseField` include the custom license fields added by vendors in the Vendor Portal. For more information, see [Managing Customer License Fields](/vendor/licenses-adding-custom-fields). |
| `licenseFields.[FIELD_NAME].description` | String | Description of the license field |
| `licenseFields.[FIELD_NAME].signature.v1` | Object | Signature of the license field |
| `licenseFields.[FIELD_NAME].title` | String | Title of the license field |
| `licenseFields.[FIELD_NAME].value` | String | Value of the license field |
| `licenseFields.[FIELD_NAME].valueType` | String | Type of the license field value |
| `licenseID` | String | The unique identifier for the license |
| `licenseType` | String | The type of license, such as "dev" or "prod". For more information, see [Customer Types](/vendor/licenses-about#customer-types) in _About Customers and Licensing_. |

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

For the default Replicated SDK Helm chart values file, see [values.yaml.tmpl](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml.tmpl) in the [replicated-sdk](https://github.com/replicatedhq/replicated-sdk) repository in GitHub.

The SDK Helm values also include a `replicated.license` field, which is a string that contains the YAML representation of the customer license. For more information about the built-in fields in customer licenses, see [Built-In License Fields](licenses-using-builtin-fields).