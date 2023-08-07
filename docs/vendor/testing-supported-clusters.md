# Supported Clusters (Beta)

The compatibility matrix provisions ephemeral clusters for testing that are cloud-based or virtual machines (VMs).

## Kubernetes Version Support Policy

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in the compatibility matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.

## VM Clusters

This section lists the supported VM clusters for compatibility testing.

### kind

The compatibility matrix supports creating single-node [kind](https://kind.sigs.k8s.io/) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.25, 1.25.1, 1.25.2, 1.25.3, 1.25.4, 1.25.5, 1.25.6, 1.25.7, 1.25.8, 1.26, 1.26.1, 1.26.2, 1.26.3, 1.27</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-how-to#limitations">Limitations</a></td>
  </tr>
  <tr>
    <th>Node and Supported Instance Types</th>
    <td><ul><li>Specify a Replicated instance type for the nodes.
</li></ul></td>
  </tr>  
  <tr>
    <th>Common Use Cases</th>
    <td>Smoke tests</td>
  </tr>
</table>

### k3s

The compatibility matrix supports creating single-node [k3s](https://k3s.io) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported k3s Versions</th>
    <td>The upstream k8s version that matches the Kubernetes version requested.</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.24, 1.25, 1.26</td>
  </tr>
  <tr>
    <th>Node and Supported Instance Types</th>
    <td><ul><li>Specify a Replicated instance type for the nodes.
</li></ul></td>
  </tr>  
  <tr>
    <th>Limitations</th>
    <td>You can only choose a minor version, not a patch version. The K3s installer chooses the latest patch for that minor version. See <a href="https://docs.k3s.io/upgrades/manual">k3s</a>.<br></br><br></br>For additional limitations, see <a href="testing-how-to#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td><ul><li>Smoke tests</li><li>Customer release tests</li></ul></td>
  </tr>
</table>

### OpenShift OKD

The compatibility matrix supports creating single-node [Red Hat OpenShift OKD](https://www.okd.io/) clusters, which is the community distribution of OpenShift, using CodeReady Containers (CRC). 

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported OpenShift Version</th>
    <td>4.13.0-okd</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-how-to#limitations">Limitations</a></td>
  </tr>
  <tr>
    <th>Node and Supported Instance Types</th>
    <td><ul><li>Specify a Replicated instance type for the nodes.
</li></ul></td>
  </tr>  
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>


### Helm VM

The compatibility matrix supports creating single-node [HelmVM](https://github.com/replicatedhq/helmbin) clusters, which is a version of Kubernetes that has a Helm chart embedded and runs as a single binary.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported HelmVM Version</th>
    <td>1.27</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-how-to#limitations">Limitations</a></td>
  </tr>
  <tr>
    <th>Node and Supported Instance Types</th>
    <td><ul><li>Specify a Replicated instance type for the nodes.
</li></ul></td>
  </tr>  
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>


## Cloud Clusters

This section lists the supported cloud clusters for compatibility testing.

### EKS

The compatibility matrix supports creating [AWS EKS](https://aws.amazon.com/eks/?nc2=type_a) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.22, 1.23, 1.24, 1.25, 1.26, 1.27</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>You can only choose a minor version, not a patch version. The EKS installer chooses the latest patch for that minor version.<br></br><br></br>For additional limitations, see <a href="testing-how-to#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Node and Supported Instance Types</th>
    <td><ul><li>You can specify more than one node.</li><li>Specify an AWS EC2 instance type for the nodes.
</li></ul></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>
