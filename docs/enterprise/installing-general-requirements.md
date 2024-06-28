import DockerCompatibility from "../partials/image-registry/_docker-compatibility.mdx"
import KubernetesCompatibility from "../partials/install/_kubernetes-compatibility.mdx"

# Installation Requirements

This topic describes the requirements for installing applications with the Replicated KOTS and Replicated kURL installers.

:::note
This topic does not include any requirements specific to your software vendor. Ensure that you meet any additional requirements for the application defined by your software vendor.
:::

## Supported Browsers

The following table lists the browser requirements for the Replicated KOTS Admin Console with the latest version of KOTS.

| Browser              | Support     |
|----------------------|-------------|
| Chrome               | 66+         |
| Firefox              | 58+         |
| Opera                | 53+         |
| Edge                 | 80+         |
| Safari (Mac OS only) | 13+         |
| Internet Explorer    | Unsupported |

## Kubernetes Version Compatibility

Each release of KOTS maintains compatibility with the current Kubernetes version, and the two most recent versions at the time of its release. This includes support against all patch releases of the corresponding Kubernetes version.

Kubernetes versions 1.25 and earlier are end-of-life (EOL). For more information about Kubernetes versions, see [Release History](https://kubernetes.io/releases/) in the Kubernetes documentation.

Replicated recommends using a version of KOTS that is compatible with Kubernetes 1.26 and higher.

<KubernetesCompatibility/>


## Existing Cluster Requirements

To install KOTS in an existing cluster, your environment must meet the following minimum requirements.

### Minimum System Requirements

To install the Admin Console on an existing cluster, the cluster must meet the following requirements:

* **Admin console minimum requirements**: Existing clusters that have LimitRanges specified must support the following minimum requirements for the Admin Console:

  * **CPU resources and memory**: The Admin Console pod requests 100m CPU resources and 100Mi memory.

  * **Disk space**: The Admin Console requires a minimum of 5GB of disk space on the cluster for persistent storage, including:

    * **4GB for S3-compatible object store**: The Admin Console requires 4GB for an S3-compatible object store to store appplication archives, support bundles, and snapshots that are configured to use a host path and NFS storage destination. By default, KOTS deploys MinIO to satisfy this object storage requirement. During deployment, MinIO is configured with a randomly generated `AccessKeyID` and `SecretAccessKey`, and only exposed as a ClusterIP on the overlay network.

      :::note
      You can optionally install KOTS without MinIO by passing `--with-minio=false` with the `kots install` command. This installs KOTS as a StatefulSet using a persistent volume (PV) for storage. For more information, see [Installing Without Object Storage](/enterprise/installing-stateful-component-requirements).
      :::

    * **1GB for rqlite PersistentVolume**: The Admin Console requires 1GB for a rqlite StatefulSet to store version history, application metadata, and other small amounts of data needed to manage the application(s). During deployment, the rqlite component is secured with a randomly generated password, and only exposed as a ClusterIP on the overlay network.  

* **Supported operating systems**: The following are the supported operating systems for nodes:
  * Linux AMD64
  * Linux ARM64

* **Available StorageClass**: The cluster must have an existing StorageClass available. KOTS creates the required stateful components using the default StorageClass in the cluster. For more information, see [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) in the Kubernetes documentation.  

* **Kubernetes version compatibility**: The version of Kubernetes running on the cluster must be compatible with the version of KOTS that you use to install the application. This compatibility requirement does not include any specific and additional requirements defined by the software vendor for the application.

  For more information about the versions of Kubernetes that are compatible with each version of KOTS, see [Kubernetes Version Compatibility](#kubernetes-version-compatibility) above.
* **OpenShift version compatibility**: For Red Hat OpenShift clusters, the version of OpenShift must use a supported Kubernetes version. For more information about supported Kubernetes versions, see [Kubernetes Version Compatibility](#kubernetes-version-compatibility) above.
* **Storage class**: The cluster must have an existing storage class available. For more information, see [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) in the Kubernetes documentation.
* **Port forwarding**: To support port forwarding, Kubernetes clusters require that the SOcket CAT (socat) package is installed on each node.

  If the package is not installed on each node in the cluster, you see the following error message when the installation script attempts to connect to the Admin Console: `unable to do port forwarding: socat not found`.

  To check if the package that provides socat is installed, you can run `which socat`. If the package is installed, the `which socat` command prints the full path to the socat executable file. For example, `usr/bin/socat`.

  If the output of the `which socat` command is `socat not found`, then you must install the package that provides the socat command. The name of this package can vary depending on the node's operating system.

### RBAC Requirements

The user that runs the installation command must have at least the minimum role-based access control (RBAC) permissions that are required by KOTS. If the user does not have the required RBAC permissions, then an error message displays: `Current user has insufficient privileges to install Admin Console`.

The required RBAC permissions vary depending on if the user attempts to install KOTS with cluster-scoped access or namespace-scoped access:
* [Cluster-scoped RBAC Requirements (Default)](#cluster-scoped)
* [Namespace-scoped RBAC Requirements](#namespace-scoped)

#### Cluster-scoped RBAC Requirements (Default) {#cluster-scoped}

By default, KOTS requires cluster-scoped access. With cluster-scoped access, a Kubernetes ClusterRole and ClusterRoleBinding are created that grant KOTS access to all resources across all namespaces in the cluster.

To install KOTS with cluster-scoped access, the user must meet the following RBAC requirements:
* The user must be able to create workloads, ClusterRoles, and ClusterRoleBindings.
* The user must have cluster-admin permissions to create namespaces and assign RBAC roles across the cluster.

#### Namespace-scoped RBAC Requirements {#namespace-scoped}

KOTS can be installed with namespace-scoped access rather than the default cluster-scoped access. With namespace-scoped access, a Kubernetes Role and RoleBinding are automatically created that grant KOTS permissions only in the namespace where it is installed.

:::note
Depending on the application, namespace-scoped access for KOTS is required, optional, or not supported. Contact your software vendor for application-specific requirements.
:::

To install or upgrade KOTS with namespace-scoped access, the user must have _one_ of the following permission levels in the target namespace:

* **Wildcard permissions (Default)**: By default, when namespace-scoped access is enabled, KOTS attempts to automatically create the following Role to acquire wildcard (`* * *`) permissions in the target namespace:

  ```yaml
  apiVersion: "rbac.authorization.k8s.io/v1"
  kind: "Role"
  metadata:
    name: "kotsadm-role"
  rules:
    - apiGroups: ["*"]
      resources: ["*"]
      verb: "*"
  ```

   To support this default behavior, the user must also have `* * *` permissions in the target namespace.

* **Minimum KOTS RBAC permissions**: In some cases, it is not possible to grant the user `* * *` permissions in the target namespace. For example, an organization might have security policies that prevent this level of permissions.

  If the user installing or upgrading KOTS cannot be granted `* * *` permissions in the namespace, then they can instead request the minimum RBAC permissions required by KOTS. Using the minimum KOTS RBAC permissions also requires manually creating a ServiceAccount, Role, and RoleBinding for KOTS, rather than allowing KOTS to automatically create a Role with `* * *` permissions.

  To use the minimum KOTS RBAC permissions to install or upgrade:

  1. Ensure that the user has the minimum RBAC permissions required by KOTS. The following lists the minimum RBAC permissions:

     ```yaml
      - apiGroups: [""]
        resources: ["configmaps", "persistentvolumeclaims", "pods", "secrets", "services", "limitranges"]
        verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
      - apiGroups: ["apps"]
        resources: ["daemonsets", "deployments", "statefulsets"]
        verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
      - apiGroups: ["batch"]
        resources: ["jobs", "cronjobs"]
        verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
      - apiGroups: ["networking.k8s.io", "extensions"]
        resources: ["ingresses"]
        verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
      - apiGroups: [""]
        resources: ["namespaces", "endpoints", "serviceaccounts"]
        verbs: ["get"]
      - apiGroups: ["authorization.k8s.io"]
        resources: ["selfsubjectaccessreviews", "selfsubjectrulesreviews"]
        verbs: ["create"]
      - apiGroups: ["rbac.authorization.k8s.io"]
        resources: ["roles", "rolebindings"]
        verbs: ["get"]
      - apiGroups: [""]
        resources: ["pods/log", "pods/exec"]
        verbs: ["get", "list", "watch", "create"]
      - apiGroups: ["batch"]
        resources: ["jobs/status"]
        verbs: ["get", "list", "watch"]
     ```

     :::note
     The minimum RBAC requirements can vary slightly depending on the cluster's Kubernetes distribution and the version of KOTS. Contact your software vendor if you have the required RBAC permissions listed above and you see an error related to RBAC during installation or upgrade.
     ::: 

   1. Save the following ServiceAccount, Role, and RoleBinding to a single YAML file, such as `rbac.yaml`:

      ```yaml
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        labels:
          kots.io/backup: velero
          kots.io/kotsadm: "true"
        name: kotsadm
      ---
      apiVersion: rbac.authorization.k8s.io/v1
      kind: Role
      metadata:
        labels:
          kots.io/backup: velero
          kots.io/kotsadm: "true"
        name: kotsadm-role
      rules:
        - apiGroups: [""]
          resources: ["configmaps", "persistentvolumeclaims", "pods", "secrets", "services", "limitranges"]
          verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
        - apiGroups: ["apps"]
          resources: ["daemonsets", "deployments", "statefulsets"]
          verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
        - apiGroups: ["batch"]
          resources: ["jobs", "cronjobs"]
          verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
        - apiGroups: ["networking.k8s.io", "extensions"]
          resources: ["ingresses"]
          verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
        - apiGroups: [""]
          resources: ["namespaces", "endpoints", "serviceaccounts"]
          verbs: ["get"]
        - apiGroups: ["authorization.k8s.io"]
          resources: ["selfsubjectaccessreviews", "selfsubjectrulesreviews"]
          verbs: ["create"]
        - apiGroups: ["rbac.authorization.k8s.io"]
          resources: ["roles", "rolebindings"]
          verbs: ["get"]
        - apiGroups: [""]
          resources: ["pods/log", "pods/exec"]
          verbs: ["get", "list", "watch", "create"]
        - apiGroups: ["batch"]
          resources: ["jobs/status"]
          verbs: ["get", "list", "watch"]
      ---
      apiVersion: rbac.authorization.k8s.io/v1
      kind: RoleBinding
      metadata:
        labels:
          kots.io/backup: velero
          kots.io/kotsadm: "true"
        name: kotsadm-rolebinding
      roleRef:
        apiGroup: rbac.authorization.k8s.io
        kind: Role
        name: kotsadm-role
      subjects:
        - kind: ServiceAccount
          name: kotsadm
      ```

    1. If the application contains any Custom Resource Definitions (CRDs), add the CRDs to the Role in the YAML file that you created in the previous step with as many permissions as possible: `["get", "list", "watch", "create", "update", "patch", "delete"]`.

       :::note
       Contact your software vendor for information about any CRDs that are included in the application.
       :::

       **Example**

       ```yaml
       rules:
       - apiGroups: ["stable.example.com"]
         resources: ["crontabs"]
         verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
       ```
    
    1. Run the following command to create the RBAC resources for KOTS in the namespace:

        ```
        kubectl apply -f RBAC_YAML_FILE -n TARGET_NAMESPACE
        ```

        Replace:
        * `RBAC_YAML_FILE` with the name of the YAML file with the ServiceAccount, Role, and RoleBinding and that you created.
        * `TARGET_NAMESPACE` with the namespace where the user will install KOTS.

:::note
After manually creating these RBAC resources, the user must include both the `--ensure-rbac=false` and `--skip-rbac-check` flags when installing or upgrading. These flags prevent KOTS from checking for or attempting to create a Role with `* * *` permissions in the namespace. For more information, see [Prerequisites](installing-existing-cluster#prerequisites) in _Online Installation in Existing Clusters_.
:::

## kURL Requirements {#kurl-requirements}

To install KOTS in an embedded cluster created by kURL, your environment must meet the following requirements.

### Minimum System Requirements

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

### Additional System Requirements

You must meet the additional kURL system requirements when applicable:

- **Supported Operating Systems**: For supported operating systems, see [Supported Operating Systems](https://kurl.sh/docs/install-with-kurl/system-requirements#supported-operating-systems) in the kURL documentation.

- **kURL Dependencies Directory**: kURL installs additional dependencies in the directory /var/lib/kurl and the directory requirements must be met. See [kURL Dependencies Directory](https://kurl.sh/docs/install-with-kurl/system-requirements#kurl-dependencies-directory) in the kURL documentation.

- **Networking Requirements**: Networking requirements include firewall openings, host firewalls rules, and port availability. See [Networking Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#networking-requirements) in the kURL documentation.

- **High Availability Requirements**: If you are operating a cluster with high availability, see [High Availability Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements#high-availability-requirements) in the kURL documentation.

- **Cloud Disk Performance**: For a list of cloud VM instance and disk combinations that are known to provide sufficient performance for etcd and pass the write latency preflight, see [Cloud Disk Performance](https://kurl.sh/docs/install-with-kurl/system-requirements#cloud-disk-performance) in the kURL documentation.


## Private Registry Requirements

A private image registry is required for air gap installations. For air gap installations in existing clusters, you must provide credentials for a compatible private registry during installation. For air gap installations in kURL clusters, the kURL installer automatically uses the registry add-on to meet the private registry requirement. For more information, see [Registry Add-on](https://kurl.sh/docs/add-ons/registry) in the kURL documentation.

Private registry settings can be changed at any time. For more information, see [Using Private Registries](image-registry-settings).

KOTS has been tested for compatibility with the following registries:

<DockerCompatibility/>

## Firewall Openings for Online Installations

The domains for the services listed in the table below need to be accessible from servers performing online installations. No outbound internet access is required for air gapped installations.

For services hosted at domains owned by Replicated, the table below includes a link to the list of IP addresses for the domain at [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json) in GitHub. Note that the IP addresses listed in the `replicatedhq/ips` repository also include IP addresses for some domains that are _not_ required for installation.

For third-party services hosted at domains not owned by Replicated, the table below lists the required domains. Consult the third-party's documentation for the IP address range for each domain, as needed. 

| Host   | Existing Clusters | Embedded kURL Clusters | Description |
|--------|-------------------|-------------------|-------------|
| Docker Hub    | Required    | Required    | Some dependencies of KOTS are hosted as public images in Docker Hub. The required domains for this service are `index.docker.io`, `cdn.auth0.com`, `*.docker.io`, and `*.docker.com.` |
| `replicated.app`       | Required  | Required | <p>Upstream application YAML and metadata is pulled from `replicated.app`. The current running version of the application (if any), as well as a license ID and application ID to authenticate, are all sent to `replicated.app`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p> <p>For the range of IP addresses for `replicated.app`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L60-L65) in GitHub.</p> |
| `proxy.replicated.com` | Required&#42;| Required&#42;| <p>Private Docker images are proxied through `proxy.replicated.com`. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p> <p>For the range of IP addresses for `proxy.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L52-L57) in GitHub.</p> |
| `registry.replicated.com` | Required&#42;&#42;         | Required&#42;&#42;            | <p>Some applications host private images in the Replicated registry at this domain. The on-prem docker client uses a license ID to authenticate to `registry.replicated.com`. This domain is owned by Replicated, Inc which is headquartered in Los Angeles, CA.</p><p> For the range of IP addresses for `registry.replicated.com`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L20-L25) in GitHub.</p>
| `kots.io`              | Required     | Not Required | Requests are made to this domain when installing the Replicated KOTS CLI. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.|
| `github.com `          | Required     | Not Required | Requests are made to this domain when installing the Replicated KOTS CLI. For information about retrieving GitHub IP addresses, see [About GitHub's IP addresses](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses) in the GitHub documentation. |
| `k8s.kurl.sh`<br/>`s3.kurl.sh`    | Not Required | Required     | <p>kURL installation scripts and artifacts are served from [kurl.sh](https://kurl.sh). An application identifier is sent in a URL path, and bash scripts and binary executables are served from kurl.sh. This domain is owned by Replicated, Inc., which is headquartered in Los Angeles, CA.</p><p> For the range of IP addresses for `k8s.kurl.sh`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L34-L39) in GitHub.</p><p> The range of IP addresses for `s3.kurl.sh` are the same as IP addresses for the `kurl.sh` domain. For the range of IP address for `kurl.sh`, see [replicatedhq/ips](https://github.com/replicatedhq/ips/blob/main/ip_addresses.json#L28-L31) in GitHub.</p> |
| `amazonaws.com`  | Not Required    | Required        | `tar.gz` packages are downloaded from Amazon S3 during installations with kURL. For information about dynamically scraping the IP ranges to allowlist for accessing these packages, see [AWS IP address ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html#aws-ip-download) in the AWS documentation.|

&#42; Required only if the application uses the Replicated proxy service. Contact your software vendor for more information.

&#42;&#42; Required only if the application uses the Replicated registry. Contact your software vendor for more information.
