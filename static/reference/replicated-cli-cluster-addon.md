# replicated cluster addon

Manage cluster add-ons.

### Synopsis

The 'cluster addon' command allows you to manage add-ons installed on a test cluster. Add-ons are additional components or services that can be installed and configured to enhance or extend the functionality of the cluster.

You can use various subcommands to create, list, remove, or check the status of add-ons on a cluster. This command is useful for adding databases, object storage, monitoring, security, or other specialized tools to your cluster environment.

### Examples

```
# List all add-ons installed on a cluster
replicated cluster addon ls CLUSTER_ID

# Remove an add-on from a cluster
replicated cluster addon rm CLUSTER_ID --id ADDON_ID

# Create an object store bucket add-on for a cluster
replicated cluster addon create object-store CLUSTER_ID --bucket-prefix mybucket

# List add-ons with JSON output
replicated cluster addon ls CLUSTER_ID --output json
```

### Options

```
  -h, --help   help for addon
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.
* [replicated cluster addon create](replicated-cli-cluster-addon-create)	 - Create cluster add-ons.
* [replicated cluster addon ls](replicated-cli-cluster-addon-ls)	 - List cluster add-ons for a cluster.
* [replicated cluster addon rm](replicated-cli-cluster-addon-rm)	 - Remove cluster add-on by ID.