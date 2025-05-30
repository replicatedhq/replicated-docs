# replicated cluster addon ls

List cluster add-ons for a cluster.

### Synopsis

The 'cluster addon ls' command allows you to list all add-ons for a specific cluster. This command provides a detailed overview of the add-ons currently installed on the cluster, including their status and any relevant configuration details.

This can be useful for monitoring the health and configuration of add-ons or performing troubleshooting tasks.

```
replicated cluster addon ls CLUSTER_ID [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List add-ons for a cluster with default table output
replicated cluster addon ls CLUSTER_ID

# List add-ons for a cluster with JSON output
replicated cluster addon ls CLUSTER_ID --output json

# List add-ons for a cluster with wide table output
replicated cluster addon ls CLUSTER_ID --output wide
```

### Options

```
  -h, --help            help for ls
  -o, --output string   The output format to use. One of: json|table|wide (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster addon](replicated-cli-cluster-addon)	 - Manage cluster add-ons.