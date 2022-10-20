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
import TargetKotsVersion from "../partials/custom-resource-application/_targetKotsVersion.mdx"
import MinKotsVersion from "../partials/custom-resource-application/_minKotsVersion.mdx"

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
    <th>Desription</th>
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
    <th>Desription</th>
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
    <th>Desription</th>
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
    <th>Desription</th>
    <td><p>Enable this flag to create a Rollback button on the admin console Version History page.</p> <p>If an application is guaranteed not to introduce backwards-incompatible versions (such as through database migrations), the <code>allowRollback</code> flag can allow end users to easily roll back to previous versions. This does not revert any state, just the YAML manifests that are applied to the cluster.</p></td>
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
    <th>Desription</th>
    <td><p>An optional array of additional namespaces as strings. The app manager creates the additional namespaces that you provide in this field. For more information, see <a href="/vendor/operator-defining-additional-namespaces">Defining Additional Namespaces</a>.</p>
    <p>In addition to creating these namespaces, the app manager ensures that the application secret exists in the namespaces. The app manager also ensures that this application secret has access to pull the application images, including both images that are used and any images you add in the <code>additionalImages</code> field. See <a href="/vendor/operator-defining-additional-images">Defining Additional Images</a>.</p>
    <p>For access to dynamically created namespaces, you can specify <code>"*"</code>.
    This pull secret is automatically added to all application specs that use private images.
    </p></td>
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
    <th>Desription</th>
    <td><p>An optional array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.</p>
    <p>While the Replicated app manager detects images from the PodSpecs in the application, some applications (Operators) may need to include additional images that will not be referenced until runtime. For more information, see <a href="/vendor/operator-defining-additional-images">Defining Additional Images</a>.
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
    <th>Desription</th>
    <td><p>The app manager maintains up-to-date patch versions of all kubectl minor versions that the app manager supports.When unspecified, the app manager uses the latest supported version. The following minor versions are supported.
    </p>
      <ul>
        <li>1.24.x (Added in <a href="/release-notes/rn-app-manager#1710">App manager 1.71.0</a>)</li>
        <li>1.23.x (Added in <a href="/release-notes/rn-app-manager#1610">App manager 1.61.0</a>)</li>
        <li>1.22.x (Added in <a href="/release-notes/rn-app-manager#1593">App manager 1.59.3</a>)</li>
        <li>1.21.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">App manager 1.48.0</a>)</li>
        <li>1.20.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">App manager 1.48.0</a>)</li>
        <li>1.19.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">App manager 1.22.0</a>)</li>
        <li>1.18.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">App manager 1.22.0</a>)</li>
        <li>1.17.x (Added in <a href="/release-notes/rn-app-manager#1570-and-earlier">App manager 1.22.0</a>)</li>
        <li>1.16.x</li>
        <li>1.14.x</li>
      </ul>
    <p>You can specify an optional Semantic Version range, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
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
    <th>Supports Go templates?</th>
    <td>No</td>
  </tr>    
</table>

<!-- <code>kubectlVersion: >=1.22.0 <1.25.0</code> -->

## kustomizeVersion

<table>
  <tr>
    <th>Desription</th>
    <td><p>The app manager maintains up-to-date minor and patch versions of all Kustomize major versions that the app manager supports.
    When unspecified, the app manager uses the latest supported version.
    <p>The following major versions are supported: 4.x.x.</p>
    </p>
    <p>You can specify an optional Semantic Version range, as defined by blang. See <a href="https://github.com/blang/semver#ranges">Ranges</a> in the blang GitHub repository. The latest supported version in the provided range is used.</p>
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
      When unspecified, the app manager uses the latest supported version.
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
    <th>Desription</th>
    <td><p>This option is applicable to existing clusters only.</p>
    <p>Requires minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, the app manager creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p>For more information about RBAC, see <a href="/vendor/packaging-rbac/#namespace-scoped-access">Namespace-scoped Access</a> in <em>Configuring Role-based Access Control</em>.</p>
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
    <th>Desription</th>
    <td><p>This option is applicable to existing clusters only.</p>
    <p>Allows minimal role-based access control (RBAC) be used for all customer installations. When set to <code>true</code>, the app manager supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.</p>
    <p> Minimal RBAC is not used by default. It is only used when the <code>--use-minimal-rbac</code> flag is passed to the <code>kots install</code> command. For more information about RBAC, see <a href="/vendor/packaging-rbac/#namespace-scoped-access">Namespace-scoped Access</a> in <em>Configuring Role-based Access Control</em>.</p>
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
    <th>Desription</th>
    <td>
      <p>These are extra ports (additional to the :8800 admin console port) that are port-forwarded when running the <code>kots admin-console</code> command. With ports specified, the kots CLI can establish port-forwarding to simplify connections to the deployed application.</p>
      <p>You can use the <code>ports</code> field to create a port-forward to a service that has a <code>ClusterIP</code> type. For clusters provisioned by the Kubernetes installer, you can also create a custom link to a service that has a <code>NodePort</code> type.</p>
      <p>For more information about configuring a custom link in Kubernetes installer clusters to a <code>NodePort</code> type service, see <a href="/vendor/admin-console-adding-buttons-links">Adding Buttons and Links</a>.</p>
      <p>The <code>ports</code> field has the following properties:</p>
      <ul>
        <li><code>ports.serviceName</code>: The name of the service that has a `ClusterIP` type or `NodePort` type if using the Kubernetes installer, that should receive the traffic.</li>
        <li><code>ports.servicePort</code>: The `ClusterIP` port to forward traffic to.</li>
        <li><code>ports.localPort</code>: If set, the port to map on the local workstation.
        If not set, this will be the same as `servicePort`.</li>
        <li><code>ports.applicationUrl</code>: This should match a service found in the `k8s.io` Application spec.</li>
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
    <th>Desription</th>
    <td>
      <p>Resources to watch and report application status back to the user.
      In the format <code>[namespace/]type/name</code> where namespace is optional.
      Entries support template functions.</p>
      <p>When [statusInformers](../vendor/admin-console-display-app-status) are specified, the dashboard can provide timely feedback when the application deployment is complete and the application is ready for use.</p>
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
Custom graphs to include on your admin console application dashboard.
Entries support template functions.

### title
The graph title.

### query
The Prometheus query.

### legend
The legend to use for the query line.
Can be templated with each element returned from the Prometheus query.
Template escape sequence is `{{}}`.

### queries
A list of queries containing a query and legend.
- query: The Prometheus query
- legend: The legend to use for the query line.
Can be templated with each element returned from the Prometheus query.
Template escape sequence is `{{}}`.

### yAxisFormat
The format of the Y axis labels with support for all Grafana [units](https://grafana.com/docs/features/panels/graph/#left-y-right-y).

### yAxisTemplate
Y axis labels template. Use `{{ value }}`.

<Graphs/>

## targetKotsVersion

<table>
  <tr>
    <th>Desription</th>
    <td>
      <p>The KOTS version that is targeted by the release. For more information, see [Setting Minimum and Target Versions for KOTS](../vendor/packaging-kots-versions).</p>
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
    <th>Desription</th>
    <td>
      <p>The minimum KOTS version that is required by the release. For more information, see [Setting Minimum and Target Versions for KOTS](../vendor/packaging-kots-versions).</p>
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
