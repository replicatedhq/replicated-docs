# Redactor

Preflight checks and support bundles include built-in redactors that hide sensitive customer data after it is collected and before it is analyzed. These default redactors hide passwords, tokens, AWS secrets, IP addresses, database connection strings, and URLS that contain usernames and passwords. These cannot be disabled, but any additional Redactor custom resources are added to the defaults.


You can add custom redactors to the default redactors for use with support bundles. For example, you can redact API keys or account numbers, depending on your customer needs.

The Redactor custom resource is optional. You can customize the collectors and analyzers in support bundles without configuring any custom redactors, and the support bundles will simply use the default redactors. For more information about the support bundle workflow, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles) in Configuring Preflight Checks and Support Bundles. For more information about the redacotr, see [Redacting Data](https://troubleshoot.sh/docs/redact/) in the Troubleshoot documentation.

## Basic Manifest File

To define custom redactors, add the Redactor custom resource to your release. The following is an example manifest file for the Redactor custom resource (`kind: Redactor`):

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: sample
spec:
  redactors: []
```

## Sub-objects and Fields

Each redactor consists of a set of files that it can apply to, a set of string literals to replace, a set of regex replacements to run, and a list of YAML paths to redact. Any of these four can be omitted. For more information and examples of these fields, see [Redactors](https://troubleshoot.sh/docs/redact/redactors/) in the Troubleshoot documentation.

The following sub-objects and fields are used to define custom redactors:

<table>
  <tr>
    <th width="30%">Sub-object or Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>fileSelector</code></td>
    <td>(Required)The <code>fileSelector</code> sub-object determines which files the redactor is applied to.</td>
  </tr>
  <tr>
    <td><code>removals</code></td>
    <td>(Required) The <code>removals</code> sub-object determines which files are removed.</td>
  </tr>
  <tr>
    <td><code>file</code> or <code>files</code></td>
    <td>Specifies a file or set of files that the redactor is applied to. Globbing is used to match files. For example, <code>/my/test/glob/*</code> matches <code>/my/test/glob/file</code> but does not match <code>/my/test/glob/subdir/file</code>. If neither <code>file</code> nor <code>files</code> are specified, then the redactor is applied to all files.</td>
  </tr>
  <tr>
    <td><code>regex</code></td>
    <td>Regex allows applying a regex to lines following a line that matches a filter. <code>selector</code> is used to identify lines, and then the redactor is run on the next line. If <code>selector</code> is empty, the redactor runs on every line. This can be useful for removing values, such as secrets, from an S3 endpoint. <br></br><br></br>Matches to entries in regex are removed or redacted, depending on how the regex is constructed. Any portion of a match not contained within a capturing group is removed entirely. The contents of capturing groups tagged mask are masked with the string <code>***HIDDEN***</code>.</td>
  </tr>
  <tr>
    <td><code>values</code></td>
    <td>Specifies which entries to replace with the string <code>***HIDDEN***</code>.</td>
  </tr>
  <tr>
    <td><code>yamlPath</code></td>
    <td>Specifies which items within YAML documents are redacted. Input is a <code>.</code> -delimited path to the items to be redacted. If an item in the path is the literal string <code>*</code>, the redactor is applied to all options at that level. <br></br><br></br>Files that fail to parse as YAML or that do not contain any matches are not be modified by this redactor. Files that do contain matches are re-rendered, which removes comments and custom formatting. Multi-document YAML is not fully supported. Only the first document is checked for matches, and if a match is found, later documents are discarded entirely.</td>
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
