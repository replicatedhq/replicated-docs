# Displaying Application Status

You can configure the Application custom resource to display application status on the dashboard of the Replicated admin console.

![Application Status](/images/kotsadm-dashboard-appstatus.png)

It is necessary to target specific Kubernetes resources for the dashboard to accurately report status.
We suggest at least one resource be added.
Resources that are currently supported are Deployments, StatefulSets, Services, Ingresses and PersistentVolumeClaims.

## Application Manifest File

To add an informer, include the `statusInformers` property in the Application custom resource manifest file.
Status informers are in the format `[namespace/]type/name` where namespace is optional and will default to the current namespace.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  statusInformers:
    - deployment/my-web-svc
    - deployment/my-worker
```

Entries also support template functions.
For example, a specific status informer can be excluded based on an application config value like so:

```yaml
statusInformers:
    - deployment/my-web-svc
    - '{{repl if ConfigOptionEquals "option" "value"}}deployment/my-worker{{repl else}}{{repl end}}'
```

## Resource Statuses

Possible application statuses are "Missing", "Unavailable", "Degraded", "Ready" and "Updating".

"Missing" is a special status indicating that informers have yet to report back their status. Users can click the Details link next to the status in the admin console to see which services are missing.

If a user is on version 1.50.2 or earlier, they can either upgrade their version to use the Details link or view the diagnostic information in the `kots/admin_console/kotsadm-/kotsadm.log` in the support bundle. For more information about generating a support bundle, see [Troubleshooting an Application](../enterprise/troubleshooting-an-app).

Below is a table of resources that are supported and conditions that contribute to each status:

| | Unavailable | Degraded | Ready | Updating |
|---|---|---|---|---|
| **Deployment** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **StatefulSet** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas | The deployed replicas are from a different revision |
| **Service** | No endpoints are ready, no load balancer has been assigned | At least one endpoint is ready and less than desired | All desired endpoints are ready, any load balancers have been assigned | n/a |
| **Ingress** | No backend service endpoints are ready, no load balancer has been assigned | At least one backend service endpoint is ready and less than desired | All desired backend service endpoints are ready, any load balancers have been assigned | n/a |
| **PersistentVolumeClaim** | Claim is pending or lost | n/a | Claim is bound | n/a |
