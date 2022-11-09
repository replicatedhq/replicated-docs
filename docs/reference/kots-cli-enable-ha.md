# enable-ha

(Deprecated) Runs the rqlite StatefulSet as three replicas for data replication and high availability.

This command is deprecated and will be removed in a future release. The EKCO add-on for the Kubernetes installer now scales up the rqlite StatefulSet automatically when three or more nodes are healthy and the OpenEBS localpv storage class is available. For more information, see [EKCO add-on](https://kurl.sh/docs/add-ons/ekco#kotsadm) in the kURL documentation.

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
