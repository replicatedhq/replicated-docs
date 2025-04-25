# identity-service enable-shared-password

Enable the shared password login option in the KOTS Admin Console.

### Usage

```bash
kubectl kots identity-service enable-shared-password [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag              | Type   | Description                                      |
| :---------------- | ------ | ------------------------------------------------ |
| `-n, --namespace` | string | the namespace where the Admin Console is running |

NOTE: `--namespace` flag is required.

### Examples

```bash
kubectl kots identity-service enable-shared-password --namespace kots-sentry
```