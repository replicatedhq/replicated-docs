# About Preflight Checks and Support Bundles

This topic provides an introduction to preflight checks and support bundles, which are provided by the [Troubleshoot](https://troubleshoot.sh/) open source project.

## Overview

Preflight checks and support bundles are provided by the Troubleshoot open source project, which is maintained by Replicated. Troubleshoot is a kubectl plugin that provides diagnostic tools for Kubernetes applications. For more information, see the open source [Troubleshoot](https://troubleshoot.sh/docs/collect/) documentation.

Preflight checks and support bundles analyze data from customer environments to provide insights that help users to avoid or troubleshoot common issues with an application:
* **Preflight checks** run before an application is installed to check that the customer environment meets the application requirements.
* **Support bundles** collect troubleshooting data from customer environments to help users diagnose problems with application deployments.

Preflight checks and support bundles consist of _collectors_, _redactors_, and _analyzers_ that are defined in a YAML specification. When preflight checks or support bundles are executed, data is collected, redacted, then analyzed to provide insights to users, as illustrated in the following diagram:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

[View a larger version of this image](/images/troubleshoot-workflow-diagram.png)

For more information about each step in this workflow, see the sections below.

### Collect

During the collection phase, _collectors_ gather information from the cluster, the environment, the application, and other sources.

The data collected depends on the types of collectors that are included in the preflight or support bundle specification. For example, the Troubleshoot project provides collectors that can gather information about the Kubernetes version that is running in the cluster, information about database servers, logs from pods, and more.

For more information, see the [Collect](https://troubleshoot.sh/docs/collect/) section in the Troubleshoot documentation.

### Redact

During the redact phase, _redactors_ censor sensitive customer information from the data before analysis. By default, the following information is automatically redacted:

- Passwords
- API token environment variables in JSON
- AWS credentials
- Database connection strings
- URLs that include usernames and passwords

It is also possible to add custom redactors to redact additional data. For more information, see the [Redact](https://troubleshoot.sh/docs/redact/) section in the Troubleshoot documentation.

### Analyze

During the analyze phase, _analyzers_ use the redacted data to provide insights to users.

For preflight checks, analyzers define the pass, fail, and warning outcomes, and can also display custom messages to the user. For example, you can define a preflight check that fails if the cluster's Kubernetes version does not meet the minimum version that your application supports.

For support bundles, analyzers can be used to identify potential problems and share relevant troubleshooting guidance with users. Additionally, when a support bundle is uploaded to the vendor portal, it is extracted and automatically analyzed. The goal of analyzers in support bundles is to surface known issues or hints of what might be a problem to make troubleshooting easier.

For more information, see the [Analyze](https://troubleshoot.sh/docs/analyze/) section in the Troubleshoot documentation.

## Preflight Checks


This section provides an overview of preflight checks, including how preflights are defined and run.

### Overview

Preflight checks let you define requirements for the cluster where your application is installed. When run, preflight checks provide clear feedback to your customer about any missing requirements or incompatibilities in the cluster before they install or upgrade your application. For Replicated KOTS installations, preflight checks can also be used to block the deployment of the application if one or more requirements are not met.

Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

### Defining Preflights

To add preflight checks for your application, create a preflight YAML specification that defines the collectors and analyzers that you want to include.

For information about how to add preflight checks to your application, including examples, see [Defining Preflight Checks](preflight-defining).

### (KOTS Only) Blocking Installation with Required Preflights

For applications installed with KOTS, it is possible to block the deployment of a release if a preflight check fails using the `strict` option. This is helpful when it is necessary to prevent an installation or upgrade from continuing unless a given requirement is met.

You can add required preflight checks for your application by including `strict: true` for the target analyzer in the preflight specification. For more information, see [(KOTS Only) Block Installation with Strict Analyzers](preflight-defining#kots-only-block-installation-with-strict-analyzers) in _Defining Preflight Checks_.

### Running Preflights

This section describes how users can run preflight checks for KOTS and Helm CLI installations.

#### KOTS Installations

For installations with KOTS, preflight checks run automatically as part of the installation process. The results of the preflight checks are displayed either in the KOTS admin console or in the kots CLI, depending on the installation method.

Additionally, users can access preflight checks from the admin console after installation to view their results and optionally re-run the checks.

The following shows an example of the results of preflight checks displayed in the KOTS admin console during installation:

![Preflight results in admin console](/images/preflight-warning.png)

[View a larger version of this image](/images/preflight-warning.png)

For more information about the KOTS installation process, see [About Installing an Application](/enterprise/installing-overview).

#### Helm CLI Installations

For installations of Helm-based applications with the Helm CLI, the preflight kubectl plugin is required to run preflight checks. The preflight plugin is a client-side utility that adds a single binary to the path. For more information, see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

Your customers can use the preflight plugin to optionally run preflight checks before they run `helm install`. The results of the preflight checks are then displayed through the CLI, as shown in the example below:

![Save output dialog](/images/helm-preflight-save-output.png)

[View a larger version of this image](/images/helm-preflight-save-output.png)

For more information, see [Running Preflight Checks for Helm Installations](preflight-running).

## Support Bundles

This section provides an overview of support bundles, including how support bundles are customized and generated.

### Overview

Support bundles collect and analyze troubleshooting data from customer environments, helping both users and support teams diagnose problems with application deployments.

Support bundles can collect a variety of important troubleshooting data from customer environments, such as:
* Pod logs
* Node resources and status
* The status of replicas in a Deployment
* Cluster information
* Resources deployed to the cluster
* The history of Helm releases installed in the cluster

Support bundles can also be used for more advanced use cases, such as checking that a command successfully executes in a pod in the cluster, or that an HTTP request returns a succesful response.

Support bundles then use the data collected to provide insights to users on potential problems or suggested troubleshooting steps. The troubleshooting data collected and analyzed by support bundles not only helps users to self-resolve issues in their application deployment, but also helps reduce the amount of time required by support teams to resolve requests.

### Customizing Support Bundles

To enable support bundles for your application, add a support bundle YAML specification to a release. An empty support bundle specification automatically includes several default collectors and analzyers. You can also optionally customize the support bundle specification for by adding, removing, or editing collectors and analyzers.

For more information, see [Adding and Customizing Support Bundles](support-bundle-customizing).

### Generating Support Bundles

Users generate support bundles as `tar.gz` files from the command line, using the support-bundle kubectl plugin. Enterprise customers can share support bundles with your team by sending you the resulting `tar.gz` file.

KOTS users can also generate and share support bundles from the KOTS admin console.

For more information, see [Generating Support Bundles](support-bundle-generating).