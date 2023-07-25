import Help from "../partials/replicated-cli/_help.mdx"


# cluster create

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
    <td>The disk size (GiB) to request per node. **Default:** 50</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>The Kubernetes cluster distribution type to provision. **Default:** kind)</td>
  </tr>
  <tr>
    <td>--dry-run</td>
    <td></td>
    <td>The dry run option runs a simulated test to test that your inputs are valid without actually creating the cluster.</td>
  </tr>
  <tr>
    <td>--instance-type</td>
    <td>string</td>
    <td>The type of instance to use for cloud-based clusters, such as x5.xlarge.</td>
  </tr>
  <tr>
    <td>--memory</td>
    <td>integer</td>
    <td>The amount of memory (GiB) to request per node. **Default:** 4</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td>--node-count</td>
    <td>integer</td>
    <td>The node count. **Default:** 1</td>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. **Valid values:** json or table. **Default:** table</td>
  </tr>
  <tr>
    <td>--ttl</td>
    <td>string</td>
    <td>The cluster Time to Live (TTL) duration, in hours, before the cluster is automatically deleted by the service. TTL starts when the cluster is in a Ready state. **Valid values:** 1 - 48. **Default:** 2</td>
  </tr>
  <tr>
    <td>--vcpu</td>
    <td>integer</td>
    <td>The number of vCPUs to request per node. **Default:** 4</td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>The Kubernetes version to provision. The format is distribution dependent. **Default:** v1.25.3</td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>duration</td>
    <td>The wait duration for the cluster to be ready. Leave the value empty to avoid waiting.</td>
  </tr>
</table>

## Example

```bash
replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m5.xlarge
```