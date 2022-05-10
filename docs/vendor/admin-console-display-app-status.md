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

## Application Statuses

Possible application statuses are "Missing", "Unavailable", "Degraded", "Ready" and "Updating". "Missing" indicates that informers have yet to report back their status.

For more information about resource statuses and the conditions that contribute to each status, see [Resource Statuses](../enterprise/status-viewing-details#resource-statuses) in _Viewing Status Details_.
