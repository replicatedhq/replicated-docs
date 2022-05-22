# Using Helm to install

:::note
This is a beta feature. To enable this feature on your account, please contact your customer success representative.
:::

Some customers prefer or even require a Helm chart to install using the `helm` CLI. This is often because Helm is already approved and the customer has a custom CI pipeline that's compatible with Helm charts. Replicated has introduced beta support to enable these customers to use Helm to install your application.

## Requirements

Not all KOTS applications are compatible with `helm install`. To use this feature, your application must contain one or more Helm charts. If this feature is needed, it's recommended to package your application using Helm and create a release with your Helm charts. This allows you to package your application one time and deliver with an embedded cluster (kURL), the UI-based KOTS method, and now `helm install`.

## How it works

When you promote an application to a release channel, Replicated will look at the release and extract any Helm charts included. These charts will be pushed as OCI objects to our built-in private registry (registry.replicated.com). The chart will be pushed to the _channel_. For example, if your app is named "app", and you create a channel named "nightly", and the release promoted contains a Helm chart with `name: my-chart` in the `Chart.yaml`, the chart will be pushed to `oci://registry.replicated.com/app/nightly/my-chart`. The chart version (tag) is read from the `Chart.yaml`.

When a new version of a chart is uploaded, Replicated will render and cache that version for each license when it's pulled the first time.

When a license field changes for a customer, Replicated will invalidate all rendered and cached charts. This will cause the charts to be re-built the next time they are pulled.

The `values.yaml` in your Chart will be rendered with the customer provided license. This creates a way to pass custom license fields and other customer-specific data into the values.yaml as defaults, and consume them in Helm templates. When Replicated renders the `values.yaml`, it's not assumed to be a valid YAML format yet in order to allow flow-control and conditional template functions to optionally write some fields to the values.yaml file.

## Limitations

A lot of functionality exists in the KOTS CLI that isn't present with the `helm install` method:

1. No "last mile" kustomization support. All confguration and customization should be done using Helm.
1. No support for blocking preflights because helm doesn't automatically run preflights. Preflight checks are still supported, but must be run manually.

## Beta limitations

This functionality is currently in Beta and has some additional limitations we plan to address before this feature is GA:

1. No support for airgap installations. We've documented a solution that will work for these environments today, but plan to make this better.
1. Customer adoption is not reported to the vendor portal. 

## Delivering the admin console experience

We recommend delivering the admin console as a subchart to your application's chart.

When the admin console is included as a dependency, Replicated will inject some Replicated values into the `values.yaml` when the chart is pulled by end customers. These values enable the admin console to authenticate with the registry and check for updates.

It's possible to make the admin-console helm chart an optional dependency that end-customers can exclude.

The values that are injected will look like:

`values.yaml`

```
replicated:
  license_id: abcdef123
```

## Multiple charts

This feature supports multiple charts. If your application release contains more than a single chart, all charts will be uploaded to the registry. Replicated does not wrap or provide any special tooling to manage multiple charts. We recommend your instructions provide sequenced steps for customers to follow to get each chart installed and running in the order you need.

## Customer values and private images

Replicated will render template functions in the values.yaml for each customer, as the chart is served to the customer. Each customer license logs in with unique credentials, and our registry is able to identify which customer is pulling the chart. The registry will not render the chart, but it will replace your values.yaml with a rendered version.

#### Example of delivering image pull secrets for private images

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

#### Example of delivering custom license fields

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
