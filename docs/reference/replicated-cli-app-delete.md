import Token from "../partials/replicated-cli/_token.mdx"
import Help from "../partials/replicated-cli/_help.mdx"

# app delete

Delete an application.

## Usage
```bash
replicated app delete NAME
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td><code>-f, --force</code></td>
    <td></td>
    <td>Skip the confirmation prompt. This action cannot be undone.</td>
  </tr>
  <Token/>
</table>

## Examples
```bash
replicated app delete deletion-example
  • Fetching App ✓
ID                             NAME                        SLUG                        SCHEDULER
1xyAIzrmbvqHzzcKPbTmmrTxhl4    deletion-example            deletion-example            kots
Delete the above listed application? There is no undo: yes█
  • Deleting App ✓
```
