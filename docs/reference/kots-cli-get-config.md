# get config

The `kots get config` command returns the **configValues** file for an application.

### Usage

```bash
kubectl kots get config [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `--appslug`       | string | The app slug used to retrieve the config for _(required)_                        |
| `--sequence`      | int    | The app sequence used to retrieve the config for _(required)_                    |
| `--decrypt`       | bool   | Decrypt password items within the config                            |
| `-h, --help`      |        | help for get apps                                                   |
| `-n, --namespace` | string | the namespace where the admin console is running _(required)_       |

### Example

```bash
kubectl kots get config -n default --sequence 5 --appslug myapp
```
