import Beta from "../partials/replicated-sdk/_beta.mdx"

# Using Development Mode

This topic describes how to use development mode with the Replicated SDK to test changes locally.

<Beta/>

## About Development Mode

You can use the Replicated SDK in development mode to develop locally without needing to make real changes in the Replicated vendor portal or in your environment. Development mode lets you provide mock data for certain Replicated SDK APIs in order to test specific features and scenarios.

To use development mode, you initialize the Replicated SDK using a valid development license created in the Replicated vendor portal and then provide the SDK with mock data. The following diagram demonstrates how the Replicated SDK uses the development license and mock data to run in development mode:

![architecture diagram of sdk development mode](/images/sdk-development-mode-diagram.png)

As shown in the diagram above, the Replicated SDK initializes with a developer license ID to get information about the application release and license entitlements. The SDK uses mock data that you POST as a JSON object with the `/api/v1/mock-data` API.

To use the Replicated SDK in development mode, complete the following procedures:
1. [Create a Development License](#license)
1. [Initialize the SDK With Your Development License](#initialize)
1. [Create and Provide Mock Data](#mock-data)

## Create a Development License {#license}

To create a development license:

1. In the vendor portal, click **Customers**. Click **Create customer**.

1. Complete the following fields:
    
    1. For **Customer name**, add a name for the customer.
    
    1. For **Assigned channel**, assign the customer to the channel that you use for testing.
    
    1. For **Customer type**, select **Development**.
    
    1. For **Customer email**, add the email address that you want to use for the developer license.

   ![create customer page in the vendor portal](/images/create-customer-development-mode.png)

   [View a larger version of this image](/images/create-customer-development-mode.png)

1. Click **Save Changes**.

1. Click **Download license** to download the license.

## Initialize the SDK With Your Development License {#initialize}

When the Replicated SDK is installed in a customer environment, the Replicated registry automatically injects customer-specific license information. When developing against the chart locally, you need to manually provide the license information to initialize the SDK in your development environment.

To provide license information to the SDK, you can either use a Helm chart or a container image, depending on your development environment.

### Initialize With a Helm Chart {#helm-initialize}

If your development environment supports Helm, you can deploy the SDK as a Helm chart

To initialize the SDK with a Helm chart:

1. Follow the steps in [Declare the SDK as a Dependency](replicated-sdk-using#declare-the-sdk-as-a-dependency) to add the Replicated SDK as a dependency and repackage your Helm chart. 
1. Deploy your Helm chart and the SDK together in your development environment:

   ```
   helm install CHART_NAME
   ```

### Initialize With a Container Image {#container-initialize}

If your development environment does not support Helm, create and apply a Kubernetes Deployment to deploy the SDK. To do this, copy the Deployment used by the SDK Helm chart and make some small changes so it works in your environment.

To create the SDK Deployment:

<!-- 1. Base64 encode the license that you created and downloaded as part of [Create a Development License](#license).

    **Example:**

    ```
    cat license.yaml | base64
    ``` -->

1. Go to the [replicated-sdk](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/templates/) repository in GitHub. Copy the following YAML files and paste them where you develop:
   
   * `replicated-deployment.yaml` 
   * `replicated-secret.yaml` 

1. In the Secret object, set the license environment variable to the ID of the development license that you created.

1. Deploy the SDK:

   ```
   kubectl apply -f PATH_TO_DEPLOYMENT_FILE
   ```
   Where `PATH_TO_DEPLOYMENT_FILE` is the location in your local directory where you saved the Deployment file.

## Create and Provide Mock Data {#mock-data}

In development mode, you provide mock data to the SDK so that you can test your changes in different scenarios. For example, if you are developing a page where users can check for updates, you can provide mock data to the `/api/v1/app/updates` API to create scenarios in which there are any number of releases available for upgrade, without having to promote releases in the vendor portal.

You provide mock data to the Replicated SDK as a JSON object. If you do not provide mock data for a particular API, that API functions normally.

:::note
The SDK license APIs always return real data because the SDK must be initialized with a valid license. In development mode, this data is provided from the development license that you created.
:::

### Create the JSON Object {#json}

Create a file with a JSON object like the following:

```json
{
"currentRelease": {
    "versionLabel": "1.0.0",
    "isRequired": false,
    "createdAt": "2023-05-23T21:10:57Z",
    "releaseNotes": "I'm glad this is deployed",
    "helmReleaseName": "alex-test",
    "helmReleaseRevision": 10,
    "helmReleaseNamespace": "testing"
},
"availableReleases": [
    {
    "versionLabel": "1.0.1",
    "releaseNotes": "A patch release is all",
    "isRequired": false,
    "createdAt": "2023-05-23T21:10:57Z",
    "helmReleaseNamespace": "testing"
    },
    {
    "versionLabel": "2.0.0",
    "releaseNotes": "A new major version!",
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
    "helmReleaseName": "alex-test",
    "helmReleaseRevision": 8,
    "helmReleaseNamespace": "testing"
    },
    {
    "versionLabel": "0.0.2",
    "createdAt": "2023-05-23T21:10:57Z",
    "releaseNotes": "The second patch release",
    "isRequired": false,
    "helmReleaseName": "alex-test",
    "helmReleaseRevision": 9,
    "helmReleaseNamespace": "testing"
    }
]
}
```

The following describes the fields in the JSON array above:

* The `currentRelease` field defines the currently deployed release of the application. The SDK uses this value to mock the get application information API.
* The `appSlug`, `appName`, `helmChartURL`, and `channelName` fields do not need to be provided in the mock since this data can be obtained from the provided development license.
* The `availableReleases` array defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the get application updates API.
* The `deployedReleases` array defines the previously deployed releases. This is used to mock the get application history API.

### Provide Mock Data {#provide-data}

You can provide mock data by sharing the JSON object you created at runtime or at the time of deployment.

#### POST Mock Data at Runtime

To provide mock data to the SDK at runtime:

1. Update the SDK to use the mock data by POSTing the JSON object you created to the SDK’s `/api/v1/mock-data` API.

    ```bash
    curl -d @mock.json -X POST replicated:3000/api/v1/mock-data
    ```

1. Test that the SDK is using the mock data:

    ```bash
    curl replicated:3000/api/v1/mock-data
    ```

1. Call the APIs from your application to use the mock data. Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```

#### Pass Mock Data at Deployment

To provide mock data to the SDK at deployment:

1. Deploy your Helm chart and pass the mock data to the `replicated.dev.mockData` value.

    **Example:**

    ```yaml
    replicated:
      dev:
        mockData: '{"currentRelease":{"versionLabel":"1.0.0","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","releaseNotes":"I'm glad this is deployed","helmReleaseName":"alex-test","helmReleaseRevision":10,"helmReleaseNamespace":"testing"},"availableReleases":[{"versionLabel":"1.0.1","releaseNotes":"A patch release is all","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseNamespace":"testing"},{"versionLabel":"2.0.0","releaseNotes":"A new major version!","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseName":"please no"}],"deployedReleases":[{"versionLabel":"0.0.1","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The first patch version","isRequired":true,"helmReleaseName":"alex-test","helmReleaseRevision":8,"helmReleaseNamespace":"testing"},{"versionLabel":"0.0.2","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The second patch release","isRequired":false,"helmReleaseName":"alex-test","helmReleaseRevision":9,"helmReleaseNamespace":"testing"}]}'
    ```

1. Call the APIs from your application to use the mock data. Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```
