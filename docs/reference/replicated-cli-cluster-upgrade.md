import Help from "../partials/replicated-cli/_help.mdx"


# cluster upgrade (Beta)

Upgrade cluster version for compatibility testing.

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
  <Help/>
  <tr>
    <td>--dry-run</td>
    <td></td>
    <td>The dry run option runs a simulated test to verify that your inputs are valid without actually creating a cluster.</td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>(Required) Kubernetes version to upgrade to (format is distribution dependent). For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Clusters and Requirements (Beta)</a>.</td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>duration</td>
    <td>Wait duration for cluster to be ready (leave empty to not wait)</td>
  </tr>
</table>

## Examples

- For a kURL distribution:

  ```bash
  replicated cluster upgrade upgrade cabb74d5 --version 9d5a44c
  ```
