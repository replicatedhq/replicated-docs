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
    <td>Disk Size (GiB) to request per node (Default: 50) (default 50)</td>
  </tr>
  <tr>
    <td>--distribution</td>
    <td>string</td>
    <td>Kubernetes distribution of the cluster to provision (default "kind")</td>
  </tr>
  <tr>
    <td>--dry-run</td>
    <td></td>
    <td>Dru run.</td>
  </tr>
  <tr>
    <td>--instance-type</td>
    <td>string</td>
    <td>the type of instance to use for cloud-based clusters (e.g. x5.xlarge)</td>
  </tr>
  <tr>
    <td>--memory</td>
    <td>integer</td>
    <td>Memory (GiB) to request per node (default 4)</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>The name of the cluster. If no name is specified, a name will be generated.</td>
  </tr>
  <tr>
    <td>--node-count</td>
    <td>integer</td>
    <td>Node count (default 1).</td>
  </tr>
  <tr>
    <td>--output</td>
    <td>string</td>
    <td>The output format to use. One of: json|table (default: table) (default "table").</td>
  </tr>
  <tr>
    <td>--ttl</td>
    <td>string</td>
    <td>Cluster TTL (duration, max 48h)</td>
  </tr>
  <tr>
    <td>--vcpu</td>
    <td>integer</td>
    <td>Number of vCPUs to request per node (default 4)</td>
  </tr>
  <tr>
    <td>--version</td>
    <td>string</td>
    <td>Kubernetes version to provision (format is distribution dependent) (default "v1.25.3")</td>
  </tr>
  <tr>
    <td>--wait</td>
    <td>duration</td>
    <td>Wait duration for cluster to be ready (leave empty to not wait)</td>
  </tr>
</table>

## Example

```bash
replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m5.xlarge
```