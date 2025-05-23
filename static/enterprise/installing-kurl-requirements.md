# kURL Installation Requirements

This topic lists the installation requirements for Replicated kURL. Ensure that the installation environment meets these requirements before attempting to install.

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

## Minimum System Requirements

* 4 CPUs or equivalent per machine
* 8GB of RAM per machine
* 40GB of disk space per machine
* TCP ports 2379, 2380, 6443, 6783, and 10250 open between cluster nodes
* UDP port 8472 open between cluster nodes

  :::note
  If the Kubernetes installer specification uses the deprecated kURL [Weave add-on](https://kurl.sh/docs/add-ons/weave), UDP ports 6783 and 6784 must be open between cluster nodes. Reach out to your software vendor for more information.
  :::

* Root access is required
* (Rook Only) The Rook add-on version 1.4.3 and later requires block storage on each node in the cluster. For more information about how to enable block storage for Rook, see [Block Storage](https://kurl.sh/docs/add-ons/rook/#block-storage) in _Rook Add-On_ in the kURL documentation.

## Additional System Requirements

You must meet the additional kURL system requirements when applicable:

- **Supported Operating Systems**: For supported operating systems, see [Supported Operating Systems](https://kurl.sh/docs/install-with-kurl/system-requirements#supported-operating-systems) in the kURL documentation.

- **kURL Dependencies Directory**: kURL installs additional dependencies in the directory /var/lib/kurl and the directory requirements must be met. See [kURL Dependencies Directory](https://kurl.sh/docs/install-with-kurl/system-requirements#kurl-dependencies-directory) in the kURL documentation.

- **Networking Requirements**: Networking requirements include firewall openings, host firewalls rules, and port availability. See [Networking Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#networking-requirements) in the kURL documentation.

- **High Availability Requirements**: If you are operating a cluster with high availability, see [High Availability Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#high-availability-requirements) in the kURL documentation.

- **Cloud Disk Performance**: For a list of cloud VM instance and disk combinations that are known to provide sufficient performance for etcd and pass the write latency preflight, see [Cloud Disk Performance](https://kurl.sh/docs/install-with-kurl/system-requirements#cloud-disk-performance) in the kURL documentation.

## Firewall Openings for Online Installations with kURL {#firewall}

The domains for the services listed in the table below need to be accessible from servers performing online installations. No outbound internet access is required for air gap installations.

For services hosted at domains owned by Replicated, the table below includes a link to the list of IP addresses for the domain at [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json) in GitHub. Note that the IP addresses listed in the `replicatedhq/ips` repository also include IP addresses for some domains that are _not_ required for installation.

For any third-party services hosted at domains not owned by Replicated, consult the third-party's documentation for the IP address range for each domain, as needed.

<table>
  <tr>
      <th width="50%">Domain</th>
      <th>Description</th>
  </tr>
  <tr>
      <td>Docker Hub</td>
      <td><p>Some dependencies of KOTS are hosted as public images in Docker Hub. The required domains for this service are `index.docker.io`, `cdn.auth0.com`, `*.docker.io`, and `*.docker.com.`</p></td>
  </tr>
  <tr>
      <td>`proxy.replicated.com` &#42;</td>
      <td><p>Private Docker images are proxied through `proxy.replicated.com`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `proxy.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L52-L57) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`replicated.app`</td>
      <td><p>Upstream application YAML and metadata is pulled from `replicated.app`. The current running version of the application (if any), as well as a license ID and application ID to authenticate, are all sent to `replicated.app`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p>For the range of IP addresses for `replicated.app`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L60-L65) in GitHub.</p></td>
  </tr>
  <tr>
      <td>`registry.replicated.com` &#42;&#42;</td>
      <td><p>Some applications host private images in the Replicated registry at this domain. The on-prem docker client uses a license ID to authenticate to `registry.replicated.com`. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.</p><p> For the range of IP addresses for `registry.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L20-L25) in GitHub.</p></td>
  </tr>
  <tr>
     <td><p>`k8s.kurl.sh`</p><p>`s3.kurl.sh`</p></td>
     <td><p>kURL installation scripts and artifacts are served from [kurl.sh](https://kurl.sh). An application identifier is sent in a URL path, and bash scripts and binary executables are served from kurl.sh. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p> For the range of IP addresses for `k8s.kurl.sh`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L34-L39) in GitHub.</p><p> The range of IP addresses for `s3.kurl.sh` are the same as IP addresses for the `kurl.sh` domain. For the range of IP address for `kurl.sh`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L28-L31) in GitHub.</p></td>
  </tr>
  <tr>
     <td>`amazonaws.com`</td>
     <td>`tar.gz` packages are downloaded from Amazon S3 during installations with kURL. For information about dynamically scraping the IP ranges to allowlist for accessing these packages, see [AWS IP address ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download) in the AWS documentation.</td>
  </tr>
</table>

&#42; Required only if the application uses the [Replicated proxy registry](/vendor/private-images-about).

&#42;&#42; Required only if the application uses the [Replicated registry](/vendor/private-images-replicated).