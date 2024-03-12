import Help from "../partials/replicated-cli/_help.mdx"
import Output from "../partials/replicated-cli/_output.mdx"

# cluster create

Create clusters for compatibility testing. For more information, see [About the Compatibility Matrix](/vendor/testing-about).

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
    <td>--disk</td>
    <td>integer</td>
    <td>The disk size (GiB) to request per node. <strong>Default:</strong> 50</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>The Kubernetes cluster distribution type to provision. <strong>Default:</strong> kind</td>
  </tr>
  <tr>
    <td>--dry-run</td>
    <td></td>
    <td>The dry run option runs a simulated test to verify that your inputs are valid without actually creating a cluster.</td>
  </tr>
  <tr>
    <td>--instance-type</td>
    <td>string</td>
    <td>The type of instance to use for nodes in the cluster. For supported instance types, see <a href="/vendor/testing-supported-clusters">Supported Compatibility Matrix Cluster Types (Beta)</a>.</td>
  </tr>
  <tr>
    <td>--license</td>
    <td>string</td>
    <td>A valid customer license ID. Required for installing releases in clusters that use the Replicated embedded cluster distribution. The customer must be assigned to the channel where the target release is promoted.</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td>--nodes</td>
    <td>integer</td>
    <td>The node count. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td>--min-nodes</td>
    <td>string</td>
    <td>Minimum Node count (only for EKS, AKS and GKE clusters).</td>
  </tr>
  <tr>
    <td>--max-nodes</td>
    <td>string</td>
    <td>Maximum Node count (only for EKS, AKS and GKE clusters).</td>
  </tr>
  <tr>
    <td>--nodegroup</td>
    <td>string</td>
    <td>Node group to create (name=?,instance-type=?,nodes=?,min-nodes=?,max-nodes=?,disk=? format, can be specified multiple times)</td>
  </tr>
  <Output/>
  <tr>
    <td>--tag</td>
    <td>string</td>
    <td>Tag to apply to the cluster (key=value format, can be specified multiple times)</td>
  </tr>
  <tr>
    <td>--ttl</td>
    <td>string</td>
    <td><p>The cluster Time to Live (TTL) duration, in hours or minutes. When the TTL expires, the cluster is automatically deleted.</p><p> <strong>Valid values:</strong> 10m through 48h. For example, <code>10h</code> or <code>120min</code>.  TTL starts when the cluster is in a Ready state. <strong>Valid values:</strong> 1h through 48h. <strong>Default:</strong> 1h</p></td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>The Kubernetes version to provision. For OpenShift clusters, provide the supported OpenShift version. The format is distribution dependent. For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Compatibility Matrix Cluster Types</a>.</td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>duration</td>
    <td>The wait duration for the cluster to be ready. Leave the value empty to avoid waiting.</td>
  </tr>
</table>

## Examples

- For an EKS distribution:

  ```bash
  replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m6i.large
  ```

- For an EKS distribution with an additional node group:

  ```bash
  replicated cluster create --name eks-nodegroup-example --distribution eks --instance-type m6i.large --nodes 1 --nodegroup name=arm,instance-type=m7g.large,nodes=1,disk=50
  ```

- For a kind distribution:

  ```bash
  replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
  ```

- For a Replicated embedded cluster distribution:

```bash
replicated cluster create --distribution embedded-cluster --license-id <license-id>
```
