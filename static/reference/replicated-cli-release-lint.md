# replicated release lint

Lint a directory of KOTS manifests

### Synopsis

Lint a directory of KOTS manifests

```
replicated release lint [flags]
```

### Options

```
      --fail-on string   The minimum severity to cause the command to exit with a non-zero exit code. Supported values are [info, warn, error, none]. (default "error")
  -h, --help             help for lint
  -o, --output string    The output format to use. One of: json|table (default "table")
      --yaml-dir yaml    The directory containing multiple yamls for a Kots release.  Cannot be used with the yaml flag.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases