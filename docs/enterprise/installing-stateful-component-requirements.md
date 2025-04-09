# Install KOTS in Existing Clusters Without Object Storage

This topic describes how to install Replicated KOTS in existing clusters without the default object storage, including limitations of installing without object storage.

## Overview

The Replicated KOTS Admin Console requires persistent storage for state. By default, KOTS deploys an S3-compatible object store to satisfy the Admin Console's persistent storage requirement. The Admin Console stores the following in object storage:
* Support bundles
* Application archives 
* Backups taken with Replicated snapshots that are configured to NFS or host path storage destinations

For more information about the Admin Console's persistent storage requirements, see [Minimum System Requirements](/enterprise/installing-general-requirements#minimum-system-requirements) in _Installation Requirements_.

For existing cluster installations, KOTS deploys MinIO for object storage by default. 

You can optionally install KOTS without object storage. When installed without object storage, KOTS deploys the Admin Console as a Statefulset with an attached PersistentVolume (PV) instead of as a deployment. In this case, support bundles and application archives are stored in the attached PV instead of in object storage. Additionally, for local snapshots storage, KOTS uses the `local-volume-provider` Velero plugin to store backups on local PVs instead of using object storage. The `local-volume-provider` plugin uses the existing Velero service account credentials to mount volumes directly to the Velero node-agent pods. For more information, see [`local-volume-provider`](https://github.com/replicatedhq/local-volume-provider) in GitHub.

## How to Install and Upgrade Without Object Storage

To install KOTS without object storage in an existing cluster, you can use the `--with-minio=false` flag.

#### `kots install --with-minio=false`

When `--with-minio=false` is used with the `kots install` command, KOTS does _not_ deploy MinIO. KOTS deploys the Admin Console as a Statefulset with an attached PV instead of as a deployment. For command usage, see [install](/reference/kots-cli-install/).

#### `kots admin-console upgrade --with-minio=false`

When `--with-minio=false` is used with the `kots admin-console upgrade` command, KOTS upgrades the existing Admin Console instance to the latest version, replaces the running deployment with a StatefulSet, and removes MinIO after a data migration. This results in temporary downtime for the Admin Console, but deployed applications are unaffected. For command usage, see [admin-console upgrade](/reference/kots-cli-admin-console-upgrade/).
