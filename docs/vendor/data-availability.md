# Data availability and continuity

Replicated uses redundancy and a cloud-native architecture in support of availability and continuity of vendor data.

## Data storage architecture

To ensure availability and continuity of necessary vendor data, Replicated uses a cloud-native architecture. This cloud-native architecture includes clustering and network redundancies to eliminate single point of failure.

Replicated stores vendor data in Amazon Web Services (AWS) S3 buckets and in databases managed by Replicated on Latitude.sh infrastructure. Data stored in the AWS S3 buckets includes registry images and air gap build data.

The following diagram shows the flow of air gap build data and registry images from vendors to enterprise customers.

![Architecture diagram of Replicated vendor data storage](/images/data-storage.png)

[View a larger version of this image](/images/data-storage.png)

As shown in the diagram above, vendors push application images to an image registry. Replicated stores this registry image data in AWS S3 buckets, which are logically isolated by vendor portal Team. Instances of the vendor's application that are installed by enterprise customers pull data from the image registry.

For more information about how Replicated secures images pushed to the Replicated registry, see [Replicated Registry Security](packaging-private-registry-security).

The diagram also shows how enterprise customers access air gap build data from the customer download portal. Replicated stores this air gap build data in AWS S3 buckets.

## Data recovery

Replicated automatically takes frequent full database backups and captures binary logs, retaining multiple copies to protect vendor data. When database recovery is required, Replicated personnel initiate and manage the process of restoring a full backup and replaying binary logs.

For more information, see the [Replicated Trust Center](https://trust.replicated.com/).

## Data availability

Replicated availability is continuously monitored. For availability reports, see https://status.replicated.com.

