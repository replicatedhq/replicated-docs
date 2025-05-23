# replicated vm port

Manage VM ports.

### Synopsis

The 'vm port' command is a parent command for managing ports in a vm. It allows users to list, remove, or expose specific ports used by the vm. Use the subcommands (such as 'ls', 'rm', and 'expose') to manage port configurations effectively.

This command provides flexibility for handling ports in various test vms, ensuring efficient management of vm networking settings.

### Examples

```
# List all exposed ports in a vm
replicated vm port ls [VM_ID]

# Remove an exposed port from a vm
replicated vm port rm [VM_ID] [PORT]

# Expose a new port in a vm
replicated vm port expose [VM_ID] [PORT]
```

### Options

```
  -h, --help   help for port
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.
* [replicated vm port expose](replicated-cli-vm-port-expose)	 - Expose a port on a vm to the public internet.
* [replicated vm port ls](replicated-cli-vm-port-ls)	 - List vm ports for a vm.
* [replicated vm port rm](replicated-cli-vm-port-rm)	 - Remove vm port by ID.