# replicated release inspect

Long: information about a release

### Synopsis

Show information about the specified application release.

This command displays detailed information about a specific release of an application.

The output can be customized using the --output flag to display results in
either table or JSON format.
		

```
replicated release inspect RELEASE_SEQUENCE [flags]
```

### Examples

```
# Display information about a release
replicated release inspect 123

# Display information about a release in JSON format
replicated release inspect 123 --output json
```

### Options

```
  -h, --help            help for inspect
  -o, --output string   The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases