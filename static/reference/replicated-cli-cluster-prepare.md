# replicated cluster prepare

Prepare cluster for testing.

### Synopsis

The 'cluster prepare' command provisions a Kubernetes cluster and installs an application using a Helm chart or KOTS YAML configuration.

This command is designed to be used in CI environments to prepare a cluster for testing by deploying a Helm chart or KOTS application with entitlements and custom values. You can specify the cluster configuration, such as the Kubernetes distribution, version, node count, and instance type, and then install your application automatically.

Alternatively, if you prefer deploying KOTS applications, you can specify YAML manifests for the release and use the '--shared-password' flag for the KOTS admin console.

You can also pass entitlement values to configure the cluster's customer entitlements.

Note:
- The '--chart' flag cannot be used with '--yaml', '--yaml-file', or '--yaml-dir'.
- If deploying a Helm chart, use the '--set' flags to pass chart values. When deploying a KOTS application, the '--shared-password' flag is required.

```
replicated cluster prepare [flags]
```

### Examples

```
replicated cluster prepare --distribution eks --version 1.27 --instance-type c6.xlarge --node-count 3 --chart ./your-chart.tgz --values ./values.yaml --set chart-key=value --set chart-key2=value2
```

### Options

```
      --app-ready-timeout duration   Timeout to wait for the application to be ready. Must be in Go duration format (e.g., 10s, 2m). (default 5m0s)
      --chart string                 Path to the helm chart package to deploy
      --cluster-id string            The ID of an existing cluster to use instead of creating a new one.
      --config-values-file string    Path to a manifest containing config values (must be apiVersion: kots.io/v1beta1, kind: ConfigValues).
      --disk int                     Disk Size (GiB) to request per node. (default 50)
      --distribution string          Kubernetes distribution of the cluster to provision
      --entitlements strings         The entitlements to set on the customer. Can be specified multiple times.
  -h, --help                         help for prepare
      --instance-type string         the type of instance to use clusters (e.g. x5.xlarge)
      --name string                  Cluster name
      --namespace string             The namespace into which to deploy the KOTS application or Helm chart. (default "default")
      --node-count int               Node count. (default 1)
      --set stringArray              Set values on the command line (can specify multiple or separate values with commas: key1=val1,key2=val2).
      --set-file stringArray         Set values from respective files specified via the command line (can specify multiple or separate values with commas: key1=path1,key2=path2).
      --set-json stringArray         Set JSON values on the command line (can specify multiple or separate values with commas: key1=jsonval1,key2=jsonval2).
      --set-literal stringArray      Set a literal STRING value on the command line.
      --set-string stringArray       Set STRING values on the command line (can specify multiple or separate values with commas: key1=val1,key2=val2).
      --shared-password string       Shared password for the KOTS admin console.
      --ttl string                   Cluster TTL (duration, max 48h)
      --values strings               Specify values in a YAML file or a URL (can specify multiple).
      --version string               Kubernetes version to provision (format is distribution dependent)
      --wait duration                Wait duration for cluster to be ready. (default 5m0s)
      --yaml string                  The YAML config for this release. Use '-' to read from stdin. Cannot be used with the --yaml-file flag.
      --yaml-dir string              The directory containing multiple yamls for a KOTS release. Cannot be used with the --yaml flag.
      --yaml-file string             The YAML config for this release. Cannot be used with the --yaml flag.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.