# replicated registry add gcr

Add a Google Container Registry

### Synopsis

Add a Google Container Registry using a service account key

```
replicated registry add gcr [flags]
```

### Options

```
      --endpoint string            The GCR endpoint
  -h, --help                       help for gcr
  -o, --output string              The output format to use. One of: json|table (default "table")
      --serviceaccountkey string   The service account key to authenticate to the registry with
      --serviceaccountkey-stdin    Take the service account key from stdin
```

### Options inherited from parent commands

```
      --app string        The app slug or app id to use in all calls
      --debug             Enable debug output
      --skip-validation   Skip validation of the registry (not recommended)
      --token string      The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated registry add](replicated-cli-registry-add)	 - add