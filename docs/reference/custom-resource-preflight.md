# Preflight and Support Bundle

Preflight checks and support bundles can be customized using custom resource manifest files.

You can include a Preflight custom resource with your application release to provide cluster operators with clear feedback for any missing requirements or incompatibilities in the target environment before an application is deployed.

A Support Bundle custom resource can be added to your application release to collect, redact, and analyze troubleshooting data from a cluster and help diagnose problems with application deployments.

For more information about preflight checks, support bundles, and how the collectors and analyzers can be customized for each of them, see [Customizing Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating/).

## Base Manifest Files

The following are the base manifest files for the Preflight and Support Bundle custom resource files, which include all of the default collectors and analyzers. You edit the base manifest files by adding custom collector and analyzer specifications:

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

The following fields are supported on all collectors:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>`collectorName`</td>
    <td>Optionally, a collector can specify the `collectorName` property. In some collectors, this controls the path where result files are stored in the support bundle.</td>
  </tr>
  <tr>
    <td>`exclude`</td>
    <td>For collectors that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is `false`, the collector is not included.</td>
  </tr>
</table>


## Analyzer Global Fields

The following fields are supported on all analyzers:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>`collectorName`</td>
    <td>Optionally, an analyzer can specify the `collectorName` property. </td>
  </tr>
  <tr>
    <td>`exclude`</td>
    <td>For analyzers that are optional, based on runtime available configuration, the conditional can be specified in the `exclude` property. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is `true`, the analyzer is not included.</td>
  </tr>
  <tr>
    <td>`strict`</td>
    <td>Optionally, an analyzer can be set to `strict: true` to prevent that particular analyzer must not . When `exclude: true` is also specified, `exclude` overrides `strict` and the analyzer is not executed.</td>
  </tr>
</table>

For a list of collectors and analyzers, see [All Collectors](https://troubleshoot.sh/docs/collect/all/) and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.
