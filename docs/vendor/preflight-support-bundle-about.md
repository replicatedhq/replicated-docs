# About Preflight Checks and Support Bundles

This topic provides information about how to define preflight checks and customize support
bundles for your application release.

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

This functionality can be disabled by adding the `--redact=false` flag to the command. Replicated recommends leaving the redactors enabled for security purposes. You can add custom redactors to support bundles only.

For more detail on what information the default redactors detect, see the [Redact](https://troubleshoot.sh/docs/redact/) section in the Troubleshoot documentation.

### Analyzers
Analyzers use the post-redacted data from the collectors to identify issues. The outcomes that you specify are displayed to customers.

Analyzer outcomes for preflight checks differ from the outcomes for support bundles in terms of how they are used:

- Preflight checks use analyzers to determine pass, fail, and warning outcomes, and display messages to a customer. For example, you can define a fail or warning outcome if the Kubernetes version on the cluster does not meet the minimum version that your application supports.

- Support bundles use analyzers to help identify potential problems. When a support bundle is uploaded to the vendor portal, it is extracted and automatically analyzed. The goal of this process is to surface known issues or hints of what might be a problem. Analyzers produce outcomes that contain custom messages to explain what the problem might be.

## Specification Locations and Access

Preflight and support bundle specifications can be located and accessed in various ways. 

Additionally, using multiple specifications and multiple specification locations are supported. For more information about using:

- Multiple specifications for preflight or support bundle specifications, see [About Modular Specifications](support-modular-support-bundle-specs).
- URLs for support bundles, see [About Online Support Bundle Specifications](support-online-support-bundle-specs).

The following table gives a brief description of the available options to store and access your preflight and support bundle specifications:

<table>
    <tr>
      <th width="25%">Type</th>
      <th width="75%">Description</th>
    </tr>
    <tr>
      <th>YAML Files</th>
      <td>Specifications can be distributed directly to your customers and stored on their local file systems. Can be useful for air gap installations.</td>
    </tr>
    <tr>
      <th>URLs</th>
      <td><p>Specifications can be hosted online at a URL. Easy to iterate against as a team.</p><p>This also allows updating support bundle specifications in between application updates to notify customers of potential problems and fixes.</p></td>
    </tr>
    <tr>
      <th>OCI Registry</th>
      <td><p>Specifications are located in an image registry.</p></td>
    </tr>
    <tr>
      <th>stdin</th>
      <td><p>Specifications are provided as stdin from a Helm chart using <code>-</code> as the argument. Can be used by Helm installations, and is compatible with using Helm templates.</p></td>
    </tr>
  </table>

  For information about how to write the specifications, see:
  
  - [Define Preflight Checks for Helm Installations](preflight-helm-defining)
  - [Define Preflight Checks for KOTS](preflight-kots-defining)
  - [Customize Support Bundles for Helm Installations](support-bundle-helm-customizing)
  - [Customize Support Bundles for KOTS](support-bundles-kots-customizing)