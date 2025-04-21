# replicated vm update

Update VM settings.

### Synopsis

The 'vm update' command allows you to modify the settings of a virtual machine. You can update a VM either by providing its ID or by specifying its name. This command supports updating various VM settings, which will be handled by specific subcommands.

- To update the VM by its ID, use the '--id' flag.
- To update the VM by its name, use the '--name' flag.

Subcommands will allow for more specific updates like TTL

### Examples

```
# Update a VM by specifying its ID
replicated vm update --id aaaaa11 --ttl 12h

# Update a VM by specifying its name
replicated vm update --name --ttl 12h
```

### Options

```
  -h, --help          help for update
      --id string     id of the vm to update (when name is not provided)
      --name string   Name of the vm to update.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.
* [replicated vm update ttl](replicated-cli-vm-update-ttl)	 - Update TTL for a test VM.