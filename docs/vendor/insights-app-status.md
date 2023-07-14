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

For applications installed with Helm, the Replicated SDK automatically detects and reports the status of the resources that are part of the Helm release. For information, see [Using the SDK with Your Application (Beta)](replicated-sdk-using).

You can optionally configure custom status informers by overriding the `statusInformers` value in the Replicated SDK chart. For example:

```yaml
# Helm chart values.yaml file 

replicated:
  statusInformers:
    - deployment/nginx
    - statefulset/mysql
```
:::note
When the `replicated.statusInformers` field is set, the SDK detects and reports the status of only the resources included in the `replicated.statusInformers` field. 
:::

### KOTS Installations

For applications installed with Replicated KOTS, configure one or more status informers in the Replicated Application custom resource. For more information, see [Add Status Informers](admin-console-display-app-status#add-status-informers) in _Adding Resource Status Informers_.

## Understanding Application Status

This section provides information about how Replicated interprets and aggregates the status of Kubernetes resources for your application to report an application status.

### Resource Statuses

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>