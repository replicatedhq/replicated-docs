---
toc_max_heading_level: 2
---

# Kubernetes Installer Release Notes

:::note
For release notes earlier than v2022.01.25-0, see
[Release Notes](https://kurl.sh/release-notes) in the open source kURL documentation.
:::

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
- Added [KOTS add-on](/docs/add-ons/kots) version 1.50.2.

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
- Added [KOTS add-on](/docs/add-ons/kotsadm) version 1.48.1.

### Bug Fixes
- Fixed an issue where the kotsadm config would be overriden when updating kURL.
