# replicated cluster versions

List cluster versions.

### Synopsis

The 'versions' command lists available Kubernetes versions for supported distributions. You can filter the versions by specifying a distribution and choose between different output formats.

```
replicated cluster versions [flags]
```

### Examples

```
# List all available Kubernetes cluster versions
replicated cluster versions

# List available versions for a specific distribution (e.g., eks)
replicated cluster versions --distribution eks

# Output the versions in JSON format
replicated cluster versions --output json
```

### Options

```
      --distribution string   Kubernetes distribution to filter by.
  -h, --help                  help for versions
  -o, --output string         The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.