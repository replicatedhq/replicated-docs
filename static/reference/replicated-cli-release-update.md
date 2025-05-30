# replicated release update

Updated a release's yaml config

### Synopsis

Updated a release's yaml config

```
replicated release update SEQUENCE [flags]
```

### Options

```
  -h, --help               help for update
      --yaml string        The new YAML config for this release. Use '-' to read from stdin. Cannot be used with the --yaml-file flag.
      --yaml-dir string    The directory containing multiple yamls for a Kots release. Cannot be used with the --yaml flag.
      --yaml-file string   The file name with YAML config for this release. Cannot be used with the --yaml flag.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases