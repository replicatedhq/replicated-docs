# replicated registry add quay

Add a quay.io registry

### Synopsis

Add a quay.io registry using a username/password (or a robot account)

```
replicated registry add quay [flags]
```

### Options

```
  -h, --help              help for quay
  -o, --output string     The output format to use. One of: json|table (default "table")
      --password string   The password to authenticate to the registry with
      --password-stdin    Take the password from stdin
      --username string   The userame to authenticate to the registry with
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