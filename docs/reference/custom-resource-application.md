# Application

The Application custom resource enables features such as branding, release notes, port forwarding, dashboard buttons, app status indicators, and custom graphs.

With ports specified, the kots CLI can establish port-forwarding to simplify connections to the deployed application.  
When [statusInformers](../vendor/admin-console-display-app-status) are specified, the dashboard can provide timely feedback when the application deployment is complete and the application is ready for use.

The Application custom resource is optional.

**Note**: There is some overlap between the Application custom resource manifest file and the [Kubernetes SIG Application custom resource](https://github.com/kubernetes-sigs/application/blob/master/docs/api.md). Enabling features such as [adding a button to the dashboard](/vendor/admin-console-adding-buttons-links) requires the use of both the Application and SIG Application custom resources.

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
The app manager maintains up-to-date patch versions of all kubectl minor versions that the app manager supports.
When unspecified, the app manager uses the latest supported version. The following minor versions are supported.

- 1.24.x (added in [app manager 1.71.0](/release-notes/rn-app-manager#1710))
- 1.23.x (added in [app manager 1.61.0](/release-notes/rn-app-manager#1610))
- 1.22.x (added in [app manager 1.59.3](/release-notes/rn-app-manager#1593))
- 1.21.x (added in [app manager 1.48.0](/release-notes/rn-app-manager#1570-and-earlier))
- 1.20.x (added in [app manager 1.48.0](/release-notes/rn-app-manager#1570-and-earlier))
- 1.19.x (added in [app manager 1.22.0](/release-notes/rn-app-manager#1570-and-earlier))
- 1.18.x (added in [app manager 1.22.0](/release-notes/rn-app-manager#1570-and-earlier))
- 1.17.x (added in [app manager 1.22.0](/release-notes/rn-app-manager#1570-and-earlier))
- 1.16.x
- 1.14.x

An optional semantic version range can be specified, as defined in [blang SemVer range](https://github.com/blang/semver#ranges) (like `1.24.x` or `>=1.22.0 <1.25.0`).
The latest supported version in the provided range is used.
If the specified version or range does not match any supported versions, the latest version from the above list of supported versions is used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager chooses the matching version if it is supported. If the specific version is not supported, the app manager chooses the latest supported minor and patch version for the specified major version.

## kustomizeVersion
The app manager maintains up-to-date minor and patch versions of all Kustomize major versions that the app manager supports.
When unspecified, the app manager uses the latest supported version. The following major versions are supported.

- 4.x.x

An optional semantic version range can be specified, as defined in [blang SemVer range](https://github.com/blang/semver#ranges) (like `4.x.x` or `>=4.0.0 <5.0.0`).
The latest supported version in the provided range is used.
If the specified version or range does not match any supported versions, the latest version from the above list of supported versions is used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager chooses the matching version if it is supported. If the specific version is not supported, the app manager chooses the latest supported minor and patch version for the specified major version.

## requireMinimalRBACPrivileges

This option is applicable to existing clusters only.

Requires minimal role-based access control (RBAC) be used for all customer installations. When set to `true`, the app manager creates a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding. For more information about RBAC, see [Namespace-scoped Access](../vendor/packaging-rbac/#namespace-scoped-access) in _Configuring Role-based Access Control_.

## supportMinimalRBACPrivileges

This option is applicable to existing clusters only.

Allows minimal role-based access control (RBAC) to be used for a subset of customer installations. When set to `true`, the app manager supports creating a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding. Minimal RBAC is not used by default. It is only used when the `--use-minimal-rbac` flag is passed to the `kots install` command. For more information about RBAC, see [Namespace-scoped Access](../vendor/packaging-rbac/#namespace-scoped-access) in _Configuring Role-based Access Control_.

## ports
These are extra ports (additional to the :8800 admin console port) that are port-forwarded when running the `kots admin-console` command.

You can use the `ports` field to create a port-forward to a service that has a `ClusterIP` type. For clusters provisioned by the Kubernetes installer, you can also create a custom link to a service that has a `NodePort` type.

For more information about configuring a custom link in Kubernetes installer clusters to a `NodePort` type service, see [Adding Buttons and Links](/vendor/admin-console-adding-buttons-links).

### serviceName
The name of the service that has a `ClusterIP` type or `NodePort` type if using the Kubernetes installer, that should receive the traffic.

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

## targetKotsVersion

>Introduced in app manager v1.62.0.

The KOTS version that is targeted by the release. For more information, see [Setting Minimum and Target Versions for KOTS](../vendor/packaging-kots-versions).

:::note
The app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.
:::


## minKotsVersion (Beta)

>Introduced in app manager v1.62.0.

The minimum KOTS version that is required by the release. For more information, see [Setting Minimum and Target Versions for KOTS](../vendor/packaging-kots-versions).

:::note
The app manager is based on the KOTS open source project. The KOTS version is the same as the app manager version. For example, KOTS v1.60 is the same as the app manager v1.60.
:::
