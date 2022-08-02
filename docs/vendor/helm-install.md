# Using Helm to Install an Application (Alpha)

:::note
Allowing users to install with the helm CLI is an Alpha feature. To enable this feature on your account, log in to your [Vendor Portal](https://vendor.replicated.com/support) account and submit a feature request for "Helm CLI Install option".
:::

Some enterprise users prefer or require a Helm chart to install using the `helm` CLI. This is often because Helm is already approved and the customer has a custom CI pipeline that is compatible with Helm charts. Replicated has introduced Alpha support to enable these users to use Helm to install your application.

## About Installing with the Helm CLI

When you promote an application to a release channel, Replicated extracts any Helm charts included in the release. These charts are pushed as OCI objects to the Replicated private registry at `registry.replicated.com`. The Helm chart is pushed to the _channel_.

For example, if your app is named "app", you create a channel named "nightly", and the release promoted contains a Helm chart with `name: my-chart` in the `Chart.yaml`, then the chart is pushed to `oci://registry.replicated.com/app/nightly/my-chart`. The chart version (tag) is read from the `Chart.yaml`.

This feature supports multiple charts. If your application release contains more than a single chart, all charts are uploaded to the registry.

When a new version of a chart is uploaded, Replicated renders and cache that version for each license when it is pulled the first time.

When a license field changes for a customer, Replicated invalidates all rendered and cached charts. This causes the charts to be rebuilt the next time they are pulled.

The `values.yaml` in your Chart is rendered with a customer-specific license. Each customer logs in with unique credentials, and our registry is able to identify which customer is pulling the chart. This creates a way to pass custom license fields and other customer-specific data into the `values.yaml` as defaults, and consume them in Helm templates.

Before Replicated renders the `values.yaml`, it is not assumed to be a valid YAML format in order to allow flow control and conditional template functions to optionally write some fields to the `values.yaml` file. Replicated renders template functions in the `values.yaml` for each customer, as the Helm chart is served to the customer.

## Requirement

Not all applications packaged with Replicated are able to be installed with `helm install`. To use the `helm install` feature, your application must contain one or more Helm charts.

If you want to allow your users to install your application with `helm install`, Replicated recommends that you package your application using Helm and create a release with your Helm charts. This allows you to package your application one time and deliver with an embedded cluster created by the Kubernetes installer (kURL), the UI-based KOTS method, and the `helm install` method.

## Limitations

The `helm install` method is Alpha and has the following limitations:

* No support for "last mile" changes with Kustomize. All configuration and customization must be done using Helm.
* No support for `strict` preflights that block application installation. This is because Helm does not automatically run preflight checks. Preflight checks are supported with `helm install`, but your users must run the preflight checks manually before installing your application.
* No support for air gap installations. Replicated has documented a workaround solution for installing into air gap environments.
* Customer adoption is not reported to the vendor portal.
* This feature supports multiple charts and Replicated does not wrap or provide any special tooling to manage multiple charts. Replicated recommends that you provide installation instructions with sequenced steps for users to follow to install each chart in the required order.
* The Replicated admin console is not included by default when your users install using the helm CLI. For more information, see [Delivering the Admin Console with your Application](#deliver-admin-console) below.

## Delivering the Admin Console with your Application {#deliver-admin-console}

By default, when your users install your application using the helm CLI, the admin console is not included. This section describes how to deliver the admin console alongside your application.

### Overview of Delivering the Admin Console

To deliver the admin console with your application when users install with the helm CLI, include the `admin-console` Helm chart in the `dependencies` field of your `Chart.yaml` file.

When you include the `admin-console` Helm chart as a dependency, Replicated injects values into the Helm chart `values.yaml` file when the chart is pulled by your users. These values provide the license ID for the customer, which enables the admin console to authenticate with the image registry and check for updates.

The following shows the formatting of the `replicated` and `license_id` fields that Replicated adds to the `values.yaml` file:

```
replicated:
  license_id: abcdef123
```

The functionality of the admin console delivered by the `admin-console` Helm chart differs from that of the admin console available when your users install with the kots CLI or with the Kubernetes installer.

This is because Helm, rather than the admin console, manages the lifecycle of the application when users install with the helm CLI. For example, instead of including an Upgrade button, the admin console delivered by the `admin-console` Helm chart provides the correct `helm upgrade` commands for users.

### Add the admin-console Chart

This procedure shows how to add the `admin-console` Helm chart as a conditional dependency of your Helm chart.

It also shows how to conditionally exclude the `admin-console` Helm chart when your users install with either the kots CLI or with the Kubernetes installer. It is important to exclude the `admin-console` chart in this scenario because both the kots CLI and the Kubernetes installer already install the admin console by default.

To conditionally include and exclude the `admin-console` Helm chart:

1.  In the Helm chart `Chart.yaml` file, add the `admin-console` Helm chart to the `dependencies` field:

   ```yaml
    dependencies:
    - name: admin-console
      version: "1.72.1"
      repository: "oci://registry.replicated.com/library"
      condition: admin-console.enabled
   ```

   The following table describes the fields:
   <table>
     <tr>
       <th>Field</th>
       <th>Description</th>
     </tr>
     <tr>
       <td><code>name</code></td>
       <td>The name of the <code>admin-console</code> Helm chart.</td>
     </tr>
     <tr>
       <td><code>version</code></td>
       <td>The version of the admin console to deliver with your application. Replicated recommends that you use the latest version. For more information about the available versions, see the <a href="/release-notes/rn-app-manager">App Manager Release Notes</a>.</td>
     </tr>
     <tr>
       <td><code>repository</code></td>
       <td>The URL for the Replicated private image registry where the <code>admin-console</code> Helm chart is accessed.</td>
     </tr>
     <tr>
       <td><code>condition</code></td>
       <td><p>A conditional statement that defines when the <code>admin-console</code> chart is included.</p>
       <p>In the next step of this procedure, you create an <code>admin-console</code> field in the <code>values.yaml</code> file of your Helm chart that maps to this conditional statement.</p></td>
     </tr>
   </table>

1. In the `values.yaml` file, add the following fields that map to the `condition` field in the `Chart.yaml` file:

   ```yaml
   admin-console:
    enabled: true
   ```

1. Package your Helm chart, and add the packaged chart to a release in the Replicated vendor portal. For more information, see [Add a Helm Chart to a Release](helm-release#add-a-helm-chart-to-a-release).

1. In the release, create or open the HelmChart custom resource manifest file. A HelmChart custom resource manifest file has `kind: HelmChart` and `apiVersion: kots.io/v1beta1`.

   **Template:**

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     ...
   ```

   The Replicated HelmChart custom resource allows Replicated to process and deploy Helm charts when users install with the kots CLI or with the Kubernetes installer.

   For more information, see [HelmChart](/reference/custom-resource-helmchart) in the _References_ section.

1. Edit the HelmChart manifest file to exclude the `admin-console` Helm chart when users install your application with the kots CLI or with the Kubernetes installer:

   1. Add the following to the `values` field:

      ```yaml
      values:
        admin-console:
         enabled: false
      ```

      The `values` field lets you map user-supplied configuration values from the admin console to the Helm chart `/templates`. For more information, see [values](/reference/custom-resource-helmchart#values) in _HelmChart_.

      **Example:**

      ```yaml
      apiVersion: kots.io/v1beta1
      kind: HelmChart
      metadata:
        name: samplechart
      spec:
        chart:
          name: samplechart
          chartVersion: 3.1.7
          releaseName: samplechart-release-v1
        values:
          admin-console:
           enabled: false  
      ```     

   1. If the HelmChart custom resource includes an `optionalValues` field, set `recursiveMerge` to `true`. This prevents the `admin-console` field in `values` from being overwritten by the fields in `optionalValues`.

      **Example:**

      ```yaml
      optionalValues:
       - when: "repl{{ ConfigOptionEquals `example_config_option`}}"
         recursiveMerge: true
         values:
           example_key: example_value
      ```     

      For more information, see [recursiveMerge](/reference/custom-resource-helmchart#optionalvaluesrecursivemerge) in _HelmChart_.

   1. Add the following to the `builder` field:

      ```yaml
      builder:
        admin-console:
          enabled: false
      ```

      Values in the `builder` field provide a way to render the chart with all images and manifests. A common use case for the `builder` field in Replicated is to create packages for delivering an application to an air gap environment.

      For more information, see [builder](/reference/custom-resource-helmchart#builder) in _HelmChart_.

      **Example:**

      ```yaml
      apiVersion: kots.io/v1beta1
      kind: HelmChart
      metadata:
        name: samplechart
      spec:
        chart:
          name: samplechart
          chartVersion: 3.1.7
          releaseName: samplechart-release-v1
        values:
          admin-console:
           enabled: false
        builder:
          admin-console:
           enabled: false              
      ```
  1. Save and promote the release to a development environment to test your changes.      

## Deliver Image Pull Secrets for a Private Registry {#private-images}

Using an external private image registry or the Replicated private registry for your application requires an image pull secret for access. The unique license file for each customer can grant access to the Replicated private registry, or grant proxy access to an external registry without exposing registry credentials to the customer.

When users install with the kots CLI or the Kubernetes installer, Replicated automatically uses the customer license to create and inject an image pull secret. For more information about this process, see [Connecting to an External Registry](packaging-private-images).

For installations with the helm CLI, Replicated cannot automatically inject an image pull secret into the Helm chart for your application. To support the use of private images for helm CLI installations, add the Replicated `LicenseDockerCfg` template function to the Helm chart `values.yaml` file. The `LicenseDockerCfg` template function renders a value based on the unique customer license file when the Helm chart is pulled. Write this rendered value to a pull secret, then reference the pull secret in the necessary template files for the Helm chart.

For more information about the `LicenseDockerCfg` template function, see [LicenseDockerCfg](/reference/template-functions-license-context#licensedockercfg) in _License Context_.

To deliver customer-specific image pull secrets for a private registry:

1. Add the `LicenseDockerCfg` template function to a field in the Helm chart `values.yaml` file using the following format:

   ```yaml
   FIELD_NAME: "repl{{ LicenseDockerCfg }}"
   ```
   Replace `FIELD_NAME` with any name for the field. You can add `"repl{{ LicenseDockerCfg }}"` as a flat or nested value. For more information, see [Flat or Nested Values](https://helm.sh/docs/chart_best_practices/values/#flat-or-nested-values) in the Helm documentation.

   **Example:**

   ```yaml
   images:
     pullSecrets:
       replicated:
         dockerconfigjson: "repl{{ LicenseDockerCfg }}"
   ```   

1. In the `templates` directory of your Helm chart, create a Kubernetes Secret manifest file (`kind: Secret`). Add the following YAML to the file to evaluate if the secret value is set, and then write the rendered value into a Secret on the cluster:

   ```yaml
   {{ if .Values.FIELD_NAME }}
   apiVersion: v1
   kind: Secret
   metadata:
     name: SECRET_NAME
   # Kubernetes clusters use the kubernetes.io/dockerconfigjson Secret type
   # to authenticate with a private image registry.
   type: kubernetes.io/dockerconfigjson
   data:
     .dockerconfigjson: {{ .Values.FIELD_NAME }}
   {{ end }}
   ```

   Replace:
   * `FIELD_NAME` with the name of the field from the previous step where you added `"repl{{ LicenseDockerCfg }}"`. For example, `.Values.images.pullSecrets.replicated.dockerconfigjson`.
   * `SECRET_NAME` with any name for the secret. For example, `replicated`.

   **Example:**

   ```yaml
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

1. Add the following to any manifests in the Helm chart `templates` directory that reference private images to inject the pull secret that you created in the previous step:

   ```yaml
        ...
        {{ if .Values.FIELD_NAME }}
        imagePullSecrets:
          - name: SECRET_NAME
        {{ end }}
   ```
   Replace:
   * `FIELD_NAME` with the name of the field where you where you added `"repl{{ LicenseDockerCfg }}"`.
   * `SECRET_NAME` with the name of the Secret that you created in the previous step.

   **Example:**

   The following example shows the `imagePullSecrets` field in a `templates/deployment.yaml` file that also injects values for the image registry URL, image tag, and `imagePullPolicy`.

    ```yaml
        ...
        image: {{ .Values.images.myapp.repository }}{{ .Values.images.myapp.tag }}
        imagePullPolicy: {{ .Values.images.myapp.pullPolicy }}
        {{ if .Values.images.pullSecrets.replicated.dockerconfigjson }}
        imagePullSecrets:
          - name: replicated
        {{ end }}
        name: myapp
        ports:
        - containerPort: 3000
          name: http
    ```

1. Package your Helm chart and add the packaged chart to a release in the Replicated vendor portal. For more information, see [Add a Helm Chart to a Release](helm-release#add-a-helm-chart-to-a-release).

1. Save and promote the release to a development environment to test your changes.  

## Example: Delivering Custom License Fields

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
