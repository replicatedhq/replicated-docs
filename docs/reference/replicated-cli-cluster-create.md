import Help from "../partials/replicated-cli/_help.mdx"


# cluster create (Beta)

Provision ephemeral clusters with the Replicated compatibility matrix. For more information, see [About the Compatibility Matrix](/vendor/testing-about).

## Usage
```bash
replicated cluster create [flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <Help/>
  <tr>
    <td><code>--disk</code></td>
    <td>integer</td>
    <td>The disk size (GiB) to request per node. <strong>Default:</strong> 50</td>
  </tr>
  <tr>
    <td><code>--distribution</code></td>
    <td>string</td>
    <td>The Kubernetes cluster distribution type to provision. <strong>Default:</strong> kind</td>
  </tr>
  <tr>
    <td><code>--dry-run</code></td>
    <td></td>
    <td>The dry run option runs a simulated test to verify that your inputs are valid without actually creating a cluster.</td>
  </tr>
  <tr>
    <td><code>--instance-type</code></td>
    <td>string</td>
    <td>The type of instance to use for nodes in the cluster. For supported instance types, see <a href="/vendor/testing-supported-clusters">Supported Compatibility Matrix Cluster Types (Beta)</a>.</td>
  </tr>
  <tr>
    <td><code>--name</code></td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td><code>--node-count</code></td>
    <td>integer</td>
    <td>The node count. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td><code>--output</code></td>
    <td>string</td>
    <td>The output format to use. <strong>Valid values:</strong> json or table. <strong>Default:</strong> table</td>
  </tr>
  <tr>
    <td><code>--ttl</code></td>
    <td>string</td>
    <td>When the Time to Live (TTL) expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in a <code>running</code> state. By default, the TTL is one hour. The maximum TTL is 48 hours.<strong>Valid values:</strong> 1 - 48. <strong>Default:</strong> 1</td>.
  </tr>
  <tr>
    <td><code>--version</code></td>
    <td>string</td>
    <td>(Required) The Kubernetes version to provision. For OpenShift clusters, provide the supported OpenShift version. The format is distribution dependent. For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Compatibility Matrix Cluster Types (Beta)</a>.</td>
  </tr>
  <tr>
    <td><code>--wait</code></td>
    <td>duration</td>
    <td>The wait duration for the cluster to be ready. Leave the value empty to avoid waiting.</td>
  </tr>
</table>

## Examples

- For an EKS distribution:

  ```bash
  replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m6i.large
  ```

- For a kind distribution:

  ```bash
  replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
  ```
