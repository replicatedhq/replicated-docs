# reset-tls

If a bad TLS certificate is uploaded to the admin console or the kotsadm-tls secret is missing, the `kots reset-tls` command will reapply a default self-signed TLS certificate.

### Usage
```bash
kubectl kots reset-tls [namespace] [flags]
```
* _Replace `[namespace]` with the namespace where the admin console and your KOTS application resides (required)._
* _Provide `[flags]` according to the table below_

This command supports all [global flags](/kots-cli/global-flags/) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |          |  help for reset-tls |
| `-n, --namespace`| string |     the namespace where the admin console is running |

### Examples
```bash
kubectl kots reset-tls sentry-namespace
