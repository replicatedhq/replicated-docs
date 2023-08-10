import Help from "../partials/replicated-cli/_help.mdx"


# cluster create (Beta)

Create clusters for compatibility testing.

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
    <td>The type of instance to use for nodes in the cluster, such as x5.xlarge for EKS. For VM-based clusters, see <a href="/vendor/testing-replicated-instance-types">Replicated Instance Types</a>.</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td>--node-count</td>
    <td>integer</td>
    <td>The node count. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. <strong>Valid values:</strong> json or table. <strong>Default:</strong> table</td>
  </tr>
  <tr>
    <td>--ttl</td>
    <td>string</td>
    <td>The cluster Time to Live (TTL) duration, in hours, before the cluster is automatically deleted by the service. TTL starts when the cluster is in a Ready state. <strong>Valid values:</strong> 1 - 48. <strong>Default:</strong> 1</td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>The Kubernetes version to provision. For OpenShift clusters, provide the supported OpenShift version. The format is distribution dependent. <strong>Default:</strong> v1.25.3<br></br><br></br>For supported versions, see <a href="/vendor/testing-supported-clusters">Supported Clusters</a>.</td>
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
    replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m5.xlarge
    ```

- For a kind cluster:

  ```bash
  replicated cluster create --name kind-example --distribution kind --version 1.26.2 --node-count 3 --instance-type r1.large
  ```

