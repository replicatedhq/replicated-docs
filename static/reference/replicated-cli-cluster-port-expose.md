# replicated cluster port expose

Expose a port on a cluster to the public internet.

### Synopsis

The 'cluster port expose' command is used to expose a specified port on a cluster to the public internet. When exposing a port, the command automatically creates a DNS entry and, if using the "https" protocol, provisions a TLS certificate for secure communication.

You can also create a wildcard DNS entry and TLS certificate by specifying the "--wildcard" flag. Please note that creating a wildcard certificate may take additional time.

This command supports different protocols including "http", "https", "ws", and "wss" for web traffic and web socket communication.

NOTE: Currently, this feature only supports VM-based cluster distributions.

```
replicated cluster port expose CLUSTER_ID --port PORT [flags]
```

### Examples

```
# Expose port 8080 with HTTPS protocol and wildcard DNS
replicated cluster port expose CLUSTER_ID --port 8080 --protocol https --wildcard

# Expose port 3000 with HTTP protocol
replicated cluster port expose CLUSTER_ID --port 3000 --protocol http

# Expose port 8080 with multiple protocols
replicated cluster port expose CLUSTER_ID --port 8080 --protocol http,https

# Expose port 8080 and display the result in JSON format
replicated cluster port expose CLUSTER_ID --port 8080 --protocol https --output json
```

### Options

```
  -h, --help               help for expose
  -o, --output string      The output format to use. One of: json|table|wide (default "table")
      --port int           Port to expose (required)
      --protocol strings   Protocol to expose (valid values are "http", "https", "ws" and "wss") (default [http,https])
      --wildcard           Create a wildcard DNS entry and TLS certificate for this port
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster port](replicated-cli-cluster-port)	 - Manage cluster ports.