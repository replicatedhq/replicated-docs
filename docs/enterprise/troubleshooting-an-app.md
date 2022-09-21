# Generating Support Bundles

The Replicated admin console includes a Troubleshoot page where you can generate an analysis and review remediation suggestions for troubleshooting an application. You can also download a support bundle to share with your vendor.

## Create a Support Bundle using the Admin Console

1. From the admin console, select the Troubleshoot tab.

  ![Troubleshoot](/images/troubleshoot.png)

1. Click **Analyze** to start analyzing the application.

  The analysis executes the support bundle plugin. After the analysis completes, the bundle is available on the Troubleshoot tab in the admin console. If any known issues are detected, they are highlighted with possible remediation suggestions.

  :::note
  No data leaves the cluster. Data is never sent across the internet or to anyone else.
  :::

  ![Analysis](/images/analysis.png)

1. (Optional) Click **Download bundle** to download the support bundle. You can send the bundle to your vendor for assistance.

## Creating a Support Bundle Using the CLI

You can generate a support bundle using the CLI instead of the admin console. For example, if an installation fails when you are using an embedded KURL cluster to install the Replicated admin console or upload the application, the admin console may not be available.

### Prerequisite: Install the Support Bundle Plugin

The `support-bundle` kubectl plugin is required to generate a support bundle.

To install the plugin, do one of the following actions:

- If krew is _not_ installed, run the following command:

    ```
    curl https://krew.sh/support-bundle | bash
    ```

- If krew is installed, run the following command:

    ```
    kubectl krew install support-bundle
    ```

### Create a Support Bundle with the CLI

Create a support bundle using one of the following methods, depending on your environment or situation.

#### With the Default kots.io Specification

To use the default kots.io specification, run the following command to create a support bundle:

  ```
  kubectl support-bundle https://kots.io
  ```

#### On an Air Gap Server
If you are on an air gapped server, perform the following steps to create a support bundle:

1. Run the following command from a computer with internet access to download the default kots.io specification:

    ```
    curl -o spec.yaml https://kots.io -H 'User-agent:Replicated_Troubleshoot/v1beta1'
    ```

1. Upload the `spec.yaml` file to the air gapped server.

1. Run the following command to create a support bundle using the uploaded `spec.yaml` file:

    ```
    kubectl support-bundle /path/to/spec.yaml
    ```

#### When the Admin Console and Application are Installed

If the admin console is running and the application is installed, run the following command to create a support bundle that includes any customization specific to the application from the [support-bundle.yaml manifest file](/vendor/preflight-support-bundle-creating#creating-support-bundles):

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot/<app-slug>
  ```

#### When the Application is not Installed
If the application is not installed but the admin console is running, run the following command to create a support bundle with additional customization from the admin console:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot
  ```

  ## About Host Collectors and Analyzers

  Host collectors and analyzers are designed to collect information from Kubernetes installer-created clusters (embedded clusters) that is not available from in-cluster collectors. Host collectors gather information directly from the host they are run on and do not have Kubernetes as a dependency.

  You can gather information about the environment, such as CPU, memory, available block devices, and the operating system. Host collectors can also be used for testing network connectivity and gathering the output of provided commands.

  This information is useful when you need to debug a Kubernetes installer cluster that is offline, troubleshoot a Kubernetes installer that failed before the control plane was initialized, or if you need to collect and analyze information that is not available with in-cluster collectors.

  ## Define Host Collectors and Analyzers

  Create a separate SupportBundle custom resource to specify host collectors and analyzers because host collectors are intended to run directly on the host using the CLI and not with KOTS. If KOTS runs host collectors, the collectors are unlikely to produce the desired results because they run in the context of the kotsadm Pod. The support-bundle CLI is used to run the host collectors and analyzers on the host.

  To define host collectors and analyzers:

  1. Create a SupportBundle custom resource manifest file (`kind: SupportBundle`) in your release that is a separate file than your in-cluster support bundle manifest.

  1. Define all of your host collectors and analyzers in one manifest file. You can use the following resources to help create your specification:

      - Access sample specifications in the the Replicated troubleshoot-specs repository, which provides aggregate specifications for supporting your customers. See [troubleshoot-specs](https://github.com/replicatedhq/troubleshoot-specs) in GitHub.

      - View a list and details of the available host collectors and analyzers. See [All Host Collectors and Analyzers](https://troubleshoot.sh/docs/host-collect-analyze/all/) in the Troubleshoot documentation.

      **Example:**

      The following example shows host collectors and analyzers for the number of CPUs and the amount of memory.

      ```
      apiVersion: troubleshoot.sh/v1beta2
      kind: SupportBundle
      metadata:
        name: host-collectors
      spec:
        hostCollectors:
          - cpu: {}
          - memory: {}
        hostAnalyzers:
          - cpu:
              checkName: "Number of CPUs"
              outcomes:
                - fail:
                    when: "count < 2"
                    message: At least 2 CPU cores are required, and 4 CPU cores are recommended
                - pass:
                    message: This server has at least 4 CPU cores
          - memory:
              checkName: "Amount of Memory"
              outcomes:
                - fail:
                    when: "< 4G"
                - pass:
                    message: The system has at least 8G of memory
      ```

## Run Host Collectors and Analyzers

You run host collectors and analyzers to generate a support bundle to help with troubleshooting or to gather information about the environment. Your vendor provides you with a support-bundle YAML file that you run with a command to generate the support bundle on the host.

Root access is typically not required to run the host collectors. However, depending on what you want to collect, you might need to run the binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, the collection process fails.

To run host collectors and analyzers:

1. Run the following command on a host (node) to download and install the support bundle binary. To get the latest release version, see the [Troubleshoot](https://github.com/replicatedhq/troubleshoot/releases) repository in GitHub.

  ```
  curl -L https://github.com/replicatedhq/troubleshoot/releases/download/VERSION/support-bundle_linux_amd64.tar.gz | tar xzvf -
  ```

  Replace `VERSION` with `v` and the version number. For example, `v0.40.0`.

  :::note
  There is no method in Troubleshoot to run host collectors on remote nodes. If you have a multi-node Kubernetes cluster, you must run the support bundle binary on each node and generate a bundle for each.
  :::

1. Run the following command on the host to generate a support bundle:

  ```
  ./support-bundle --interactive=false PATH/support-bundle.yaml
  ```
  Replace PATH with the path to the host collector support-bundle YAML file.

1. If needed, share the results with your vendor's support team for assistance.
