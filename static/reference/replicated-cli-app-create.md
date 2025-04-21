# replicated app create

Create a new application

### Synopsis

Create a new application in your Replicated account.

This command allows you to initialize a new application that can be distributed
and managed using the KOTS platform. When you create a new app, it will be set up
with default configurations, which you can later customize.

The NAME argument is required and will be used as the application's name.

```
replicated app create NAME [flags]
```

### Examples

```
# Create a new app named "My App"
replicated app create "My App"

# Create a new app and output the result in JSON format
replicated app create "Another App" --output json

# Create a new app with a specific name and view details in table format
replicated app create "Custom App" --output table
```

### Options

```
  -h, --help            help for create
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