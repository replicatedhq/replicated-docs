# replicated default show

Show default value for a key

### Synopsis

Shows defaul values for the specified key.

This command shows default values that will be used by other commands run by the current user.

Supported keys:
- app: the default application to use

The output can be customized using the --output flag to display results in
either table or JSON format.

```
replicated default show KEY [flags]
```

### Examples

```
# Show default application
replicated default show app

```

### Options

```
  -h, --help            help for show
  -o, --output string   The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated default](replicated-cli-default)	 - Manage default values used by other commands