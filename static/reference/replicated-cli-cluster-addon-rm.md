# replicated cluster addon rm

Remove cluster add-on by ID.

### Synopsis

The 'cluster addon rm' command allows you to remove a specific add-on from a cluster by specifying the cluster ID and the add-on ID.

This command is useful when you want to deprovision an add-on that is no longer needed or when troubleshooting issues related to specific add-ons. The add-on will be removed immediately, and you will receive confirmation upon successful removal.

```
replicated cluster addon rm CLUSTER_ID --id ADDON_ID [flags]
```

### Aliases

```
rm, delete
```

### Examples

```
# Remove an add-on with ID 'abc123' from cluster 'cluster456'
replicated cluster addon rm cluster456 --id abc123
```

### Options

```
  -h, --help        help for rm
      --id string   The ID of the cluster add-on to remove (required)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster addon](replicated-cli-cluster-addon)	 - Manage cluster add-ons.