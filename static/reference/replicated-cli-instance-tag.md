# replicated instance tag

tag an instance

### Synopsis

remove or add instance tags

```
replicated instance tag [flags]
```

### Options

```
      --customer string   Customer Name or ID
  -h, --help              help for tag
      --instance string   Instance Name or ID
  -o, --output string     The output format to use. One of: json|table (default "table")
      --tag stringArray   Tags to apply to instance. Leave value empty to remove tag. Tags not specified will not be removed.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated instance](replicated-cli-instance)	 - Manage instances