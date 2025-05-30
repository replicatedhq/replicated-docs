# replicated api post

Make ad-hoc POST API calls to the Replicated API

### Synopsis

This is essentially like curl for the Replicated API, but
uses your local credentials and prints the response unmodified.

We recommend piping the output to jq for easier reading.

Pass the PATH of the request as the final argument. Do not include the host or version.

```
replicated api post [flags]
```

### Examples

```
replicated api post /v3/app/2EuFxKLDxKjPNk2jxMTmF6Vxvxu/channel -b '{"name":"marc-waz-here"}'
```

### Options

```
  -b, --body string   JSON body to send with the request
  -h, --help          help for post
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated api](replicated-cli-api)	 - Make ad-hoc API calls to the Replicated API