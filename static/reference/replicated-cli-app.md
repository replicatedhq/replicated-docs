# replicated app

Manage applications

### Synopsis

The app command allows you to manage applications in your Replicated account.

This command provides a suite of subcommands for creating, listing, updating, and
deleting applications. You can perform operations such as creating new apps,
viewing app details, modifying app settings, and removing apps from your account.

Use the various subcommands to:
- Create new applications
- List all existing applications
- View details of a specific application
- Update application settings
- Delete applications from your account

### Examples

```
# List all applications
replicated app ls

# Create a new application
replicated app create "My New App"

# View details of a specific application
replicated app inspect "My App Name"

# Delete an application
replicated app delete "App to Remove"

# Update an application's settings
replicated app update "My App" --channel stable

# List applications with custom output format
replicated app ls --output json
```

### Options

```
  -h, --help   help for app
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated](replicated)	 - Manage your Commercial Software Distribution Lifecycle using Replicated
* [replicated app create](replicated-cli-app-create)	 - Create a new application
* [replicated app ls](replicated-cli-app-ls)	 - List applications
* [replicated app rm](replicated-cli-app-rm)	 - Delete an application