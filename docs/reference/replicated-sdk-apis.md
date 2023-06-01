# Replicated SDK API (Beta)

:::note
The Replicated SDK is Beta and is not recommended for production use.
:::

## Access the Replicated SDK API

The Replicated SDK provides an API that you can use to embed Replicated functionality and application information into your application.

Access the Replicated SDK API at `replicated:3000`.

Example:

```
curl replicated:3000/api/v1/license/info
```

To verify the location of the Replicated SDK API service, run `kubectl get service` and look for the appropriate service.

## app

### Get application information

List details about an application instance, including the app name, location of the Helm chart in the Replicated OCI registry, and details about the current application release that the instance is running. 

```
/api/v1/app/info
```

Response:

```
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

```
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

```
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

```
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

```
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

```
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