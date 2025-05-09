# replicated vm update ttl

Update TTL for a test VM.

### Synopsis

The 'ttl' command allows you to update the Time to Live (TTL) for a test VM. This command modifies the lifespan of a running VM by updating its TTL, which is a duration starting from the moment the VM is provisioned.

The TTL specifies how long the VM will run before it is automatically terminated. You can specify a duration up to a maximum of 48 hours.

The command accepts a VM ID as an argument and requires the '--ttl' flag to specify the new TTL value.

You can also specify the output format (json, table, wide) using the '--output' flag.

```
replicated vm update ttl [ID] [flags]
```

### Examples

```
# Update the TTL of a VM to 2 hours
replicated vm update ttl aaaaa11 --ttl 2h

# Update the TTL of a VM to 30 minutes
replicated vm update ttl aaaaa11 --ttl 30m
```

### Options

```
  -h, --help            help for ttl
  -o, --output string   The output format to use. One of: json|table|wide (default "table")
      --ttl string      Update TTL which starts from the moment the vm is running (duration, max 48h).
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --id string      id of the vm to update (when name is not provided)
      --name string    Name of the vm to update.
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm update](replicated-cli-vm-update)	 - Update VM settings.