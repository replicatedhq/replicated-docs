# Application

The Application custom resource enables features such as branding, release notes, port forwarding, dashboard buttons, app status indicators, and custom graphs.

There is some overlap between the Application custom resource manifest file and the [Kubernetes SIG Application custom resource](https://github.com/kubernetes-sigs/application/blob/master/docs/api.md). For example, enabling features such as [adding a button to the dashboard](/vendor/admin-console-adding-buttons-links) requires the use of both the Application and SIG Application custom resources.

The following is an example manifest file for the Application custom resource:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: https://support.io/img/logo.png
  releaseNotes: These are our release notes
  allowRollback: false
  targetKotsVersion: "1.60.0"
  minKotsVersion: "1.40.0"
  requireMinimalRBACPrivileges: false
  additionalImages:
    - jenkins/jenkins:lts
  additionalNamespaces:
    - "*"
  ports:
    - serviceName: web
      servicePort: 9000
      localPort: 9000
      applicationUrl: "http://web"
  statusInformers:
    - deployment/my-web-svc
    - deployment/my-worker
  graphs:
    - title: User Signups
      query: 'sum(user_signup_events_total)'
```

## title

<table>
  <tr>
    <th>Description</th>
    <td>The application title. Used on the license upload and in various places in the Replicated Admin Console.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
title: My Application
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>     
</table>

## icon

<table>
  <tr>
    <th>Description</th>
    <td>The icon file for the application. Used on the license upload, in various places in the Admin Console, and in the Download Portal. The icon can be a remote URL or a Base64 encoded image. Base64 encoded images are required to display the image in air gap installations with no outbound internet access.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
icon: https://support.io/img/logo.png
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>    
</table>


## releaseNotes

<table>
  <tr>
    <th>Description</th>
    <td>The release notes for this version. These can also be set when promoting a release.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
releaseNotes: Fixes a bug and adds a new feature.
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>    
</table>

## allowRollback

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enable this flag to create a <strong>Rollback</strong> button on the Admin Console Version History page.</p>
      <p>If an application is guaranteed not to introduce backwards-incompatible versions, such as through database migrations, then the <code>allowRollback</code> flag can allow end users to easily roll back to previous versions from the Admin Console.</p>
      <p>Rollback does not revert any state. Rather, it recovers the YAML manifests that are applied to the cluster.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
allowRollback: false
```</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Embedded Cluster 1.17.0 and later supports partial rollbacks of the application version. Partial rollbacks are supported only when rolling back to a version where there is no change to the [Embedded Cluster Config](/reference/embedded-config) compared to the currently-installed version. For example, users can roll back to release version 1.0.0 after upgrading to 1.1.0 only if both 1.0.0 and 1.1.0 use the same Embedded Cluster Config.</td>
  </tr>    
</table>


## additionalNamespaces

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>An array of additional namespaces as strings that Replicated KOTS creates on the cluster. For more information, see <a href="/vendor/operator-defining-additional-namespaces">Defining Additional Namespaces</a>.</p>
      <p>In addition to creating the additional namespaces, KOTS ensures that the application secret exists in the namespaces. KOTS also ensures that this application secret has access to pull the application images, including both images that are used and any images you add in the <code>additionalImages</code> field. This pull secret is automatically added to all manifest files that use private images.</p>
      <p>For dynamically created namespaces, specify <code>"*"</code>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
additionalNamespaces:
    - "*"
```</td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>
</table>

## additionalImages

<table>
  <tr>
    <th>Description</th>
    <td><p>An array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.</p><p>KOTS detects images from the PodSpecs in the application. Some applications, such as Operators, might need to include additional images that are not referenced until runtime. For more information, see <a href="/vendor/operator-defining-additional-images">Defining Additional Images</a>.</p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
additionalImages:
  - jenkins/jenkins:lts
```</td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>   
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr> 
</table>

## requireMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>requireMinimalRBACPrivileges</code> applies to existing clusters only.</p><p>Requires minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, KOTS creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p><p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring KOTS RBAC</em>.</p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
requireMinimalRBACPrivileges: false
```</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>No</td>
  </tr>
</table>

## supportMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>supportMinimalRBACPrivileges</code> applies to existing clusters only.</p><p>Allows minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, KOTS supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p><p> Minimal RBAC is not used by default. It is only used when the <code>--use-minimal-rbac</code> flag is passed to the <code>kots install</code> command.</p><p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring KOTS RBAC</em>.</p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
supportMinimalRBACPrivileges: true
```</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>No</td>
  </tr>
</table>

## ports

<table>
<tr>
    <th>Description</th>
    <td>
      <p>Extra ports (additional to the <code>8800</code> Admin Console port) that are port-forwarded when running the <code>kubectl kots admin-console</code> command. With ports specified, KOTS can establish port forwarding to simplify connections to the deployed application. When the application starts and the service is ready, the KOTS CLI will print a message in the terminal with the URL where the port-forwarded service can be accessed. For more information, see <a href="/vendor/admin-console-port-forward">Port Forwarding Services with KOTS</a>.</p>
      :::note
KOTS does not automatically create port forwards for installations on VMs or bare metal servers with Replicated Embedded Cluster or Replicated kURL. This is because it cannot be verified that the ports are secure and authenticated. Instead, Embedded Cluster or kURL creates a NodePort service to make the Admin Console accessible on a port on the node (port `8800` for kURL or port `30000` for Embedded Cluster). 

You can expose additional ports on the node for Embedded Cluster or kURL installations by creating NodePort services. For more information, see [Exposing Services Using NodePorts](/vendor/kurl-nodeport-services).
:::
      <p>The <code>ports</code> key has the following fields:</p>
      <ul>
        <li><code>ports.serviceName</code>: The name of the service that receives the traffic.</li>
        <li><p><code>ports.servicePort</code>: The <code>containerPort</code> of the Pod where the service is running.</p></li>
        :::note
Ensure that you use the `containerPort` and not the `servicePort`. The `containerPort` and `servicePort` are often the same port, though it is possible that they are different. 
:::
        <li><code>ports.localPort</code>: The port to map on the local workstation.</li>
        <li><p>(Optional) <code>ports.applicationUrl</code>: When set to the same URL that is specified in the `descriptor.links.url` field of the Kubernetes SIG Application custom resource, KOTS adds a link on the Admin Console dashboard where the given service can be accessed. This process automatically links to the hostname in the browser (where the Admin Console is being accessed) and appends the specified `localPort`.</p><p>If not set, then the URL defined in the `descriptor.links.url` field of the Kubernetes SIG Application is linked on the Admin Console dashboard.</p></li>
        For more information about adding links to port forwarded services, see <a href="/vendor/admin-console-port-forward#add-link">Add a Link to a Port-Forwarded Service in the Admin Console</a>.
      </ul> 
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
ports:
  - serviceName: web
    servicePort: 9000
    localPort: 9000
    applicationUrl: "http://web"
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td><p>Go templates are supported in the `serviceName` and `applicationUrl` fields only.</p><p>Using Go templates in the `localPort` or `servicePort` fields results in an installation error similar to the following: `json: cannot unmarshal string into Go struct field ApplicationPort.spec.ports.servicePort of type int`.</p></td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>
</table>

## statusInformers

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Resources to watch and report application status back to the user. When you include <code>statusInformers</code>, the dashboard can indicate when the application deployment is complete and the application is ready for use.</p>
      <p><code>statusInformers</code> use the format <code>[namespace/]type/name</code>, where namespace is optional.</p>
      <p>For more information about including statusInformers, see <a href="/vendor/admin-console-display-app-status">Adding Resource Status Informers</a>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
statusInformers:
    - deployment/my-web-svc
    - deployment/my-worker
```
The following example shows excluding a specific status informer based on a user-supplied value from the Admin Console Configuration screen:
```yaml
statusInformers:
    - deployment/my-web-svc
    - '{{repl if ConfigOptionEquals "option" "value"}}deployment/my-worker{{repl else}}{{repl end}}'
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>Yes</td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>
</table>

## graphs

<table>
  <tr>
    <th>Description</th>
    <td><p>Custom graphs to include on the Admin Console application dashboard.For more information about how to create custom graphs, see <a href="/vendor/admin-console-prometheus-monitoring">Adding Custom Graphs</a>.</p><p><code>graphs</code> has the following fields:</p><ul><li><code>graphs.title</code>: The graph title.</li><li><code>graphs.query</code>: The Prometheus query.</li><li><code>graphs.legend</code>: The legend to use for the query line. You can use Prometheus templating in the <code>legend</code> fields with each element returned from the Prometheus query. <p>The template escape sequence is `{{}}`. Use `{{ value }}`. For more information, see [Template Reference](https://prometheus.io/docs/prometheus/latest/configuration/template_reference/) in the Prometheus documentation.</p></li><li><code>graphs.queries</code>: A list of queries containing a <code>query</code> and <code>legend</code>.</li>  <li><code>graphs.yAxisFormat</code>: The format of the Y axis labels with support for all Grafana units. For more information, see <a href="https://grafana.com/docs/features/panels/graph/#left-y-right-y">Visualizations</a> in the Grafana documentation.</li><li><code>graphs.yAxisTemplate</code>: Y axis labels template.</li></ul></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
graphs:
    - title: User Signups
      query: 'sum(user_signup_events_total)'
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>
      <p>Yes</p>
    </td>
  </tr>   
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>No</td>
  </tr> 
</table>

## proxyRegistryDomain

:::important
`proxyRegistryDomain` is deprecated. For information about how to use a custom domain for the Replicated proxy registry, see [Use Custom Domains](/vendor/custom-domains-using).
:::

<table>	
  <tr>	
    <th>Description</th>	
    <td><p>The custom domain used for proxy.replicated.com. For more information, see <a href="/vendor/custom-domains-using">Using Custom Domains</a>.</p>	<p>Introduced in KOTS v1.91.1.</p>	</td>	
  </tr>	
  <tr>	
    <th>Example</th>	
    <td>```yaml	
proxyRegistryDomain: "proxy.yourcompany.com"	
```</td>	
  </tr>	
  <tr>	
    <th>Supports Go templates?</th>	
    <td>No</td>	
  </tr>
</table>

## replicatedRegistryDomain

:::important
`replicatedRegistryDomain` is deprecated. For information about how to use a custom domain for the Replicated registry, see [Use Custom Domains](/vendor/custom-domains-using).
:::

<table>	
  <tr>	
    <th>Description</th>	
    <td><p>The custom domain used for registry.replicated.com. For more information, see <a href="/vendor/custom-domains-using">Using Custom Domains</a>.</p><p>Introduced in KOTS v1.91.1.</p>	</td>	
  </tr>	
  <tr>	
    <th>Example</th>	
    <td>```yaml
replicatedRegistryDomain: "registry.yourcompany.com"
```</td>	
  </tr>	
  <tr>	
    <th>Supports Go templates?</th>	
    <td>No</td>	
  </tr>
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>Yes</td>
  </tr>	
</table>

## targetKotsVersion

<table>
  <tr>
    <th>Description</th>
    <td><p>The KOTS version that is targeted by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
targetKotsVersion: "1.85.0"
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>No. Setting <code>targetKotsVersion</code> to a version earlier than the KOTS version included in the specified version of Embedded Cluster will cause Embedded Cluster installations to fail with an error message like: <code>Error: This version of App Name requires a different version of KOTS from what you currently have installed.</code>. To avoid installation failures, do not use <code>targetKotsVersion</code> in releases that support installation with Embedded Cluster.</td>
  </tr>
</table>

## minKotsVersion (Beta)

<table>
  <tr>
    <th>Description</th>
    <td><p>The minimum KOTS version that is required by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td>```yaml
minKotsVersion: "1.71.0"
```</td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>  
  <tr>
    <th>Supported for <a href="/vendor/embedded-overview">Embedded Cluster</a>?</th>
    <td>No. Setting <code>minKotsVersion</code> to a version later than the KOTS version included in the specified version of Embedded Cluster will cause Embedded Cluster installations to fail with an error message like: <code>Error: This version of App Name requires a different version of KOTS from what you currently have installed.</code>. To avoid installation failures, do not use <code>minKotsVersion</code> in releases that support installation with Embedded Cluster.</td>
  </tr>  
</table>