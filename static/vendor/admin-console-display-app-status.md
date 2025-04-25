# Add Resource Status Informers

This topic describes how to add status informers for your application. Status informers apply only to applications installed with Replicated KOTS. For information about how to collect application status data for applications installed with Helm, see [Enabling and Understanding Application Status](insights-app-status).

## About Status Informers

_Status informers_ are a feature of KOTS that report on the status of supported Kubernetes resources deployed as part of your application. You enable status informers by listing the target resources under the `statusInformers` property in the Replicated Application custom resource. KOTS watches all of the resources that you add to the `statusInformers` property for changes in state.

Possible resource statuses are Ready, Updating, Degraded, Unavailable, and Missing. For more information, see [Understanding Application Status](#understanding-application-status).

When you one or more status informers to your application, KOTS automatically does the following:

* Displays application status for your users on the dashboard of the Admin Console. This can help users diagnose and troubleshoot problems with their instance. The following shows an example of how an Unavailable status displays on the Admin Console dashboard:

   <img src="/images/kotsadm-dashboard-appstatus.png" alt="Unavailable status on the Admin Console dashboard" width="500px"/>

* Sends application status data to the Vendor Portal. This is useful for viewing insights on instances of your application running in customer environments, such as the current status and the average uptime. For more information, see [Instance Details](instance-insights-details).

   The following shows an example of the Vendor Portal **Instance details** page with data about the status of an instance over time:

   <img src="/images/instance-details.png" alt="Instance details full page" width="700px"/>

   [View a larger version of this image](/images/instance-details.png)
## Add Status Informers

To create status informers for your application, add one or more supported resource types to the `statusInformers` property in the Application custom resource. See [`statusInformers`](/reference/custom-resource-application#statusinformers) in _Application_.

The following resource types are supported:

* Deployment
* StatefulSet
* Service
* Ingress
* PersistentVolumeClaims (PVC)
* DaemonSet

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

<table>
 <tbody>
    <tr>
      <th width="10%"></th>
      <th width="15%">Deployment</th>
      <th width="15%">StatefulSet</th>
      <th width="15%">Service</th>
      <th width="15%">Ingress</th>
      <th width="15%">PVC</th>
      <th width="15%">DaemonSet</th>
    </tr>
    <tr>
    <th>Ready</th>
      <td>Ready replicas equals desired replicas</td>
      <td>Ready replicas equals desired replicas</td>
      <td>All desired endpoints are ready, any load balancers have been assigned</td>
      <td>All desired backend service endpoints are ready, any load balancers have been assigned</td>
      <td>Claim is bound</td>
      <td>Ready daemon pods equals desired scheduled daemon pods</td>
    </tr>
    <tr>
    <th>Updating</th>
      <td>The deployed replicas are from a different revision</td>
      <td>The deployed replicas are from a different revision</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>The deployed daemon pods are from a different revision</td>
    </tr>
    <tr>
      <th>Degraded</th>
      <td>At least 1 replica is ready, but more are desired</td>
      <td>At least 1 replica is ready, but more are desired</td>
      <td>At least one endpoint is ready, but more are desired</td>
      <td>At least one backend service endpoint is ready, but more are desired</td>
      <td>N/A</td>
      <td>At least one daemon pod is ready, but more are desired</td>
    </tr>
    <tr>
      <th>Unavailable</th>
      <td>No replicas are ready</td>
      <td>No replicas are ready</td>
      <td>No endpoints are ready, no load balancer has been assigned</td>
      <td>No backend service endpoints are ready, no load balancer has been assigned</td>
      <td>Claim is pending or lost</td>
      <td>No daemon pods are ready</td>
    </tr>
    <tr>
      <th>Missing</th>
      <td colSpan="6">Missing is an initial deployment status indicating that informers have not reported their status because the application has just been deployed and the underlying resource has not been created yet. After the resource is created, the status changes. However, if a resource changes from another status to Missing, then the resource was either deleted or the informers failed to report a status.</td>
    </tr>
  </tbody>
</table>

### Aggregate Application Status

When you provide more than one Kubernetes resource, Replicated aggregates all resource statuses to display a single application status.

Replicated uses the least available resource status to represent the aggregate application status. For example, if at least one resource has an Unavailable status, then the aggregate application status is Unavailable.

The following table describes the resource statuses that define each aggregate application status:

<table>
  <tbody>
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
  </tbody>
</table>