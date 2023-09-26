import Help from "../partials/replicated-cli/_help.mdx"


# cluster version (Beta)

List the supported clusters versions available for compatiblity testing. For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage

```bash
replicated cluster versions [flags]
```

  <table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Value values:</strong> json or table. <strong>Default:</strong> table</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>The Kuberntes distribution to filter by. For example, <code>openshift</code></td>
  </tr>
</table>

## Example

```bash
replicated cluster versions --distribution openshift

Supported Kubernetes distributions and versions are:
DISTRIBUTION: openshift
• VERSIONS: 4.13.0-okd
• INSTANCE TYPES: r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge
• MAX NODES: 1
```
                 
