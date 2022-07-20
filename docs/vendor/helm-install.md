# Using Helm to Install an Application (Alpha)

:::note
Allowing customers to install with the Helm CLI is an Alpha feature. To enable this feature on your account, please log in to your [Vendor Portal](https://vendor.replicated.com/support) account and submit a feature request for "Helm CLI Install option".
:::

Some enterprise customers prefer or require a Helm chart to install using the `helm` CLI. This is often because Helm is already approved and the customer has a custom CI pipeline that is compatible with Helm charts. Replicated has introduced Alpha support to enable these customers to use Helm to install your application.

## About Installing with the Helm CLI

When you promote an application to a release channel, Replicated looks at the release and extracts any Helm charts included. These charts are pushed as OCI objects to our built-in private registry at `registry.replicated.com`. The Helm chart is pushed to the _channel_.

For example, if your app is named "app", you create a channel named "nightly", and the release promoted contains a Helm chart with `name: my-chart` in the `Chart.yaml`, then the chart is pushed to `oci://registry.replicated.com/app/nightly/my-chart`. The chart version (tag) is read from the `Chart.yaml`.

This feature supports multiple charts. If your application release contains more than a single chart, all charts are uploaded to the registry.

When a new version of a chart is uploaded, Replicated renders and cache that version for each license when it is pulled the first time.

When a license field changes for a customer, Replicated invalidates all rendered and cached charts. This causes the charts to be rebuilt the next time they are pulled.

The `values.yaml` in your Chart is rendered with the customer provided license. This creates a way to pass custom license fields and other customer-specific data into the `values.yaml` as defaults, and consume them in Helm templates. When Replicated renders the `values.yaml`, it is not assumed to be a valid YAML format in order to allow flow-control and conditional template functions to optionally write some fields to the `values.yaml` file.

## Requirement

Not all applications packaged with Replicated are able to be installed with `helm install`. To use the `helm install` feature, your application must contain one or more Helm charts.

If you want to allow your customers to install your application with `helm install`, Replicated recommends that you package your application using Helm and create a release with your Helm charts. This allows you to package your application one time and deliver with an embedded cluster created by the Kubernetes installer (kURL), the UI-based KOTS method, and the `helm install` method.

## Limitations

The `helm install` method is Alpha and has the following limitations:

* No "last mile" kustomization support. All configuration and customization must be done using Helm.
* No support for `strict` preflights that block application installation. This is because Helm does not automatically run preflight checks. Preflight checks are supported with `helm install`, but your customers must run the preflight checks manually before installing your application.
* No support for air gap installations. Replicated has documented a workaround solution for installing into air gap environments.
* Customer adoption is not reported to the vendor portal.
* This feature supports multiple charts and Replicated does not wrap or provide any special tooling to manage multiple charts. Replicated recommends that you provide installation instructions with sequenced steps for customers to follow to install each chart in the required order.

## About Delivering the Admin Console

To allow your customers to use the Replicated admin console when they install your application using `helm install`, Replicated recommends delivering the admin console as a subchart to your application's chart.

When you include the admin console as a dependency, Replicated injects some Replicated values into the `values.yaml` when the chart is pulled by end customers. These values enable the admin console to authenticate with the registry and check for updates.

It is possible to make the admin-console Helm chart an optional dependency that your customers can exclude.

The following shows the formatting of the values that are injected:

`values.yaml`

```
replicated:
  license_id: abcdef123
```

## About Customer Values and Private Images

Replicated renders template functions in the `values.yaml` for each customer, as the Helm chart is served to the customer. Each customer license logs in with unique credentials, and our registry is able to identify which customer is pulling the chart. The registry does not render the chart, but it replaces your `values.yaml` with a rendered version.

### Example: Delivering Image Pull Secrets for Private Images

`values.yaml`

```
images:
  pullSecrets:
    replicated:
      dockerconfigjson: {{repl LicenseDockerCfg }}
  myapp:
    repository: registry.replicated.com/my-app/my-image
    tag: 0.0.1
    pullPolicy: IfNotPresent
    pullSecret: replicated
```

`templates/imagepullsecret.yaml`

```
{{ if .Values.images.pullSecrets.replicated.dockerconfigjson }}
apiVersion: v1
kind: Secret
metadata:
  name: replicated
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: {{ .Values.images.pullSecrets.replicated.dockerconfigjson }}
{{ end }}
```

`templates/deployment.yaml`

```
        ...
        image: {{ .Values.images.myapp.repository }}{{ .Values.images.myapp.tag }}
        imagePullPolicy: {{ .Values.images.myapp.pullPolicy }}
        {{ if .Values.images.pullSecrets.replicated }}
        imagePullSecrets:
          - name: replicated
        {{ end }}
        name: myapp
        ports:
        - containerPort: 3000
          name: http
```          

### Example: Delivering Custom License Fields

`values.yaml`

```
numSeats: repl{{ LicenseFieldValue "num_seats"}}
```

`templates/deployment.yaml`

```
        ...
        env:
          - name: NUM_SEATS
            value: {{ .Values.numSeats }}
```
