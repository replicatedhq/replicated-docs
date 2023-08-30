# Configuring Custom Metrics

This topic describes how to configure custom metrics.

## Overview

Beyond just instance uptime, app versions, and infrastructure status, vendors can now measure *anything they want* about customer instances. This means

Product teams can understand usage and adoption of features
Sales and customer success can understand usage volume to identify growth opportunities and churn risks 
Engineering and support teams can work with customers to meet scaling needs proactively as customer usage grows

In SaaS instances, vendors can regularly get information about customer usage and use this to respond to different trends:

Decreasing or plateaued usage for a single customer: invest in success / relationship to address a churn risk
Increasing usage for a single customer: invest in growth, co-marketing, and upsell efforts
Low feature usage / adoption: invest in usability, discoverability, documentation, education, and in-product onboarding
High usage volume for a single customer: engage services / solutions engineering to help the customer scale their instance infrastructure to keep up with projected usage

## Requirements

Custom metrics are available for the following:
* Applications running Replicated KOTS version 1.112.0 or later.
* Helm chart-based applications with the Replicated SDK version 0.0.1-beta.9 or later.

If you have any customers that are running earlier versions of KOTS or the SDK, Replicated recommends that you add logic to your application to gracefully handle a 404 from the in-cluster APIs.

## Limitations

Using custom metrics has the following limitations:

* Rate Limiting of in-cluster APIs: Metric payloads are limited to one push per hour. Any additional metric POST requests are rejected with a 422 error code. In case of frequent restarts, an app that sends metrics on startup should be built to gracefully handle a 422 error from the in-cluster APIs, waiting until the next scheduled interval to try again.

  Replicated recommends that you log or count these 422 errors in your application so that you can detect if your push interval might be incorrectly configured.

* Metrics are sent to the vendor portal with the same name as is sent in the POST payload, and are displayed with a “Camel Case to Title Case” conversion -- that means activeUsers is displayed as Active Users.

* For each unique metric, the last known value for an instance will always be preserved, unaggregated, regardless of age. Replicated may in the future choose to aggregate older data points. That is, data points that are older than a to-be-determined age may be aggregated according to to-be-determined logic (probably “max” or “average”). For example, 10 data points for “number of projects” sent in June 2023 may be available at a daily granularity until June 2024, after which a single data point for “June 2023” will be stored that is the average of those 10 data points.

* Only JSON scalar values for metrics are accepted by the in-cluster API(s). Any request containing nested objects or arrays are rejected.

* The set of custom metrics represented in the Instance Summary API and UI represent the last-received payload from any in-cluster app component. That is, prior payloads are not merged into subsequent payloads.

   For example, if an vendor app component sends:

    ```json
    {
    "numProjects": 5,
    "activeUsers": 10,
    }
    ```

    And then later sends the following:

    ```json
    {
    "activeUsers": 10,
    "usingCustomReports": false
    }
    ```

    Then, the instance detail shows:

    * Active Users: 10
    * Using Custom Reports: false

    And, the previously-sent `numProjects` value is discarded from the instance summary and is available in the instance events payload.

    This means that, any payloads sent from an application component must contain all relevant metrics. It is not recommended to have multiple components sending different sets of metrics, as these are not merged.

## Configure Custom Metrics

## View Custom Metrics

You can view the custom metrics that you configure for each active instance of your application on the **Instance Details** page in the Replicated vendor portal.

The **Custom Metrics** section of the **Instance Details** page includes the following information:
* The timestamp when the custom metric data was last updated.
* Each custom metric that you configured, along with the most recent value for the metric for the instance.

Custom metrics are also included in the **Instance activity** stream of the **Instance Details** page. For more information, see [Instance Activity](/vendor/instance-insights-details#instance-activity) in _Instance Details_.