# reset-password

If you deployed an application with the KOTS Admin Console, the `kots reset-password` command will change the bcrypted password hash in the cluster, allowing you to log in again.

### Usage
```bash
kubectl kots reset-password [namespace] [flags]
```
* _Replace `[namespace]` with the namespace where the Admin Console and your KOTS application resides (required)._
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |          |  help for reset-password |
| `-n, --namespace`| string |     the namespace where the Admin Console is running |

### Examples
```bash
kubectl kots reset-password sentry-namespace
```