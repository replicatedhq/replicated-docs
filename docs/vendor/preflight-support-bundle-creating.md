# Creating Preflight Checks and Support Bundles

This topic provides information about how to create preflight checks and support
bundles and include them with your application.

## About preflight checks and support bundles

Preflight checks and support bundles are both available through the open source
Replicated Troubleshoot project.

* **Support bundles**: Support bundles allow you to collect and analyze troubleshooting data
from your customers' clusters to help you diagnose problems with application
deployments.

* **Preflight checks**: Preflight checks allow you to define requirements and dependencies for the cluster
on which a customer installs your application. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and deploy your application. This can reduce the number of support escaltions during installation.
  
* **Strict preflight checks**: When an analyzer is marked as [`strict`](https://troubleshoot.sh/docs/analyze/#strict), the deployment of the release is blocked for `fail` outcomes. This feature can be used to prevent users from deploying a release when vendor-specified requirements must be met before deploying the release. When configuring `strict` preflight checks, vendors should consider the app manager [cluster privileges](../reference/custom-resource-application#requireminimalrbacprivileges). 

## Creating preflight checks

You can create preflight checks with the `preflight` plugin for the `kubectl` Kubernetes command-line tool.

You define preflight checks by creating a `preflight.yaml`
manifest files. This file specifies the cluster data that is collected and redacted as part of the preflight check.
The manifest file also defines how the collected data is analyzed.

You then add the `preflight.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing the `preflight` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about creating preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation. There are also a number of basic examples for checking CPU, memory, and disk capacity under [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/).


## Creating support bundles

You can create support bundles with the `support-bundle` plugin for the `kubectl` Kubernetes command-line tool.

You define support bundles by creating a `support-bundle.yaml` manifest file. This file specifies the cluster data
that is collected and redacted as part of the support bundle. The manifest file also defines how the collected data is analyzed.

You then add the `support-bundle.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing `support-bundle` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about creating support bundles, see
[Support Bundle](https://troubleshoot.sh/docs/support-bundle/introduction/) in the
Troubleshoot documentation.

### Bundling and Analyzing Logs with Support bundle

A robust support bundle is essential to minimizing back-and-forth when things go wrong.
At a very minimum, every app's support bundle should contain logs for an application's core pods.
Usually this will be done with label selectors. To get the labels for an application, either inspect the YAML, or run the following YAML against a running instance to see what labels are used:

```shell
kubectl get pods --show-labels
```

Once the labels are discovered, a [logs collector](https://troubleshoot.sh/reference/collectors/pod-logs/) can be used to include logs from these pods in a bundle.
Depending on the complexity of an app's labeling schema, you may need a few different declarations of the `logs` collector.

As common issues are encountered in the field, it will make sense to add not only collectors but also analyzers to an app's troubleshooting stack. For example, when an error in a log file is discovered that should be surfaced to an end user in the future, a simple [Text Analyzer](https://troubleshoot.sh/reference/analyzers/regex/) can detect specific log lines and inform an end user of remediation steps.
