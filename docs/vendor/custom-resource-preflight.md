# Preflight

The [Replicated Troubleshoot project](https://github.com/replicatedhq/troubleshoot) provides a [Preflight spec](https://troubleshoot.sh/docs/preflight/introduction/) that KOTS integrates with to make an application's cluster dependencies explicit.
This enables KOTS and the Admin Console to provide Cluster Operators with clear feedback on any missing requirements or incompatibilities in the target environment before an application is deployed.
This custom resource is optional for KOTS applications.

Preflight checks can even be run independently, via the [Preflight kubectl plugin](https://troubleshoot.sh/docs/#installation).

A Preflight kind is a [Collector](https://troubleshoot.sh/docs/collect/collectors/) and an [Analyzer](https://troubleshoot.sh/docs/analyze/) spec in one document.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```
