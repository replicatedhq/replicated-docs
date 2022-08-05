# Redactor

The Redactor custom resource enables custom redactions during support bundle generation.

Vendors can use this to hide sensitive information like API keys, credentials, or account numbers in support bundles.

The Redactor custom resource is optional, but the app manager includes all of the pre-configured redactors described in Troubleshoot by default in support bundle generation. For more information, see [Redacting Data](https://troubleshoot.sh/docs/redact/) in the Troubleshoot documentation.

These cannot be disabled by the vendor, but any additional Redactor custom resources will be added to the defaults.

## Basic Manifest File

The following is an example manifest file for the Redactor custom resource:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: sample
spec:
  redactors: []
```

## Fields and Examples

The following fields are used to add custom redactors.

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
    <td>(Optional) Based on the runtime available configuration, a conditional can be specified in the <code>exclude</code> field. This is useful for deployment techniques that allow templating for Replicated app manager and the optional Helm component. When this value is <code>false</code>, the collector is not included.</td>
  </tr>
</table>

**Example: Collector Definition for a Support Bundle**
