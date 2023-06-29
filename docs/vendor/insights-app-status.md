import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"
import SupportedResources from "../partials/instance-insights/_supported-resources-status.mdx"
import SDKLabels from "../partials/replicated-sdk/_labels.mdx"

# Enabling and Understanding Application Status

This topic describes how to configure your application so that you can view the status of application instances in the Replicated vendor portal. It also describes the meaning of the different application statuses.

## Overview

The vendor portal displays data on the status of instances of your application running in customer environments, including the current status, the instance uptime over time, and the average amount of time it takes your application to reach a Ready state during installation. For more information, see [Instance Details](instance-insights-details).

To provide insights on application status, Replicated interprets and aggregates the state of one or more supported Kubernetes resource types deployed to the cluster as part of your application.

<SupportedResources/>

To have access to application status data in the vendor portal, you must configure your application to indicate the Kubernetes resources that you want Replicated to track for changes in state. For more information, see [Enable Application Status Insights](#enable-application-status) below.

For more information about how Replicated uses the state of the resources that you provide to report application status, see [Understanding Application Status](#understanding-application-status) below.

## Enable Application Status Insights

To enable instances of your application to send status information to the vendor portal, do one of the following, depending on the application installation method:

* For applications installed with Helm:

   * Include the Replicated SDK as a dependency of your Helm chart. See [Using the Replicated SDK with Your Application](replicated-sdk-using).
   * Add the following labels on one or more Kubernetes resources deployed as part of your Helm chart:

     <SDKLabels/> 

     These are standard Helm labels that enable the Replicated SDK to report the status of installed instances of your application to the vendor portal. For more information about the types of resources that are supported, see [Overview](#overview) above.

* For applications installed with Replicated KOTS, configure one or more _status informers_ in the Replicated Application custom resource. For more information, see [Add Status Informers](admin-console-display-app-status) in _Adding Resource Status Informers_.

## Understanding Application Status

This section provides information about how Replicated interprets and aggregates the status of Kubernetes resources for your application to report an application status.

### Resource Statuses

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>