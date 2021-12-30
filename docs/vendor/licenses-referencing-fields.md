# Referencing license fields

This topic describes how to reference license fields.

For information about built-in license fields, see [About built-in license fields](licenses-using-builtin-fields). For information about creating custom license fields, see [Creating custom license fields](licenses-adding-custom-fields).

## Overview of referencing license fields

After you define built-in or custom license fields for a customer, you must create a reference to the license fields. This ensures that the customer's application instance provides the entitlements that you defined in their license file.

To reference the license fields, you can do one of the following:

* **Using application manifests**: Write the fields to a Kubernetes manifest. The LicenseFieldValue template function then accesses license fields during application installation and update. See [Write license fields to Kubernetes manifests](#write-license-fields-to-kubernetes-manifests) below.
* **Using the admin console API**: Query the license field from the application during runtime using the admin console API. See [Query license fields at runtime](#query-license-fields-at-runtime) below.

### Write license fields to Kubernetes manifests

The LicenseFieldValue template function accesses license fields when a customer installs or updates your application. For more information, see [LicenseFieldValue](template-functions-license-context#licensefieldvalue) in _License context_.

You can write license fields to a Kubernetes manifest file to allow the LicenseFieldValue template function to read the values during installation or update.

For example, the `seat_count` custom license field below limits the number of users that a license is permitted:

| Name | Key | Type | Description | Default Value |
|------|-----|------|-------------|---------------|
| Seat Count | seat_count | Integer | The maximum number of users permitted | 50 |

The following manifest file shows how to write this `seat_count` value to an environment variable in a pod that is part of an API deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  selector:
    matchLabels:
      app: api
  template:
    spec:
      containers:
      - image: myapp/api:v1.0.1
        name: api
        env:
          - name: SEAT_COUNT
            value: '{{repl LicenseFieldValue "seat_count" }}
```            


### Query license fields at runtime

The Replicated admin console runs on the customer's cluster and provides entitlement information during application runtime.

To reference license fields at runtime, you can send an http request to the admin console API `/license/v1/license` endpoint at the following location:

```
http://kotsadm:3000/license/v1/license
```

The admin console API returns a response in YAML format. For example:

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

To return a license field value, parse the response using the name of the license field.

For example, the following Javascript parses the API response for the value of the `seat_count` custom field:

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
