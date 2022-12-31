import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import MissingState from "../partials/status-informers/_missing.mdx"

# Displaying Application Status

This topic describes how to use status informers to display the status of an application instance in the Replicated admin console.

## About Status Informers

You can configure the Application custom resource to display application status on the dashboard of the admin console.

The following shows an example of how an Unavailable state displays on the admin console dashboard:

<img src="/images/kotsadm-dashboard-appstatus.png" alt="Unavailable state on the admin console dashboard" width="500px"/>

To display application status on the admin console dashboard, you target specific Kubernetes resources for your application in the `statusInformers` property of the Application custom resource manifest file. See [Add Status Informers](#add-status-informers) below.

The following resource types are supported for displaying application status:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims

You can target resources of the supported types that are deployed in any of the following ways:

* Deployed directly by the Replicated app manager.
* Deployed by a Kubernetes Operator that is deployed by the app manager. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about).
* Deployed by Helm. For more information, see [Helm Overview](helm-overview).

Replicated recommends that you add at least one resource.

### Resource Statuses

The app manager records the status of each Kubernetes resource that you add to the `statusInformers` property. Possible resource statuses are Missing, Unavailable, Degraded, Ready, and Updating.

<MissingState/>

Below is a table of resources that are supported and conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

When you add more than one Kubernetes resource to the `statusInformers` property, the Replicated app manager aggregates all resource statuses to display a single application status on the admin console dashboard.

The app manager uses the least available resource state to represent the aggregate application status. For example, if at least one resource is in an Unavailable state, then the aggregate application status is Unavailable.

The following table lists the resource statuses the define each aggregate application status:

<table>
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
</table>

## Add Status Informers

To add a status informer, include the `statusInformers` property in the Application custom resource manifest file.
Status informers are in the format `[namespace/]type/name` where namespace is optional and will default to the current namespace.

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
