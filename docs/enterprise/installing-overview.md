# About Installing an Application

You can use Replicated KOTS to install applications into various environments, with or without existing Kubernetes clusters. The installation options include online and air gapped clusters, and support managed offerings such as EKS, GKE, AKS, and more.

## Considerations Before Installing

Before you install an application, consider the following installation options.

### Install With or Without an Existing Cluster

With KOTS, you can install an application in one of two ways:
* **With an existing cluster**: You can install an application in an existing Kubernetes cluster that meets the system requirements. For more information, see [Existing Cluster Requirements](installing-general-requirements#existing-cluster-requirements) in _Installation Requirements_.
* **Without an existing cluster**: If you do not have an existing Kubernetes cluster, the Replicated kURL installer can create an embedded cluster for you in a virtual machine or a bare metal server. For more information, see [Embedded Cluster Requirements](installing-general-requirements#embedded-cluster-requirements) in _Installation Requirements_.

Most software vendors support both options and require the customer to determine their preferred method of deployment.

### Install in an Air Gapped Environment

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air gapped environment, the cluster must have access to an image registry. In this case, KOTS re-tags and pushes all images to the target registry. KOTS supports installations in air gapped environments on both existing clusters and on clusters created by the kURL installer.

For information about installing in air gapped environments:
* **Existing clusters**: See [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped)
* **Embedded clusters**: See [Air Gap Installation with kURL](installing-embedded-airgapped)

### Provide Access to the Target Namespaces

During installation, KOTS prompts for the target namespace. This is the namespace where both the application and the Replicated admin console is deployed, unless any manifest files have hard-coded namespace names or are overridden using Kustomize.

The kubectl command-line tool access used must have read and write access to the namespace.

Additionally, by default, KOTS creates a ClusterRole and ClusterRoleBinding with permissions to all namespaces unless otherwise specified by the application vendor.

For more information about the role-based access control (RBAC) requirements for KOTS, see [RBAC Requirements](installing-general-requirements#rbac-requirements) in _Installation Requirements_.

### Deploy Images to Local Registries

During install, KOTS can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules. A private image registry is required for air gapped environments, and is optional for online environments.

For information about image registry requirements, see [Private Registry Requirements](installing-general-requirements#private-registry-requirements).

### Use a GitOps or Internal Version Control Workflow

In a GitOps workflow, KOTS pushes changes (config changes, upstream updates, license updates) to a private Git repository, where you can use an existing continuous integration and continuous delivery (CI/CD) process to deliver the manifests to the cluster.

For more information, see [Pushing Updates to a GitOps Workflow](gitops-workflow).
