import GenerateBundleHost from "../partials/support-bundles/_generate-bundle-host.mdx"

# Generating Host Bundles for kURL

This topic describes how to configure a host support bundle spec for Replicated kURL installations. For information about generating host support bundles for Replicated Embedded Cluster installations, see [Generating Host Bundles for Embedded Cluster](/vendor/support-bundle-embedded).

## Overview

Host support bundles can be used to collect information directly from the host where a kURL cluster is running, such as CPU, memory, available block devices, and the operating system. Host support bundles can also be used for testing network connectivity and gathering the output of provided commands.

Host bundles for kURL are useful when:
- The kURL cluster is offline
- The kURL installer failed before the control plane was initialized
- The Admin Console is not working
- You want to debug host-specific performance and configuration problems even when the cluster is running

You can create a YAML spec to allow users to generate host support bundles for kURL installations. For information, see [Create a Host Support Bundle Spec](#create-a-host-support-bundle-spec) below.

Replicated also provides a default support bundle spec to collect host-level information for installations with the Embedded Cluster installer. For more information, see [Generating Host Bundles for Embedded Cluster](/vendor/support-bundle-embedded).

## Create a Host Support Bundle Spec

To allow users to generate host support bundles for kURL installations, create a host support bundle spec in a YAML manifest that is separate from your application release and then share the file with customers to run on their hosts. This spec is separate from your application release because host collectors and analyzers are intended to run directly on the host and not with Replicated KOTS. If KOTS runs host collectors, the collectors are unlikely to produce the desired results because they run in the context of the kotsadm Pod.

To configure a host support bundle spec for kURL:

1. Create a SupportBundle custom resource manifest file (`kind: SupportBundle`).

1. Configure all of your host collectors and analyzers in one manifest file. You can use the following resources to help create your specification:

    - Access sample specifications in the the Replicated troubleshoot-specs repository, which provides specifications for supporting your customers. See [troubleshoot-specs/host](https://github.com/replicatedhq/troubleshoot-specs/tree/main/host) in GitHub.

    - View a list and details of the available host collectors and analyzers. See [All Host Collectors and Analyzers](https://troubleshoot.sh/docs/host-collect-analyze/all/) in the Troubleshoot documentation.

    **Example:**

    The following example shows host collectors and analyzers for the number of CPUs and the amount of memory.

    ```yaml
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

1. Share the file with your customers to run on their hosts.

:::important
Do not store support bundles on public shares, as they may still contain information that could be used to infer private data about the installation, even if some values are redacted.
:::

## Generate a Host Bundle for kURL

<GenerateBundleHost/>