# enable-ha

(Deprecated) Enables HA mode for the admin console

## Usage
```bash
kubectl kots enable-ha [flags]
```

* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type   | Description |
|:---------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--wait-duration`    | string | Timeout used while waiting for individual components to be ready.  Must be in Go duration format. For example, `10s` or `2m`. See [func ParseDuration](https://pkg.go.dev/time#ParseDuration) in the Go documentation. |
| `-h, --help`         |        | Help for `enable-ha`.                                                                                                                                                  |
| `-n, --namespace`    | string | The namespace where the admin console is running _(required)_                                                                                                      |

## Example
```bash
kubectl kots enable-ha --namespace kots-sentry
```
