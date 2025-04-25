# replicated cluster update

Update cluster settings.

### Synopsis

The 'update' command allows you to update various settings of a test cluster, such as its name or ID.

You can either specify the cluster ID directly or provide the cluster name, and the command will resolve the corresponding cluster ID. This allows you to modify the cluster's configuration based on the unique identifier or the name of the cluster.

### Examples

```
# Update a cluster using its ID
replicated cluster update --id <cluster-id> [subcommand]

# Update a cluster using its name
replicated cluster update --name <cluster-name> [subcommand]
```

### Options

```
  -h, --help          help for update
      --id string     id of the cluster to update (when name is not provided)
      --name string   Name of the cluster to update.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.
* [replicated cluster update nodegroup](replicated-cli-cluster-update-nodegroup)	 - Update a nodegroup for a test cluster.
* [replicated cluster update ttl](replicated-cli-cluster-update-ttl)	 - Update TTL for a test cluster.