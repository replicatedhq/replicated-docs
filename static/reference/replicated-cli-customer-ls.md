# replicated customer ls

List customers for the current application

### Synopsis

List customers associated with the current application.

This command displays information about customers linked to your application.
By default, it shows all non-test customers. You can use flags to:
- Filter customers by a specific app version
- Include test customers in the results
- Change the output format (table or JSON)

The command requires an app to be set using the --app flag.

```
replicated customer ls [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List all customers for the current application
replicated customer ls --app myapp
# Output results in JSON format
replicated customer ls --app myapp --output json

# Combine multiple flags
replicated customer ls --app myapp --output json
```

### Options

```
      --app-version string   Filter customers by a specific app version
  -h, --help                 help for ls
      --include-test         Include test customers in the results
  -o, --output string        The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated customer](replicated-cli-customer)	 - Manage customers