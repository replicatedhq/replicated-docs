# remove

Remove application reference from the Replicated admin console.

You can use the `kots remove` command to remove one or more installed applications from the admin console.
By default, the deployed application is not removed from the cluster. Only the reference for the application is removed from the admin console. To completely remove the application and delete its resources from the cluster, use the `--undeploy` flag.

### Usage
```bash
kubectl kots remove [app-slug] -n [namespace]
```
* _`[app-slug]` is the slug of the installed application to be removed (required)_
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag         | Type   | Description                                                            |
|:-------------|--------|------------------------------------------------------------------------|
| `--force`    |  bool  | Removes the reference even if the application has already been deployed. |
| `--undeploy` |  bool  | Undeploys the application by deleting all its resources from the cluster. When `--undeploy` is set, the `--force` flag is set automatically. |
| `-n`         | string | Removes the application from the specified namespace. Replace [namespace] with the actual namespace designation or use `default` for the default namespace. |

### Example
```bash
kubectl kots remove sentry -n default
```
