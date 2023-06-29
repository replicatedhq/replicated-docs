import StatusesTable from "../partials/status-informers/_statusesTable.mdx"
import AggregateStatus from "../partials/status-informers/_aggregateStatus.mdx"
import AggregateStatusIntro from "../partials/status-informers/_aggregate-status-intro.mdx"
import SupportedResources from "../partials/instance-insights/_supported-resources-status.mdx"

# Adding Resource Status Informers

This topic describes how to add Kubernetes resources for your application as status informers.

## About Status Informers

_Status informers_ are supported Kubernetes resources for your application that you add to the `statusInformers` property in the Replicated Application custom resource. Replicated KOTS watches all resources that you add as status informers for changes in state.

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing. For more information, see [Understanding Application Status](#understanding-application-status) below.

When you one or more status informers to your application, KOTS automatically does the following:

* Displays application status for your users on the dashboard of the admin console. This can help users diagnose and troubleshoot problems with their instance. The following shows an example of how an Unavailable status displays on the admin console dashboard:

   <img src="/images/kotsadm-dashboard-appstatus.png" alt="Unavailable status on the admin console dashboard" width="500px"/>

* Sends application status data to the vendor portal. This is useful for viewing insights on instances of your application running in customer environments, such as the current status and the average uptime. For more information, see [Instance Details](instance-insights-details).

   The following shows an example of the vendor portal **Instance details** page with data about the status of an instance over time:

   <img src="/images/instance-details.png" alt="Instance details full page" width="700px"/>

   [View a larger version of this image](/images/instance-details.png)
## Add Status Informers

To create status informers for your application, add one or more supported resource types to the `statusInformers` property in the Application custom resource. See [`statusInformers`](/reference/custom-resource-application#statusinformers) in _Application_.

<SupportedResources/>

You can target resources of the supported types that are deployed in any of the following ways:

* Deployed by KOTS.
* Deployed by a Kubernetes Operator that is deployed by KOTS. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about).
* Deployed by Helm. For more information, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

### Examples

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

## Understanding Application Status

This section provides information about how Replicated interprets and aggregates the status of Kubernetes resources for your application to report an application status.

### Resource Statuses

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing.

The following table lists the supported Kubernetes resources and the conditions that contribute to each status:

<StatusesTable/>

### Aggregate Application Status

<AggregateStatusIntro/>

<AggregateStatus/>