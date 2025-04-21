# replicated cluster kubeconfig

Download credentials for a test cluster.

### Synopsis

The 'cluster kubeconfig' command downloads the credentials (kubeconfig) required to access a test cluster. You can either merge these credentials into your existing kubeconfig file or save them as a new file.

This command ensures that the kubeconfig is correctly configured for use with your Kubernetes tools. You can specify the cluster by ID or by name. Additionally, the kubeconfig can be written to a specific file path or printed to stdout.

You can also use this command to automatically update your current Kubernetes context with the downloaded credentials.

```
replicated cluster kubeconfig [ID] [flags]
```

### Examples

```
# Download and merge kubeconfig into your existing configuration
replicated cluster kubeconfig CLUSTER_ID

# Save the kubeconfig to a specific file
replicated cluster kubeconfig CLUSTER_ID --output-path ./kubeconfig

# Print the kubeconfig to stdout
replicated cluster kubeconfig CLUSTER_ID --stdout

# Download kubeconfig for a cluster by name
replicated cluster kubeconfig --name "My Cluster"

# Download kubeconfig for a cluster by ID
replicated cluster kubeconfig --id CLUSTER_ID
```

### Options

```
  -h, --help                 help for kubeconfig
      --id string            id of the cluster to download credentials for (when name is not provided)
      --name string          name of the cluster to download credentials for (when id is not provided)
      --output-path string   path to kubeconfig file to write to, if not provided, it will be merged into your existing kubeconfig
      --stdout               write kubeconfig to stdout
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.