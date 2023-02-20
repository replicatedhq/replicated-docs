# velero configure-internal

**NOTE**: The following command is only applicable to embedded kURL kubernetes clusters and NOT recommended for production usage.
Please consider setting up one of the other [available storage destinations](../enterprise/snapshots-storage-destinations).

Configures snapshots to use the internal object store on embedded clusters as a storage destination.

### Usage

```bash
kubectl kots velero configure-internal [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                   | Type   | Description                                                                   |
|------------------------|--------|-------------------------------------------------------------------------------|
| `-h, --help`           |        | help for access-key                                                           |
| `--skip-validation`    | bool   | skip the validation of the S3 Bucket _(default `false`)_                      |

#### Example

```bash
kubectl kots velero configure-internal
```
