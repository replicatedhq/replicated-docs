# Package Air Gap Bundles for Helm Charts

This topic describes how to package and build air gap bundles for releases that contain one or more Helm charts. This topic applies to applications deployed with Replicated KOTS.

## Overview

Air gap bundles (`.airgap`) contain the images needed to install and run a single release of your application in _air gap_ environments with no outbound internet access.

When building the `.airgap` bundle for a release that contains one or more Helm charts, the Vendor Portal renders the Helm chart templates in the release using values supplied in the KOTS HelmChart custom resource [`builder`](/reference/custom-resource-helmchart-v2#builder) key.

## Configure the `builder` Key

You should configure the `builder` key if you need to change any default values in your Helm chart so that the `.airgap` bundle for the release includes all images needed to successfully deploy the chart. For example, you can change the default Helm values so that images for any conditionally-deployed components are always included in the air gap bundle. Additionally, you can use the `builder` key to set any `required` values in your Helm chart that must be set for the chart to render.

The values in the `builder` key map to values in the given Helm chart's `values.yaml` file. For example, `spec.builder.postgres.enabled` in the example HelmChart custom resource below would map to a `postgres.enabled` field in the `values.yaml` file for the `samplechart` chart:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  builder:
    postgres:
      enabled: true 
```

For requirements, recommendations, and examples of common use cases for the `builder` key, see the sections below.

### Requirements and Recommendations

The `builder` key has the following requirements and recommendations:
* Replicated recommends that you include only the minimum Helm values in the `builder` key that are required to template the Helm chart with the correct image tags.
* Use only static, or _hardcoded_, values in the `builder` key. You cannot use template functions in the `builder` key because values in the `builder` key are not rendered in a customer environment.
* Any `required` Helm values that need to be set to render the chart templates must have a value supplied in the `builder` key. For more information about the Helm `required` function, see [Using the 'required' function](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-required-function) in the Helm documentation.

### Example: Set the Image Registry for Air Gap Installations

For air gap installations, if the [Replicated proxy registry](/vendor/private-images-about) domain `proxy.replicated.com` is used as the default image name for any images, you need to rewrite the image to the upstream image name so that it can be processed and included in the air gap bundle. You can use the `builder` key to do this by hardcoding the upstream location of the image (image registry, repository, and tag), as shown in the example below:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  builder:
    my-service:
      image:
        registry: 12345.dkr.ecr.us-west-1.amazonaws.com
        repository: my-app
        tag: "1.0.2"    
```
When building the `.airgap` bundle for the release, the Vendor Portal uses the registry, repository, and tag values supplied in the `builder` key to template the Helm chart, rather than the default values defined in the Helm `values.yaml` file. This ensures that the image is pulled from the upstream registry using the credentials supplied in the Vendor Portal, without requiring any changes to the Helm chart directly.

### Example: Include Conditional Images

Many applications have images that are included or excluded based on a given condition. For example, enterprise users might have the option to deploy an embedded database with the application or bring their own database. To support this use case for air gap installations, the images for any conditionally-deployed components must always be included in the air gap bundle.

For example, a Helm chart might include a conditional PostgreSQL Deployment, as shown in the Helm template below:

```yaml
{{- if .Values.postgresql.enabled }}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgresql
  labels:
    app: postgresql
spec:
  selector:
    matchLabels:
      app: postgresql
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
      - name: postgresql
        image: "postgres:10.17"
        ports:
        - name: postgresql
          containerPort: 80
# ...
{{- end }}
```

To ensure that the `postgresql` image is included in the air gap bundle for the release, the `postgresql.enabled` value is added to the `builder` key of the HelmChart custom resource and is hardcoded to `true`:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals "postgres_type" "embedded_postgres"}}
  builder:
    postgresql:
      enabled: true
```

## Related Topics

* [builder](/reference/custom-resource-helmchart-v2#builder)
* [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap)
* [Air Gap Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster-airgapped)