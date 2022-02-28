# remove

Remove application reference from admin console.
Multiple applications can be installed using the `Add a new application` button in admin console or using the `kots install` command.
All installed applications will appear in admin console.
The `kots remove` command can be used to remove them.
Note that the deployed application will not be removed from the cluster; only its reference will be removed from the admin console.

### Usage
```bash
kubectl kots remove [app-slug]
```
* _`[app-slug]` is the slug of the installed application to be removed (required)_
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--force` |  bool  |  Remove the reference even if the application has already been deployed |

### Example
```bash
kubectl kots remove sentry -n default
```
