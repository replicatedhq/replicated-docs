# replicated api patch

Make ad-hoc PATCH API calls to the Replicated API

### Synopsis

This is essentially like curl for the Replicated API, but
uses your local credentials and prints the response unmodified.

We recommend piping the output to jq for easier reading.

Pass the PATH of the request as the final argument. Do not include the host or version.

```
replicated api patch [flags]
```

### Examples

```
replicated api patch /v3/customer/2VffY549paATVfHSGpJhjh6Ehpy -b '{"name":"Valuable Customer"}'
```

### Options

```
  -b, --body string   JSON body to send with the request
  -h, --help          help for patch
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated api](replicated-cli-api)	 - Make ad-hoc API calls to the Replicated API