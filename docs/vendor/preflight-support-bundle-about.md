# About Preflight Checks and Support Bundles

This topic provides an introduction to preflight checks and support bundles, which are provided by the [Troubleshoot](https://troubleshoot.sh/) open source project.

## Overview

Preflight checks and support bundles are provided by the Troubleshoot open source project, which is maintained by Replicated. Troubleshoot is a kubectl plugin that provides diagnostic tools for Kubernetes applications. For more information, see the open source [Troubleshoot](https://troubleshoot.sh/docs/collect/) documentation.

Preflight checks and support bundles analyze data from customer environments to provide insights that help users to avoid or troubleshoot common issues with an application:
* **Preflight checks** run before an application is installed to check that the customer environment meets the application requirements.
* **Support bundles** collect troubleshooting data from customer environments to help diagnose problems with application deployments.

Preflight checks and support bundles consist of _collectors_, _redactors_, and _analyzers_ that are defined in a YAML specification. When preflight checks or support bundles are executed, data is collected, redacted, then analyzed in order to provide insights to users, as illustrated in the following diagram:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

[View a larger version of this image](/images/troubleshoot-workflow-diagram.png)

For more information about each step in this workflow, see the sections below.

### Collect

During the collection phase, _collectors_ gather information from the cluster, the environment, the application, and other sources.

The data collected depends on the types of collectors that are included in the preflight or support bundle specification. For example, the Troubleshoot project provides collectors that can gather information about the Kubernetes version that is running in the cluster, information related to a database server, logs from pods, and more.

For more information, see the [Collect](https://troubleshoot.sh/docs/collect/) section in the Troubleshoot documentation.

### Redact

During the redact phase, _redactors_ censor sensitive customer information from the data before analysis. By default, the following information is redacted:

- Passwords
- API token environment variables in JSON
- AWS credentials
- Database connection strings
- URLs that include usernames and passwords

For more information, see the [Redact](https://troubleshoot.sh/docs/redact/) section in the Troubleshoot documentation.

### Analyze

During the analyze phase, _analyzers_ use the redacted data to provide insights to users.

For preflight checks, analyzers define the pass, fail, and warning outcomes, and can also display custom messages to the user. For example, you can define a preflight check that fails if the Kubernetes version on the cluster does not meet the minimum version that your application supports.

For support bundles, analyzers can be used to identify potential problems and share relevant troubleshooting guidance with users. When a support bundle is uploaded to the vendor portal, it is extracted and automatically analyzed. The goal of this process is to surface known issues or hints of what might be a problem.

For more information, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section in the Troubleshoot documentation.

## Preflight Checks

Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks provide clear feedback to your customer about any missing requirements or incompatibilities in the cluster before they install or upgrade your application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

### Defining Preflights

To use preflight checks with your application, create a YAML specification that defines the collectors and analyzers that you want to include.

For information about how to add preflight checks to your application, see [Defining Preflight Checks](preflight-defining).

### (KOTS Only) Blocking Installation with Required Preflights

For applications installed with Replicated KOTS, it is possible to block the deployment of a release if a preflight check fails using the `strict` option. This is helpful when it is necessary to prevent an installation or upgrade from continuing unless a given requirement is met.

You can add `strict` preflight checks for your application by including `strict: true` for the target analyzer in the preflight YAML specification. For more information, see [(KOTS Only) Block Installation with Strict Analyzers](preflight-defining#kots-only-block-installation-with-strict-analyzers) in _Defining Preflight Checks_.

### Running Preflights

This section describes running preflight checks for KOTS and Helm CLI installations.

#### KOTS Installations

For installations with Replicated KOTS, preflight checks run automatically as part of the installation process. The results of the preflight checks are displayed either in the Replicated admin console UI or in the kots CLI, depending on the installation method.

Additionally, users can access preflight checks from the admin console after installation to view their results and optionally re-run the checks.

The following shows an example of the results of preflight checks displayed in the KOTS admin console during installation:

![Preflight results in admin console](/images/preflight-warning.png)

[View a larger version of this image](/images/preflight-warning.png)

For more information about the KOTS installation process, see [About Installing an Application](/enterprise/installing-overview).

#### Helm CLI Installations

For installations of Helm-based applications with the Helm CLI, your customers can optionally run preflight checks before they run `helm install`. In this case, preflight checks run using a `helm template` command to confirm the target cluster has the resources required for a successful installation.

The results of the preflight checks are displayed in the CLI, as shown in the example below:

![Save output dialog](/images/helm-preflight-save-output.png)

[View a larger version of this image](/images/helm-preflight-save-output.png)

For more information, see [Running Preflight Checks for Helm Installations](preflight-running).

## Support Bundles

Support bundles let you collect and analyze troubleshooting data from customer environments to help you diagnose problems with application deployments.

### Customizing Support Bundles

To use support bundles with your application, add a support bundle spec to a release. An empty support bundle spec automatically includes the default collectors and analzyers. You can also optionally customize support bundles for your application by adding collectors and analyzers to the default spec.

For more information, see [Adding and Customizing Support Bundles](support-bundle-customizing).

### Generating Support Bundles

Customers generate support bundles from the command line, where analyzers can immediately suggest solutions to common problems. Customers can share the results with your team by sending you the resulting tar.gz file.

Replicated KOTS customers can also generate support bundles from the KOTS admin console and share them with your support team.

For any installation, your support team can upload the support bundle to the Replicated vendor portal to view and interpret the analysis. If you need help resolving an issue, you can open an issue on the Community site.

You can also open a support request ticket with Replicated if you have an SLA. Severity 1 issues are resolved three times faster when submitted with support bundles.

For more information about generating support bundles for KOTS and Helm CLI installations, see [Generating Support Bundles](support-bundle-generating).