import Token from "../partials/replicated-cli/_token.mdx"
import Help from "../partials/replicated-cli/_help.mdx"

# cluster ls

List all clusters that are running, starting, or queued in the account.

Recently terminated clusters will be included by default. After approximately 6 hours, terminated clusters
will be removed from the output and no longer available to view.

## Usage
```bash
replicated cluster ls
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--hide-terminated</code></td>
    <td></td>
    <td>When set, this will hide all reently terminated clusters from the output.</td>
  </tr>
  <Help/>
  <Token/>
</table>

## Examples

List all clusters:
```bash
replicated cluster ls
ID       NAME          STATUS
abcdef   kind-pr211    running
```


