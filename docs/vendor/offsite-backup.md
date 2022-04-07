# Offsite Data Backup Add-on

Replicated stores customer data in multiple databases across several Amazon Web
Services (AWS) S3 buckets. Clustering and network redundancies help to avoid a
single point of failure.

For additional data redundancy, you can request the offsite data backup add-on,
which copies customer data to a Google Cloud Provider (GCP) storage location. This
add-on helps to avoid any data loss caused by an outage to AWS.

:::note
The offsite data backup add-on has limited availability. To request offsite data
backup, contact [INSERT CONTACT].
:::

## Overview of Offsite Data Backup in GCP

When the offsite data backup add-on is enabled, customer data is migrated to an
enterprise AWS S3 bucket that is backed up to a GCP storage location. After data
is migrated from an existing S3 bucket to the enterprise S3 bucket, all data is
deleted from the previous S3 bucket.

To ensure customer data in the GCP storage location remains up-to-date, the GCP
account uses the Google Storage Transfer service to sync at least daily with the
enterprise S3 bucket.

The GCP backup functions only as a data storage location and does not serve customer
data. In the case of an AWS outage, Replicated can use a manual process to restore
customer data from the GCP backup into a production-grade database.

## Disabling Offsite Data Backup

Disabling offsite data backup requires a manual process by Replicated to migrate
data out of the enterprise S3 bucket that is backed up to GCP.

To disable offsite data backup, contact [INSERT CONTACT].
