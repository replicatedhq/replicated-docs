# replicated cluster nodegroup

Manage node groups for clusters.

### Synopsis

The 'cluster nodegroup' command provides functionality to manage node groups within a cluster. This command allows you to list node groups in a Kubernetes or VM-based cluster.

Node groups define a set of nodes with specific configurations, such as instance types, node counts, or scaling rules. You can use subcommands to perform various actions on node groups.

### Examples

```
# List all node groups for a cluster
replicated cluster nodegroup ls CLUSTER_ID
```

### Options

```
  -h, --help   help for nodegroup
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.
* [replicated cluster nodegroup ls](replicated-cli-cluster-nodegroup-ls)	 - List node groups for a cluster.