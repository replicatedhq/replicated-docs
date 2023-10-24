# Configuring Custom Metrics (Beta)

This topic describes how to configure an application to send custom metrics to the Replicated vendor portal.

:::note
The custom metrics feature is Beta and is subject to change. To access this feature, open a [feature request](https://vendor.replicated.com/support).
:::

## Overview

In addition to the built-in insights displayed in the vendor portal by default (such as uptime and time to install), you can also configure custom metrics to measure instances of your application running in customer environments.

Custom metrics can be used to generate insights on customer usage and adoption of new features, which can help your team to make more informed prioritization decisions. For example:
* Decreased or plateaued usage for a customer can indicate a potential churn risk
* Increased usage for a customer can indicate the opportunity to invest in growth, co-marketing, and upsell efforts
* Low feature usage and adoption overall can indicate the need to invest in usability, discoverability, documentation, education, or in-product onboarding
* High usage volume for a customer can indicate that the customer might need help in scaling their instance infrastructure to keep up with projected usage

## How the Vendor Portal Collects Custom Metrics

The vendor portal collects custom metrics through Replicated KOTS or through the Replicated SDK, depending on which is installed in the cluster alongside the application instance. If both KOTS and the SDK are installed in the cluster (such as when a Helm chart-based application that includes the SDK is installed using KOTS), then data is merged to prevent duplication.

KOTS and the SDK both expose an in-cluster API where you can configure your application to POST metric payloads. When an application instance sends data to the API, KOTS or the SDK sends the data (including any custom and built-in metrics) to the Replicated app service. The app service is located at `replicated.app` or at your custom domain.

If any values in the metric payload are different from the current values for the instance, then a new event is generated and displayed in the vendor portal. For more information about how the vendor portal generates events, see [How the Vendor Portal Generates Events and Insights](/vendor/instance-insights-event-data#how-the-vendor-portal-generates-events-and-insights) in _About Instance and Event Data_.

The following diagram demonstrates how a custom `activeUsers` metric is sent to the in-cluster API and ultimately displayed in the vendor portal, as described above:

<img alt="Custom metrics flowing from customer environment to vendor portal" src="/images/custom-metrics-flow.png" width="800px"/>

[View a larger version of this image](/images/custom-metrics-flow.png)

## Requirements

To support the collection of custom metrics, one of the following must be running in the cluster alongside the application instance:
* Replicated KOTS version 1.102.0 or later
* Replicated SDK version 1.0.0-beta.5 or later

If you have any customers that are running earlier versions of KOTS or the SDK, Replicated recommends that you add logic to your application to gracefully handle a 404 from the in-cluster APIs.

## Limitations

Custom metrics have the following limitations:

* Custom metrics are not available for instances that are running in air gapped environments.

* Custom metrics are not available for KOTS instances that have multiple licenses installed.

* The label that is used to display metrics in the vendor portal cannot be customized. Metrics are sent to the vendor portal with the same name that is sent in the POST payload. The vendor portal then converts camel case to title case: for example, `activeUsers` is displayed as **Active Users**.

* The in-cluster APIs accept only JSON scalar values for metrics. Any requests containing nested objects or arrays are rejected.

* Any payloads sent from an application component must contain all relevant metrics. It is not recommended to configure multiple components to send different sets of metrics because Replicated does not merge sets of metrics. The set of custom metrics present in the Instance Summary API and displayed in the vendor portal represent the most recent payload received from any application component.

  For example, if a component of your application sends the following:

  ```json
  {
    "numProjects": 5,
    "activeUsers": 10,
  }
  ```

  Then, the component later sends the following:

  ```json
  {
    "activeUsers": 10,
    "usingCustomReports": false
  }
  ```

  The instance detail will show `Active Users: 10` and `Using Custom Reports: false`, which represents the most recent payload received. The previously-sent `numProjects` value is discarded from the instance summary and is available in the instance events payload.

## Configure Custom Metrics

You can configure your application to send a set of metrics as key value pairs to the API that is running in the cluster alongside the application instance.

The location of the API endpoint is different depending on if KOTS or the SDK is installed in the cluster:
* For applications installed with KOTS, the in-cluster API custom metrics endpoint is located at `http://kotsadm:3000/api/v1/app/custom-metrics`. 

  **Example:**

  ```
  POST http://kotsadm:3000/api/v1/app/custom-metrics
  ```

  ```json
  {
    "data": {
      "num_projects": 5,
      "weekly_active_users": 10
    }
  }
  ```

* For Helm chart-based applications that include the Replicated SDK, the in-cluster API custom metrics endpoint is located at `http://replicated:3000/api/v1/app/custom-metrics`. This endpoint is available for SDK-enabled Helm charts that are installed with KOTS or with the Helm CLI.

  **Example:**

  ```bash
  POST http://replicated:3000/api/v1/app/custom-metrics
  ```

  ```json
  {
    "data": {
      "num_projects": 5,
      "weekly_active_users": 10
    }
  }
  ```

### NodeJS Example

The following example shows a NodeJS application that sends metrics on a weekly interval to the in-cluster API exposed by the SDK:

```javascript
async function sendMetrics(db) {

    const projectsQuery = "SELECT COUNT(*) as num_projects from projects";
    const numProjects = (await db.getConnection().queryOne(projectsQuery)).num_projects;

    const usersQuery = 
        "SELECT COUNT(*) as active_users from users where DATEDIFF('day', last_active, CURRENT_TIMESTAMP) < 7";
    const activeUsers = (await db.getConnection().queryOne(usersQuery)).active_users;

    const metrics = { data: { numProjects, activeUsers }};
    
    const res = await fetch('https://replicated:3000/api/v1/app/custom-metrics', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metrics),
    });
    if (res.status !== 200) {
        throw new Error(`Failed to send metrics: ${res.statusText}`);
    }
}

async function startMetricsLoop(db) {

    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24

    // send metrics once on startup
    await sendMetrics(db)
      .catch((e) => { console.log("error sending metrics: ", e) });        

    // schedule weekly metrics payload

    setInterval( () => {
        sendMetrics(db, licenseId)
          .catch((e) => { console.log("error sending metrics: ", e) });        
    }, ONE_DAY_IN_MS);
}

startMetricsLoop(getDatabase());
```

## View Custom Metrics

You can view the custom metrics that you configure for each active instance of your application on the **Instance Details** page in the vendor portal.

The following shows an example of an instance with custom metrics:

![Custom Metrics section of Instance details page](/images/instance-custom-metrics.png)

As shown in the image above, the **Custom Metrics** section of the **Instance Details** page includes the following information:
* The timestamp when the custom metric data was last updated.
* Each custom metric that you configured, along with the most recent value for the metric for the instance.

Custom metrics are also included in the **Instance activity** stream of the **Instance Details** page. For more information, see [Instance Activity](/vendor/instance-insights-details#instance-activity) in _Instance Details_.
