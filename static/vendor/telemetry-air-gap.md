# Collect Telemetry for Air Gap Instances

This topic describes how to collect telemetry for instances in air gap environments.

## Overview

Air gap instances run in environments without outbound internet access. This limitation prevents these instances from periodically sending telemetry to the Replicated Vendor Portal through the Replicated SDK or Replicated KOTS. For more information about how the Vendor Portal collects telemetry from online (internet-connected) instances, see [About Instance and Event Data](/vendor/instance-insights-event-data#about-reporting).

For air gap instances, Replicated KOTS and the Replicated SDK collect and store instance telemetry in a Kubernetes Secret in the customer environment. The Replicated SDK also stores any custom metrics within its Secret.

The telemetry and custom metrics stored in the Secret are collected when a support bundle is generated in the environment. When the support bundle is uploaded to the Vendor Portal, the telemetry and custom metrics are associated with the correct customer and instance ID, and the Vendor Portal updates the instance insights and event data accordingly.

The following diagram demonstrates how air gap telemetry is collected and stored by the Replicated SDK in a customer environment, and then shared to the Vendor Portal in a support bundle:

<img alt="Air gap telemetry collected by the SDK in a support bundle" src="/images/airgap-telemetry.png" width="800px"/>

[View a larger version of this image](/images/airgap-telemetry.png)

All support bundles uploaded to the Vendor Portal from air gap customers contributes to a comprehensive dataset, providing parity in the telemetry for air gap and online instances. Replicated recommends that you collect support bundles from air gap customers regularly (monthly or quarterly) to improve the completeness of the dataset. The Vendor Portal handles any overlapping event archives idempotently, ensuring data integrity.

## Requirement

Air gap telemetry has the following requirements:

* To collect telemetry from air gap instances, one of the following must be installed in the cluster where the instance is running:
   
   * The Replicated SDK installed in air gap mode. See [Install the SDK in Air Gap Environments](/vendor/replicated-sdk-airgap).
   
   * KOTS v1.92.1 or later

   :::note
   When both the Replicated SDK and KOTS v1.92.1 or later are installed in the cluster (such as when a Helm chart that includes the SDK is installed by KOTS), both collect and store instance telemetry in their own dedicated secret, subject to the size limitation noted below. In the case of any overlapping data points, the Vendor Portal will report these data points chronologically based on their timestamp.
   :::

* To collect custom metrics from air gap instances, the Replicated SDK must installed in the cluster in air gap mode. See [Install the SDK in Air Gap Environments](/vendor/replicated-sdk-airgap).

    For more information about custom metrics, see [Configure Custom Metrics](https://docs.replicated.com/vendor/custom-metrics).

Replicated strongly recommends that all applications include the Replicated SDK because it enables access to both standard instance telemetry and custom metrics for air gap instances.

## Limitation

Telemetry data is capped at 4,000 events or 1MB per Secret; whichever limit is reached first.

When a limit is reached, the oldest events are purged until the payload is within the limit. For optimal use, consider collecting support bundles regularly (monthly or quarterly) from air gap customers.

## Collect and View Air Gap Telemetry

To collect telemetry from air gap instances:

1. Ask your customer to collect a support bundle. See [Generate Support Bundles](/vendor/support-bundle-generating).

1. After receiving the support bundle from your customer, go to the Vendor Portal **Customers**, **Customer Reporting**, or **Instance Details** page and upload the support bundle:

     ![upload new bundle button on instance details page](/images/airgap-upload-telemetry.png)

     The telemetry collected from the support bundle appears in the instance data shortly. Allow a few minutes for all data to be processed.