# Overview of Installing an Application With the App Manager

You can use the Replicated app manager to install applications into various environments and Kubernetes clusters, including air gapped, bare metal Kubernetes installations, managed offerings such as EKS, GKE and AKS, and more.

## Considerations Before Installing an Application

Before you install an application, consider the following installation options.

### Install With or Without an Existing Cluster

With Replicated, you can install an application in one of two ways:
* **With an existing cluster**: You can install an application onto an existing Kubernetes cluster that meets the system requirements. For more information, see [Cluster requirements](installing-existing-cluster-requirements).
* **Without an existing cluster**: If you do not have an existing Kubernetes cluster, the Replicated Kubernetes installer can create a new cluster for you on a modern Linux machine. For more information, see [Kubernetes installer requirements](installing-embedded-cluster-requirements).

Most software vendors support both options and require the customer to determine their preferred method of deployment.

### Install in an Air Gapped Environment

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air gapped environment, the cluster must have access to an image registry. In this case, the app manager retags and pushes all images to the target registry. Replicated supports installations in air gapped environments on both existing clusters and on clusters created by the Kubernetes installer.

For information about installing in an online environment, see [Installing in an online environment](installing-existing-cluster-online).

For information about installing in an air gap environment, see [Installing in an air gapped environment](installing-existing-cluster-airgapped).

### Provide Access to the Target Namespaces

During installation, the app manager prompts for the target namespace. This is the namespace where both the application and the Replicated admin console is deployed, unless any manifest files have hard-coded namespace names or are overridden using Kustomize.

The kubectl command-line tool access used must have read and write access to the namespace.

By default, the app manager creates a ClusterRole and ClusterRoleBinding with permissions to all namespaces unless otherwise specified by the application developer. For more information, see [Kubernetes RBAC](../vendor/packaging-rbac).

### Deploy Images to Local Registries

During install, the app manager can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules.

For information about using a local image registry, see [Image Registry for Air Gap Clusters](image-registry-airgap).

### Use a GitOps or Internal Version Control Workflow

In a GitOps workflow, the app manager pushes changes from the admin console (config changes, upstream updates, license updates) to a private Git repository, where you can use an existing continuous integration and continuous delivery (CI/CD) process to deliver the manifests to the cluster.

For more information, see [Pushing updates to a GitOps workflow in single app mode](gitops-single-app-workflow).
