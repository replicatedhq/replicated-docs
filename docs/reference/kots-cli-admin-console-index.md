# admin-console

Enables access to the Replicated admin console from a local machine.

This command opens localhost port 8800, which forwards to the `kotsadm` service.
Alternatively you can specify the `--port` flag to specify a port other than 8800.

To access the admin console, browse to http://localhost:8800 after running this command.

### Usage
```bash
kubectl kots admin-console [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag              | Type   | Description                                                                     |
|:------------------|--------|---------------------------------------------------------------------------------|
| `-h, --help`      |        | Help for admin-console.                                                         |
| `-n, --namespace` | string | The namespace where the admin console is running. **Default:** "default"        |
| `--port`          | string | Override the local port on which to access the admin console. **Default:** 8800 |

### Examples
```bash
kubectl kots admin-console --namespace kots-sentry
```
