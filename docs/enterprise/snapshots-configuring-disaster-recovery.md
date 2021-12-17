# Configuring disaster recovery

In order to setup disaster recovery snapshots, backups should be configured to use a store that exists outside of the cluster.
This is especially true for [embedded kURL installs](/kotsadm/installing/installing-embedded-cluster/).

## Existing Cluster Restore

1. Begin with installing a version of Velero compatible with the one that was used to make the snapshot.
    1. If restoring from an [NFS](/kotsadm/snapshots/storage-destinations/#network-file-system-nfs) or a [Host Path](/kotsadm/snapshots/storage-destinations/#host-path) storage destination, please refer to the [Configuring NFS](/kotsadm/snapshots/configuring-nfs/) or [Configuring a Host Path](/kotsadm/snapshots/configuring-hostpath/) documentation for the configuration steps and how to set up Velero.
    1. Otherwise, please refer to Velero documention for [installing](https://velero.io/docs/v1.5/basic-install/) and [configuring](https://velero.io/plugins/) the plugins.
    1. **Note** that Restic is required and `--restic` flag must be used with `velero install` command.
1. Use the KOTS CLI to [list backups](/kots-cli/backup/ls/) and [create restores](/kots-cli/restore/).

## Online Embedded Cluster Restore

1. Setup the [embedded cluster](/kotsadm/installing/installing-embedded-cluster/#online-installations),
1. Use the KOTS CLI to configure the pre-installed velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * [AWS S3 Configuration](/kots-cli/velero/configure-aws-s3/)
    * [Azure Configuration](/kots-cli/velero/configure-azure/)
    * [GCP Configuration](/kots-cli/velero/configure-gcp/)
    * [S3-Other Coniguration (e.g. Minio)](/kots-cli/velero/configure-other-s3/)
    * [NFS Configuration](/kotsadm/snapshots/configuring-nfs/)
    * [HostPath Configuration](/kotsadm/snapshots/configuring-hostpath/)
1. Use the KOTS CLI to [list backups](/kots-cli/backup/ls/) and [create restores](/kots-cli/restore/).

## Airgapped Embedded Cluster Restore

An airgapped embedded kURL cluster can be restored only if the store backend used for backups is accessible from the new cluster.
kURL installer must also be able to assign the same IP address to the embedded private image registry in the new cluster.
kURL installer must be provided with the correct registry IP address:

```bash
cat install.sh | sudo bash -s airgap kurl-registry-ip=<ip>
```

Please note that the registry from the old cluster does not need to be (and should not be) accessible.

1. Setup the cluster in accordance with the above guidance and [airgap cluster install documentation](/kotsadm/installing/installing-embedded-cluster/#airgapped-installations)
1. Use the KOTS CLI to configure the pre-installed velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * [AWS S3 Configuration](/kots-cli/velero/configure-aws-s3/)
    * [Azure Configuration](/kots-cli/velero/configure-azure/)
    * [GCP Configuration](/kots-cli/velero/configure-gcp/)
    * [S3-Other Coniguration (e.g. Minio)](/kots-cli/velero/configure-other-s3/)
    * [NFS Configuration](/kotsadm/snapshots/configuring-nfs/)
    * [HostPath Configuration](/kotsadm/snapshots/configuring-hostpath/)
1. Use the KOTS CLI to [list backups](/kots-cli/backup/ls/) and [create restores](/kots-cli/restore/).
