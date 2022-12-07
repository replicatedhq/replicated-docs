# Requirements for Admin Console State

The Replicated admin console requires persistent storage for state. The following stateful components are required:

* **rqlite**: The admin console uses a rqlite StatefulSet to store the version history, application metadata and other small amounts of data needed to manage the application(s).

   The Replicated app manager deploys the rqlite component with the admin console and secured with a randomly generated password, and only exposed as a ClusterIP on the overlay network.

* **S3-compatible object store**: The admin console requires an S3-compatible object store to store application archives and support bundles.

   For more information about the S3-compatible object store requirements for both Kubernetes installer-created clusters and existing clusters, see the sections below.

### Object Store Requirements for Kubernetes Installer Clusters

By default, Kubernetes installer clusters must include one of the following add-ons to satisfy the S3-compatible object store requirement for the admin console:
* Rook add-on
* MinIO add-on

Alternatively, the admin console can also be installed without an object store if the `disableS3` flag is set to `true` in the KOTS add-on specification in the Installer.

This deploys the admin console without an object store and allows the supporting add-ons to use persistent volumes (PVs) instead of object storage.

For more information about the behavior of the `disableS3` flag, see [KOTS Add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

For information on migrating a cluster away from object storage, see [Removing Object Storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage).

Kubernetes installer clusters can have optional, indirect dependencies on the S3-compatible object store:

* The Registry add-on is used for air-gapped installations and uses object storage if available. Otherwise it uses the default `StorageClass`.
* The Velero add-on is used for backup and restore with the Replicated snapshots feature. By default, it saves snapshots in the object store. The object store refers to the **Internal Storage** option in the admin console).

### Object Store Requirements for Existing Clusters

When installing the admin console on an existing Kubernetes cluster, the Replicated app manager creates the required stateful components using the default StorageClass in the cluster.

The only requirement is that a StorageClass be present.

By default, an installation to an existing cluster deploys MinIO to satisfy the object storage requirement, and nothing further is required during installation.

When deploying, MinIO is configured with a randomly generated `AccessKeyID` and `SecretAccessKey`, and is only exposed as a `ClusterIP` on the overlay network.

#### Install the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots install` command, the installer will not deploy MinIO. The app manager deploys the admin console as a Statefulset with an attached PV instead of a deployment.

For more information, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

#### Upgrade the Admin Console Without MinIO

When the flag `--with-minio=false` is used with the `kots admin-console upgrade` command,  the app manager upgrades an existing admin console to the latest version, replaces the running deployment with a StatefulSet, and removes MinIO after a data migration.

This results in temporary downtime for the admin console, but deployed applications will be unaffected.

For more information, see [admin-console upgrade](../reference/kots-cli-admin-console-upgrade/) in the kots CLI documentation.
