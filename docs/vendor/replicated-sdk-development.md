# Using Development Mode

This topic describes how to use development mode with the Replicated SDK to iterate on and test changes locally.

## About Development Mode

Replicated SDK has a development mode that helps you develop locally without needing to make real changes in the vendor portal or in your environment to test particular features and scenarios.

Development mode lets you provide mock data for certain SDK APIs in order to simulate the scenarios you want to test.

To develop against the SDK, you need to initialize the SDK with a valid development license from the vendor portal.

## Create a Development License

The SDK runs in development mode when it is initialized with a development license.

To create a development license:

1. Go to the vendor portal and select Customer from the left menu. Click + Create customer.

1. When filling in the required fields. assign the customer to whichever channel you want to use for your testing.

1. Select Development for Customer type.

1. Click Save Changes.

1. Click Download license to download the license.

## Initialize the SDK with Your Development License

In production use, the license information is injected by the Replicated registry when the chart is pulled. When developing against the chart locally, you need to provide this information yourself to initialize the SDK.

There are different ways to do this depending on your development environment.

### Initializing with a Helm Chart

If your development environment supports Helm, you can deploy the SDK as a Helm chart. You should first follow the steps in Declaring the SDK as a Dependency. Then you can deploy your Helm chart and the SDK together in your development environment.

### Initializing with a Container Image

Some development environments do not support Helm. In this case, developers will create and apply a Kubernetes Deployment to deploy the SDK.

To do this, copy the Deployment used by the SDK Helm chart and make some small changes so it works in your environment.

To create the SDK Deployment:

1. Base64 encode the license you created and downloaded.

    **Example:**

    ```
    cat license.yaml | base64
    ```

1. Copy the Deployment YAML file and the associated secret from the SDK repository. Paste the Deployment YAML file where you develop.

1. Set the license environment variable.

1. Deploy the SDK.

## Providing Mock Data

To use development mode, you provide mock data to the SDK so that you can test your changes in different scenarios.

In development mode, the /license APIs always return real data because the SDK must be initialized with a valid license.

Other APIs, like the /app APIs, can be mocked to aid in the development of particular scenarios. For example, if you are developing a page where users can check for updates, you can mock the /api/v1/app/updates API to create scenarios in which there are any number of releases available for upgrade, without having to promote releases in the vendor portal.

You can provide mock data runtime or at the time of deployment.

### Providing Mock Data at Runtime

Mock data is provided to the SDK as a JSON object. If mock data is not provided for a particular API, that API functions normally.

The currentRelease defines the currently deployed release. This is used to mock the get application information API. The appSlug, appName, helmChartURL, and channelName fields do not need to be provided in the mock since this data can be obtained from the provided development license.

The availableReleases array defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the get application updates API.

The deployedReleases array defines the previously deployed releases. This is used to mock the get application history API.

To provide mock data to the SDK at runtime:

1. Create a file with a JSON object like the following:

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

1. Update the SDK to use the mock data by POSTing the data to the SDK’s /api/v1/mock-data API.

    ```
    curl -d @mock.json -X POST replicated:3000/api/v1/mock-data
    ```

1. Test that the SDK is using the mock data:

    ```
    curl replicated:3000/api/v1/mock-data
    ```

1. Call the SDK APIs from your application to use the mock data.

1. (Optional) Repeat the above steps to create and use different mock data.

1. (Optional) Stop the SDK from using mock data:

    ```
    curl -X DELETE replicated:3000/api/v1/mock-data
    ```

### Providing Mock Data at Deployment

Mock data can also be provided to the SDK at deployment time.

To provide mock data to the SDK Helm chart at deployment:

1. Create a JSON object like the following:

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

    The currentRelease defines the currently deployed release. This is used to mock the get application information API. The appSlug, appName, helmChartURL, and channelName fields do not need to be provided in the mock since this data can be obtained from the provided development license.

    The availableReleases array defines the releases promoted to the channel after the current release. In other words, the releases that are available for update. This is used to mock the get application updates API.

    The deployedReleases array defines the previously deployed releases. This is used to mock the get application history API.

1. Deploy your Helm chart and pass the mock data to the replicated.dev.mockData value.

    **Example:**

    ```
    replicated:
    dev:
        mockData: '{"currentRelease":{"versionLabel":"1.0.0","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","releaseNotes":"I'm glad this is deployed","helmReleaseName":"alex-test","helmReleaseRevision":10,"helmReleaseNamespace":"testing"},"availableReleases":[{"versionLabel":"1.0.1","releaseNotes":"A patch release is all","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseNamespace":"testing"},{"versionLabel":"2.0.0","releaseNotes":"A new major version!","isRequired":false,"createdAt":"2023-05-23T21:10:57Z","helmReleaseName":"please no"}],"deployedReleases":[{"versionLabel":"0.0.1","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The first patch version","isRequired":true,"helmReleaseName":"alex-test","helmReleaseRevision":8,"helmReleaseNamespace":"testing"},{"versionLabel":"0.0.2","createdAt":"2023-05-23T21:10:57Z","releaseNotes":"The second patch release","isRequired":false,"helmReleaseName":"alex-test","helmReleaseRevision":9,"helmReleaseNamespace":"testing"}]}'
    ```

1. Call the SDK APIs from your application to use the mock data.
