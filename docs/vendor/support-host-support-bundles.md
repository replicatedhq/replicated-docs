# Configuring Host Support Bundles

This topic describes how to configure host collectors and analyzers to help customers generate host support bundles to troubleshoot Kubernetes installer provisioned clusters (embedded clusters).

## About Host Support Bundles

Host collectors and analyzers are configured in a manifest file that is used to generate host support bundles. Host support bundles collect information from hosts that is not available from in-cluster collectors. Host support bundles are available only for Kubernetes installer clusters. These host support bundles gather information directly from the host they are run on and do not have Kubernetes as a dependency.

You can gather information about the environment, such as CPU, memory, available block devices, and the operating system. Host support bundles can also be used for testing network connectivity and gathering the output of provided commands.

This information is useful when you need to debug a Kubernetes installer cluster that is offline, troubleshoot a Kubernetes installer that failed before the control plane was initialized, or if you need to collect and analyze information that is not available with in-cluster collectors.

You create the host support bundle manifest file separately from your application release and share the file with customers to run on their hosts. This file is separate from your application release because host collectors and analyzers are intended to run directly on the host and not with the app manager. If the app manager runs host collectors, the collectors are unlikely to produce the desired results because they run in the context of the kotsadm Pod. For more information about how customers generate a host support bundle, see [Generate a Host Bundle](/enterprise/troubleshooting-an-app#generate-a-host-support-bundle).

## Configure a Host Support Bundle Manifest File

Configure a SupportBundle custom resource to specify host collectors and analyzers to gather information from a host.

To configure a host support bundle manifest file:

1. Create a SupportBundle custom resource manifest file (`kind: SupportBundle`).

1. Configure all of your host collectors and analyzers in one manifest file. You can use the following resources to help create your specification:

    - Access sample specifications in the the Replicated troubleshoot-specs repository, which provides specifications for supporting your customers. See [troubleshoot-specs/host](https://github.com/replicatedhq/troubleshoot-specs/tree/main/host) in GitHub.

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
                  message: At least 2 CPU cores are required, and 4 CPU cores are recommended.
              - pass:
                  message: This server has at least 4 CPU cores.
        - memory:
            checkName: "Amount of Memory"
            outcomes:
              - fail:
                  when: "< 4G"
                  message: At least 4G of memory is required, and 8G is recommended.
              - pass:
                  message: The system has at least 8G of memory.
    ```
1. Share the SupportBundle custom resource file with your customers to run on their hosts.
