# admin-console upgrade

Upgrades the Replicated admin console to match the version of kots CLI.


### Usage
```bash
kubectl kots admin-console upgrade [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                        | Type   | Description                                                                                                                                                                                                                                    |
|:----------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-h, --help`                |        | Help for the admin-console                                                                                                                                                                                                                     |
| `-n, --namespace`           | string | The namespace where the admin console is running _(default "default")_                                                                                                                                                                         |
| `--wait-duration`           | string | Timeout out to be used while waiting for individual components to be ready.  Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format (eg: 10s, 2m)                                                                             |
| `--with-minio`              | bool   | When set, KOTS will deploy a local minio instance for storage and attempt to change any minio-based snapshots (hostpath and NFS) to the [local-volume-provider](https://github.com/replicatedhq/local-volume-provider) plugin _(default true)_ |
| `--ensure-rbac`             | bool   | When set, KOTS will skip RBAC configuration at upgrade time. (default false) if a role spec is needed, use the [generate-manifests](kots-cli-admin-console-generate-manifests) command.                                                      |
| `--strict-security-context` | bool   | Set to explicitly enable strict security contexts for all kots pods and containers. This may not work for some storage providers. Default: false                                                                                                  |

### Examples
```bash
kubectl kots admin-console upgrade --namespace kots-sentry
kubectl kots admin-console upgrade --ensure-rbac=false
```
