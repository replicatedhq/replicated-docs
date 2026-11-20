# Create and manage environments with CMX

This topic describes how to use Replicated Compatibility Matrix (CMX) to create and manage clusters and VMs.

This topic includes information about creating and managing environments with CMX using the Replicated Vendor Portal or the Replicated CLI. For information about creating and managing clusters with the Vendor API v3, see the [clusters](https://replicated-vendor-api.readme.io/reference/listclusterusage) section in the Vendor API v3 documentation.

## Prerequisites

* Create an account in the Replicated Vendor Portal. See [Create a Vendor Account](/vendor/vendor-portal-creating-account).

* Install the Replicated CLI and then authorize the CLI using your vendor account. See [Install the Replicated CLI](/reference/replicated-cli-installing).

* If you have a contract, you can purchase more credits by going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix). Otherwise, you can request credits by going to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix) in the Vendor Portal. For more information, see [Billing and Credits](/vendor/testing-about#billing-and-credits).

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.

## Create environments

For information about how to create environments with the CLI, see [replicated cluster create](/reference/replicated-cli-cluster-create) and [replicated vm create](/reference/replicated-cli-vm-create).

To create an environment with CMX from the Vendor Portal:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix/create-cluster).

1. Click **Create** and choose **Create Kubernetes cluster** or **Create VM**:

   * **Create Kubernetes cluster:**
     
     1. On the **Create a cluster** page, choose the Kubernetes distribution and version.
     
     1. (Optional) Add a name for the cluster, add tags, and adjust the Time to Live (TTL).
     
     1. (Optional) For **Nodes & Nodes Groups**, add and configure additional nodes and node groups for the cluster.
      
      The following is an example of the **Create a cluster** page:
      <img alt="Create a cluster page" src="/images/create-a-cluster.png" width="650px"/>
      [View a larger version of this image](/images/create-a-cluster.png)

   * **Create VM:**
     
     1. On the **Create a Virtual Machine** page, choose the OS distribution and version.
     
     1. (Optional) Add a name for the VM, add tags, and adjust the Time to Live (TTL).
     
     1. (Optional) For **VM Config**, choose the instance type and disk size. You can also create multiple VMs of the same type by increasing the **Count**.
         
        :::note
        You can create TLS certs and DNS records in the **Ingress & Ports** tab _after_ the VM has been created. See [Expose Ports](/vendor/testing-ingress#expose-ports).
        :::
        
      The following is an example of the **Create a Virtual Machine** page:
      <img alt="create vm page in the vendor portal" src="/images/compatibility-matrix-create-vm.png" width="650px"/>
      [View a larger version of this image](/images/compatibility-matrix-create-vm.png)

1. Click **Create cluster** or **Create VM**.

   The environment is displayed in the list on the Compatibility Matrix **Overview** page with a status of Assigned. When the environment is ready, the status is changed to Running.

## Create air-gapped environments {#air-gap}

:::note
Using the `airgap` network policy to simulate an air-gapped environment is supported only for VMs and [VM-based clusters](/vendor/testing-supported-clusters#vm-clusters). Clusters that use cloud-based distributions do not support the `airgap` network policy.
:::

VMs and [VM-based clusters](/vendor/testing-supported-clusters#vm-clusters) created with CMX can use one of the following network policies:

| Network Policy | Description |
| :---- | :---- |
| `open` | No restrictions on network traffic. |
| `airgap` | Restrict all network traffic. |

By default, all VMs and VM-based clusters are created with an `open` network policy. You can change the network policy to `airgap` to block outbound network requests. This is useful for simulating an air-gapped environment with no outbound internet access so that you can test how your application performs.

Network policies are configured at the network level and apply to all VMs and environments connected to the network.

You can also use CMX to generate reports that track and summarize network activity on CMX networks. For more information, see [Collect and View Network Reports](/vendor/testing-network-policy).

### VM-based cluster

To create an air-gapped cluster:

1. Create a cluster:

    ```bash
    replicated cluster create --distribution VM_BASED_DISTRIBUTION
    ```
    Where `VM_BASED_DISTRIBUTION` is the target VM-based cluster distribution. For a list of supported distributions, see [VM Clusters](/vendor/testing-supported-clusters#vm-clusters).

1. Watch until the cluster status is `running`:

    ```bash
    replicated cluster ls --watch
    ```

1. Access the cluster in a shell:

    ```
    replicated cluster shell CLUSTER_ID
    ```
    Where `CLUSTER_ID` is the ID of the cluster that you created from the output of the `cluster ls` command.      

1. Change the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `cluster ls` command.

1. Verify that the cluster's policy is `airgap` and the status is `running`:

    ```bash
    replicated cluster ls
    ```

    ```bash
    ID       NAME                STATUS       CREATED                 EXPIRES                POLICY   HAS REPORT
    bdeb3515 gifted_antonelli    running      2025-01-28 18:45 PST    2025-01-28 19:45 PST   airgap   off 
    ```

1. (Optional) Enable network reporting to track network activity. See [Collect and View Network Reports](/vendor/testing-network-policy).

### VM

To create an air-gapped VM:

1. Create a VM:

    ```bash
    replicated vm create --distribution ubuntu
    ```

1. Wait until the VM status is running:

    ```bash
    replicated vm ls
    ```

1. SSH onto the VM:

   ```bash
   ssh VM_ID@replicatedvm.com
   ```  
   Where `VM_ID` is the ID of the VM from the output of the `vm ls` command.

   For more information and additional options, see [Connect to CMX VMs (SSH and File Transfer)](/vendor/testing-vm-create).

1. Set the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `vm ls` command.

    **Example:**

    ```bash
    replicated network update 85eb50a8 --policy airgap
    ```

    ```bash
    ID       NAME                STATUS        CREATED                 EXPIRES                POLICY   HAS REPORT
    85eb50a8 silly_rosalind      updating      2025-01-28 16:16 PST    2025-01-28 17:18 PST   airgap   off
    ```

1. (Optional) Enable network reporting to track network activity. See [Collect and View Network Reports](/vendor/testing-network-policy).

## Access environments

After a CMX cluster or VM is running, you can access the environment using the `replicated cluster shell` or `ssh` command that is available in the Compatibility Matrix UI.
   
* **To access a cluster with kubectl:**

  ```bash
  replicated cluster shell CLUSTER_ID
  ``` 
  Where `CLUSTER_ID` is the ID of the running cluster.

* **To SSH into a VM:**

  1. If you have not done so already, set up SSH access using a public/private key pair. See [Prerequisite: Set Up SSH](/vendor/testing-vm-create#set-up-ssh) in _Connect to VMs (SSH and File Transfer)_.

  1. Run the following command:

      ```bash
      ssh VMID@replicatedvm.com
      ```
      Where `VMID` is the ID of the running VM.

  1. Respond to the prompts to add the fingerprint for `replicatedvm.com` and enter the passphrase for your SSH key.

## Create environments on the same network {#shared-networks}

You can create VMs and clusters with CMX that use the same network.

### Connect a VM with a cluster on the same network

You can make a CMX cluster available on the same network as a CMX VM.

#### Supported cluster distributions

Openshift, K3s, RKE2, EC, kURL, kind

#### Requirement

Replicated CLI 0.90.0 or later

To connect a VM with a cluster on the same network:

1. Create a cluster:

    ```bash
    replicated cluster create --distribution K8S_DISTRIBUTION
    ```

    For example, `replicated cluster create --distribution k3s`.

1. In the output of the `cluster create` command, under `NETWORK`, copy the network ID.

    Example:

    ```
    ID         NAME              DISTRIBUTION    VERSION    STATUS    NETWORK     CREATED                EXPIRES  COST
    6b14376c   ecstatic_raman    k3s             1.33.2     queued    accbd6a7    2025-08-04 13:20 PDT   -        $0.60
    ```
    In the example above, the network ID is `accbd6a7`.

1. Create a VM on the same network:

    ```bash
    replicated vm create --distribution DISTRIBUTION --network NETWORK_ID
    ```
    Where `NETWORK_ID` is the network ID that you copied in the previous step.

    For example, `replicated vm create --distribution ubuntu --network accbd6a7`.

    Example output:

    ```
    ID         NAME                 DISTRIBUTION   VERSION   STATUS     NETWORK    CREATED                EXPIRES  COST
    760a30b1   suspicious_poitras   ubuntu         24.04     assigned   accbd6a7   2025-08-04 13:24 PDT   -        $0.60
    ```

### Create VMs on the same network

Use the `--count` flag to create multiple VMs with the same name, all running on the same Network ID.

```bash
replicated vm create --distribution ubuntu --count 3
```

### Join VMs to an existing network

To join one or more new VMs to the network of an existing VM:

1. Run one of the following commands to get the ID of an existing VM network:

   * List VMs:
     ```bash
     replicated vm ls
     ```

   * List networks: 
     ```bash
     replicated network ls
     ```

1. In the output of the command, copy the network ID.

1. Use the `--network` flag to create a new VM on the same network:

    ```bash
    replicated vm create --distribution ubuntu --network NETWORK_ID
    ``` 
    Where `NETWORK_ID` is the network ID that you copied in the previous step.

## Test installations behind an HTTP proxy {#proxy}

Some customers allow outbound internet traffic only through an HTTP or HTTPS proxy. You can use CMX to test that your application installs and runs in this kind of environment. Run a proxy on one VM, and install your application on a second VM on the same network that can reach the internet only through the proxy.

CMX network policies apply to every VM on a network. If you set the network policy to `airgap`, the proxy VM also loses internet access. Instead, leave the network policy set to `open` and block direct internet access on the installation VM with a host firewall.

The following procedure is an example. It uses Ubuntu VMs, the Squid proxy, nftables, and an Embedded Cluster installation. Squid and nftables are third-party tools that Replicated does not support, and their packages, defaults, and commands can change over time. You can use any proxy and firewall that you prefer, and adapt the steps to match the environments that your customers use.

To test an installation behind an HTTP proxy using Squid and nftables:

1. Create a VM for the proxy:

    ```bash
    replicated vm create --distribution ubuntu --version 24.04 --name proxy
    ```

    In the output of the command, copy the network ID.

1. Create a VM for the installation on the same network:

    ```bash
    replicated vm create --distribution ubuntu --version 24.04 --instance-type INSTANCE_TYPE --name install --network NETWORK_ID
    ```

    Where:
    * `INSTANCE_TYPE` is an instance type that meets the requirements for your application and for Embedded Cluster, such as `r1.large`.
    * `NETWORK_ID` is the network ID that you copied in the previous step.

1. SSH into each VM and get its network interface and private IP address:

    ```bash
    ip -4 -br addr show scope global
    ```

    **Example output:**

    ```
    eth1             UP             10.0.0.11/24
    ```

    In this example, the interface is `eth1`, the private IP address is `10.0.0.11`, and the network CIDR is `10.0.0.0/24`. Both VMs use the same interface name and network CIDR.

1. On the proxy VM, install Squid and allow requests from the CMX network. The default Squid configuration on Ubuntu denies requests from other hosts. For more information about configuring Squid, see the [Squid documentation](https://www.squid-cache.org/Doc/).

    ```bash
    sudo apt-get update && sudo apt-get install -y squid
    sudo tee /etc/squid/conf.d/cmx.conf <<EOF
    acl cmx_network src NETWORK_CIDR
    http_access allow cmx_network
    EOF
    sudo systemctl restart squid
    ```

    Where `NETWORK_CIDR` is the network CIDR, such as `10.0.0.0/24`.

    Squid listens on port 3128.

1. On the installation VM, install nftables, and then block outbound traffic to any address outside the CMX network. Install nftables first, because the package download needs direct internet access.

    ```bash
    sudo apt-get update && sudo apt-get install -y nftables
    sudo nft -f - <<EOF
    table inet block_egress {
      chain output {
        type filter hook output priority 0; policy accept;
        oifname "INTERFACE" ip daddr != NETWORK_CIDR drop
      }
      chain forward {
        type filter hook forward priority 0; policy accept;
        oifname "INTERFACE" ip daddr != NETWORK_CIDR drop
      }
    }
    EOF
    ```

    Where:
    * `INTERFACE` is the network interface, such as `eth1`.
    * `NETWORK_CIDR` is the network CIDR, such as `10.0.0.0/24`.

    The `output` chain blocks traffic from the VM itself. The `forward` chain blocks traffic from Kubernetes pods, so that your application's pods also cannot bypass the proxy.

1. On the installation VM, confirm that direct requests fail and that requests through the proxy succeed:

    ```bash
    curl -sS -m 10 -o /dev/null -w "%{http_code}\n" https://replicated.app
    curl -sS -m 10 -o /dev/null -w "%{http_code}\n" -x http://PROXY_IP:3128 https://replicated.app
    ```

    Where `PROXY_IP` is the private IP address of the proxy VM.

    The first command fails after 10 seconds. The second command returns `200`.

1. In the Vendor Portal, go to the page for the customer that you want to install with. Click **Install instructions** and select **Embedded Cluster**.

1. On the installation VM, run the commands from the dialog with the following changes:

    * Add `-x http://PROXY_IP:3128` to the `curl` command that downloads the installation assets.
    * Add `--http-proxy http://PROXY_IP:3128 --https-proxy http://PROXY_IP:3128` to the `install` command.

    Embedded Cluster automatically excludes the node's network, the pod and service networks, and localhost from the proxy. Use the `--no-proxy` flag only for other hosts that your customers reach without the proxy. For more information, see [install](/embedded-cluster/v3/embedded-cluster-install).

1. After the installation completes, on the proxy VM, review the requests that went through the proxy:

    ```bash
    sudo tail -n 50 /var/log/squid/access.log
    ```

    The log lists the requests from the installation VM, such as requests to `replicated.app` and `proxy.replicated.com`, and to any other endpoints that your application uses.

1. Confirm that the application is running, and that the instance appears on the customer's page in the Vendor Portal.

1. When you are done, delete both VMs. See [Delete environments](#delete-environments).

### Application pods and preflight checks behind a proxy

Embedded Cluster passes the proxy settings to its own components and to the Replicated SDK. It does not pass them to your application's pods. If your application, or a preflight check that runs a pod, makes requests to the internet, pass the proxy settings to those pods. For example, set the `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` environment variables with the `HTTPProxy`, `HTTPSProxy`, and `NoProxy` template functions. See [Static context](/reference/template-functions-static-context#httpproxy).

Otherwise, those requests fail behind a proxy. In a proxy test, a request from your application or a preflight check that fails is a request that ignores the proxy.

## Create a cluster and install a release with `cluster prepare` {#prepare-clusters}

The [`cluster prepare`](/reference/replicated-cli-cluster-prepare) command reduces the number of steps required to provision a cluster and then deploy a release to the cluster. This is useful in continuous integration (CI) workflows that run multiple times a day. For an example workflow that uses the `cluster prepare` command, see [Recommended CI/CD Workflows](/vendor/ci-workflows).

The `cluster prepare` command does the following:
* Creates a cluster
* Creates a release for your application based on either a Helm chart archive or a directory containing the application YAML files
* Creates a temporary customer of type `test`
  :::note
  Test customers created by the `cluster prepare` command are not saved in your Vendor Portal team.
  :::
* Installs the release in the cluster using either the Helm CLI or Replicated KOTS

The `cluster prepare` command requires either a Helm chart archive or a directory containing the application YAML files to be installed:

* **Install a Helm chart with the Helm CLI**:

  ```bash
  replicated cluster prepare \
    --distribution K8S_DISTRO \
    --version K8S_VERSION \
    --chart HELM_CHART_TGZ
  ```
  The following example creates a kind cluster and installs a Helm chart in the cluster using the `nginx-chart-0.0.14.tgz` chart archive:
  ```bash
  replicated cluster prepare \
    --distribution kind \
    --version 1.27.0 \
    --chart nginx-chart-0.0.14.tgz \
    --set key1=val1,key2=val2 \
    --set-string s1=val1,s2=val2 \
    --set-json j1='{"key1":"val1","key2":"val2"}' \
    --set-literal l1=val1,l2=val2 \
    --values values.yaml
  ```

* **Install with KOTS from a YAML directory**:

  ```bash
  replicated cluster prepare \
    --distribution K8S_DISTRO \
    --version K8S_VERSION \
    --yaml-dir PATH_TO_YAML_DIR
  ```
  The following example creates a k3s cluster and installs an application in the cluster using the manifest files in a local directory named `config-validation`: 
  ```bash
  replicated cluster prepare \
    --distribution k3s \
    --version 1.26 \
    --namespace config-validation \
    --shared-password password \
    --app-ready-timeout 10m \
    --yaml-dir config-validation \
    --config-values-file conifg-values.yaml \
    --entitlements "num_of_queues=5"
    ```

For command usage, including additional options, see [cluster prepare](/reference/replicated-cli-cluster-prepare).

## Edit environments

You can make changes to an environment after creating it. For example, you could extent to TTL or add DNS records to expose ports on a VM.

To edit environments:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix/create-cluster). 

1. In the vertical dots menu for the target environment, click **Edit [VM/cluster]**.

   ![Dot menu with edit and delete options](/images/cmx-vm-edit-delete.png)
   [View a larger version of this image](/images/cmx-vm-edit-delete.png)

1. Make changes to the environment as needed.   

## Delete environments

For information about deleting environments using the Replicated CLI, see [replicated cluster rm](/reference/replicated-cli-cluster-rm) and [replicated vm rm](/reference/replicated-cli-vm-rm)

To delete a cluster using the Vendor Portal:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix/create-cluster).

1. In the vertical dots menu for the target environment, click **Delete [VM/cluster]**.

   ![Dot menu with edit and delete options](/images/cmx-vm-edit-delete.png)
   [View a larger version of this image](/images/cmx-vm-edit-delete.png)

1. In the dialog, click **Delete [VM/cluster]** again to confirm.