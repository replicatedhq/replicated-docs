# Customizing Preflight Checks and Support Bundles

This topic provides information about how to customize preflight checks and support
bundles for your application release.

Host preflight checks are supported for Kubernetes installers. For more information about host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).


## About Preflight Checks and Support Bundles

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to troubleshoot issues.

* **Preflight checks**: Preflight checks let you define requirements and dependencies for the cluster
where your application is installed. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and upgrade your application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

* **Support bundles**: Support bundles let you collect and analyze troubleshooting data
from your customers' clusters to help you diagnose problems with application
deployments. Customers generate support bundles from the Replicated admin console, where analyzers can immediately suggest solutions to common problems and support bundles can be shared with your support team. Your support team can upload the support bundle to the Replicated vendor portal for further diagnosis using Replicated analyzers.

The following diagram illustrates the workflow for preflight checks and support bundles:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about individual Kubernetes collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

### Collectors
Collectors are defined in a YAML manifest file that identifies what to collect and any post-processing steps that should be executed before or after creating the support bundle.
By default, preflight checks and support bundles contain a large number of commonly used, best-practice collectors. The default `clusterInfo` and `clusterResources` collectors gather a large amount of data that is useful when remotely installing or debugging a Kubernetes application.
You can edit or add that can change or supplement the default collectors.

### Redactors
Redactors censor sensitive customer information from all collectors before the analysis phase. By default, the following information is redacted:

- Passwords
- Tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include usernames and passwords

This functionality can be turned off (not recommended) or customized.

### Analyzers
Preflight checks and support bundles use analyzers, but the outcomes are different for each. Preflight checks use analyzers to determine outcomes and send messages to a customer during installation, depending on whether the preflight check passes, fails, or produces a warning.

When a support bundle is uploaded to the Replicated vendor portal, it is extracted and automatically analyzed. The goal of this process is to find insights that are known issues or hints of what might be a problem. Analyzers are designed to program the debugging and log reading skills into an application that is quick and easy to run for any support bundle collected.

Insights are specific items that the analyzer process finds and surfaces. Insights can contain custom messages and levels, and are specific to the output of the analysis step on each support bundle.

## About Default Files

You configure preflight checks and support bundles in custom resource manifest files that you include with release manifests. There are three custom resources available for troubleshooting:

- **Preflight** - Contains the collectors and analyzers used for preflight checks. `kind: Preflight`

- **Support Bundle** - Contains the collectors and analyzers used for support bundle generation. `kind: SupportBundle`

- **Redactor** - Enables custom redaction during preflight checks and support bundle generation. `kind: Redactor`

These custom resource files contain default specifications for the Kubernetes cluster. You can customize these files and add collectors, analyzers, and redactors for your application. For more information, see [Customize Preflight Checks](#customize-preflight-checks) and [Customize Support Bundles](#customize-support-bundles).

If you are using the vendor portal to create a release using standard manifest files, the preflight and support bundle YAML files are automatically included as part of the Replicated manifest files. If you want to include redactors, you manually add the Redactor custom resource file to the release.

If you are using the replicated CLI, you manually add the Preflight, Support Bundle, or Redactor custom resource manifests to your release.

## Customize Preflight Checks

You define preflight checks by creating a `preflight.yaml`
manifest file. This file specifies the cluster data that is collected and redacted as part of the preflight check.
The manifest file also defines how the collected data is analyzed.

When an analyzer is marked as [`strict`](https://troubleshoot.sh/docs/analyze/#strict), any `fail` outcomes for that analyzer block the deployment of the release. This can be used to prevent users from deploying a release until vendor-specified requirements are met. When configuring strict preflight checks, vendors should consider the app manager [cluster privileges](../reference/custom-resource-application#requireminimalrbacprivileges).

You then add the `preflight.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing the `preflight` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about defining preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation. There are also a number of basic examples for checking CPU, memory, and disk capacity under [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/).

## Customize a Support Bundle

Customizing a support bundle is unique to your application. This procedure provides a basic understanding and some key considerations to help guide you.

To customize a support bundle:

1. Start with either YAML file option and add custom collectors to the file:

    - If you want to add collectors to the default collectors, you can start with a basic support bundle manifest file (`kind: SupportBundle`). In the following example, the collectors field is empty, so only the default collectors will run.

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
    - If you want to fully customize the support bundle, copy the default `spec.yaml` file to your manifest file. For the default YAML file, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

      :::note
      The default collectors `clusterInfo` and `clusterResources` do not accept any parameters.
      :::

1. (Recommended) Add application pod logs and set the retention options for the number of lines logged. Typically the selector attribute is matched to the labels.

    1. To get the labels for an application, either inspect the YAML or run the following command a running instance to see what labels are used:

      ```
      kubectl get pods --show-labels
      ```

    1. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector specification multiple times.

      The limits field can support `maxAge` or `maxLines`. This  limits the output to the constraints provided. **Defaults:** `maxLines`= 10,000

      **Example**

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
         name: collectors
      spec:
         collectors:
            - logs:
               selector:
                   - app=api
               namespace: default
               limits:
                  maxAge: 30d
      ```            

1. Additional collectors that Replicated recommends considering are:

    - **Kubernetes resources** - For custom resource definitions (CRDs), secrets, and ConfigMaps, if they are required for your application to work.
    - **Databases** - To return a selection of rows or entire tables.
    - **Volumes** - To ensure that an application's persistent state files exist, are readable/writeable, and have the right permissions.
    - **Pods** - Run a pod from a custom image.
    - **Files** - Copy files from pods and hosts.
    - **HTTP** - Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

1. Add analyzers based on conditions you expect for your application. You might require that a cluster have 2 CPUs available to your application, or have a minimum of 4GB memory available. Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

  At a minimum, include application log analyzers. For example, a simple text analyzer can detect specific log lines and inform an end user of remediation steps.

  Additional analyzers that Replicated recommends considering are:

    - Resource statuses
    - Regular expressions
    - Databases

1. To customize the default redactors or add redactors for your application, you must manually add the Redactor custom resource manifest (`kind: Redactor`) to your release. Edit the redactors as needed.

  The basic redactor manifest file uses brackets for the collectors field, which s that all of the default collectors are included.

  **Example:**

    ```yaml
    apiVersion: troubleshoot.sh/v1beta2
    kind: Redactor
    metadata:
       name: collectors
    spec:
       collectors: []
    ```

  :::note
  You can turn off this functionality by passing `--redact=false` to the troubleshoot command, although Replicated recommends leaving this functionality turned on to protect your customers’ data.
  :::

5. Save and promote your release. To test this feature, generate a support bundle from the Troubleshoot tab in the admin console and do one of the following:

    - Click **Send bundle to vendor** and open the tar bundle to review the files.
    - Download the `support-bundle.tar.gz` bundle and copy it to the Troubleshoot tab in the [vendor portal](https://vendor.replicated.com) to see the analysis and use the file inspector.
