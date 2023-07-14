# Creating Mock Data for Integration Mode

This topic describes how to create a custom mock data object to test changes with the Replicated SDK in integration mode.

## About Mock Data

In integration mode, you can provide custom mock data to the SDK so that you can test your changes in different scenarios. For example, if you are developing a page where users can check for updates, you can provide mock data to the `/api/v1/app/updates` API endpoint to create scenarios in which there are any number of releases available for upgrade, without having to promote releases in the vendor portal.

The following describes the supported fields for the mock data object:

* **`currentRelease`**: Defines the currently deployed release of the application. The SDK uses this value to mock the `/api/v1/app/info` API endpoint. The `appSlug`, `appName`, `helmChartURL`, and `channelName` fields do not need to be provided in the mock data because this data can be obtained from the provided development license.
* **`availableReleases`**: Defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the `/api/v1/app/updates` API endpoint.
* **`deployedReleases`**: Defines the previously deployed releases. This is used to mock the `/api/v1/app/history` API endpoint.

The example below shows a JSON object with mock data. This example includes all the available fields for the mock data that you can provide to the SDK in development mode.

```json
{
    "helmChartURL": "oci://charts.mycompany.com/appslug/channelslug/chartname",
    "currentRelease": {
        "versionLabel": "1.0.0",
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
            "createdAt": "2023-05-23T21:10:57Z",
            "helmReleaseNamespace": "testing"
        },
        {
            "versionLabel": "2.0.0",
            "releaseNotes": "New major version",
            "createdAt": "2023-05-23T21:10:57Z",
            "helmReleaseName": "release-name"
        }
    ],
    "deployedReleases": [
        {
            "versionLabel": "0.0.1",
            "createdAt": "2023-05-23T21:10:57Z",
            "releaseNotes": "The first patch version",
            "helmReleaseName": "sdk-test",
            "helmReleaseRevision": 8,
            "helmReleaseNamespace": "testing"
        },
        {
            "versionLabel": "0.0.2",
            "createdAt": "2023-05-23T21:10:57Z",
            "releaseNotes": "The second patch release",
            "helmReleaseName": "sdk-test",
            "helmReleaseRevision": 9,
            "helmReleaseNamespace": "testing"
        }
    ]
}
```

## Provide Mock Data

You can provide mock data at runtime by creating data in JSON and then POSTing the JSON data object to the `/api/v1/mock-data` endpoint. 

To provide mock data to the SDK at runtime:

1. Create mock data as a JSON object.

   :::note
   It is not required to provide mock data in each of the supported fields. If you do not provide mock data for a particular API, that API functions normally.
   :::

1. Update the SDK to use the mock data by POSTing the JSON object you created to the `/api/v1/mock-data` endpoint:

    ```bash
    curl -d @mock.json -X POST replicated:3000/api/v1/mock-data
    ```

1. Test that the SDK is using the mock data:

    ```bash
    curl replicated:3000/api/v1/mock-data
    ```

1. Make requests to the `app` endpoints the SDK API from your application to use the mock data. See [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

1. Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```