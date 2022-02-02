Support Bundle

The open source Troubleshoot project provides the Support Bundle custom resource that the app manager integrates with.

Vendors can use the Support Bundle custom resource to collect, redact, and analyze troubleshooting data from a cluster, to help diagnose problems with application deployments.

Vendors can customize the diagnostics using the Support Bundle custom resource, which is combination of [collector](https://troubleshoot.sh/docs/collect/collectors/) and [analyzer](https://troubleshoot.sh/docs/analyze/) specifications in one manifest file.

A [collector](https://troubleshoot.sh/docs/collect/collectors/) defines the data to be collected and included in the `tar.gz` bundle.

An [analyzer](https://troubleshoot.sh/docs/analyze/) defines how to interpret and present the collected data to the application Operator.

The Support Bundle custom resource is optional.

Support Bundle collection and analysis is integrated into the Replicated admin console dashboard. It is also available through a kubectl plugin.

For more information about how enterprise application users can troubleshoot their application instance in the admin console, see [Troubleshooting an application](../enterprise/troubleshooting-an-app).

For more information about installing the kubectl plugin, see [Installation](https://troubleshoot.sh/docs/#installation) in the Troubleshoot documentation.

The following is an example manifest file for the Support Bundle custom resource:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: sample
spec:
  collectors: []
  analyzers: []
```

For more information about defining a Support Bundle custom resource, see [Collecting a Support Bundle](https://troubleshoot.sh/docs/support-bundle/collecting/) in the Troubleshoot documentation.
