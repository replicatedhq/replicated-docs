# Installing an Application and the SDK

This topic describes how to install Helm chart applications that include the Replicated SDK Helm chart as a dependency.

## About Installing Your Application and the SDK

Your customers log in to the Replicated registry using their license ID to pull your chart from the Replicated registry. This ensures that any customer who pulls your chart has a valid, unexpired license.

When a Helm chart is pulled from the Replicated registry, the registry injects certain values into the chart in the `replicated` section of the Helm chart `values.yaml` file. These values include license and release information that the SDK uses for initialization.

## Prerequisites

To install a Helm chart and the Replicated SDK, you must have a customer in the vendor portal with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted in any way. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).

## Install

To install a Helm chart along with the Replicated SDK, you first log in to the Replicated registry where the Helm chart was pushed using a customer license ID. Then, you use the helm CLI to install the Helm chart.

1. In the vendor portal, go to **Customers** and click on the target customer.
1. Click **Helm install instructions**.
1. Run the first command to log into the Replicated registry.
1. 