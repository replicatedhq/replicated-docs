# About Installing with KOTS

This topic provides an introduction to installing applications with Replicated KOTS.

## Supported Installation Environments

The following table lists the options for installing an application with KOTS:

<table>
  <tr>
    <th></th>
    <th>Online (Internet-connected)</th>
    <th>Air Gap</th>
  </tr>
  <tr>
    <th>Existing Cluster</th>
    <td>
      <ul>
        <li><a href="installing-general-requirements#existing-cluster-requirements">Existing Cluster Requirements</a></li>
        <li><a href="installing-existing-cluster">Online Installation in Existing Clusters</a></li>
      </ul>
    </td>
    <td>
      <a href="installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a></td>
  </tr>
  <tr>
    <th>VM or bare metal server</th>
    <td><a href="installing-general-requirements#embedded-cluster-requirements">Embedded Cluster (kURL) Requirements</a></td>
    <td><a href="installing-embedded-airgapped">Air Gap Installation with kURL</a></td>
  </tr>
</table>

## Considerations Before Installing

Before you install an application, consider the following installation options.

### Automate Installation with the kots CLI

You can automate application installation in online, air gap, existing cluster, and embedded cluster environments using the kots CLI. In an automated installation, you provide all the information required to install and deploy the application with the `kots install` command, rather than providing this information in the Replicated admin console.

For more information, see [Installing with Automation](/enterprise/installing-existing-cluster-automation).

### Set Strict Security Context for Hardened Environments

By default, KOTS Pods and containers are not deployed with a specific security context. For existing cluster installations into a hardened environment, you can use the `--strict-security-context` flag with the installation command so that KOTS runs with a strict security context for Pods and containers.

For more information about the security context enabled by the `--strict-security-context` flag, see [kots install](/reference/kots-cli-install).

### Use Local Image Registries

During install, KOTS can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules. A private image registry is required for air gapped environments, and is optional for online environments.

For information about image registry requirements, see [Private Registry Requirements](installing-general-requirements#private-registry-requirements).

### Use GitOps or Internal Version Control Workflows

In a GitOps workflow, KOTS pushes changes (config changes, upstream updates, license updates) to a private Git repository, where you can use an existing continuous integration and continuous delivery (CI/CD) process to deliver the manifests to the cluster.

For more information, see [Pushing Updates to a GitOps Workflow](gitops-workflow).

### Deploy KOTS Without MinIO Object Storage

The Replicated admin console requires persistent storage for state. For existing cluster installations, KOTS deploys MinIO for object storage by default. For embedded cluster installations with Replicated kURL, the object storage provider is either MinIO or Rook, depending on which add-on your software vendor included in the kURL installer specification.

You can optionally install KOTS without object storage. When installed without object storage, KOTS deploys the admin console as a Statefulset with an attached PersistentVolume (PV) instead of as a deployment.

For more information about how to install KOTS without object storage, see [Installing Without Object Storage](/enterprise/installing-stateful-component-requirements).