# replicated cluster addon create

Create cluster add-ons.

### Synopsis

Create new add-ons for a cluster. This command allows you to add functionality or services to a cluster by provisioning the required add-ons.

### Examples

```
# Create an object store bucket add-on for a cluster
replicated cluster addon create object-store CLUSTER_ID --bucket-prefix mybucket

# Perform a dry run for creating an object store add-on
replicated cluster addon create object-store CLUSTER_ID --bucket-prefix mybucket --dry-run
```

### Options

```
  -h, --help   help for create
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster addon](replicated-cli-cluster-addon)	 - Manage cluster add-ons.
* [replicated cluster addon create object-store](replicated-cli-cluster-addon-create-object-store)	 - Create an object store bucket for a cluster.