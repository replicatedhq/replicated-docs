# Overview of Installing an Application with the App Manager

You can use the Replicated app manager to install applications into various environments and Kubernetes clusters, including air gapped, bare metal Kubernetes installations, managed offerings such as EKS, GKE and AKS, and more.

## Considerations Before Installing an Application

Before you install an application, consider the following installation options.

### Install With or Without an Existing Cluster

With Replicated, you can install an application in one of two ways:
* **With an existing cluster**: You can install an application onto an existing Kubernetes cluster that meets the system requirements. For more information, see [Existing Cluster Requirements](installing-general-requirements#existing-cluster-requirements) in _Installation Requirements_.
* **Without an existing cluster**: If you do not have an existing Kubernetes cluster, the Replicated Kubernetes installer can create a new cluster for you on a modern Linux machine. For more information, see [Kubernetes Installer Cluster Requirements](installing-general-requirements#embedded-cluster-requirements) in _Installation Requirements_.

Most software vendors support both options and require the customer to determine their preferred method of deployment.

### Install in an Air Gapped Environment

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air gapped environment, the cluster must have access to an image registry. In this case, the app manager retags and pushes all images to the target registry. Replicated supports installations in air gapped environments on both existing clusters and on clusters created by the Kubernetes installer.

For information about installing in air gapped environments, see:
* **Existing cluster**: [Install in an Air Gapped Environment](installing-existing-cluster#air-gap) in _Installing on an Existing Cluster_
* **Kubernetes installer provisioned cluster**: [Install in an Air Gapped Environment](installing-embedded-cluster#air-gap) in _Installing with the Kubernetes Installer_.

### Provide Access to the Target Namespaces

During installation, the app manager prompts for the target namespace. This is the namespace where both the application and the Replicated admin console is deployed, unless any manifest files have hard-coded namespace names or are overridden using Kustomize.

The kubectl command-line tool access used must have read and write access to the namespace.

Additionally, by default, the app manager creates a ClusterRole and ClusterRoleBinding with permissions to all namespaces unless otherwise specified by the application vendor.

For more information about the role-based access control (RBAC) requirements for the app manager, see [RBAC Requirements](installing-general-requirements#rbac-requirements) in _Installation Requirements_.

### Deploy Images to Local Registries

During install, the app manager can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules.

For information about using a local image registry, see [Requirements for Air Gap Image Registry](image-registry-airgap).

### Use a GitOps or Internal Version Control Workflow

In a GitOps workflow, the app manager pushes changes from the admin console (config changes, upstream updates, license updates) to a private Git repository, where you can use an existing continuous integration and continuous delivery (CI/CD) process to deliver the manifests to the cluster.

For more information, see [Pushing Updates to a GitOps Workflow](gitops-workflow).
