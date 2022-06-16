# Displaying Application Status

You can configure the Application custom resource to display application status on the dashboard of the Replicated admin console.

![Application Status](/images/kotsadm-dashboard-appstatus.png)

To display application status on the admin console dashboard, you target specific Kubernetes resources for your application in the `statusInformers` property of the Application custom resource manifest file. See [Add Status Informers](#add-status-informers) below.

The following resource types are supported for displaying application status:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims

You can target resources of the supported types that are deployed in any of the following ways:

* Deployed directly by the Replicated app manager.
* Deployed by a Kuberentes Operator that is deployed by the app manager. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about).
* Deployed by Helm v3 using native Helm. For more information, see [Helm Overview](helm-overview).

Replicated recommends that you add at least one resource.

## Add Status Informers

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
