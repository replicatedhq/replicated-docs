# replicated release compatibility

Report release compatibility

### Synopsis

Report release compatibility for a kubernetes distribution and version

```
replicated release compatibility SEQUENCE [flags]
```

### Options

```
      --distribution string   Kubernetes distribution of the cluster to report on.
      --failure               If set, the compatibility will be reported as a failure.
  -h, --help                  help for compatibility
      --notes string          Additional notes to report.
      --success               If set, the compatibility will be reported as a success.
      --version string        Kubernetes version of the cluster to report on (format is distribution dependent)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases