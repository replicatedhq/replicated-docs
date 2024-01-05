import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# instance ls

List customer instances.

## Usage

```
instance ls [flags]
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
    <td>Customer Name or ID to list instances for.</td>
  </tr>
  <Help/>
  <tr>
    <td><code>--output</code></td>
    <td>string</td>
    <td>The output format to use: <code>json</code> or <code>table</code>. <strong>Default:</strong> <code>table</code></td>
  </tr>
  <tr>
    <td><code>--tag</code></td>
    <td>string</td>
    <td>Tags to filter instances. Multiple <code>--tag</code> flags can be specified. Only one of the tags must match per instance.</td>
  </tr>
  <Token/>
</table>

## Examples

```bash
replicated instance ls --customer ci-customer
```

```bash
replicated instance ls --customer 2ULcKDT6snYYy5Zsdx3xuc3fffl --tag manager=joe --tag role=support
```
