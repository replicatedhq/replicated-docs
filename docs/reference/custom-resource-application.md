import Title from "../partials/custom-resource-application/_title.mdx"
import Icon from "../partials/custom-resource-application/_icon.mdx"
import ReleaseNotes from "../partials/custom-resource-application/_releaseNotes.mdx"
import AllowRollback from "../partials/custom-resource-application/_allowRollback.mdx"
import AdditionalNamespaces from "../partials/custom-resource-application/_additionalNamespaces.mdx"
import AdditionalImages from "../partials/custom-resource-application/_additionalImages.mdx"
import KubectlVersion from "../partials/custom-resource-application/_kubectlVersion.mdx"
import KustomizeVersion from "../partials/custom-resource-application/_kustomizeVersion.mdx"
import RequireMinimalRBACPrivileges from "../partials/custom-resource-application/_requireMinimalRBACPrivileges.mdx"
import SupportMinimalRBACPrivileges from "../partials/custom-resource-application/_supportMinimalRBACPrivileges.mdx"
import Ports from "../partials/custom-resource-application/_ports.mdx"
import StatusInformers from "../partials/custom-resource-application/_statusInformers.mdx"
import Graphs from "../partials/custom-resource-application/_graphs.mdx"
import GraphsTemplates from "../partials/custom-resource-application/_graphs-templates.mdx"
import TargetKotsVersion from "../partials/custom-resource-application/_targetKotsVersion.mdx"
import MinKotsVersion from "../partials/custom-resource-application/_minKotsVersion.mdx"
import ProxyRegistryDomain from "../partials/custom-resource-application/_proxyRegistryDomain.mdx"

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
  kubectlVersion: ">=1.22.0 <1.25.0"
  kustomizeVersion: ">= 4.0.0"
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
    <td>The application title. Used on the license upload and in various places in the Replicated admin console.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Title/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## icon

<table>
  <tr>
    <th>Description</th>
    <td>The icon file for the application. Used on the license upload and in various places in the admin console.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Icon/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
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
    <td><ReleaseNotes/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## allowRollback

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enable this flag to create a <strong>Rollback</strong> button on the admin console Version History page.</p>
      <p>If an application is guaranteed not to introduce backwards-incompatible versions, such as through database migrations, then the <code>allowRollback</code> flag can allow end users to easily roll back to previous versions from the admin console.</p>
      <p>Rollback does not revert any state. Rather, it recovers the YAML manifests that are applied to the cluster.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AllowRollback/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>


## additionalNamespaces

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>An array of additional namespaces as strings that the app manager creates on the cluster. For more information, see <a href="/vendor/operator-defining-additional-namespaces">Defining Additional Namespaces</a>.</p>
      <p>In addition to creating the additional namespaces, the app manager ensures that the application secret exists in the namespaces. The app manager also ensures that this application secret has access to pull the application images, including both images that are used and any images you add in the <code>additionalImages</code> field. This pull secret is automatically added to all manifest files that use private images.</p>
      <p>For dynamically created namespaces, specify <code>"*"</code>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AdditionalNamespaces/></td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## additionalImages

<table>
  <tr>
    <th>Description</th>
    <td><p>An array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.</p>
    <p>The app manager detects images from the PodSpecs in the application. Some applications, such as Operators, might need to include additional images that are not referenced until runtime. For more information, see <a href="/vendor/operator-defining-additional-images">Defining Additional Images</a>.
    </p></td>
  </tr>
  <tr>
    <th>Example</th>
    <td><AdditionalImages/></td>
  </tr>  
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>



## kubectlVersion

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Specifies the version of the kubectl command-line tool that the app manager uses.</p>
      <p>You can specify an optional Semantic Version range for <code>kubectlVersion</code>, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
      <p>If the specified version or range does not match any supported versions, the latest version from the above list of supported versions is used.</p>  
      <p>For backwards compatibility, exact versions are also supported.
      When an exact version is specified, the app manager chooses the matching version if it is supported. If the specific version is not supported, the app manager chooses the latest supported minor and patch version for the specified major version.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><KubectlVersion/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
     <p>When <code>kubectlVersion</code> is unspecified, the app manager uses the latest supported version of kubectl. The following minor versions are supported:</p>
     <ul>
       <li>1.24.x (Added in <a href="/release-notes/rn-app-manager#1710">app manager v1.71.0</a>)</li>
       <li>1.23.x (Added in <a href="/release-notes/rn-app-manager#1610">app manager v1.61.0</a>)</li>
       <li>1.22.x (Added in <a href="/release-notes/rn-app-manager#1593">app manager v1.59.3</a>)</li>
       <li>1.21.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">app manager v1.48.0</a>)</li>
       <li>1.20.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">app manager v1.48.0</a>)</li>
       <li>1.19.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">app manager v1.22.0</a>)</li>
       <li>1.18.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">app manager v1.22.0</a>)</li>
       <li>1.17.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">app manager v1.22.0</a>)</li>
       <li>1.16.x</li>
       <li>1.14.x</li>
     </ul>
    </td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## kustomizeVersion

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Specifies the version of Kustomize that the app manager uses.</p>
    <p>You can specify a Semantic Version range, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
    <p>For backwards compatibility, exact versions are also supported.
    When an exact version is specified, the app manager chooses the matching version if it is supported. If the specific version is not supported, the app manager chooses the latest supported minor and patch version for the specified major version.</p>
      </td>
  </tr>
  <tr>
  <th>Example</th>
    <td>
      <KustomizeVersion/>   
    </td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
      <p>When <code>kustomizeVersion</code> is unspecified, the app manager uses the latest supported version of Kustomize.</p>
      <p>The following major versions of Kustomize are supported:</p>
      <ul>
        <li>4.x.x.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## requireMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>requireMinimalRBACPrivileges</code> applies to existing clusters only.</p>
    <p>Requires minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, the app manager creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring App Manager RBAC</em>.</p>
      </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><RequireMinimalRBACPrivileges/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## supportMinimalRBACPrivileges

<table>
  <tr>
    <th>Description</th>
    <td><p><code>supportMinimalRBACPrivileges</code> applies to existing clusters only.</p>
    <p>Allows minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, the app manager supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p> Minimal RBAC is not used by default. It is only used when the <code>--use-minimal-rbac</code> flag is passed to the <code>kots install</code> command.</p>
    <p>For additional requirements and limitations related to using namespace-scoped RBAC, see <a href="/vendor/packaging-rbac#min-rbac">About Namespace-scoped RBAC</a> in <em>Configuring App Manager RBAC</em>.</p>
      </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><SupportMinimalRBACPrivileges/></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## ports

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Extra ports (additional to the :8800 admin console port) that are port-forwarded when running the <code>kots admin-console</code> command. With ports specified, the kots CLI can establish port-forwarding to simplify connections to the deployed application.</p>
      <p>You can use the <code>ports</code> field to create a port-forward to a service that has a <code>ClusterIP</code> type. For clusters provisioned by the Kubernetes installer, you can also create a custom link to a service that has a <code>NodePort</code> type.</p>
      <p>For more information about configuring a custom link in Kubernetes installer clusters to a <code>NodePort</code> type service, see <a href="/vendor/admin-console-adding-buttons-links">Adding Buttons and Links</a>.</p>
      <p><code>ports</code> has the following fields:</p>
      <ul>
        <li><code>ports.serviceName</code>: The name of the service that has a <code>ClusterIP</code> type or <code>NodePort</code> type if using the Kubernetes installer, that receives the traffic.</li>
        <li><code>ports.servicePort</code>: The <code>ClusterIP</code> port to forward traffic.</li>
        <li><code>ports.localPort</code>: If set, the port to map on the local workstation.
        If not set, this is the same as <code>servicePort</code>.</li>
        <li><code>ports.applicationUrl</code>: Must match a service found in the <code>k8s.io</code> Application manifest.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Ports/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## statusInformers

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Resources to watch and report application status back to the user. When you include <code>statusInformers</code>, the dashboard can indicate when the application deployment is complete and the application is ready for use.</p>
      <p><code>statusInformers</code> use the format <code>[namespace/]type/name</code>, where namespace is optional.</p>
      <p>For more information about including statusInformers, see <a href="/vendor/admin-console-display-app-status">Displaying Application Status</a>.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><StatusInformers/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>Yes</td>
  </tr>    
</table>

## graphs

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>
      Custom graphs to include on the admin console application dashboard.
      For more information about how to create custom graphs,
      see <a href="/vendor/admin-console-prometheus-monitoring">Adding Custom Graphs</a>.</p>
      <p><code>graphs</code> has the following fields:</p>
      <ul>
        <li><code>graphs.title</code>: The graph title.</li>
        <li><code>graphs.query</code>: The Prometheus query.</li>
        <li><code>graphs.legend</code>: The legend to use for the query line. You can use Prometheus templating in the <code>legend</code> fields with each element returned from the Prometheus query. <p><GraphsTemplates/></p></li>
        <li><code>graphs.queries</code>: A list of queries containing a <code>query</code> and <code>legend</code>.
        </li>  
        <li><code>graphs.yAxisFormat</code>: The format of the Y axis labels with support for all Grafana units. For more information, see <a href="https://grafana.com/docs/features/panels/graph/#left-y-right-y">Visualizations</a> in the Grafana documentation.</li>
        <li><code>graphs.yAxisTemplate</code>: Y axis labels template.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><Graphs/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>
      <p>Yes</p>
    </td>
  </tr>    
</table>

## proxyRegistryDomain
<table>
  <tr>
    <th>Description</th>
    <td>
      <p>The custom domain used for proxy.replicated.com. For more information, see <a href="/vendor/custom-domains#registry">Custom Registry Domains</a>.</p>
      <p>Introduced in app manager v1.91.1.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><ProxyRegistryDomain/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>
</table>

## targetKotsVersion

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>The app manager (KOTS) version that is targeted by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p>
      <p>Introduced in app manager v1.62.0.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><TargetKotsVersion/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

## minKotsVersion (Beta)

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>The minimum app manager (KOTS) version that is required by the release. For more information, see <a href="/vendor/packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p>
      <p>Introduced in app manager v1.62.0.</p>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><MinKotsVersion/></td>
  </tr>
  <tr>
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>
