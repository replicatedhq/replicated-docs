# Application

The Application custom resource enables features such as branding, release notes, port forwarding, dashboard buttons, app status indicators, and custom graphs. The Application custom resource is defined in the `application.yaml` manifest file.

With ports specified, the kots CLI can establish port-forwarding to simplify connections to the deployed application.  
When [statusInformers](admin-console-display-app-status) are specified, the dashboard can provide timely feedback when the application deployment is complete and the application is ready for use.
This custom resource is optional for applications.

**Note**: There is some overlap between the `application.yaml` manifest file and the [Kubernetes SIG Application manifest](https://github.com/kubernetes-sigs/application#application-objects). Enabling features such as [adding a button to the dashboard](admin-console-port-forwarding#add-a-button-to-the-dashboard) requires the use of both the Application and SIG Application custom resources.

The `application.yaml` manifest contains vendor-supplied metadata about the application.

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
This defaults to `false`. Enable to create a "Rollback" button on the end-customer Version History page.

## additionalNamespaces
An optional array of namespaces as strings.
In addition to creating these namespaces, the admin console ensures that the application secret exists in them, and that this secret has access to pull the application images (both images that are used and [`additionalImages`](operator-defining-additional-images)).
For access to dynamically created namespaces, `"*"` can be specified.
This pull secret will be automatically added to all application specs that use private images.
For more information, see [Defining additional namespaces](operator-defining-additional-namespaces).

## additionalImages
An optional array of strings that reference images to be included in air gap bundles and pushed to the local registry during installation.
While the Replicated app manager detects images from the PodSpecs in the application, some applications (Operators) may need to include additional images that will not be referenced until runtime.

## kubectlVersion
The app manager maintains up-to-date patch versions of all supported kubelet minor versions.
When unspecified, the app manager uses the newest version from the list of supported versions below.

- 1.21.x (added in [App manager 1.48.0](https://kots.io/release-notes/1.48.0/))
- 1.20.x (added in [App manager 1.48.0](https://kots.io/release-notes/1.48.0/))
- 1.19.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.18.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.17.x (added in [App manager 1.22.0](https://kots.io/release-notes/1.22.0/))
- 1.16.x
- 1.14.x

An optional semver range can be specified, as defined in [blang semver range](https://github.com/blang/semver#ranges) (like `1.16.x` or `>=1.16.0 <1.17.0`).
The latest version within the provided range will be used.
If the specified version or range does not match any supported versions, the latest version from the above list will be used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager will choose the matching major and minor version.

## kustomizeVersion
The app manager maintains up-to-date minor and patch versions of all supported Kustomize major versions.
When unspecified, the app manager will use the newest version from the list of supported versions below.

- 3.x.x

An optional semver range can be specified, as defined in [blang semver range](https://github.com/blang/semver#ranges) (like `3.x.x` or `>=3.0.0 <4.0.0`).
The latest version within the provided range will be used.
If the specified version or range does not match any supported versions, the latest version from the above list will be used.

For backwards compatibility, exact versions are also supported.
When an exact version is specified, the app manager will choose the matching major and minor version.

## requireMinimalRBACPrivileges
When set to true, this will instruct the app manager to create a namespace-scoped Role and RoleBinding, instead of the default cluster-scoped ClusterRole and ClusterRoleBinding.
For more information, see the [RBAC](packaging-rbac) documentation.

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
