import Help from "../partials/replicated-cli/_help.mdx"


# cluster rm

Remove the test clusters. You can delete multiple clusters at a time. For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster rm [ID...] [flags]
```

Replace `ID` with the ID of the cluster from the output of the `replicated cluster ls` command. Or you can also remove using the name of the cluster or matching tag(s).

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--name</td>
    <td>stringArray</td>
    <td>Name of the cluster to remove (can be specified multiple times).</td>
  </tr>
  <tr>
    <td>--tag</td>
    <td>stringArray</td>
    <td>Tag of the cluster to remove (key=value format, can be specified multiple times).</td>
  </tr>
  <tr>
    <td>--all</td>
    <td></td>
    <td>Removes all clusters.</td>
  </tr>
</table>

## Example

```bash
replicated cluster rm 1234567890
```

```bash
replicated cluster rm --name qatesting
```

```bash
replicated cluster rm --all
```
