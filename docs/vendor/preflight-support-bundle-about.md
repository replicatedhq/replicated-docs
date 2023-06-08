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
  
  Replicated KOTS customers can also generate support bundles and share them with your support team from the admin console.

  Your support team can upload the support bundle to the Replicated vendor portal to view and interpret the analysis. If you need help resolving an issue, you can open an issue on the [Community site](https://community.replicated.com/). 
  
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

## Specification Types

The preflight and support bundle tools require configuration using specifications that can be of different types and located in a variety of places. Multiple specifications and multiple specification types are supported.

The following table gives a brief description of the available types. For more information about the uses with Helm charts, see [Helm Specification Guidance](#helm).

<table>
    <tr>
      <th width="25%">Type</th>
      <th width="75%">Description</th>
    </tr>
    <tr>
      <td>YAML Files</td>
      <td>Located on the local file system. Useful for air gap installations.</td>
    </tr>
    <tr>
      <td>URLs</td>
      <td>Stored in an online repository.</td>
    </tr>
    <tr>
      <td>Secrets or ConfigMaps</td>
      <td>Stored in a Kubernetes cluster. Supports automatic discovery for support bundles. Secrets can be used to keep private information secure.</td>
    </tr>
    <tr>
      <td>stdin</td>
      <td>Supported for preflights. Specified on the command line.</td>
    </tr>
  </table>


## Helm Specification Guidance {#helm}

For Helm charts, the following additional guidance can help you decide which specification types to use.


### Preflight Guidance

The following tables can help guide you in deciding which options to use for preflight checks.

#### Secrets Without Hooks

Lets you provide preflight checks using Secrets:

<table>
    <tr>
      <th>Use Cases</th>
      <td><p>Uses helm templating to trigger preflight checks before running the <code>helm install</code> command. This requires that the preflight must be defined in a resource that can be read through stdin.</p><p>Allows customization of the preflight checks based on values unique to the customer.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Allows using template functions in a Secret.</p><p>Secrets do not need to be wrapped in a condition because Secrets are installed in the cluster.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>Not applicable.</p></td>
    </tr>
</table>

#### Preflight Custom Resource in a Template

Lets you provide preflight checks using a Preflight custom resource in a Helm template:

  <table>
    <tr>
      <th>Use Cases</th>
      <td><p>Lets customers run the <code>helm template</code> command to trigger preflight checks before installation. This requires that the preflight is defined in a resource that can be read through stdin.</p><p>Allows customization of preflight checks based on values unique to the customer</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Using a template supports adding conditional statements with template functions.</p><p>Can be read from stdin.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>The custom resource must be wrapped in a condition because the custom resource cannot be installed in the cluster.</p></td>
    </tr>
  </table>

#### YAML Files

Lets you provide preflight checks using one or more YAML files:

  <table>
    <tr>
      <th>Use Cases</th>
      <td><p>Supports air gap environments.</p><p>Allows customers to run preflight checks before installation.</p><p>Vendor does not need to customize the preflight checks based on the customer.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Easy because no customization.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>Cannot easily add hooks in the future.</p><p>It becomes burdensome for the customer when there are multiple files that must be run.</p><p>Does not support templating.</p></td>
    </tr>
  </table>

#### URLs

Lets you provide preflight checks using one or more URLs:

  <table>
    <tr>
      <th>Use Cases</th>
      <td><p>Allows customers to run preflight checks before installation.</p><p>Vendor does not need to customize the preflight checks based on the customer.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Easy to iterate against as a team.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>Does not work for air gap environments. </p><p>Cannot easily add hooks in the future.</p><p></p>It becomes burdensome for the customer if there are multiple URLs that must be run.<p>Does not support templating, unless templating is being used on the server side.</p></td>
    </tr>
  </table>


### Support Bundle Guidance

The following table can help guide you in deciding which options to use for support bundles.

#### Secrets

Lets you provide support bundle specifications using one or more Secrets:

<table>
    <tr>
      <th>Use Cases</th>
      <td><p>Lets customers automatically discover all of the support bundle specifications as Secrets in a cluster.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Does not require manual input of specifications by customers when generating support bundles.</p><p>Can be used with custom labels.</p><p>Can contain private information.</p><p>Easier to distribute than other options because Secrets are co-located in the Helm chart.</p><p>Allows the specification to be templated using information in the <code>values.yaml</code> file.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>Not applicable.</p></td>
    </tr>
  </table>

#### ConfigMaps

Lets you provide support bundle specifications using one or more ConfigMaps:

<table>
    <tr>
      <th>Use Cases</th>
      <td><p>Lets customer automatically discover all of the support bundle specifications in a cluster.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Does not require manual input of specifications by customers when generating support bundles.</p><p>Can be used with custom labels.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>Should not be used to contain private information.</p></td>
    </tr>
  </table>

#### YAML Files

Lets you provide support bundle specifications using one or more YAML files:

<table>
    <tr>
      <th>Use Cases</th>
      <td><p>Useful for air gap when customization is not needed with templates or local information, and the vendor can send the customer a file to use.</p><p>Can help to troubleshoot air gap installations that fail, as no secrets are able to be installed.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Easy to create.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>File names must be manually typed in to generate a support bundle, and there might be multiple files or long file names.</p><p>Customers must find out what the file names and paths are.</p><p>Does not use templating against the <code>values.yaml</code> file.</p></td>
    </tr>
  </table>

#### URLs

Lets you provide support bundle specifications using one or more URLs:

<table>
    <tr>
      <th>Use Cases</th>
      <td><p>The cluster can link to online support bundle specifications when the URI is included in the support bundle specification that is installed in the cluster, however the updated online specification cannot be templated.</p></td>
    </tr>
    <tr>
      <th>Advantages</th>
      <td><p>Allows vendors to update the support-bundle specification out-of-band from the application to provide notifications of possible issues, fixes, and prevention information.</p><p>If the URI is unavailable or unparseable, the support bundle is generated using the original specification in the cluster.</p><p>Easy to iterate against as a team.</p></td>
    </tr>
    <tr>
      <th>Limitations</th>
      <td><p>URLs must be manually typed in to generate a support bundle, and there might be multiple strings and long strings.</p><p>Vendors must provide customers with the URL strings.</p><p>Does not support air gap environments.</p></td>
    </tr>
  </table>

