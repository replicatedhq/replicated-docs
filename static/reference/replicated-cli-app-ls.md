# replicated app ls

List applications

### Synopsis

List all applications in your Replicated account,
or search for a specific application by name or ID.

This command displays information about your applications, including their
names, IDs, and associated channels. If a NAME argument is provided, it will
filter the results to show only applications that match the given name or ID.

The output can be customized using the --output flag to display results in
either table or JSON format.

```
replicated app ls [NAME] [flags]
```

### Aliases

```
ls, list
```

### Examples

```
# List all applications
replicated app ls

# Search for a specific application by name
replicated app ls "My App"

# List applications and output in JSON format
replicated app ls --output json

# Search for an application and display results in table format
replicated app ls "App Name" --output table
```

### Options

```
  -h, --help            help for ls
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