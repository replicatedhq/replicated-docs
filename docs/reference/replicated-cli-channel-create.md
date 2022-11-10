import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# channel create

Create a new channel in your application, and then print the channel.

## Usage
```bash
replicated channel create --name Beta --description 'New features subject to change'
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--description</code></td>
    <td>string</td>
    <td>A longer description of this channel</td>
  </tr>
  <tr>
    <td><code>--name</code></td>
    <td>string</td>
    <td>The name of this channel. <strong>(Required)</strong></td>
  </tr>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples
```bash
replicated channel create --name cli-created --description "this is a description for a channel"
ID                             NAME           RELEASE    VERSION
1xyB2Mgbg9N7rExShfbdBYIuzeW    cli-created    1          0.0.1
```
