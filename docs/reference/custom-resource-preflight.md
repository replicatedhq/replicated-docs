# Preflight

You can include a Preflight custom resource with your application release to provide cluster Operators with clear feedback on any missing requirements or incompatibilities in the target environment before an application is deployed. For more information, see [Customizing Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating/).

A Preflight custom resource manifest file is a collector and an analyzer specification in one manifest. The following is an example manifest file for the Preflight custom resource:

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
