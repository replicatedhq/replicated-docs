# replicated customer archive

Archive a customer

### Synopsis

Archive a customer for the current application.

This command allows you to archive a customer record. Archiving a customer
will make their license inactive and remove them from active customer lists.
This action is reversible - you can unarchive a customer later if needed.

The customer can be specified by either their name or ID.

```
replicated customer archive <customer_name_or_id> [flags]
```

### Examples

```
# Archive a customer by name
replicated customer archive "Acme Inc"

# Archive a customer by ID
replicated customer archive cus_abcdef123456

# Archive multiple customers by ID
replicated customer archive cus_abcdef123456 cus_xyz9876543210

# Archive a customer in a specific app (if you have multiple apps)
replicated customer archive --app myapp "Acme Inc"
```

### Options

```
      --app string   The app to archive the customer in (not required when using a customer id)
  -h, --help         help for archive
```

### Options inherited from parent commands

```
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated customer](replicated-cli-customer)	 - Manage customers