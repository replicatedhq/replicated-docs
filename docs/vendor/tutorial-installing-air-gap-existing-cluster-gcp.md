# Installing in an Air Gapped Existing Cluster using GCP

This tutorial shows how to install the Replicated app manager in an existing cluster in an _air gapped_ environment, where the workstation and the cluster have no outbound internet connectivity.

You will be doing what the Terraform Enterprise team refers to as modern air gapped or _2019 air gapped_ in [How Hashicorp delivers On-prem with Replicated](https://blog.replicated.com/hashicorp-recording/), which is essentially a cloud VPC without an internet gateway.

Most importantly, this tutorial presents a set of steps for creating a full environment in GCP, including:

* An air gapped instance running basic Kubernetes (without the app manager)
* An air gapped workstation instance from which you will run the deployment
* An online jump box server that represents a DMZ with `scp` or sneakernet access to the air gapped virtual machines (VMs)

If you are planning to deploy your application to air gapped Amazon EKS, Red Hat Openshift, or another locked-down Kubernetes cluster, this tutorial is a great way to set up a testing environment in which to experiment.

## Prerequisites

* Complete the [existing cluster quick start](tutorial-installing-with-existing-cluster) to set up a non-air gapped cluster.

## End to End GCP Example

You will set up these 3 instances in GCP. Unless otherwise specified, all commands are being run from a MacOS workstation outside of this environment.

**Example:**

```
airgap-jump               us-central1-b  n1-standard-1    10.240.0.127  35.193.94.81     RUNNING
airgap-cluster            us-central1-b  n1-standard-1    10.240.0.41                    RUNNING
airgap-workstation        us-central1-b  n1-standard-1    10.240.0.26                    RUNNING
```


This tutorial does a lot of network configuration for IP address management, but omits any details regarding opening ports.
While you can open specific ports between instances and to the public web, this example is working with the inter-instance traffic wide open. For more information about opening additional Transmission Control Protocol (TCP) ports, such as `32000`, and other NodePort services that you will create in this guide, see the `gcloud compute firewall-rules --help` docs.

Because you will use SSH tunneling for reaching the instances in the cluster, it is not necessary to open ports for those air gapped instances to have access from the outside world.

### Create Instances

Pick some names for your instances and export them, for example:

```shell script
export AIRGAP_JUMP=airgap-jump
export AIRGAP_WORKSTATION=airgap-workstation
export AIRGAP_CLUSTER=airgap-cluster
```

### Create a Jump Box

Create a VM with a public IP. This will be your jump box with both public internet access and access to the air gapped environment.

```shell script
gcloud compute instances create ${AIRGAP_JUMP} \
  --image-project ubuntu-os-cloud \
  --image-family ubuntu-1804-lts \
  --machine-type n1-standard-1
```

### Create an Air Gapped Workstation

To create an air gapped workstation:

1. Create a GCP VM to be your air gapped workstation. To start, give it outbound network access to facilitate installing Docker, but you will disconnect it from the internet afterwards.

  ```shell script
  gcloud compute instances create ${AIRGAP_WORKSTATION} \
    --boot-disk-size=200GB \
    --image-project ubuntu-os-cloud \
    --image-family ubuntu-1804-lts \
    --machine-type n1-standard-1
  ```

  ```shell script
  export LINUX_USER=<your-Linux-username>
  gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
    'sudo apt update && sudo apt install -y docker.io'
  gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
    'sudo snap install kubectl --classic'

  gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
    "sudo usermod -aG docker ${LINUX_USER}"

  ```

1. Remove the machine's public IP:

  ```shell script
  gcloud compute instances delete-access-config ${AIRGAP_WORKSTATION}
  ```

1. Verify that internet access was disabled by using SSH to the jump box and using `curl` with kubernetes.io.
You will forward the SSH agent with `--ssh-flag=-A` so that you can use SSH to access the air gapped workstation without moving keys around. The following command assumes that you are using `ssh-add` to manage identities on your MacOS workstation:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    "ssh ${AIRGAP_WORKSTATION} 'curl -v https://kubernetes.io'"
  ```

  This command should hang, and you can see something similar to `Network is unreachable`:

  ```text
    0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0*   Trying 2607:f8b0:4001:c05::64...
    * TCP_NODELAY set
    * Immediate connect fail for 2607:f8b0:4001:c05::64: Network is unreachable
    0     0    0     0    0     0      0      0 --:--:--  0:00:03 --:--:--     0
  ```

1. After you are satisfied that the instance has no outbound connectivity, you can use Ctrl+C to exit this command and proceed to setting up the air gapped cluster.


### Create an Air Gapped Cluster with a Registry

To create an air gapped cluster with a registry:

1. Create a GCP VM with online internet access to be the air gapped cluster. As before, use an internet connection to install Kubernetes and get a registry up and running before you remove access access:

  ```shell script
  gcloud compute instances create ${AIRGAP_CLUSTER} \
    --boot-disk-size=200GB \
    --image-project ubuntu-os-cloud \
    --image-family ubuntu-1804-lts \
    --machine-type n1-standard-4
  ```

 1. Before you install Docker and Kubernetes, get the private IP and set it as an insecure Docker registry:

  ```shell script
  export CLUSTER_PRIVATE_IP=$( \
    gcloud compute instances describe ${AIRGAP_CLUSTER} \
    --format='get(networkInterfaces[0].networkIP)')
  # verify
  echo ${CLUSTER_PRIVATE_IP}
  ```

  ```shell script
   gcloud compute ssh ${AIRGAP_CLUSTER} -- "sudo mkdir -p /etc/docker"
   gcloud compute ssh ${AIRGAP_CLUSTER} -- \
    "echo \"{\\\"insecure-registries\\\":[\\\"${CLUSTER_PRIVATE_IP}:32000\\\"]}\" | sudo tee /etc/docker/daemon.json"
  ```

1. Use SSH to access the instance and bootstrap a minimal single-primary Kubernetes cluster. For more information, see the [kURL documentation](https://kurl.sh/8d4f215).

  ```shell script
  gcloud compute ssh ${AIRGAP_CLUSTER} -- 'curl  https://k8s.kurl.sh/8d4f215  | sudo bash'
  ```

1. Deploy a minimal registry and verify that it is running:

  ```shell script
  gcloud compute ssh ${AIRGAP_CLUSTER} -- \
    'kubectl --kubeconfig /etc/kubernetes/admin.conf apply -f https://raw.githubusercontent.com/replicatedhq/replicated-automation/master/customer/existing-cluster-airgap/plain-registry.yaml'
  ```

1. The following gist configures a basic auth htpasswd that configures a username/password for `kots/kots`, which you will use later:

  ```shell script
  gcloud compute ssh ${AIRGAP_CLUSTER} -- \
    'kubectl --kubeconfig /etc/kubernetes/admin.conf get pod,svc -n registry'
  ```

1. After the registry is up, verify that you can use `docker push` and `docker pull` to access it using the public IP attached to the instance:

  ```shell script
  export CLUSTER_PUBLIC_IP=$( \
    gcloud compute instances describe ${AIRGAP_CLUSTER} \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
  docker login --username kots --password kots ${CLUSTER_PUBLIC_IP}:32000
  docker pull busybox
  docker tag busybox ${CLUSTER_PUBLIC_IP}:32000/busybox
  docker push ${CLUSTER_PUBLIC_IP}:32000/busybox
  ```

  You should see `Pushed` if it is successful.

  **Example output:**

  ```shell
  be8b8b42328a: Pushed
  ```

  If you see the following error, you may need to add an `insecure-registries` entry to your workstation to allow pushing/pulling using HTTP instead of HTTPS:

  ```shell
  Error response from daemon: Get https://<CLUSTER_PUBLIC_IP>:32000/v2/: http: server gave HTTP response to HTTPS client
  ```

1. If you are testing using docker-for-mac, you can use the settings to add the following:

  ```json
  {
    "debug": true,
    "experimental": false,
    "insecure-registries": [
      "<CLUSTER_PUBLIC_IP>:32000"
    ]
  }
  ```

  ![insecure registry](/images/guides/kots/airgap-existing-dfm-insecure-registry.png)

1. Remove the machine's public IP. You will use the kubeconfig from this server later.

  ```shell script
  gcloud compute instances delete-access-config ${AIRGAP_CLUSTER}
  ```

1. Verify that internet access was disabled by using SSH through the jump box and trying to use `curl` with kubernetes.io. You will forward the agent so that you can use SSH with the air gapped cluster without moving keys around:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    "ssh ${AIRGAP_CLUSTER} 'curl -v https://kubernetes.io'"
  ```

  This command should hang, and you can see a message such as `Network is unreachable`:

  ```text
    0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0*   Trying 2607:f8b0:4001:c05::64...
    * TCP_NODELAY set
    * Immediate connect fail for 2607:f8b0:4001:c05::64: Network is unreachable
    0     0    0     0    0     0      0      0 --:--:--  0:00:03 --:--:--     0
  ```

1. After you are satisfied the instance has no outbound connectivity, you can use Ctrl+C to exit this command and proceed to finalizing your workstation configuration.

### Finalize the Workstation Setup

Verify the Docker client on the workstation and make sure that you have `kubectl` access properly configured before you run the full installation. Use SHH to access the workstation through the jump box.

#### Docker

1. Use the same `CLUSTER_PRIVATE_IP` address that you stored earlier to configure an insecure registry on the air gapped workstation.

  ```shell script
  export CLUSTER_PRIVATE_IP=$( \
    gcloud compute instances describe ${AIRGAP_CLUSTER} \
    --format='get(networkInterfaces[0].networkIP)')
  # verify
  echo ${CLUSTER_PRIVATE_IP}
  ```

1. Create a docker daemon config to trust this registry from the workstation and from the cluster.
    1. Run the following command to verify that no existing daemon JSON config exists on the workstation (if it does, you'll have to modify the next step slightly to just add the registry setting).

      ```shell script
      gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
        "ssh ${AIRGAP_WORKSTATION} 'cat /etc/docker/daemon.json'"
      ```

      **Example output:**

      ```text
      cat: /etc/docker/daemon.json: No such file or directory
      ```

    1. Create a config with the insecure registry, and then restart Docker:

      ```shell script
       gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
        "ssh ${AIRGAP_WORKSTATION} 'echo \"{\\\"insecure-registries\\\":[\\\"${CLUSTER_PRIVATE_IP}:32000\\\"]}\" | sudo tee /etc/Docker/daemon.json'"
       gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
        "ssh ${AIRGAP_WORKSTATION} -- sudo systemctl restart docker"
      ```

    1. Before proceeding, run the following command a few times until Docker has come back up:

      ```shell script
      gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
        "ssh ${AIRGAP_WORKSTATION} -- docker image ls"
      ```

      After Docker is ready, you should see the following output:

      ```shell script
      REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
      ```

1. Verify connectivity with a login and pull of the image that you previously pushed:

  ```shell script
   gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    "ssh ${AIRGAP_WORKSTATION} -- docker login ${CLUSTER_PRIVATE_IP}:32000 --username kots --password kots"

   gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    "ssh ${AIRGAP_WORKSTATION} -- docker pull ${CLUSTER_PRIVATE_IP}:32000/busybox:latest"
  ```

  **Example output:**

    ```text
    latest: Pulling from busybox
    91f30d776fb2: Pulling fs layer
    91f30d776fb2: Verifying Checksum
    91f30d776fb2: Download complete
    91f30d776fb2: Pull complete
    Digest: sha256:2131f09e4044327fd101ca1fd4043e6f3ad921ae7ee901e9142e6e36b354a907
    Status: Downloaded newer image for 10.240.0.100:32000/busybox:latest
    10.240.0.100:32000/busybox:latest
    ```

#### `kubectl`

To access the `admin.conf` from the cluster and run a few `kubectl` commands to verify that it is working:

1. Use SSH into the air gapped workstation:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- "ssh -A ${AIRGAP_WORKSTATION}"
  ```

1. From the air gapped workstation, run the following command:

  ```shell script
  export AIRGAP_CLUSTER=airgap-cluster
  scp ${AIRGAP_CLUSTER}:admin.conf .
  export KUBECONFIG=$PWD/admin.conf
  kubectl get ns
  kubectl get pod -n kube-system
  ```

  **Example output:**

  ```text
  NAME                                     READY   STATUS    RESTARTS   AGE
  coredns-5644d7b6d9-j6gqs                 1/1     Running   0          15m
  coredns-5644d7b6d9-s7q64                 1/1     Running   0          15m
  etcd-airgap-cluster                      1/1     Running   0          14m
  kube-apiserver-airgap-cluster            1/1     Running   0          14m
  kube-controller-manager-airgap-cluster   1/1     Running   0          13m
  kube-proxy-l6fw8                         1/1     Running   0          15m
  kube-scheduler-airgap-cluster            1/1     Running   0          13m
  weave-net-7nf4z                          2/2     Running   0          15m
  ```

1. Run the following command to log out of the air gapped instance:

  ```shell script
  exit
  ```

### Install the Application

This procedure follows the instructions at [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster-airgapped) in the _Enterprise_ section.

1. Download the `kots` plugin and the air gap bundle to your workstation:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- 'curl https://kots.io/install | bash'
  ```

1. Copy the binary to your air gapped workstation from there:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    scp /usr/local/bin/kubectl-kots ${AIRGAP_WORKSTATION}:
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- sudo cp kubectl-kots /usr/local/bin
  ```

1. Verify that it is working:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- /snap/bin/kubectl kots version
  ```

  **Example output:**

  ```text
  Replicated Kots 1.17.2
  ```

1. To get the air gap bundle to your workstation. You will go to https://github.com/replicatedhq/kots/releases and use the version that matches the installed kots CLI (1.17.2) in this case, and run the following command to copy it over:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    wget https://github.com/replicatedhq/kots/releases/download/v1.17.2/kotsadm.tar.gz
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    scp ./kotsadm.tar.gz ${AIRGAP_WORKSTATION}:
  ```

1. Run the following command to push the images using this bundle:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- \
    /snap/bin/kubectl kots admin-console push-images \
    ./kotsadm.tar.gz ${CLUSTER_PRIVATE_IP}:32000/kotsadm \
    --registry-username kots \
    --registry-password kots
  ```

1. After the images are pushed, run the installation. Copy the application slug for your application. For this tutorial, you can use `sentry-pro` and set a matching namespace:

  ```shell script
  export APP_SLUG=sentry-pro
  export NAMESPACE=sentry-pro
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- \
    KUBECONFIG=./admin.conf /snap/bin/kubectl kots install \
    --kotsadm-registry ${CLUSTER_PRIVATE_IP}:32000 \
    --registry-username kots --registry-password kots \
    ${APP_SLUG} --namespace ${NAMESPACE} --no-port-forward
  ```

  :::note
  If the UI for kots prompts gives you trouble, you may also want to pass `--shared-password=...` to set a password ahead of time.
  :::

  **Example output:**

  ```text

      Unable to pull application metadata.
      This can be ignored, but custom branding will not be available in the Admin Console until a license is installed.

    • Deploying Admin Console
      •  ✓ Creating namespace
      •  ✓ Waiting for datastore to be ready
    •  ✓  Waiting for Admin Console to be ready

  • To access the Admin Console, run kubectl kots admin-console --namespace sentry-pro

  ```

## Connect to the App Manager

To connect to the app manager:

1. Create a node port to expose the service:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- \
    KUBECONFIG=./admin.conf /snap/bin/kubectl \
    -n "${NAMESPACE}" expose deployment kotsadm \
    --target-port=3000 --port=3000 \
    --type=NodePort --name=kotsadm-nodeport
  ```

1. Get the port and expose it locally using an SSH tunnel:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- \
    KUBECONFIG=./admin.conf /snap/bin/kubectl -n "${NAMESPACE}" \
    get svc kotsadm-nodeport
  ```

1. Assuming this is your output, set the `PORT` to `40038`:

  ```shell script
  NAME               TYPE       CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
  kotsadm-nodeport   NodePort   10.96.3.54   <none>        3000:40038/TCP   6s
  ```

1. Create an SSH tunnel using the jump box node.

  ```shell script
  export CLUSTER_PRIVATE_IP=$(\
    gcloud compute instances describe ${AIRGAP_CLUSTER} \
    --format='get(networkInterfaces[0].networkIP)')
  ```
  ```shell script
  export PORT=40038
  gcloud compute ssh --ssh-flag=-N \
    --ssh-flag="-L ${PORT}:${CLUSTER_PRIVATE_IP}:${PORT}" ${AIRGAP_JUMP}
  ```

1. Open `localhost:${PORT}` in your browser to access the Replicated admin console. Proceed with the installation from the the admin console.

    :::note
    As a vendor, you can optionally configure `strict` preflight checks that cause the application deployment to fail if your specific requirements are not met. For more information about preflight checks, see [Creating Preflight Checks and Support Bundles](preflight-support-bundle-creating).
  
    Additionally, when installing with minimal role-based access control (RBAC), the app manager recognizes if the preflight checks have failed due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that lets the end user manually run the preflight checks and upload the results automatically to the app manager. For more information about configuring RBAC privileges, see [`requireMinimalRBACPrivileges`](../reference/custom-resource-application#requireminimalrbacprivileges) in Application custom resources.
    :::

## Troubleshoot Issues

If you run into issues, you may be able to use the support-bundle tool to collect a diagnostic bundle.
This is usable only after the cluster is up and you have the `admin.conf` kubeconfig on the air gapped workstation.

To use the support bundle:

1. Run the following command to download the support-bundle plugin and move it to the air gapped workstation:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    'curl https://krew.sh/support-bundle | bash'
  ```

1. Copy the binary to our air gapped workstation from there:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    scp .krew/bin/kubectl-support_bundle ${AIRGAP_WORKSTATION}:kubectl-support_bundle
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- sudo cp kubectl-support_bundle /usr/local/bin
  ```

1. Run the following command to verify that it is working:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- /snap/bin/kubectl support-bundle version
  ```

  **Example output:**

  ```text
  Replicated Troubleshoot 0.9.38
  ```

1. Run the following command to access the default support bundle spec for the app manager and move it to your workstation:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    wget https://raw.githubusercontent.com/replicatedhq/kots/master/support-bundle.yaml
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    scp support-bundle.yaml ${AIRGAP_WORKSTATION}:
  ```

  The collected support bundle collects logs for all `kots` services.

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    ssh ${AIRGAP_WORKSTATION} -- \
    KUBECONFIG=./admin.conf /snap/bin/kubectl support-bundle ./support-bundle.yaml
  ```

1. After the information is collected, copy the bundle to your local machine:

  ```shell script
  gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
    scp ${AIRGAP_WORKSTATION}:support-bundle.tar.gz .
  gcloud compute scp ${AIRGAP_JUMP}:support-bundle.tar.gz .
  ```

1. Extract the bundle and inspect the logs, or share it as appropriate. For now, you can list the files using `tar`:

  ```text
  $ tar -tvf support-bundle.tar.gz
  -rw-r--r--  0 dex    dex        98 Jul 30 15:42 version.yaml
  drwxrwxr-x  0 dex    dex         0 Jul 30 15:42 cluster-info/
  -rw-r--r--  0 dex    dex       321 Jul 30 15:42 cluster-info/cluster_version.json
  drwxrwxr-x  0 dex    dex         0 Jul 30 15:42 cluster-resources/
  drwxrwxr-x  0 dex    dex         0 Jul 30 15:42 cluster-resources/auth-cani-list/
  -rw-r--r--  0 dex    dex       811 Jul 30 15:42 cluster-resources/auth-cani-list/default.json
  -rw-r--r--  0 dex    dex       811 Jul 30 15:42 cluster-resources/auth-cani-list/kube-node-lease.json
  -rw-r--r--  0 dex    dex       811 Jul 30 15:42 cluster-resources/auth-cani-list/kube-public.json
  -rw-r--r--  0 dex    dex       811 Jul 30 15:42 cluster-resources/auth-cani-list/kube-system.json
  -rw-r--r--  0 dex    dex       811 Jul 30 15:42 cluster-resources/auth-cani-list/registry.json
  # ... snip ...
  ```

## Clean Up

To clean up, delete the servers that you created:

```shell script
gcloud compute instances delete ${AIRGAP_CLUSTER} ${AIRGAP_JUMP} ${AIRGAP_WORKSTATION}
```
