# replicated registry add dockerhub

Add a DockerHub registry

### Synopsis

Add a DockerHub registry using a username/password or an account token

```
replicated registry add dockerhub [flags]
```

### Options

```
      --authtype string   Auth type for the registry (default "password")
  -h, --help              help for dockerhub
  -o, --output string     The output format to use. One of: json|table (default "table")
      --password string   The password to authenticate to the registry with
      --password-stdin    Take the password from stdin
      --token string      The token to authenticate to the registry with
      --token-stdin       Take the token from stdin
      --username string   The userame to authenticate to the registry with
```

### Options inherited from parent commands

```
      --app string        The app slug or app id to use in all calls
      --debug             Enable debug output
      --skip-validation   Skip validation of the registry (not recommended)
```

### SEE ALSO

* [replicated registry add](replicated-cli-registry-add)	 - add