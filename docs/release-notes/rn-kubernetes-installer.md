---
toc_max_heading_level: 2
---

# Kubernetes Installer Release Notes

## v2023.02.23-0

Released on February 23, 2023

### New Features {#new-features-v2023-02-23-0}
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.63.0-45.2.0.
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20230222 and 2.8.1-20230222 to address the following high severity CVEs: CVE-2022-4450, CVE-2023-0215, CVE-2023-0286.
* Updates [Registry add-on](https://kurl.sh/docs/add-ons/registry) version 2.8.1 with new kurlsh/s3cmd image to address the following high severity CVEs: CVE-2022-4450, CVE-2023-0215, CVE-2023-0286.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-02-22T18-23-45Z.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.26.4.
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.10.1.

### Improvements {#improvements-v2023-02-23-0}
* kURL no longer chooses the node name and instead defers to kubeadm to infer the node name from the hostname.

### Bug Fixes {#bug-fixes-v2023-02-23-0}
* Fixes an issue where EKCO serialized an incorrect kubeadm `ClusterStatus(kubeadm.k8s.io/v1beta2)` config when purging a node with [`ekco-purge-node.sh`](https://kurl.sh/docs/add-ons/ekco#purge-nodes) for Kubernetes version 1.21 and earlier. Moreover, this bug prevented adding new nodes to the Kuberenetes cluster.

## v2023.02.21-0

Released on February 21, 2023

### New Features {#new-features-v2023-02-21-0}
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-02-17T17-52-43Z.

### Bug Fixes {#bug-fixes-v2023-02-21-0}
* Fixes an issue that causes the install script to fail with error "ctr: flags --detach and --rm cannot be specified together" when using Containerd 1.6.18 and the EKCO Internal Load Balancer.

## v2023.02.17-0 - Withdrawn

Released on February 17, 2023

:::important
v2023.02.17-0 has been removed because Containerd 1.6.18 is incompatible with high availability installations using the EKCO internal load balancer.
:::

### New Features {#new-features-v2023-02-17-0}
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.63.0-45.1.0 and 0.63.0-45.1.1.
* Adds [OpenEBS add-on](https://kurl.sh/docs/add-ons/openebs) version 3.4.0.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.18.

### Bug Fixes {#bug-fixes-v2023-02-17-0}
* Fixes an issue that causes Rook multi-version upgrades to fail if add-on airgap packages exist on the server prior to upgrading.
* Fixes a rare race condition that could cause data loss when migrating between storage providers.
## v2023.02.16-0

Released on February 16, 2023

### New Features {#new-features-v2023-02-16-0}
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-02-10T18-48-39Z.
* Warn the user if there is likely to be insufficient space to upgrade Rook multiple versions.

### Bug Fixes {#bug-fixes-v2023-02-16-0}
* Fixes a misconfiguration in the kubelet that caused Kubernetes to garbage collect the pause image, which caused new containers to fail to start and get stuck in ContainerCreating.

## v2023.02.14-0

Released on February 14, 2023

### New Features {#new-features-v2023-02-14-0}
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.10.1.
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.24.1.
* Adds [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) version 0.21.1.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-02-09T05-16-53Z.

### Bug Fixes {#bug-fixes-v2023-02-14-0}
* Fixes a broken link to the Rook zapping procedure in the output of the installation script.
* Changes the kubelet service file permissions to 600 to fix CIS benchmark failure 4.1.1: "Ensure that the kubelet service file permissions are set to 600 or more restrictive".
* Fixes an issue where containers were stuck in a ContainerCreating state after a Kubernetes upgrade.

## v2023.02.06-1

Released on February 6, 2023

### Bug Fixes {#bug-fixes-v2023-02-06-1}
* Fixes an issue in [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.5 where restores fail to pull the `velero-restic-restore-helper` image in air gapped environments.

## v2023.02.06-0

Released on February 6, 2023

### New Features {#new-features-v2023-02-06-0}
* Adds [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) version 0.21.0.

### Improvements {#improvements-v2023-02-06-0}
* If there are multiple network interfaces on a single host, the [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) prompts users to choose an interface or use the interface of the [private-address](https://kurl.sh/docs/install-with-kurl/advanced-options#reference) flag when specified, instead of using the default gateway interface.
* Prompts users when preflight warnings occur, and allows users to cancel the installation and fix the root cause before resuming the installation.

### Bug Fixes {#bug-fixes-v2023-02-06-0}
* Fixes an issue where the Prometheus adapter was not able to install custom metrics due to an incorrect URL to the Prometheus service.
* Fixes an issue where running kubectl commands with Kubernetes version 1.26 was generating the warning "Got empty response for: custom.metrics.k8s.io/v1beta1".

## v2023.02.02-0

Released on February 2, 2023

### New Features {#new-features-v2023-02-02-0}
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.24.0.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-01-31T02-24-19Z.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.26.3.
* Flannel CNI is no longer supported with the Docker container runtime. Containerd is required.

### Improvements {#improvements-v2023-02-02-0}
* When upgrading multiple versions of Rook, users can download a single air gap bundle containing all versions of the Rook air gap packages, instead of downloading each version package separately.

## v2023.01.31-0

Released on January 31, 2023

### New Features {#new-features-v2023-01-31-0}
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) version(s) 1.26.1 1.25.6 1.24.10 1.23.16.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.16.
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.5.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2023-01-25T00-19-54Z.
* Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.15.
* Adds a `serverFlags` configuration option to the [Velero add-on](https://kurl.sh/docs/add-ons/velero) to allow users to pass additional flags to the `velero server` command in the Velero pod. This can also be set using the [velero-server-flags](https://kurl.sh/docs/install-with-kurl/advanced-options#reference) cli flag when running the install script.

### Improvements {#improvements-v2023-01-31-0}
* Adds TCP connection host preflight checks for ports 2379 and 6443.
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.8.1-20230130 to address the following high severity CVE: [CVE-2022-43551](https://avd.aquasec.com/nvd/cve-2022-43551).
* Adds a warning message when Flannel is the cluster CNI suggesting the user check that UDP port 8472 is open when joining a node or migrating from Weave to Flannel.
* Adds Flannel UDP port 8472 status preflight check.

### Bug Fixes {#bug-fixes-v2023-01-31-0}
* Fixes an error due to missing images from registry.k8s.io when updating Kubernetes from 1.21 to 1.23.{0-14} and 1.22 to 1.24.{0-8} in airgapped environments.
* Fixes an issue that could cause Flannel pods on remote airgapped nodes to fail with ImagePullBackoff errors.
* Fixes an issue that could cause single node upgrades to Rook add-on version 1.6.11 with Ceph filesystem enabled to fail with error "filesystem-singlenode.yaml: No such file or directory".

## v2023.01.23-0

Released on January 23, 2023

### New Features {#new-features-v2023-01-23-0}
* Allows migrating multi-node [Weave](https://kurl.sh/docs/add-ons/weave) installations to [Flannel](https://kurl.sh/docs/add-ons/flannel).
* The [Rook add-on](https://kurl.sh/docs/add-ons/rook) can now be upgraded from version 1.0.x to 1.10.8, latest supported Rook version, as part of the installation script.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) versions RELEASE.2023-01-12T02-06-16Z, RELEASE.2023-01-18T04-36-38Z and RELEASE.2023-01-20T02-05-44Z.
* Adds [metrics-server add-on](https://kurl.sh/docs/add-ons/metrics-server) version 0.6.2.

### Bug Fixes {#bug-fixes-v2023-01-23-0}
* Creates .kube/config for installations where .kube/config was not created.

## v2023.01.13-1

Released on January 13, 2023

### Bug Fixes {#bug-fixes-v2023-01-13-1}
* Reverts a bug fix made in v2023.01.03-0 which caused `.kube/config` to not be created. For more information, see [Known Issue](#known-issues-v2023-01-13-0) below.

## v2023.01.13-0

:::important
The Kubernetes installer v2023.01.13-0 has a known issue that affects the creation of .kube/config in the home directory. See [Known Issue](#known-issues-v2023-01-13-0) below. This issue is resolved in v2023.01.13-1.
:::

Released on January 13, 2023

### New Features {#new-features-v2023-01-13-0}
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.5.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) versions RELEASE.2023-01-02T09-40-09Z and RELEASE.2023-01-06T18-11-18Z.
* Adds [Rook add-on](https://kurl.sh/docs/add-ons/rook) verison 1.10.8.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.15.
* Adds automatic data migration from Longhorn to OpenEBS.
* Adds a migration path for Weave to Flannel on single-node Kubernetes clusters. This migration requires downtime.
* Adds logs for kURL execution which can be found under `/var/log/kurl/`.

### Bug Fixes {#bug-fixes-v2023-01-13-0}
* Fixes an issue where the process get stuck in failures scenarios by adding timeouts and improving log info when upgrading from the Rook `1.0.4` to `1.4.9`. 
* Fixes upgrading Rook from `1.0.4-14.2.21` to `1.4.9`.
* Fixes a bug on Ubuntu where the installer would sometimes remove packages when attempting to install Kubernetes.
* Fixes a timeout waiting for new versions of Rook and Ceph to roll out on upgrades by increase wait timeouts from 10 to 20 minutes.

### Known Issue {#known-issues-v2023-01-13-0}

This issue is resolved in v2023.01.13-1.

v2023.01.13-0 has a known issue where the .kube/config might not be created in the home directory. This does not affect the ability to access the cluster when you run bash -l with kubectl.

If you cannot connect to the cluster with kubectl or did not find the .kube/config file, Replicated recommends that you copy .kube/config to your home directory:

```
cp /etc/kubernetes/admin.conf $HOME/.kube/config
```

Then, grant permissions to the $HOME/.kube/config file.


## v2023.01.03-0

Released on January 3, 2023

:::important
v2023.01.03-0 has a known issue that can cause critical system packages to be removed from Ubuntu machines. This known issue is resolved in v2023.01.13-1. To avoid this known issue, do not upgrade to v2023.01.03-0, and instead upgrade directly to v2023.01.13-1.
:::

### New Features {#new-features-v2023-01-03-0}
* [Rook add-on](https://kurl.sh/docs/add-ons/rook) can now be upgraded and migrated from version 1.4.3 up to version 1.7.x as part of the installation script.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.26.2.
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.23.2.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-12-12T19-27-27Z.
* Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.13.
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) versions 1.26.0, 1.25.5, 1.24.9, 1.23.15, and 1.22.17.
* Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.14.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) versions 1.6.13 and 1.6.14.

### Improvements {#improvements-v2023-01-03-0}

* Disk and volume validation checks now run prior to migrating from Rook to OpenEBS. A failed validation check aborts the upgrade.

### Bug Fixes {#bug-fixes-v2023-01-03-0}
* Fixes installation conflicts when installing the containerd add-on and Docker is already installed on the host. Now the installation checks to see if Docker is installed and provides users with the option to automatically remove Docker.
* Fixes an issue where EKCO's provisioned HAProxy load balancer pod crashed when it did not have access to the Config file.
* Fixes an issue that causes air gapped upgrades to Rook add-on version 1.7.11 to fail with ImagePullBackoff errors.
* Fixes an issue with the Docker preflight check not failing on some unsupported operating systems.
* Fixes an issue that could cause Rook upgrades to fail if EKCO is scaled down, due to failures to recreate the Rook OSD deployments when the rook-priority.kurl.sh MutatingAdmissionWebhook is unreachable.

## v2022.12.12-0

Released on December 12, 2022

### New Features {#new-features-v2022-12-12-0}
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) versions 1.25.5, 1.24.9, 1.23.15, and 1.22.17.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) versions 1.6.11 and 1.6.12.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions 0.26.0 and 0.26.1.
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.4.
* Adds [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) version 0.20.2.
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.23.1.

### Bug Fixes {#bug-fixes-v2022-12-12-0}
* Fixes an issue that prevented upgrading from Rook 1.0.4 to 1.4.9 due to error "pool(s) have non-power-of-two pg_num".
* Fixes an issue that caused Rook add-on upgrades from 1.0.4 to 1.4.9 to hang indefinitely with 50% pgs degraded when EKCO add-on is included in the upgrade spec.
* Fixes an issue that prevented containerd.io to be installed or upgraded when the host has docker.io package installed on Ubuntu.
* Fixes preflight checks to only recommend Docker Enterprise Edition to RHEL installs when containerd is not selected.
* Fixes an issue where a deprecated version of Docker was being installed when Docker or containerd add-on versions were not explicitly set.

## v2022.11.29-0

Released on November 29, 2022

### New Features {#new-features-v2022-11-29-0}
* Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.12.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.10.
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.8.1-20221122 to address the following high and critical severity CVEs: CVE-2022-42915, CVE-2022-42915, CVE-2022-42916, CVE-2022-42916.
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) version 2.6.5-20221122 to address the following high and critical severity CVEs: CVE-2022-42915, CVE-2022-42915, CVE-2022-42916, CVE-2022-42916.

### Improvements {#improvements-v2022-11-29-0}
* Binaries installed by kURL into /use/local/bin are now owned by root.
* Containerd add-on versions are now shipped with the respective supported runc version. Containerd addon versions 1.6.4 and later are built with runc version `v1.1.4` instead of `v1.0.0-rc95`.

### Bug Fixes {#bug-fixes-v2022-11-29-0}
* Fixes an issue that causes Rook add-on version 1.0.4-14.2.21 to fail to install on Oracle Linux 7 with host dependency resolution errors.
* Fixes an issue that causes Rook upgrades to unnecessarily pause for an extended period of time, with the message "failed to wait for Rook", before proceeding with the upgrade.
* Fixes an issue that leaves the EKCO operator scaled down to 0 replicas when upgrading a cluster with Rook add-on versions 1.8.10 and 1.9.12.

## v2022.11.16-1

Released on November 16, 2022

### Bug Fixes {#bug-fixes-v2022-11-16-1}
* Fixes a bug that blocked installations.

## v2022.11.16-0

Released on November 16, 2022

### New Features {#new-features-v2022-11-16-0}
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) version(s) 1.25.4 1.24.8 1.23.14 1.22.16.
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.3.
* PVMigrate now checks for available disk space before starting to migrate volumes.
* RHEL 8.7 and Oracle Linux 8.7 are now supported.

## v2022.11.10-1

Released on November 10, 2022

### Bug Fixes {#bug-fixes-v2022-11-10-1}
* Fixes an issue where [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.89.0+ fails to install when a proxy is configured.

## v2022.11.10-0

Released on November 10, 2022

### Improvements {#improvements-v2022-11-10-0}
* OpenEBS Local PV Storage Class will now be the default if no other Storage Class is specified for OpenEBS add-on versions 3.3.0 and above. Previously, OpenEBS was only the default if `openebs.localPVStorageClassName` was set to `"default"`.

### Bug Fixes {#bug-fixes-v2022-11-10-0}
* Fixes an issue that could cause installations or upgrades to fail with error "syntax error: operand expected (error token is ""0" + "1"")" on RHEL 7 based distributions.
* Fixes an issue that causes installations to fail with no default Storage Class for specs with `openebs.localPVStorageClassName` set to anything other than `"default"` and no other CSI add-on specified.

## v2022.11.09-0

Released on November 9, 2022

### New Features {#new-features-v2022-11-09-0}
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.25.0. This version adds management of the rqlite StatefulSet deployed by the app manager. If a Kubernetes installer cluster has at least three healthy nodes and the OpenEBS localpv storage class is available, rqlite is scaled up to three replicas for data replication and high availability.

## v2022.11.07-0

Released on November 7, 2022

### New Features {#new-features-v2022-11-07-0}
* Removes support for the BETA K3s add-on and the BETA RKE2 add-on. It is recommended to use the [OpenEBS add-on](https://kurl.sh/docs/add-ons/openEBS#localpv) for the single-node LocalPV use case with kURL. For more information about this decision, see the [ADR](https://github.com/replicatedhq/kURL/blob/main/docs/arch/adr-007-deprecate-k3s-and-rke2.md).
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.24.1.
* Adds [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) version 0.20.1.
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.60.1-41.7.3.

### Bug Fixes {#bug-fixes-v2022-11-07-0}
* Fixes CRD errors when updating from Prometheus 0.49.0-17.1.3 on Kubernetes versions that do not support Server-Side Apply.

## v2022.11.02-0

Released on November 2, 2022

### New Features {#new-features-v2022-11-02-0}
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.9.
* Adds [Goldpinger add-on](https://kurl.sh/docs/add-ons/goldpinger) version 3.7.0-5.5.0.
* Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.11.

### Improvements {#improvements-v2022-11-02-0}
* Prompts and warns users of downtime before migrating from Rook-backed PersistentVolumeClaims to OpenEBS Local PV when OpenEBS is included in the specification and Rook is removed. For migration information, see [Migrating to Change kURL CSI Add-ons](https://kurl.sh/docs/install-with-kurl/migrating-csi).
* Updates the kurlsh/s3cmd image to tag 20221029-37473ee for [Registry add-on](https://kurl.sh/docs/add-ons/registry) version 2.8.1 and [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.2, to address the high severity CVE: CVE-2022-43680.

### Bug Fixes {#bug-fixes-v2022-11-02-0}
* Fixes an issue that could cause the migration from Rook-backed PersistentVolumeClaims to unnecessarily hang for 5 minutes. For migration information, see [Migrating to Change kURL CSI Add-ons](https://kurl.sh/docs/install-with-kurl/migrating-csi).
* Fixes an issue that could cause kURL to attempt to migrate CRI from Docker to Containerd when the CRI is already Containerd.
* Fixes an issue with [OpenEBS add-on](https://kurl.sh/docs/add-ons/openebs) versions 1.12.0 and 2.6.0 that could cause installations to fail with the error `failed calling webhook "admission-webhook.openebs.io"`.
* Fixes an issue that could cause the kURL installer to disable EKCO management of the internal load balancer during an upgrade. See [Internal Load Balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).
* Fixes an issue where [Weave add-on](https://kurl.sh/docs/add-ons/weave) "latest" version resolves to 2.6.5-20221006 instead of 2.6.5-20221025.
* Fixes an issue where kURL will migrate to both OpenEBS Local PV and Longhorn from Rook-backed PersistentVolumeClaims when both add-ons are included in the specification and Rook is removed. kURL now prefers to migrate to OpenEBS.

## v2022.10.28-1

Released on October 28, 2022

### Bug Fixes {#bug-fixes-v2022-10-28-1}
* Fixes an issue that causes kURL to erroneously prompt the end-user for a Rook to OpenEBS Local PV migration when upgrading and the OpenEBS version 3.3.0 is included in the spec.

## v2022.10.28-0

Released on October 28, 2022

### New Features {#new-features-v2022-10-28-0}
* When Rook is installed on the cluster but not included in the kURL spec, the OpenEBS add-on version 3.3.0 and later automatically migrates any Rook-backed PersistentVolumeClaims (PVCs) to OpenEBS Local PV.

### Improvements {#improvements-v2022-10-28-0}
* The replicatedhq/local-volume-provider image has been updated to v0.4.0 for [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.2 which addresses the following high and critical CVEs: CVE-2021-33574, CVE-2021-35942, CVE-2022-23218, CVE-2022-23219, CVE-2020-1752, CVE-2020-6096, CVE-2021-3326, CVE-2021-3999.

## v2022.10.26-0

Released on October 26, 2022

### New Features {#new-features-v2022-10-26-0}
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.24.0.
* MinIO deploys a highly-available StatefulSet with EKCO when the OpenEBS localpv storage class is enabled and at least three nodes are available. For more information, see [Manage MinIO with EKCO](https://kurl.sh/docs/add-ons/ekco#manage-minio-with-ekco) in _EKCO Add-on_ in the kURL documentation.

### Improvements {#improvements-v2022-10-26-0}
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20221025 and 2.8.1-20221025 to address the following high CVEs: CVE-2022-40303, CVE-2022-40304.

## v2022.10.24-0

Released on October 24, 2022

### New Features {#new-features-v2022-10-24-0}
* Adds [Flannel add-on](https://kurl.sh/docs/add-ons/flannel) version 0.20.0.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-10-20T00-55-09Z.

## v2022.10.21-0

Released on October 21, 2022

### New Features {#new-features-v2022-10-21-0}
* [Rook add-on](https://kurl.sh/docs/add-ons/rook) versions 1.9.12 and later are now supported on Kubernetes 1.25.
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) version(s) 1.25.3 1.24.7 1.23.13.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-10-15T19-57-03Z.
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.23.0.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.23.2 which addresses the following high and critical CVEs: CVE-2021-33574, CVE-2021-35942, CVE-2022-23218, CVE-2022-23219, CVE-2020-1752, CVE-2020-6096, CVE-2021-3326, CVE-2021-3999.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.23.1.
* For [Rook add-on](https://kurl.sh/docs/add-ons/rook) versions 1.9.12 and later, [Ceph metrics collection and a Ceph Grafana dashboard](https://kurl.sh/docs/add-ons/rook#monitor-rook-ceph) are now enabled when the Prometheus add-on is installed.
* The replicatedhq/local-volume-provider image has been updated to v0.3.10 for [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.2 to address CVE-2022-37434 with critical severity.

### Bug Fixes {#bug-fixes-v2022-10-21-0}
* Fixes an issue that causes the .kube/config to get removed on a Kubernetes upgrade.
* With the release of [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.23.1, fixes an issue that could cause EKCO to fail to perform operations dependent on Rook version on Rook upgrades, including maintaining CSI Pod resources and scaling the ceph-mgr Pod replica count.
* With the release of [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.23.2, fixes an issue that causes upgrades of Kubernetes to fail on secondary nodes when EKCO [Internal Load Balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer) is enabled.
* Fixes an issue that causes EKCO to log RBAC errors when the Rook add-on is not installed.

## v2022.10.13-0

Released on October 13, 2022

### New Features {#new-features-v2022-10-13-0}
* Adds [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.9.12.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.23.0 with support for Rook 1.9.

### Bug Fixes {#bug-fixes-v2022-10-13-0}
* Fixes an issue that could prevent the EKCO deployment from scaling back up from zero replicas after running the Kubernetes installer script.

## v2022.10.10-0

Released on October 10, 2022

### New Features {#new-features-v2022-10-10-0}
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-10-08T20-11-00Z.
* Adds [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.8.10.

### Bug Fixes {#bug-fixes-v2022-10-10-0}
* Fixes an issue that could cause installations to fail with error "yaml: did not find expected node content" when installing behind an HTTP_PROXY.

## v2022.10.07-0

Released on October 7, 2022

### New Features {#new-features-v2022-10-07-0}

* New KOTS add-on versions are now automatically added to the Kubernetes installer upon a new release of KOTS.

   This means that the Kubernetes installer no longer needs to release to make a new version of KOTS available. So, the addition of new KOTS add-on versions will not be stated in the Kubernetes installer release notes.
For information about the features, improvements, and bug fixes included in each new version of KOTS, see the [App Manager Release Notes](https://docs.replicated.com/release-notes/rn-app-manager).
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) versions RELEASE.2022-10-05T14-58-27Z and RELEASE.2022-10-02T19-29-29Z.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.22.0.

### Improvements {#improvements-v2022-10-07-0}
* Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20221006 and 2.8.1-20221006 to address the following critical CVEs: CVE-2022-2795, CVE-2022-2881, CVE-2022-2906, CVE-2022-3080, CVE-2022-38177, CVE-2022-38178.
* Updates kurlsh/s3cmd image to tag 20221006-27d5371 for latest [Registry](https://kurl.sh/docs/add-ons/registry) and [Velero](https://kurl.sh/docs/add-ons/velero) add-on versions to address the following critical CVE: CVE-2022-40674.

## v2022.09.30-0

Released on September 30, 2022

### New Features {#new-features-v2022-09-30-0}
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.21.1.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-09-25T15-44-53Z.
* Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.2.
* Adds [Goldpinger add-on](https://kurl.sh/docs/add-ons/goldpinger) version 3.6.1-5.4.2.
* Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.86.1.

## v2022.09.28-0

Released on September 28, 2022

### New Features {#new-features-v2022-09-28-0}
* Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.86.0.

## v2022.09.23-0

Released on September 23, 2022

### New Features {#new-features-v2022-09-23-0}
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.59.1-40.1.0.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-09-17T00-09-45Z.
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) version(s) 1.25.2 1.24.6 1.23.12 1.22.15.

### Improvements {#improvements-v2022-09-23-0}
* Messaging while upgrading Rook-Ceph add-on to newer versions has been improved.
* When run on an unsupported operating system, kURL now links to the [list of supported systems](https://kurl.sh/docs/install-with-kurl/system-requirements#supported-operating-systems).
* Online installations now downloads files from kurl.sh instead of Amazon S3.

## v2022.09.19-0

Released on September 19, 2022

### New Features {#new-features-v2022-09-19-0}
* Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.85.0.

### Bug Fixes {#bug-fixes-v2022-09-19-0}
* Fixes an issue that could cause air gapped Kubernetes upgrades to fail Sonobuoy tests with a missing image.

## v2022.09.16-0

Released on September 16, 2022

### New Features {#new-features-v2022-09-16-0}
* Adds [Kubernetes](https://kurl.sh/docs/add-ons/kubernetes) version(s) 1.25.1 1.25.0 1.24.5 1.23.11 1.22.14.
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.58.0-39.12.1.
* Improved output when waiting for rook-ceph to become healthy.

### Improvements {#improvements-v2022-09-16-0}
* Updates the replicatedhq/local-volume-provider image to v0.3.8 for [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.1 to address CVE-2022-2509 with high severity.

### Bug Fixes {#bug-fixes-v2022-09-16-0}
* Fixes an issue that prevents upgrading Kubernetes to 1.24.x if the CRI has previously been migrated from Docker to Containerd.
* Fixes an issue that causes stateful pods mounting Persistent Volumes to get stuck in a `Terminating` state when upgrading single node Kubernetes clusters and using the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn).

## v2022.09.12-0

Released on September 12, 2022

### New Features {#new-features-v2022-09-12-0}
* Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.84.0.
* Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.21.0.
* [Rook 1.0.x to 1.4.9 upgrades](https://kurl.sh/docs/add-ons/rook#upgrades) can now be completed in airgapped clusters.

### Bug Fixes {#bug-fixes-v2022-09-12-0}
* [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions 0.21.0 or greater will now forcefully delete Envoy pods that change from a ready state to one where the Envoy container is not ready and have been in that state for at least 5 minutes. This has been added as a work around to a [known issue](https://github.com/projectcontour/contour/issues/3192) that may be caused by resource contention.

## Release v2022.09.08-1

Released on September 8, 2022

### New Features {#new-features-v2022-09-08-1}
* Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.22.1.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-09-07T22-25-02Z.

### Improvements {#improvements-v2022-09-08-1}
* The [Cert Manager add-on](https://kurl.sh/docs/add-ons/cert-manager) now supports upgrading from 1.0.3 to 1.9.1.
* The Rook 1.0 to 1.4 migration will now prompt the user to load images used by the migration on other nodes before starting.

## Release v2022.09.08-0

Released on September 8, 2022

### New Features {#new-features-v2022-09-08-0}
* Adds support for [Docker add-on](https://kurl.sh/docs/add-ons/docker) on Ubuntu version 22.04.
* Adds [Cert Manager add-on](https://kurl.sh/docs/add-ons/cert-manager) version 1.9.1.
* Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.8.
* Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version 2022-09-01T23-53-36Z.
* Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.58.0-39.11.0.

## Release v2022.09.01-1

Released on September 1, 2022

### New Features {#new-features-v2022-09-01-1}

* Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.83.0.

## Release v2022.09.01-0

Released on September 1, 2022

### New Features {#new-features-v2022-09-01-0}
* The [Rook add-on](https://kurl.sh/docs/add-ons/rook) can now be upgraded from version 1.0.x to 1.4.x or 1.5.x as part of the installation script for internet-connected installations only.
  Upgrading from version 1.0.x to 1.4.x or 1.5.x migrates data off of any hostpath-based OSDs in favor of block device-based OSDs, and performs a rolling upgrade through Rook versions 1.1.9, 1.2.7 and 1.3.11 before installing 1.4.9 (and 1.5.12 if applicable).
  The upstream Rook project introduced a requirement for block storage in versions 1.3.x and later.
* Adds [Docker add-on](https://kurl.sh/docs/add-ons/docker) version 20.10.17.
  Note that Ubuntu version 22.04 only supports Docker version 20.10.17 and later.

### Bug Fixes {#bug-fixes-v2022-09-01-0}
* Fixes an issue that causes migrations to fail from Docker to containerd due to uninstalled `docker-scan-plugin` package.
* Fixes an issue that causes migrations to fail from Rook to Longhorn 1.3.1 with 2 conflicting default storage classes.

## Release v2022.08.25-0

Released on August 25, 2022

### New Features {#new-features-v2022-08-25-0}

- Adds [Kubernetes add-on](https://kurl.sh/docs/add-ons/kubernetes) versions 1.24.4, 1.23.10, 1.22.13 and 1.21.14.
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kots) version 1.82.0
- Adds [Minio add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-08-22T23-53-06Z.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.58.0-39.9.0.
- Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20220825 and 2.8.1-20220825 to address the following critical severity CVE: CVE-2022-37434.

### Improvements {#improvements-v2022-08-25-0}

- Removes support for the BETA Local Path Provisioner Add-On. It is recommended to use the [OpenEBS](https://kurl.sh/docs/add-ons/openEBS#localpv) add-on for the LocalPV use case.
- The Rook [1.0 to 1.4 task](https://kurl.sh/docs/add-ons/rook#upgrades) will now print new lines when waiting for pods to be rolled out, OSDs to be added, or certain migrations to complete. Previously, one line was printed and then overwritten with updates.
- Updates kurlsh/s3cmd image to tag 20220825-237c19d for latest [Registry](https://kurl.sh/docs/add-ons/registry) and [Velero](https://kurl.sh/docs/add-ons/velero) add-on versions to address the following critical and high severity CVEs: CVE-2022-37434

### Bug Fixes {#bug-fixes-v2022-08-25-0}

- Fixes the [reset task](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node) which fails when unable to find the kurlsh/weaveexec image.
- Fixes the [Rook 1.0 to 1.4 task](https://kurl.sh/docs/add-ons/rook#upgrades) which would wait for health indefinitely after upgrading to 1.4.9 on single-node installations.

## Release v2022.08.23-0

Released on August 23, 2022

### New Features {#new-features-v2022-08-23-0}

- Adds new [OpenEBS add-on](https://kurl.sh/docs/add-ons/openebs) version 3.3.0.

### Bug Fixes {#bug-fixes-v2022-08-23-0}

- Fixes an issue that causes Weave 2.6.x and 2.8.x versions of Weave to resolve to the incorrect versions without the latest CVE fixes.
- Updates the replicatedhq/local-volume-provider image to v0.3.7 for [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.1 to address CVE-2021-44716, CVE-2021-33194, and CVE-2022-21221 with high severity.

## Release v2022.08.22-0

Released on August 22, 2022

### New Features {#new-features-v2022-08-22-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kots) version 1.81.1
- Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.10.

## Release v2022.08.19-0

Released on August 19, 2022

### New Features {#new-features-v2022-08-19-0}

- Adds [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.7.11.
  - Upgrades Ceph cluster from Octopus to [Pacific](https://docs.ceph.com/en/quincy/releases/pacific/).
- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.20.0 with support for [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.7.11.
- Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.1.
- Adds a new tasks.sh command, [`rook-10-to-14`](https://kurl.sh/docs/add-ons/rook#upgrades), that upgrades Rook 1.0 installations to Rook 1.4.9. This command only works for online installations.

### Improvements {#improvements-v2022-08-19-0}

- The [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) auto-upgrades experimental feature is no longer supported as of EKCO version 0.20.0.

### Bug Fixes {#bug-fixes-v2022-08-19-0}

- Fixes an issue that causes Rook upgrades to fail on single node installations because of Rook MDS pod anti-affinity rules.
- Fixes an issue that can cause a migration from Docker to Containerd to fail due to listing nodes using the incorrect Kubernetes api resource group.

## Release v2022.08.16-0

Released on August 16, 2022

### New Features {#new-features-v2022-08-16-0}

- Adds [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) version 1.3.1.
- Adds [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.7.

## Release v2022.08.12-1

Released on August 12, 2022

### New Features {#new-features-v2022-08-08-0}

- Adds KOTS add-on version 1.81.0. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm).

## Release v2022.08.12-0

Released on August 12, 2022

### Bug Fixes {#bug-fixes-v2022-08-12-0}

- Fixes an issue that causes snapshots to fail after Rook to MinIO migration.

## Release v2022.08.11-0

Released on August 11, 2022

### Improvements {#improvements-v2022-08-11-0}

- Add Collectd Ubuntu 22.04 compatibility to host preflight checks
- Add `additional noproxy` addresses to the join command

## Release v2022.08.08-0

Released on August 8, 2022

### New Features {#new-features-v2022-08-08-0}

- Adds Ubuntu 22.04 support.
- Adds KOTS add-on version 1.80.0. See [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm).

### Improvements {#improvements-v2022-08-08-0}

- Adds a new preflight check to disallow the Docker add-on installation on Ubuntu 22.04.

### Bug Fixes {#bug-fixes-v2022-08-08-0}

- Fixes an issue that could cause downloading add-on packages to fail with a TAR error.

## Release v2022.08.04-0

Released on August 4, 2022

### New Features {#new-features-v2022-08-04-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.79.0.
- Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.22.0.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.58.0-39.4.0.
- Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-08-02T23-59-16Z.

### Improvements {#improvements-v2022-08-04-0}

- The install script will now retry add-on package downloads for some failure scenarios.

### Bug Fixes {#bug-fixes-v2022-08-04-0}

- Fixes an issue as of kURL version v2022.08.03-0 that improperly sets auth_allow_insecure_global_id_reclaim to true for new installations.

## Release v2022.08.03-0

Released on August 3, 2022

### New Features {#new-features-v2022-08-03-0}

- Adds [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.6.11.
- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.19.9.

### Bug Fixes {#bug-fixes-v2022-08-03-0}

- Fixes an issue in [Rook add-on](https://kurl.sh/docs/add-ons/rook) versions 1.5.11 and 1.5.12 that could cause Rook upgrades to fail from versions prior to 1.5.11 due to `auth_allow_insecure_global_id_reclaim` improperly set to `false` for [unpatched Ceph versions](https://docs.ceph.com/en/quincy/security/CVE-2021-20288/).
- Fixes an issue in [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions prior to 0.19.9 that could cause Ceph to remain in `HEALTH_WARN` state for as long as an hour on a new installation.

## Release v2022.07.29-0

Released on July 29, 2022

### New Features {#new-features-v2022-07-29-0}

- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.19.6.

### Improvements {#improvements-v2022-07-29-0}

- kURL is now [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes) compliant using the latest [github.com/aquasecurity/kube-bench](https://github.com/aquasecurity/kube-bench) version v0.6.8 when property `kubernetes.cisCompliance` is set to `true`.

### Bug Fixes {#bug-fixes-v2022-07-29-0}

- Fixes an issue in [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions prior to 0.19.6 that causes unnecessary downtime when adding additional primary nodes and using the EKCO [internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).
- Fixes an issue in [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions prior to 0.19.6 that causes long running kubectl commands such as `kubectl logs` or `kubectl exec` to timeout after 20 seconds of inactivity when using the EKCO [internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).

## Release v2022.07.28-0

Released on July 28, 2022

### New Features {#new-features-v2022-07-28-0}

- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.19.3.
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.78.0.

### Improvements {#improvements-v2022-07-28-0}

- Updates the haproxy image to tag 2.6.2-alpine3.16 for [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.19.3 to address the following critical severity CVEs: CVE-2022-1586, CVE-2022-1587.
- The property `kubernetes.loadBalancerUseFirstPrimary`, and equivalent flag `kubernetes-load-balancer-use-first-primary`, has been added to automatically use the first primary address as the cluster control plane endpoint. This settings is not recommended. Enable the [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) and use the property `ekco.enableInternalLoadBalancer` instead.

### Bug Fixes {#bug-fixes-v2022-07-28-0}

- Fixes an issue with [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions prior to 0.19.3 which causes registry certificates generated to be expired upon renewal.

## Release v2022.07.22-0

Released on July 22, 2022

### New Features {#new-features-v2022-07-22-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.77.0.

### Improvements {#improvements-v2022-07-22-0}

- Updates the kurlsh/s3cmd image to tag 20220722-4585dda for the latest [Registry](https://kurl.sh/docs/add-ons/registry) and [Velero](https://kurl.sh/docs/add-ons/velero) add-on versions, to address the following high severity CVEs: CVE-2022-30065, CVE-2022-2097, CVE-2022-30065.

## Release v2022.07.20-0

Released on July 20, 2022

### New Features {#new-features-v2022-07-20-0}

- Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20220720 and 2.8.1-20220720 with a fix for broken iptables command on RHEL 8 based distributions.
- Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version RELEASE.2022-07-17T15-43-14Z.

### Bug Fixes {#bug-fixes-v2022-07-20-0}

- Fixes an issue on RHEL 8 based distributions that causes the iptables command to report error `table "filter" is incompatible, use 'nft' tool` when using [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20220616 and 2.8.1-20220616.

## Release v2022.07.15-2

Released on July 15, 2022

### Improvements {#improvements-v2022-07-15-2}

- Updates the local-volume-provider image to v0.3.6 for the [Velero add-on](https://kurl.sh/docs/add-ons/velero) to address CVE-2021-38561 with high severity.

## Release v2022.07.15-1

Released on July 15, 2022

### New Features {#new-features-v2022-07-15-1}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.76.1.
- Adds [Kubernetes add-on](https://kurl.sh/docs/add-ons/kubernetes) versions 1.24.3, 1.23.9, 1.22.12 and 1.21.14.
- Adds [Weave add-on](https://kurl.sh/docs/add-ons/weave) versions 2.6.5-20220616 and 2.8.1-20220616 with Replicated-created security patches.

### Improvements {#improvements-v2022-07-15-1}

- Changes Weave version 2.6.5 and 2.8.1 to once again use upstream weave images.

### Bug Fixes {#bug-fixes-v2022-07-15-1}

- Fixes an issue that caused Rook to Longhorn migration failures due to Ceph claiming Longhorn devices.

## Release v2022.07.15-0

Released on July 15, 2022

### Improvements {#improvements-v2022-07-15-0}

- Improved health checks for [MinIO](https://kurl.sh/docs/add-ons/minio), [OpenEBS](https://kurl.sh/docs/add-ons/openebs), and [GoldPinger](https://kurl.sh/docs/add-ons/goldpinger) add-ons.

## Release v2022.07.12-0

Released on July 12, 2022

### New Features {#new-features-v2022-07-12-0}

- Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version 2022-07-06T20-29-49Z to address the following high severity CVE: CVE-2022-1271.
- Adds [Docker Registry add-on](https://kurl.sh/docs/add-ons/registry) version 2.8.1.
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.76.0.

### Improvements {#improvements-v2022-07-12-0}
- Updates kurlsh/s3cmd image to tag 20220711-9578884 for latest [Registry](https://kurl.sh/docs/add-ons/registry) and [Velero](https://kurl.sh/docs/add-ons/velero) add-on versions to address the following critical and high severity CVEs: CVE-2018-25032, CVE-2021-30139, CVE-2021-36159, CVE-2021-3711, CVE-2021-3712, CVE-2021-42378, CVE-2021-42379, CVE-2021-42380, CVE-2021-42381, CVE-2021-42382, CVE-2021-42383, CVE-2021-42384, CVE-2021-42385, CVE-2021-42386, CVE-2021-45960, CVE-2021-46143, CVE-2022-0778, CVE-2022-1271, CVE-2022-22822, CVE-2022-22823, CVE-2022-22824, CVE-2022-22825, CVE-2022-22826, CVE-2022-22827, CVE-2022-23852, CVE-2022-23990, CVE-2022-25235, CVE-2022-25236, CVE-2022-25314, CVE-2022-25315, CVE-2022-28391.

## Release v2022.07.07-0

Released on July 7, 2022

### Improvements {#improvements-v2022-07-07-0}

- Adds [containerd add-on](https://kurl.sh/docs/add-ons/containerd) version 1.6.6.
- Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.8.

## Release v2022.07.05-0

Released on July 5, 2022

### New Features {#new-features-v2022-07-05-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.75.0.

## Release v2022.07.01-1

Released on July 1, 2022

### New Features {#new-features-v2022-07-01-1}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.74.0.

## Release v2022.07.01-0

Released on July 01, 2022

### New Features {#new-features-v2022-07-01-0}

- Adds [Goldpinger add-on](https://kurl.sh/docs/add-ons/goldpinger) version 3.5.1.
- Adds support for RHEL and Oracle Linux 8.6.
- Adds support for upgrading OpenEBS 1.x directly to 2.12+ or 3.2+.
- The default [RKE2](https://kurl.sh/docs/add-ons/rke2) spec now includes the latest version of the [OpenEBS add-on](https://kurl.sh/docs/add-ons/openebs)


## Release v2022.06.29-0

Released on June 29, 2022

### New Features {#new-features-v2022-06-29-0}

- Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.9.0.
- Adds [OpenEBS add-on](https://kurl.sh/docs/add-ons/openebs) versions 2.12.9 and 3.2.0. Only localpv volumes are supported.

## Release v2022.06.24-0

Released on June 24, 2022

### New Features {#new-features-v2022-06-24-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.73.0.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.57.0-36.2.0 to address the following critical and high severity CVEs: CVE-2022-28391, CVE-2022-0778, CVE-2022-28391, CVE-2022-1271, CVE-2018-25032.

## Release v2022.06.22-0

Released on June 22, 2022

### Improvements {#improvements-v2022-06-22-0}

- Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.21.1.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.57.0-36.0.3.
- Adds [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.56.7.

### Bug Fixes {#bug-fixes-v2022-06-22-0}

- Fixes CVEs for [Weave add-on](https://kurl.sh/docs/add-ons/weave) version 2.8.1. CVEs addressed: CVE-2021-36159, CVE-2021-25216, CVE-2021-30139, CVE-2020-8620, CVE-2020-8621, CVE-2020-8623, CVE-2020-8625, CVE-2021-25215, CVE-2021-28831, CVE-2020-8169, CVE-2020-8177, CVE-2020-8231, CVE-2020-8285, CVE-2020-8286, CVE-2020-28196, CVE-2021-23840, CVE-2021-3450, CVE-2021-3517, CVE-2021-3518.
- Updates the local-volume-provider image to v0.3.5 for the [Velero add-on](https://kurl.sh/docs/add-ons/velero) to address CVE-2022-1664 with critical severity.

## Release v2022.06.17-0

Released on June 17, 2022

### Improvements {#improvements-v2022-06-17-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.72.1.
- Adds [MinIO add-on](https://kurl.sh/docs/add-ons/minio) version 2022-06-11T19-55-32Z to address the following critical and high severity CVEs: CVE-2020-14040, CVE-2021-42836, CVE-2020-36067, CVE-2020-36066, CVE-2020-35380, CVE-2020-26521, CVE-2020-26892, CVE-2021-3121, CVE-2020-26160, CVE-2021-28831, CVE-2020-11080, CVE-2021-3450, CVE-2021-23840, CVE-2020-1967, CVE-2020-8286, CVE-2020-8285, CVE-2020-8231, CVE-2020-8177, CVE-2020-8169, CVE-2021-30139, CVE-2021-36159.
- Adds details to the documentation for the [AWS add-on](https://kurl.sh/docs/add-ons/aws) to include details on applying the appropriate [AWS IAM](https://aws.amazon.com/iam/) roles required for the add-on to function properly and additional specific requirements necessary for integrating with [AWS ELB](https://aws.amazon.com/elasticloadbalancing/) service.

### Bug Fixes {#bug-fixes-v2022-06-17-0}

- Fixes a bug where the [AWS add-on](https://kurl.sh/docs/add-ons/aws) would fail if `latest` or `0.1.x` was used.
- Fixes a bug when `excludeStorageClass` is set to `true` would cause the [AWS add-on](https://kurl.sh/docs/add-ons/aws) to fail.

## Release v2022.06.14-0

Released on June 14, 2022

### New Features {#new-features-v2022-06-14-0}

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.72.0.
- Adds [Local Path Provisioner add-on](https://kurl.sh/docs/add-ons/local-path-provisioner) (Beta) as an additional storage provisioner.

### Bug Fixes {#bug-fixes-v2022-06-14-0}

- Fixes an issue where the `HTTPS_PROXY` variable was not set properly for the [containerd add-on](https://kurl.sh/docs/add-ons/containerd) service.

## Release v2022.06.01-0

Released on June 1, 2022

### Improvements

- Adds support for Kubernetes versions for 1.21.12, 1.22.9, 1.23.6 and 1.24.0.
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.71.0.
- Adds [containerd add-on](https://kurl.sh/docs/add-ons/containerd) versions 1.5.10, 1.5.11, and 1.6.4.
- Adds [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) version 1.2.4.
- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) versions 0.19.1 and 0.19.2.
- In addition to the `ekco.enableInternalLoadBalancer` parameter in the installer specification, the `ekco-enable-internal-load-balancer` flag can now be specified at install time to enable the EKCO [internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).
- Upgraded the replicated/local-volume-provider image to v0.3.4 for [Velero add-on](https://kurl.sh/docs/add-ons/velero) v1.8.1.

### Bug Fixes

- Fixes an issue that caused the `less` command to break after installing on Amazon Linux 2.
- Fixes an issue that caused installations with Velero and the `kotsadm.disableS3` flag set to `true` to fail on RHEL-based distributions.
- Fixes an issue that caused `bash: _get_comp_words_by_ref: command not found` to be printed after pressing tab when `bash-completion` is not installed.
- Fixes an issue where migrating the object store from Rook to MinIO would fail due to undefined metrics functions.

## Release v2022.05.19-0

Released on May 19, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.70.1.
- Does not install Helm unless the experimental Helm charts feature is in use.

## Release v2022.05.16-0

Released on May 16, 2022

### Improvements

- Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.21.0.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.56.2-35.2.0.
- Adds [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.8.1.

## Release v2022.05.11-0

Released on May 11, 2022
### Improvements

- The storage class created by the AWS add-on is now named `aws-ebs` instead of `default`.

## Release v2022.05.10-0

Released on May 10, 2022

### New Features

- Introduces the AWS add-on, which sets up the AWS cloud provider in a Kubernetes installer-created cluster. For more information, see [AWS Add-On](https://kurl.sh/docs/add-ons/aws) in the kURL open source documentation.

### Improvements

- OpenEBS is now marked as incompatible with Kubernetes 1.22+.

## Release v2022.05.06-0

Released on May 6, 2022

### New Features

- Adds a `resticTimeout` configuration option to the [Velero add-on](https://kurl.sh/docs/add-ons/velero) to allow users to configure the value that gets passed to the `--restic-timeout` flag in the Velero pod. This can also be set using the [`velero-restic-timeout` flag](https://kurl.sh/docs/install-with-kurl/advanced-options#reference) when running the install script.

### Improvements

- The “latest” version for the [containerd add-on](https://kurl.sh/docs/add-ons/containerd) is no longer pinned to 1.4.6. The “latest” version was pinned to 1.4.6 because later versions of containerd are not supported on Ubuntu 16. kURL removed support for Ubuntu 16 in [v2022.04.29-0](#release-v20220429-0).
- Adds the `NoExecute` effect to the toleration for the Weave-Net DaemonSet for versions 2.5.2, 2.6.4, and 2.6.5.
- Ensures that OpenEBS pods run with critical priority so that they are not evicted before other pods that depend on them.

### Bug Fixes

- Fixes an issue that could cause a migration from Docker to containerd to fail from a miscalculation of available disk space.
- Fixes an issue that caused an upgrade of Kubernetes to fail when enabling the [EKCO internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).

## Release v2022.05.02-0

Released on May 2, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.70.0.

## Release v2022.04.29-0

Released on April 29, 2022

### Improvements

- Installs an NFS client package as part of the [Velero add-on](https://kurl.sh/docs/add-ons/velero).
- Removes support for Ubuntu 16.04 (end of life April 29, 2021).
- The [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) recommends that the user change the password after installation.

### Bug Fixes

- Fixes an issue that caused upgrades of two versions of Kubernetes on remote masters to fail with error "docker: executable file not found in $PATH".
- Fixes an issue that caused a migration from Containerd to Docker to fail on air gapped instances with image pull errors.

## Release v2022.04.19-0

Released on April 19, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.69.1.
- Adds [Goldpinger add-on](https://kurl.sh/docs/add-ons/goldpinger) version 3.3.0-5.1.0.

### Bug Fixes

- Fixes a bug where the `installerVersion` in the kURL manifest was not fully applied.

## Release v2022.04.08-1

Released on April 8, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.69.0.

## Release v2022.04.08-0

Released on April 8, 2022

### Improvements

- Adds support for Kubernetes versions 1.21.11, 1.22.8, and 1.23.5.
- Adds support for containerd version 1.4.13.

### Bug Fixes

- Fixes a bug that caused cross-cluster restores to fail in some situations.
- Fixes an issue where Contour and Envoy requested too much CPU, causing other pods to not get scheduled in 4 CPU single node installations.
- Fixes a bug where persistent volume migrations sometimes failed due to a nil pointer dereference.
- Fixes a bug where the migration from Rook's object store to MinIO would fail after failing to get the logs of the sync-object-store pod.
- Increases the timeout while waiting for the kotsadm deployment to start, in order to improve the success rate when migrating from Rook to Longhorn.
- Fixes a bug that caused migrating from Docker to containerd to fail when also upgrading Kubernetes by more than one minor version in multi-node clusters.

## Release v2022.04.04-0

Released on April 4, 2022

### New Features

- Adds the `kubeReserved` and `systemReservedResources` options to the [Kubernetes add-on](https://kurl.sh/docs/add-ons/kubernetes) to reserve resources for Kubernetes and OS system daemons. For more information, see [Kube Reserved](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#kube-reserved) and [System Reserved](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#system-reserved).
- Adds the `evictionThresholdResources` option to the [Kubernetes add-on](https://kurl.sh/docs/add-ons/kubernetes) to set [Kubernetes eviction thresholds](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#eviction-thresholds).

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.68.0.

## Release v2022.03.23-0

Released on March 23, 2022

### Improvements

- Adds an optional [CIS Compliance](https://kurl.sh/docs/install-with-kurl/cis-compliance) flag to the Kubernetes installer specification that configures the instance to meet the [Center for Internet Security (CIS)](https://www.cisecurity.org/cis-benchmarks/) compliance benchmark.
- Fixes a bug that could cause an unbound variable error when restoring from a backup.

## Release v2022.03.22-0

Released on March 22, 2022

### Bug Fixes

- Fixes a bug that caused installations to fail with the error “incorrect binary usage” for all installers that include KOTS add-on version 1.67.0.

## Release v2022.03.21-0

Released on March 21, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.67.0.
- Adds the [`app-version-label` flag](https://kurl.sh/docs/install-with-kurl/advanced-options#reference), which takes a version label as an argument and tells KOTS to install that particular version of an application. If this flag is not passed, the latest version of the application is installed. See [Install in an Online Environment​](/enterprise/installing-embedded-cluster#install-in-an-online-environment) in _Installing with the Kubernetes Installer_.

## Release v2022.03.11-0

Released on March 11, 2022

### New Features
* Adds the [labels flag](https://kurl.sh/docs/install-with-kurl/advanced-options), which applies the given labels to the node.

### Bug Fixes
* Fixes false validation errors when creating a new installer that includes one or more of the following fields: `excludeBuiltinHostPreflights`, `hostPreflightIgnore`, `hostPreflightEnforceWarnings`, and `storageOverProvisioningPercentage`.

## Release v2022.03.08-0

Released on March 8, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.66.0.

### Bug Fixes

- Fixes a bug where the `installerVersion` field for the [kURL add-on](https://kurl.sh/docs/add-ons/kurl) was stripped when creating or promoting the installer.

## Release v2022.03.04-1

Released on March 4, 2022

### Improvements

- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.18.0.

## Release v2022.03.04-0

Released on March 4, 2022

### Improvements

- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.17.0.
- Adds CPU resource requests and limits to the [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.20.1+ to prevent Envoy from becoming unresponsive.

## Release v2022.03.01-0

Released on March 1, 2022

### Improvements

- Adds [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.20.1.

## Release v2022.02.28-0

Released on February 28, 2022

### Improvements

- Adds the [storage over-provisioning percentage](https://longhorn.io/docs/1.2.3/references/settings/#storage-over-provisioning-percentage) option to the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn).

### Bug Fixes

- Fixes the KOTS `uiBindPort` for the beta K3s and RKE2 installers so that they won't error on deploy. This port now defaults to 30880, and the allowable range is ports 30000-32767.

## Release v2022.02.25-0

Released on February 25, 2022

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.65.0.

## Release v2022.02.23-0

Released on February 23, 2022

### Bug Fixes

- Fixes a race condition when migrating from Rook-Ceph to Longhorn with both Prometheus and [EKCO v0.13+](https://kurl.sh/docs/add-ons/ekco#auto-resource-scaling) installed.
- Fixes a bug that caused RHEL 8 installations utilizing the [containerd add-on](https://kurl.sh/docs/add-ons/containerd) to fail because of conflicting dependency package versions.
- Fixes a bug that caused RHEL 7 installations to fail because of conflicting openssl-lib package versions.

## Release v2022.02.18-0

### Improvements

- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.64.0.

## Release v2022.02.17-0

Released on February 17, 2022

### New Features
- (Beta) Introduces support for the [K3s](https://kurl.sh/docs/add-ons/k3s) and [RKE2](https://kurl.sh/docs/add-ons/rke2) add-ons.
- (Beta) Introduces support for a [single-node optimized installer specification](https://kurl.sh/docs/create-installer/single-node-optimized), using either [K3s](https://kurl.sh/docs/add-ons/k3s) or [RKE2](https://kurl.sh/docs/add-ons/rke2).
- The [KOTS](https://kurl.sh/docs/add-ons/kostadm) add-on no longer includes the MinIO image.

### Improvements
- Automatic detection of the host's private IP on subsequent runs of the installation script.

### Bug Fixes
- Fixes an erroneous host preflight failure when using EKCO's [internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer).
- Fixes a bug that caused containerd to fail with x509 errors when pulling images from the local kURL registry.
- Fixes a bug that resulted in the `kurl-config` ConfigMap to be missing when using [K3s](https://kurl.sh/docs/add-ons/k3s) and [RKE2](https://kurl.sh/docs/add-ons/rke2) distributions.

## Release v2022.02.11-1

Released on February 11, 2022

### Improvements
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.63.0.

## Release v2022.02.11-0

Released on February 11, 2022

### Bug Fixes
- Fixes a failing preflight for the TCP load balancer check when EKCO's internal load balancer is enabled.

## Release v2022.02.09-0

### Improvements
- Adds support for Kubernetes versions 1.22.6, 1.21.9, and 1.20.15.
- Adds support for Contour version 1.20.0.
- Adds support for K3s version 1.23.3+k3s1. This feature is experimental and is only available to vendors who have requested access.
- Adds support for RKE2 version 1.22.6+rke2r1. This feature is experimental and is only available to vendors who have requested access.
- Updates the latest installer specification (https://kurl.sh/latest) to Kubernetes 1.23.x.

## Release v2022.02.04-0

Released on February 4, 2022

### Improvements
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.62.0.

### Bug Fixes
- Fixes an installer failure in scenarios where custom host preflights are enabled with other installer flags.
- Fixes a bug that allowed for weak ciphers in etcd, kubelet, and kube apiserver.

## Release v2022.02.01-0

Released on February 1, 2022

### New Features
- Adds support for RHEL 8.5.

### Improvements
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.61.0.

### Bug Fixes
- Fixes Velero backup labels not being added to registry secrets when the secrets were already present.
- Fixes restoration of snapshots of the registry from pre-IPV6 support on new clusters.
- Fixes using the `skip-system-package-install` flag with the containerd add-on.

## Release v2022.01.28-2

Released on January 28, 2022

### Bug Fixes

- Changes the [filesystem write latency host preflight for etcd](https://kurl.sh/docs/install-with-kurl/host-preflights#primary-nodes) to warn when greater than or equal to 10ms.

## Release v2022.01.28-1

Released on January 28, 2022

### New Features
- Registry backup and restore scripts include more user-friendly logging within the container.

### Bug Fixes
- Fixes airgap Postgres images in [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.60.0.

## Release v2022.01.28-0

Released on January 28, 2022

### New Features
- Adds support for Kubernetes version 1.23.x.

### Bug Fixes
- Fixes a bug that caused the installer to exit when installing Antrea version 1.4.0+ with encryption and without the requisite WireGuard kernel module.

## Release v2022.01.25-0

Released on January 25, 2022

### New Features
- [Host preflight](https://kurl.sh/docs/install-with-kurl/host-preflights/) failures are now blocking, and the installer will exit with error. Warnings do not cause the installer to exit. Warnings can be enforced and errors can be ignored with [`host-preflight-enforce-warnings` and `host-preflight-ignore`](https://kurl.sh/docs/install-with-kurl/advanced-options).

### Improvements
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.60.0.
- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.16.0, which does a rollout restart of the envoy pods after generating the new certificates instead of restarting all pods at once. It will also validate and renew certificates on startup.

### Bug Fixes
- Fix legacy `apiregistration.k8s.io/v1beta1` resource for Prometheus 0.53.1-30.1.0.

## Release v2022.01.24-0

Released on January 24, 2022

### Bug Fixes
- Reverts an update to React-DOM that was causing the TestGrid UI to fail.

## Release v2022.01.22-0

Released on January 22, 2022

### Bug Fixes
- Changes the default Kubernetes version from 1.22.x to 1.21.x to mitigate an incompatibility with the default Prometheus version.

## Release v2022.01.21-0

Released on January 21, 2022

### Improvements
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version v1.59.3.
- Adds [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.53.1-30.1.0.
- Adds [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.15.0, which supports auto-renewal of Contour and Envoy certs.
- Moves the [`latest`](https://kurl.sh/latest) installer on kurl.sh to Kubernetes 1.22.5.

### Bug Fixes
- Fixes a bug that caused the **Internal Storage** snapshot option to be missing when an object store is available.
- Fixes random Alert Manager and Grafana Nodeports in the Prometheus add-on for versions 0.53.1-30.1.0+.


## Release v2022.01.18-0

Released on January 18, 2022

### New Features
- Adds the ability to exclude the built-in host preflights during installation.

### Improvements
- Adds support for Kubernetes v1.22.5.
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version v1.59.2.
- Adds version 0.14.0 of the EKCO add-on, which adds Kubernetes v1.22+ support.

### Bug Fixes
- Fixes a race condition with Storage Class migration.
- Fixes a bug related to long Persistent Volume Claim (PVC) names when migrating Storage Classes.
- Fixes some host preflight error messages.

## Release v2022.01.05-0

Released on January 5, 2022

### Improvements
- Adds support for Kubernetes 1.19.16, 1.20.14, 1.21.8.

### Bug Fixes
- Resolves an error when installing the Velero add-on with Kubernetes 1.21 and `disableS3=true` set for KOTS.
- Fixes an issue with the KOTS URL not printing correctly when performing a re-install or upgrade.

## Release v2022.01.04-0

Released on January 4, 2022

### Bug Fixes
- Reverts `latest` version of Kubernetes to v1.19.x.

## Release v2021.12.29-0

Released on December 29, 2021

### New Features
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.59.1.


## Release v2021.12.23-0

Released on December 23, 2021

### New Features
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.59.0.
- Adds support for [cluster migration away from object storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage). KOTS can now be deployed without an object store with [no loss of snapshot or registry functionality](https://kurl.sh/docs/add-ons/kotsadm).

## Release v2021.12.21-0

Released on December 21, 2021

### Improvements
- Updates front-end dependencies to latest available versions.

## Release v2021.12.17-0

Released on December 17, 2021

### Bug Fixes
- Improves experimental [IPv6](https://kurl.sh/docs/install-with-kurl/ipv6) support.

## Release v2021.12.14-0

Released on December 14, 2021

### New Features
- Adds [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.58.2.

### Bug Fixes
- Adds Contour 1.19.1 images that were missing from airgap bundles.


## Release v2021.12.10-0

Released on December 10, 2021

### New Features
- Adds the ability to skip the installation of system packages by passing the `skip-system-package-install` flag. Using this flag will automatically enable a preflight check that will detect if the necessary system packages for the included addons are already installed.

### Improvements
- kURL `latest` installer spec is now pinned to Kubernetes version 1.21.x
- kURL `latest` installer spec will now pin to addon minor versions rather than `latest`.

## Release v2021.12.09-0

Released on December 9, 2021

### Improvements
- Adds support for Oracle Linux 8.5.

### Bug Fixes
- Temporarily removes the Prometheus add-on version 0.52.0-22.0.0 due to an [upstream bug](https://github.com/prometheus-community/helm-charts/issues/1500).

## Release v2021.12.08-0

Released on December 8, 2021

### New Features
- Adds [EKCO](https://kurl.sh/docs/add-ons/ekco) version 0.13.0.
- Adds Velero version 1.7.1.
- Adds Longhorn version 1.2.2.
- Adds Sonobuoy version 0.55.1.
- Adds Antrea version 1.4.0.
- Adds Prometheus version 0.52.0-22.0.0.
- Updates pvmigrate to 0.4.1.

### Bug Fixes
- Prevents EKCO from trying to manage Rook when Rook is not installed.
- Fixes missing packages in some Longhorn migration scenarios.

## Release v2021.12.02-0

Released on December 2, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.58.1.

## Release v2021.12.01-0

Released on December 1, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.58.0.

### Bug Fixes
- Host packages installed as DNF modules are now reset after installation to allow for running yum update without dependency errors.


## Release v2021.11.22-0

Released on November 22, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.57.0.


## Release v2021.11.09-0

Released on November 09, 2021

### Improvements
- kURL will now report when migrations occur between the Rook Ceph and MiniO object stores.
- kURL will now report when migrations occur between the Rook Ceph and Longhorn storage classes.

### Bug Fixes
- Fixed an issue that prevented the versions of Longhorn and MinIO from resolving in kurl.sh/latest.

## Release v2021.11.08-0

Released on November 08, 2021

### Improvements
- The default configuration for https://kurl.sh/latest was updated to replace Rook with Longhorn and MinIO.

## Release v2021.11.05-0

Released on November 05, 2021

### New Features
- Added mechanism to migrate registry contents from s3 to a persistent volume. Note that this cannot be triggered yet, but will later be used once all object storage-related migrations are available.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.56.0.

### Bug Fixes
- Reverted changes to https://kurl.sh/latest that were introduced in [v2021.11.04-0](https://kurl.sh/release-notes/v2021.11.04-0). As a result, Rook and Kubernetes 1.19 are once again in the default configuration.

## Release v2021.11.04-0

Released on November 04, 2021

### Improvements
- The default configuration for https://kurl.sh/latest was updated to include Kubernetes 1.21 instead of 1.19, and Rook was replaced with Longhorn and MinIO. Note that using `rook: latest` with `kubernetes: latest` no longer works as Rook 1.0.4 is not compatible with Kubernetes 1.20+. To avoid this, pin a specific version instead of using `latest`.

## Release v2021.11.02-0

Released on November 02, 2021

### Improvements
- Rook Ceph versions 1.4+ will now display an info-level message when trying to mount an external disk, along with some troubleshooting tips.

### Bug Fixes
- kURL [yaml patches](https://kurl.sh/docs/install-with-kurl/#modifying-an-install-using-a-yaml-patch-file-at-runtime) that include non-breaking spaces will now cause the installer to fail with a helpful error.
- Null or empty kURL [yaml patches](https://kurl.sh/docs/install-with-kurl/#modifying-an-install-using-a-yaml-patch-file-at-runtime) will not remove the configuration provided by the kURL spec.

## Release v2021.10.22-0

Released on October 22, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.55.0.

## Release v2021.10.20-0

Released on October 20, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.54.0.

### Bug Fixes
- Fixed a bug caused when Ceph update versions are not applied to all Ceph components.
- Reverted the ability for the registry add-on to run with two replicas and a RWX volume when used with Longhorn. This was originally released in [v2021.10.01-0](https://kurl.sh/release-notes/v2021.10.01-0).

## Release v2021.10.08-0

Released on October 08, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.53.0.

## Release v2021.10.04-0

Released on October 04, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.52.1.

## Release v2021.10.01-0

Released on October 01, 2021

### New Features
- Containerd is now the default container runtime, replacing the previous default container runtime, Docker.
- Log rotation will now be configured by default for the [Docker add-on](https://kurl.sh/docs/add-ons/docker), where the [max-size](https://docs.docker.com/config/containers/logging/json-file/#options) parameter for the log file is set to `10m`.
- Added the ability to configure log rotation through kubelet, which helps when using containerd instead of docker.
- Re-enabled the ability to declare custom host preflight checks in the kURL installer spec.

### Improvements
- When Longhorn is specified in an installer spec but an object store (e.g., MinIO) is not, the [Registry add-on](https://kurl.sh/docs/add-ons/registry) will be deployed with two replicas and a ReadWriteMany (RWX) volume for greater availability.

### Bug Fixes
- Fixed a bug that didn't allow User and Service Account tokens to authenticate to the kURL API.

## Release v2021.09.30-0

Released on September 30, 2021

### Bug Fixes
- Fixed a bug to allow User and Service Account token authenticate to the API
- Fixed a bug that could cause upgrades from Rook 1.0.4 to 1.0.4-14.2.21 to fail
- Fixed a bug that would cause snapshots not to restore after a Rook to Longhorn migration

### Improvements
- Sysctl parameters required for pod networking are now enabled for all operating systems in /etc/sysctl.conf

## Release v2021.09.27-4

Released on September 27, 2021

### Bug Fixes
- Due to a bug, removed the ability to add custom host preflights in the kURL installer spec. This was initially released in [v2021.09.24-0](https://kurl.sh/release-notes/v2021.09.24-0).

## Release v2021.09.24-0

Released on September 24, 2021

### New Features
- Custom host preflight checks can be declared in the kURL installer spec.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.52.0.

### Bug Fixes
- Fixed an issue that prevented Rook add-on preflight checks from executing.

## Release v2021.09.20-0

Released on September 20, 2021

### Bug Fixes
- Fixed a bug that could cause the EKCO addon to fail when mistakenly trying to deploy the `PodImageOverrides` mutating webhook configuration.

## Release v2021.09.17-0

Released on September 17, 2021

### New Features
- Added Kubernetes versions 1.21.5, 1.21.4, 1.21.3, 1.20.11, 1.20.10, and 1.19.15.

## Release v2021.09.16-0

Released on September 16, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kots) nightly version.

## Release v2021.09.15-0

Released on September 15, 2021

### New Features
- Added [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.12.0.
- Host preflights check disk space in /opt/replicated/rook with Rook 1.0.4.

### Improvements
- Host preflight block device checks run for all versions of Rook 1.4+.

## Release v2021.09.09-0

Released on September 9, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kots) version 1.50.2.

## Release v2021.08.27-0

Released on August 27, 2021

### New Features
- Clusters with containerd enabled will be automatically migrated from docker when docker is detected. Previously containerd would not be installed when docker was detected.

### Bug Fixes
- Fixed an issue that prevented the [internal load balancer](https://kurl.sh/docs/add-ons/ekco#internal-load-balancer) from being started on remote nodes when not explicitly enabled.
- Fixed an issue that could cause the [minio add-on](https://kurl.sh/docs/add-ons/minio) to wait forever when creating a PVC.

## Release v2021.08.20-0

Released on August 20, 2021

### New Features
- Added a new parameter to the [MinIO addon](https://kurl.sh/docs/add-ons/minio), `claimSize`. This defaults to `10Gi` and allows setting the size of the MinIO PVC.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kots) version 1.50.1.

## Release v2021.08.16-0

Released on August 16, 2021

### New Features
- New feature flag [licenseURL](https://kurl.sh/docs/install-with-kurl/#vendor-licensing-agreement-beta) for kURL allows vendors to include a URL to a licensing agreement for non-airgap installs.
- Added [Antrea add-on](https://kurl.sh/docs/add-ons/antrea) version 1.2.1.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.49.0-17.1.3.
- Added [local-volume-provider](https://github.com/replicatedhq/local-volume-provider) plugin to Velero addon versions 1.5.1 through 1.6.2.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.50.0.

### Bug Fixes
- Docker preflights will no longer run when docker is not configured within kURL.

## Release v2021.08.09-0

Released on August 9, 2021

### New Features
- Added [Sonobuoy add-on](https://kurl.sh/docs/add-ons/sonobuoy) version 0.53.0.
- Added [Goldpinger add-on](https://kurl.sh/docs/add-ons/goldpinger) version 3.2.0-4.2.1.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.49.0-17.1.1.

### Bug Fixes
- The [Rook add-on block storage](https://kurl.sh/docs/add-ons/rook#block-storage) flag is no longer required to be set for version 1.4.3+. Instead, it is assumed to be set to true for these versions.

## Release v2021.08.06-0

Released on August 6, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.49.0.

## Release v2021.08.04-0

Released on August 4, 2021

### New Features
- The kURL installer can now differentiate between installs and upgrades.
- Added [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.11.0 with support for [internal load balancing with HAProxy on HA installs](https://kurl.sh/docs/install-with-kurl/#highly-available-k8s-ha).

## Release v2021.08.03-0

Released on August 3, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.48.1.

### Bug Fixes
- Fixed an issue where the kotsadm config would be overriden when updating kURL.

## Release v2021.07.30-1

Released on July 30, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.48.0.

## Release v2021.07.30-0

Released on July 30, 2021

### New Features
- Added [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.18.0.
- Added [Antrea add-on](https://kurl.sh/docs/add-ons/antrea) version 1.2.0.
- Longhorn 1.1.2+ will automatically migrate Rook-backed PVCs to Longhorn-backed if Rook is installed but no longer included in the kURL spec.
- MinIO will automatically import Rook-backed object store data if Rook is installed but no longer included in the kURL spec.
- Rook will automatically be uninstalled if all data is migrated successfully to both Longhorn and MinIO.


## Release v2021.07.23-1

Released on July 23, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.47.3.
- Added [Velero add-on](https://kurl.sh/docs/add-ons/velero) version 1.6.2.
- Added [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) version 1.1.2.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.49.0-17.0.0.
- Added Kubernetes versions 1.21.3, 1.20.9, and 1.19.13.

## Release v2021.07.23-0

Released on July 23, 2021

### New Features
- Host preflight results are now tracked in the directory `/var/lib/kurl/host-preflights`.

### Improvements
- Host preflights can now be run with an installer spec from STDIN, for example `kubectl get installer 6abe39c -oyaml | /var/lib/kurl/bin/kurl host preflight -`.
- Host preflight added to check disk usage in /var/lib/docker.

### Bug Fixes
- Fixed an issue that would cause [.x versions](https://kurl.sh/docs/create-installer/#x-patch-versions) to fail for the kotsadm addon.
- Fixed an issue where warning messages would be displayed for passing preflight checks.
- Fixed an issue where terminal control characters were erroneously displayed in noninteractive preflight check output.
- Fixed an issue where invalid configurations for Rook version 1.4 or greater would pass validation checks.

## Release v2021.07.20-0

Released on July 20, 2021

### Bug Fixes
- Fixed an issue that would cause the installer to panic when `spec.selinuxConfig` is not empty or the `preserve-selinux-config` flag is specified and `spec.firewalldConfig` is empty.

## Release v2021.07.19-0

Released on July 19, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.47.2
- The [Rook add-on's](https://kurl.sh/docs/add-ons/rook) object store can be migrated to [MinIO](https://kurl.sh/docs/add-ons/minio) with the `migrate-rgw-to-minio` task.

### Improvements
- Weave add-on host preflight check will not fail on connection timeout on metrics ports 6781 and 6782.
- The preflight check for ftype on XFS filesystems has been added to all versions of containerd 1.3.7+.

### Bug Fixes
- The [EKCO add-on's](https://kurl.sh/docs/add-ons/ekco) reboot service no longer depends on docker when using containerd.

## Release v2021.07.16-0

Released on July 16, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.47.1.

### Improvements
- The [containerd add-on](https://kurl.sh/docs/add-ons/containerd) will check XFS filesystems have ftype enabled before attempting to install.
- The load balancer address preflight check will now validate that a valid address is provided before validating the network.

### Bug Fixes
- The default preflight check for memory pass value has been changed from 8Gi to 8G.

## Release v2021.07.13-0

Released on July 13, 2021

### New Features
- Preflight results will now be stored on the host in the directory /var/lib/kurl/host-preflights.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.47.0.

### Improvements
- When downloading a bundle from the kURL server, the bundle creation process will fail early in the situation where one of the layers is unavailable, instead of returning a partial bundle.
- Added better messaging to the user when the kurlnet-client pod fails.

## Release v2021.07.09-0

Released on July 9, 2021

### New Features
- All add-ons with versions that conform to semver now support the notation `Major.Minor.x`. When specified using this notation, the version will resolve to the greatest patch version for the specified major and minor version.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.48.1-16.12.1.
- Added Sonobuoy add-on version 0.52.0.

### Bug Fixes
- The [reset task](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node) will now properly remove Kubernetes host packages.

## Release v2021.07.02-0

Released on July 2, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.46.0.

### Bug Fixes
- Fixed CVE-2021-20288 Rook 1.5.11 and 1.0.4-14.2.21.

## Release v2021.06.30-1

Released on June 30, 2021

### Bug Fixes

- Fixed an issue which caused newer versions of kURL to have outdated scripts. This issue affects kURL versions v2021.06.24-0, v2021.06.24-1, v2021.06.25-0, and v2021.06.30-0.

## Release v2021.06.30-0

Released on June 30, 2021

### New Features
- Added the ability to configure the Kubernetes service type used by the [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) to expose Prometheus, Grafana and Alertmanager. The currently accepted options are "NodePort" as the default, and "ClusterIP".
- [Migrations](https://kurl.sh/docs/install-with-kurl/migrating) are a supported way to change CSI, CRI, and CNI providers.

### Bug Fixes
- Fixed an issue that would cause Kubernetes upgrades to fail when the hostname of a node contains uppercase characters.
- Fixed an issue that prevented containerd from trusting the registry certificate except on the first primary.

## Release v2021.06.25-0

Released on June 25, 2021

### New Features
- Added support for Kubernetes versions 1.21.2, 1.20.8, 1.19.12 and 1.18.20.
- Added [KOTS](https://kurl.sh/docs/add-ons/kotsadm) add-on version 1.45.0.
- Added [Containerd](https://kurl.sh/docs/add-ons/containerd) add-on version 1.4.6.
- Added [Contour](https://kurl.sh/docs/add-ons/contour) add-on version 1.16.0.
- Added [EKCO](https://kurl.sh/docs/add-ons/ekco) add-on version 0.10.3.
- Added [Rook](https://kurl.sh/docs/add-ons/rook) add-on version 1.5.12.
- Added [Velero](https://kurl.sh/docs/add-ons/velero) add-on version 1.6.1.
- Added [Antrea](https://kurl.sh/docs/add-ons/antrea) add-on version 1.1.0.

### Bug Fixes
- Fixed an issue that would cause an upgrade of Prometheus from version 0.44.1 to any later version to cause the Contour Pods to crash.
- Fixed an issue in earlier versions of the Prometheus add-on which prevented the Grafana Dashboard from connecting to the Prometheus data store.
- Fixed an issue that could cause a kURL upgrade to fail if new add-ons had been added to kURL (even if they were not used in that installer).

## Release v2021.06.24-1

Released on June 24, 2021

### Bug Fixes
- Fixed a bug in which the [Rook](https://kurl.sh/docs/add-ons/rook) add-on (version 1.0.4-14.2.21) was referencing the incorrect ceph image.

## Release v2021.06.24-0

Released on June 24, 2021

### New Features
- The [Goldpinger](https://kurl.sh/docs/add-ons/goldpinger) add-on has been added to monitor network connectivity.

### Improvements
- Host packages installed on CentOS, RHEL and Oracle Linux will now be installed using yum rather than rpm and no longer force overwrite previously installed versions.
- The Prometheus add-on (Version 0.48.1-16.10.0+) will now pass the flag [--storage.tsdb.retention.size=9GB](https://prometheus.io/docs/prometheus/latest/storage/#operational-aspects) to avoid filling the PVC completely.

### Bug Fixes
- Fixed a bug with the `kurl-registry-ip` flag that caused errors when restoring airgap clusters while using the Containerd add-on.

## Release v2021.06.22-0

Released on June 22, 2021

### Bug Fixes
- Fixed an issue that caused Rook-Ceph to have insecure connection claims. See [CVE-2021-20288](https://docs.ceph.com/en/latest/security/CVE-2021-20288/) for details.
- A new [Rook](https://kurl.sh/docs/add-ons/rook) add-on version 1.0.4-14.2.21 has been added with an upgraded Ceph version 14.2.21.

## Release v2021.06.17-0

Released on June 17, 2021

### New Features
- Added support for RHEL 8.4 and CentOS 8.4.

### Improvements
- Added support for [versioned kurl installers](https://kurl.sh/docs/install-with-kurl/#versioned-releases) to the installation spec validator (if an add-on version was not present in the version of kurl specified, an error will be returned).

## Release v2021.06.15-0

Released on June 15, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.44.1.
- Added a new field, kurl.InstallerVersion, that allows [pinning the kURL installer version](https://kurl.sh/docs/install-with-kurl/#versioned-releases).

### Improvements
- Containerd configuration will be regenerated when rerunning the installer. New settings have been added to the [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) to allow you to preserve the existing config or to add additional fields.

## Release v2021.06.11-0

Released on June 11, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.44.0.

## Release v2021.06.08-0

Released on June 8, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.43.2.

## Release v2021.06.07-0

Released on June 7, 2021

### Improvements
-Added HTTPS proxy configuration to KOTS (>= v1.43.1).

## Release v2021.06.04-0

Released on June 4, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.43.1.
- Added [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) version 0.10.2 with support for Longhorn PVCs in the node shutdown script.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.48.0-16.1.2.

### Improvements
- Added HTTPS proxy configuration to Velero.
- Installing the Docker add-on will no longer install additional recommended packages on Ubuntu.
- Added a preinstallation check to the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) that validates that nodes support bidirectional mount propagation.
- The replicated/kurl-util image now includes the Linux command line utilities curl, ipvsadm, netcat, openssl, strace, sysstat, tcpdump and telnet for debugging purposes.

## Release v2021.05.28-01

Released on May 28, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.43.0.

### Improvements
- A host preflight check for the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) will ensure sufficient disk space is available in /var/lib/longhorn.
- A priority class is now set on the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) to delay its eviction.

## Release v2021.05.28-0

Released on May 28, 2021

### Improvements
- The [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) will include a ServiceMonitor for Longhorn when the [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) is installed.
- The [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) will no longer hardcode `storageClassName: default` for better compatibility with PVC Provisioner add-ons.

### Bug Fixes
- Fixed an issue that caused the [Versioned](https://kurl.sh/docs/install-with-kurl/#versioned-releases) airgap installer to download incomplete packages for previous versions.

## Release v2021.05.26-2

Released on May 26, 2021

### Bug Fixes
- Fixed an issue that caused installations on Oracle Linux 8.4 to fail.

## Release v2021.05.26-1

Released on May 26, 2021

### Bug Fixes
- Fixed release generator.

## Release v2021.05.26-0

Released on May 26, 2021

### New Features
- Added Kubernetes versions 1.21.1, 1.20.7, 1.19.11 and 1.18.19.
- Added [Rook add-on](https://kurl.sh/docs/add-ons/rook) version 1.5.11.
- Added [Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) version 0.47.1-16.0.1.

### Improvements
- The [Containerd add-on](https://kurl.sh/docs/add-ons/containerd) will now be upgraded to conform to the latest kURL spec installed.
- The version of runC included with Docker and Containerd has been upgraded to [v1.0.0-rc95](https://github.com/opencontainers/runc/releases/tag/v1.0.0-rc95).

### Bug Fixes
- Fixed an issue that caused the Grafana dashboard to fail to show graphs due to a misconfigured Prometheus service URL.


## Release v2021.05.24-0

Released on May 24, 2021

### New Features
- Added the ability to configure proxies for Velero backups.
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.42.1.

## Release v2021.05.21-1

Released on May 21, 2021

### Improvements
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.42.0.

## Release v2021.05.21-0

Released on May 21, 2021

### Improvements
- The [longhorn](https://kurl.sh/docs/add-ons/longhorn) data directory permissions are now restricted to the root user.

### Bug Fixes
- Fixed an issue that prevented Rook 1.4.9+ from installing on Kubernetes 1.21.

## Release v2021.05.17-0

Released on May 17, 2021

### Improvements
- The following improvements have been made to prompts requiring user feedback:
  - For interactive terminal sessions, all prompts will no longer timeout.
  - For non-interactive terminal sessions, all prompts that require user input will now fail.
  - For non-interactive terminal sessions, confirmation prompts will now automatically confirm or deny based on the default.
  - Preflight failures and warnings will no longer prompt to confirm or deny, and instead will continue.
  - Properties [`spec.kurl.ignoreRemoteLoadImagesPrompt`](https://kurl.sh/docs/install-with-kurl/advanced-options) and [`spec.kurl.ignoreRemoteUpgradePrompt`](https://staging.kurl.sh/docs/install-with-kurl/advanced-options) have been added to the `kurl.sh/v1beta1.Installer` spec to bypass prompts for automation purposes.

### Bug Fixes
- Fixed an issue that could cause the node ready check to falsely report as successful causing unforseen issues with an installation.

## Release v2021.05.14-1

Released on May 14, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.41.1.

## Release v2021.05.14-0

Released on May 14, 2021

### New Features
- Kurl clusters can be configured to use [dedicated primary nodes](https://kurl.sh/docs/install-with-kurl/dedicated-primary) reserved for control-plane components.
- Added [Antrea add-on](https://kurl.sh/docs/add-ons/antrea) version 1.0.1.
- Added [Contour add-on](https://kurl.sh/docs/add-ons/contour) version 1.15.1.

### Improvements
- RPM install command will now suppress signature verification errors.

## Release v2021.05.07-1

Released on May 7, 2021

### New Features
- Added [KOTS add-on](https://kurl.sh/docs/add-ons/kotsadm) version 1.41.0.

### Improvements
- Allow the `WEAVE_TAG` environment variable to be specified to pin the Weave version when running the [reset task](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node).

### Bug Fixes
- Fixed Weave iptables reset when running the [reset task](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node).
- Added the ability to specicify a [release version](https://kurl.sh/docs/install-with-kurl/#versioned-releases) when running the kURL installer.
- Added [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) version 1.1.1.

## Release v2021.05.07-0

Released on May 7, 2021

### New Features
- Added the ability to specify a [release version](https://kurl.sh/docs/install-with-kurl/#versioned-releases) when running the kURL installer.
- Added [Longhorn add-on](https://kurl.sh/docs/add-ons/longhorn) version 1.1.1.

### Bug Fixes
- Fixed an issue with the [EKCO add-on](https://kurl.sh/docs/add-ons/ekco) that would cause a node to hang on shutdown if there were any unmounted rbd devices.
