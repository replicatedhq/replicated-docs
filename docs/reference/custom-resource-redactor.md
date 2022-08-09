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

## Sub-objects, Fields, and Examples

Each redactor consists of a set of files that it can apply to, a set of string literals to replace, a set of regex replacements to run, and a list of YAML paths to redact. Any of these four can be omitted.

The following sub-objects and fields are used to define custom redactors.

<table>
  <tr>
    <th width="30%">Sub-object or Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>fileSelector</code></td>
    <td>(Required)The <code>fileSelector</code> sub-object...</td>
  </tr>
  <tr>
    <td><code>removals</code></td>
    <td>(Required) The <code>removals</code> sub-object...</td>
  </tr>
</table>

**Example: Password Redaction for a Support Bundle**

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: my-redactor-name
spec:
  redactors:
  - name: replace password # names are not used internally, but are useful for recordkeeping
    fileSelector:
      file: data/my-password-dump # this targets a single file
    removals:
      values:
      - abc123 # this value is my password, and should never appear in a support bundle
```
