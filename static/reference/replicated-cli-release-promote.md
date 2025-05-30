# replicated release promote

Set the release for a channel

### Synopsis

Set the release for a channel

```
replicated release promote SEQUENCE CHANNEL_ID [flags]
```

### Examples

```
replicated release promote 15 fe4901690971757689f022f7a460f9b2
```

### Options

```
  -h, --help                   help for promote
      --optional               If set, this release can be skipped
      --release-notes string   The **markdown** release notes
      --required               If set, this release can't be skipped
      --version string         A version label for the release in this channel
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated release](replicated-cli-release)	 - Manage app releases