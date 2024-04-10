import Help from "../partials/replicated-cli/_help.mdx"

# cluster addon rm

Remove cluster add-on by ID

## Usage

```bash
replicated cluster addon rm CLUSTER_ID --id ADDON_ID [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--id</td>
    <td>string</td>
    <td>The ID of the cluster add-on to remove. <strong>(Required)</strong></td>
  </tr>
  <Help/>
</table>

## Example

```bash
replicated cluster addon rm 4d2f7e70 --id 05929b24
Add-on 05929b24 has been deleted
```
