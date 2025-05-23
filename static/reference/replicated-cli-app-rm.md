# replicated app rm

Delete an application

### Synopsis

Delete an application from your Replicated account.

This command allows you to permanently remove an application from your account.
Once deleted, the application and all associated data will be irretrievably lost.

Use this command with caution as there is no way to undo this operation.

```
replicated app rm NAME [flags]
```

### Aliases

```
rm, delete
```

### Examples

```
# Delete a app named "My App"
replicated app delete "My App"

# Delete an app and skip the confirmation prompt
replicated app delete "Another App" --force

# Delete an app and output the result in JSON format
replicated app delete "Custom App" --output json
```

### Options

```
  -f, --force           Skip confirmation prompt. There is no undo for this action.
  -h, --help            help for rm
  -o, --output string   The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated app](replicated-cli-app)	 - Manage applications