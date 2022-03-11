# set config

The `kots set config` allows setting values for application config items in the latest release version.

> Introduced in KOTS v1.31.0

### Usage

```bash
kubectl kots set config [appSlug] [KEY_1=VAL_1 ... KEY_N=VAL_N] [flags]
```

- _Provide `[flags]` according to the table below_

| Flag                | Type   | Description                                                                                                                           |
| :-------------------| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `--config-file`     | string | path to a manifest containing config values (must be `apiVersion: kots.io/v1beta1, kind: ConfigValues`)                               |
| `--merge`           |        | when set to true, only keys specified in config file will be updated. This flag can only be used when `--config-file` flag is used.   |
|`--key`              | string | name of a single key to set. This flag requires `--value` or `--value-from-file` flags                                                |
| `--value` string    |        | the value to set for the key specified in the `--key` flag. This flag cannot be used with `--value-from-file` flag.                   |
| `--value-from-file` | string | path to the file containing the value to set for the key specified in the `--key` flag. This flag cannot be used with `--value` flag. |
| `--deploy`          |        | when set, automatically deploy the latest version with the new configuration                                                          |
| `--skip-preflights` |        | set to true to skip preflight checks when deploying new version                                                                       |
| `-n, --namespace`   | string | the namespace where the admin console is running _(required)_                                                                         |
:::nots
If any [`strict preflights`](../docs/vendor/preflight-support-bundle-creating.md) are configured, the `--skip-preflights` flag is not honored because preflight checks must run and contain no failures before the application is deployed. 

When the `--deploy` option is provided and there are [`strict preflights`](../docs/vendor/preflight-support-bundle-creating.md), the preflight checks always run. The deployment waits for up to 15 minutes for preflight checks to complete. If the checks complete with no strict preflight failures then the release deploys. If the checks do not complete within 15 minutes, the release does not deploy. If there are one or more strict preflight failures, the release does not deploy.
:::


### Examples

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
