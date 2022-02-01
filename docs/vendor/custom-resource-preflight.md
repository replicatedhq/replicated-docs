# Preflight

The open source Troubleshoot project provides a Preflight custom resource that the Replicated app manager integrates with to make an application's cluster dependencies explicit.

For more information, see [Introduction](https://troubleshoot.sh/docs/preflight/introduction/) in the Troubleshoot documentation.

This enables the app manager and the Replicated admin console to provide cluster Operators with clear feedback on any missing requirements or incompatibilities in the target environment before an application is deployed.
This custom resource is optional for applications.

You can also run preflight checks independently with the [Preflight kubectl plugin](https://troubleshoot.sh/docs/#installation).

A Preflight kind is a collector and an analyzer specification in one `preflight.yaml` manifest file.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

For more information about collectors and analyzers, see [Collectors](https://troubleshoot.sh/docs/collect/collectors/) and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.
