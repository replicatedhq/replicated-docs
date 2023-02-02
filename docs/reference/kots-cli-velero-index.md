# velero

The KOTS Velero interface, which configures storage destinations for backups (snapshots), permissions, and print instructions fo set up.

### Usage

```bash
kubectl kots velero [command] [global flags]
```

This command supports all [global flags](kots-cli-global-flags).

The following `kots velero` commands are supported:

- [`configure-aws-s3`](kots-cli-velero-configure-aws-s3): Configures an AWS S3 bucket as the storage destination.
- [`configure-azure`](kots-cli-velero-configure-azure): Configures an Azure Blob Storage Container as the storage destination.
- [`configure-gcp`](kots-cli-velero-configure-gcp): Configures a Google Cloud Platform Object Storage Bucket as The storage destination.
- [`configure-internal`](kots-cli-velero-configure-internal): (Kubernetes installer clusters only) Configures the internal object store in the cluster as the storage destination.
- [`configure-other-s3`](kots-cli-velero-configure-other-s3): Configures an S3-compatible storage provider as the storage destination.
- [`configure-nfs`](kots-cli-velero-configure-nfs): Configures NFS as the storage destination.
- [`configure-hostpath`](kots-cli-velero-configure-hostpath): Configures a host path as the storage destination.
- [`ensure-permissions`](kots-cli-velero-ensure-permissions): Allows the Replicated admin console to access Velero.
