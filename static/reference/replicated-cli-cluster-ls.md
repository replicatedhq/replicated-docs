# replicated cluster ls

List test clusters.

### Synopsis

The 'cluster ls' command lists all test clusters. This command provides information about the clusters, such as their status, name, distribution, version, and creation time. The output can be formatted in different ways, depending on your needs.

You can filter the list of clusters by time range and status (e.g., show only terminated clusters). You can also watch clusters in real-time, which updates the list every few seconds.

Clusters that have been deleted will be shown with a 'deleted' status.

```
replicated cluster ls [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List all clusters with default table output
replicated cluster ls

# Show clusters created after a specific date
replicated cluster ls --start-time 2023-01-01T00:00:00Z

# Watch for real-time updates
replicated cluster ls --watch

# List clusters with JSON output
replicated cluster ls --output json

# List only terminated clusters
replicated cluster ls --show-terminated

# List clusters with wide table output
replicated cluster ls --output wide
```

### Options

```
      --end-time string     end time for the query (Format: 2006-01-02T15:04:05Z)
  -h, --help                help for ls
  -o, --output string       The output format to use. One of: json|table|wide (default "table")
      --show-terminated     when set, only show terminated clusters
      --start-time string   start time for the query (Format: 2006-01-02T15:04:05Z)
  -w, --watch               watch clusters
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.