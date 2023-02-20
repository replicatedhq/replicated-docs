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
| `--force`    |  bool  | Remove the reference even if the application has already been deployed |
| `--undeploy` |  bool  | Un-deploy / delete application resources from the cluster              |
| `-n`         | string | The namespace to remove the application from. Replace [namespace] with the actual namespace designation or use `default` for the default namespace. |

### Example
```bash
kubectl kots remove sentry -n default
```
