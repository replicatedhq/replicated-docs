# Displaying application status

You can configure the Application custom resource to display application status on the dashboard of the admin console.

![Application Status](/images/kotsadm-dashboard-appstatus.png)

It is necessary to target specific Kubernetes resources for the dashboard to accurately report status.
We suggest at least one resource be added.
Resources that are currently supported are Deployments, StatefulSets, Services, Ingresses and PersistentVolumeClaims.

## Application manifest file

To add an informer, include the `statusInformers` property in the `application.yaml` manifest file.
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

Possible application statuses are "Missing", "Unavailable", "Degraded" and "Ready". "Missing" is a special status that indicates that informers have yet to report back status.
A [support bundle](../enterprise/troubleshooting-an-app) will include diagnostic information when state "Missing" is encountered.

Below is a table of resources that are supported and conditions that contribute to each status:

| | Unavailable | Degraded | Ready |
|---|---|---|---|
| **Deployment** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas |
| **StatefulSet** | No replicas are ready | At least 1 replica is ready and less than desired | Ready replicas equals desired replicas |
| **Service** | No endpoints are ready, no load balancer has been assigned | At least one endpoint is ready and less than desired | All desired endpoints are ready, any load balancers have been assigned |
| **Ingress** | No backend service endpoints are ready, no load balancer has been assigned | At least one backend service endpoint is ready and less than desired | All desired backend service endpoints are ready, any load balancers have been assigned |
| **PersistentVolumeClaim** | Claim is pending or lost | n/a | Claim is bound |
