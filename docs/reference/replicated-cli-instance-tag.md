import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

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
    <td><code>--output</code></td>
    <td>string</td>
    <td>The output format to use: <code>json</code> or <code>table</code>. <strong>Default:</strong> <code>table</code></td>
  </tr>
  <tr>
    <td><code>--tag</code></td>
    <td>string</td>
    <td>Tags to apply to the instance. Leave value empty to remove tag. Tags not specified are removed or modified.</td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

## Example

```bash
replicated instance tag --customer ci-customer --instance ci-instance --tag tag-to-set=value tag-to-remove=
```

