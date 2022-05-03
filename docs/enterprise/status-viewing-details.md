# Viewing Status Details

The application status displays on the dashboard of the Replicated admin console. Viewing the status details can be helpful for troubleshooting states, such as Missing.

There are two ways to view the status details, depending on your admin console version:

- (Version 1.51.0 and later) Click **Details** next to the status on the dashboard.
- (Version 1.50.2 and earlier) Review the diagnostic information in `kots/admin_console/kotsadm-/kotsadm.log` in the support bundle. For more information about generating a support bundle, see [Troubleshooting an Application](troubleshooting-an-app).

## Resource Statuses

Possible application statuses are "Missing", "Unavailable", "Degraded", "Ready" and "Updating". "Missing" indicates that informers have yet to report back their status.

Below is a table of resources that are supported and conditions that contribute to each status:

| | Unavailable | Degraded | Ready | Updating |
|---|---|---|---|---|
| **Deployment** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **StatefulSet** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **Service** | No endpoints are ready, no load balancer has been assigned | At least one endpoint is ready and less than desired | All desired endpoints are ready, any load balancers have been assigned | n/a |
| **Ingress** | No backend service endpoints are ready, no load balancer has been assigned | At least one backend service endpoint is ready and less than desired | All desired backend service endpoints are ready, any load balancers have been assigned | n/a |
| **PersistentVolumeClaim** | Claim is pending or lost | n/a | Claim is bound | n/a |

## Additional Resources

- [Updating the Admin Console on an Existing Cluster](updating-existing-cluster)
- [Updating the Admin Console on a Kubernetes Installer-Created Cluster](updating-embedded-cluster)
