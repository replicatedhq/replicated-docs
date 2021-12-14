# Redactor

The [Replicated Troubleshoot project](https://github.com/replicatedhq/troubleshoot) provides a [Redactor spec](https://troubleshoot.sh/docs/redact/redactors/) that integrates with KOTS to enable custom redactions during support bundle generation.
Vendors can use this to hide sensitive information like API keys, credentials, account numbers, etc. in support bundles.
This custom resource is optional for KOTS applications, but KOTS includes all of the [pre-configured redactors describe in Troubleshoot](https://troubleshoot.sh/docs/redact/) by default in support bundle generation.
These cannot be disabled by the vendor, but any additional Redactor specs will be added to the defaults.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Redactor
metadata:
  name: sample
spec:
  redactors: []
```
