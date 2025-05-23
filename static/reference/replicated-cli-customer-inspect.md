# replicated customer inspect

Show detailed information about a specific customer

### Synopsis

The inspect command provides comprehensive details about a customer.

	This command retrieves and displays full information about a specified customer,
	including their assigned channels, registry information, and other relevant attributes.
	It's useful for getting an in-depth view of a customer's configuration and status.

	You must specify the customer using either their name or ID with the --customer flag.

```
replicated customer inspect [flags]
```

### Examples

```
# Inspect a customer by ID
replicated customer inspect --customer cus_abcdef123456

# Inspect a customer by name
replicated customer inspect --customer "Acme Inc"

# Inspect a customer and output in JSON format
replicated customer inspect --customer cus_abcdef123456 --output json

# Inspect a customer for a specific app (if you have multiple apps)
replicated customer inspect --app myapp --customer "Acme Inc"
```

### Options

```
      --customer string   The Customer Name or ID
  -h, --help              help for inspect
  -o, --output string     The output format to use. One of: json|table (default "table")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated customer](replicated-cli-customer)	 - Manage customers