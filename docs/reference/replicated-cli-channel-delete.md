import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# channel delete

Delete (archive) a channel.

## Usage
```bash
replicated channel rm CHANNEL_ID
```

:::note
You must use the channel ID to delete the channel, not the channel name.
:::

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples
```bash
replicated channel rm 1xyB2Mgbg9N7rExShfbdBYIuzeW
Channel 1xyB2Mgbg9N7rExShfbdBYIuzeW successfully archived
```
