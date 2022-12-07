# About Selecting Storage Add-ons

This topic provides guidance for selecting which storage add-ons to include in your Kubernetes installer specification.

## Overview of Storage Add-ons

When you create a Kubernetes installer, you use add-ons from the kURL open source project to define characteristics of the cluster deployed by the Kubernetes installer. Data storage and data redundancy in the Kubernetes installer cluster are defined by

You select storage add-ons for your Kubernetes installer based on the requirements for the Replicated admin console as well as the unique requirements for your application.

kURL includes the following add-ons to provide object storage in the cluster:
* **MinIO**: By default, the Replicated admin console uses MinIO for object storage. For more information, see [MinIO High Performance Object Storage](https://min.io/docs/minio/kubernetes/upstream/) in the MinIO documentation.
* **Rook Ceph**: For more information, see [Getting Started](https://rook.io/docs/rook/v1.10/Getting-Started/intro/) in the Rook Ceph documentation.

kURL includes the following add-ons for PersistentVolumeClaim (PVC) provisioners:
* **OpenEBS Local PV**: For more information, see [OpenEBS Local PV](https://openebs.io/docs/concepts/localpv) in the OpenEBS documentation.
* **Longhorn**:

## Single Node Clusters

If your application does not require multiple nodes in the cluster where it is deployed, Replicated recommends that you use OpenEBS Local PV for dynamic provisioning of PersistentVolumes.

To use OpenEBS Local PV, add the OpenEBS add-on v3.3.x to your installer. The following is an example of :

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

For more information about configuring the OpenEBS add-on, see [OpenEBS Add-on](https://kurl.sh/docs/add-ons/openebs) in the open source kURL documentation.

## Multi-Node Clusters

If your application must be deployed to a cluster with three or more nodes, Replicated recommends that you use one of the following for storage in the cluster:

* **OpenEBS Local PV with MinIO**:
* **Rook Ceph**:

For more information about the benefits and limitations of OpenEBS Local PV and Rook, see [Choosing a PV Provisioner](https://kurl.sh/docs/create-installer/choosing-a-pv-provisioner) in the kURL open source documentation.

### OpenEBS Local PV with MinIO {#openebs-minio}

Multi-node Kubernetes installer clusters can use OpenEBS local PV, because data will be replicated across all three replicas of rqlite, allowing the app manager to run on any node in the cluster without requiring distributed storage like Rook provides.

When you use OpenEBS Local PV for local storage, the app manager v1.89 and later uses a rqlite PersistentVolume to store the version history, application metadata and other small amounts of data needed to manage the application. Rqlite is a lightweight, distributed relational database that uses SQLite as its storage engine.

In a Kubernetes installer cluster with three nodes, rqlite automatically creates three replicas of the data, storing one replica on each node. In this way, rqlite automatically provides data redundancy for high availability in a multi-node cluster.

#### Requirements

To use OpenEBS Local PV as the PVC provisioner for multi-node Kubernetes installer clusters, your Kubernetes installer specification must meet the following requirements:

* The KOTS add-on in your Kubernetes installer specification must use the app manager v1.89 or later.

   In versions of the app manager earlier than 1.89, the admin console stores data in Postgres and requires distributed storage to support data redundancy across nodes in a multi-node cluster. If the KOTS add-on in your installer uses the app manager v1.88 or earlier, Replicated recommends that you use Rook Ceph to meet this distributed storage requirement for multi-node clusters. See [Rook Ceph](#rook-ceph) below.

* You must include the MinIO add-on. MinIO is required for multi-node clusters that use OpenEBS Local PV to meet the admin console requirement for an S3-compatible object store.

#### OpenEBS and MinIO Add-ons Example

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

If your application requires distributed storage, Replicated recommends that you use Rook Ceph as the object store in your Kubernetes installer specification to support multi-node clusters. ​​Rook provides dynamic PV provisioning of distributed Ceph storage.

In addition to providing block storage, Rook provides S3 compatible object storage.

#### Requirements

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
