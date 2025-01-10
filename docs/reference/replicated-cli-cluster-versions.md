import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# cluster versions

List the supported clusters versions available for compatibility testing. For more information, see [About Compatibility Matrix](/vendor/testing-about).

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
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Value values:</strong> json or table. <strong>Default:</strong> table</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>The Kubernetes distribution to filter by. For example, <code>openshift</code></td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

## Example

```bash
replicated cluster versions --distribution openshift

Supported Kubernetes distributions and versions are:
DISTRIBUTION: openshift
• VERSIONS: 4.13.0-okd
• INSTANCE TYPES: r1.medium, r1.large, r1.xlarge, r1.2xlarge
• MAX NODES: 1
```
                 
