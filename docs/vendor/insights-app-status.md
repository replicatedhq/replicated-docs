import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import SupportedResources from "../partials/instance-insights/_supported-resources-status.mdx"

# Enabling and Understanding Application Status

This topic describes how to configure your application so that you can view the status of application instances in the Replicated vendor portal. For more information, see [Instance Details](instance-insights-details).

## Overview

## How to Enable Application Status

To enable instances of your application to send status data to the vendor portal, you need to configure your application to indicate one or more Kubernetes resources that you want Replicated to track the status. 

<SupportedResources/>

To enable 

* For instances installed with Helm, you must:

   * Include the Replicated SDK as a dependency of your Helm chart.
   * You must add the following labels on all resources deployed as part of your Helm chart:

     <SDKLabels/> 

     These are standard Helm labels that enable the Replicated SDK to report the status of installed instances of your application to the vendor portal. For more information, see [Using the Replicated SDK with Your Application](replicated-sdk-using).

* For instances installed with Replicated KOTS, you must configure one or more _status informers_ in the Application custom resource to get application status data. For more information about how to configure status informers, see [Adding Resource Status Informers](admin-console-display-app-status).

## Resource Statuses

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

## Aggregate Application Status

When you provide more than one Kubernetes resource, Replicated aggregates all resource statuses to display a single application status.

Replicated uses the least available resource status to represent the aggregate application status. For example, if at least one resource has an Unavailable status, then the aggregate application status is Unavailable.

<AggregateStatus/>