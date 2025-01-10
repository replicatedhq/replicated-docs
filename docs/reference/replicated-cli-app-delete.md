import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# app rm (delete)

Delete an application.

## Usage
```bash
replicated app rm APP_NAME
```
```bash
replicated app delete APP_NAME
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>-f, --force</code></td>
    <td></td>
    <td>Skip the confirmation prompt. This action cannot be undone.</td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

## Examples
```bash
replicated app delete deletion-example
  • Fetching App ✓
ID                             NAME                        SLUG                        SCHEDULER
1xyAIzrmbvqHzzcKPbTmmrTxhl4    deletion-example            deletion-example            kots
Delete the above listed application? There is no undo: yes█
  • Deleting App ✓
```
