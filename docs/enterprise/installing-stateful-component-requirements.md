# Requirements for admin console state

The Replicated admin console requires persistent storage for state. The following stateful components are required:

* **PostgreSQL**: The admin console uses a PostgreSQL StatefulSet to store the version history, application metadata and other small amounts of data needed to manage the application(s).

   The Replicated app manager deploys the PostgreSQL component with the admin console and secured with a randomly generated password, and only exposed as a ClusterIP on the overlay network.

* **S3-compatible object store**: The admin console requires an S3-compatible object store to store application archives and support bundles.

   For more information about the S3-compatible object store requirements for both Kubernetes installer-created clusters and existing clusters, see the sections below.

### Object store requirements for Kubernetes installer-created clusters

By default, installations on cluster created by the Kubernetes installer must include an add-on that satisfies the S3-compatible object store.

This can be either the Rook or MinIO add-on.
Without one of these add-ons, the installer will fail with an error.

Clusters created by the Kubernetes installer can have optional, indirect dependencies on the S3-compatible object store:

* The Registry add-on is used for air-gapped installations and uses object storage if available. Otherwise it uses the default `StorageClass`.
* The Velero add-on is used for backup and restore with the Replicated snapshots feature. By default, it saves snapshots in the object store. The object store refers to the **Internal Storage** option in the admin console).

#### Install the admin console without an object store

To install the admin console on a cluster created by the Kubernetes installer without an object store, remove the object storage add-on from the installer and set the `disableS3` flag to `true` in the add-on.

This deploys the admin console without an object store, as well as allows the supporting add-ons to use persistent volumes (PVs) instead of object storage.

For more information about the behavior of the `disableS3` flag, see [KOTS Add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

See [Removing Object Storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage) for documentation on migrating a cluster away from object storage.

### Object store requirements for existing clusters

When installing the admin console on an existing Kubernetes cluster, the Replicated app manager creates the required stateful components using the default StorageClass in the cluster.

The only requirement is that a StorageClass be present.

By default, an installation to an existing cluster will deploy MinIO to satisfy the object storage requirement, and nothing further is required during installation.

When deploying, MinIO is configured with a randomly generated `AccessKeyID` and `SecretAccessKey`, and only exposed as a `ClusterIP` on the overlay network.

#### Install the admin console without MinIO

When the flag `--with-minio=false` is used with the `kots install` command, the installer will not deploy MinIO. The app manager deploys the admin console as a Statefulset with an attached PV instead of a deployment.

For more information, see [kots install](https://kots.io/kots-cli/install/) in the kots CLI documentation.

#### Upgrade the admin console without MinIO

When the flag `--with-minio=false` is used with the `kots admin-console upgrade` command,  the app manager upgrades an existing admin console to the latest version, replaces the running deployment with a StatefulSet, and removes MinIO after a data migration.

This results in temporary downtime for the admin console, but deployed applications will be unaffected.

For more information, see [kots admin-console upgrade](https://kots.io/kots-cli/admin-console/upgrade/)
