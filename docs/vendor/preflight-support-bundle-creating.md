# Defining Preflight Checks and Support Bundles

This topic provides information about how to create preflight checks and support
bundles to include with your application. It also describes host preflight checks that you can include with the Kubernetes installer.

## About Preflight Checks and Support Bundles

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to troubleshoot issues.

* **Preflight checks**: Preflight checks allow you to define requirements and dependencies for the cluster
on which a customer installs your application. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and deploy your application. This can reduce the number of support escalations during installation.

* **Support bundles**: Support bundles allow you to collect and analyze troubleshooting data
from your customers' clusters to help you diagnose problems with application
deployments. Customers generate support bundles from the Replicated admin console and automatically upload them to your support site. Your support team can review support bundles to troubleshoot application and cluster issues. Additionally, if you are unable to troubleshoot a Kubernetes cluster issue, you can upload the related support bundle to the Replicated vendor portal to open a support ticket with Replicated.

The following diagram illustrates the workflow for preflight checks and support bundles:

![Troubleshoot Workflow Diagram](/images/troubleshoot-workflow-diagram.png)

### Collectors
Collectors are defined in a YAML manifest file that identifies what to collect and any post-processing steps that should be executed before or after creating the support bundle.
By default, preflight checks and support bundles contain a large number of commonly used, best-practice collectors. The default collectors gather a large amount of data that is useful when remotely installing or debugging a Kubernetes application.
You can edit or add that can change or supplement the default collectors.

### Analyzers
Preflight checks and support bundles use analyzers, but the outcomes are different in each. Preflight checks use analyzers to determine outcomes and send messages to a customer during installation, depending on whether the preflight check passes, fails, or optionally produces a warning.

When a support bundle is uploaded to the Replicated vendor portal, it is extracted and automatically analyzed. The goal of this process is to find insights that are known issues or hints of what might be a problem. Analyzers are designed to program the debugging and log reading skills into an application that is quick and easy to run for any support bundle collected.

Insights are specific items that the analyzer process finds and surfaces. Insights can contain custom messages and levels, and are specific to the output of the analysis step on each support bundle.

### Redactors
Redactors censor sensitive customer information from all collectors before the analysis phase. By default, the following information is redacted:

- Passwords
- Tokens
- AWS secrets
- IP addresses
- Database connection strings
- URLs that include usernames and passwords

This functionality can be turned off (not recommended) or customized.

### Default Files

You configure preflight checks and support bundles in custom resource manifest files that you include with release manifests. There are three custom resource manifest files available for troubleshooting functionality:

- **Preflight** - Contains the collectors and analyzers used for preflight checks. `kind: Preflight`

- **Support Bundle** - Contains the collectors and analyzers used for support bundle generation. `kind: SupportBundle`

- **Redactor** - Enables custom redaction during preflight checks and support bundle generation. `kind: Redactor`

These custom resource files contain default specifications for the Kubernetes cluster. You can customize these files and add collectors, analyzers, and redactors for your application. For more information, see [Customize Preflight Checks](#customize-preflight-checks) and [Customize Support Bundles](#customize-support-bundles).

If you are using the vendor portal to create a release using standard manifest files, the preflight and support bundle YAML files are automatically included as part of the Replicated manifest files. If you want to include redactors, you manually add the Redactor custom resource file to the release.

If you are using the replicated CLI, you manually add the `preflight.yaml`, `support-bundle.yaml`, and optionally the `redactor.yaml`.

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated. For more information about individual Kubernetes collectors, analyzers, and redactors, see the [Troubleshoot](https://troubleshoot.sh/) documentation.

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

    - If you want to add collectors to the default collectors, you can start with a basic support bundle manifest file (kind: SupportBundle). The brackets for the collectors field  indicate that all of the default collectors are included.

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
    - If you want to fully customize the support bundle, copy the default `spec.yaml` file to your manifest file. For the default YAML file, see [spec.yaml](https://github.com/replicatedhq/kots/blob/main/pkg/supportbundle/defaultspec/spec.yaml) in the kots repository.

1. (Recommended) Add application pod logs to check the retention options for the number of lines logged. Typically the selector attribute is matched to labels.

    1. To get the labels for an application, either inspect the YAML, or run the following command a running instance to see what labels are used:

      ```
      $ kubectl get pods --show-labels
      ```

    1. After the labels are discovered, create collectors to include logs from these pods in a bundle. Depending on the complexity of an app's labeling schema, you might need a few different declarations of the logs collector. You can include the `logs` collector specification multiple times.

      The limits field can support one or both of `maxAge` and `maxLines`. This  limits the output to the constraints provided. Defaults: `maxAge` is unset (all), and `maxLines` is 10,000 lines.

      **Example**

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
         name: collectors
      spec:
         collectors: []
            - logs:
               selector:
                   - app=api
               namespace: default
               limits:
                  maxAge: 30d
                  maxLines: 1000
      ```            

1. Additional custom collectors that you might want to include are:

    - Host collectors to check if the host is able to run Kubernetes
    - Collectors to check if the cluster is able to run the application
    - Databases
    - Volumes
    - Kubernetes resources such as secrets and ConfigMaps
    - Run a pod from a custom image
    - Copy files from pods/hosts
    - Consume your own application APIs with HTTP:
      - If your application has /status or /metrics or /health_check endpoints you can consume with HTTP, this is the most powerful way to get introspection
      - If your application has its own API that serves status, metrics, performance data, and so on, this information can be collected and analyzed

1. Add custom analyzers for each customized collector. Good analyzers clearly identify failure modes. At a minimum, include application log analyzers. For example, a simple Text Analyzer can detect specific log lines and inform an end user of remediation steps.

  Additional custom analyzers that you might want to include are:

    - Resource Statuses
    - Regular Expressions
    - Databases

1. To customize the default redactors or add redactors for your application, you must manually add the `redactor.yaml` (kind: Redactor) to your release.

  :::note
  You can turn off this functionality by passing `--redact=false` to the troubleshoot command, although Replicated recommends leaving this functionality turned on to protect your customers’ data.
  :::

  The basic redactor manifest file uses brackets for the collectors field, which indicates that all of the default collectors are included.

  **Example:**

    ```yaml
    apiVersion: troubleshoot.sh/v1beta2
    kind: Redactor
    metadata:
       name: collectors
    spec:
       collectors: []
    ```

5. Generate a support bundle from the Troubleshoot tab in the admin console and do one of the following:

    - Click **Send bundle to vendor** and open the tar bundle to review the files.
    - Download the `support-bundle.tar.gz` bundle and copy it to the Troubleshoot tab in the [vendor portal](https://vendor.replicated.com) to see the analysis and use the file inspector.


## About Host Preflight Checks for Kubernetes Installers
You can include host preflight checks with Kubernetes installers to verify that infrastructure requirements are met for:

- Kubernetes
- kURL add-ons
- Your application

This helps to ensure successful installation and the ongoing health of the cluster.

While host preflights are intended to ensure requirements are met for running the cluster, you can also use them to codify some of your application requirements so that users get feedback even earlier in the installation process, rather than waiting to run preflights after the cluster is already installed.

Default host preflight checks verify conditions such as operating system and disk usage. Default host preflight failures block the installation from continuing and exit with a non-zero return code. Users can then update their environment and run the Kubernetes installer again to re-run the host preflight checks.

Host preflight checks run automatically. The default host preflight checks that run can vary, depending on whether the installation is new, an upgrade, joining a node, or an air gap installation. Additionally, some checks only run when certain add-ons are enabled or configured a certain way in the installer. For a complete list of default host preflight checks, see [Default Host Preflights](https://kurl.sh/docs/install-with-kurl/host-preflights#default-host-preflights) in the kURL documentation.

There are general kURL host preflight checks that run with all installers. There are also host preflight checks included with certain add-ons. Customizations include the ability to:

  - Bypass failures
  - Block an installation for warnings
  - Exclude certain preflights under specific conditions, such as when a particular license entitlement is enabled
  - Skip the default host preflight checks and run only custom checks
  - Add custom checks to the default host preflight checks

For more information about customizing host preflights, see [Customize Host Preflight Checks](#customize-host-preflight-checks).


## Customize Host Preflight Checks

The default host preflights run automatically as part of your Kubernetes installer. You can customize the host preflight checks by disabling them entirely, adding customizations to the default checks to make them more restrictive, or completely customizing them. You can also customize the outcomes to enforce warnings or ignore failures.

This procedure gives examples of the customization options.

To customize host preflight checks:

1. Create a Kubernetes installer (`kind: Installer`). For more information, see [Creating a Kubernetes Installer](https://docs.replicated.com/vendor/packaging-embedded-kubernetes).

1. (Optional) To disable the default host preflight checks for Kubernetes and any add-ons, add the `kurl` field to your Installer manifest and add the `excludeBuiltinHostPreflights` set to `true`.

  This is an aggregate flag, so setting it in one specification disables default host preflights in all of the specifications.

  **Example:**

  ```yaml
  apiVersion: "cluster.kurl.sh/v1beta1"
  kind: "Installer"
  metadata:
    name: "latest"
  spec:
    kubernetes:
      version: "1.23.x"
    weave:
      version: "2.6.x"
    contour:
      version: "1.21.x"
    prometheus:
      version: "0.57.x"
    registry:
      version: "2.7.x"
    containerd:
      version: "1.5.x"
    kotsadm:
        version: "latest"
    ekco:
      version: "latest"
    minio:
      version: "2022-06-11T19-55-32Z"
    longhorn:
      version: "1.2.x"
    kurl:
      excludeBuiltinHostPreflights: true
  ```

1. (Optional) To keep the default host preflight checks and add customized host preflights, add a `hostPreflights` field to the `kurl` or add-on specification in the Installer manifest. Under the `hostPreflights` field, add a host preflight specification (`kind: HostPreflight`) with your customizations. You only need to specify your customizations because the default host preflights run automatically.

  The following example shows customized `kurl` host preflight checks for:

    - An application that requires more CPUs than the default
    - Accessing a website that is critical to the application

  ```yaml
    kubernetes:
      version: "1.23.x"
    weave:
      version: "2.6.x"
    contour:
      version: "1.21.x"
    prometheus:
      version: "0.57.x"
    registry:
      version: "2.7.x"
    containerd:
      version: "1.5.x"
    kotsadm:
        version: "latest"
    ekco:
      version: "latest"
    minio:
      version: "2022-06-11T19-55-32Z"
    longhorn:
      version: "1.2.x"
    kurl:
      hostPreflights:
        apiVersion: troubleshoot.sh/v1beta2
        kind: HostPreflight
        spec:
          collectors:
            - cpu: {}
            - http:
                collectorName: Can Access A Website
                get:
                 Url: https://myFavoriteWebsite.com
          analyzers:
            - cpu:
                checkName: Number of CPU check
                outcomes:
                  - fail:
                      when: "count < 4"
                      message: This server has less than 4 CPU cores
                  - warn:
                      when: "count < 6"
                      message: This server has less than 6 CPU cores
                  - pass:
                      message: This server has at least 6 CPU cores
            - http:
                checkName: Can Access A Website
                collectorName: Can Access A Website
                outcomes:
                  - warn:
                      when: "error"
                      message: Error connecting to https://myFavoriteWebsite.com
                  - pass:
                      when: "statuscode == 200"
                      message: Connected to https://myFavoriteWebsite.com
  ```

1. (Optional) To completely customize your host preflight collectors and analyzers:

    1. Disable the default host preflight checks using `excludeBuiltinHostPreflights: true`
    1. Copy the default `host-preflights.yaml` specification for kURL or an add-on from GitHub to the Installer YAML in the vendor portal. Copying the default specifications lets you use the best practices provided by Replicated as a template to help ensure that your customizations run successfully.

      For the default kURL host preflights YAML, see [host-preflights.yaml](https://github.com/replicatedhq/kURL/blob/main/pkg/preflight/assets/host-preflights.yaml) in the kURL repository.

      For links to the add-on YAML files, see [Finding the Add-on Host Preflight Checks](https://kurl.sh/docs/create-installer/host-preflights/#finding-the-add-on-host-preflight-checks) in the kURL documentation.

1. (Optional) Set either of the following flags to customize the outcome of your host preflight checks:

    <table>
      <tr>
        <th width="30%">Flag: Value</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td><code>hostPreflightIgnore: true</code></td>
        <td>Ignores host preflight failures and warnings. The installation proceeds.</td>
      </tr>
      <tr>
        <td><code>hostPreflightEnforceWarnings: true</code></td>
        <td>Blocks an installation if the results include a warning.</td>
      </tr>
    </table>

    The following example shows:

    - Default host preflights checks are disabled
    - Customized host preflight checks run
    - The installation is blocked if there is a warning

    ```yaml
    apiVersion: "cluster.kurl.sh/v1beta1"
    kind: "Installer"
    metadata:
      name: "latest"
    spec:
      kubernetes:
        version: "1.23.x"
      weave:
        version: "2.6.x"
      contour:
        version: "1.21.x"
      prometheus:
        version: "0.57.x"
      registry:
        version: "2.7.x"
      containerd:
        version: "1.5.x"
      kotsadm:
          version: "latest"
      ekco:
        version: "latest"
      minio:
        version: "2022-06-11T19-55-32Z"
      longhorn:
        version: "1.2.x"
      kurl:
        excludeBuiltinHostPreflights: true
        hostPreflightEnforceWarnings: true
        hostPreflights:
          apiVersion: troubleshoot.sh/v1beta2
          kind: HostPreflight
          spec:
            collectors:
              - cpu: {}
              - http:
                  collectorName: Can Access A Website
                  get:
                   Url: https://myFavoriteWebsite.com
            analyzers:
              - cpu:
                  checkName: Number of CPU check
                  outcomes:
                    - fail:
                        when: "count < 4"
                        message: This server has less than 4 CPU cores
                    - warn:
                        when: "count < 6"
                        message: This server has less than 6 CPU cores
                    - pass:
                        message: This server has at least 6 CPU cores
              - http:
                  checkName: Can Access A Website
                  collectorName: Can Access A Website
                  outcomes:
                    - warn:
                        when: "error"
                        message: Error connecting to https://myFavoriteWebsite.com
                    - pass:
                        when: "statuscode == 200"
                        message: Connected to https://myFavoriteWebsite.com
    ```

1. Promote and test your installer in a development environment before sharing it with customers.
