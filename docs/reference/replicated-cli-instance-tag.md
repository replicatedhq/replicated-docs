import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"

# instance tag

Add or remove instance tags

## Usage

```
instance tag [flags]
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
    <td>Customer Name or ID that instance belongs to.</td>
  </tr>
  <tr>
    <td><code>--instance</code></td>
    <td>string</td>
    <td>Instance Name or ID to add or remove tags.</td>
  </tr>
  <tr>
    <td><code>--tag</code></td>
    <td>string</td>
    <td>Tags to apply to instance. Leave value empty to remove tag. Tags not specified will not be removed or modified.</td>
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
replicated instance tag --customer ci-customer --instance ci-instance --tag tag-to-set=value tag-to-remove=
```

