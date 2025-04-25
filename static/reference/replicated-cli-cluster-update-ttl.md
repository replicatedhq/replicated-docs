# replicated cluster update ttl

Update TTL for a test cluster.

### Synopsis

The 'ttl' command allows you to update the Time-To-Live (TTL) of a test cluster. The TTL represents the duration for which the cluster will remain active before it is automatically terminated. The duration starts from the moment the cluster becomes active. You must provide a valid duration, with a maximum limit of 48 hours.

```
replicated cluster update ttl [ID] [flags]
```

### Examples

```
# Update the TTL for a specific cluster
replicated cluster update ttl CLUSTER_ID --ttl 24h
```

### Options

```
  -h, --help            help for ttl
  -o, --output string   The output format to use. One of: json|table (default "table")
      --ttl string      Update TTL which starts from the moment the cluster is running (duration, max 48h).
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