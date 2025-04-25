# Exclude MinIO from Air Gap Bundles (Beta)

The Replicated KOTS Admin Console requires an S3-compatible object store to store application archives and support bundles. By default, KOTS deploys MinIO to satisfy the object storage requirement. For more information about the options for installing without MinIO in existing clusters, see [Installing KOTS in Existing Clusters Without Object Storage](/enterprise/installing-stateful-component-requirements).

As a software vendor, you can exclude MinIO images from all Admin Console air gap distributions (`kotsadm.tar.gz`) in the download portal. Excluding MinIO from the `kotsadm.tar.gz` air gap bundle is useful if you want to prevent MinIO images from appearing in the air gap distribution that your end users download. It also reduces the file size of `kotsadm.tar.gz`.

:::note
You can still retrieve a bundle with MinIO images from the KOTS release page in GitHub when this feature is enabled. See [replicatedhq/kots](https://github.com/replicatedhq/kots/releases/) in GitHub.
:::

To exclude MinIO from the `kotsadm.tar.gz` Admin Console air gap bundle:

1. Log in to your Vendor Portal account. Select **Support** > **Request a feature**, and submit a feature request for "Exclude MinIO image from air gap bundle". After this feature is enabled, all `kotsadm.tar.gz` files in the download portal will not include MinIO.

1. Instruct your end users to set the flag `--with-minio=false` with the `kots install` command during an air gap installation. For more information about setting this runtime flag, see [Installing KOTS in Existing Clusters Without Object Storage](/enterprise/installing-stateful-component-requirements).

  :::important
  If you have this feature enabled in your Team account and the end user does not include `--with-minio=false` with the `kots install` command, then the installation fails.
  :::