# Querying Entitlements in Preflights with KOTS Template Functions

This topic describes how to check custom entitlements before installation or upgrade using preflight checks and KOTS template functions in the License context. The information in this topic applies to applications installed with KOTS.

## Overview

KOTS includes default logic to control access to features in the Replicated admin console and kots CLI based on the values for the built-in fields in the customer's license. For example, by default, KOTS uses the built-in `expires_at` field to prevent an instance from receiving updates when the customer license expires. You can add custom logic to your application to control the behavior of your application based on the built-in fields or any of the custom fields that you create.

For more information about creating custom license fields, see [Managing Custom License Fields](licenses-adding-custom-fields). For more information about the built-in license fields, see [Built-In License Fields](licenses-using-builtin-fields).

## Add Preflights to Check Entitlements Before Installation or Upgrade {#install}

To enforce entitlements when your customer installs or updates your application,
you can use the Replicated LicenseFieldValue template function in your application to read the value of license fields. The LicenseFieldValue template function accepts the built-in license fields and any custom fields that you configure. For more information, see [LicenseFieldValue](/reference/template-functions-license-context#licensefieldvalue) in _License Context_.

For example, a license might limit how many nodes are permitted in a customer's
cluster. You could define this limit by creating a `node_count` custom license field:

| Name | Key | Type | Description |
|------|-----|------|-------------|
| Node Count | node_count | Integer | The maximum number of nodes permitted |

To enforce the node count when a customer installs or updates your application,
you can use LicenseFieldValue to create a preflight check that references the custom  `node_count` field:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: example-preflight-checks
spec:
  analyzers:
    - nodeResources:
        checkName: Node Count Check
        outcomes:
          - fail:
              when: 'count() > {{repl LicenseFieldValue "node_count"}}'
              message: The cluster has more nodes than the {{repl LicenseFieldValue "node_count"}} you are licensed for.
          - pass:
              message: The number of nodes matches your license ({{repl LicenseFieldValue "node_count"}})
```

In the example above, the preflight check uses the `nodeResources` analyzer and the value of the custom `node_count` field to determine if the customer has exceeded the maximum number of nodes permitted by their license. If the preflight checks fails, a failure message is displayed to the user and KOTS prevents the installation or upgrade from continuing.

For more information about this example, see [How Can I Use License Custom Fields Value in a Pre-Flight Check?](https://help.replicated.com/community/t/how-can-i-use-license-custom-fields-value-in-a-pre-flight-check/624) in Replicated Community.

For more information about defining preflight checks, see [Defining Preflight Checks](preflight-defining).