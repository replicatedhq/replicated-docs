import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# cluster upgrade

Upgrade cluster version for compatibility testing. For more information, see [About Compatibility Matrix](/vendor/testing-about).

## Usage
```bash
replicated cluster upgrade ID [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>--dry-run</code></td>
    <td></td>
    <td>The dry run option runs a simulated test to verify that your inputs are valid without actually creating a cluster.</td>
  </tr>
  <tr>
    <td><code>--version</code></td>
    <td>string</td>
    <td>(Required) Kubernetes version to upgrade to (format is distribution dependent). For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Compatibility Matrix Cluster Types (Beta)</a>.</td>
  </tr>
  <tr>
    <td><code>--wait</code></td>
    <td>duration</td>
    <td>Wait duration for cluster to be ready (leave empty to not wait)</td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

## Examples

For a kURL distribution:

```bash
replicated cluster upgrade cabb74d5 --version 9d5a44c
```
