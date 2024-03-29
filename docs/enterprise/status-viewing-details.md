import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"

# Viewing Status Details

This topic describes how to view the status of an application on the Replicated admin console dashboard. It also describes how Replicated KOTS collects and aggregates the application status. 
## View Status Details

The application status displays on the dashboard of the admin console. Viewing the status details can be helpful for troubleshooting.

There are two ways to view the status details, depending on your admin console version:

- (Version 1.51.0 and later) Click **Details** next to the status on the dashboard. For information about how to update the admin console to view the Details link, see [Updating KOTS](updating-app-manager).

  ![Status Details](/images/kotsadm-dashboard-appstatus.png)

- (Version 1.50.2 and earlier) Review the diagnostic information in `kots/admin_console/kotsadm-/kotsadm.log` in the support bundle. For more information about generating a support bundle, see [Generating Support Bundles](troubleshooting-an-app).

## About Application Status

To display application status on the admin console dashboard, KOTS aggregates the status of specific Kubernetes resources for the application.

The following resource types are supported for displaying application status:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims (PVC)
* DaemonSet

Applications can specify one or more of the supported Kubernetes workloads listed above. KOTS watches all specified workloads for state changes.

For more information about how to interpret the application status displayed on the admin console dashboard, see [Resource Statuses](#resource-statuses) and [Aggregate Application Status](#aggregate-application-status) below. 

### Resource Statuses

Possible application statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>