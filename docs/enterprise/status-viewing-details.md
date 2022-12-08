# Viewing Status Details

The application status displays on the dashboard of the Replicated admin console. Viewing the status details can be helpful for troubleshooting states, such as Missing.

There are two ways to view the status details, depending on your admin console version:

- (Version 1.51.0 and later) Click **Details** next to the status on the dashboard. For information about how to update the admin console to view the Details link, see [Updating the Admin Console on an Existing Cluster](updating-existing-cluster) and [Updating the Admin Console on a Kubernetes Installer-Created Cluster](updating-embedded-cluster).

  ![Status Details](/images/kotsadm-dashboard-appstatus.png)

- (Version 1.50.2 and earlier) Review the diagnostic information in `kots/admin_console/kotsadm-/kotsadm.log` in the support bundle. For more information about generating a support bundle, see [Generating Support Bundles](troubleshooting-an-app).

## Resource Statuses

Possible application statuses are Missing, Unavailable, Degraded, Ready, and Updating.

_Missing_ is an initial deployment state indicating that informers have not reported their status because the application has just been deployed and the underlying resource has not been created yet. After the resource is created, the status changes. However, if a resource changes from another state to Missing, then the resource was either deleted or the informers failed to report a status.

Below is a table of resources that are supported and conditions that contribute to each status:

| | Unavailable | Degraded | Ready | Updating |
|---|---|---|---|---|
| **Deployment** | No replicas are ready | At least 1 replica is ready, but more are desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **StatefulSet** | No replicas are ready | At least 1 replica is ready, but more are desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **Service** | No endpoints are ready, no load balancer has been assigned | At least one endpoint is ready, but more are desired | All desired endpoints are ready, any load balancers have been assigned | n/a |
| **Ingress** | No backend service endpoints are ready, no load balancer has been assigned | At least one backend service endpoint is ready, but more are desired | All desired backend service endpoints are ready, any load balancers have been assigned | n/a |
| **PersistentVolumeClaim** | Claim is pending or lost | n/a | Claim is bound | n/a |
