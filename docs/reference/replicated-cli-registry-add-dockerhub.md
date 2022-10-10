# registry add dockerhub

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
      --password string   The password to authenticate to the registry with
      --password-stdin    Take the password from stdin
      --token-stdin       Take the token from stdin
      --username string   The userame to authenticate to the registry with
```

### Options inherited from parent commands

```
      --app string        The app slug or app id to use in all calls
      --skip-validation   Skip validation of the registry (not recommended)
      --token string      The API token to use to access your app in the Vendor API
```

