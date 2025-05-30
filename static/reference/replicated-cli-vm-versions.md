# replicated vm versions

List available VM versions.

### Synopsis

The 'vm versions' command lists all the available versions of virtual machines that can be provisioned. This includes the available distributions and their respective versions.

- You can filter the list by a specific distribution using the '--distribution' flag.
- The output can be formatted as a table or in JSON format using the '--output' flag.

```
replicated vm versions [flags]
```

### Examples

```
# List all available VM versions
replicated vm versions

# List VM versions for a specific distribution (e.g., Ubuntu)
replicated vm versions --distribution ubuntu

# Display the output in JSON format
replicated vm versions --output json
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

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.