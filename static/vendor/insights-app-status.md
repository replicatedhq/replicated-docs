# Enable and Understand Application Status

This topic describes how to configure your application so that you can view the status of application instances in the Replicated Vendor Portal. It also describes the meaning of the different application statuses.

## Overview

The Vendor Portal displays data on the status of instances of your application that are running in customer environments, including the current state (such as Ready or Degraded), the instance uptime, and the average amount of time it takes your application to reach a Ready state during installation. For more information about viewing instance data, see [Instance Details](instance-insights-details).

To compute and display these insights, the Vendor Portal interprets and aggregates the state of one or more of the supported Kubernetes resources that are deployed to the cluster as part of your application.

The following resource types are supported:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims (PVC)
* DaemonSet

For more information about how instance data is sent to the Vendor Portal, see [About Instance and Event Data](instance-insights-event-data).

## Enable Application Status Insights

To display insights on application status, the Vendor Portal requires that your application has one or more _status informers_. Status informers indicate the Kubernetes resources deployed as part of your application that are monitored for changes in state.

To enable status informers for your application, do one of the following, depending on the installation method:
* [Helm Installations](#helm-installations)
* [KOTS Installations](#kots-installations)

### Helm Installations 

To get instance status data for applications installed with Helm, the Replicated SDK must be installed alongside the application. For information about how to distribute and install the SDK with your application, see [Install the Replicated SDK](/vendor/replicated-sdk-installing).

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

For applications installed with Replicated KOTS, configure one or more status informers in the KOTS Application custom resource. For more information, see [Adding Resource Status Informers](admin-console-display-app-status).

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

<table>
 <tbody>
    <tr>
      <th width="10%"></th>
      <th width="15%">Deployment</th>
      <th width="15%">StatefulSet</th>
      <th width="15%">Service</th>
      <th width="15%">Ingress</th>
      <th width="15%">PVC</th>
      <th width="15%">DaemonSet</th>
    </tr>
    <tr>
    <th>Ready</th>
      <td>Ready replicas equals desired replicas</td>
      <td>Ready replicas equals desired replicas</td>
      <td>All desired endpoints are ready, any load balancers have been assigned</td>
      <td>All desired backend service endpoints are ready, any load balancers have been assigned</td>
      <td>Claim is bound</td>
      <td>Ready daemon pods equals desired scheduled daemon pods</td>
    </tr>
    <tr>
    <th>Updating</th>
      <td>The deployed replicas are from a different revision</td>
      <td>The deployed replicas are from a different revision</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>The deployed daemon pods are from a different revision</td>
    </tr>
    <tr>
      <th>Degraded</th>
      <td>At least 1 replica is ready, but more are desired</td>
      <td>At least 1 replica is ready, but more are desired</td>
      <td>At least one endpoint is ready, but more are desired</td>
      <td>At least one backend service endpoint is ready, but more are desired</td>
      <td>N/A</td>
      <td>At least one daemon pod is ready, but more are desired</td>
    </tr>
    <tr>
      <th>Unavailable</th>
      <td>No replicas are ready</td>
      <td>No replicas are ready</td>
      <td>No endpoints are ready, no load balancer has been assigned</td>
      <td>No backend service endpoints are ready, no load balancer has been assigned</td>
      <td>Claim is pending or lost</td>
      <td>No daemon pods are ready</td>
    </tr>
    <tr>
      <th>Missing</th>
      <td colSpan="6">Missing is an initial deployment status indicating that informers have not reported their status because the application has just been deployed and the underlying resource has not been created yet. After the resource is created, the status changes. However, if a resource changes from another status to Missing, then the resource was either deleted or the informers failed to report a status.</td>
    </tr>
  </tbody>
</table>

### Aggregate Application Status

When you provide more than one Kubernetes resource, Replicated aggregates all resource statuses to display a single application status.

Replicated uses the least available resource status to represent the aggregate application status. For example, if at least one resource has an Unavailable status, then the aggregate application status is Unavailable.

The following table describes the resource statuses that define each aggregate application status:

<table>
  <tbody>
    <tr>
      <th>Resource Statuses</th>
      <th>Aggregate Application Status</th>
    </tr>
    <tr>
     <td>No status available for any resource</td>
      <td>Missing</td>
    </tr>
    <tr>
      <td>One or more resources Unavailable</td>
      <td>Unavailable</td>
    </tr>
    <tr>
      <td>One or more resources Degraded</td>
      <td>Degraded</td>
    </tr>
    <tr>
      <td>One or more resources Updating</td>
      <td>Updating</td>
    </tr>
    <tr>
      <td>All resources Ready</td>
      <td>Ready</td>
    </tr>
  </tbody>
</table>