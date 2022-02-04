# velero configure-gcp

Configures snapshots to use a Google Cloud Platform Object Storage Bucket as a storage destination.
This command supports auth via [Serivce Account Credentials](https://github.com/vmware-tanzu/velero-plugin-for-gcp#option-1-set-permissions-with-a-service-account) or [Workload Identity](https://github.com/vmware-tanzu/velero-plugin-for-gcp#option-2-set-permissions-with-using-workload-identity-optional).

Valid Subcommands:
* `service-account`
* `workload-identity`

### Usage

```bash
kubectl kots velero configure-gcp [subcommand]
```

| Flag         | Type | Description              |
|--------------|------|--------------------------|
| `-h, --help` |      | help for configure-aws-s3 |

### service-account

```bash
kubectl kots velero configure-gcp service-account [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                | Type   | Description                                                                   |
|---------------------|--------|-------------------------------------------------------------------------------|
| `-h, --help`        |        | help for access-key                                                           |
| `-n, --namespace`   | string | the namespace of the admin console _(required)_                               |
| `--bucket`          | string | name of the object storage bucket where backups should be stored _(required)_ |
| `--json-file`       | string | path to JSON credntials file for veloro _(required)_                          |
| `--path `           | string | path to a subdirectory in the object store bucket                             |
| `--skip-validation` | bool   | skip the validation of the GCP Bucket _(default `false`)_                     |

#### Example

```bash
kubectl kots velero configure-gcp service-account --namespace default --bucket velero-backups --json-file sa-creds.json
```

### workload-identity

```bash
kubectl kots velero configure-gcp workload-identity [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                | Type   | Description                                                                   |
|---------------------|--------|-------------------------------------------------------------------------------|
| `-h, --help`        |        | help for access-key                                                           |
| `-n, --namespace`   | string | the namespace of the admin console _(required)_                               |
| `--bucket`          | string | name of the object storage bucket where backups should be stored _(required)_ |
| `--path `           | string | path to a subdirectory in the object store bucket                             |
| `--service-account` | string | the service account to use if using Google Cloud instance role _(required)_   |
| `--skip-validation` | bool   | skip the validation of the GCP Bucket _(default `false`)_                     |

#### Example

```bash
kubectl kots velero configure-gcp workload-identity --namespace default --bucket velero-backups --service-account ss-velero@gcp-project.iam.gserviceaccount.com
```
