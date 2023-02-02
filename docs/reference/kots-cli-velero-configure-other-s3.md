# velero configure-other-s3

Configures snapshots to use an S3-compatible storage provider, such as Minio, as a storage destination.

### Usage

```bash
kubectl kots velero configure-other-s3 [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                   | Type   | Description                                                                                    |
|------------------------|--------|------------------------------------------------------------------------------------------------|
| `-h, --help`           |        | help for access-key                                                                            |
| `-n, --namespace`      | string | the namespace of the admin console _(required)_                                                |
| `--access-key-id`      | string | the aws access key id to use for accessing the bucket _(required)_                             |
| `--bucket`             | string | name of the object storage bucket where backups should be stored _(required)_                  |
| `--endpoint`           | string | the s3 endpoint (e.g. http://some-other-s3-endpoint) _(required)_                              |
| `--path `              | string | path to a subdirectory in the object store bucket                                              |
| `--region `            | string | the region where the bucket exists _(required)_                                                |
| `--secret-access-key ` | string | the aws secret access key to use for accessing the bucket _(required)_                         |
| `--cacert `            | string | file containing a certificate bundle to use when verifying TLS connections to the object store |
| `--skip-validation`    | bool   | skip the validation of the S3 Bucket _(default `false`)_                                       |
| `--kotsadm-namespace`  | string | set to override the namespace of kotsadm images. used for airgapped installations.             |
| `--kotsadm-registry`   | string | set to override the registry of kotsadm images. used for airgapped installations.              |
| `--registry-password`  | string | password to use to authenticate with the provided registry. used for airgapped installations.  |
| `--registry-username`  | string | username to use to authenticate with the provided registry. used for airgapped installations.  |

#### Example

```bash
kubectl kots velero configure-other-s3 --namespace default --endpoint http://minio --region us-east-1 --bucket kots-snaps --access-key-id XXXXXXXJTJB7M2XZUV7D --secret-access-key mysecretkey
```
