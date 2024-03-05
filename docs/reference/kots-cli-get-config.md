# get config

The `kots get config` command returns the `configValues` file for an application.

### Usage

```bash
kubectl kots get config [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `--appslug`       | string | The slug of the target application. Required when more than one application is deployed. Your software vendor provides the application slug. For more information, see <a href="/vendor/vendor-portal-manage-app#slug">Get the Application Slug</a> in <em>Managing Applications</em>.|
| `--current`       | bool   | When set, the `configValues` file for the currently deployed version of the application is retrieved.|
| `--sequence`      | int    | Retrieves the `configValues` file for the specified application sequence. **Default**: Latest (unless the `--current` flag is set).|
| `--decrypt`       | bool   | Decrypts password items within the configuration.|
| `-h, --help`      |        | Help for `get config`.|
| `-n, --namespace` | string | (Required) The namespace where the admin console is running.|

### Example

```bash
kubectl kots get config -n default --sequence 5 --appslug myapp
```
