# Configuring disaster recovery

In order to setup disaster recovery snapshots, backups should be configured to use a store that exists outside of the cluster.
This is especially true for installations on embedded kURL clusters.

## Existing Cluster Restore

1. Begin with installing a version of Velero compatible with the one that was used to make the snapshot.
    * If restoring from an NFS or a host path storage destination, see [Configuring NFS](snapshots-configuring-nfs) or [Configuring a host path](snapshots-configuring-hostpath) for the configuration steps and how to set up Velero.
    * Otherwise, see [Basic Install](https://velero.io/docs/v1.5/basic-install/) and [Plugins](https://velero.io/plugins/) in the Velero documentation.

    **Note** that Restic is required and `--restic` flag must be used with `velero install` command.

1. Use the KOTS CLI to list backups and create restores. See [kots backup ls](https://kots.io/kots-cli/backup/ls/) and [kots restore](https://kots.io/kots-cli/restore/) in the kots CLI documentation.

## Online Embedded Cluster Restore

1. Set up the embedded cluster. See [Installing on an embedded cluster](installing-embedded-cluster).
1. Use the KOTS CLI to configure the pre-installed velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * **AWS S3 Configuration**: See [kots velero configure-aws-s3](https://kots.io/kots-cli/velero/configure-aws-s3/).
    * **Azure Configuration**: See [kots velero configure-azure](https://kots.io/kots-cli/velero/configure-azure/).
    * **GCP Configuration**: See [kots velero configure-gcp](https://kots.io/kots-cli/velero/configure-gcp/).
    * **S3-Other (e.g. Minio) Configuration**: See [kots velero configure-other-s3](https://kots.io/kots-cli/velero/configure-other-s3/).
    * **NFS Configuration**: See [kots velero configure-nfs](https://kots.io/kots-cli/velero/configure-nfs/) and [Configuring NFS](snapshots-configuring-nfs).
    * **HostPath Configuration**: See [kots velero configure-hostpath](https://kots.io/kots-cli/velero/configure-hostpath/) and [Configuring a host path](snapshots-configuring-hostpath).
1. Use the KOTS CLI to list backups and create restores. See [kots backup ls](https://kots.io/kots-cli/backup/ls/) and [kots restore](https://kots.io/kots-cli/restore/) in the kots CLI documentation.

## Airgapped Embedded Cluster Restore

An airgapped embedded kURL cluster can be restored only if the store backend used for backups is accessible from the new cluster.
kURL installer must also be able to assign the same IP address to the embedded private image registry in the new cluster.
kURL installer must be provided with the correct registry IP address:

```bash
cat install.sh | sudo bash -s airgap kurl-registry-ip=<ip>
```

Please note that the registry from the old cluster does not need to be (and should not be) accessible.

1. Set up the cluster in accordance with the above guidance as well as the guidance in the air gap installation documentation. See [Airgapped Installations](installing-embedded-cluster#airgapped-installations).
1. Use the KOTS CLI to configure the pre-installed velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * **AWS S3 Configuration**: See [kots velero configure-aws-s3](https://kots.io/kots-cli/velero/configure-aws-s3/).
    * **Azure Configuration**: See [kots velero configure-azure](https://kots.io/kots-cli/velero/configure-azure/).
    * **GCP Configuration**: See [kots velero configure-gcp](https://kots.io/kots-cli/velero/configure-gcp/).
    * **S3-Other (e.g. Minio) Configuration**: See [kots velero configure-other-s3](https://kots.io/kots-cli/velero/configure-other-s3/).
    * **NFS Configuration**: See [kots velero configure-nfs](https://kots.io/kots-cli/velero/configure-nfs/) and [Configuring NFS](snapshots-configuring-nfs).
    * **HostPath Configuration**: See [kots velero configure-hostpath](https://kots.io/kots-cli/velero/configure-hostpath/) and [Configuring a host path](snapshots-configuring-hostpath).
1. Use the KOTS CLI to list backups and create restores. See [kots backup ls](https://kots.io/kots-cli/backup/ls/) and [kots restore](https://kots.io/kots-cli/restore/) in the kots CLI documentation.
