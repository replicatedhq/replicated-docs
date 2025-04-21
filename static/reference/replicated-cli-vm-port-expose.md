# replicated vm port expose

Expose a port on a vm to the public internet.

### Synopsis

The 'vm port expose' command is used to expose a specified port on a vm to the public internet. When exposing a port, the command automatically creates a DNS entry and, if using the "https" protocol, provisions a TLS certificate for secure communication.

This command supports different protocols including "http", "https", "ws", and "wss" for web traffic and web socket communication.

```
replicated vm port expose VM_ID --port PORT [flags]
```

### Examples

```
# Expose port 8080 with HTTPS protocol
replicated vm port expose VM_ID --port 8080 --protocol https

# Expose port 3000 with HTTP protocol
replicated vm port expose VM_ID --port 3000 --protocol http

# Expose port 8080 with multiple protocols
replicated vm port expose VM_ID --port 8080 --protocol http,https

# Expose port 8080 and display the result in JSON format
replicated vm port expose VM_ID --port 8080 --protocol https --output json
```

### Options

```
  -h, --help               help for expose
  -o, --output string      The output format to use. One of: json|table|wide (default "table")
      --port int           Port to expose (required)
      --protocol strings   Protocol to expose (valid values are "http", "https", "ws" and "wss") (default [http,https])
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm port](replicated-cli-vm-port)	 - Manage VM ports.