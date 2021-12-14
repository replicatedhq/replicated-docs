# Support Bundle

The [Replicated Troubleshoot project](https://github.com/replicatedhq/troubleshoot) provides the Support Bundle diagnostic tool that KOTS integrates deeply with.
By providing this custom resource, vendors can collect, redact, and analyze troubleshooting data from a cluster, to help diagnose problems with application deployments.

Vendors can customize the diagnostics using the [Support Bundle Spec](https://troubleshoot.sh/docs/support-bundle/collecting/), which is combination of [Collector](https://troubleshoot.sh/docs/collect/collectors/) and [Analyzer](https://troubleshoot.sh/docs/analyze/) specs in one document.

A [Collector Spec](https://troubleshoot.sh/docs/collect/collectors/) defines the data to be collected and included in the tar.gz bundle.

An [Analyzer Spec](https://troubleshoot.sh/docs/analyze/) defines how to interpret and present the collected data to the application operator.

Both support-bundle custom resources are optional for KOTS applications.

Support Bundle collection and analysis are integrated into the [Admin Console Dashboard](/kotsadm/troubleshooting/support-bundle/), and are also available through a [standalone kubectl plugin](https://troubleshoot.sh/docs/#installation).

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```
