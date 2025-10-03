import Pool from "../partials/cmx/_openshift-pool.mdx"
import InstanceTypes from "../partials/cmx/_instance-types.mdx"

# Supported Compatibility Matrix Cluster Types

This topic describes the supported Kubernetes distributions, Kubernetes versions, instance types, nodes, limitations, and common use cases for clusters created with Replicated Compatibility Matrix.

Compatibility Matrix provisions cloud-based or virtual machine (VM) clusters.

## VM Clusters

This section lists the supported VM cluster distributions for clusters created with Compatibility Matrix.

VM-based clusters refers to clusters that run on Hetzner servers with the Compatibility Matrix cluster provisioner. This allows for greater flexibility than with Cloud Clusters like AWS, EKS, etc. For example, with VM-based distributions, Compatibility Matrix offers warm pools to make Openshift startup times very fast.

For information about provisioning VMs, which come without pre-installed clusters and allow for more access to the OS, see [Create VMs](testing-vm-create).

### kind

Compatibility Matrix supports creating [kind](https://kind.sigs.k8s.io/) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>{/* START_kind_VERSIONS */}1.30.13, 1.31.12, 1.32.8, 1.33.4, 1.34.0{/* END_kind_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports a single node.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4` or `dual`.</td>
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

Compatibility Matrix supports creating [k3s](https://k3s.io) clusters.

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
    <td>{/* START_k3s_VERSIONS */}1.30.0, 1.30.1, 1.30.2, 1.30.3, 1.30.4, 1.30.5, 1.30.6, 1.30.7, 1.30.8, 1.30.9, 1.30.10, 1.30.11, 1.30.12, 1.30.13, 1.30.14, 1.31.0, 1.31.1, 1.31.2, 1.31.3, 1.31.4, 1.31.5, 1.31.6, 1.31.7, 1.31.8, 1.31.9, 1.31.10, 1.31.11, 1.31.12, 1.32.0, 1.32.1, 1.32.2, 1.32.3, 1.32.4, 1.32.5, 1.32.6, 1.32.7, 1.32.8, 1.33.0, 1.33.1, 1.33.2, 1.33.3, 1.33.4{/* END_k3s_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
  </tr>  
  <tr>
    <th>Limitations</th>
    <td>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td><ul><li>Smoke tests</li><li>Customer release tests</li></ul></td>
  </tr>
</table>

### RKE2 (Beta)

Compatibility Matrix supports creating [RKE2](https://docs.rke2.io/) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported RKE2 Versions</th>
    <td>The upstream k8s version that matches the Kubernetes version requested.</td>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>{/* START_rke2_VERSIONS */}1.30.0, 1.30.1, 1.30.2, 1.30.3, 1.30.4, 1.30.5, 1.30.6, 1.30.7, 1.30.8, 1.30.9, 1.30.10, 1.30.11, 1.30.12, 1.30.13, 1.30.14, 1.31.0, 1.31.1, 1.31.2, 1.31.3, 1.31.4, 1.31.5, 1.31.6, 1.31.7, 1.31.8, 1.31.9, 1.31.10, 1.31.11, 1.31.12, 1.31.13, 1.32.0, 1.32.1, 1.32.2, 1.32.3, 1.32.4, 1.32.5, 1.32.6, 1.32.7, 1.32.8, 1.32.9, 1.33.0, 1.33.1, 1.33.2, 1.33.3, 1.33.4, 1.33.5, 1.34.1{/* END_rke2_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports a single node.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td><ul><li>Smoke tests</li><li>Customer release tests</li></ul></td>
  </tr>
</table>

### OpenShift OKD

Compatibility Matrix supports creating [Red Hat OpenShift OKD](https://www.okd.io/) clusters, which is the community distribution of OpenShift, using CodeReady Containers (CRC).

OpenShift clusters are provisioned with two users:

- (Default) A `kubeadmin` user with `cluster-admin` priviledges. Use the `kubeadmin` user only for administrative tasks such as creating new users or setting roles.
- A `developer` user with namespace-scoped priviledges. The `developer` user can be used to better simulate access in end-customer environments.

By default, kubeconfig context is set to the `kubeadmin` user. To switch to the `developer` user, run the command `oc login --username developer`.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported OpenShift Versions</th>
    <td>{/* START_openshift_VERSIONS */}4.13.0-okd, 4.14.0-okd, 4.15.0-okd, 4.16.0-okd, 4.17.0-okd, 4.18.0-okd, 4.19.0-okd{/* END_openshift_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes for versions 4.13.0-okd and later.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>
      <ul>
        <li>OpenShift does not support r1.small instance types.</li>
        <li>
          <p>OpenShift builds take approximately 17 minutes.</p>
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

### Embedded Cluster

Compatibility Matrix supports creating clusters with Replicated Embedded Cluster. For more information, see [Embedded Cluster Overview](/vendor/embedded-overview).

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Embedded Cluster Versions</th>
    <td>
      Any valid release sequence that has previously been promoted to the channel where the customer license is assigned.
      Version is optional and defaults to the latest available release on the channel.
    </td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes (alpha).</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td>
      <ul>
        <li>The Admin Console UI is not exposed publicly and must be exposed via `kubectl -n kotsadm port-forward svc/kurl-proxy-kotsadm 38800:8800`. The password for the Admin Console is `password`.</li>
        <li><strong>A valid customer license is required to create an Embedded Cluster.</strong></li>
        <li>The [cluster prepare](/vendor/testing-how-to#prepare-clusters) command is not supported.</li>
      </ul>
      <p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p>
    </td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

### kURL

Compatibility Matrix supports creating [kURL](https://kurl.sh) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported kURL Versions</th>
    <td>Any promoted kURL installer. Version is optional. For an installer version other than "latest", you can find the specific Installer ID for a previously promoted installer under the relevant **Install Command** (ID after kurl.sh/) on the **Channels > kURL Installer History** page in the Vendor Portal. For more information about viewing the history of kURL installers promoted to a channel, see [Installer History](/vendor/installer-history).</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td>See <a href="#types">Replicated Instance Types</a></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
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

Compatibility Matrix supports creating [AWS EKS](https://aws.amazon.com/eks/?nc2=type_a) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td><p>{/* START_eks_VERSIONS */}1.28, 1.29, 1.30, 1.31, 1.32, 1.33{/* END_eks_VERSIONS */}</p><p>Extended Support Versions: 1.28, 1.29, 1.30</p></td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>m6i.large, m6i.xlarge, m6i.2xlarge, m6i.4xlarge, m6i.8xlarge, m7i.large, m7i.xlarge, m7i.2xlarge, m7i.4xlarge, m7i.8xlarge, m5.large, m5.xlarge, m5.2xlarge,
			m5.4xlarge, m5.8xlarge, m7g.large (arm), m7g.xlarge (arm), m7g.2xlarge (arm), m7g.4xlarge (arm), m7g.8xlarge (arm), c5.large, c5.xlarge, c5.2xlarge, c5.4xlarge,
			c5.9xlarge, g4dn.xlarge (gpu), g4dn.2xlarge (gpu), g4dn.4xlarge (gpu), g4dn.8xlarge (gpu), g4dn.12xlarge (gpu), g4dn.16xlarge (gpu)</p><p>g4dn instance types depend on available capacity. After a g4dn cluster is running, you also need to install your version of the NVIDIA device plugin for Kubernetes. See [Amazon EKS optimized accelerated Amazon Linux AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami) in the AWS documentation.</p></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>Yes. Cost will be based on the max number of nodes.</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
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

Compatibility Matrix supports creating [Google GKE](https://cloud.google.com/kubernetes-engine) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>{/* START_gke_VERSIONS */}1.30, 1.31, 1.32, 1.33{/* END_gke_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>n2-standard-2, n2-standard-4, n2-standard-8, n2-standard-16, n2-standard-32, t2a-standard-2 (arm), t2a-standard-4 (arm), t2a-standard-8 (arm), t2a-standard-16 (arm), t2a-standard-32 (arm), t2a-standard-48 (arm), e2-standard-2, e2-standard-4, e2-standard-8, e2-standard-16, e2-standard-32, n1-standard-1+nvidia-tesla-t4+1 (gpu), n1-standard-1+nvidia-tesla-t4+2 (gpu), n1-standard-1+nvidia-tesla-t4+4 (gpu), n1-standard-2+nvidia-tesla-t4+1 (gpu), n1-standard-2+nvidia-tesla-t4+2 (gpu), n1-standard-2+nvidia-tesla-t4+4 (gpu), n1-standard-4+nvidia-tesla-t4+1 (gpu), n1-standard-4+nvidia-tesla-t4+2 (gpu), n1-standard-4+nvidia-tesla-t4+4 (gpu), n1-standard-8+nvidia-tesla-t4+1 (gpu), n1-standard-8+nvidia-tesla-t4+2 (gpu), n1-standard-8+nvidia-tesla-t4+4 (gpu), n1-standard-16+nvidia-tesla-t4+1 (gpu), n1-standard-16+nvidia-tesla-t4+2 (gpu), n1-standard-16+nvidia-tesla-t4+4 (gpu), n1-standard-32+nvidia-tesla-t4+1 (gpu), n1-standard-32+nvidia-tesla-t4+2 (gpu), n1-standard-32+nvidia-tesla-t4+4 (gpu), n1-standard-64+nvidia-tesla-t4+1 (gpu), n1-standard-64+nvidia-tesla-t4+2 (gpu), n1-standard-64+nvidia-tesla-t4+4 (gpu), n1-standard-96+nvidia-tesla-t4+1 (gpu), n1-standard-96+nvidia-tesla-t4+2 (gpu), n1-standard-96+nvidia-tesla-t4+4 (gpu)</p><p>You can specify more than one node.</p></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>Yes. Cost will be based on the max number of nodes.</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
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

Compatibility Matrix supports creating [Azure AKS](https://azure.microsoft.com/en-us/products/kubernetes-service) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>{/* START_aks_VERSIONS */}1.30, 1.31, 1.32, 1.33{/* END_aks_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>Standard_B2ms, Standard_B4ms, Standard_B8ms, Standard_B16ms, Standard_D2S_v5, Standard_D4S_v5, Standard_D8S_v5, Standard_D16S_v5, Standard_D32S_v5, Standard_D48S_v5, Standard_D2ps_v5 (arm), Standard_D4ps_v5 (arm), Standard_D8ps_v5 (arm), Standard_D16ps_v5 (arm), Standard_D32ps_v5 (arm), Standard_D48ps_v5 (arm), Standard_NC4as_T4_v3 (gpu), Standard_NC8as_T4_v3 (gpu), Standard_NC16as_T4_v3 (gpu), Standard_NC64as_T4_v3 (gpu)</p><p>GPU instance types depend on available capacity. After a GPU cluster is running, you also need to install your version of the NVIDIA device plugin for Kubernetes. See [NVIDIA GPU Operator with Azure Kubernetes Service](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/microsoft-aks.html) in the NVIDIA documentation.</p></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>Yes. Cost will be based on the max number of nodes.</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
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

### OKE (Beta)

Compatibility Matrix supports creating [Oracle Container Engine for Kubernetes (OKE)](https://docs.oracle.com/en-us/iaas/Content/ContEng/Concepts/contengoverview.htm) clusters.

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>{/* START_oke_VERSIONS */}1.31.1, 1.31.10, 1.32.1, 1.33.1{/* END_oke_VERSIONS */}</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>VM.Standard2.1, VM.Standard2.2, VM.Standard2.4, VM.Standard2.8, VM.Standard2.16, VM.Standard3.Flex.1, VM.Standard3.Flex.2, VM.Standard3.Flex.4, VM.Standard3.Flex.8, VM.Standard3.Flex.16, VM.Standard.A1.Flex.1 (arm), VM.Standard.A1.Flex.2 (arm), VM.Standard.A1.Flex.4 (arm), VM.Standard.A1.Flex.8 (arm), VM.Standard.A1.Flex.16 (arm)</p></td>
  </tr>
  <tr>
    <th>Node Groups</th>
    <td>Yes</td>
  </tr>
  <tr>
    <th>Node Auto Scaling</th>
    <td>No.</td>
  </tr>
  <tr>
    <th>Nodes</th>
    <td>Supports multiple nodes.</td>
  </tr>
  <tr>
    <th>IP Family</th>
    <td>Supports `ipv4`.</td>
  </tr>
  <tr>
    <th>Limitations</th>
    <td><p>Provising an OKE cluster does take between 8 to 10 minutes. If needed, some timeouts in your CI pipelines might have to be adjusted.</p><p>For additional limitations that apply to all distributions, see <a href="testing-about#limitations">Limitations</a>.</p></td>
  </tr>
  <tr>
    <th>Common Use Cases</th>
    <td>Customer release tests</td>
  </tr>
</table>

## Replicated Instance Types {#types}

When creating a VM-based cluster with Compatibility Matrix, you must specify a Replicated instance type.

<InstanceTypes/>

## Kubernetes Version Support Policy

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in Compatibility Matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.
