import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# instance ls

List customer instances

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
  <tr>
    <td><code>--customer</code></td>
    <td>string</td>
    <td>Customer Name or ID to list instances for.</td>
  </tr>
  <tr>
    <td><code>--tag</code></td>
    <td>string</td>
    <td>Tags to filter instances. Multiple <code>--tag</code> flags can be specified. Only one of the tags has to match per instance.</td>
  </tr>
  <tr>
    <td><code>--output</code></td>
    <td>string</td>
    <td>The output format to use. One of: <code>json|table</code> (default: <code>table</code>)</td>
  </tr>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples

```bash
replicated instance ls --customer ci-customer
```

```bash
replicated instance ls --customer 2ULcKDT6snYYy5Zsdx3xuc3fffl --tag manager=joe --tag role=support
```
