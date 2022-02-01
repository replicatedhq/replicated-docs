# Redactor

The open source Troubleshoot project provides a Redactor custom resource that integrates with the Replicated app manager to enable custom redactions during support bundle generation.

Vendors can use this to hide sensitive information like API keys, credentials, or account numbers in support bundles.

This custom resource is optional for applications, but the app manager includes all of the pre-configured redactors described in Troubleshoot by default in support bundle generation. For more information, see [Redacting Data](https://troubleshoot.sh/docs/redact/) in the Troubleshoot documentation.

These cannot be disabled by the vendor, but any additional Redactor custom resources will be added to the defaults.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: sample
spec:
  redactors: []
```
