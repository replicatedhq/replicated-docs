# reset-tls

If a bad TLS certificate is uploaded to the admin console or the kotsadm-tls secret is missing, the `kots reset-tls` command reapplies a default self-signed TLS certificate.
For more information about the certificates stored in this secret, see [Setting up TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the open source kURL documentation.

### Usage
```bash
kubectl kots reset-tls [namespace] [flags]
```
* _Replace `[namespace]` with the namespace where the admin console and your KOTS application resides (required)._
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |          |  Help for `reset-tls`. |
| `-n, --namespace`| string |     The namespace where the admin console is running. |
| `--accept-anonymous-uploads`| bool |    Allow uploading a new certificate prior to authenticating. |

### Examples
```bash
kubectl kots reset-tls sentry-namespace
