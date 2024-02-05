# Replicated SDK API (Beta)

The Replicated SDK provides an API that you can use to embed Replicated functionality in your Helm chart application.

For example, if your application includes a UI where users manage their application instance, then you can use the `/api/v1/app/updates` endpoint to include messages in the UI that encourage users to upgrade when new versions are available. You could also revoke access to the application during runtime when a license expires using the `/api/v1/license/fields` endpoint.

For more information about how to get started with the Replicated SDK, see [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview).

## Access the SDK API

The Replicated SDK API is available after the Replicated SDK is installed and initialized in a cluster. For information about installing the SDK, see [Installing with Helm](/vendor/install-with-helm).

After the SDK is installed, the Replicated SDK API service is exposed at `replicated:3000`. To verify where the Replicated SDK API service is exposed, you can run `kubectl get service -A`.

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
  "appStatus": "ready",
  "helmChartURL": "oci://registry.replicated.com/my-app/beta/my-helm-chart",
  "currentRelease": {
    "versionLabel": "0.1.72",
    "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
    "channelName": "Beta",
    "createdAt": "2023-05-28T16:31:21Z",
    "releaseNotes": "",
    "helmReleaseName": "my-helm-chart",
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
      "createdAt": "2023-05-12T17:43:51Z",
      "releaseNotes": "",
      "helmReleaseName": "echo-server",
      "helmReleaseRevision": 2,
      "helmReleaseNamespace": "echo-server-helm"
    }
  ]
}
```

### POST /app/custom-metrics

Send custom application metrics. For more information and examples see [Configuring Custom Metrics](/vendor/custom-metrics)

## license

### GET /license/info

List details about the license that was used to install, including the license ID, type, the customer name, and the channel the customer is assigned.

```
/api/v1/license/info
```

Response:

```json
{
  "licenseID": "YiIXRTjiB7R...",
  "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
  "channelName": "Stable",
  "customerName": "Example Customer",
  "customerEmail": "username@example.com",
  "licenseType": "dev"
}
```

### GET /license/fields

List details about all the fields in the license that was used to install, including the field names, descriptions, values, and signatures.

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

### GET /license/fields/\{field_name\}

List details about one of the fields in the license that was used to install, including the field name, description, value, and signature.

```
/api/v1/license/fields/\{field_name\}
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
## Examples

This section provides example use cases for the Replicated SDK API.

### Support Update Checks in Your Application

The `api/v1/app/updates` endpoint returns details about new releases that are available to an instance for upgrade. You could use the `api/v1/app/updates` endpoint to allow your users to easily check for available updates from your application.

Additionally, to make it easier for users to upgrade to new versions of your application, you could provide customer-specific upgrade instructions in your application by injecting values returned by the `/api/v1/license/info` and `/api/vi/app/info` endpoints. 

The following examples show how you could include a page in your application that lists available updates and also provides customer-specific upgrade instructions:  

![a user interface showing a list of available releases](/images/slackernews-update-page.png)
[View a larger version of this image](/images/slackernews-update-page.png)

![user-specific application upgrade instructions displayed in a dialog](/images/slackernews-update-instructions.png)
[View a larger version of this image](/images/slackernews-update-instructions.png)

To use the SDK API to check for available application updates and provide customer-specific upgrade instructions:

1. From your application, call the `api/v1/app/updates` endpoint to return available updates for the application instance. Use the response to display available upgrades for the customer.

   ```bash 
   curl replicated:3000/api/v1/app/updates
   ```

   **Example response**:

    ```json
    [
      {
        "versionLabel": "0.1.15",
        "createdAt": "2023-05-12T15:48:45.000Z",
        "releaseNotes": "Awesome new features!"
      }
    ]
    ```

1. For each available release, add logic that displays the required upgrade commands with customer-specific values. To upgrade, users must first run `helm registry login` to authenticate to the Replicated registry. Then, they can run `helm upgrade`:

    1. Inject customer-specific values into the `helm registry login` command:

      ```bash
      helm registry login REGISTRY_DOMAIN --username EMAIL --password LICENSE_ID
      ```

      The `helm registry login` command requires the following components: 

        * `REGISTRY_DOMAIN`: The domain for the registry where your Helm chart is pushed. The registry domain is either `replicated.registry.com` or a custom domain that you added.
        
        * `EMAIL`: The customer email address is available from the `/api/v1/license/info` endpoint in the `customerEmail` field.
        
        * `LICENSE_ID` The customer license ID is available from the `/api/v1/license/info` endpoint in the `licenseID` field.

    1. Inject customer-specific values into the `helm upgrade` command:

        ```bash
        helm upgrade -n NAMESPACE RELEASE_NAME HELM_CHART_URL
        ```

       The following describes where the values in the `helm upgrade` command are available:

        * `NAMESPACE`: The release namespace is available from the `/api/v1/app/info` endpoint in the `currentRelease.helmReleaseNamespace`
        
        * `RELEASE_NAME`: The release name is available from the `/api/v1/app/info` endpoint in the `currentRelease.helmReleaseName` field.
        
        * `HELM_CHART_URL`: The URL of the Helm chart at the OCI registry is available from the `/api/v1/app/info` endpoint in the `helmChartURL` field.

### Revoke Access at Runtime When a License Expires        

You can use the Replicated SDK API `/api/v1/license/fields/{field_name}` endpoint to revoke a customer's access to your application during runtime when their license expires.

To revoke access to your application when a license expires:

1. In the vendor portal, click **Customers**. Select the target customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer.

1. Under **Expiration policy**:

   1. Enable **Customer's license has an expiration date**.

   1. For **When does this customer expire?**, use the calendar to set an expiration date for the license.

  <img alt="expiration policy field in the customer details page" src="/images/customer-expiration-policy.png" width="500px"/>

  [View a larger version of this image](/images/customer-expiration-policy.png)

1. Install the Replicated SDK as a standalone component in your cluster. This is called _integration mode_. Installing in integration mode allows you to develop locally against the SDK API without needing to create releases for your application in the vendor portal. See [Developing Against the SDK API](/vendor/replicated-sdk-development).

1. In your application, use the `/api/v1/license/fields/expires_at` endpoint to get the `expires_at` field that you defined in the previous step.

    **Example:**

    ```bash
    curl replicated:3000/api/v1/license/fields/expires_at
    ```

    ```json
    {
      "name": "expires_at",
      "title": "Expiration",
      "description": "License Expiration",
      "value": "2023-05-30T00:00:00Z",
      "valueType": "String",
      "signature": {
        "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2M..."
      }
    }
    ```

1. Add logic to your application to revoke access if the current date and time is more recent than the expiration date of the license.

1. (Recommended) Use signature verification in your application to ensure the integrity of the license field. See [Verifying License Field Signatures](/vendor/licenses-verify-fields-sdk-api).