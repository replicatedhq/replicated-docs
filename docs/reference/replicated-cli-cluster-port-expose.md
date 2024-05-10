import Help from "../partials/replicated-cli/\_help.mdx"

# cluster port expose

Expose a port on a cluster to the public internet.

This command will create a DNS entry and TLS certificate (if "https") for the specified port on the cluster.

A wildcard DNS entry and TLS certificate can be created by specifying the "--wildcard" flag. This will take extra time to provision.

_NOTE: This feature currently only supports VM cluster distributions._

## Usage

```bash
replicated cluster port expose CLUSTER_ID --port PORT [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>--port</td>
    <td>string</td>
    <td>Port to expose. <strong>(Required)</strong></td>
  </tr>
  <tr>
    <td>--protocol</td>
    <td>string</td>
    <td>Protocol to expose (valid values are "http" and "https"). Specify multiple or separate values with commas.</td>
  </tr>
  <tr>
    <td>--wildcard</td>
    <td>bool</td>
    <td>Create a wildcard DNS entry and TLS certificate for this port.</td>
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
$ replicated cluster port expose 05929b24 --port 8080 --protocol https --wildcard
ID              CLUSTER PORT    PROTOCOL        EXPOSED PORT                                           WILDCARD        STATUS
d079b2fc        8080            https           https://happy-germain.ingress.replicatedcluster.com    true            pending
```
