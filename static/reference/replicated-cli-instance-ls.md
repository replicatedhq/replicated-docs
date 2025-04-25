# replicated instance ls

list customer instances

### Synopsis

list customer instances

```
replicated instance ls [flags]
```

### Aliases

```
ls, list
```

### Options

```
      --customer string   Customer Name or ID
  -h, --help              help for ls
  -o, --output string     The output format to use. One of: json|table (default "table")
      --tag stringArray   Tags to use to filter instances (key=value format, can be specified multiple times). Only one tag needs to match (an OR operation)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated instance](replicated-cli-instance)	 - Manage instances