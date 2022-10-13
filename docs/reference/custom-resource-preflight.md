# Preflight and Support Bundle

Preflight checks use collectors and analyzers to provide cluster operators with clear feedback for any missing requirements or incompatibilities in the target environment before an application is deployed. Preflight checks are not automatically included in releases, so you must define them if you want to include them with a release.

Support bundles collect and analyze troubleshooting data from a cluster and help diagnose problems with application deployments. Default support bundles are automatically included with releases, and can be customized.

Collectors and analyzers are configured in the Preflight and Support Bundle custom resource manifest files.

:::note
Built-in redactors run by default for preflight checks and support bundles to protect customers' sensitive information. To add custom redactors to a support bundle, use the Redactor custom manifest file. For more information about the Redactor custom manifest file, see [Redactor](custom-resource-redactor).
:::

## Basic Manifest Files

To define preflight checks or customize the default support bundle settings, add the corresponding custom resource manifest file to your release. Then add custom collector and analyzer specifications to the custom resource manifest file. For more information about these troubleshoot features and how to configure them, see [Configuring Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating/).

The following sections show basic manifest files for the Preflight and Support Bundle custom resources that you can start with.

### Preflight

The Preflight manifest file uses `kind: Preflight`:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

### Support Bundle

The Support Bundle manifest file uses `kind: SupportBundle`:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

## Global Fields

Global fields, also known as shared properties, are fields that are supported on all collectors or all analyzers. The following sections list the global fields for [collectors](#collector-global-fields) and [analyzers](#analyzer-global-fields) respectively.

Additionally, each collector and analyzer has its own fields. For more information about collector- and analyzer-specific fields, see the [Troubleshoot documentation](https://troubleshoot.sh/docs/).

### Collector Global Fields

The following fields are supported on all optional collectors for preflights and support bundles. For a list of collectors, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) in the Troubleshoot documentation.

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>collectorName</code></td>
    <td>(Optional) A collector can specify the <code>collectorName</code> field. In some collectors, this field controls the path where result files are stored in the support bundle.</td>
  </tr>
  <tr>
    <td><code>exclude</code></td>
    <td>(Optional) Based on the runtime available configuration, a conditional can be specified in the <code>exclude</code> field. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is <code>true</code>, the collector is not included.</td>
  </tr>
</table>

### Collector Example

This is an example of collector definition for a support bundle:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors:
    - collectd:
        collectorName: "collectd"
        image: busybox:1
        namespace: default
        hostPath: "/var/lib/collectd/rrd"
        imagePullPolicy: IfNotPresent
        imagePullSecret:
           name: my-temporary-secret
           data:
             .dockerconfigjson: ewoJICJhdXRocyI6IHsKzCQksHR0cHM6Ly9pbmRleC5kb2NrZXIuaW8vdjEvIjoge30KCX0sCgkiSHR0cEhlYWRlcnMiOiB7CgkJIlVzZXItQWdlbnQiOiAiRG9ja2VyLUNsaWVudC8xOS4wMy4xMiAoZGFyd2luKSIKCX0sCgkiY3JlZHNTdG9yZSI6ICJkZXNrdG9wIiwKCSJleHBlcmltZW50YWwiOiAiZGlzYWJsZWQiLAoJInN0YWNrT3JjaGVzdHJhdG9yIjogInN3YXJtIgp9
           type: kubernetes.io/dockerconfigjson
```

### Analyzer Global Fields

The following fields are supported on all optional analyzers for preflights and support bundles. For a list of analyzers, see [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>collectorName</code></td>
    <td>(Optional) An analyzer can specify the <code>collectorName</code> field.</td>
  </tr>
  <tr>
    <td><code>exclude</code></td>
    <td>(Optional) Based on the runtime available configuration, a conditional can be specified in the <code>exclude</code> field. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is <code>true</code>, the analyzer is not included.</td>
  </tr>
  <tr>
    <td><code>strict</code></td>
    <td>(Optional) An analyzer can be set to <code>strict: true</code> so that <code>fail</code> outcomes for that analyzer prevent the release from deploying until the vendor-specified requirements are met. When <code>exclude: true</code> is also specified, <code>exclude</code> overrides <code>strict</code> and the analyzer is not executed.</td>
  </tr>
</table>

### Analyzer Example

This is an example of an analyzer definition with a strict preflight check and `exclude` set for installations that do not use the Kubernetes installer. In this case, the strict preflight is enforced on a Kubernetes installer cluster but not on an existing cluster or air gap cluster.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: check-kubernetes-version
spec:
  analyzers:
    - clusterVersion:
        exclude: 'repl{{ (not IsKurl) }}'
        strict: true
        outcomes:
          - fail:
              when: "< 1.16.0"
              message: The application requires Kubernetes 1.16.0 or later
              uri: https://kubernetes.io
          - warn:
              when: "< 1.17.0"
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.17.0 or later.
              uri: https://kubernetes.io
          - pass:
              message: Your cluster meets the recommended and required versions of Kubernetes.
```
