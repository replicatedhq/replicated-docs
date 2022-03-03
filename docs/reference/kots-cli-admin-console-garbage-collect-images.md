# admin-console garbage-collect-images

Starts image garbage collection.
The admin console must be running and an application must be installed in order to use this command.

### Usage
```bash
kubectl kots admin-console garbage-collect-images -n <namespace>
```

This command supports all [global flags](kots-cli-global-flags).

| Flag                | Type   | Description                                                                                                                                                                           |
|:--------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-h, --help`        |        | help for admin-console                                                                                                                                                                |
| `-n, --namespace`   | string | the namespace where the admin console is running _(required)_                                                                                                                         |
| `--ignore-rollback` | string | force images garbage collection even if rollback is enabled for the application (default false). Note: this may impact the ability to rollback the application to a previous version. |

### Examples
```bash
kubectl kots admin-console garbage-collect-images -n default
```
