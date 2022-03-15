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
