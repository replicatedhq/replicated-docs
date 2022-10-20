import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# registry rm

Removes a registry by endpoint.

## Usage

```
replicated registry rm [ENDPOINT] [flags]
```

Replace ENDPOINT with the name of the endpoint, such as gcr.io.

The following flags are supported:

<table>
  <tr>
    <th width="15%">Flag</th>
    <th width="15%">Type</th>
    <th width="70%">Description</th>
  </tr>
  <App/>
  <tr>
    <td>-h, --help</td>
    <td></td>
    <td>Help for <code>rm</code>.</td>
  </tr>
  <Token/>
</table>
