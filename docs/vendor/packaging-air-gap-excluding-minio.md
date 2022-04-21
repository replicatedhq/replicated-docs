# Excluding MinIO from an Air Gap Bundle

You can exclude MinIO from air gap packages in the download portal. To activate this feature, it must be turned on in your Replicated account by a Replicated Customer Enablement (CE) member or Team Account Manager (TAM). After this feature is enabled, all air gap packages in the download portal will not include MinIO.

Additionally, you must inform your end users to use the runtime flags for installing the admin console without MinIO for Kubernetes Installer and existing clusters when using these air gap packages. For more information about setting the flags for installing without MinIO, see [Install the Admin Console Without MinIO](https://docs.replicated.com/enterprise/installing-stateful-component-requirements#install-the-admin-console-without-minio) in _Requirements for Admin Console State_.

:::note
Vendors can still retrieve a bundle with MinIO images from the KOTS release page in GitHub when this feature is enabled in the vendor account. For more information about the KOTS release page, see [replicatedhq/kots](https://github.com/replicatedhq/kots/releases/) in GitHub.
:::
