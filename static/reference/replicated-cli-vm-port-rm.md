# replicated vm port rm

Remove vm port by ID.

### Synopsis

The 'vm port rm' command removes a specific port from a vm. You must provide the ID of the port to remove.

This command is useful for managing the network settings of your test vms by allowing you to clean up unused or incorrect ports. After removing a port, the updated list of ports will be displayed.

```
replicated vm port rm VM_ID --id PORT_ID [flags]
```

### Examples

```
# Remove a port using its ID
replicated vm port rm VM_ID --id PORT_ID

# Remove a port and display the result in JSON format
replicated vm port rm VM_ID --id PORT_ID --output json
```

### Options

```
  -h, --help            help for rm
      --id string       ID of the port to remove (required)
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