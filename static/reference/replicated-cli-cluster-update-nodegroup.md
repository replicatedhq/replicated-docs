# replicated cluster update nodegroup

Update a nodegroup for a test cluster.

### Synopsis

The 'nodegroup' command allows you to update the configuration of a nodegroup within a test cluster. You can update attributes like the number of nodes, minimum and maximum node counts for autoscaling, and more.

If you do not provide the nodegroup ID, the command will try to resolve it based on the nodegroup name provided.

```
replicated cluster update nodegroup [ID] [flags]
```

### Examples

```
# Update the number of nodes in a nodegroup
replicated cluster update nodegroup CLUSTER_ID --nodegroup-id NODEGROUP_ID --nodes 3

# Update the autoscaling limits for a nodegroup
replicated cluster update nodegroup CLUSTER_ID --nodegroup-id NODEGROUP_ID --min-nodes 2 --max-nodes 5
```

### Options

```
  -h, --help                    help for nodegroup
      --max-nodes string        The maximum number of nodes in the nodegroup
      --min-nodes string        The minimum number of nodes in the nodegroup
      --nodegroup-id string     The ID of the nodegroup to update
      --nodegroup-name string   The name of the nodegroup to update
      --nodes int               The number of nodes in the nodegroup
  -o, --output string           The output format to use. One of: json|table|wide (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --id string      id of the cluster to update (when name is not provided)
      --name string    Name of the cluster to update.
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster update](replicated-cli-cluster-update)	 - Update cluster settings.