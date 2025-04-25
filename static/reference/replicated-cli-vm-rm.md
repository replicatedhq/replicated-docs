# replicated vm rm

Remove test VM(s) immediately, with options to filter by name, tag, or remove all VMs.

### Synopsis

The 'rm' command allows you to remove test VMs from your account immediately. You can specify one or more VM IDs directly, or use flags to filter which VMs to remove based on their name, tags, or simply remove all VMs at once.

This command supports multiple filtering options, including removing VMs by their name, by specific tags, or by specifying the '--all' flag to remove all VMs in your account.

You can also use the '--dry-run' flag to simulate the removal without actually deleting the VMs.

```
replicated vm rm ID [ID …] [flags]
```

### Aliases

```
rm, delete
```

### Examples

```
# Remove a VM by ID
replicated vm rm aaaaa11

# Remove multiple VMs by ID
replicated vm rm aaaaa11 bbbbb22 ccccc33

# Remove all VMs with a specific name
replicated vm rm --name test-vm

# Remove all VMs with a specific tag
replicated vm rm --tag env=dev

# Remove all VMs
replicated vm rm --all

# Perform a dry run of removing all VMs
replicated vm rm --all --dry-run
```

### Options

```
      --all                remove all vms
      --dry-run            Dry run
  -h, --help               help for rm
      --name stringArray   Name of the vm to remove (can be specified multiple times)
      --tag stringArray    Tag of the vm to remove (key=value format, can be specified multiple times)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.