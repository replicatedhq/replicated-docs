# About Preflight Checks and Support Bundles

This topic provides an introduction to preflight checks and support
bundles, which can be used to troubleshoot your application release before and after installation.

## Overview

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to help users troubleshoot issues.

* **Preflight checks**: Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and upgrade your application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

* **Support bundles**: Support bundles let you collect and analyze troubleshooting data
from customer environments to help you diagnose problems with application
deployments.

  Customers generate support bundles from the command line, where analyzers can immediately suggest solutions to common problems. Customers can share the results with your team by sending you the resulting tar.gz file.
  
  Replicated KOTS customers can also generate support bundles from the Replicated admin console and share them with your support team.

  For any installation, your support team can upload the support bundle to the Replicated vendor portal to view and interpret the analysis. If you need help resolving an issue, you can open an issue on the [Community site](https://community.replicated.com/). 
  
  You can also open a support request ticket with Replicated if you have an SLA. Severity 1 issues are resolved three times faster when submitted with support bundles.

## Troubleshoot Workflow

The following diagram illustrates the workflow for preflight checks and support bundles:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

As shown in the diagram above, preflight checks and support bundles first use collectors to collect data from various sources, including the cluster environment and the application. Then, built-in redactors censor any sensitive information from the collected data. Finally, analyzers review the post-redacted data to identify common problems. For more information, see [Collectors](#collectors), [Redactors](#redactors), and [Analyzers](#analyzers).

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about specific types of collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

### Collectors
Collectors identify what data to collect for analysis for preflight checks and support bundles. During the collection phase, information is collected from the cluster, the environment, the application, and other sources to be used later during the analysis phase. For example, you can collect information about the Kubernetes version that is running in the cluster, information related to a database server, logs from pods, and so on.

### Redactors
Redactors censor sensitive customer information from the data gathered by the collectors, before the preflight checks and support bundles analyze the data. By default, the following information is redacted:

- Passwords
- API token environment variables in JSON
- AWS credentials
- Database connection strings
- URLs that include usernames and passwords

This functionality can be disabled by adding the `--redact=false` flag to the command. Replicated recommends leaving the redactors enabled for security purposes. 

KOTS supports adding custom redactors to support bundles.

For more detail on what information the default redactors detect, see the [Redact](https://troubleshoot.sh/docs/redact/) section in the Troubleshoot documentation.

### Analyzers
Analyzers use the post-redacted data from the collectors to identify issues. The outcomes that you specify are displayed to customers.

Analyzer outcomes for preflight checks differ from the outcomes for support bundles in terms of how they are used:

- Preflight checks use analyzers to determine pass, fail, and warning outcomes, and display messages to a customer. For example, you can define a fail or warning outcome if the Kubernetes version on the cluster does not meet the minimum version that your application supports.

- Support bundles use analyzers to help identify potential problems. When a support bundle is uploaded to the vendor portal, it is extracted and automatically analyzed. The goal of this process is to surface known issues or hints of what might be a problem. Analyzers produce outcomes that contain custom messages to explain what the problem might be.

## About Specifications

To use preflight checks and support bundles with your application, you define collectors and analyzers in a YAML specification. Using multiple specifications is supported. For more information about using multiple specifications for preflight or support bundles, see [About Modular Specifications](support-modular-support-bundle-specs).

For information about how to write the specifications, see:
  - [Defining Preflight Checks](preflight-defining)
  - [Customize Support Bundles for Helm Installations](support-bundle-helm-customizing)
  - [Customize Support Bundles for KOTS](support-bundle-kots-customizing)

## About Running Preflight Checks

For installations with Replicated KOTS, preflight checks run automatically as part of the installation process. The results of the preflight checks are displayed either in the Replicated admin console UI or in the kots CLI, depending on the installation method. For more information about the KOTS installation process, see [About Installing an Application](/enterprise/installing-overview).

For installations of Helm chart-based applications with the Helm CLI, your customers can optionally run preflight checks before they run `helm install`. In this case, preflight checks run using a `helm template` command to confirm the target cluster has the resources required for a successful installation. For more information, see [Running Preflight Checks for Helm Installations](preflight-running).

## About Generating Support Bundles

All customers can generate support bundles using the support-bundle CLI. Additionally, Replicated KOTS customers can generate support bundles through the Replicated admin console. 

For more information about generating support bundles for KOTS and Helm installations, see [Generating Support Bundles](support-bundle-generating).

You can use the vendor portal to run an analysis and inspect a customer's support bundle if they need help troubleshooting. For more information, see [Inspecting Support Bundles](support-inspecting-support-bundles).