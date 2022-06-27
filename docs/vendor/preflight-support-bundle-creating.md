# Creating Preflight Checks and Support Bundles

This topic provides information about how to create preflight checks and support
bundles and include them with your application.

## About Preflight Checks and Support Bundles

Preflight checks and support bundles are both available through the open source
Replicated Troubleshoot project.

* **Support bundles**: Support bundles allow you to collect and analyze troubleshooting data
from your customers' clusters to help you diagnose problems with application
deployments.

* **Preflight checks**: Preflight checks allow you to define requirements and dependencies for the cluster
on which a customer installs your application. Preflight checks provide clear
feedback to your customer about any missing requirements or incompatibilities in
the cluster before they install and deploy your application. This can reduce the number of support escaltions during installation.

* **Strict preflight checks**: When an analyzer is marked as [`strict`](https://troubleshoot.sh/docs/analyze/#strict), any `fail` outcomes for that analyzer block the deployment of the release. This can be used to prevent users from deploying a release until vendor-specified requirements are met. When configuring `strict` preflight checks, vendors should consider the app manager [cluster privileges](../reference/custom-resource-application#requireminimalrbacprivileges).

* **Host preflight checks**: Host preflight checks can be defined for Kubernetes installers to codify your infrastructure requirements and some of your application system requirements before Kubernetes is installed. See [About Host Preflight Checks](#about-host-preflight-checks-for-kubernetes-installers).

## Defining Preflight Checks

You can create preflight checks with the `preflight` plugin for the `kubectl` Kubernetes command-line tool.

You define preflight checks by creating a `preflight.yaml`
manifest file. This file specifies the cluster data that is collected and redacted as part of the preflight check.
The manifest file also defines how the collected data is analyzed.

You then add the `preflight.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing the `preflight` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about creating preflight checks, see
[Preflight Checks](https://troubleshoot.sh/docs/preflight/introduction/) in the
Troubleshoot documentation. There are also a number of basic examples for checking CPU, memory, and disk capacity under [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/).

## About Host Preflight Checks for Kubernetes Installers
Kubernetes installers can include host preflight checks to verify your infrastructure requirements are met before installing Kubernetes and help ensure the ongoing health of the cluster. Host preflight checks can also verify that minimum requirements are met for kURL add-ons.

You can codify some of your application requirements as part of the host preflight checks so that users get feedback before installing the application. For example, you can check that there are enough CPUs to run your application before Kubernetes is installed, which saves time and effort for your customer.

Default host preflight checks verify conditions such as operating system and disk usage. Default host preflight failures block the installation from continuing and exit with a non-zero return code. Customizations can include:

- Bypassing failures
- Blocking an installation for warnings
- Skipping the default host preflight checks and running only custom checks

Host preflight checks can also vary, depending on whether the installation is new, a joining node, an air gap installation, and so on. For a complete list of default host preflight checks, see [Default Host Preflights](https://kurl.sh/docs/install-with-kurl/host-preflights#default-host-preflights) in the kURL documentation.

### Customize Host Preflight Checks

Default host preflight checks for Kubrnetes installers can be disabled, added to, bypassed, or customized using advanced options. For more information about kURL advanced options, see [Advanced Options](https://kurl.sh/docs/install-with-kurl/advanced-options) in the kURL documentation.

To customize host preflight checks:

1. Add host preflights to your Kubernetes installer specification (kind: Installer). You can get the installer YAML from [kurl.sh](https://kurl.sh/).

  **Example:**

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
    ekco:
      version: "latest"
    minio:
      version: "2022-06-11T19-55-32Z"
    longhorn:
      version: "1.2.x"
    kurl:
      airgap: true
      proxyAddress: http://10.128.0.70:3128
      additionalNoProxyAddresses:
      - .corporate.internal
      noProxy: false
      licenseURL: https://somecompany.com/license-agreement.txt
      nameserver: 8.8.8.8
      skipSystemPackageInstall: false
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

1. Set `excludeBuiltinHostPreflights: true` to disable the default host preflights.

    This allows three options:
    - Exclude host preflights entirely
    - Run custom host preflights in addition to the defaults
    - Completely customize host preflights 

1. (Optional) Set `hostPreflightIgnore: true` to ignore host preflight failures and warnings.

1. (Optional) Set `hostPreflightEnforceWarnings: true` to block an installation by enforcing a warning.

1. (Optional) Define custom collectors and analyzers.

  ```
  kurl:
    airgap: true
    proxyAddress: http://10.128.0.70:3128
    additionalNoProxyAddresses:
    - .corporate.internal
    noProxy: false
    licenseURL: https://somecompany.com/license-agreement.txt
    nameserver: 8.8.8.8
    skipSystemPackageInstall: false
    excludeBuiltinHostPreflights: true
    hostPreflightIgnore: true
    hostPreflightEnforceWarnings: true
    hostPreflights:
      apiVersion: troubleshoot.sh/v1beta2
      kind: HostPreflight
      spec:
        collectors:
          - cpu: {}
          - http:
       collectorName: Can Access My Application
               get:
           Url: https://myApplication.com
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
      Http:
      checkName: Can Access My Application
      collectorName: Can Access My Application
      ```

## Defining Support Bundles

You can create support bundles with the `support-bundle` plugin for the `kubectl` Kubernetes command-line tool.

You define support bundles by creating a `support-bundle.yaml` manifest file. This file specifies the cluster data
that is collected and redacted as part of the support bundle. The manifest file also defines how the collected data is analyzed.

You then add the `support-bundle.yaml` manifest file to the application that you are packaging and distributing with Replicated.    

For more information about installing `support-bundle` plugin,
see [Getting Started](https://troubleshoot.sh/docs/) in the Troubleshoot documentation.

For more information about creating support bundles, see
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
