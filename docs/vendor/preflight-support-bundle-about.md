# About Preflight Checks and Support Bundles

This topic provides information about preflight checks and customize support
bundles that can be used to troubleshoot your application release before and after installation.

Host preflight checks are also supported for Replicated kURL. For more information about host preflight checks, see [Customizing Host Preflight Checks for kURL](preflight-host-preflights).

## Overview

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to help users troubleshoot issues.

* **Preflight checks**: Preflight checks let you define requirements and dependencies for the cluster
where your application is installed. Preflight checks provide clear
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

To use preflight checks and support bundles with your application, you define collectors, redactors, and analyzers in a YAML specification. Using multiple specifications is supported. For more information about using multiple specifications for preflight or support bundles, see [About Modular Specifications](support-modular-support-bundle-specs).

Depending on whether your customers install with Replicated KOTS or install with Helm, you have multiple options for making these specifications available to your customers.

For information about how to write the specifications, see:
  
  - [Define Preflight Checks for Helm Installations](preflight-helm-defining)
  - [Define Preflight Checks for KOTS](preflight-kots-defining)
  - [Customize Support Bundles for Helm Installations](support-bundle-helm-customizing)
  - [Customize Support Bundles for KOTS](support-bundles-kots-customizing)

<!-- The following table gives a brief description of the available options to distribute preflight and support bundle specifications:

<table>
    <tr>
      <th width="25%">Type</th>
      <th width="75%">Description</th>
    </tr>
    <tr>
      <th>Manual Distribution</th>
      <td><p>Specifications are manually distributed specifications to customers, who then store the files on their local file systems. This distribution method can be useful for Helm installations that are air gapped.</p></td>
    </tr>
    <tr>
      <th>URLs</th>
      <td><p>Specifications are hosted online at a URL. This allows updating support bundle specifications in between application updates to automatically notify customers of potential problems and fixes. See <a href="support-online-support-bundle-specs">About Online Support Bundle Specifications</a></p><p>Does not support Helm templates.</p></td>
    </tr>
    <tr>
      <th>OCI Registry</th>
      <td><p>Specifications are located in an image registry.</p><p>Compatible with Helm templates.</p></td>
    </tr>
    <tr>
      <th>stdin</th>
      <td><p>Preflight specifications are provided as stdin using <code>-</code> as the argument.</p><p>Compatible with Helm templates.</p><p>Cannot be used for support bundle specifications.</p></td>
    </tr>
  </table>
-->

## Running Preflight Checks

For Replicated KOTS, your customers run their preflight checks as part of the KOTS installation.

For running preflight checks with Helm installations, see [Running Preflight Checks for Helm Installations](preflight-running).

## Generating Support Bundles

Replicated KOTS customers can generate support bundles using the Replicated admin console or the CLI. 

For Helm installations, customers generate support bundles using the CLI.

For more information about generating support bundles for KOTS and Helm using the CLI, see [Generating Support Bundles](support-bundle-generating).

You can use the vendor portal to run an analysis and inspect a customer's support bundle if they need help troubleshooting. For more information, see [Inspecting Support Bundles](support-inspecting-support-bundles).