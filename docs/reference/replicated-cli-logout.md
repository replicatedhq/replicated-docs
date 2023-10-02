import Help from "../partials/replicated-cli/_help.mdx"

# logout

Remove any credentials created by the [`replicated login`](/reference/replicated-cli-login) command.

## Usage

```bash
replicated logout [flags]
```

:::note
If the `REPLICATED_API_TOKEN` environment variable is set, the `replicated logout` command displayed the following error: `Error: REPLICATED_API_TOKEN is set. Please unset it to logout.` For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).
:::

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
</table>

## Examples

```bash
replicated logout
```