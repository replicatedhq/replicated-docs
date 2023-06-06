# Replicated SDK APIs (Beta)

The Replicated SDK provides APIs that you can use to embed Replicated functionality into your Helm chart application. For more information about how to get started with the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

:::note
The Replicated SDK is Beta and is not recommended for production use.
:::

## Authentication

The Replicated SDK APIs require the ID for a customer license created in the Replicated vendor portal to authenticate and initialize in an environment.

After the SDK is installed, the Replicated SDK API service is exposed at `replicated:3000`. For example, you can run `curl replicated:3000/api/v1/license/info` to get details about the customer license file from the license API.

To verify the location of the Replicated SDK API service, you can run `kubectl get service`.

## Rate Limits

?

## app

### Get application information

List details about an application instance, including the app name, location of the Helm chart in the Replicated OCI registry, and details about the current application release that the instance is running. 

```
/api/v1/app/info
```

Response:

```json
{
  "appSlug": "alex-echo-server-helm",
  "appName": "alex-echo-server-helm",
  "helmChartURL": "oci://registry.replicated.com/alex-echo-server-helm/stable/echo-server",
  "currentRelease": {
    "versionLabel": "0.1.72",
    "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
    "channelName": "Stable",
    "isRequired": false,
    "createdAt": "2023-05-28T16:31:21Z",
    "releaseNotes": "",
    "helmReleaseName": "echo-server",
    "helmReleaseRevision": 5,
    "helmReleaseNamespace": "echo-server-helm"
  }
}
```

### Get application updates

List details about the releases that are available for an application instance, including the version label, created timestamp, and release notes for the releases available for update.

```
/api/v1/app/updates
```

Response:

```json
[
  {
    "versionLabel": "0.1.15",
    "isRequired": false,
    "createdAt": "2023-05-12T15:48:45.000Z",
    "releaseNotes": ""
  }
]
```

### Get application history

List details about the releases that an application instance has installed previously.

```
/api/v1/app/history
```

Response:

```json
{
  "releases": [
    {
      "versionLabel": "0.1.70",
      "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
      "channelName": "Stable",
      "isRequired": false,
      "createdAt": "2023-05-12T17:43:51Z",
      "releaseNotes": "",
      "helmReleaseName": "echo-server",
      "helmReleaseRevision": 2,
      "helmReleaseNamespace": "echo-server-helm"
    }
  ]
}
```

## license

### Get license details

List details about the customer license file, including the license ID, type, the customer name, and the channel the customer is assigned.

```
/api/v1/license/info
```

Response:

```json
{
  "licenseID": REDACTED,
  "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
  "channelName": "Stable",
  "customerName": "Builders Plan Tester",
  "customerEmail": "alexp@replicated.com",
  "licenseType": "dev"
}
```

### Get license fields

```
/api/v1/license/fields
```

Response:

```json
{
  "expires_at": {
    "name": "expires_at",
    "title": "Expiration",
    "description": "License Expiration",
    "value": "2023-05-30T00:00:00Z",
    "valueType": "String",
    "signature": {
      "v1": "Vs+W7+sF0RA6UrFEJcyHAbC5YCIT67hdsDdqtJTRBd4ZitTe4pr1D/SZg2k0NRIozrBP1mXuTgjQgeI8PyQJc/ctQwZDikIEKFW0sVv0PFPQV7Uf9fy7wRgadfUxkagcCS8O6Tpcm4WqlhEcgiJGvPBki3hZLnMO9Ol9yOepZ7UtrUMVsBUKwcTJWCytpFpvvOLfSNoHxMnPuSgpXumbHZjvdXrJoJagoRDXPiXXKGh02DOr58ncLofYqPzze+iXWbE8tqdFBZc72lLayT1am3MN0n3ejCNWNeX9+CiBJkqMqLLkjN4eugUmU/gBiDtJgFUB2gq8ejVVcohqos69WA=="
    }
  },
  "numSeats": {
    "name": "numSeats",
    "title": "Number of Seats",
    "value": 10,
    "valueType": "Integer",
    "signature": {
      "v1": "UmsYlVr4+Vg5TWsJV6goagWUM4imdj8EUUcdau7wIzfcU0MuZnv3UNVlwVE/tCuROCMcbei6ygjm4j5quBdkAGUyq86BCtohg/SqRsgVoNV6BN0S+tnqJ7w4/nqRVBc2Gsn7wTYNXiszLMkmfeNOrigLgsrtaGJmZ4IsczwI1V5Tr+AMAgrACL/UyLg78Y6EitKFW4qvJ9g5Q8B3uVmT+h9xTBxJFuKTQS6qFcDx9XCu+bKqoSmJDZ8lwgwpJDAiBzIhxiAd66lypHX9cpOg5A7cKEW+FLdaBKQdNRcPHQK2O9QwFj/NKEeCJEufuD3OeV8MSbN2PCehMzbj7tXSww=="
    }
  }
}
```

### Get license field

```
/api/v1/license/fields/{field_name}
```

Example:

```
curl replicated:3000/api/v1/license/fields/expires_at
```

Response:

```json
{
  "name": "expires_at",
  "title": "Expiration",
  "description": "License Expiration",
  "value": "2023-05-30T00:00:00Z",
  "valueType": "String",
  "signature": {
    "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2MD0YBlIAZEs1zXpmvwLdfcoTsZMOj0lZbxkPN5dPhEPIVcQgrzfzwU5HIwQbwc2jwDrLBQS4hGOKdxOWXnBUNbztsHXMqlAYQsmAhspRLDhBiEoYpFV/8oaaAuNBrmRu/IVAW6ahB4KtP/ytruVdBup3gn1U/uPAl5lhzuBifaW+NDFfJxAXJrhdTxMBxzfdKa6dGmlGu7Ou/xqDU1bNF3AuWoP3C78GzSBQrD1ZPnu/d+nuEjtakKSX3EK6VUisNucm8/TFlEVKUuX7hex7uZ9Of+UgS1GutQXOhXzfMZ7u+0zHXvQ=="
  }
}
```

## Examples

This section provides some example use cases for the Replicated SDK APIs.

### Support Update Checks 

You can check for updates to the application by using the get application updates API. This is useful to inform customers about updates to the application. For example, a banner can display in your application when updates are available, encouraging users to update and providing update instructions to them.

To upgrade your application, users must log in to the Replicated registry and then perform a Helm upgrade. Consider the following example commands:

```
helm registry login registry.replicated.com --username alexp@replicated.com --password LICENSE_ID
```

```
helm upgrade echo-server oci://registry.replicated.com/alex-echo-server-helm/echo-server
```

The registry login command requires three components: the registry domain, the username, and the password.

The registry domain can be hardcoded for now, though this will be available programmatically once custom domains are fully supported.

The username and password are both available from the get license info API in the customerEmail and licenseID fields.

The install command requires five components: the release name, the release namespace, the registry domain, the app slug, and the channel slug.

Again, the registry domain can be hardcoded for now, though this will be available programmatically once custom domains are fully supported.

The other four components are available from the get application information API in the currentRelease.helmReleaseName, currentRelease.helmReleaseNamespace, appSlug, and currentRelease.channelSlug.

### Verify Licenses

You can check a customer’s license information with the `license` API. License entitlements can be checked with the `get license fields` and `get license field` APIs.

License information, including license fields, is kept up to date by the SDK to reflect changes to the license in real time. In your application, you can revoke access when a license expires, expose additional product functionality dynamically based on entitlement values, and more.

For example, although customers must have a valid license to log in to the registry and pull your chart, you can check the license expiration at runtime if you want to revoke access to the application when a license expires.

You can check the license expiration with the get license field API by setting `expires_at` as the license field path parameter. For example, /api/v1/license/fields/expires_at.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see Verify License Fields.