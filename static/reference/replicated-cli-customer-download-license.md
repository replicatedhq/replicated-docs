# replicated customer download-license

Download a customer's license

### Synopsis

The download-license command allows you to retrieve and save a customer's license.

This command fetches the license for a specified customer and either outputs it
to stdout or saves it to a file. The license contains crucial information about
the customer's subscription and usage rights.

You must specify the customer using either their name or ID with the --customer flag.

```
replicated customer download-license [flags]
```

### Examples

```
# Download license for a customer by ID and output to stdout
replicated customer download-license --customer cus_abcdef123456

# Download license for a customer by name and save to a file
replicated customer download-license --customer "Acme Inc" --output license.yaml

# Download license for a customer in a specific app (if you have multiple apps)
replicated customer download-license --app myapp --customer "Acme Inc" --output license.yaml
```

### Options

```
      --customer string   The Customer Name or ID
  -h, --help              help for download-license
  -o, --output string     Path to output license to. Defaults to stdout (default "-")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated customer](replicated-cli-customer)	 - Manage customers