# velero configure-aws-s3

Configures snapshots to use an AWS S3 Bucket as a storage destination.
This command supports auth via [IAM User Access Keys](https://github.com/vmware-tanzu/velero-plugin-for-aws#option-1-set-permissions-with-an-iam-user) and IAM Instance Roles for the velero-plugin-for-aws.

Valid Subcommands:
* `access-key`
* `instance-role`

### Usage

```bash
kubectl kots velero configure-aws-s3 [subcommand]
```

| Flag         | Type | Description              |
|--------------|------|--------------------------|
| `-h, --help` |      | help for configure-aws-s3 |

### access-key

```bash
kubectl kots velero configure-aws-s3 access-key [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                   | Type   | Description                                                                   |
|------------------------|--------|-------------------------------------------------------------------------------|
| `-h, --help`           |        | help for access-key                                                           |
| `-n, --namespace`      | string | the namespace of the admin console _(required)_                               |
| `--access-key-id`      | string | the aws access key id to use for accessing the bucket _(required)_            |
| `--bucket`             | string | name of the object storage bucket where backups should be stored _(required)_ |
| `--path `              | string | path to a subdirectory in the object store bucket                             |
| `--region `            | string | the region where the bucket exists _(required)_                               |
| `--secret-access-key ` | string | the aws secret access key to use for accessing the bucket _(required)_        |
| `--skip-validation`    | bool   | skip the validation of the S3 Bucket _(default `false`)_                      |

#### Example

```bash
kubectl kots velero configure-aws-s3 access-key --namespace default --region us-east-1 --bucket kots-snaps --access-key-id XXXXXXXJTJB7M2XZUV7D --secret-access-key <secret access key here>
```

### instance-role

```bash
kubectl kots velero configure-aws-s3 instance-role [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                   | Type   | Description                                                                   |
|------------------------|--------|-------------------------------------------------------------------------------|
| `-h, --help`           |        | help for access-key                                                           |
| `-n, --namespace`      | string | the namespace of the admin console _(required)_                               |
| `--bucket`             | string | name of the object storage bucket where backups should be stored _(required)_ |
| `--path `              | string | path to a subdirectory in the object store bucket                             |
| `--region `            | string | the region where the bucket exists _(required)_                               |
| `--skip-validation`    | bool   | skip the validation of the S3 Bucket _(default `false`)_                      |

#### Example

```bash
kubectl kots velero configure-aws-s3 instance-role --namespace default --region us-east-1 --bucket kots-snaps
```
