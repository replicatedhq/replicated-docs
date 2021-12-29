# Defining a customer license in manifest files or the API

In addition to defining license fields through the Replicated vendor portal UI, you can also define them in the Kubernetes manifest files or by querying the license fields at runtime.

## About defining license fields

These fields can be read from both the template functions, as well as from Admin Console API.

You can set license fields for a customer in one of the following ways:

* **In the vendor portal UI**: See [Creating a customer](releases-creating-customer).
* **Within application manifests**: Use the [LicenseFieldValue](/reference/template-functions/license-context) function to return the value of the corresponding field. For example, `value: '{{repl LicenseFieldValue "expires_at" }}'`. See [Write license fields to Kubernetes manifests](#write-license-fields-to-kubernetes-manifests) below.
* **Within the application**: Execute an http request to `http://kotsadm:3000/license/v1/license` to return the license API response. Then, parse the response to find the return the corresponding license field value. See [Query license fields at runtime](#query-license-fields-at-runtime).

### Write license fields to Kubernetes manifests

The [LicenseFieldValue](/reference/template-functions/license-context) template function exists to access entitlements when installing or updating the application.
To illustrate how to use this, let's create a custom entitlement to limit the number of users that a license is permitted to use.

This entitlement will look like:

| Name | Key | Type | Description | Default Value |
|------|-----|------|-------------|---------------|
| Seat Count | seat_count | Integer | The maximum number of users permitted | 50 |

For this example, we will write this value to an environment variable in a pod that is part of an API deployment:

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

The Replicated admin console runs on the customer's cluster, and provides real-time entitlement information through the following endpoint:
>`/license/v1/license`

To query entitlements at runtime, execute an http request to the following location:
>`http://kotsadm:3000/license/v1/license`

The response will be returned in YAML format.
For example:
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

To return the entitlement value of interest, parse the above response using the name of the built-in or custom entitlement.
The following is an example in Javascript to demonstrate:

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
