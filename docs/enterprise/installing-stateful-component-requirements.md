# Installing Without Object Storage

This topic describes how to install Replicated KOTS without the default object storage, including limitations of installing without object storage.

## Overview

The Replicated admin console requires persistent storage for state. By default, KOTS deploys an S3-compatible object store to satisfy the admin console's persistent storage requirement. The admin console stores the following in the object store:
* Support bundles
* Application archives 
* Backups taken with Replicated snapshots that are configured to NFS or host path storage destinations.

For more information about the admin console's persistent storage requirements, see [Minimum System Requirements](/enterprise/installing-general-requirements#minimum-system-requirements) in _Installation Requirements_.

By default, for existing cluster installations, KOTS deploys MinIO for object storage. For embedded cluster installations with Replicated kURL, the object storage provider is either MinIO or Rook, depending on which add-on your software vendor included in the kURL installer specification. 

You can optionally install KOTS without object storage. When installed without object storage, KOTS deploys the admin console as a Statefulset with an attached PersistentVolume (PV) instead of as a deployment. In this case, support bundles and application archives are stored in the attached PV instead of in object storage. Additionally, for local snapshots storage, KOTS uses the `local-volume-provisioner` Velero plugin to store backups on local PVs instead of using object storage. The `local-volume-provisioner` plugin uses the existing Velero service account credentials to mount volumes directly to the Velero node-agent pods. For more information, see [`local-volume-provisioner`](https://github.com/replicatedhq/local-volume-provider) in GitHub. 

## Snapshot Storage Limitations

The `local-volume-provisioner` Velero plugin that KOTS uses for local snapshot storage requires that the PV used for snaphots storage have ReadWriteMany (RWX) access mode. With RMX access mode, the volume can be mounted as read-write by many nodes. For more information about access modes, see [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) in the Kubernetes documentations.

To ensure that the RWX access mode requirement for the `local-volume-provisioner` plugin is met, the following limitations apply to local snapshot storage when KOTS is installed without object storage:

* You cannot configure a host path storage destination because host path volumes do not support RWX access mode.
* To configure an NFS storage destination, the NFS PV must be exported on the server with RWX access mode.
* The cluster distribution must support RWX storage providers. For example, this means that you cannot configure local storage distinations in K3S clusters.

For more information about configuring backup stoage with snapshots, see [About Backup and Restore](/enterprise/snapshots-understanding).

## Install Without Object Storage

This section describes how to install KOTS without object storage in embedded cluster or in existing clusters.

### Embedded Clusters

To install KOTS in an embedded kURL cluster created by kURL without an object store, remove the object storage add-on from the installer and set the `disableS3` flag to `true` in the add-on.

This deploys KOTS without an object store, as well as allows the supporting add-ons to use persistent volumes (PVs) instead of object storage.

For more information about the behavior of the `disableS3` flag, see [KOTS Add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

See [Removing Object Storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage) for documentation on migrating a cluster away from object storage.


When deploying, MinIO is configured with a randomly generated `AccessKeyID` and `SecretAccessKey`, and only exposed as a `ClusterIP` on the overlay network.

#### Install the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots install` command, the installer will not deploy MinIO. KOTS deploys the admin console as a Statefulset with an attached PV instead of a deployment.

For more information, see [install](/reference/kots-cli-install/) in the kots CLI documentation.

#### Upgrade the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots admin-console upgrade` command, KOTS upgrades an existing admin console to the latest version, replaces the running deployment with a StatefulSet, and removes MinIO after a data migration.

This results in temporary downtime for the admin console, but deployed applications will be unaffected.

For more information, see [admin-console upgrade](/reference/kots-cli-admin-console-upgrade/) in the kots CLI documentation.
