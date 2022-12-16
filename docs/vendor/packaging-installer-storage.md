# About Selecting Storage Add-ons

This topic provides guidance for selecting the add-ons to include in your Kubernetes installer specification to provide highly available data storage in Kubernetes installer clusters.

## Overview of Storage Add-ons

The kURL open source project includes add-ons for object storage and for dynamic provisioning of PersistentVolumes (PVs) in the cluster. You configure these add-ons in your Kubernetes installer specification to define how data for your application and data for the Replicated app manager is managed in the cluster.

The object store or PV provisioner add-ons that you choose to include in your Kubernetes installer depend on the requirements for the version of the app manager installed in the cluster as well as the unique requirements for your application. For example, you might include different add-ons depending on if your application requires a single or multi-node cluster, or if your application requires distributed storage.

For more information about the storage add-ons that Replicated recommends for single node and multi-node clusters, see the sections below:
* [OpenEBS Local PV for Single Node Clusters](#single-node)
* [Multi-Node Clusters](#multi-node)

The following table describes the kURL add-ons for data storage, including if the add-on provides PV provisioning or object storage:

<table>
  <tr>
    <th width="10%">Add-on</th>
    <th width="50%">Description</th>
    <th width="20%">PV Provisioner?</th>
    <th width="20%">Object Store?</th>
  </tr>
  <tr>
    <td>MinIO</td>
    <td>
      <p>MinIO is an open source, S3-compatible object store. By default, the app manager uses MinIO for object storage.</p>
      <p>See <a href="https://kurl.sh/docs/add-ons/minio">MinIO Add-on</a> in the kURL documentation.</p>
    </td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Rook</td>
    <td>
      <p>Rook provides dynamic PV provisioning of distributed Ceph storage. Ceph is a distributed storage system that provides S3-compatible object storage.</p>
      <p> See <a href="https://kurl.sh/docs/add-ons/rook">Rook Add-on</a> in the kURL documentation.</p>
    </td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>OpenEBS</td>
    <td>
      <p>OpenEBS Local PV creates a StorageClass to dynamically provision local PersistentVolumes (PVs) in a cluster.</p><p>See <a href="https://kurl.sh/docs/add-ons/openebs">OpenEBS Add-on</a> in the kURL documentation.</p>
    </td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Longhorn</td>
    <td><p>The Longhorn add-on is deprecated and not recommended for production Kubernetes installer clusters.</p><p>Longhorn is an open source distributed block storage system for Kubernetes.</p>
    <p>See <a href="https://kurl.sh/docs/add-ons/longhorn">Longhorn Add-on</a> in the kURL documentation.</p></td>
    <td>Yes</td>
    <td>No</td>
  </tr>
</table>

## OpenEBS Local PV for Single Node Clusters {#single-node}

If your application does not require three or more nodes in the cluster where it is deployed, Replicated recommends that you use OpenEBS Local PV to provide local storage on the single node in the cluster.

If you use OpenEBS Local PV for single node clusters, you can optionally exclude the MinIO add-on. Excluding the MinIO add-on disables S3-object storage for the app manager. If you use only the OpenEBS add-on and exclude the MinIO add-on, then you must set the `disableS3` field to `true` in the KOTS add-on. For more information, see [Effects of the disableS3 Flag](https://kurl.sh/docs/add-ons/kotsadm#effects-of-the-disables3-flag) in _KOTS Add-on_ in the kURL documentation.

When both the MinIO and OpenEBS add-ons are included in the Kubernetes installer, the app manager stores support bundle and application archives in MinIO object storage.

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

If your application must be deployed to a cluster with three or more nodes, Replicated recommends that you use one of the following configurations for highly available data storage in the cluster:

* [OpenEBS Local PV with MinIO](#openebs-minio)
* [Rook Ceph](#rook-ceph)

For more information about the benefits and limitations of both OpenEBS Local PV and Rook, see [Choosing a PV Provisioner](https://kurl.sh/docs/create-installer/choosing-a-pv-provisioner) in the kURL open source documentation.

### OpenEBS Local PV with MinIO {#openebs-minio}

Using OpenEBS Local PV with MinIO provides a highly available data storage solution for multi-node clusters that is lighter-weight compared to using Rook Ceph. Replicated recommends that you use OpenEBS Local PV with MinIO for multi-node clusters if your application does _not_ require distributed storage. If you require distributed storage, see [Rook Ceph](#rook-ceph) below.

The app manager stores version history, application metadata, and other small amounts of data needed to manage the application on a PV that is provisioned for rqlite. Rqlite is a distributed relational database that uses SQLite as its storage engine. For more information, see the [rqlite](https://github.com/rqlite/rqlite) repository in GitHub. To ensure this local PV data is highly availabile in multi-node clusters, rqlite distributes the data across each node.

In addition to the version history, application metadata, and other data for managing the application mentioned above, the app manager also stores support bundle and application archive data in the Kubernetes installer cluster. For multi-node clusters that use OpenEBS Local PV, MinIO is also required to provide object storage for support bundle and application archive data that can be distributed across each node in the cluster. The kURL ECKO add-on provides an operator that manages data in the MinIO deployment to ensure that the data is properly distributed and has high availability. For more information, see [MinIO](https://kurl.sh/docs/add-ons/ekco#minio) in _ECKO Add-on_ in the open source kURL documentation.

With both OpenEBS Local PV and MinIO in the Kubernetes installer cluster, the app manager uses OpenEBS Local PV to provision the PVs on each node that MinIO uses for local storage. Without MinIO, the app manager stores support bundle and application archive data locally in a PV on a single node in the cluster, which can cause loss of data if the node is unavailable.

#### Requirements

To use the OpenEBS add-on for multi-node Kubernetes installer clusters, your Kubernetes installer specification must meet the following requirements:

* The KOTS add-on in your Kubernetes installer specification must use the app manager v1.89 or later.  

   The app manager v1.88 and earlier requires distributed storage, which is not provided by OpenEBS Local PV. To support multi-node clusters, Kubernetes installers that use an app manager version earlier than v1.88 in the KOTS add-on must use the Rook add-on for distributed storage. See [Rook Ceph](#rook-ceph) below.

* You must include the MinIO add-on to ensure that support bundle and application archive data is distributed to each node in the cluster.

* You must include the kURL ECKO add-on to ensure that data in MinIO is distributed to each node in the cluster. See [MinIO](https://kurl.sh/docs/add-ons/ekco#minio) in _ECKO Add-on_ in the open source kURL documentation.

#### OpenEBS and MinIO Add-ons Example

To use OpenEBS Local PV with MinIO in multi-node Kubernetes installer clusters, add the OpenEBS add-on and the MinIO add-on to your installer. The following is an example specification that uses both the OpenEBS add-on version 3.3.x and MinIO add-on version `2022-09-07T22-25-02Z`:

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

If your application requires distributed storage, Replicated recommends that you use the Rook add-on in your Kubernetes installer specification. The Rook add-on creates an S3-compatible, distributed object store with Ceph and also creates a StorageClass for dynamically provisioning PVs.

The app manager stores version history, application metadata, and other small amounts of data needed to manage the application on a PV that is provisioned for rqlite. Rqlite is a distributed relational database that uses SQLite as its storage engine. For more information, see the [rqlite](https://github.com/rqlite/rqlite) repository in GitHub. To ensure this local PV data is highly availabile in multi-node clusters, rqlite distributes the data across each node.

In addition to the version history, application metadata, and other data for managing the application mentioned above, the app manager also stores support bundle and application archive data in the Kubernetes installer cluster. For multi-node Kubernetes installers clusters that use the Rook add-on, the support bundle and application archive data is stored in the Ceph object store.

The kURL ECKO add-on manages data in Ceph to ensure that the data is properly distributed to provide high availability. The ECKO operator also performs several tasks to maintain the health of the Ceph cluster. For more information about how the ECKO add-on manages data in Rook Ceph, see [Rook](https://kurl.sh/docs/add-ons/ekco#rook) in _ECKO add-on_ in the open source kURL documentation.

#### Requirements

To use the Rook add-on for multi-node Kubernetes installer clusters, your Kubernetes installer specification must meet the following requirements:

* In Rook Ceph versions 1.4.3 and later, a dedicated block device attached to each node in the cluster is required.

   For Rook Ceph versions earlier than 1.4.3, a dedicated block device is recommended in production clusters. Running distributed storage such as Rook on block devices is recommended for improved data stability and performance.

* You must include the ECKO add-on to ensure that data in the cluster is highly available. See [Rook](https://kurl.sh/docs/add-ons/ekco#rook) in _ECKO add-on_ in the open source kURL documentation.

#### Rook Add-on Example

To use Rook Ceph for distributed storage, add the Rook add-on to your Kubernetes installer. The following is an example specification that uses the Rook add-on version 1.7.x:

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
