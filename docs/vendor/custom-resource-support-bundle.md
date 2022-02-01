# Support Bundle

The open source Troubleshoot project provides the Support Bundle custom resource that the app manager integrates with.

Vendors can use the Support Bundle custom resource to collect, redact, and analyze troubleshooting data from a cluster, to help diagnose problems with application deployments.

Vendors can customize the diagnostics using the [Support Bundle custom resource](https://troubleshoot.sh/docs/support-bundle/collecting/), which is combination of [Collector](https://troubleshoot.sh/docs/collect/collectors/) and [Analyzer](https://troubleshoot.sh/docs/analyze/) specs in one document.

A [Collector custom resource](https://troubleshoot.sh/docs/collect/collectors/) defines the data to be collected and included in the `tar.gz` bundle.

An [Analyzer custom resource](https://troubleshoot.sh/docs/analyze/) defines how to interpret and present the collected data to the application operator.

Both Support Bundle custom resources are optional for applications.

Support Bundle collection and analysis is integrated into the Replicated admin console dashboard. It is also available through a kubectl plugin.

For more information about how enterprise application users can troubleshoot their application instance in the admin console, see [Troubleshooting an application](../enterprise/troubleshooting-an-app).

For more information about installing the kubectl plugin, see [Installation](https://troubleshoot.sh/docs/#installation) in the Troubleshoot documentation.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```
