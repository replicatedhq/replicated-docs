# replicated registry add ghcr

Add a GitHub Container Registry

### Synopsis

Add a GitHub Container Registry using a username and personal access token (PAT)

```
replicated registry add ghcr [flags]
```

### Options

```
  -h, --help            help for ghcr
  -o, --output string   The output format to use. One of: json|table (default "table")
      --token string    The token to use to auth to the registry with
      --token-stdin     Take the token from stdin
```

### Options inherited from parent commands

```
      --app string        The app slug or app id to use in all calls
      --debug             Enable debug output
      --skip-validation   Skip validation of the registry (not recommended)
```

### SEE ALSO

* [replicated registry add](replicated-cli-registry-add)	 - add