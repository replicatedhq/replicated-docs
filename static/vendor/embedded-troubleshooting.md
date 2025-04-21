# Troubleshoot Embedded Cluster

This topic provides information about troubleshooting Replicated Embedded Cluster installations. For more information about Embedded Cluster, including built-in extensions and architecture, see [Embedded Cluster Overview](/vendor/embedded-overview).

## Troubleshoot with Support Bundles

This section includes information about how to collect support bundles for Embedded Cluster installations. For more information about support bundles, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

### About the Default Embedded Cluster Support Bundle Spec

Embedded Cluster includes a default support bundle spec that collects both host- and cluster-level information:

* The host-level information is useful for troubleshooting failures related to host configuration like DNS, networking, or storage problems.
* Cluster-level information includes details about the components provided by Replicated, such as the Admin Console and Embedded Cluster Operator that manage install and upgrade operations. If the cluster has not installed successfully and cluster-level information is not available, then it is excluded from the bundle.

In addition to the host- and cluster-level details provided by the default Embedded Cluster spec, support bundles generated for Embedded Cluster installations also include app-level details provided by any custom support bundle specs that you included in the application release.

### Generate a Bundle For Versions 1.17.0 and Later

For Embedded Cluster 1.17.0 and later, you can run the Embedded Cluster `support-bundle` command to generate a support bundle.

The `support-bundle` command uses the default Embedded Cluster support bundle spec to collect both cluster- and host-level information. It also automatically includes any application-specific support bundle specs in the generated bundle. 

To generate a support bundle:

1. SSH onto a controller node.

   :::note
   You can SSH onto a worker node to generate a support bundle that contains information specific to that node. However, when run on a worker node, the `support-bundle` command does not capture cluster-wide information.
   :::

1. Run the following command:

   ```bash
   sudo ./APP_SLUG support-bundle
   ```

   Where `APP_SLUG` is the unique slug for the application. 

### Generate a Bundle For Versions Earlier Than 1.17.0

For Embedded Cluster versions earlier than 1.17.0, you can generate a support bundle from the shell using the kubectl support-bundle plugin.

To generate a bundle with the support-bundle plugin, you pass the default Embedded Cluster spec to collect both cluster- and host-level information. You also pass the `--load-cluster-specs` flag, which discovers all support bundle specs that are defined in Secrets or ConfigMaps in the cluster. This ensures that any application-specific specs are also included in the bundle. For more information, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.

To generate a bundle:

1. SSH onto a controller node.

1. Use the Embedded Cluster shell command to start a shell with access to the cluster:

     ```bash
     sudo ./APP_SLUG shell
     ```
     Where `APP_SLUG` is the unique slug for the application.

     The output looks similar to the following:

    ```bash
       __4___
    _  \ \ \ \   Welcome to APP_SLUG debug shell.
    <'\ /_/_/_/   This terminal is now configured to access your cluster.
    ((____!___/) Type 'exit' (or CTRL+d) to exit.
    \0\0\0\0\/  Happy hacking.
    ~~~~~~~~~~~
    root@alex-ec-2:/home/alex# export KUBECONFIG="/var/lib/embedded-cluster/k0s/pki/admin.conf"
    root@alex-ec-2:/home/alex# export PATH="$PATH:/var/lib/embedded-cluster/bin"
    root@alex-ec-2:/home/alex# source <(kubectl completion bash)
    root@alex-ec-2:/home/alex# source /etc/bash_completion
    ```

     The appropriate kubeconfig is exported, and the location of useful binaries like kubectl and the preflight and support-bundle plugins is added to PATH.

     :::note
     The shell command cannot be run on non-controller nodes.
     :::

2. Generate the support bundle using the default Embedded Cluster spec and the `--load-cluster-specs` flag:

   ```bash
   kubectl support-bundle  --load-cluster-specs /var/lib/embedded-cluster/support/host-support-bundle.yaml
   ```

## View Logs

You can view logs for both Embedded Cluster and the k0s systemd service to help troubleshoot Embedded Cluster deployments.

### View Installation Logs for Embedded Cluster

To view installation logs for Embedded Cluster:

1. SSH onto a controller node.

1. Navigate to `/var/log/embedded-cluster` and open the `.log` file to view logs.

### View k0s Logs

You can use the journalctl command line tool to access logs for systemd services, including k0s. For more information about k0s, see the [k0s documentation](https://docs.k0sproject.io/stable/).

To use journalctl to view k0s logs:

1. SSH onto a controller node or a worker node.

1. Use journalctl to view logs for the k0s systemd service that was deployed by Embedded Cluster.

    **Examples:**

    ```bash
    journalctl -u k0scontroller
    ```
    ```bash
    journalctl -u k0sworker
    ```

## Access the Cluster

When troubleshooting, it can be useful to list the cluster and view logs using the kubectl command line tool. For additional suggestions related to troubleshooting applications, see [Troubleshooting Applications](https://kubernetes.io/docs/tasks/debug/debug-application/) in the Kubernetes documentation.

To access the cluster and use other included binaries:

1. SSH onto a controller node.

     :::note
     You cannot run the `shell` command on worker nodes.
     :::

1. Use the Embedded Cluster shell command to start a shell with access to the cluster:

     ```
     sudo ./APP_SLUG shell
     ```
     Where `APP_SLUG` is the unique slug for the application.

     The output looks similar to the following:
     ```
        __4___
     _  \ \ \ \   Welcome to APP_SLUG debug shell.
    <'\ /_/_/_/   This terminal is now configured to access your cluster.
     ((____!___/) Type 'exit' (or CTRL+d) to exit.
      \0\0\0\0\/  Happy hacking.
     ~~~~~~~~~~~
    root@alex-ec-1:/home/alex# export KUBECONFIG="/var/lib/embedded-cluster/k0s/pki/admin.conf"
    root@alex-ec-1:/home/alex# export PATH="$PATH:/var/lib/embedded-cluster/bin"
    root@alex-ec-1:/home/alex# source <(k0s completion bash)
    root@alex-ec-1:/home/alex# source <(cat /var/lib/embedded-cluster/bin/kubectl_completion_bash.sh)
    root@alex-ec-1:/home/alex# source /etc/bash_completion
    ```

     The appropriate kubeconfig is exported, and the location of useful binaries like kubectl and Replicated’s preflight and support-bundle plugins is added to PATH.

1. Use the available binaries as needed.

     **Example**:

     ```bash
     kubectl version
     ```
     ```
     Client Version: v1.29.1
     Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
     Server Version: v1.29.1+k0s
     ```

1. Type `exit` or **Ctrl + D** to exit the shell.

## Troubleshoot Errors

This section provides troubleshooting advice for common errors.

### Installation failure when NVIDIA GPU Operator is included as Helm extension {#nvidia}

#### Symptom

A release that includes that includes the NVIDIA GPU Operator as a Helm extension fails to install.

#### Cause 

If there are any containerd services on the host, the NVIDIA GPU Operator will generate an invalid containerd config, causing the installation to fail.

This is the result of a known issue with v24.9.x of the NVIDIA GPU Operator. For more information about the known issue, see [container-toolkit does not modify the containerd config correctly when there are multiple instances of the containerd binary](https://github.com/NVIDIA/nvidia-container-toolkit/issues/982) in the nvidia-container-toolkit repository in GitHub.

For more information about including the GPU Operator as a Helm extension, see [NVIDIA GPU Operator](/vendor/embedded-using#nvidia-gpu-operator) in _Using Embedded Cluster_.

#### Solution

To troubleshoot:

1. Remove any existing containerd services that are running on the host (such as those deployed by Docker).

1. Reset and reboot the node:

    ```bash
    sudo ./APP_SLUG reset
    ```
    Where `APP_SLUG` is the unique slug for the application. 

    For more information, see [Reset a Node](/vendor/embedded-using#reset-a-node) in _Using Embedded Cluster_.

1. Re-install with Embedded Cluster.

### Calico networking issues 

#### Symptom

Symptoms of Calico networking issues can include:

* The pod is stuck in a CrashLoopBackOff state with failed health checks:

    ```
    Warning Unhealthy 6h51m (x3 over 6h52m) kubelet Liveness probe failed: Get "http://<ip:port>/readyz": dial tcp <ip:port>: connect: no route to host
    Warning Unhealthy 6h51m (x19 over 6h52m) kubelet Readiness probe failed: Get "http://<ip:port>/readyz": dial tcp <ip:port>: connect: no route to host
    ....
    Unhealthy               pod/registry-dc699cbcf-pkkbr     Readiness probe failed: Get "https://<ip:port>/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
    Unhealthy               pod/registry-dc699cbcf-pkkbr     Liveness probe failed: Get "https://<ip:port>/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
    ...
    ```

* The pod log contains an I/O timeout:

    ```
    server APIs: config.k8ssandra.io/v1beta1: Get \"https://***HIDDEN***:443/apis/config.k8ssandra.io/v1beta1\": dial tcp ***HIDDEN***:443: i/o timeout"}
    ```

#### Cause 

Reasons can include:

* Pod CIDR and service CIDR overlap with the host network CIDR.

* Incorrect kernel parameters values.

* VXLAN traffic getting dropped. By default, Calico uses VXLAN as the overlay networking protocol, with Always mode. This mode encapsulates all pod-to-pod traffic in VXLAN packets. If for some reasons, the VXLAN packets get filtered by the network, the pod will not able to communicate with other pods.

#### Solution

<Tabs>
  <TabItem value="overlap" label="Pod CIDR and service CIDR overlap with the host network CIDR" default>
  To troubleshoot pod CIDR and service CIDR overlapping with the host network CIDR:
  1. Run the following command to verify the pod and service CIDR:
        ```
        cat /etc/k0s/k0s.yaml | grep -i cidr
            podCIDR: 10.244.0.0/17
            serviceCIDR: 10.244.128.0/17
        ```
        The default pod CIDR is 10.244.0.0/16 and service CIDR is 10.96.0.0/12.

    1. View pod network interfaces excluding Calico interfaces, and ensure there are no overlapping CIDRs.
        ```
        ip route | grep -v cali
        default via 10.152.0.1 dev ens4 proto dhcp src 10.152.0.4 metric 100
        10.152.0.1 dev ens4 proto dhcp scope link src 10.152.0.4 metric 100
        blackhole 10.244.101.192/26 proto 80
        169.254.169.254 via 10.152.0.1 dev ens4 proto dhcp src 10.152.0.4 metric 100
        ```

    1. Reset and reboot the installation:

       ```bash
       sudo ./APP_SLUG reset
       ```
       Where `APP_SLUG` is the unique slug for the application. 

       For more information, see [Reset a Node](/vendor/embedded-using#reset-a-node) in _Using Embedded Cluster_.

    1. Reinstall the application with different CIDRs using the `--cidr` flag:

        ```bash
        sudo ./APP_SLUG install --license license.yaml --cidr 172.16.136.0/16
        ```

        For more information, see [Embedded Cluster Install Options](/reference/embedded-cluster-install).
  </TabItem>
  <TabItem value="kernel" label="Incorrect kernel parameter values">
  Embedded Cluster 1.19.0 and later automatically sets the `net.ipv4.conf.default.arp_filter`, `net.ipv4.conf.default.arp_ignore`, and `net.ipv4.ip_forward` kernel parameters. Additionally, host preflight checks automatically run during installation to verify that the kernel parameters were set correctly. For more information about the Embedded Cluster preflight checks, see [About Host Preflight Checks](/vendor/embedded-using#about-host-preflight-checks) in _Using Embedded Cluster_.

  If kernel parameters are not set correctly and these preflight checks fail, you might see a message such as `IP forwarding must be enabled.` or `ARP filtering must be disabled by default for newly created interfaces.`.

  To troubleshoot incorrect kernel parameter values:       
    
    1. Use sysctl to set the kernel parameters to the correct values:

        ```bash
        echo "net.ipv4.conf.default.arp_filter=0" >> /etc/sysctl.d/99-embedded-cluster.conf
        echo "net.ipv4.conf.default.arp_ignore=0" >> /etc/sysctl.d/99-embedded-cluster.conf
        echo "net.ipv4.ip_forward=1" >> /etc/sysctl.d/99-embedded-cluster.conf

        sysctl --system
        ```

    1. Reset and reboot the installation:

       ```bash
       sudo ./APP_SLUG reset
       ```
       Where `APP_SLUG` is the unique slug for the application. 
       For more information, see [Reset a Node](/vendor/embedded-using#reset-a-node) in _Using Embedded Cluster_.

    1. Re-install with Embedded Cluster.
  </TabItem>
  <TabItem value="vxlan" label="VXLAN traffic dropped">

  As a temporary troubleshooting measure, set the mode to CrossSubnet and see if the issue persists. This mode only encapsulates traffic between pods across different subnets with VXLAN.

        ```bash
        kubectl patch ippool default-ipv4-ippool --type=merge -p '{"spec": {"vxlanMode": "CrossSubnet"}}'
        ```
    
    If this resolves the connectivity issues, there is likely an underlying network configuration problem with VXLAN traffic that should be addressed.
  </TabItem>
</Tabs>