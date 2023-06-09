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

## Limitation

Development mode has the following limitation:

You cannot provide mock data to test the `/license` APIs because the Replicated SDK requires a valid license to initialize. The `/license` APIs will always return data from the development license that you use to initialize.

## Create a Development License {#license}

To use development mode, you first need to create a development license that you can use to initialize the SDK.

To create a development license:

1. In the vendor portal, click **Customers**. Click **Create customer**.

1. Complete the following fields:
    
    1. For **Customer name**, add a name for the customer.
    
    1. For **Assigned channel**, assign the customer to the channel that you use for testing. For example, Unstable.
    
    1. For **Customer type**, select **Development**.
    
    1. For **Customer email**, add the email address that you want to use for the developer license.

   ![create customer page in the vendor portal](/images/create-customer-development-mode.png)

   [View a larger version of this image](/images/create-customer-development-mode.png)

1. (Optional) Add entitlements for the development license, including an expiration date or any custom entitlements.

1. Click **Save Changes**.

1. Click **Download license**.

1. Open the license file. Copy the value of the `licenseID` field.

Continue to [Initialize the SDK With Your Development License](#initialize) to initialize the SDK in development mode with the development license ID.

## Initialize the SDK With Your Development License {#initialize}

When the Replicated SDK is installed in a customer environment, the Replicated registry automatically injects customer-specific license information. When developing against the chart locally, you need to manually provide the license information to initialize the SDK in your development environment.

To provide license information to the SDK, you can either use a Helm chart or a container image, depending on your development environment.

### Initialize With Helm {#helm-initialize}

If your development environment supports Helm, you can deploy the SDK as a Helm chart.

To initialize the SDK by deploying with Helm:

1. Follow the steps in [Declare the SDK as a Dependency](replicated-sdk-using#declare-the-sdk-as-a-dependency) to add the Replicated SDK as a dependency in your Helm chart, package the chart, and promote a release in the vendor portal.

1. Pull your Helm chart from the Replicated registry, using the development license that you created to authenticate:

    ```bash
    helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
    ```

    Replace:
    * `EMAIL_ADDRESS` with the email address associated with the development license.
    * `LICENSE_ID` with the ID for the development license.

1. Follow the steps in [Install](replicated-sdk-installing#install) to install your Helm chart and the SDK.

    **Example**:

    ```bash
    helm install my-helm-release oci://registry.replicated.com/my-app/unstable/my-helm-chart
    ```

### Initialize With a Container Image {#container-initialize}

If your development environment does not support Helm, create and apply a Kubernetes Deployment to deploy the SDK. To do this, copy the Deployment used by the SDK Helm chart and make some small changes so that it works in your environment.

To initialize by deploying the SDK as a Kubernetes Deployment:

1. Go to the [replicated-sdk](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/templates/) repository in GitHub. Copy the following YAML files and paste them where you develop:
   
   * `replicated-deployment.yaml` 
   * `replicated-secret.yaml` 

1. In the Secret object, set the value of the `REPLICATED_LICENSE_ID` environment variable to the ID of the development license that you created. For example:

   ```yaml
   REPLICATED_LICENSE_ID: 6CYEzsYZqJP8k...
   ```

1. Deploy the SDK:

   ```
   kubectl apply -f PATH_TO_DEPLOYMENT_FILE
   ```
   Replace `PATH_TO_DEPLOYMENT_FILE` with the path to the Deployment file that you saved in your local directory.

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
        licenseID: 'MY_LICENSE_ID'
        mockData: '{"currentRelease":{"versionLabel":"1.0.0","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","releaseNotes":"I'm glad this is deployed","helmReleaseName":"alex-test","helmReleaseRevision":10,"helmReleaseNamespace":"testing"},"availableReleases":[{"versionLabel":"1.0.1","releaseNotes":"A patch release is all","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseNamespace":"testing"},{"versionLabel":"2.0.0","releaseNotes":"A new major version!","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseName":"please no"}],"deployedReleases":[{"versionLabel":"0.0.1","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The first patch version","isRequired":true,"helmReleaseName":"alex-test","helmReleaseRevision":8,"helmReleaseNamespace":"testing"},{"versionLabel":"0.0.2","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The second patch release","isRequired":false,"helmReleaseName":"alex-test","helmReleaseRevision":9,"helmReleaseNamespace":"testing"}]}'
    ```

1. Call the APIs from your application to use the mock data. Repeat the steps above to continue iterating.

1. (Optional) Stop the SDK from using mock data:

    ```bash
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```
