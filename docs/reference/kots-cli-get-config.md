# get config

The `kots get config` command returns the `configValues` file for an application.

### Usage

```bash
kubectl kots get config [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `--appslug`       | string | The application slug of the application for which the `configValues` file is retrieved. Required when more than one application is deployed.|
| `--sequence`      | int    | The application sequence for which the `configValues` file is retrieved. **Default**: latest.|
| `--decrypt`       | bool   | Decrypts password items within the configuration.|
| `-h, --help`      |        | Help for `get config`.|
| `-n, --namespace` | string | (Required) The namespace where the admin console is running.|

### Example

```bash
kubectl kots get config -n default --sequence 5 --appslug myapp
```
