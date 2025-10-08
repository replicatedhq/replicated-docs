import Prerequisites from "../partials/cmx/_prerequisites.mdx"
import InstanceTypes from "../partials/cmx/_instance-types.mdx"

# About Compatibility Matrix VMs (Beta)

This topic describes Compatibility Matrix VMs and their capabilities for testing your applications.

## About Compatibility Matrix VMs

Compatibility Matrix VMs provide isolated Linux environments for testing your applications. Unlike clusters, VMs give you full control over the operating system (OS) and allow you to test installation methods that require direct OS access.

You can use Compatibility Matrix VMs for testing and troubleshooting VM-based installations for your application with [Replicated Embedded Cluster](/intro-replicated#embedded-cluster).

For information about creating clusters with Compatibility Matrix to test Kubernetes-based deployments and Helm installations, see [Create and Manage Clusters](/vendor/testing-how-to).

## Supported VM Types

The following VM types are supported:

| Distribution | Versions | Instance Types |
| :---- | :---- | :---- |
| ubuntu | 24.04, 22.04 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge. See [Replicated Instance Types](#replicated-instance-types).|
| almalinux | 8, 9, 10 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge. See [Replicated Instance Types](#replicated-instance-types). |

## Replicated Instance Types

The following describes the Replicated instance types for VMs:

<InstanceTypes/>

## Limitations

Creating VMs with Compatibility Matrix has the following limitations:

- Creating VMs with Compatibility Matrix is a Beta feature.
- Installing Embedded Cluster on a VM created with Compatibility Matrix is supported for Embedded Cluster versions 1.21.0 or later.
- [GitHub Actions](/vendor/testing-ci-cd#replicated-github-actions) are not supported for Compatibility Matrix VMs. 
- The [cluster prepare](/reference/replicated-cli-cluster-prepare) command is not supported for Compatibility Matrix VMs.

## Prerequisites

Before you can use Compatibility Matrix VMs, you must complete the following prerequisites:

<Prerequisites/>

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.
