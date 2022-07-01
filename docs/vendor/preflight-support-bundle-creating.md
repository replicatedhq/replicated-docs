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

## Define Preflight Checks

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

## About Host Preflight Checks for Kubernetes Installers
You can include host preflight checks with Kubernetes installers to verify that infrastructure requirements are met for:

- Kubernetes
- kURL add-ons
- Your application

This helps to ensure successful installation and the ongoing health of the cluster.

While host preflights are intended to ensure requirements are met for running the cluster, you can also use them to codify some of your application requirements so that users get feedback even earlier in the installation process, rather than waiting to run preflights after the cluster is already installed.

Default host preflight checks verify conditions such as operating system and disk usage. Default host preflight failures block the installation from continuing and exit with a non-zero return code. Users can then update their environment and run the Kubernetes installer again to re-run the host preflight checks.

Host preflight checks run automatically. Default checks can vary, depending on whether the installation is new, an upgrade, joining a node, or an air gap installation. Additionally, some checks only run when certain add-ons are enabled or configured a certain way in the installer. For a complete list of default host preflight checks, see [Default Host Preflights](https://kurl.sh/docs/install-with-kurl/host-preflights#default-host-preflights) in the kURL documentation.

Host preflight checks can be partially or completely customized. For more information about customizing kURL host preflights, see [Customizing Host Preflights](https://kurl.sh/docs/create-installer/host-preflights/) in the kURL documentation.


## Include Host Preflight Checks

Include the default host preflights in your Kubernetes installer YAML file to retain Replicated best practices. Then, you can customize parts of the specification if needed. Customizations include the ability to:

- Bypass failures
- Block an installation for warnings
- Exclude certain preflights under specific conditions, such as when a particular license entitlement is enabled
- Skip the default host preflight checks and run only custom checks

To include host preflight checks:

1. Get the Kubernetes installer YAML (kind: "Installer") and add-ons from the landing page at [kurl.sh](https://kurl.sh/). To use Replicated app manager, you must include the KOTS add-on.

1. Add the default kURL host preflights YAML to the installer YAML. See [host-preflights.yaml](https://github.com/replicatedhq/kURL/blob/main/pkg/preflight/assets/host-preflights.yaml) in the kURL repository.

1. Add the default `host-preflights.yaml` specification for each kURL add-on to the installer YAML. You must add the appropriate version for each add-on. For the links to the YAML files for each add-on, see [Finding the Add=on Host Preflight Checks](https://github.com/replicatedhq/kURL/blob/main/pkg/preflight/assets/host-preflights.yaml) in the kURL documentation.

1. Add the `kurl` specification to the installer. See [Kurl Add-On](https://kurl.sh/docs/add-ons/kurl) in the kURL documentation.

  The following example shows a Kubernetes installer manifest with a `kurl` configuration for default host preflight flags set to the default values for the kURL add-on. For simplicity, the host preflights for the other add-ons are not displayed.

  ```
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
      excludeBuiltinHostPreflights: false
      hostPreflightIgnore: false
      hostPreflightEnforceWarnings: false
      hostPreflights:
      apiVersion: troubleshoot.sh/v1beta2
      kind: HostPreflight
      spec:
        collectors:
          - cpu: {}
        analyzers:
          - cpu:
              checkName: Number of CPU check
              outcomes:
                - warn:
                    when: "count < 6"
                    message: This server has less than 6 CPU cores
                - fail:
                    when: "count < 4"
                    message: This server has less than 4 CPU cores
                - pass:
                    when: "count >= 6"
                    message: This server has at least 6 CPU cores
  ```

1. (Optional) Set any of the following keys to customize host preflights:

    <table>
      <tr>
        <th width="30%">Key: Value</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>`excludeBuiltinHostPreflights: true`</td>
        <td>Disables the default host preflights for Kubernetes and any included add-ons</td>
      </tr>
      <tr>
        <td>`hostPreflightIgnore: true`</td>
        <td>Ignores host preflight failures and warnings</td>
      </tr>
      <tr>
        <td>`hostPreflightEnforceWarnings: true`</td>
        <td>Blocks an installation if the results include a warning</td>
      </tr>
    </table>

1. (Optional) Add a `hostPreflights` specification to the Installer YAML file to define custom collectors and analyzers.

  The following example shows:
    - Default host preflight checks are disabled
    - Preflight failures and warnings will be enforced
    - Installation will be blocked for warnings
    - Customized checks for an application that requires more CPUs than the default
    - Customized checks for accessing a website that is critical to the business

  ```
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
      hostPreflightIgnore: false
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
Usually this will be done with label selectors. To get the labels for an application, either inspect the YAML, or run the following YAML against a running instance to see what labels are used:

```shell
kubectl get pods --show-labels
```

Once the labels are discovered, a [logs collector](https://troubleshoot.sh/reference/collectors/pod-logs/) can be used to include logs from these pods in a bundle.
Depending on the complexity of an app's labeling schema, you may need a few different declarations of the `logs` collector.

As common issues are encountered in the field, it will make sense to add not only collectors but also analyzers to an app's troubleshooting stack. For example, when an error in a log file is discovered that should be surfaced to an end user in the future, a simple [Text Analyzer](https://troubleshoot.sh/reference/analyzers/regex/) can detect specific log lines and inform an end user of remediation steps.
