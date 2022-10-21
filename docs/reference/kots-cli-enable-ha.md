# enable-ha

Enables HA mode for the admin console

## Usage
```bash
kubectl kots enable-ha [flags]
```

* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type   | Description |
|:---------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--wait-duration`    | string | Timeout out to be used while waiting for individual components to be ready.  Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format (eg: 10s, 2m)  |
| `-h, --help`         |        | help for download                                                                                                                                                  |
| `-n, --namespace`    | string | The namespace where the admin console is running _(required)_                                                                                                      |

## Example
```bash
kubectl kots enable-ha --namespace kots-sentry
```
