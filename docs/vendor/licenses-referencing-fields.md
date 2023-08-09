# Checking Entitlements for KOTS

This topic describes how to check custom entitlements during installation, upgrade, and runtime for applications installed with Replicated KOTS.

## Overview

KOTS includes default logic to control access to features in the Replicated admin console and kots CLI based on the values for the built-in fields in the customer's license. For example, by default, KOTS uses the built-in `expires_at` field to prevent an instance from receiving updates when the customer license expires. You can add custom logic to your application to control the behavior of your application based on the built-in fields or any of the custom fields that you create.

For more information about creating custom license fields, see [Managing Custom License Fields](licenses-adding-custom-fields). For more information about the built-in license fields, see [Built-In License Fields](licenses-using-builtin-fields).

To check entitlements in applications installed with KOTS, you can:

* [Check Entitlements Before Installation or Upgrade](#install)
* [Query License Fields at Runtime](#runtime)

## Check Entitlements Before Installation or Upgrade {#install}

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

For more information about defining preflight checks for applications installed with KOTS, see [Define Preflight Checks for KOTS](preflight-kots-defining).

## Query License Fields at Runtime {#runtime}

The Replicated admin console runs on the customer's cluster and provides entitlement information during application runtime. You can query the admin console {license} endpoint to enforce entitlements at runtime.

To reference license fields at runtime, send an HTTP request to the admin console `/license/v1/license` endpoint at the following location:

```
http://kotsadm:3000/license/v1/license
```

The query returns a response in YAML format. For example:

```javascript
{"license_id":"WicPRaoCv1pJ57ZMf-iYRxTj25eZalw3",
"installation_id":"a4r1s31mj48qw03b5vwbxvm5x0fqtdl6",
"assignee":"FirstCustomer",
"release_channel":"Unstable",
"license_type":"trial",
"expiration_time":"2026-01-23T00:00:00Z",
"fields":[
  {"field":"Customer ID","title":"Customer ID (Internal)","type":"Integer","value":121,"hide_from_customer":true},
  {"field":"Modules","title":"Enabled Modules","type":"String","value":"Analytics, Integration"}]}
```

To return a license field value, parse the response using the name of the license
field.

For example, the following Javascript parses the response for the value of a
`seat_count` custom field:

```javascript
import * as rp from "request-promise";

rp({
  uri: "http://kotsadm:3000/license/v1/license",
  json: true
}).then(license => {
  const seatCount = license.fields.find((field) => {
    return field.field === "seat_count";
  });
  console.log(seatCount.value);
}).catch(err => {
  // Handle error response from `kotsadm`
});
```