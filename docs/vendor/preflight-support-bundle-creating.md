# Customizing Preflight Checks and Support Bundles

This topic provides information about how to customize preflight checks and support
bundles for your application release.

Host preflight checks are also supported for Kubernetes installers. For more information about host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).


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

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about specific types of Kubernetes collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

### Collectors
Collectors identify what data to collect for analysis for preflight checks and support bundles. During the collection phase, information is collected from the cluster, the environment, the application, and other sources to be used later during the analysis phase.

By default, support bundles contain a large number of commonly used, best practice collectors. The default `clusterInfo` and `clusterResources` collectors gather a large amount of data that is useful when remotely installing or debugging a Kubernetes application.
You can edit or add that can change or supplement the default collectors.

### Redactors
Redactors censor sensitive customer information from all collectors before the analysis phase for preflight checks and support bundles. By default, the following information is redacted:

- Passwords
- Tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include usernames and passwords

This functionality can be turned off (not recommended) or customized.

### Analyzers
The analysis phase uses the output from the collection phase to identify issues and. Preflight checks and support bundles use analyzers, but the outcomes are different for each. Preflight checks use analyzers to determine outcomes and send messages to a customer during installation, depending on whether the preflight check passes, fails, or produces a warning.

When a support bundle is uploaded to the Replicated vendor portal, it is extracted and automatically analyzed. The goal of this process is to find insights that are known issues or hints of what might be a problem. Analyzers are designed to program the debugging and log reading skills into an application that is quick and easy to run for any support bundle collected.

Insights are specific items that the analyzer process finds and surfaces. Insights can contain custom messages and levels, and are specific to the output of the analysis step on each support bundle.

## Define Preflight Checks

You define preflight checks by creating a `preflight.yaml`
manifest file. This file specifies the cluster data that is collected and redacted as part of the preflight check.
The manifest file also defines how the collected data is analyzed.

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For more information about defining preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation. For basic examples for checking CPU, memory, and disk capacity, see [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/) in the Troubleshoot documentation.

To define preflight checks:

1. Create a Preflight manifest file (`kind: Preflight`).

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: Preflight
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
1. Add collectors based on conditions that you expect for your application. For example, you can collect information about the MySQL version that is running in a cluster.

  ```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: Preflight
  metadata:
    name: supported-mysql-version
    spec:
      collectors:
        - mysql:
          collectorName: mysql
          uri: 'USER:PASSWORD@tcp(HOST:PORT)/DB_NAME'
    ```

    Replace:

    - USER with the username
    - PASSWORD with the user password
    - HOST with the host or domain name
    - PORT with the port number
    - DB_NAME with the database name

1. Add an analyzer specification to analyze the data from the collectors you specified and provide outcomes. For example, you can set `fail` outcomes if the MySQL version is less than the minimum version and specify a messages informing your customer of the reasons for the failures and steps they can take to fix the issues.

  If you set a preflight analyzer to `strict: true`, any `fail` outcomes for that analyzer block the deployment of the release until your specified requirements are met. Consider the Replicated app manager cluster privileges when you enable the `strict` flag. Note that strict preflight analyzers are overwritten if the `exclude` flag is also being used. For more information about strict preflight checks, see [`strict`](https://troubleshoot.sh/docs/analyze/#strict) in the Troubleshoot documentation. For more information about cluster privileges, see [requireMinimalRBACPrivileges](https://troubleshoot.sh/docs/analyze/#strict).

    ```yaml
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: supported-mysql-version
      spec:
        collectors:
          - mysql:
            collectorName: mysql
            uri: 'USER:PASSWORD@tcp(HOST:PORT)/DB_NAME'
        analyzers:
          - mysql:
            strict: true
            checkName: Must be MySQL 8.x or later
            collectorName: mysql
            outcomes:
              - fail:
                  when: connected == false
                  message: Cannot connect to MySQL server
              - fail:
                  when: version < 8.x
                  message: The MySQL server must be at least version 8
              - pass:
                  message: The MySQL server is ready
    ```
1. Add the manifest file to the application that you are packaging and distributing with Replicated.

1. Save and promote the release to a development environment to test your changes.


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

      The limits field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines`= 10,000

      **Example:**

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
                  maxLines: 10,000
      ```            

1. Additional collectors that Replicated recommends considering are:

    - **Kubernetes resources** - Use for custom resource definitions (CRDs), secrets, and ConfigMaps, if they are required for your application to work.
    - **Databases** - Return a selection of rows or entire tables.
    - **Volumes** - Ensure that an application's persistent state files exist, are readable/writeable, and have the right permissions.
    - **Pods** - Run a pod from a custom image.
    - **Files** - Copy files from pods and hosts.
    - **HTTP** - Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

1. Add analyzers based on conditions that you expect for your application. You might require that a cluster have 2 CPUs available to your application or have a minimum of 4GB memory available. Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

  At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

  Additional analyzers that Replicated recommends considering are:

    - Resource statuses
    - Regular expressions
    - Databases

1. To customize the default redactors or add redactors for your application, you must manually add the Redactor custom resource manifest (`kind: Redactor`) to your release. Edit the redactors as needed.

  In the following example, the collectors field is empty, so only the default collectors will run.

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

1. Add the manifest file to the application that you are packaging and distributing with Replicated.


1. Save and promote your release. To test this feature, generate a support bundle from the Troubleshoot tab in the admin console and do one of the following:

    - Click **Send bundle to vendor** and open the tar bundle to review the files.
    - Download the `support-bundle.tar.gz` bundle and copy it to the Troubleshoot tab in the [vendor portal](https://vendor.replicated.com) to see the analysis and use the file inspector.
