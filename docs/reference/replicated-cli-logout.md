import Help from "../partials/replicated-cli/_help.mdx"

# logout

Remove any credentials created by the [`replicated login`](/reference/replicated-cli-login) command.

## Usage

```bash
replicated logout [flags]
```

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

```bash
replicated logout
Error: REPLICATED_API_TOKEN is set. Please unset it to logout.
```