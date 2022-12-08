# About Selecting Storage Add-ons

This topic provides guidance for selecting the add-ons to include in your Kubernetes installer specification to provide data storage and data redundancy in Kubernetes installer clusters.

## Overview of Storage Add-ons

The kURL open source project includes add-ons for object storage and for dynamic provisioning of PersistentVolumeClaims (PVCs) in the cluster. You configure these add-ons in your Kubernetes installer specification to define how data for your application and data for the Replicated admin console is managed in the cluster.

kURL includes the following add-ons that you can use for object storage in the cluster:

* **MinIO Add-on**: MinIO is an open source, S3-compatible object store. By default, the Replicated admin console uses MinIO for object storage. For more information about the MinIO add-on, see [MinIO Add-on](https://kurl.sh/docs/add-ons/minio) in the kURL documentation.

* **Rook Add-on**: Rook provides dynamic PVC provisioning of distributed Ceph storage. Ceph is a distributed storage system that provides S3-compatible object storage. For more information about the Rook add-on, see [Rook](https://kurl.sh/docs/add-ons/rook) in the kURL documentation.

In addition to the Rook add-on listed above, kURL includes the following add-ons for provisioning PVCs in the cluster:

* **OpenEBS Local PV**: OpenEBS Local PV creates a StorageClass to dynamically provision local PersistentVolumes in a cluster. For more information about the OpenEBS add-on, see [OpenEBS Local PV](https://openebs.io/docs/concepts/localpv) in the OpenEBS documentation.

* **Longhorn Add-on**: Longhorn is an open source distributed block storage system for Kubernetes. For more information about the Longhorn add-on, see [Longhorn Add-on](https://kurl.sh/docs/add-ons/longhorn) in the kURL documentation.

  :::note
  The Longhorn add-on is deprecated and not recommended for production Kubernetes installer clusters.
  :::

The object store or PVC provisioner add-ons that you choose to include in your Kubernetes installer depend on the requirements for the specified version of the Replicated admin console as well as the unique requirements for your application. For example, you might include different add-ons depending on if your application requires a single or multi-node cluster, or if your application requires distributed storage.

For more information about the storage add-ons that Replicated recommends for single node and multi-node clusters, see the sections below:
* [OpenEBS Local PV for Single Node Clusters](#single-node)
* [Multi-Node Clusters](#multi-node)

## OpenEBS Local PV for Single Node Clusters {#single-node}

If your application does not require three nodes in the cluster where it is deployed, Replicated recommends that you use OpenEBS Local PV to provide local storage on the single node in the cluster.

If you use OpenEBS Local PV for single node clusters, you can also optionally include the MinIO add-on to provide object storage. When both the MinIO and OpenEBS add-ons are included, the admin console stores support bundle and application archives in MinIO object storage.

To use OpenEBS Local PV in single node Kubernetes installer clusters, add the OpenEBS add-on version 3.3.x to your installer. The following is an example specification that uses the OpenEBS add-on:

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
```

For more information about properties for the OpenEBS add-on, see [OpenEBS Add-on](https://kurl.sh/docs/add-ons/openebs) in the open source kURL documentation.

## Multi-Node Clusters {#multi-node}

If your application must be deployed to a cluster with three or more nodes, Replicated recommends that you use one of the following configurations for data storage and data redundancy in the cluster:

* [OpenEBS Local PV with MinIO](#openebs-minio)
* [Rook Ceph](#rook-ceph)

For more information about the benefits and limitations of both OpenEBS Local PV and Rook, see [Choosing a PV Provisioner](https://kurl.sh/docs/create-installer/choosing-a-pv-provisioner) in the kURL open source documentation.

### OpenEBS Local PV with MinIO {#openebs-minio}

Using OpenEBS Local PV with MinIO provides a data storage and redundancy solution for multi-node clusters that is lighter-weight compared to using Rook Ceph. Replicated recommends that you use OpenEBS Local PV with MinIO for multi-node clusters if your application does _not_ require distributed storage.

When you use OpenEBS for local PV storage in a multi-node cluster, the app manager uses an rqlite PV to store the version history, application metadata, and other small amounts of data needed to manage the application. In multi-node clusters, rqlite automatically creates three replicas of this data, storing one replica on each node.

Rqlite is a lightweight, distributed relational database that uses SQLite as its storage engine. For more information, see the [rqlite](https://github.com/rqlite/rqlite) repository in GitHub.

MinIO is required for multi-node clusters that use OpenEBS Local PV to ensure that support bundle and application archive data is replicated to each node in the cluster. Without MinIO, the admin console stores support bundle and application archive data in local PVs on a single node in the cluster.

#### Requirements

To use OpenEBS Local PV in multi-node Kubernetes installer clusters, your Kubernetes installer specification must meet the following requirements:

* The KOTS add-on in your Kubernetes installer specification must use the app manager v1.89 or later.  

   In versions of the app manager earlier than 1.89, the admin console stores data in Postgres rather than rqlite. Additionally, the app manager v1.88 and earlier requires distributed storage, which is not provided by OpenEBS or MinIO. To support multi-node clusters, Kubernetes installers that use an app manager version earlier than v1.88 in the KOTS add-on must use the Rook add-on for distributed storage. See [Rook Ceph](#rook-ceph) below.

* You must include the MinIO add-on to ensure that support bundle and application archive data is replicated to each node in the cluster.

#### OpenEBS and MinIO Add-ons Example

To use OpenEBS Local PV with MinIO in multi-node Kubernetes installer clusters, add the OpenEBS add-on version 3.3.x and the MinIO add-on version `2022-09-07T22-25-02Z` to your installer. The following is an example specification that uses both the OpenEBS and MinIO add-ons:

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

### Rook Ceph {#rook-ceph}

If your application requires distributed storage, Replicated recommends that you use Rook Ceph as the object store in your Kubernetes installer specification. ​​Rook provides dynamic PVC provisioning of distributed Ceph storage.

If you use Rook for object storage and PVC provisioning, then you are _not_ required to also include the MinIO add-on. This is because Rook satisfies the admin console requirement for object storage and also provides data redundancy in multi-node clusters.

#### Requirement

In Rook versions 1.4.3 and later, a dedicated block device for Rook Ceph is required.

For Rook versions earlier than 1.4.3, a dedicated block device is recommended in production clusters. Running distributed storage such as Rook on block devices is recommended for improved data stability and performance.

#### Rook Add-on Example

To use Rook Ceph for distributed storage

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

For more information about properties for the Rook add-on, see [Rook](https://kurl.sh/docs/add-ons/rook) in the open source kURL documentation.
