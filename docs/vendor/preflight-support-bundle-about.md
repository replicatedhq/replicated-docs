# About Preflight Checks and Support Bundles

This topic provides an introduction to preflight checks and support
bundles, which can be used .

## Overview

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

Preflight checks and support bundles collect and analyze data in the customer environment for help troubleshooting an application release both before and after installation:
* _Preflight checks_ can be run before installation to check that the installation environment meets requirements.
* _Support bundles_ collect data from customer environments to help diagnose problems with application deployments.

## Workflow for Preflight Checks and Support Bundles

The following diagram illustrates the workflow for preflight checks and support bundles:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

As shown in the diagram above, preflight checks and support bundles use the following workflow:
1. Collectors collect data from various sources, including the cluster environment and the application. 
1. Built-in redactors censor any sensitive information from the collected data.
1. Finally, analyzers review the post-redacted data to identify common problems.

### Collect
Collectors identify what data to collect for analysis for preflight checks and support bundles. During the collection phase, information is collected from the cluster, the environment, the application, and other sources to be used later during the analysis phase. For example, you can collect information about the Kubernetes version that is running in the cluster, information related to a database server, logs from pods, and so on.

### Redact
Redactors censor sensitive customer information from the data gathered by the collectors, before the preflight checks and support bundles analyze the data. By default, the following information is redacted:

- Passwords
- API token environment variables in JSON
- AWS credentials
- Database connection strings
- URLs that include usernames and passwords

This functionality can be disabled by adding the `--redact=false` flag to the command. Replicated recommends leaving the redactors enabled for security purposes. Additionally, Replicated KOTS supports adding custom redactors to support bundles.

For more detail on what information the default redactors detect, see the [Redact](https://troubleshoot.sh/docs/redact/) section in the Troubleshoot documentation.

### Analyze
Analyzers use the post-redacted data from the collectors to identify issues. The outcomes that you specify are displayed to customers.

Analyzer outcomes for preflight checks differ from the outcomes for support bundles in terms of how they are used:

- Preflight checks use analyzers to determine pass, fail, and warning outcomes, and display messages to a customer. For example, you can define a fail or warning outcome if the Kubernetes version on the cluster does not meet the minimum version that your application supports.

- Support bundles use analyzers to help identify potential problems. When a support bundle is uploaded to the vendor portal, it is extracted and automatically analyzed. The goal of this process is to surface known issues or hints of what might be a problem. Analyzers produce outcomes that contain custom messages to explain what the problem might be.