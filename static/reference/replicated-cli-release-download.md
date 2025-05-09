# replicated release download

Download application manifests for a release.

### Synopsis

Download application manifests for a release to a specified directory.

For non-KOTS applications, this is equivalent to the 'release inspect' command.

```
replicated release download RELEASE_SEQUENCE [flags]
```

### Examples

```
replicated release download 1 --dest ./manifests
```

### Options

```
  -d, --dest string   Directory to which release manifests should be downloaded
  -h, --help          help for download
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases