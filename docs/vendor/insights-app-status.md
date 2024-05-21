import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"
import SupportedResources from "../partials/instance-insights/_supported-resources-status.mdx"

# Enabling and Understanding Application Status

This topic describes how to configure your application so that you can view the status of application instances in the Replicated vendor portal. It also describes the meaning of the different application statuses.

## Overview

The vendor portal displays data on the status of instances of your application that are running in customer environments, including the current state (such as Ready or Degraded), the instance uptime, and the average amount of time it takes your application to reach a Ready state during installation. For more information about viewing instance data, see [Instance Details](instance-insights-details).

To compute and display these insights, the vendor portal interprets and aggregates the state of one or more of the supported Kubernetes resources that are deployed to the cluster as part of your application.

<SupportedResources/>

For more information about how instance data is sent to the vendor portal, see [About Instance and Event Data](instance-insights-event-data).

## Enable Application Status Insights

To display insights on application status, the vendor portal requires that your application has one or more _status informers_. Status informers indicate the Kubernetes resources deployed as part of your application that are monitored for changes in state.

To enable status informers for your application, do one of the following, depending on the installation method:
* [Helm Installations](#helm-installations)
* [KOTS Installations](#kots-installations)

### Helm Installations 

To get instance status data for applications installed with Helm, the Replicated SDK must be installed alongside the application. For information about how to distribute and install the SDK with your application, see [Installing the Replicated SDK](/vendor/replicated-sdk-installing).

After you include the SDK as a dependency, the requirements for enabling status informers vary depending on how your application is installed:

* For applications installed by running `helm install` or `helm upgrade`, the Replicated SDK automatically detects and reports the status of the resources that are part of the Helm release. No additional configuration is required to get instance status data.

* For applications installed by running `helm template` then `kubectl apply`, the SDK cannot automatically detect and report the status of resources. You must configure custom status informers by overriding the `statusInformers` value in the Replicated SDK chart. For example:

  ```yaml
  # Helm chart values.yaml file 

  replicated:
    statusInformers:
      - deployment/nginx
      - statefulset/mysql
  ```

  :::note
  Applications installed by running `helm install` or `helm upgrade` can also use custom status informers. When the `replicated.statusInformers` field is set, the SDK detects and reports the status of only the resources included in the `replicated.statusInformers` field.
  :::

### KOTS Installations

For applications installed with Replicated KOTS, configure one or more status informers in the Replicated Application custom resource. For more information, see [Adding Resource Status Informers](admin-console-display-app-status).

When Helm-based applications that include the Replicated SDK and are deployed by KOTS, the SDK inherits the status informers configured in the KOTS Application custom resource. In this case, the SDK does _not_ automatically report the status of the resources that are part of the Helm release. This prevents discrepancies in the instance data in the vendor platform.

## View Resource Status Insights {#resource-status}

For applications that include the Replicated SDK, the vendor portal also displays granular resource status insights. For example, you can hover over the **App status** field on the **Instance details** page to view the statuses of the indiviudal resources deployed by the application, as shown below:

<img src="/images/resource-status-hover-current-state.png" alt="resource status pop up" width="400px"/>

[View a larger version of this image](/images/resource-status-hover-current-state.png)

Granular resource status details are automatically available when the Replicated SDK is installed alongside the application. For information about how to distribute and install the SDK with your application, see [Installing the Replicated SDK](/vendor/replicated-sdk-installing).

## Understanding Application Status

This section provides information about how Replicated interprets and aggregates the status of Kubernetes resources for your application to report an application status.

### About Resource Statuses {#resource-statuses}

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>