# Defining Preflight Checks and Support Bundles

This topic provides information about how to create preflight checks and support
bundles to include with your application, and host preflight checks that you can include with the Kubernetes installer.

## About Preflight Checks and Support Bundles

Preflight checks and support bundles collect and analyze data in the environment to ensure requirements are met and to troubleshoot issues.

* **Preflight checks**: Preflight checks allow you to define requirements and dependencies for the cluster
on which a customer installs your application. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and deploy your application. This can reduce the number of support escalations during installation.

* **Support bundles**: Support bundles allow you to collect and analyze troubleshooting data
from your customers' clusters to help you diagnose problems with application
deployments.

Preflight checks and support bundles are based on the open-source Troubleshoot project, which is maintained by Replicated.

## Customize Preflight Checks

Customizing preflight checks is unique to your application. This procedure provides a basic understanding and some key considerations to help guide you.

To customize preflight checks:

1. Start with either YAML file option:

    - If you want to add collectors to the default collectors, you can start with a basic support bundle manifest file (`kind: SupportBundle`). In the following example, the collectors field is empty, so only the default collectors will run.

      ```yaml
      apiVersion: troubleshoot.sh/v1beta2
      kind: Preflight
      metadata:
         name: collectors
      spec:
         collectors: []
     ```
    - If you want to fully customize the support bundle, copy the default preflight YAML file to your manifest file. For the default YAML file, see [kots-preflight.yaml](https://github.com/replicatedhq/kots-default-yaml/blob/main/kots-preflight.yaml) in the kots repository.

      :::note
      The default collectors `clusterInfo` and `clusterResources` do not accept any parameters.
      :::

1. Add collectors and analyzers based on conditions that you expect for your application. For example, you can collect information about the MySQL version that is running in a cluster, then specify outcomes in an analyzer. Optionally, you can set the `strict` flag to `true` to ensure that the installation does not proceed with an unsupported version of MySQL.

  ```yaml
  apiVersion: troubleshoot.sh/v1beta2
  kind: Preflight
  metadata:
    name: supported-mysql-version
    spec:
      collectors:
        - mysql:
          collectorName: mysql
          uri: '<user>:<password>@tcp(<host>:<port>)/<dbname>'
          ```
1. Add an analyzer specification to analyze the collected data and provide outcomes. For example, you can set `fail` outcomes if the MySQL version is less than the minimum version and specify an message informing your customer of the reasons for the failure and steps they can take to fix the issue.

  You can optionally set strict preflight checks. When an analyzer is marked as [`strict`](https://troubleshoot.sh/docs/analyze/#strict), any `fail` outcomes for that analyzer block the deployment of the release (unless an `exclude` flag is also being used). This can be used to prevent users from deploying a release until vendor-specified requirements are met. When configuring strict preflight checks, vendors should consider the app manager [cluster privileges](../reference/custom-resource-application#requireminimalrbacprivileges).

    ```yaml
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: supported-mysql-version
      spec:
        collectors:
          - mysql:
            collectorName: mysql
            uri: '<user>:<password>@tcp(<host>:<port>)/<dbname>'
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

1. Save and promote the release to a development environment to test your changes.

For more information about defining preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation. There are also a number of basic examples for checking CPU, memory, and disk capacity under [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/).

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

## Define Support Bundles

You define support bundles by creating a `support-bundle.yaml` manifest file. This file specifies the cluster data
that is collected and redacted as part of the support bundle. The manifest file also defines how the collected data is analyzed.

You then add the `support-bundle.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing `support-bundle` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about defining support bundles, see
[Support Bundle](https://troubleshoot.sh/docs/support-bundle/introduction/) in the
Troubleshoot documentation.

### Bundling and Analyzing Logs with Support Bundle

A robust support bundle is essential to minimizing back-and-forth when things go wrong.
At a very minimum, every app's support bundle should contain logs for an application's core pods.
Usually this is done with label selectors. To get the labels for an application, either inspect the YAML, or run the following YAML against a running instance to see what labels are used:

```shell
kubectl get pods --show-labels
```

After the labels are discovered, a [logs collector](https://troubleshoot.sh/reference/collectors/pod-logs/) can be used to include logs from these pods in a bundle.
Depending on the complexity of an app's labeling schema, you may need a few different declarations of the `logs` collector.

As common issues are encountered in the field, it makes sense to add not only collectors but also analyzers to an app's troubleshooting stack. For example, when an error in a log file is discovered that should be surfaced to an end user in the future, a simple [Text Analyzer](https://troubleshoot.sh/reference/analyzers/regex/) can detect specific log lines and inform an end user of remediation steps.
