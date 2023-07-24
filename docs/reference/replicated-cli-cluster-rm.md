import Help from "../partials/replicated-cli/_help.mdx"


# cluster rm

Remove the test clusters. You can delete multiple clusters at a time.

## Usage

```bash
replicated cluster rm ID [ID...] [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--force</td>
    <td></td>
    <td>force remove cluster</td>
  </tr>
</table>

## Example

```bash
replicated cluster rm 1234567890 --force
```