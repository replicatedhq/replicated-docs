# Redactor

Preflight checks and support bundles include built-in redactors that hide sensitive customer data before it is analyzed. These default redactors hide passwords, tokens, AWS secrets, IP addresses, database connection strings, and URLS that contain usernames and passwords.

The default redactors cannot be disabled, but you can add custom redactors to support bundles using the Redactor custom resource manifest file. For example, you can redact API keys or account numbers, depending on your customer needs. For more information about redactors, see [Redacting Data](https://troubleshoot.sh/docs/redact/) in the Troubleshoot documentation.

## Basic Manifest File

You can add custom redactors to the following basic Redactor custom resource manifest file (`kind: Redactor`):

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: sample
spec:
  redactors: []
```

## Objects and Fields

Each redactor support two objects: `fileSelector` and `removals`. Each object is supported by fields that specify what is redacted and how the redactions should occur. For more information and examples of these fields, see [Example Redactors](#example-redactors) below and [Redactors](https://troubleshoot.sh/docs/redact/redactors/) in the Troubleshoot documentation.

### fileSelector

The `fileSelector` object determines which files the redactor is applied to. If this object is omitted from the manifest file, the redactor is applied to all files. This object supports the following optional fields:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>file</code></td>
    <td>(Optional) Specifies a single file for redaction.</td>
  </tr>
  <tr>
    <td><code>files</code></td>
    <td>(Optional) Specifies multiple files for redaction.</td>
  </tr>
</table>

Globbing is used to match files. For example, <code>/my/test/glob/*</code> matches <code>/my/test/glob/file</code>, but does not match <code>/my/test/glob/subdir/file</code>.

### removals

The `removals` object is required and it defines the redactions that should occur. This object supports the following fields. At least one of these fields must be specified:

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>regex</code></td>
    <td>(Optional) This field allows applying a regex to lines following a line that matches a filter. Regex uses the <code>selector</code> subfield to identify a line to filter, and then the redactor is run on the next line. If <code>selector</code> is empty, the redactor runs on every line. This can be useful for removing values from prettyprinted JSON or removing secrets from an S3 endpoint, among other things. <br></br><br></br>Matches to entries in regex are removed or redacted, depending on how the regex is constructed. Any portion of a match not contained within a capturing group is removed entirely. The contents of capturing groups tagged mask are masked with the string <code>***HIDDEN***</code>.</td>
  </tr>
  <tr>
    <td><code>values</code></td>
    <td>(Optional) This field specifies which entries to replace with the string <code>***HIDDEN***</code>.</td>
  </tr>
  <tr>
    <td><code>yamlPath</code></td>
    <td>(Optional) This field specifies which items within YAML documents are redacted. Input is a <code>.</code> -delimited path to the items to be redacted. If an item in the path is the literal string <code>*</code>, the redactor is applied to all options at that level. <br></br><br></br>Files that fail to parse as YAML or that do not contain any matches are not be modified by this redactor. Files that do contain matches are re-rendered, which removes comments and custom formatting. Multi-document YAML is not fully supported. Only the first document is checked for matches, and if a match is found, later documents are discarded entirely.</td>
  </tr>
</table>

## Example Redactors

The following example shows `file`, `regex`, and `yamlPath` redaction for a support bundle:

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
  - name: all files # as no file is specified, this redactor will run against all files
    removals:
      regex:
      - redactor: (another)(?P<mask>.*)(here) # this will replace anything between the strings `another` and `here` with `***HIDDEN***`
      - selector: 'S3_ENDPOINT' # remove the value in lines following those that contain the string S3_ENDPOINT
        redactor: '("value": ").*(")'
      yamlPath:
      - "abc.xyz.*" # redact all items in the array at key xyz within key abc in yaml documents
```
