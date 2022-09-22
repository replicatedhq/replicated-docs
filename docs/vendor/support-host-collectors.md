# Collecting Support Bundles from Hosts

This topic describes how to define host collectors and analyzers to help customers generate support bundles from hosts to troubleshoot Kubernetes installer provisioned clusters (embedded clusters).

## About Host Collectors and Analyzers

Host collectors and analyzers are designed to collect information from hosts that is not available from in-cluster collectors. Host collectors are available only for Kubernetes installer clusters. These host collectors gather information directly from the host they are run on and do not have Kubernetes as a dependency.

You can gather information about the environment, such as CPU, memory, available block devices, and the operating system. Host collectors can also be used for testing network connectivity and gathering the output of provided commands.

This information is useful when you need to debug a Kubernetes installer cluster that is offline, troubleshoot a Kubernetes installer that failed before the control plane was initialized, or if you need to collect and analyze information that is not available with in-cluster collectors.

You create the host collectors file separately from your application package and share the file with customers to run on their hosts. This file is separate  from your application package because host collectors are intended to run directly on the host using the support-bundle CLI, and not with KOTS. If KOTS runs host collectors, the collectors are unlikely to produce the desired results because they run in the context of the kotsadm Pod. For more information about how customers generate a host collectors support bundle, see [Generating a Host Collectors and Analyzers Bundle](troubleshooting-an-app#run-host-collectors-and-analyzers).

## Define Host Collectors and Analyzers

Define a SupportBundle custom resource to specify host collectors and analyzers to gather information from a host.

To define host collectors and analyzers:

1. Create a SupportBundle custom resource manifest file (`kind: SupportBundle`).

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
1. Share the SupportBundle custom resource file with your customers to run on their host.
