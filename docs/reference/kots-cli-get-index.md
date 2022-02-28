# get

The `kots get` command shows information about one or more resources.

> Introduced in KOTS v1.28.0

### Usage
```bash
kubectl kots get [resource] [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-o, --output` | |   output format, supported values: json |

### Resources

* `apps` lists installed applications.
* `backups` lists available full snapshots (instance).
* `restores` lists created full snapshot restores.
