import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# channel rm (delete)

Delete (archive) a channel.

## Usage
```bash
replicated channel rm CHANNEL_ID
```
```bash
replicated channel delete CHANNEL_ID
```

:::note
You must use the channel ID to delete the channel, not the channel name.
:::

## Global Flags

<GlobalFlags/>

## Examples
```bash
replicated channel rm 1xyB2Mgbg9N7rExShfbdBYIuzeW
Channel 1xyB2Mgbg9N7rExShfbdBYIuzeW successfully archived
```
