# replicated channel un-demote

Un-demote a release from a channel

### Synopsis

Un-demote a channel release from a channel using a channel sequence or release sequence.

```
replicated channel un-demote CHANNEL_ID_OR_NAME [flags]
```

### Examples

```
  # Un-demote a release from a channel by channel sequence
  replicated channel release un-demote Beta --channel-sequence 15

  # Un-demote a release from a channel by release sequence
  replicated channel release un-demote Beta --release-sequence 12
```

### Options

```
      --channel-sequence int   The channel sequence to un-demote
  -h, --help                   help for un-demote
      --release-sequence int   The release sequence to un-demote
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated channel](replicated-cli-channel)	 - List channels