import Beta from "../partials/replicated-sdk/_beta.mdx"

# Developing with the SDK API in Integration Mode (Beta)

This topic describes how to use integration mode with the Replicated SDK to test changes locally.

<Beta/>

## About Development Mode

You can use the Replicated SDK in integration mode to develop locally without needing to make real changes in the Replicated vendor portal or in your environment. Integration mode lets you provide mock data for the Replicated SDK API `app` endpoints in order to test specific features and scenarios. For more information, see [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

To use integration mode, you initialize the Replicated SDK using a valid development license created in the Replicated vendor portal and then provide the SDK with mock data. 

To use the Replicated SDK in integration mode, complete the following procedures:
1. [Create a Development License](#license)
1. [Initialize the SDK](#initialize)
1. [Create and Provide Mock Data](#mock-data)

## Limitation

You cannot provide mock data to test the `license` API endpoints because the Replicated SDK requires a valid license to initialize. The `license` endpoints will always return data from the development license that you use to initialize. To test license field values with the API, you can provide the values in the development license that you create. See [Create a Development License](#license) below.

## Create a Development License {#license}

To use integration mode, you first need to create a development license that you can use to initialize the SDK. When you create the development license, you can add values to any license fields that you want to use in testing.

For information about development licenses, see [About Customer License Types](licenses-about-types).

To create a development license:

1. In the vendor portal, go to **Customers** and click **Create customer**.

1. Complete the following fields:
    
    1. For **Customer name**, add a name for the customer.
    
    1. For **Assigned channel**, assign the customer to the channel that you use for testing. For example, Unstable.
    
    1. For **Customer type**, select **Development**.
    
    1. For **Customer email**, add the email address that you want to use for the license.

   ![create customer page in the vendor portal](/images/create-customer-development-mode.png)
   [View a larger version of this image](/images/create-customer-development-mode.png)

1. (Optional) Add any license field values that you want to use for testing:

   1. For **Expiration policy**, you can add an expiration date for the license. 

   1. For **Custom fields**, you can add values for any custom license fields in your application. For information about how to create custom license fields, see [Managing Custom License Fields](/vendor/licenses-adding-custom-fields).

1. Click **Save Changes**.

1. Click **Download license**.

1. Open the license file and copy the value of the `licenseID` field.

## Initialize the SDK {#initialize}

In production use, customer-specific information like the license and the current release on the assigned channel is injected into the chart by the Replicated registry when the chart is pulled. For more information about the values that the Replicated registry automatically injects, see [Replicated Helm Values](/vendor/helm-install#replicated-values) in _About Distributing with Helm (Beta)_.

When developing against the chart locally in integration mode, you can provide the license ID to initialize the SDK instead of reproducing all the Helm values that the registry normally injects.

To initialize the SDK for use in integration mode:

1. In the [SDK Helm chart](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml.tmpl), open the `values.yaml` file.

1. Paste the ID from your development license in the `integration.licenseID` field:

    ```yaml
     # Replicated SDK values.yaml file
     integration:
       licenseID: DEV_LICENSE_ID
    ```

1. Add the SDK Helm chart as a dependency in your application Helm chart.          

## Create and Provide Mock Data {#mock-data}

In development mode, you provide mock data to the SDK so that you can test your changes in different scenarios. For example, if you are developing a page where users can check for updates, you can provide mock data to the `/api/v1/app/updates` API endpoint to create scenarios in which there are any number of releases available for upgrade, without having to promote releases in the vendor portal.

You provide mock data to the Replicated SDK as a JSON object.

### Create the JSON Object {#json}

You provide data to the SDK in development mode by creating a JSON object. The JSON object contains fields where you can add mock values for a current release, available releases, and previously deployed releases:

* **`currentRelease`**: The `currentRelease` field defines the currently deployed release of the application. The SDK uses this value to mock the `/api/v1/app/info` API endpoint. The `appSlug`, `appName`, `helmChartURL`, and `channelName` fields do not need to be provided in the mock since this data can be obtained from the provided development license.
* **`availableReleases`**: The `availableReleases` array defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the `/api/v1/app/updates` API endpoint.
* **`deployedReleases`**: The `deployedReleases` array defines the previously deployed releases. This is used to mock the `/api/v1/app/history` API endpoint.

It is not required to provide mock data in each of these fields. If you do not provide mock data for a particular API, that API functions normally.

The example below shows a JSON object with mock data. This example includes all the available fields for the mock data that you can provide to the SDK in development mode.

```json
{
"currentRelease": {
    "versionLabel": "1.0.0",
    "isRequired": false,
    "createdAt": "2023-05-23T21:10:57Z",
    "releaseNotes": "First release!",
    "helmReleaseName": "sdk-test",
    "helmReleaseRevision": 10,
    "helmReleaseNamespace": "testing"
},
"availableReleases": [
    {
    "versionLabel": "1.0.1",
    "releaseNotes": "New patch version",
    "isRequired": false,
    "createdAt": "2023-05-23T21:10:57Z",
    "helmReleaseNamespace": "testing"
    },
    {
    "versionLabel": "2.0.0",
    "releaseNotes": "New major version",
    "isRequired": false,
    "createdAt": "2023-05-23T21:10:57Z",
    "helmReleaseName": "please no"
    }
],
"deployedReleases": [
    {
    "versionLabel": "0.0.1",
    "createdAt": "2023-05-23T21:10:57Z",
    "releaseNotes": "The first patch version",
    "isRequired": true,
    "helmReleaseName": "sdk-test",
    "helmReleaseRevision": 8,
    "helmReleaseNamespace": "testing"
    },
    {
    "versionLabel": "0.0.2",
    "createdAt": "2023-05-23T21:10:57Z",
    "releaseNotes": "The second patch release",
    "isRequired": false,
    "helmReleaseName": "sdk-test",
    "helmReleaseRevision": 9,
    "helmReleaseNamespace": "testing"
    }
  ]
}
```

### Provide Mock Data to the SDK {#provide-data}

After you create a JSON object with the mock data that you want to test, you can share the JSON object with the SDK at runtime or at the time of deployment.

#### POST Mock Data at Runtime

To provide mock data to the SDK at runtime:

1. Deploy your Helm chart.

1. Update the SDK to use the mock data by POSTing the JSON object you created to the SDK’s `/api/v1/mock-data` API:

    ```bash
    curl -d @mock.json -X POST replicated:3000/api/v1/mock-data
    ```

1. Test that the SDK is using the mock data:

    ```bash
    curl replicated:3000/api/v1/mock-data
    ```

1. Make requests to the `app` endpoints the SDK API from your application to use the mock data. See [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

1. (Optional) Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```

#### Pass Mock Data at Deployment

To provide mock data to the SDK at deployment:

1. In the `replicated.integration.mockData` field of your Helm chart values file, add your mock data.

    **Example:**

    ```yaml
    replicated:
        integration:
        mockData:
            helmChartURL: oci://registry.replicated.com/dev-app/dev-channel/dev-parent-chart
            currentRelease:
            versionLabel: 0.1.3
            isRequired: false
            releaseNotes: "release notes 0.1.3"
            createdAt: 2023-05-23T20:58:07Z
            deployedAt: 2023-05-23T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 3
            helmReleaseNamespace: default
            deployedReleases:
            - versionLabel: 0.1.1
            isRequired: false
            releaseNotes: "release notes 0.1.1"
            createdAt: 2023-05-21T20:58:07Z
            deployedAt: 2023-05-21T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 1
            helmReleaseNamespace: default
    ```

1. Deploy your Helm chart.

1. Make requests to the `app` endpoints the SDK API from your application to use the mock data. See [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

1. (Optional) Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```
