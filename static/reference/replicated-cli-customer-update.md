# replicated customer update

Update an existing customer

### Synopsis

Update an existing customer's information and settings.

	This command allows you to modify various attributes of a customer, including their name,
	custom ID, assigned channels, license type, and feature flags. You can update expiration dates,
	enable or disable specific features, and change channel assignments.

	The --customer flag is required to specify which customer to update.

```
replicated customer update --customer <id> --name <name> [options] [flags]
```

### Examples

```
# Update a customer's name
replicated customer update --customer cus_abcdef123456 --name "New Company Name"

# Change a customer's channel and make it the default
replicated customer update --customer cus_abcdef123456 --channel stable --default-channel stable

# Enable airgap installations for a customer
replicated customer update --customer cus_abcdef123456 --airgap

# Update multiple attributes at once
replicated customer update --customer cus_abcdef123456 --name "Updated Corp" --type paid --channel enterprise --airgap --snapshot

# Set an expiration date for a customer's license
replicated customer update --customer cus_abcdef123456 --expires-in 8760h

# Update a customer and output the result in JSON format
replicated customer update --customer cus_abcdef123456 --name "JSON Corp" --output json
```

### Options

```
      --airgap                      If set, the license will allow airgap installs.
      --channel stringArray         Release channel to which the customer should be assigned (can be specified multiple times)
      --custom-id string            Set a custom customer ID to more easily tie this customer record to your external data systems
      --customer string             The ID of the customer to update
      --default-channel string      Which of the specified channels should be the default channel. if not set, the first channel specified will be the default channel.
      --developer-mode              If set, Replicated SDK installed in dev mode will use mock data.
      --email string                Email address of the customer that is to be updated.
      --embedded-cluster-download   If set, the license will allow embedded cluster downloads.
      --ensure-channel              If set, channel will be created if it does not exist.
      --expires-in duration         If set, an expiration date will be set on the license. Supports Go durations like '72h' or '3600m'
      --geo-axis                    If set, the license will allow Geo Axis usage.
      --gitops                      If set, the license will allow the GitOps usage.
      --helm-install                If set, the license will allow Helm installs.
      --helmvm-cluster-download     If set, the license will allow helmvm cluster downloads.
  -h, --help                        help for update
      --identity-service            If set, the license will allow Identity Service usage.
      --kots-install                If set, the license will allow KOTS install. Otherwise license will allow Helm CLI installs only. (default true)
      --kurl-install                If set, the license will allow kURL installs.
      --name string                 Name of the customer
  -o, --output string               The output format to use. One of: json|table (default "table")
      --snapshot                    If set, the license will allow Snapshots.
      --support-bundle-upload       If set, the license will allow uploading support bundles.
      --type string                 The license type to update. One of: dev|trial|paid|community|test (default: dev) (default "dev")
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated customer](replicated-cli-customer)	 - Manage customers