import InstanceTypes from "../partials/cmx/_instance-types.mdx"

# About CMX VMs (Beta)

This topic provides an introduction to Replicated Compatibility Matrix (CMX) VMs, including information about supported types, limitations, and prerequisites to use CMX VMs.

## About CMX VMs

CMX VMs provide isolated Linux environments for testing your applications. Unlike clusters, VMs give you full control over the operating system (OS) and allow you to test installation methods that require direct OS access.

You can use CMX VMs for testing and troubleshooting VM-based installations for your application with [Replicated Embedded Cluster](/intro-replicated#embedded-cluster).

For information about creating clusters with CMX to test Kubernetes-based deployments and Helm installations, see [Create and Manage Clusters](/vendor/testing-how-to).

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

For limitations, see [Limitations](/vendor/cmx-overview#limitations) in _CMX Overview_.

## Prerequisites

For prerequisites, see [Prerequisites](/vendor/cmx-overview#prerequisites) in _CMX Overview_.
