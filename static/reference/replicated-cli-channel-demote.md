# replicated channel demote

Demote a release from a channel

### Synopsis

Demote a channel release from a channel using a channel sequence or release sequence.

```
replicated channel demote CHANNEL_ID_OR_NAME [flags]
```

### Examples

```
  # Demote a release from a channel by channel sequence
  replicated channel release demote Beta --channel-sequence 15

  # Demote a release from a channel by release sequence
  replicated channel release demote Beta --release-sequence 12
```

### Options

```
      --channel-sequence int   The channel sequence to demote
  -h, --help                   help for demote
      --release-sequence int   The release sequence to demote
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated channel](replicated-cli-channel)	 - List channels