import RestoreTable from "../partials/snapshots/_restoreTable.mdx"

# Reliability Testing for Applications

This topic describes how vendors can use the Replicated platform to test an application on 
customer-representative environments prior to distribution.

:::note
This is a preview feature, available only for some customers. If you'd like to learn more or 
have this feature enabled on your account, please contact your customer success representative.
:::

## Overview

Developers and packaging teams expect that Kubernetes is a reliable abstraction and that it provides 
guarantees that an application which functions in one distribution of Kubernetes will also function 
in all other distributions. This expectation often fails because various distributions of Kubernetes 
have different requirements for workloads. 

For example, OpenShift will not run root or privileged containers (among other things). EKS uses a 
default storageClass named `gp2` (but it is default). LoadBalancer service controllers are generally 
only available in cloud providers, and are not always available in bare metal ones. Ingress objects 
are famously non-portable. Even making this list of some examples, there are exceptions to each. 
For example, it's not reasonable to expect that an application tested in GKE will run properly in Tanzu.


## How Replicated Helps

Part of a Replicated subscription is access to a feature called the Reliability Matrix. This is feature
is managed, ephemeral clusters that can be quickly created, and are customer-representative environments.
The Reliability Matrix is useful in CI to validate an application is compatible with supported 
distributions, but also very useful in local dev and support to quickly get access to a cluster to 
test or reproduce a reported issue.

When creating a cluster in the Reliability Matrix, you will have full access via a kubeconfig (so you can 
connect kubectl or your favoriate tool). Reliability Matrix clusters have a Time To Live (TTL). When the 
TTL has expired, the cluster will automatically be deleted.

The Reliability Matrix can create clusters in a virtual machine (kind, k3s, OpenShift, etc), and also 
create cloud-managed clusters (EKS, AKS, etc). 

## Pricing

The Reliability Matrix may incur usage-based pricing. Pricing is based on the resources you request
when creating the cluster. Cluster sizes (RAM, CPU, Disk) are configurable. For more information on pricing, 
please contact your 
customer success representative.

## Supported Platforms

The supported platforms will change, and the following table lists the current supported versions
and any notes.

## Kubernetes Version Support Policy

We don't maintain forks or patches of the supported distributions. When the version in Reliability Matrix is out of support (EOL), we will attempt to continue to support this version for 6 months for compatibility testing to support customers who are running out of date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we may discontinue support for past-EOL versions of Kubernetes prior to 6 months post EOL.
