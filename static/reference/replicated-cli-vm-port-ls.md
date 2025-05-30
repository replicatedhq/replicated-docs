# replicated vm port ls

List vm ports for a vm.

### Synopsis

The 'vm port ls' command lists all the ports configured for a specific vm. You must provide the vm ID to retrieve and display the ports.

This command is useful for viewing the current port configurations, protocols, and other related settings of your test vm. The output format can be customized to suit your needs, and the available formats include table, JSON, and wide views.

```
replicated vm port ls VM_ID [flags]
```

### Examples

```
# List ports for a vm in the default table format
replicated vm port ls VM_ID

# List ports for a vm in JSON format
replicated vm port ls VM_ID --output json

# List ports for a vm in wide format
replicated vm port ls VM_ID --output wide
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

* [replicated vm port](replicated-cli-vm-port)	 - Manage VM ports.