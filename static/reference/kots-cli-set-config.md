# set config

The `kots set config` allows setting values for application config items in the latest release version.

> Introduced in KOTS v1.31.0

## Usage

```bash
kubectl kots set config [appSlug] [KEY_1=VAL_1 ... KEY_N=VAL_N] [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                | Type   | Description                                                                                                                           |
| :-------------------| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `--config-file`     | string | path to a manifest containing config values (must be `apiVersion: kots.io/v1beta1, kind: ConfigValues`)                               |
| `--merge`           | bool   | when set to true, only keys specified in config file will be updated. This flag can only be used when `--config-file` flag is used.   |
|`--key`              | string | name of a single key to set. This flag requires `--value` or `--value-from-file` flags                                                |
| `--value`           | string | the value to set for the key specified in the `--key` flag. This flag cannot be used with `--value-from-file` flag.                   |
| `--value-from-file` | string | path to the file containing the value to set for the key specified in the `--key` flag. This flag cannot be used with `--value` flag. |
| `--deploy`          | bool   | when set, automatically deploy the latest version with the new configuration                                                          |
| `--skip-preflights` | bool   | set to true to skip preflight checks when deploying new version                                                                       |
| `--current`         | bool   | set to true to use the currently deployed version of the app as the base for the new version                                          |
| `--sequence`        | int    | sequence of the app version to use as the base for the new version (defaults to the latest version unless --current flag is set)      |
| `-n, --namespace`   | string | the namespace where the Admin Console is running _(required)_                                                                         |


#### About Strict Preflight Checks

If any strict preflight checks are configured, the `--skip-preflights` flag are not honored because the preflight checks must run and contain no failures before the application is deployed.

When the `--deploy` option is provided and there are strict preflight checks, the preflight checks always run. The deployment waits for up to 15 minutes for the preflight checks to complete. If the checks complete without strict preflight failures, the release deploys. If the checks do not complete within 15 minutes, the release does not deploy. If there are one or more strict preflight failures, the release does not deploy.

For more information about strict preflight checks, see [Define Preflight Checks](/vendor/preflight-defining).


## Examples

```bash
kubectl kots set config myapp -n default --config-file /path/to/local/config.yaml
```

```bash
kubectl kots set config myapp -n default --key config-item-name --value-from-file /path/to/config/file/value.txt
```

```bash
kubectl kots set config myapp -n default config-item-name="config item value"
```

```bash
kubectl kots set config myapp -n default --key config-item-name --value "config item value"
```