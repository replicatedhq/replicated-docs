import Help from "../partials/replicated-cli/_help.mdx"

# cluster port rm

Remove cluster port by ID

## Usage

```bash
replicated cluster port rm CLUSTER_ID --id PORT_ID [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>--id</td>
    <td>string</td>
    <td>ID of the port to remove. <strong>(Required)</strong></td>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Value values:</strong> json, table or wide. <strong>Default:</strong> table</td>
  </tr>
  <Help/>
</table>

## Example

```bash
$ replicated cluster port rm 05929b24 --id d079b2fc
ID              CLUSTER PORT    PROTOCOL        EXPOSED PORT                                                   WILDCARD        STATUS
0baa3e98        8080            http            http://romantic-hellman.ingress.replicatedcluster.com          false           ready
0baa3e98        8080            https           https://romantic-hellman.ingress.replicatedcluster.com         false           ready
```
