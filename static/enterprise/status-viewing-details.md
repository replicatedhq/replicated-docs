# Understand Application Status Details in the Admin Console

This topic describes how to view the status of an application on the Replicated KOTS Admin Console dashboard. It also describes how Replicated KOTS collects and aggregates the application status. 
## View Status Details

The application status displays on the dashboard of the Admin Console. Viewing the status details can be helpful for troubleshooting.

To view the status details, click **Details** next to the status on the dashboard.

![Status Details](/images/kotsadm-dashboard-appstatus.png)

## About Application Status

To display application status on the Admin Console dashboard, KOTS aggregates the status of specific Kubernetes resources for the application.

The following resource types are supported for displaying application status:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims (PVC)
* DaemonSet

Applications can specify one or more of the supported Kubernetes workloads listed above. KOTS watches all specified workloads for state changes.

For more information about how to interpret the application status displayed on the Admin Console dashboard, see [Resource Statuses](#resource-statuses) and [Aggregate Application Status](#aggregate-application-status) below. 

### Resource Statuses

Possible application statuses are Ready, Updating, Degraded, Unavailable, and Missing.

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