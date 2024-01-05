import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# instance inspect

Show full details for a customer instance.

## Usage

```
instance inspect [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <App/>
  <tr>
    <td><code>--customer</code></td>
    <td>string</td>
    <td>Customer Name or ID that instance belongs to.</td>
  </tr>
  <Help/>
  <tr>
    <td><code>--instance</code></td>
    <td>string</td>
    <td>Instance Name or ID to inspect.</td>
  </tr>
  <tr>
    <td><code>--output</code></td>
    <td>string</td>
    <td>The output format to use: <code>json</code> or <code>table</code>. <strong>Default:</strong> <code>table</code></td>
  </tr>
  <Token/>
</table>

## Example

```bash
replicated instance inspect --customer ci-customer --instance ci-instance --output json
```
