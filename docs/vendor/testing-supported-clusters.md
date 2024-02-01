import Pool from "../partials/cmx/_openshift-pool.mdx"

# Supported Compatibility Matrix Cluster Types

This topic describes the supported Kubernetes distributions, Kubernetes versions, instance types, nodes, limitations, and common use cases for clusters created with the Replicated compatibility matrix. 

The compatibility matrix provisions cloud-based or virtual machine (VM) clusters.

## VM Clusters

This section lists the supported VM cluster distributions for clusters created with the compatiblity matrix.

### kind

The compatibility matrix supports creating [kind](https://kind.sigs.k8s.io/) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.25.11, 1.26.6, 1.27.3, 1.28.0, 1.29.0</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports a single node.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-about#limitations">Limitations</a></td>
  </tr>  
  <tr>
    <th>Common Use Cases</th>
    <td>Smoke tests</td>
  </tr>
</table>

### k3s

The compatibility matrix supports creating [k3s](https://k3s.io) clusters.

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
    <td>1.24.1, 1.24.2, 1.24.3, 1.24.4, 1.24.6, 1.24.7, 1.24.8, 1.24.9, 1.24.10, 1.24.11, 1.24.12, 1.24.13, 1.24.14, 1.24.15, 1.24.16, 1.24.17, 1.25.0, 1.25.2, 1.25.3, 1.25.4, 1.25.5, 1.25.6, 1.25.7, 1.25.8, 1.25.9, 1.25.10, 1.25.11, 1.25.12, 1.25.13, 1.25.14, 1.25.15, 1.25.16, 1.26.0, 1.26.1, 1.26.2, 1.26.3, 1.26.4, 1.26.5, 1.26.6, 1.26.7, 1.26.8, 1.26.9, 1.26.10, 1.26.11, 1.26.12, 1.27.1, 1.27.2, 1.27.3, 1.27.4, 1.27.5, 1.27.6, 1.27.7, 1.27.8, 1.27.9, 1.28.1, 1.28.2, 1.28.3, 1.28.4, 1.28.5, 1.29.0</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>  
  <tr>
    <th>Limitations</th>
    <td>See <a href="https://docs.k3s.io/upgrades/manual">Manual Upgrades</a> in the k3s documentation.<br></br><br></br>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td><ul><li>Smoke tests</li><li>Customer release tests</li></ul></td>
  </tr>
</table>

### OpenShift OKD

The compatibility matrix supports creating [Red Hat OpenShift OKD](https://www.okd.io/) clusters, which is the community distribution of OpenShift, using CodeReady Containers (CRC).

OpenShift clusters are provisioned with two users:
* (Default) A `kubeadmin` user with `cluster-admin` priviledges. Use the `kubeadmin` user only for administrative tasks such as creating new users or setting roles.
* A `developer` user with namespace-scoped priviledges. The `developer` user can be used to better simulate access in end-customer environments.

By default, kubeconfig context is set to the `kubeadmin` user. To switch to the `developer` user, run the command `oc login --username developer`.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported OpenShift Versions</th>
    <td>4.10.0-okd, 4.11.0-okd, 4.12.0-okd, 4.13.0-okd, 4.14.0-okd</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes for versions 4.13.0-okd and later.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>
      <ul>
        <li>OpenShift does not support r1.small instance types.</li>
        <li>OpenShift versions earlier than 4.13-okd do not have a registry mirror and so may be subject to rate limiting from Docker Hub. For information about Docker Hub rate limiting, see <a href="https://docs.docker.com/docker-hub/download-rate-limit/">Docker Hub rate limit</a>. To increase limits, Replicated recommends that you configure an image pull secret to pull public Docker Hub images as an authenticated user. For more information about how to configure image pull secrets, see <a href="https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/">Pull an Image from a Private Registry</a> in the Kubernetes documentation.</li>
        <li><p>OpenShift builds take approximately 17 minutes.</p>
            <p><Pool/></p>
          </li>
      </ul>
      <p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p>
    </td>
  </tr> 
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

### HelmVM

The compatibility matrix supports creating [HelmVM](https://github.com/replicatedhq/helmbin) clusters, which is a version of Kubernetes that has a Helm chart embedded and runs as a single binary.

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
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports a single node.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>See <a href="testing-about#limitations">Limitations</a></td>
  </tr> 
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

### kURL

The compatibility matrix supports creating [kURL](https://kurl.sh) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported kURL Versions</th>
    <td>Any kURL installer ID. For more information, see <a href="/vendor/packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>  
  <tr>
    <th>Limitations</th>
    <td><p>Does not work with the <a href="https://kurl.sh/docs/add-ons/longhorn">Longhorn add-on</a>.</p><p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p></td>
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
    <td>1.24, 1.25, 1.26, 1.27, 1.28</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>m6i.large, m6i.xlarge, m6i.2xlarge, m6i.4xlarge, m6i.8xlarge, m7i.large, m7i.xlarge, m7i.2xlarge, m7i.4xlarge, m7i.8xlarge, m7g.large, m7g.xlarge, m7g.2xlarge, m7g.4xlarge, m7g.8xlarge</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td><p>You can only choose a minor version, not a patch version. The EKS installer chooses the latest patch for that minor version.</p><p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

### GKE

The compatibility matrix supports creating [Google GKE](https://cloud.google.com/kubernetes-engine) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.25, 1.26, 1.27, 1.28</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>n2-standard-2, n2-standard-4, n2-standard-8, n2-standard-16, n2-standard-32</p><p>You can specify more than one node.</p></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td><p>You can choose only a minor version, not a patch version. The GKE installer chooses the latest patch for that minor version.</p><p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

### AKS

The compatibility matrix supports creating [Azure AKS](https://azure.microsoft.com/en-us/products/kubernetes-service) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.25, 1.26, 1.27, 1.28</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>Standard_B2ms, Standard_B4ms, Standard_B8ms, Standard_B16ms</p><p>You can specify more than one node.</p></td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td><p>You can choose only a minor version, not a patch version. The AKS installer chooses the latest patch for that minor version.</p><p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

## Replicated Instance Types {#types}

When creating a VM-based cluster with the compatibility matrix, you must specify a Replicated instance type.

<table>
  <tr>
        <th width="30%">Type</th>
        <th width="35%">Memory (GiB)</th>
        <th width="35%">VCPU Count</th>
  </tr>
  <tr>
    <th>r1.small</th>
    <td>8 GB</td>
    <td>2 VCPUs</td>
  </tr>
  <tr>
    <th>r1.medium</th>
    <td>16 GB</td>
    <td>4 VCPUs</td>
  </tr>
  <tr>
    <th>r1.large</th>
    <td>32 GB</td>
    <td>8 VCPUs</td>
  </tr>
  <tr>
    <th>r1.xlarge</th>
    <td>64 GB</td>
    <td>16 VCPUs</td>
  </tr>      
  <tr>
    <th>r1.2xlarge</th>
    <td>128 GB</td>
    <td>32 VCPUs</td>
  </tr>  
</table>

## Kubernetes Version Support Policy

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in the compatibility matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.
