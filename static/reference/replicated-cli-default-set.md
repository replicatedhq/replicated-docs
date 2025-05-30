# replicated default set

Set default value for a key

### Synopsis

Sets default value for the specified key.

This command sets default values that will be used by other commands run by the current user.

Supported keys:
- app: the default application to use

The output can be customized using the --output flag to display results in
either table or JSON format.

```
replicated default set KEY VALUE [flags]
```

### Examples

```
# Set default application
replicated default set app my-app-slug
```

### Options

```
  -h, --help            help for set
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