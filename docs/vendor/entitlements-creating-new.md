# Creating custom entitlements

KOTS applications that are packaged and delivered through the Replicated [Vendor Portal](https://vendor.replicated.com) use per-customer licenses to install.
Each of these licenses uniquely identifies the customer, defines their release channel, and defines _entitlement information_ about the customer.  

KOTS securely delivers these entitlement values to the application, and makes them available in the Kubernetes manifests or at runtime using the Admin Console license API.

## Built-In Entitlement Fields
See [Built-In Entitlements](/vendor/entitlements/built-in-entitlements), for a list of the entitlement fields that are included by default for every license.  

## Creating Entitlement Fields
To create new entitlement fields, first click the "License Fields" section in the Vendor UI with your application selected.

![License Fields](/images/license-fields.png)

On this page, you can see a list of the existing custom entitlement fields, edit existing fields, or create new fields.

![License Fields](/images/license-fields-create.png)

To create a new field, click the "Create custom field" link and provide the following information:

* **Field** The name of the field.
This is the name used to reference the field, and as such, is generally not changeable.
* **Title** The display name of the field.
This is how the field will appear in the Vendor UI and the Admin Console (if visible). Easily changed through Vendor UI.
* **Type** The type of the field.
We presently support integer, string, text (multi-line string), and boolean values.
* **Default** The default value to set for the field on existing customers, or when a new customer is created.
It is generally considered good practice to provide a default, where possible.
* **Required** If set, this will prevent the creation of customers unless this field is explicitly set with a value.
* **Hidden** If set, this hide the field from being visible in the Admin Console.
It will remain visible in Vendor UI.
Useful for fields like internal IDs, that are not meaningful to the end-user.

After the license field has been created, it will be shown for all customers created in the Vendor UI.
If the field is not hidden, it will additionally shown under the "Licenses" tab for customers within the Admin Console.
 ![License Fields](/images/license-fields-customer.png)


### Writing Entitlements to Manifests
The [LicenseFieldValue](/reference/template-functions/license-context) template function exists to access entitlements when installing or updating the application.
To illustrate how to use this, let's create a custom entitlement to limit the number of users that a license is permitted to use.

This entitlement will look like:

| Name | Key | Type | Description | Default Value |
|------|-----|------|-------------|---------------|
| Seat Count | seat_count | Integer | The maximum number of users permitted | 50 |

For this example, we will write this value to an environment variable in a pod that is part of an API deployment:

```yaml
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

### Querying Entitlements at Runtime
The admin console runs on the customer's cluster, and provides real-time entitlement information through the following endpoint:
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
