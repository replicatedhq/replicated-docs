# admin-console

Enables access to the Replicated admin console from a local machine.

This command opens localhost port 8800, which forwards to the `kotsadm` service.

To access the admin console, browse to http://localhost:8800 after running this command.

### Usage
```bash
kubectl kots admin-console [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the admin-console |
| `-n, --namespace` | string |   the namespace where the admin console is running _(default "default")_ |

### Examples
```bash
kubectl kots admin-console --namespace kots-sentry
```
