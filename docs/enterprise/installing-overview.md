# Considerations Before Installing

Before you install an application with KOTS in an existing cluster, consider the following installation options.

## Online (Internet-Connected) or Air Gap Installations

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air-gapped environment, the cluster must have access to an image registry. In this case, KOTS re-tags and pushes all images to the target registry.

For information about installing with KOTS in air-gapped environments, see [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped).

## Hardened Environments

By default, KOTS Pods and containers are not deployed with a specific security context. For installations into a hardened environment, you can use the `--strict-security-context` flag with the installation command so that KOTS runs with a strict security context for Pods and containers.

For more information about the security context enabled by the `--strict-security-context` flag, see [kots install](/reference/kots-cli-install).

## Configuring Local Image Registries

During install, KOTS can re-tag and push images to a local image registry.
This is useful to enable CVE scans, image policy validation, and other pre-deployment rules. A private image registry is required for air gapped environments, and is optional for online environments.

For information about image registry requirements, see [Compatible Image Registries](installing-general-requirements#registries).

## Automated (Headless) Installation

You can automate application installation in online and air-gapped environments using the KOTS CLI. In an automated installation, you provide all the information required to install and deploy the application with the `kots install` command, rather than providing this information in the Replicated Admin Console.

For more information, see [Installing with the CLI](/enterprise/installing-existing-cluster-automation).

## KOTS Installations Without Object Storage

The KOTS Admin Console requires persistent storage for state. KOTS deploys MinIO for object storage by default.

You can optionally install KOTS without object storage. When installed without object storage, KOTS deploys the Admin Console as a StatefulSet with an attached PersistentVolume (PV) instead of as a deployment.

For more information about how to install KOTS without object storage, see [Installing Without Object Storage](/enterprise/installing-stateful-component-requirements).