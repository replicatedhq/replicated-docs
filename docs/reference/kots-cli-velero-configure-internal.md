# velero configure-internal

:::important
The following command is applicable only to embedded clusters created by Replicated kURL and is _not_ recommended for production usage.
Consider configuring one of the other available storage destinations. See [Configuring Other Storage Destinations](/enterprise/snapshots-storage-destinations).
:::

Configures snapshots to use the internal object store in embedded clusters as a storage destination.

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
