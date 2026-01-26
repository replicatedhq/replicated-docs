# Configure Custom Metrics (Beta)

This topic describes how to configure an application to send custom metrics to the Replicated Vendor Portal.

## Overview

In addition to the built-in insights displayed in the Vendor Portal by default (such as uptime and time to install), you can also configure custom metrics to measure instances of your application running customer environments. Custom metrics can be collected for application instances running in online or air gap environments.

Custom metrics can be used to generate insights on customer usage and adoption of new features, which can help your team to make more informed prioritization decisions. For example:
* Decreased or plateaued usage for a customer can indicate a potential churn risk
* Increased usage for a customer can indicate the opportunity to invest in growth, co-marketing, and upsell efforts
* Low feature usage and adoption overall can indicate the need to invest in usability, discoverability, documentation, education, or in-product onboarding
* High usage volume for a customer can indicate that the customer might need help in scaling their instance infrastructure to keep up with projected usage

## How the Vendor Portal Collects Custom Metrics

The Vendor Portal collects custom metrics through the Replicated SDK that is installed in the cluster alongside the application.

The SDK exposes an in-cluster API where you can configure your application to POST metric payloads. When an application instance sends data to the API, the SDK sends the data (including any custom and built-in metrics) to the Replicated app service. The app service is located at `replicated.app` or at your custom domain.

If any values in the metric payload are different from the current values for the instance, then a new event is generated and displayed in the Vendor Portal. For more information about how the Vendor Portal generates events, see [How the Vendor Portal Generates Events and Insights](/vendor/instance-insights-event-data#about-events) in _About Instance and Event Data_.

The following diagram demonstrates how a custom `activeUsers` metric is sent to the in-cluster API and ultimately displayed in the Vendor Portal, as described above:

<img alt="Custom metrics flowing from customer environment to Vendor Portal" src="/images/custom-metrics-flow.png" width="800px"/>

[View a larger version of this image](/images/custom-metrics-flow.png)

Custom metrics use a change-detection system to efficiently track meaningful change events from the previous value:

**Data Storage:**
- Every time your application sends metrics, the system records the full payload with a timestamp
- This creates a complete history of when your application reported data

**Event Creation:**
- The system compares each field with its previous value
- Events are **only created when values change** - not every time you send data
- This means if you send `{"users": 100}` multiple times, you'll only see one event

**Example:**

```
10:00 AM → Send {"users": 100, "region": "us-east"}
           Creates 2 events: users=100, region=us-east

10:05 AM → Send {"users": 100, "region": "us-west"}
           Creates 1 event: region changed to us-west
           No event for users (value unchanged)

10:10 AM → Send {"users": 150, "region": "us-west"}
           Creates 1 event: users changed to 150
           No event for region (value unchanged)
```

This design reduces noise and helps you focus on actual changes in your customer deployments.

## Requirements

To support the collection of custom metrics in online and air gap environments, the Replicated SDK version 1.0.0-beta.12 or later must be running in the cluster alongside the application instance.

The `PATCH` and `DELETE` methods described below are available in the Replicated SDK version 1.0.0-beta.23 or later.

For more information about the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

If you have any customers running earlier versions of the SDK, Replicated recommends that you add logic to your application to gracefully handle a 404 from the in-cluster APIs.

## Limitations

Custom metrics have the following limitations:

* The label that is used to display metrics in the Vendor Portal cannot be customized. Metrics are sent to the Vendor Portal with the same name that is sent in the `POST` or `PATCH` payload. The Vendor Portal then converts camel case to title case: for example, `activeUsers` is displayed as **Active Users**.

* The in-cluster APIs accept only JSON scalar values for metrics. Any requests containing nested objects or arrays are rejected.

* When using the `POST` method any existing keys that are not included in the payload will be deleted. To create new metrics or update existing ones without sending the entire dataset, simply use the `PATCH` method.

## Configure Custom Metrics

You can configure your application to `POST` or `PATCH` a set of metrics as key value pairs to the API that is running in the cluster alongside the application instance.  

To remove an existing custom metric use the `DELETE` endpoint with the custom metric name.

The Replicated SDK provides an in-cluster API custom metrics endpoint at `http://replicated:3000/api/v1/app/custom-metrics`.

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

```bash
PATCH http://replicated:3000/api/v1/app/custom-metrics
```

```json
{
  "data": {
    "num_projects": 54,
    "num_error": 2
  }
}
```

```bash
DELETE http://replicated:3000/api/v1/app/custom-metrics/num_projects
```

### Supported Data Types

Custom metric **names** (keys) must be strings.

Custom metric **values** support these JSON types:
- **Numbers**: integers or decimals (e.g., `150`, `75.5`)
- **Strings**: text values (e.g., `"us-east-1"`, `"enterprise"`)
- **Booleans**: true or false (e.g., `true`, `false`)
- **Null**: null values

**Not supported**: Nested objects or arrays

**Example:**

```json
{
  "data": {
    "active_users": 150,              // ✓ Number
    "cpu_usage_percent": 75.5,        // ✓ Number
    "sso_enabled": true,               // ✓ Boolean
    "deployment_region": "us-east-1", // ✓ String
    "nested": {"foo": "bar"}          // ✗ Not supported
  }
}
```

### POST vs PATCH

Both methods record metrics with a timestamp, but they differ in how they handle your current metric state:

**POST** - Replace current state
- Sends a complete snapshot of all metrics
- Any metrics not included are considered removed from the instance summary
- Use when sending your complete metric set each time

**PATCH** - Update current state
- Updates only the fields you include
- Previously-sent fields remain unchanged
- **Recommended** for most use cases

**Example:**

```
// Initial state (empty)

POST {"users": 100, "seats": 50}
// Current state: users=100, seats=50

PATCH {"users": 150}
// Current state: users=150, seats=50 (seats preserved)

POST {"users": 200}
// Current state: users=200 (seats removed from summary)
```

**Best Practice**: Use PATCH unless you need to explicitly remove metrics from the instance summary.

For example, if a component of your application initially sends the following via the `POST` method:

```json
{
  "numProjects": 5,
  "activeUsers": 10,
}
```

Then, the component later sends the following also via the `PATCH` method:

```json
{
  "usingCustomReports": false
}
```

The instance detail will show `Num Projects: 5`, `Active Users: 10`, `Using Custom Reports: false`, which represents the merged and upserted payload.

However, if you use `POST` for the second call instead of `PATCH`:

```json
{
  "activeUsers": 10,
  "usingCustomReports": false
}
```

The instance detail will show only `Active Users: 10` and `Using Custom Reports: false`. The previously-sent `numProjects` value is removed from the instance summary (though it remains accessible in the instance events history).

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

You can view the custom metrics that you configure for each active instance of your application on the **Instance Details** page in the Vendor Portal.

The following shows an example of an instance with custom metrics:

<img alt="Custom Metrics section of Instance details page" src="/images/instance-custom-metrics.png" width="700px"/>

[View a larger version of this image](/images/instance-custom-metrics.png)

As shown in the image above, the **Custom Metrics** section of the **Instance Details** page includes the following information:
* The timestamp when the custom metric data was last updated.
* Each custom metric that you configured, along with the most recent value for the metric.
* A time-series graph depicting the historical data trends for the selected metric.

Custom metrics are also included in the **Instance activity** stream of the **Instance Details** page. For more information, see [Instance Activity](/vendor/instance-insights-details#instance-activity) in _Instance Details_.

## Export Custom Metrics

You can use the Vendor API v3 `/app/{app_id}/events` endpoint to programatically access historical timeseries data containing instance level events, including any custom metrics that you have defined. For more information about the endpoint, see [Export Customer and Instance Data](/vendor/instance-data-export).

## Best Practices

### Sending Frequency
- Send metrics from the applicaiton at regular intervals (e.g., every hour or daily)
- Avoid sending metrics too frequently (e.g., every minute) as it creates unnecessary load
- Consider your use case. Custom metrics are best for periodic product statistics reporting vs real-time monitoring.

### Change Detection Efficiency
- The system only creates events when values change
- It's safe to send the same values repeatedly - no duplicate events will be created - and it will show the instance is still active

### Choosing POST vs PATCH
- **Use PATCH** (recommended) when sending updates to specific metrics
- **Use POST** only when you want to send a complete snapshot and remove unreported metrics from the instance summary

### Metric Naming
- Use descriptive names: `active_users` not `au`
- Use snake_case or camelCase consistently
- Remember: names will be displayed in the Vendor Portal UI (camelCase converts to Title Case)

## Troubleshooting Custom Metrics 

### "I'm not seeing any events"

**Cause**: Events are only created when values change.

**Solution**:
- If you send `{"users": 100}` multiple times, only the first submission creates an event
- Try changing a value to verify the system is working: `{"users": 101}`
- Check the **Instance activity** stream to confirm metrics are being received

### "My metrics aren't showing up"

**Possible causes and solutions**:
- **Verify SDK version**: Ensure you're using Replicated SDK version 1.0.0-beta.12 or later
- **Check payload format**: Verify your payload only contains scalar values (no nested objects or arrays)
- **Validate JSON**: Ensure you're sending valid JSON with proper content type headers
- **Check network connectivity**: Verify the application can reach `http://replicated:3000`

### "I see duplicate events for unchanged values"

**Cause**: Your application logic may be computing values differently between calls.

**Solution**:
- Review your metric collection logic to ensure consistent value calculation
- Check for floating-point precision issues with numeric values
- Verify that boolean values are consistently true/false (not truthy/falsy conversions)


