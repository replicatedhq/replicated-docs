# Replicated SDK APIs (Beta)

The Replicated SDK provides APIs that you can use to embed Replicated functionality into your Helm chart application. For more information about how to get started with the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

:::note
The Replicated SDK is Beta and is not recommended for production use.
:::

## Access the SDK APIs

The Replicated SDK APIs require the ID for a customer license created in the Replicated vendor portal to authenticate and initialize in an environment. For information about creating customer licenses, see [Creating and Managing Customers](/vendor/releases-creating-customer).

After the SDK is installed, the Replicated SDK API service is exposed at `replicated:3000`. To verify the location of the Replicated SDK API service, you can run `kubectl get service` in the appropriate namespace.

## app

### GET /app/info

List details about an application instance, including the app name, location of the Helm chart in the Replicated OCI registry, and details about the current application release that the instance is running. 

```
/api/v1/app/info
```

Response:

```json
{
  "appSlug": "my-app",
  "appName": "My App",
  "helmChartURL": "oci://registry.replicated.com/my-app/stable/my-helm-chart",
  "currentRelease": {
    "versionLabel": "0.1.72",
    "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
    "channelName": "Stable",
    "isRequired": false,
    "createdAt": "2023-05-28T16:31:21Z",
    "releaseNotes": "",
    "helmReleaseName": "helm-release",
    "helmReleaseRevision": 5,
    "helmReleaseNamespace": "my-helm-chart"
  }
}
```

### GET /app/updates

List details about the releases that are available to an application instance for upgrade, including the version label, created timestamp, and release notes.

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
    "releaseNotes": "Awesome new features!"
  }
]
```

### GET /app/history

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

### GET /license/info

List details about the license file that was used to install, including the license ID, type, the customer name, and the channel the customer is assigned.

```
/api/v1/license/info
```

Response:

```json
{
  "licenseID": "YiIXRTjiB7R...",
  "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
  "channelName": "Stable",
  "customerName": "Builders Plan Tester",
  "customerEmail": "username@example.com",
  "licenseType": "dev"
}
```

### GET /license/fields

List details about all the fields in the license file that was used to install, including the field names, descriptions, values, and signatures.

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

### GET /license/fields/{field_name}

List details about one of the fields in the license file that was used to install, including the field name, description, value, and signature.

```
/api/v1/license/fields/{field_name}
```

Example request:

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

## mock-data

### POST mock-data

POST mock data for use developing against the Replicated SDK in integration mode. Accepts a JSON request body to set the mock data. For information about integration mode, see [Using Integration Mode](/vendor/replicated-sdk-development).

```
/api/v1/mock-data
```

### GET mock-data

List the mock data JSON object that you are using to develop against the Replicated SDK in integration mode. For information about integration mode, see [Using Integration Mode](/vendor/replicated-sdk-development).

```
/api/v1/mock-data
```

### DELETE mock-data

Delete the mock data JSON object that you are using to develop against the Replicated SDK in integration mode. For information about integration mode, see [Using Integration Mode](/vendor/replicated-sdk-development).

```
/api/v1/mock-data
```

## Examples

This section provides example use cases for the Replicated SDK API.

### Support Update Checks in Your Admin Console 

You can check for updates to the application using the `api/v1/app/updates` endpoint. This is useful to inform customers about updates to the application. For example, you can display a banner in your application admin console when updates are available, encouraging users to update and providing update instructions.

To upgrade, your customers must first log in to the Replicated registry where they can pull your Helm chart, then they can run `helm upgrade`. You can use the SDK API endpoints to construct customer specific commands to provide in your application's admin console to make it easier for you users to upgrade.

To use the SDK APIs to check for available application updates and construct upgrade instructions for your users:

1. In your application admin console, call the `api/v1/app/updates` endpoint to check for available updates for the application instance. Use the response to display available upgrades for the customer in your admin console:

   ```bash 
   curl replicated:3000/api/v1/app/updates
   ```

   **Example response**:

    ```json
    [
      {
        "versionLabel": "0.1.15",
        "isRequired": false,
        "createdAt": "2023-05-12T15:48:45.000Z",
        "releaseNotes": "Awesome new features!"
      }
    ]
    ```

1. Construct the `helm registry login` command and display it in your admin console:

   **Example**:

    ```bash
    helm registry login registry.replicated.com --username alexp@replicated.com --password LICENSE_ID
    ```

    The `helm registry login` command requires the following: 

    * **Registry domain**: The domain for the registry where your Helm chart is pushed. The registry domain is either `replicated.registry.com` or a custom domain that you added.
    * **Customer email**: The customer email address is available from the `/api/v1/license/info` endpoint in the `customerEmail` field.
    * **Customer license ID**:The customer license ID from the `/api/v1/license/info` endpoint in the `licenseID` field.

1. Construct the `helm upgrade` command and display it in your admin console:

   **Example**:

    ```bash
    helm upgrade echo-server oci://registry.replicated.com/echo-server-helm/echo-server
    ```

    The upgrade command requires the following: 

    * **Release name**: The Helm release notes is available from the `/api/v1/app/info` endpoint in the `currentRelease.helmReleaseName` field.
    * **Release namespace**: The Helm release namespace is available from the `/api/v1/app/info` endpoint in the `currentRelease.helmReleaseNamespace` field.
    * **Registry domain**: The domain for the registry where your Helm chart is pushed. The registry domain is either `replicated.registry.com` or a custom domain that you added. 
    * **App slug**: The app slug is available from the `/api/v1/app/info` endpoint in the `appSlug` field. 
    * **Channel slug**: The channel slug is available from the `/api/v1/app/info` endpoint in the `currentRelease.channelSlug` field.