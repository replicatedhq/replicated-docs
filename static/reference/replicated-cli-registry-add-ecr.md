# replicated registry add ecr

Add an ECR registry

### Synopsis

Add an ECR registry using an Access Key ID and Secret Access Key

```
replicated registry add ecr [flags]
```

### Options

```
      --accesskeyid string       The access key id to authenticate to the registry with
      --endpoint string          The ECR endpoint
  -h, --help                     help for ecr
  -o, --output string            The output format to use. One of: json|table (default "table")
      --secretaccesskey string   The secret access key to authenticate to the registry with
      --secretaccesskey-stdin    Take the secret access key from stdin
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