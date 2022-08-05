# Configuring Preflight Checks and Support Bundles

This topic provides information about how to define preflight checks and customize support
bundles for your application release.

Host preflight checks are also supported for Kubernetes installers. For more information about host preflight checks, see [Customizing Host Preflight Checks for Kubernetes Installers](preflight-host-preflights).


## About Preflight Checks and Support Bundles

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to help users troubleshoot issues.

* **Preflight checks**: Preflight checks let you define requirements and dependencies for the cluster
where your application is installed. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and upgrade your application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

* **Support bundles**: Support bundles let you collect and analyze troubleshooting data
from your customers' environments to help you diagnose problems with application
deployments. Customers generate support bundles from the Replicated admin console, where analyzers can immediately suggest solutions to common problems. Customers can also share support bundles with your support team from the admin console. Your support team can upload the support bundle to the Replicated vendor portal to view and interpret the support bundle analysis.

The following diagram illustrates the workflow for preflight checks and support bundles:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

As shown in the diagram above, preflight checks and support bundles first use collectors to collect data from various sources, including the cluster environment and application. Then, built-in redactors censor any sensitive information from the collected data. Finally, analyzers review the non-redacted data to identify common problems. For more information, see [Collectors](#collectors), [Redactors](#redactors), and [Analyzers](#analyzers).

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about specific types of collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

### Collectors
Collectors identify what data to collect for analysis for preflight checks and support bundles. During the collection phase, information is collected from the cluster, the environment, the application, and other sources to be used later during the analysis phase. For example, you can collect information about the Kubernetes version that is running in the cluster, information related to a database server, logs from pods, and so on.

### Redactors
Redactors censor sensitive customer information from the data gathered by the collectors, before the preflight checks and support bundles analyze the data. By default, the following information is redacted:

- Passwords
- Tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include usernames and passwords

This functionality cannot be disabled in the Replicated app manager. You can add custom redactors to support bundles only.

### Analyzers
Analyzers use the non-redacted data from the collectors to identify issues. The outcomes that you specify are displayed to the customer. For example, you can define an outcome if the Kubernetes version on the cluster does not meet the minimum version that your application supports.

Analyzer outcomes for preflight checks differ from the outcomes for support bundles:

- Preflight checks use analyzers to determine pass, fail, and warning outcomes, and display messages to a customer during installation.

- Support bundles use analyzers to help identify potential problems. When a support bundle is uploaded to the Replicated vendor portal, it is extracted and automatically analyzed. The goal of this process is to surface known issues or hints of what might be a problem. Analyzers produce outcomes that contain custom messages to explain what the problem might be.


## Define Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For more information about defining preflight checks, see [Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/), [Collecting Data](https://troubleshoot.sh/docs/collect/), [Redacting Data](https://troubleshoot.sh/docs/redact/), and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation. For basic examples of checking CPU, memory, and disk capacity, see [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/) in the Troubleshoot documentation.

To define preflight checks:

1. Create a Preflight custom resource manifest file (`kind: Preflight`).

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: Preflight
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
1. Add collectors to define information to be collected for analysis during the analyze phase. For example, you can collect information about the MySQL version that is running in a cluster.

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

1. Add analyzers to analyze the data from the collectors that you specified. Define the criteria for the pass, fail, and/or warn outcomes and specify custom messages for each. For example, you can set a `fail` outcome if the MySQL version is less than the minimum required. Then, specify a message to display that informs your customer of the reasons for the failure and steps they can take to fix the issue.

  If you set a preflight analyzer to `strict: true`, any `fail` outcomes for that analyzer block the deployment of the release until your specified requirement is met. Consider the Replicated app manager cluster privileges when you enable the `strict` flag. If a collector that requires cluster scope cannot run in minimal RBAC mode, then the collector is skipped. Also note that strict preflight analyzers are ignored if the `exclude` flag is also used. For more information about strict preflight checks, see [`strict`](https://troubleshoot.sh/docs/analyze/#strict) in the Troubleshoot documentation. For more information about cluster privileges, see `requireMinimalRBACPrivileges` for name-scoped access in [Configuring Role-Based Access](packaging-rbac#namespace-scoped-access).

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

1. Add the manifest files to the application that you are packaging and distributing with Replicated.

1. Save and promote the release to a development environment to test your changes.


## Customize a Support Bundle

Customizing a support bundle is unique to your application. By default, support bundles contain a large number of commonly used, best practice collectors. The default `clusterInfo` and `clusterResources` collectors gather a large amount of data that is useful when remotely installing or debugging a Kubernetes application. You can supplement the default collectors.

This procedure provides a basic understanding and some key considerations to help guide you. For more information about configuring support bundles, see [Collecting Data](https://troubleshoot.sh/docs/collect/), [Redacting Data](https://troubleshoot.sh/docs/redact/), and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.

To customize a support bundle:

1. Create a support bundle manifest file (`kind: SupportBundle`) in your release.
1. Use one of the following support bundle template options to start populating your manifest file:

      - To add collectors to the default collectors, copy the following basic support bundle template to your manifest file. In this template, the collectors field is empty, so only the default collectors run until you customize this file.

        ```yaml
        apiVersion: troubleshoot.sh/v1beta2
        kind: SupportBundle
        metadata:
           name: collectors
        spec:
           collectors: []
       ```
      - To fully customize the support bundle, including editing or removing the default collectors and analyzers, copy the default `spec.yaml` file to your manifest file. For the default YAML file, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

      :::note
      To help ensure best practices, Replicated app manager does not allow any changes to the parameters in the default `clusterInfo` and `clusterResources` collectors.
      :::

1. Add, edit, or remove any collectors in the file.

1. (Recommended) Add application Pod logs and set the retention options for the number of lines logged. Typically the selector attribute is matched to the labels.

    1. To get the labels for an application, either inspect the YAML or run the following command to see what labels are used:

      ```
      kubectl get pods --show-labels
      ```

    1. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an application's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector specification multiple times.

      The limits field can support `maxAge` or `maxLines`. This limits the output to the constraints provided. **Default:** `maxLines: 10000`

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
                  maxLines: 10000
      ```            

1. Additional collectors that Replicated recommends considering are:

    - **Kubernetes resources:** Use for custom resource definitions (CRDs), secrets, and ConfigMaps, if they are required for your application to work.
    - **Databases:** Return a selection of rows or entire tables.
    - **Volumes:** Ensure that an application's persistent state files exist, are readable/writeable, and have the right permissions.
    - **Pods:** Run a pod from a custom image.
    - **Files:** Copy files from pods and hosts.
    - **HTTP:** Consume your own application APIs with HTTP requests. If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed.

1. Add analyzers based on conditions that you expect for your application. You might require that a cluster have at least 2 CPUs and 4GB memory available.

  Good analyzers clearly identify failure modes. For example, if you can identify a log message from your database component that indicates a problem, you should write an analyzer that checks for that log.

  At a minimum, include application log analyzers. A simple text analyzer can detect specific log lines and inform an end user of remediation steps.

  Additional analyzers that Replicated recommends considering are:

    - **Resource statuses:** Check the status of various resources, such as Deployments, StatefulSets, Jobs, and so on.
    - **Regular expressions:** Analyze arbitrary data.
    - **Databases:** Check the version and connection status.

1. (Optional) To add redactors to the default redactors that are automatically provided by the app manager, add the Redactor custom resource manifest (`kind: Redactor`) to your release. Then add Redactor custom resource fields to the manifest as needed.

  :::note
  The default redactors included with Replicated app manager cannot be disabled.
  :::

1. Add the manifest files to the application that you are packaging and distributing with Replicated.

1. Save and promote your release. To test this feature, generate a support bundle from the Troubleshoot tab in the admin console and do one of the following:

    - If you have a license entitlement, click **Send bundle to vendor**. You can also open the TAR file to review the files. For more information about license entitlements, see [Create a Customer](releases-creating-customer#create-a-customer).
    - Download the `support-bundle.tar.gz` file. Copy the file to the Troubleshoot tab in the [vendor portal](https://vendor.replicated.com) to see the analysis and use the file inspector.
