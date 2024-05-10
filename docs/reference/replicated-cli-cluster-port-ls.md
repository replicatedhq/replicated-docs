import Help from "../partials/replicated-cli/_help.mdx"

# cluster port ls

List cluster ports for a cluster

## Usage

```bash
replicated cluster port ls CLUSTER_ID [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
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
$ replicated cluster port ls 05929b24
ID              CLUSTER PORT    PROTOCOL        EXPOSED PORT                                                   WILDCARD        STATUS
d079b2fc        8080            https           https://happy-germain.ingress.replicatedcluster.com            true            pending
0baa3e98        8080            http            http://romantic-hellman.ingress.replicatedcluster.com          false           ready
0baa3e98        8080            https           https://romantic-hellman.ingress.replicatedcluster.com         false           ready
```
