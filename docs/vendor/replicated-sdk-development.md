# Developing Against the SDK API (Beta)

This topic describes how to enable integration mode for the Replicated SDK to develop and test changes locally.

## About Integration Mode

You can use the Replicated SDK in integration mode to develop locally without needing to make real changes in the Replicated vendor portal or in your environment. Integration mode lets you provide mock data for the Replicated SDK API `app` endpoints in order to test specific features and scenarios. For more information, see [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

To use integration mode, you initialize the Replicated SDK using the ID of a valid development license created in the Replicated vendor portal and then provide the SDK with mock data. 

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

1. Get the license ID:

   1. On the **Customer details** page for the customer you created, click **Helm install instructions**.

      ![Helm install instructions button on the customer details page](/images/helm-install-instructions-button.png)

   1. In the **Helm install instructions** dialog, in the `helm registry login` command, copy the license ID value that is provided with the `--password` flag.

      ![Red box surrounding the password value in the Helm install instructions dialog](/images/license-id-helm-install-password.png)

## Initialize the SDK {#initialize}

In production use, customer-specific information like the license and the current release on the assigned channel is injected into the chart by the Replicated registry when the chart is pulled. For more information about the values that the Replicated registry automatically injects, see [Replicated Helm Values](/vendor/helm-install#replicated-values) in _About Distributing with Helm (Beta)_.

When developing against the chart locally in integration mode, you can provide the license ID to initialize the SDK instead of reproducing all the Helm values that the registry normally injects.

To initialize the SDK for use in integration mode:

1. Add the SDK Helm chart as a dependency in your application Helm chart. See [Using the Replicated SDK with Your Application (Beta)](replicated-sdk-using).

1. In the values file for your Helm chart, paste the ID of your development license in the `replicated.integration.licenseID` field:

  ```yaml
  # Helm chart values.yaml file
  replicated:
    integration:
      licenseID: DEV_LICENSE_ID
  ```         

## Create and Provide Mock Data {#mock-data}

In integration mode, you provide mock data to the SDK so that you can test your changes in different scenarios. For example, if you are developing a page where users can check for updates, you can provide mock data to the `/api/v1/app/updates` API endpoint to create scenarios in which there are any number of releases available for upgrade, without having to promote releases in the vendor portal.

### About Mock Data

The mock data object that you create contains fields where you can add mock values for a current release, available releases, and previously deployed releases:

* **`currentRelease`**: Defines the currently deployed release of the application. The SDK uses this value to mock the `/api/v1/app/info` API endpoint. The `appSlug`, `appName`, `helmChartURL`, and `channelName` fields do not need to be provided in the mock data because this data can be obtained from the provided development license.
* **`availableReleases`**: Defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the `/api/v1/app/updates` API endpoint.
* **`deployedReleases`**: Defines the previously deployed releases. This is used to mock the `/api/v1/app/history` API endpoint.

:::note
It is not required to provide mock data in each of these fields. If you do not provide mock data for a particular API, that API functions normally.
:::

You can create mock data in JSON or YAML format:
* [JSON Example](#json-example)
* [YAML Example](#yaml-example)

#### JSON Example

JSON format is supported for POSTing mock data to the SDK API `mock-data` endpoint during runtime. See [Provide Mock Data at Runtime](#provide-runtime).

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

#### YAML Example

YAML format is supported for providing mock data in the Helm chart values file before deployment. See [Provide Mock Data at Deployment](#provide-deployment).

The example below shows mock data in YAML. This example includes all the available fields for the mock data that you can provide to the SDK in development mode.

```yaml
helmChartURL: oci://registry.replicated.com/dev-app/dev-channel/dev-parent-chart
currentRelease:
  versionLabel: 0.1.3
  releaseNotes: "release notes 0.1.3"
  createdAt: 2023-05-23T20:58:07Z
  deployedAt: 2023-05-23T21:58:07Z
  helmReleaseName: dev-parent-chart
  helmReleaseRevision: 3
  helmReleaseNamespace: default
deployedReleases:
- versionLabel: 0.1.1
  releaseNotes: "release notes 0.1.1"
  createdAt: 2023-05-21T20:58:07Z
  deployedAt: 2023-05-21T21:58:07Z
  helmReleaseName: dev-parent-chart
  helmReleaseRevision: 1
  helmReleaseNamespace: default
- versionLabel: 0.1.2
  releaseNotes: "release notes 0.1.2"
  createdAt: 2023-05-22T20:58:07Z
  deployedAt: 2023-05-22T21:58:07Z
  helmReleaseName: dev-parent-chart
  helmReleaseRevision: 2
  helmReleaseNamespace: default
- versionLabel: 0.1.3
  releaseNotes: "release notes 0.1.3"
  createdAt: 2023-05-23T20:58:07Z
  deployedAt: 2023-05-23T21:58:07Z
  helmReleaseName: dev-parent-chart
  helmReleaseRevision: 3
  helmReleaseNamespace: default
availableReleases:
- versionLabel: 0.1.4
  releaseNotes: "release notes 0.1.4"
  createdAt: 2023-05-24T20:58:07Z
  deployedAt: 2023-05-24T21:58:07Z
- versionLabel: 0.1.5
  releaseNotes: "release notes 0.1.5"
  createdAt: 2023-06-01T20:58:07Z
  deployedAt: 2023-06-01T21:58:07Z
```

### Provide Mock Data at Runtime {#provide-runtime}

You can provide mock data at runtime by creating data in JSON and then POSTing the JSON data object to the `/api/v1/mock-data` endpoint. 

To provide mock data to the SDK at runtime:

1. Create mock data as a JSON object.

1. Deploy your Helm chart.

1. Update the SDK to use the mock data by POSTing the JSON object you created to the `/api/v1/mock-data` endpoint:

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

### Provide Mock Data at Deployment {#provide-deployment}

You can provide mock data before deploying your application by adding mock data in YAML to the Helm chart values file.

To provide mock data to the SDK at deployment:

1. In the `replicated.integration.mockData` field of your Helm chart values file, add your mock data in YAML.

    **Example:**

    ```yaml
    replicated:
      integration:
        mockData:
          helmChartURL: oci://registry.replicated.com/dev-app/dev-channel/dev-parent-chart
          currentRelease:
            versionLabel: 0.1.3
            releaseNotes: "release notes 0.1.3"
            createdAt: 2023-05-23T20:58:07Z
            deployedAt: 2023-05-23T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 3
            helmReleaseNamespace: default
          deployedReleases:
          - versionLabel: 0.1.1
            releaseNotes: "release notes 0.1.1"
            createdAt: 2023-05-21T20:58:07Z
            deployedAt: 2023-05-21T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 1
            helmReleaseNamespace: default
          - versionLabel: 0.1.2
            releaseNotes: "release notes 0.1.2"
            createdAt: 2023-05-22T20:58:07Z
            deployedAt: 2023-05-22T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 2
            helmReleaseNamespace: default
          - versionLabel: 0.1.3
            releaseNotes: "release notes 0.1.3"
            createdAt: 2023-05-23T20:58:07Z
            deployedAt: 2023-05-23T21:58:07Z
            helmReleaseName: dev-parent-chart
            helmReleaseRevision: 3
            helmReleaseNamespace: default
          availableReleases:
          - versionLabel: 0.1.4
            releaseNotes: "release notes 0.1.4"
            createdAt: 2023-05-24T20:58:07Z
            deployedAt: 2023-05-24T21:58:07Z
          - versionLabel: 0.1.5
            releaseNotes: "release notes 0.1.5"
            createdAt: 2023-06-01T20:58:07Z
            deployedAt: 2023-06-01T21:58:07Z
          ...
    ```

1. Deploy your Helm chart.

1. Make requests to the `app` endpoints the SDK API from your application to use the mock data. See [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Beta)_.

1. (Optional) Repeat the steps above to continue iterating.

   :::note
   A POST request to the `/mock-data` endpoint overwrites the entire data object. To update a single piece of mock data, you have to POST the entire mock data object.
   :::

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```
