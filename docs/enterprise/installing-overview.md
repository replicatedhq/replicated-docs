# Overview of installing an application with app manager

KOTS applications can be installed into various environments and Kubernetes clusters, from airgapped, bare metal Kubernetes installs to managed offering such as EKS, GKE and AKS, and many options in between.

To start installing a KOTS application, you'll need to have:

- A Kubernetes cluster
- `kubectl` installed and configured to access the cluster
- The `kots` plugin for `kubectl`. See [Getting Started with KOTS](https://kots.io/kots-cli/getting-started/) in the kots CLI documentation.

## Choose Installation Method

Before installing a KOTS application, there are a few considerations.

### Existing Cluster or Embedded Kubernetes
KOTS is designed to deliver Kubernetes applications to both existing Kubernetes clusters (i.e. GKE, AKS, EKS, OpenShift, etc.) or to modern Linux machines (bare metal or VMs) with an "embedded Kubernetes" option.
Most KOTS vendors support both options and require the end customer to determine their preferred method of deployment.

This guide will focus on existing cluster installs, with embedded installations documented separately. For information about installing on an embedded cluster with the Kubernetes installer, see [Installing on an embedded cluster](installing-embedded-cluster).

### Online or Airgap Install
Most Kubernetes clusters are able to make outbound internet requests (inbound access is never recommended or required).
As such, most cluster operators are able to perform an online installation.
However, if the target cluster does not have outbound internet access, the application can be delivered through an airgap installation.
When choosing this option, the cluster must have access to an image registry.
All images will be retagged and pushed to the target registry.

For information about installing in an online environment, see [Installing in an online environment](installing-existing-cluster-online).
For information about installing in an air gap environment, see [Installing in an air gapped environment](installing-existing-cluster-airgapped).

### Namespace(s)
During installation, KOTS will prompt for the target namespace to install to.
This is the namespace that the Admin Console will be written to, and also where the application will be deployed, unless any manifests have hard-coded namespace names or are overridden using Kustomize.
The `kubectl` access used must have read and write access to the namespace.
By default, KOTS will create a ClusterRole and ClusterRoleBinding with permissions to all namespaces unless otherwise specified by the application developer. For more information, see [Kubernetes RBAC](../vendor/packaging-rbac).

### Images and Internal Registries
During install, KOTS can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation and other pre-deployment rules.
For information about using a local image registry, see [About deploying a registry on an existing cluster](image-registry-existing-cluster) in _Using self-hosted image registries_.

### GitOps and Internal VCS
When using a GitOps workflow, changes from the Admin Console (config changes, upstream updates, license updates) will be pushed to a private Git repository, where an existing CI/CD process can execute to deliver the manifests to the cluster.
For more information, see [Pushing updates to a GitOps workflow in single app mode](gitops-single-app-workflow).
