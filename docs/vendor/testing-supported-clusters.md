# Supported Clusters

The compatibility matrix provisions ephemeral clusters for testing that are cloud-based or virtual machines that run in the Replicated cloud account.

## Kubernetes Version Support Policy

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in the compatibility matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.

## VM Clusters

VM clusters are hosted on Replicated bare metal servers in the EU. This section lists the supported VM clusters for compatibility testing.

### kind

The compatibility matrix supports creating single-node [kind](https://kind.sigs.k8s.io/) clusters.

<table>
  <tr>
    <th>Supported kind Versions</th>
    <td>0.18.0</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Version</th>
    <td>v1.25.0, v1.25.1, v1.25.2, v1.25.3, v1.25.4, v1.25.5, v1.25.6, v1.25.7, v1.25.8, v1.26.0, v1.26.1, v1.26.2, v1.26.3, v1.27.0</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-about#limitations">Limitations</a></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Smoke tests</td>
  </tr>
  <tr>
    <th>Example Command</th>
    <td><code>replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type repl.small</code></td>
  </tr>
</table>

### k3s

The compatibility matrix supports creating single-node [k3s](https://k3s.io) clusters.

<table>
  <tr>
    <th>Supported k3s Versions</th>
    <td>The upstream k8s version that matches the Kubernetes version requested.</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Version</th>
    <td>v1.24.0, v1.25.0, v1.26.0</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>You can only choose a minor version, not a patch version. The K3s installer chooses the latest patch for that minor version. (See https://docs.k3s.io/upgrades/manual.). For more limitations, see <a href="testing-about#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td><ul><li>Smoke tests</li><li>Customer release tests</li></ul></td>
  </tr>
  <tr>
    <th>Example Command</th>
    <td><code>replicated cluster create --name k3s-example --distribution k3s --version 1.24 --disk 100 --instance-type repl.small</code></td>
  </tr>
</table>

### OpenShift OKD

The compatibility matrix supports creating single-node [Red Hat OpenShift OKD](https://www.okd.io/) clusters, which is the community distribution of OpenShift, using CodeReady Containers (CRC). 

<table>
  <tr>
    <th>Supported OKD Versions</th>
    <td>4.13.0-okd</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Version</th>
    <td>???</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-about#limitations">Limitations</a></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
  <tr>
    <th>Example Command</th>
    <td><code>replicated cluster create --name openshift-example --distribution openshift --version 4.13.0-okd --disk 100 --instance-type repl.medium
</code></td>
  </tr>
</table>


## Cloud Clusters

This section lists the supported cloud clusters for compatibility testing.

### EKS

The compatibility matrix supports creating [AWS EKS](https://aws.amazon.com/eks/?nc2=type_a) clusters.

<table>
  <tr>
    <th>Supported EKS Versions</th>
    <td>???</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>v1.22.0, v1.23.0, v1.24.0, v1.25.0, v1.26.0, v1.27.0</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>You can only choose a minor version, not a patch version. The EKS installer chooses the latest patch for that minor version. For more limitations, see <a href="testing-about#limitations">Limitations</a>.</td>
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
  <tr>
    <th>Example Command</th>
    <td><code>replicated cluster create --name eks-example --distribution eks --version 1.27 --node-count 3 --instance-type m5.xlarge</code></td>
  </tr>
</table>
