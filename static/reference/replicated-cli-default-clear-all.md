# replicated default clear-all

Clear all default values

### Synopsis

Clears all default values that are used by other commands.

This command removes all default values that are used by other commands run by the current user.

```
replicated default clear-all [flags]
```

### Examples

```
# Clear all default values
replicated default clear-all
```

### Options

```
  -h, --help   help for clear-all
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated default](replicated-cli-default)	 - Manage default values used by other commands