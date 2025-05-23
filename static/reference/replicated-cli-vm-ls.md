# replicated vm ls

List test VMs and their status, with optional filters for start/end time and terminated VMs.

### Synopsis

List all test VMs in your account, including their current status, distribution, version, and more. You can use optional flags to filter the output based on VM termination status, start time, or end time. This command can also watch the VM status in real-time.

By default, the command will return a table of all VMs, but you can switch to JSON or wide output formats for more detailed information. The command supports filtering to show only terminated VMs or to specify a time range for the query.

You can use the '--watch' flag to monitor VMs continuously. This will refresh the list of VMs every 2 seconds, displaying any updates in real-time, such as new VMs being created or existing VMs being terminated.

The command also allows you to customize the output format, supporting 'json', 'table', and 'wide' views for flexibility based on your needs.

```
replicated vm ls [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List all active VMs
replicated vm ls

# List all VMs that were created after a specific start time
replicated vm ls --start-time 2024-10-01T00:00:00Z

# Show only terminated VMs
replicated vm ls --show-terminated

# Watch VM status changes in real-time
replicated vm ls --watch
```

### Options

```
      --end-time string     end time for the query (Format: 2006-01-02T15:04:05Z)
  -h, --help                help for ls
  -o, --output string       The output format to use. One of: json|table|wide (default "table")
      --show-terminated     when set, only show terminated vms
      --start-time string   start time for the query (Format: 2006-01-02T15:04:05Z)
  -w, --watch               watch vms
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.