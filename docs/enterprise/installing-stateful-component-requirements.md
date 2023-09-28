# Installing Without Object Storage

This topic describes how to install Replicated KOTS without the default object storage, including limitations of installing without object storage.

## Overview

By default, KOTS is deployed with an S3-compatible object store. KOTS stores the following in the object store:
* Support bundles
* Application archives 
* Backups taken with the Replicated snapshots feature that are configured to NFS or host path storage destinations

By default, for existing cluster installations, KOTS deploys MinIO for object storage. For embedded cluster installations, the object storage is either MinIO or Rook, depending on how your software vendor configured the kURL installer. 

You can optionally deploy KOTS without object storage. When deployed without object storage, KOTS instead 

## Limitations

The following limitations apply to installing KOTS without object storage:

* You can use snapshots if you configure S3-compatible storage as the storage destination. That can either be Ceph RADOS v12.2.7 or MinIO. It looks like these would be the steps to follow: https://docs.replicated.com/enterprise/snapshots-storage-destinations#configure-s3-compatible-storage-for-online-environments
* You can use snapshots if you configure an NFS server as the storage destination and the NFS PV is exported on the server with RWX access mode.
* You cannot use a host path storage destination for snapshots because host path volumes do not support RWX access mode. (according to https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)
* You can still configure cloud storage destinations like AWS, GCP, and Azure for snapshots as those have nothing to do with whether or not kots was deployed with object storage
* All of these limitations apply whether you have a single or multi node cluster
* All of these limitations are due to the requirements of the local-volume-provisioner Velero plugin, which KOTS uses when deployed without object storage

## Install Without Object Storage

### Embedded Clusters

To install KOTS on an embedded cluster created by kURL without an object store, remove the object storage add-on from the installer and set the `disableS3` flag to `true` in the add-on.

This deploys KOTS without an object store, as well as allows the supporting add-ons to use persistent volumes (PVs) instead of object storage.

For more information about the behavior of the `disableS3` flag, see [KOTS Add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

See [Removing Object Storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage) for documentation on migrating a cluster away from object storage.

### Object Store Requirements for Existing Clusters

When installing KOTS on an existing Kubernetes cluster, KOTS creates the required stateful components using the default StorageClass in the cluster.

The only requirement is that a StorageClass be present.

By default, an installation to an existing cluster will deploy MinIO to satisfy the object storage requirement, and nothing further is required during installation.

When deploying, MinIO is configured with a randomly generated `AccessKeyID` and `SecretAccessKey`, and only exposed as a `ClusterIP` on the overlay network.

#### Install the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots install` command, the installer will not deploy MinIO. KOTS deploys the admin console as a Statefulset with an attached PV instead of a deployment.

For more information, see [install](/reference/kots-cli-install/) in the kots CLI documentation.

#### Upgrade the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots admin-console upgrade` command, KOTS upgrades an existing admin console to the latest version, replaces the running deployment with a StatefulSet, and removes MinIO after a data migration.

This results in temporary downtime for the admin console, but deployed applications will be unaffected.

For more information, see [admin-console upgrade](/reference/kots-cli-admin-console-upgrade/) in the kots CLI documentation.
