# Query Entitlements with the KOTS License API

This topic describes how to use the Replicated KOTS License API to query license fields during runtme. The information in this topic applies to applications installed with KOTS.

:::important
Using the KOTS License API to check entitlements during runtime is _not_ recommended for new applications distributed with Replciated. Instead, Replicated recommends that you include the Replicated SDK with your application and query entitlements during runtime using the SDK in-cluster API. See [Checking Entitlements with the Replicated SDK](licenses-reference-sdk).
:::

## Overview

KOTS includes default logic to control access to features in the KOTS Admin Console and KOTS CLI based on the values for the built-in fields in the customer's license. For example, by default, KOTS uses the built-in `expires_at` field to prevent an instance from receiving updates when the customer license expires. You can add custom logic to your application to control the behavior of your application based on the built-in fields or any of the custom fields that you create.

For information about creating custom license fields, see [Manage Customer License Fields](licenses-adding-custom-fields). For the list of built-in fields in customer licenses, see [Built-In License Fields](/vendor/licenses-using-builtin-fields).

The KOTS Admin Console runs on the customer's cluster and provides entitlement information during application runtime. You can query the admin console `/license/v1/license` endpoint to enforce entitlements at runtime.

## Query Fields

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
## Parse the API Response 

To return a license field value, parse the response using the name of the license
field.

For example, the following Javascript parses the response for the value of a
`seat_count` custom field:

```javascript


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