import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"

# Viewing Status Details

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

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>