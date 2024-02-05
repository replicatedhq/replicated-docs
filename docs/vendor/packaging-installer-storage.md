# About Selecting Storage Add-ons

This topic provides guidance for selecting the Replicated kURL add-ons to include in your Kubernetes installer specification to provide highly available data storage in embedded clusters. For additional guidance, see [Choosing a PV Provisioner](https://kurl.sh/docs/create-installer/choosing-a-pv-provisioner) in the open source kURL documentation.

## Overview

kURL includes add-ons for object storage and for dynamic provisioning of PersistentVolumes (PVs) in embedded clusters. You configure these add-ons in your Kubernetes installer specification to define how data for your application and data for Replicated KOTS is managed in the cluster.

The following lists the kURL add-ons for data storage:
* **MinIO**: MinIO is an open source, S3-compatible object store. See [MinIO Add-on](https://kurl.sh/docs/add-ons/minio) in the kURL documentation.
* **Rook**: Rook provides dynamic PV provisioning of distributed Ceph storage. Ceph is a distributed storage system that provides S3-compatible object storage. See [Rook Add-on](https://kurl.sh/docs/add-ons/rook) in the kURL documentation.
* **OpenEBS**: OpenEBS Local PV creates a StorageClass to dynamically provision local PersistentVolumes (PVs) in a cluster. See [OpenEBS Add-on](https://kurl.sh/docs/add-ons/openebs) in the kURL documentation.
* **Longhorn**: Longhorn is an open source distributed block storage system for Kubernetes. See [Longhorn Add-on](https://kurl.sh/docs/add-ons/longhorn) in the kURL documentation.

  :::important
  The Longhorn add-on is deprecated and not supported in production embedded clusters. If you are currently using Longhorn, you must migrate data from Longhorn to either OpenEBS or Rook. For more information about migrating from Longhorn, see [Migrating to Change CSI Add-On](https://kurl.sh/docs/install-with-kurl/migrating-csi) in the kURL documentation.
  :::

## About Persistent Storage for KOTS

This section describes the default storage requirements for KOTS. Each of the [Supported Storage Configurations](#supported-storage-configurations) described below satisfy these storage requirements for KOTS.

### rqlite StatefulSet

KOTS deploys a rqlite StatefulSet to store the version history, application metadata and other small amounts of data needed to manage the application(s). No configuration is required to deploy rqlite.

Rqlite is a distributed relational database that uses SQLite as its storage engine. For more information, see the [rqlite](https://rqlite.io/) website.

### Object Storage or Local PV

By default, KOTS requires an S3-compatible object store to store the following:
* Support bundles
* Application archives 
* Backups taken with Replicated snapshots that are configured to NFS or host path storage destinations

Both the Rook add-on and the MinIO add-on satisfy this object store requirement.

Alternatively, you can configure KOTS to be deployed without object storage. This installs KOTS as a StatefulSet using a persistent volume (PV) for storage. When there is no object storage available, KOTS stores support bundles, application archives, and snapshots that have an NFS or host path storage destination in the local PV. In this case, the OpenEBS add-on can be included to provide the local PV storage. For more information, see [Installing Without Object Storage](/enterprise/installing-stateful-component-requirements).

### Distributed Storage in KOTS v1.88 and Earlier

KOTS v1.88 and earlier requires distributed storage. To support multi-node clusters, Kubernetes installer specifications that use a KOTS version earlier than v1.88 in the KOTS add-on must use the Rook add-on for distributed storage. For more information, see [Rook Ceph](#rook-ceph) below.

## Factors to Consider When Choosing a Storage Configuration

The object store and/or PV provisioner add-ons that you choose to include in your Kubernetes installer depend on the following factors:
* **KOTS storage requirements**: The storage requirements for the version of the KOTS add-on that you include in the specification. For example, KOTS v1.88 and earlier requires distributed storage.
* **Other add-on storage requirements**: The storage requirements for the other add-ons that you include in the specification. For example, the Velero add-on requires object storage to deploy the default internal storage for snapshots during installation.
* **Application storage requirements**: The storage requirements for your application. For example, you might include different add-ons depending on if your application requires a single or multi-node cluster, or if your application requires distributed storage.

## Supported Storage Configurations

This section describes the supported storage configurations for embedded clusters provisioned by kURL.

### OpenEBS Without Object Storage (Single Node) {#single-node}

If your application can be deployed to a single node cluster and does not require object storage, then you can choose to exclude object storage and instead use the OpenEBS add-on only to provide local storage on the single node in the cluster.

When configured to use local PV storage instead of object storage, KOTS stores support bundles, application archives, and snapshots that have an NFS or host path storage destination in a PV on the single node in the cluster.

#### Requirements

To use the OpenEBS add-on without object storage, your Kubernetes installer specification must meet the following requirements:

* When neither the MinIO nor the Rook add-on are included in the Kubernetes installer specification, you must set the `disableS3` field to `true` in the KOTS add-on. Setting `disableS3: true` in the KOTS add-on allows KOTS to use the local PV storage provided by OpenEBS instead of using object storage. For more information, see [Effects of the disableS3 Flag](https://kurl.sh/docs/add-ons/kotsadm#effects-of-the-disables3-flag) in _KOTS Add-on_ in the kURL documentation. 

* When neither the MinIO nor the Rook add-on are included in the Kubernetes installer specification, the Velero add-on cannot be included. This is because, during installation, the Velero add-on automatically deploys internal storage for backups taken with the Replicated snapshots feature. The Velero add-on requires object storage to deploy this internal storage. If you include the Velero add-on without either the MinIO add-on or the Rook add-on, installation fails with the following error message: `Only Rook and Longhorn are supported for Velero Internal backup storage`.

  When the Velero add-on is not included, your users must install and configure Velero on the cluster after installation in order to use Replicated snapshots for backup and restore. For more information, see [About Backup and Restore](/enterprise/snapshots-understanding).

  For a storage configuration for single node clusters that supports the use of the Velero add-on, see [OpenEBS with MinIO (Single or Multi-Node)](#openebs-minio) below.

  

#### Example

The following is an example specification that uses OpenEBS v3.3.x with Local PV for local storage and disables object storage for KOTS:

```yaml
apiVersion: "cluster.kurl.sh/v1beta1"
kind: "Installer"
metadata:
  name: "local"
spec:
  ...
  openebs:
    version: "3.3.x"
    isLocalPVEnabled: true
    localPVStorageClassName: "default"
  kotsadm:
    disables3: true  
```

For more information about properties for the OpenEBS add-on, see [OpenEBS](https://kurl.sh/docs/add-ons/openebs) in the kURL documentation.

### OpenEBS with MinIO (Single or Multi-Node) {#openebs-minio}

Using the OpenEBS add-on with the MinIO add-on provides a highly available data storage solution for multi-node clusters that is lighter-weight compared to using Rook Ceph. Replicated recommends that you use OpenEBS Local PV with MinIO for multi-node clusters if your application does _not_ require distributed storage. If your application requires distributed storage, see [Rook Ceph](#rook-ceph) below.

When both the MinIO and OpenEBS add-ons are included, KOTS stores support bundles, application archives, and snapshots that have an NFS or host path storage destination in MinIO object storage. Additionally, KOTS uses OpenEBS Local PV to provision the PVs on each node that MinIO uses for local storage.

#### Requirement

To use both the OpenEBS add-on and the MinIO add-on, the KOTS add-on must use KOTS v1.89 or later.  

KOTS v1.88 and earlier requires distributed storage, which is not provided by OpenEBS Local PV. To support multi-node clusters, Kubernetes installers that use a KOTS version earlier than v1.88 in the KOTS add-on must use the Rook add-on for distributed storage. See [Rook Ceph](#rook-ceph) below.

#### Example

The following is an example specification that uses both the OpenEBS add-on version 3.3.x and MinIO add-on version `2022-09-07T22-25-02Z`:

```yaml
apiVersion: "cluster.kurl.sh/v1beta1"
kind: "Installer"
metadata:
  name: "openebs-with-minio"
spec:
  ...
  openebs:
    version: "3.3.x"
    isLocalPVEnabled: true
    localPVStorageClassName: "default"
  minio:
    version: "2022-09-07T22-25-02Z"
```

For more information about properties for the OpenEBS and MinIO add-ons, see [OpenEBS](https://kurl.sh/docs/add-ons/openebs) and [MinIO](https://kurl.sh/docs/add-ons/minio) in the kURL documentation.

### Rook Ceph (Multi-Node) {#rook-ceph}

If your application requires multiple nodes and distributed storage, Replicated recommends that you use the Rook add-on for storage. The Rook add-on creates an S3-compatible, distributed object store with Ceph and also creates a StorageClass for dynamically provisioning PVs.

#### Requirement

Rook versions 1.4.3 and later require a dedicated block device attached to each node in the cluster. The block device must be unformatted and dedicated for use by Rook only. The device cannot be used for other purposes, such as being part of a Raid configuration. If the device is used for purposes other than Rook, then the installer fails, indicating that it cannot find an available block device for Rook.

For Rook Ceph versions earlier than 1.4.3, a dedicated block device is recommended in production clusters. Running distributed storage such as Rook on block devices is recommended for improved data stability and performance.

#### Example

The following is an example specification that uses the Rook add-on version 1.7.x:

```yaml
apiVersion: "cluster.kurl.sh/v1beta1"
kind: "Installer"
metadata:
  name: "distributed"
spec:
  ...
  rook:
    version: "1.7.x"
    storageClassName: "distributed"
    isSharedFilesystemDisabled: true
```

For more information about properties for the Rook add-on, see [Rook](https://kurl.sh/docs/add-ons/rook) in the kURL documentation.
