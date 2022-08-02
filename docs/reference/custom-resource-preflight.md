# Preflight and Support Bundle

Preflight checks use collectors and analyzers to provide cluster operators with clear feedback for any missing requirements or incompatibilities in the target environment before an application is deployed.

Support bundles collect, redact, and analyze troubleshooting data from a cluster and help diagnose problems with application deployments.

Default preflight checks and support bundle features are automatically included with releases. To customize these features uniquely for your application release, add any of the optional collectors and analyzers to `kind: Preflight` and `kind: SupportBundle` custom resource manifest files. For more information about these troubleshoot features and how to customize them, see [Customizing Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating/).

## Basic Manifest Files

The following are basic manifest files for the Preflight and Support Bundle custom resources, which include all of the default collectors and analyzers (indicated by `[]`). You edit the manifest files by adding custom collector and analyzer specifications:

**Preflight:**

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

**Support Bundle:**

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

## Collector Global Fields

The following fields are supported on all optional collectors for preflights and support bundles:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>`collectorName`</td>
    <td>(Optional) A collector can specify the `collectorName` field. In some collectors, this field controls the path where result files are stored in the support bundle.</td>
  </tr>
  <tr>
    <td>`exclude`</td>
    <td>(Optional) Based on the runtime available configuration, a conditional can be specified in the `exclude` field. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is `false`, the collector is not included.</td>
  </tr>
</table>


## Analyzer Global Fields

The following fields are supported on all optional analyzers for preflights and support bundles:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>`collectorName`</td>
    <td>(Optional) An analyzer can specify the `collectorName` field.</td>
  </tr>
  <tr>
    <td>`exclude`</td>
    <td>(Optional) Based on the runtime available configuration, a conditional can be specified in the `exclude` field. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is `true`, the analyzer is not included.</td>
  </tr>
  <tr>
    <td>`strict`</td>
    <td>(Optional) An analyzer can be set to `strict: true` so that `fail` outcomes for that analyzer prevent the release from deploying until the vendor-specified requirements are met. When `exclude: true` is also specified, `exclude` overrides `strict` and the analyzer is not executed.</td>
  </tr>
</table>

For a list of collectors and analyzers, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.
