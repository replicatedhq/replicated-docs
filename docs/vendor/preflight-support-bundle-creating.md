# Creating preflight checks and support bundles

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
the cluster before they install and deploy your application.

## Creating preflight checks and support bundles

You can create preflight checks and support bundles with the `preflight`
and `support-bundle` plugins for the `kubectl` Kubernetes command-line tool.

You define preflight checks and support bundles by creating `preflight.yaml`
and `support-bundle.yaml` manifest files. These files specify the cluster data
that is collected and redacted as part of the preflight check or support bundle.
The manifest files also define how the collected data is analyzed.

You then add `preflight.yaml` and `support-bundle.yaml` manifest files
to the application that you are packaging and distributing with Replicated.    

For more information about installing the `preflight` and `support-bundle` plugins,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about creating preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation.

For more information about creating support bundles, see
[Support Bundle](https://troubleshoot.sh/docs/support-bundle/introduction/) in the
Troubleshoot documentation.
