# Installation Requirements

This topic describes the requirements for installing applications with Replicated.

:::note
This topic does not include any requirements specific to your software vendor. Ensure that you meet any additional requirements for the application defined by your software vendor.
:::

## Supported Browsers

The following table lists the browser requirements for the latest Replicated admin console.

| Browser              | Support     |
|----------------------|-------------|
| Chrome               | 66+         |
| Firefox              | 58+         |
| Opera                | 53+         |
| Edge                 | 80+         |
| Safari (Mac OS only) | 13+         |
| Internet Explorer    | Unsupported |

## Kubernetes Version Compatibility

Each release of the open source KOTS project maintains compatibility with the current Kubernetes version, and the two most recent versions at the time of its release. This includes support against all patch releases of the corresponding Kubernetes version.

Kubernetes versions 1.21 and earlier are end-of-life (EOL). For more information about Kubernetes versions, see [Release History](https://kubernetes.io/releases/) in the Kubernetes documentation.

Replicated recommends upgrading to a KOTS version that is compatible with Kubernetes 1.22 and higher.

:::note
The app manager is based on the open source KOTS project. The app manager version is the same as the KOTS version. For example, KOTS v1.48 is the same as the app manager v1.48.
:::

| KOTS Versions   | Kubernetes Compatibility |
|-----------------|---------------------------|
| v1.71 and later | v1.24, v1.23, v1.22, and v1.21|
| v1.66 to v1.70 | v1.23, v1.22, and v1.21   |
| v1.61 to v1.65 | v1.23, v1.22, v1.21, and v1.20|
| v1.59.3 to v1.60 | v1.22, v1.21, and v1.20 |
| v1.48 to v1.59.2 | v1.21, v1.20, and v1.19|
| v1.36 to v1.47  | v1.20, v1.19, and v1.18 |
| v1.20 to v1.35  | v1.19, v1.18, and v1.17 |
| v1.15 to v1.19  | v1.18, v1.17, and v1.16 |
| v1.11 to v1.14  | v1.17, v1.16, and v1.15 |

## Minimum System Requirements

This section describes the minimum system requirements for installing the Replicated admin console on an existing cluster or on an embedded cluster created by the Replicated Kubernetes installer.

### Existing Cluster Requirements

To install the admin console on an existing cluster, the cluster must meet the following requirements:

* **Admin console minimum requirements**: The admin console requires a minimum of 5GB of disk space on the cluster. This includes 4GB for the object store PersistentVolume and 1GB for the PostgreSQL PersistentVolume. For more information, see [Requirements for Admin Console State](installing-stateful-component-requirements).
* **Kubernetes version compatibility**: The version of Kubernetes running on the cluster must be compatible with the version of KOTS that you use to install the application. This compatibility requirement does not include any specific and additional requirements defined by the software vendor for the application.

   For more information about the versions of Kubernetes that are compatible with each version of KOTS, see [Kubernetes Version Compatibility](#kubernetes-version-compatibility) above.
* **OpenShift version compatibility**: For Red Hat OpenShift clusters, the version of OpenShift must use a supported Kubernetes version. For more information about supported Kubernetes versions, see [Kubernetes Version Compatibility](#kubernetes-version-compatibility) above.
* **Storage class**: The cluster must have an existing storage class available. For more information, see [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) in the Kubernetes documentation.
* **Role-based access control (RBAC)**: Replicated requires the following RBAC permissions on the cluster:
   * An existing namespace and an RBAC binding that permits the user of the kubectl command-line tool to create workloads, ClusterRoles, and ClusterRoleBindings.
   * cluster-admin permissions to create namespaces and assign RBAC roles across the cluster.

   If the `requireMinimalRBACPrivileges` property is set to `true` in the Application custom resource manifest, or if the `supportMinimalRBACPrivileges` property is set to `true` in the Application custom resource manifest and the `--use-minimal-rbac` flag is passed to the `kots install` command, the app manager does not require the ability to create ClusterRoles and ClusterRoleBindings and uses a namespace-scoped Role and RoleBinding instead. For more information about the Application custom resource, see [Application](../reference/custom-resource-application) in _Custom Resources_.

:::note
Root access on nodes or workstations is *not* required to install an application on an existing cluster.
:::

### Kubernetes Installer Cluster Requirements {#embedded-cluster-requirements}

To install the admin console on an embedded cluster created by the Replicated Kubernetes installer, your environment must meet the following requirements.

#### Minimum System Requirements

* 4 CPUs or equivalent per machine.
* 8GB of RAM per machine.
* 40GB of disk space per machine.
  :::note
  10GB of the total 40GB must be available to `/var/lib/rook`. For more information, see [Rook Add-On](https://kurl.sh/docs/add-ons/rook) in the kURL documentation.
  :::

* TCP ports 2379, 2380, 6443, 6783, 10250, 10251, and 10252 open between cluster nodes.
* UDP ports 6783 and 6784 open between cluster nodes.
* Root access is required.

#### Additional System Requirements

Because the Kubernetes installer is based on the open source kURL project, which is maintained by Replicated, you must meet all of the kURL system requirements for kURL, such as supported operating systems, networking requirements, and so on. For a complete list of system requirements, see [System Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements) in the kURL documentation.


#### Supported Operating Systems

To use the Kubernetes installer, you must use a supported operating system. See [Supported Operating Systems](https://kurl.sh/docs/install-with-kurl/system-requirements#supported-operating-systems) in the kURL documentation.

#### kURL Dependencies Directory

kURL installs additional dependencies in the directory /var/lib/kurl/, which is also used by the Kubernetes installer. See [kURL Dependencies Directory](https://kurl.sh/docs/install-with-kurl/system-requirements#kurl-dependencies-directory) in the kURL documentation.

#### Networking Requirements

The Kubernetes installer has networking requirements for firewall openings, host firewall rules, and ports. See [Networking Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#networking-requirements) in the kURL documentation.

#### High Availability Requirements

In addition to the networking requirements, operating a cluster with high availability has constraints that must be met. See [High Availability Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#high-availability-requirements) in the kURL documentation.

#### Cloud Disk Performance

For a list of cloud VM instance and disk combinations that are known to provide sufficient performance for etcd and pass the write latency preflight, see [Cloud Disk Performance](https://kurl.sh/docs/install-with-kurl/system-requirements#cloud-disk-performance) in the kURL documentation.


## Firewall Openings for Online Installations

The following domains need to be accessible from servers performing online installations.
For a list of IP addresses for these services, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/master/ip_addresses.json) in GitHub.

No outbound internet access is required for air gapped installations.

| Host                 | Existing Cluster Installation | Embedded Cluster Installation | Description                                                                                                                                                                                                                                                                                                                                                |
|----------------------|-------------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Docker Hub           | Required                      | Required                      | Some dependencies of KOTS are hosted as public images in Docker Hub.                                                                                                                                                                                                                                                                                       |
| proxy.replicated.com | Required                      | Required                      | Upstream Docker images are proxied via proxy.replicated.com. The on-prem docker client uses a license ID to authenticate to proxy.replicated.com. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.                                                                                                                       |
| replicated.app       | Required                      | Required                      | Upstream application YAML and metadata is pulled from replicated.app. The current running version of the application (if any) will be sent, in addition to a license ID and an application IDs are sent to replicated.app to authenticate and receive these YAML files. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA. |
| kots.io              | Required                      | Not Required                  | Requests are made to this domain when you are installing the kots CLI. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.|
| github.com           | Required                      | Not Required                  | Requests are made to this domain when you are installing the kots CLI. |
| k8s.kurl.sh          | Not Required                  | Required                      | Kubernetes cluster installation scripts and artifacts are served from [kurl.sh](https://kurl.sh). An application identifier is sent in a URL path, and bash scripts and binary executables are served from kurl.sh. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.                                                     |
| amazonaws.com        | Not Required                  | Required                      | tar.gz packages are downloaded from Amazon S3 during embedded cluster installations. For information about dynamically scraping the IP ranges to allowlist for accessing these packages, see [AWS IP address ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download) in the AWS documentation.                                                         |
