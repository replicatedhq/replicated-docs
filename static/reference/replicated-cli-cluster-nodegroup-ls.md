# replicated cluster nodegroup ls

List node groups for a cluster.

### Synopsis

The 'cluster nodegroup ls' command lists all the node groups associated with a given cluster. Each node group defines a specific set of nodes with particular configurations, such as instance types and scaling options.

You can view information about the node groups within the specified cluster, including their ID, name, node count, and other configuration details.

You must provide the cluster ID to list its node groups.

```
replicated cluster nodegroup ls [ID] [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List all node groups in a cluster with default table output
replicated cluster nodegroup ls CLUSTER_ID

# List node groups with JSON output
replicated cluster nodegroup ls CLUSTER_ID --output json

# List node groups with wide table output
replicated cluster nodegroup ls CLUSTER_ID --output wide
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

* [replicated cluster nodegroup](replicated-cli-cluster-nodegroup)	 - Manage node groups for clusters.