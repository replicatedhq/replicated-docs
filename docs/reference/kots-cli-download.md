# download

Retrieves a copy of the application manifests from the cluster, and store them in a specific directory structure on your workstation.
Requires a running application with the Replicated admin console.

## Usage
```bash
kubectl kots download [app-slug] [flags]
```

* _Replace `[app-slug]` with the application slug provided by your software vendor (required)._ For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--decrypt-password-values` | bool | decrypt password values to plaintext |
| `--dest` | string | the directory to store the application in _(defaults to current working dir)_ |
| `-h, --help` | | help for download |
| `-n, --namespace` | string | the namespace to download from _(default `"default"`)_ |
| `--overwrite` | | overwrite any local files, if present |
| `-o, --output` | string | output format (currently supported: json) _(defaults to plain text if not set)_ |

## Example
```bash
kubectl kots download kots-sentry --namespace kots-sentry --dest ./manifests --overwrite
```
