# Configuring Custom Metrics

This topic describes how to configure custom metrics.

## Overview

In addition to the metrics that are included in the Replicated vendor portal by default, you can also configure custom metrics to measure your customer instances. For example, you can configure custom metrics to get insights on customer usage and adoption of new features, which can help your team to make more informed decisions about how to engage .

## How the Vendor Portal Collects Custom Metrics

In-cluster APIs 
Instance Summary API

## Requirements

To support the collection of custom metrics, application instances running in customer environments must meet _one_ of the following requirements:
* The instance is using Replicated KOTS version 1.112.0 or later
* The instance is a Helm chart-based application that includes the Replicated SDK version 0.0.1-beta.9 or later

If you have any customers that are running earlier versions of KOTS or the SDK, Replicated recommends that you add logic to your application to gracefully handle a 404 from the in-cluster APIs.

## Limitations

Custom metrics have the following limitations:

* Metric payloads are limited to one push per hour. Any additional metric POST requests are rejected with a 422 error code. In case of frequent restarts, Replicated recommends that an application instance that sends metrics on startup is built to gracefully handle a 422 error from the in-cluster APIs, waiting until the next scheduled interval to try again. Additionally, Replicated recommends that you log or count these 422 errors in your application so that you can detect if your push interval might be incorrectly configured.

* The label that is used to display metrics in the vendor portal cannot be customized. Metrics are sent to the vendor portal with the same name that is sent in the POST payload. The vendor portal then converts camel case to title case: for example, `activeUsers` is displayed as **Active Users**.

* For each unique metric, the last known value for an instance is always preserved and unaggregated, regardless of age.

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

  The instance detail will show the following, which represents the most recent payload received:

    * Active Users: 10
    * Using Custom Reports: false

  The previously-sent `numProjects` value is discarded from the instance summary and is available in the instance events payload.

## Configure Custom Metrics

## View Custom Metrics

You can view the custom metrics that you configure for each active instance of your application on the **Instance Details** page in the Replicated vendor portal.

The **Custom Metrics** section of the **Instance Details** page includes the following information:
* The timestamp when the custom metric data was last updated.
* Each custom metric that you configured, along with the most recent value for the metric for the instance.

Custom metrics are also included in the **Instance activity** stream of the **Instance Details** page. For more information, see [Instance Activity](/vendor/instance-insights-details#instance-activity) in _Instance Details_.