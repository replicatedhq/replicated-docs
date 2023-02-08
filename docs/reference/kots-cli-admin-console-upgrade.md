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
| `-n, --namespace`           | string | The namespace where the admin console is running. **Default**: `"default"`  |
| `--wait-duration`           | string | Timeout out to be used while waiting for individual components to be ready.  Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format (eg: 10s, 2m)                                                                             |
| `--with-minio`              | bool   | When set, KOTS will deploy a local minio instance for storage and attempt to change any minio-based snapshots (hostpath and NFS) to the [local-volume-provider](https://github.com/replicatedhq/local-volume-provider) plugin **Default:** `true` |
| `--ensure-rbac`             | bool   | When `false`, KOTS does not attempt to create the RBAC resources necessary to manage applications. **Default:** `true`. If a role spec is needed, use the [generate-manifests](kots-cli-admin-console-generate-manifests) command. |
| `--skip-rbac-check`         | bool   | Set to `true` to bypass RBAC check. **Default:** `false` |
| `--strict-security-context` | bool   | Set to explicitly enable strict security contexts for all kots pods and containers. This may not work for some storage providers. **Default**: false    |
| `--use-minimal-rbac`        | bool   |  When set to `true`, KOTS RBAC permissions are limited to the namespace where it is installed. To use `--use-minimal-rbac`, the application must support namespace-scoped installations and the user must have the minimum RBAC permissions required by KOTS in the target namespace. For a complete list of requirements, see [Namespace-scoped RBAC Requirements​](/enterprise/installing-general-requirements#namespace-scoped) in _Installation Requirements_. **Default**: `false` |

### Examples
```bash
kubectl kots admin-console upgrade --namespace kots-sentry
kubectl kots admin-console upgrade --ensure-rbac=false
```
