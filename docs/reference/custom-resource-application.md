# Application

The Application custom resource enables features such as branding, release notes, port forwarding, dashboard buttons, app status indicators, and custom graphs.

With ports specified, the kots CLI can establish port-forwarding to simplify connections to the deployed application.  
When [statusInformers](../vendor/admin-console-display-app-status) are specified, the dashboard can provide timely feedback when the application deployment is complete and the application is ready for use.

The Application custom resource is optional.

**Note**: There is some overlap between the Application custom resource manifest file and the [Kubernetes SIG Application manifest](https://github.com/kubernetes-sigs/application#application-objects). Enabling features such as [adding a button to the dashboard](../vendor/admin-console-adding-buttons-links) requires the use of both the Application and SIG Application custom resources.

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
  kubectlVersion: latest
  kustomizeVersion: latest
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
The application title. This will be used on the license upload and in various places in the Replicated admin console.

## icon
The icon file for the application. This will be used on the license upload and in various places in the admin console.

## releaseNotes
The release notes for this version. These can also be set when promoting a release.

## allowRollback
This defaults to `false`. Enable this flag to create a Rollback button on the end-customer Version History page. If an application is guaranteed not to introduce backwards-incompatible versions (such as through database migrations), the `allowRollback` flag can allow end users to easily roll back to previous versions. This will not revert any state, just the YAML manifests that are applied to the cluster.

## additionalNamespaces
An optional array of namespaces as strings.
In addition to creating these namespaces, the admin console ensures that the application secret exists in them, and that this secret has access to pull the application images (both images that are used and [`additionalImages`](../vendor/operator-defining-additional-images)).
For access to dynamically created namespaces, `"*"` can be specified.
This pull secret will be automatically added to all application specs that use private images.
For more information, see [Defining additional namespaces](../vendor/operator-defining-additional-namespaces).

## additionalImages
An optional array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.
While the Replicated app manager detects images from the PodSpecs in the application, some applications (Operators) may need to include additional images that will not be referenced until runtime.

## kubectlVersion
The app manager maintains up-to-date patch versions of all supported kubelet minor versions.
When unspecified, the app manager uses the newest version from the list of supported versions below.

- 1.23.x (added in [App manager 1.61.0](https://kots.io/release-notes/1.61.0/))
- 1.22.x (added in [App manager 1.59.3](https://kots.io/release-notes/1.59.3/))
- 1.21.x (added in [App manager 1.48.0](https://kots.io/release-notes/1.48.0/))
- 1.20.x (added in [App manager 1.48.0](https://kots.io/release-notes/1.48.0/))
- 1.19.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.18.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.17.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.16.x
- 1.14.x

An optional Semantic Versioning (SemVer) range can be specified, as defined in [blang SemVer range](https://github.com/blang/semver#ranges) (like `1.16.x` or `>=1.16.0 <1.17.0`).
The latest version within the provided range will be used.
If the specified version or range does not match any supported versions, the latest version from the above list will be used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager will choose the matching major and minor version.

## kustomizeVersion
The app manager maintains up-to-date minor and patch versions of all supported Kustomize major versions.
When unspecified, the app manager will use the newest version from the list of supported versions below.

- 3.x.x

An optional SemVer range can be specified, as defined in [blang SemVer range](https://github.com/blang/semver#ranges) (like `3.x.x` or `>=3.0.0 <4.0.0`).
The latest version within the provided range will be used.
If the specified version or range does not match any supported versions, the latest version from the above list will be used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager will choose the matching major and minor version.

## requireMinimalRBACPrivileges

This option is applicable to existing clusters only.

Allows minimal role-based access control (RBAC) to be used for all customer installations. When set to `true`, the app manager creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding. For more information about RBAC, see [Namespace-scoped Access](../vendor/packaging-rbac/#namespace-scoped-access) in _Configuring Role-based Access Control_.

When installing with minimal role-based access control (RBAC), the app manager recognizes if the preflight checks failed due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that can be run manually in the cluster to run the preflight checks. When the command runs and completes, the results are automatically uploaded to the app manager.

**Example: `kubectl preflight` command**

```bash
curl https://krew.sh/preflight | bash
kubectl preflight secret/<namespace>/kotsadm-<appslug>-preflight
```

## supportsMinimalRBACPrivileges

This option is applicable to existing clusters only.

Allows minimal role-based access control (RBAC) to be used for a subset of customer installations. When set to `true`, the app manager supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding. Minimal RBAC will not be used by default. It will only be used when the `--use-minimal-rbac` flag is passed to the `kots install` command. For more information about RBAC, see [Namespace-scoped Access](../vendor/packaging-rbac/#namespace-scoped-access) in _Configuring Role-based Access Control_.

When installing with minimal role-based access control (RBAC), the app manager recognizes if the preflight checks failed due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that can be run manually in the cluster to run the preflight checks. When the command runs and completes, the results are automatically uploaded to the app manager.

**Example: `kubectl preflight` command**

```bash
curl https://krew.sh/preflight | bash
kubectl preflight secret/<namespace>/kotsadm-<appslug>-preflight
```

## ports
These are extra ports (additional to the :8800 admin console port) that should be port-forwarded when running the `kots admin-console` command.

### serviceName
The name of the service that has a `ClusterIP` type that should receive the traffic.

### servicePort
The `ClusterIP` port to forward traffic to.

### localPort
If set, the port to map on the local workstation.
If not set, this will be the same as `servicePort`.

### applicationUrl
This should match a service found in the `k8s.io` Application spec.

## statusInformers
Resources to watch and report application status back to the user.
In the format `[namespace/]type/name` where namespace is optional.
Entries support template functions.
For example, a specific status informer can be excluded based on an application config value like so:

```yaml
statusInformers:
    - deployment/my-web-svc
    - '{{repl if ConfigOptionEquals "option" "value"}}deployment/my-worker{{repl else}}{{repl end}}'
```

## graphs
Custom graphs to include on your admin console application dashboard.

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

## targetKotsVersion
The KOTS version that is targeted by the release.

>Introduced in app manager v1.62.0.

:::note
The app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.
:::

Including `targetKotsVersion` in the Application manifest file of the release enforces compatibility checks for new installations and blocks the installation if the version used is later than the target version.

If the latest release in a channel includes `targetKotsVersion`, the install command for existing clusters is modified to install that specific version of KOTS. The install command for existing clusters is on the channel card in the [vendor portal](https://vendor.replicated.com).

Specifying a `targetKotsVersion` does not prevent an end user from upgrading to a later version of KOTS after the initial installation.

If a new version of the application specifies a later target KOTS version than what is currently installed, the end user is not prevented from deploying that version of the application.

If an end-user's admin console is running a version of KOTS that is earlier than the target version specified in the new version of the application, the admin console displays a message in the footer to indicate that a newer supported version of KOTS is available.

For installations onto a cluster created by the Replicated Kubernetes installer, the version of the KOTS add-on must not be later than the target KOTS version specified in the Application manifest. If the KOTS add-on version is later than the version specified for `targetKotsVersion`, the initial installation fails.

For more information about the KOTS add-on, see [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

## minKotsVersion (Beta)

The minimum KOTS version that is required by the release.

>Introduced in app manager v1.62.0.

Including `minKotsVersion` in the Application manifest file enforces compatibility checks for both new installations and application updates. It also blocks installation or update if the current deployed KOTS version is earlier than the `minKotsVersion`. For more information, see [How the Admin Console Handles minKotsVersion](#how-the-admin-console-handles-minkotsversion) below.

:::note
The app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.
:::

### How the Admin Console Handles minKotsVersion

When you promote a new release that specifies a minimum KOTS version later than what a user currently has deployed, that application version appears in the version history of the admin console after the user checks for updates. However, it is not downloaded.

The admin console temporarily displays an error message that informs the user that they must update KOTS in order to download the application version. This error also displays when the user checks for updates with the [`kots upstream upgrade`](kots-cli-upstream-upgrade) command.

Users must update their admin console to the minimum KOTS version or later in order to download the application version without error. KOTS cannot update itself automatically, and users cannot update KOTS from the admin console.

After updating KOTS to the minimum version or later, users can return to the admin console and click **Download** next to the version in order to download the release. Alternatively, they can use the [`kots upstream download`](kots-cli-upstream-download) command.

:::note
When you promote a new release that changes the minimum KOTS version to a later version, you can also inform your users directly of the need to update KOTS if you are not certain that they will know how to proceed based on the error message in the admin console.
:::
