# Embedded Cluster Installation Requirements

This topic lists the installation requirements for Replicated Embedded Cluster. Ensure that the installation environment meets these requirements before attempting to install.

## System Requirements

* Linux operating system

* x86-64 architecture

* systemd

* At least 2GB of memory and 2 CPU cores

* The disk on the host must have a maximum P99 write latency of 10 ms. This supports etcd performance and stability. For more information about the disk write latency requirements for etcd, see [Disks](https://etcd.io/docs/latest/op-guide/hardware/#disks) in _Hardware recommendations_ and [What does the etcd warning “failed to send out heartbeat on time” mean?](https://etcd.io/docs/latest/faq/) in the etcd documentation.

* The data directory used by Embedded Cluster must have 40Gi or more of total space and be less than 80% full. By default, the data directory is `/var/lib/embedded-cluster`. The directory can be changed by passing the `--data-dir` flag with the Embedded Cluster `install` command. For more information, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).

   Note that in addition to the primary data directory, Embedded Cluster creates directories and files in the following locations:

      - `/etc/cni`
      - `/etc/k0s`
      - `/opt/cni`
      - `/opt/containerd`
      - `/run/calico`
      - `/run/containerd`
      - `/run/k0s`
      - `/sys/fs/cgroup/kubepods`
      - `/sys/fs/cgroup/system.slice/containerd.service`
      - `/sys/fs/cgroup/system.slice/k0scontroller.service`
      - `/usr/libexec/k0s`
      - `/var/lib/calico`
      - `/var/lib/cni`
      - `/var/lib/containers`
      - `/var/lib/kubelet`
      - `/var/log/calico`
      - `/var/log/containers`
      - `/var/log/embedded-cluster`
      - `/var/log/pods`
      - `/usr/local/bin/k0s`

* (Online installations only) Access to replicated.app and proxy.replicated.com or your custom domain for each

* Embedded Cluster is based on k0s, so all k0s system requirements and external runtime dependencies apply. See [System requirements](https://docs.k0sproject.io/stable/system-requirements/) and [External runtime dependencies](https://docs.k0sproject.io/stable/external-runtime-deps/) in the k0s documentation.

## Port Requirements

This section lists the ports used by Embedded Cluster. These ports must be open and available for both single- and multi-node installations.

#### Ports Used by Local Processes

The following ports must be open and available for use by local processes running on the same node. It is not necessary to create firewall openings for these ports.

* 2379/TCP
* 7443/TCP
* 9099/TCP
* 10248/TCP
* 10257/TCP
* 10259/TCP

#### Ports Required for Bidirectional Communication Between Nodes

The following ports are used for bidirectional communication between nodes.

For multi-node installations, create firewall openings between nodes for these ports.

For single-node installations, ensure that there are no other processes using these ports. Although there is no communication between nodes in single-node installations, these ports are still required.

* 2380/TCP
* 4789/UDP
* 6443/TCP
* 9091/TCP
* 9443/TCP
* 10249/TCP
* 10250/TCP
* 10256/TCP

#### Admin Console Port

The KOTS Admin Console requires that port 30000/TCP is open and available. Create a firewall opening for port 30000/TCP so that the Admin Console can be accessed by the end user.

Additionally, port 30000 must be accessible by nodes joining the cluster.

If port 30000 is occupied, you can select a different port for the Admin Console during installation. For more information, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).

#### LAM Port

The Local Artifact Mirror (LAM) requires that port 50000/TCP is open and available.

If port 50000 is occupied, you can select a different port for the LAM during installation. For more information, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).

## Firewall Openings for Online Installations with Embedded Cluster {#firewall}

The domains for the services listed in the table below need to be accessible from servers performing online installations. No outbound internet access is required for air gap installations.

For services hosted at domains owned by Replicated, the table below includes a link to the list of IP addresses for the domain at [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json) in GitHub. Note that the IP addresses listed in the `replicatedhq/ips` repository also include IP addresses for some domains that are _not_ required for installation.

For any third-party services hosted at domains not owned by Replicated, consult the third-party's documentation for the IP address range for each domain, as needed.

<table>
  <tr>
      <th width="50%">Domain</th>
      <th>Description</th>
  </tr>
  <tr>
      <td>`proxy.replicated.com`</td>
      <td><p>Private Docker images are proxied through `proxy.replicated.com`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `proxy.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L52-L57) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`replicated.app`</td>
      <td><p>Upstream application YAML and metadata is pulled from `replicated.app`. The current running version of the application (if any), as well as a license ID and application ID to authenticate, are all sent to `replicated.app`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `replicated.app`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L60-L65) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`registry.replicated.com` &#42;</td>
      <td><p>Some applications host private images in the Replicated registry at this domain. The on-prem docker client uses a license ID to authenticate to `registry.replicated.com`. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.</p><p> For the range of IP addresses for `registry.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L20-L25) in GitHub.</p></td>
  </tr>
</table>

&#42; Required only if the application uses the [Replicated private registry](/vendor/private-images-replicated).

## About Firewalld Configuration

When Firewalld is enabled in the installation environment, Embedded Cluster modifies the Firewalld config to allow traffic over the pod and service networks and to open the required ports on the host. No additional configuration is required.

The following rule is added to Firewalld:

```xml
<?xml version="1.0" encoding="utf-8"?>
<zone target="ACCEPT">
  <interface name="cali+"/>
  <interface name="tunl+"/>
  <interface name="vxlan-v6.calico"/>
  <interface name="vxlan.calico"/>
  <interface name="wg-v6.cali"/>
  <interface name="wireguard.cali"/>
  <source address="[pod-network-cidr]"/>
  <source address="[service-network-cidr]"/>
</zone>
```

The following ports are opened in the default zone:

<table>
<tr>
  <th>Port</th>
  <th>Protocol</th>
</tr>
<tr>
  <td>6443</td>
  <td>TCP</td>
</tr>
<tr>
  <td>10250</td>
  <td>TCP</td>
</tr>
<tr>
  <td>9443</td>
  <td>TCP</td>
</tr>
<tr>
  <td>2380</td>
  <td>TCP</td>
</tr>
<tr>
  <td>4789</td>
  <td>UDP</td>
</tr>
</table>