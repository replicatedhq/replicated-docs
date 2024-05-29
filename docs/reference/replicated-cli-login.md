import Help from "../partials/replicated-cli/_help.mdx"

# login

Open a browser for collecting authentication details, then create and retrieve an API token to authorize the Replicated CLI. [`replicated logout`](/reference/replicated-cli-logout) removes the credentials created by `replicated login`.

`replicated login` can be used instead of generating an API token and setting the `REPLICATED_API_TOKEN` environment variable. For more information, see [Installing the Replicated CLI](/reference/replicated-cli-installing).

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