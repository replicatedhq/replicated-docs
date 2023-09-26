import Help from "../partials/replicated-cli/_help.mdx"

# login

Open a browser for collecting authentication details. Then, create and retrieve an API token to authorize the replicated CLI.

## Usage

```bash
replicated login [flags]
```

Where `SEQUENCE` is the sequence number for the target release.

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
</table>

## Example

```bash
replicated login
```