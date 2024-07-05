import Pool from "../partials/cmx/\_openshift-pool.mdx"

# Supported Compatibility Matrix Cluster Types

This topic describes the supported Kubernetes distributions, Kubernetes versions, instance types, nodes, limitations, and common use cases for clusters created with Replicated Compatibility Matrix.

Compatibility Matrix provisions cloud-based or virtual machine (VM) clusters.

## VM Clusters

This section lists the supported VM cluster distributions for clusters created with Compatibility Matrix.

### kind

Compatibility Matrix supports creating [kind](https://kind.sigs.k8s.io/) clusters.

<table>
  <tr>
        <th width="35%">Type</th>
        <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.25.16, 1.26.15, 1.27.13, 1.28.9, 1.29.4, 1.30.0</td>
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
    <td>1.24.1, 1.24.2, 1.24.3, 1.24.4, 1.24.6, 1.24.7, 1.24.8, 1.24.9, 1.24.10, 1.24.11, 1.24.12, 1.24.13, 1.24.14, 1.24.15, 1.24.16, 1.24.17, 1.25.0, 1.25.2, 1.25.3, 1.25.4, 1.25.5, 1.25.6, 1.25.7, 1.25.8, 1.25.9, 1.25.10, 1.25.11, 1.25.12, 1.25.13, 1.25.14, 1.25.15, 1.25.16, 1.26.0, 1.26.1, 1.26.2, 1.26.3, 1.26.4, 1.26.5, 1.26.6, 1.26.7, 1.26.8, 1.26.9, 1.26.10, 1.26.11, 1.26.12, 1.26.13, 1.26.14, 1.27.1, 1.27.2, 1.27.3, 1.27.4, 1.27.5, 1.27.6, 1.27.7, 1.27.8, 1.27.9, 1.27.10, 1.27.11, 1.28.1, 1.28.2, 1.28.3, 1.28.4, 1.28.5, 1.28.6, 1.28.7, 1.29.0, 1.29.1, 1.29.2</td>
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

### RKE2 (Alpha)

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
    <td>1.24.1, 1.24.2, 1.24.3, 1.24.4, 1.24.6, 1.24.7, 1.24.8, 1.24.9, 1.24.10, 1.24.11, 1.24.12, 1.24.13, 1.24.14, 1.24.15, 1.24.16, 1.24.17, 1.25.0, 1.25.2, 1.25.3, 1.25.4, 1.25.5, 1.25.6, 1.25.7, 1.25.8, 1.25.9, 1.25.10, 1.25.11, 1.25.12, 1.25.13, 1.25.14, 1.25.15, 1.25.16, 1.26.0, 1.26.1, 1.26.2, 1.26.3, 1.26.4, 1.26.5, 1.26.6, 1.26.7, 1.26.8, 1.26.9, 1.26.10, 1.26.11, 1.26.12, 1.26.13, 1.26.14, 1.26.15, 1.27.1, 1.27.2, 1.27.3, 1.27.4, 1.27.5, 1.27.6, 1.27.7, 1.27.8, 1.27.9, 1.27.10, 1.27.11, 1.27.12, 1.28.2, 1.28.3, 1.28.4, 1.28.5, 1.28.6, 1.28.7, 1.28.8, 1.29.0, 1.29.1, 1.29.2, 1.29.3</td>
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
    <td>4.10.0-okd, 4.11.0-okd, 4.12.0-okd, 4.13.0-okd, 4.14.0-okd, 4.15.0-okd</td>
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
        <li>OpenShift versions earlier than 4.13-okd do not have a registry mirror and so may be subject to rate limiting from Docker Hub. For information about Docker Hub rate limiting, see <a href="https://docs.docker.com/docker-hub/download-rate-limit/">Docker Hub rate limit</a>. To increase limits, Replicated recommends that you configure an image pull secret to pull public Docker Hub images as an authenticated user. For more information about how to configure image pull secrets, see <a href="https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/">Pull an Image from a Private Registry</a> in the Kubernetes documentation.</li>
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

Compatibility Matrix supports creating clusters with Replicated Embedded Cluster. For more information, see [Using Embedded Cluster (Beta)](/vendor/embedded-overview).

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
    <td>
      <ul>
        <li>The admin console UI is not exposed publicly and must be exposed via `kubectl -n kotsadm port-forward svc/kurl-proxy-kotsadm 38800:8800`.</li>
        <li>A valid customer license is required for installing with embedded cluster.</li>
        <li>The [cluster prepare](/vendor/testing-how-to#prepare-clusters) command is not supported.</li>
        <li>Embedded clusters cannot be created from the Vendor Portal.</li>
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
    <td>Any kURL installer ID. For more information, see <a href="/vendor/packaging-embedded-kubernetes">Creating a kURL installer</a>.</td>
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
    <td>1.23, 1.24, 1.25, 1.26, 1.27, 1.28, 1.29</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>m6i.large, m6i.xlarge, m6i.2xlarge, m6i.4xlarge, m6i.8xlarge, m7i.large, m7i.xlarge, m7i.2xlarge, m7i.4xlarge, m7i.8xlarge, m7g.large (arm), m7g.xlarge (arm), m7g.2xlarge (arm), m7g.4xlarge (arm), m7g.8xlarge (arm), g4dn.xlarge (gpu), g4dn.2xlarge (gpu), g4dn.4xlarge (gpu), g4dn.8xlarge (gpu), g4dn.12xlarge (gpu), g4dn.16xlarge (gpu)</p><p>g4dn instance types depend on available capacity. After a g4dn cluster is running, you also need to install your version of the NVIDIA device plugin for Kubernetes. See [Amazon EKS optimized accelerated Amazon Linux AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami) in the AWS documentation.</p></td>
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
    <td>1.27, 1.28, 1.29</td>
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
    <td>1.27, 1.28, 1.29</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>Standard_B2ms, Standard_B4ms, Standard_B8ms, Standard_B16ms, Standard_DS2_v2, Standard_DS3_v2, Standard_DS4_v2, Standard_DS5_v2, Standard_D2ps_v5 (arm), Standard_D4ps_v5 (arm), Standard_D8ps_v5 (arm), Standard_D16ps_v5 (arm), Standard_D32ps_v5 (arm), Standard_D48ps_v5 (arm), Standard_NC4as_T4_v3 (gpu), Standard_NC8as_T4_v3 (gpu), Standard_NC16as_T4_v3 (gpu), Standard_NC64as_T4_v3 (gpu)</p><p>GPU instance types depend on available capacity. After a GPU cluster is running, you also need to install your version of the NVIDIA device plugin for Kubernetes. See [NVIDIA GPU Operator with Azure Kubernetes Service](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/microsoft-aks.html) in the NVIDIA documentation.</p></td>
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

### OKE (Alpha)

Compatibility Matrix supports creating [Oracle Container Engine for Kubernetes (OKE)](https://docs.oracle.com/en-us/iaas/Content/ContEng/Concepts/contengoverview.htm) clusters.

:::note
By default, creating OKE clusters is not enabled. To enable OKE clusters for Compatibility Matrix, contact Replicated at contact@replicated.com or submit a feature request.
:::

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Versions</th>
    <td>1.29.1</td>
  </tr>
  <tr>
    <th>Supported Instance Types</th>
    <td><p>VM.Standard2.1, VM.Standard2.2, VM.Standard2.4, VM.Standard2.8, VM.Standard2.16</p></td>
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

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in Compatibility Matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.
