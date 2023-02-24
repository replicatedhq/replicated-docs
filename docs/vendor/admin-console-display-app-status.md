import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"

# Displaying Application Status

This topic describes how to use status informers to display the status of an application instance in the Replicated admin console.

## About Status Informers

You can configure the Application custom resource to display application status on the dashboard of the admin console.

The following shows an example of how an Unavailable status displays on the admin console dashboard:

<img src="/images/kotsadm-dashboard-appstatus.png" alt="Unavailable status on the admin console dashboard" width="500px"/>

To display application status on the admin console dashboard, you add one or more _status informers_. Status informers are supported Kubernetes resources for your application that you add to the `statusInformers` property of the Application custom resource manifest file. The app manager watches all Kubernetes resources that you add for changes in state.

Because status informers can help users diagnose and troubleshoot problems with their application instance, Replicated recommends that you add at least one resource to the `statusInformers` property for the app manager to watch. For more information, see [Add Status Informers](#add-status-informers) below.

The following resource types are supported for displaying application status:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims (PVC)
* DaemonSet

You can target resources of the supported types that are deployed in any of the following ways:

* Deployed directly by the Replicated app manager.
* Deployed by a Kubernetes Operator that is deployed by the app manager. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about).
* Deployed by Helm. For more information, see [Helm Overview](helm-overview).

### Resource Statuses

The Replicated app manager records the status of each Kubernetes resource that you add to the `statusInformers` property. Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

When you add more than one Kubernetes resource to the `statusInformers` property, the app manager aggregates all resource statuses to display a single application status on the admin console dashboard.

The app manager uses the least available resource status to represent the aggregate application status. For example, if at least one resource has an Unavailable status, then the aggregate application status is Unavailable.

<AggregateStatus/>

## Add Status Informers

To add a status informer, include the `statusInformers` property in the Application custom resource manifest file.
Status informers are in the format `[namespace/]type/name`, where namespace is optional and defaults to the current namespace.

**Example**:

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

The `statusInformers` property also supports template functions. Using template functions allows you to include or exclude a status informer based on a customer-provided configuration value:

**Example**:

```yaml
statusInformers:
  - deployment/my-web-svc
  - '{{repl if ConfigOptionEquals "option" "value"}}deployment/my-worker{{repl else}}{{repl end}}'
```

In the example above, the `deployment/my-worker` status informer is excluded unless the statement in the `ConfigOptionEquals` template function evaluates to true.

For more information about using template functions in application manifest files, see [About Template Functions](/reference/template-functions-about).
