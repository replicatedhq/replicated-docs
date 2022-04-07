# Offsite Data Backup Add-on

Replicated stores customer data in multiple databases across Amazon Web
Services (AWS) S3 buckets. Clustering and network redundancies help to avoid a
single point of failure.

For additional data redundancy, you can request the offsite data backup add-on,
which copies data to a Google Cloud Provider (GCP) storage location. This
add-on helps to avoid any data loss caused by an outage to AWS.

:::note
The offsite data backup add-on has limited availability. To request offsite data
backup, contact [INSERT CONTACT].
:::

## Overview

When the offsite data backup add-on is enabled, data is migrated to an
enterprise AWS S3 bucket that is backed up to an offsite storage location in GCP.
After data is migrated from an existing S3 bucket to the enterprise S3 bucket,
all data is deleted from the previous S3 bucket.

To ensure customer data in the offsite GCP storage remains up-to-date, the GCP
account uses the Google Storage Transfer service to sync at least daily with the
enterprise S3 bucket.

The offsite GCP backup functions only as a data storage location and does not
serve customer data. In the case of an AWS outage, Replicated can use a manual
process to restore customer data from the backup into a production-grade database.

## Architecture

The following diagram shows the flow of air gap build data and registry image data
when the offsite data backup add-on is enabled. The flow of data that is backed
up offsite is depicted with green arrows.

![architecture of offsite data storage with the offsite data backup add-on](../../static/images/offsite-backup.png)

[View a larger version of this image](../../static/images/offsite-backup.png)

As shown in the diagram above, when the offsite data backup add-on is enabled,
registry and air gap data are stored in separate enterprise S3 buckets. Both of
these enterprise S3 buckets back up data to offsite storage in GCP.

The diagram also shows how customer installations continue to pull data from the
vendor registry and the customer portal when offsite data backup is enabled. The
offsite storage does not serve data to customers.


## Disabling Offsite Data Backup

Disabling offsite data backup requires a manual process by Replicated to migrate
data out of the enterprise S3 bucket that is backed up to GCP.

To disable offsite data backup, contact [INSERT CONTACT].
