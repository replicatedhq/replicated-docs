# Excluding MinIO from Air Gap Bundles (Beta)

> Introduced in Replicated app manager v1.69.0

You can exclude MinIO images from all air gap distributions (`kotsadm.tar.gz`) in the download portal for installations on either an existing cluster or a Kubernetes installer-created cluster. This is useful if you want to prevent MinIO images from appearing in the air gap distribution that your end users download. It also reduces the file size of `kotsadm.tar.gz`.

:::note
You can still retrieve a bundle with MinIO images from the KOTS release page in GitHub when this feature is enabled. See [replicatedhq/kots](https://github.com/replicatedhq/kots/releases/) in GitHub.
:::

To enable this feature:

1. Log in to your vendor portal account. Select **Support** > **Request a feature**, and submit a feature request for "Exclude MinIO image from air gap bundle". After this feature is enabled, all `kotsadm.tar.gz` files in the download portal will not include MinIO.

1. Instruct your end users to set the flag `--with-minio=false` with the `kots install` command during an air gap installation. For more information about setting this runtime flag, see [Install the Admin Console Without MinIO](https://docs.replicated.com/enterprise/installing-stateful-component-requirements#install-the-admin-console-without-minio) in _Requirements for Admin Console State_.

  :::important
  If you have this feature enabled in your Team account and the end user does not include `--with-minio=false` with the `kots install` command, then the installation fails.
  :::
