import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"
import SupportedResources from "../partials/instance-insights/_supported-resources-status.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Enable and Understand Application Status

This topic describes how to configure your application so that you can view the status of application instances in the Replicated Vendor Portal. It also describes the meaning of the different application statuses.

## Overview

The Vendor Portal displays data on the status of instances of your application that are running in customer environments, including the current state (such as Ready or Degraded), the instance uptime, and the average amount of time it takes your application to reach a Ready state during installation. For more information about viewing instance data, see [Instance Details](instance-insights-details).

To compute and display these insights, the Vendor Portal interprets and aggregates the state of one or more of the supported Kubernetes resources that are deployed to the cluster as part of your application.

<SupportedResources/>

For more information about how instance data is sent to the Vendor Portal, see [About Instance and Event Data](instance-insights-event-data).

## Enable Application Status Insights

To display insights on application status, the Vendor Portal requires that your application has one or more _status informers_. Status informers indicate the Kubernetes resources deployed as part of your application that are monitored for changes in state.

For information about how to enable status informers, see the sections below:
* [Helm CLI Installations](#helm-cli-installations)
* [Replicated Installers](#replicated-installers)

### Helm CLI Installations

For Helm CLI installations, you can include the Replicated SDK as a dependency in your primary Helm chart to get status data. When the application is deployed using `helm install` or `helm upgrade`, the SDK automatically detects and reports the status of resources in the Helm release for the given chart. You can also override the list of resources that get reported on using the SDK's [`statusInformers`](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml#L287) value.

To get instance status data for installations with the Helm CLI:

1. In your application Helm chart `Chart.yaml` file, add the YAML below to declare the SDK as a dependency. If your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first. Do not declare the SDK in more than one chart. For more information, see [Install the Replicated SDK](/vendor/replicated-sdk-installing).

   <DependencyYaml/>

1. If either of the following are true, list all the resources that you want the SDK to report on in the SDK's [`statusInformers`](https://github.com/replicatedhq/replicated-sdk/blob/main/chart/values.yaml#L287) field:

     * You want the SDK to report on resources outside the Helm release for the chart where it is included as a dependency. For example, your application is installed as multiple charts and you want status data for resources created by subcharts.
     * Your application is installed by running `helm template` then `kubectl apply`, rather than `helm install` or `helm upgrade`. In this case, the SDK is unable to automatically detect resources in the Helm release.

     **Example:**

     ```yaml
     # Your Helm chart values.yaml file 

     replicated:
       # list all resources that you want the SDK to report on
       statusInformers:
         - deployment/nginx
         - statefulset/mysql
     ```

     :::note
     When `statusInformers` is set, the SDK reports the status of only the resources included in the `statusInformers` field.
     :::

### Replicated Installers

For installations with Replicated KOTS, configure one or more status informers in the KOTS Application custom resource. For more information, see [Adding Resource Status Informers](admin-console-display-app-status).

When Helm-based applications that include the Replicated SDK and are deployed by KOTS, the SDK inherits the status informers configured in the KOTS Application custom resource. In this case, the SDK does _not_ automatically report the status of the resources that are part of the Helm release. This prevents discrepancies in the instance data in the vendor platform.

## View Resource Status Insights {#resource-status}

For applications that include the Replicated SDK, the Vendor Portal also displays granular resource status insights in addition to the aggregate application status. For example, you can hover over the **App status** field on the **Instance details** page to view the statuses of the indiviudal resources deployed by the application, as shown below:

<img src="/images/resource-status-hover-current-state.png" alt="resource status pop up" width="400px"/>

[View a larger version of this image](/images/resource-status-hover-current-state.png)

Viewing these resource status details is helpful for understanding which resources are contributing to the aggregate application status. For example, when an application has an Unavailable status, that means that one or more resources are Unavailable. By viewing the resource status insights on the **Instance details** page, you can quickly understand which resource or resources are Unavailable for the purpose of troubleshooting.

Granular resource status details are automatically available when the Replicated SDK is installed alongside the application. For information about how to distribute and install the SDK with your application, see [Install the Replicated SDK](/vendor/replicated-sdk-installing).

## Understanding Application Status

This section provides information about how Replicated interprets and aggregates the status of Kubernetes resources for your application to report an application status.

### About Resource Statuses {#resource-statuses}

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>