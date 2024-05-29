# About Installing an Application

This topic provides an introduction to installing with Replicated KOTS, including options to consider before installing.

## Overview

You can use Replicated KOTS to install applications into various environments, with or without existing Kubernetes clusters. The installation options include online and air gapped clusters, and support managed offerings such as EKS, GKE, AKS, and more.

## Considerations Before Installing

Before you install an application, consider the following installation options.

### Installations With or Without an Existing Cluster

With KOTS, you can install an application in one of two ways:
* **With an existing cluster**: You can install an application in an existing Kubernetes cluster that meets the system requirements. For more information, see [Existing Cluster Requirements](installing-general-requirements#existing-cluster-requirements) in _Installation Requirements_.
* **Without an existing cluster**: If you do not have an existing Kubernetes cluster, you can install in a virtual machine or a bare metal server. For more information, see [kURL Requirements](installing-general-requirements#kurl-requirements) in _Installation Requirements_.

Most software vendors support both options and require the customer to determine their preferred method of deployment.

### Internet-Connected or Air Gap Installations

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air gapped environment, the cluster must have access to an image registry. In this case, KOTS re-tags and pushes all images to the target registry. KOTS supports installations in air gapped environments on both existing clusters and on clusters created by the kURL installer.

For information about installing in air gapped environments:
* **Existing clusters**: See [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped)
* **Embedded clusters with kURL**: See [Air Gap Installation with kURL](installing-embedded-airgapped)

### Existing Cluster Installations into Hardened Environments

By default, KOTS Pods and containers are not deployed with a specific security context. For existing cluster installations into a hardened environment, you can use the `--strict-security-context` flag with the installation command so that KOTS runs with a strict security context for Pods and containers.

For more information about the security context enabled by the `--strict-security-context` flag, see [kots install](/reference/kots-cli-install).

### Local Image Registries

During install, KOTS can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules. A private image registry is required for air gapped environments, and is optional for online environments.

For information about image registry requirements, see [Private Registry Requirements](installing-general-requirements#private-registry-requirements).

### Automated Installation

You can automate application installation in online, air gap, existing cluster, and embedded cluster environments using the KOTS CLI. In an automated installation, you provide all the information required to install and deploy the application with the `kots install` command, rather than providing this information in the Replicated Admin Console.

For more information, see [Installing with Automation](/enterprise/installing-existing-cluster-automation).

### KOTS Installations Without Object Storage

The Replicated Admin Console requires persistent storage for state. For existing cluster installations, KOTS deploys MinIO for object storage by default. For embedded cluster installations with Replicated kURL, the object storage provider is either MinIO or Rook, depending on which add-on your software vendor included in the kURL installer specification.

You can optionally install KOTS without object storage. When installed without object storage, KOTS deploys the Admin Console as a Statefulset with an attached PersistentVolume (PV) instead of as a deployment.

For more information about how to install KOTS without object storage, see [Installing Without Object Storage](/enterprise/installing-stateful-component-requirements).