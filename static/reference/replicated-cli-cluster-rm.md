# replicated cluster rm

Remove test clusters.

### Synopsis

The 'rm' command removes test clusters immediately.

You can remove clusters by specifying a cluster ID, or by using other criteria such as cluster names or tags. Alternatively, you can remove all clusters in your account at once.

This command can also be used in a dry-run mode to simulate the removal without actually deleting anything.

You cannot mix the use of cluster IDs with other options like removing by name, tag, or removing all clusters at once.

```
replicated cluster rm ID [ID …] [flags]
```

### Aliases

```
rm, delete
```

### Examples

```
# Remove a specific cluster by ID
replicated cluster rm CLUSTER_ID

# Remove all clusters
replicated cluster rm --all
```

### Options

```
      --all                remove all clusters
      --dry-run            Dry run
  -h, --help               help for rm
      --name stringArray   Name of the cluster to remove (can be specified multiple times)
      --tag stringArray    Tag of the cluster to remove (key=value format, can be specified multiple times)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.