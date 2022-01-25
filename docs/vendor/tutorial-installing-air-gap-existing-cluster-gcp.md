# Installing in an air gapped existing cluster using GCP

This is an advanced guide that shows how to install a KOTS app in an Existing Cluster environment where the workstation and the cluster have no outbound internet connectivity ("airgapped").
This guide will assume you've already completed the [Existing Cluster Quickstart](/vendor/guides/existing-cluster) to set up a non-airgapped cluster.   We'll be doing what the Terraform Enterprise team refers to as Modern Airgapped or "2019 Airgapped" in [How Hashicorp delivers On-prem with Replicated](https://blog.replicated.com/hashicorp-recording/)

> We usually deliver 2019 Airgap, which is essentially an AWS VPC without an internet gateway.

This guide most importantly presents a set of steps for creating a full environment in GCP, including:

- An airgapped instance running vanilla Kubernetes (without KOTS)
- An airgapped workstation instance from which we'll run the deployment
- An online "jump box" that will represent a DMZ that has scp or sneakernet access to the airgapped VMs

If you're planning on deploying your application to airgapped EKS, Openshift, or other locked-down Kubernetes cluster, this is a great way to set up a testing environment to experiment in.

## End to End GCP example

We'll set up these 3 instances in GCP. Unless otherwise specified, all commands are being run from a MacOS workstation outside this environment.

```
airgap-jump               us-central1-b  n1-standard-1    10.240.0.127  35.193.94.81     RUNNING
airgap-cluster            us-central1-b  n1-standard-1    10.240.0.41                    RUNNING
airgap-workstation        us-central1-b  n1-standard-1    10.240.0.26                    RUNNING
```


**Note**: This guide does a lot of network configuration for IP address management, but omits any details regarding opening ports.
While you could open specific ports between instances and to the public web, this guide was written with inter-instance traffic wide open.
See the `gcloud compute firewall-rules --help` docs for details on opening additional tcp ports like `32000` and other NodePort services that we'll create in this guide.

We'll use ssh tunneling for reaching the instances in the cluster, so it shouldn't be necessary to open ports for those "airgapped" instances to have access from the outside world.

### Instances

First, let's pick some names for our instances

```shell script
export AIRGAP_JUMP=airgap-jump
export AIRGAP_WORKSTATION=airgap-workstation
export AIRGAP_CLUSTER=airgap-cluster
```

### Jump box

Now we can create a VM with a public IP, this will be our jump box with both public internet access and access to the airgapped environment.


```shell script
gcloud compute instances create ${AIRGAP_JUMP} \
  --image-project ubuntu-os-cloud \
  --image-family ubuntu-1804-lts \
  --machine-type n1-standard-1
```

### Airgapped workstation

Next, we'll create a GCP VM to be our airgapped workstation.
We'll give it outbound network access for now to facilitate installing docker, but then we'll disconnect it from the internet.
Replace `dex` in the `usermod` command with your linux username in GCP.


```shell script
gcloud compute instances create ${AIRGAP_WORKSTATION} \
  --boot-disk-size=200GB \
  --image-project ubuntu-os-cloud \
  --image-family ubuntu-1804-lts \
  --machine-type n1-standard-1
```

```shell script
export LINUX_USER=dex
gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
  'sudo apt update && sudo apt install -y docker.io'
gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
  'sudo snap install kubectl --classic'

gcloud compute ssh ${AIRGAP_WORKSTATION} -- \
  "sudo usermod -aG docker ${LINUX_USER}"

```

Next, remove the machine's public IP.

```shell script
gcloud compute instances delete-access-config ${AIRGAP_WORKSTATION}
```

We can verify that internet access was disabled by ssh'ing via the jump box and trying to curl kubernetes.io.
We'll forward the SSH agent with `--ssh-flag=-A` so that we can ssh the airgapped workstation without moving keys around.
This will assume we're using `ssh-add` to manage identities on our MacOS workstation.

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} 'curl -v https://kubernetes.io'"
```

This command should hang, and you might see something like with `Network is unreachable`:

```text
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0*   Trying 2607:f8b0:4001:c05::64...
* TCP_NODELAY set
* Immediate connect fail for 2607:f8b0:4001:c05::64: Network is unreachable
  0     0    0     0    0     0      0      0 --:--:--  0:00:03 --:--:--     0
```

Once you're satisfied the instance has no outbound connectivity, you can Ctrl+C this command and we'll proceed to setting up our airgapped cluster.


### Airgapped cluster with registry

Next, we'll create a GCP vm with online internet access to be our airgapped cluster.
As before, we'll use a an internet connection to install k8s and get a registry up and running before removing access.

```shell script
gcloud compute instances create ${AIRGAP_CLUSTER} \
  --boot-disk-size=200GB \
  --image-project ubuntu-os-cloud \
  --image-family ubuntu-1804-lts \
  --machine-type n1-standard-4
```

 Before installing Docker and Kubernetes, let's get the private IP and set it as an insecure docker registry

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


Now, let's ssh into the instance and bootstrap a minimal single-primary kubernetes cluster (details here:  https://kurl.sh/8d4f215  )

```shell script
gcloud compute ssh ${AIRGAP_CLUSTER} -- 'curl  https://k8s.kurl.sh/8d4f215  | sudo bash'
```

When that completes, we can deploy a minimal registry and verify it's running

```shell script
gcloud compute ssh ${AIRGAP_CLUSTER} -- \
  'kubectl --kubeconfig /etc/kubernetes/admin.conf apply -f https://raw.githubusercontent.com/replicatedhq/replicated-automation/master/customer/existing-cluster-airgap/plain-registry.yaml'
```

This gist configures a basic auth htpasswd that configures a username/password for `kots/kots`, which we'll use later

```shell script
gcloud compute ssh ${AIRGAP_CLUSTER} -- \
  'kubectl --kubeconfig /etc/kubernetes/admin.conf get pod,svc -n registry'
```

Now that the registry is up, let's verify that we can docker push/pull to it. We'll use the public IP attached to the instance.

```shell script
export CLUSTER_PUBLIC_IP=$( \
  gcloud compute instances describe ${AIRGAP_CLUSTER} \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
docker login --username kots --password kots ${CLUSTER_PUBLIC_IP}:32000
docker pull busybox
docker tag busybox ${CLUSTER_PUBLIC_IP}:32000/busybox
docker push ${CLUSTER_PUBLIC_IP}:32000/busybox
```

You should see `Pushed` if successful.
```shell
be8b8b42328a: Pushed
```

But instead if you see the following error, you may need to also add an `insecure-registries` entry to your workstation to allow pushing/pulling via http instead of https.

```shell
Error response from daemon: Get https://<CLUSTER_PUBLIC_IP>:32000/v2/: http: server gave HTTP response to HTTPS client
```

If you're testing using docker-for-mac, you can add this via the setttings:

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


Next, remove the machine's public IP.
We'll use the kubeconfig from this server later.

```shell script
gcloud compute instances delete-access-config ${AIRGAP_CLUSTER}
```

Verify that internet access was disabled by ssh'ing via the jump box and trying to curl kubernetes.io.
We'll forward the agent so that we can ssh the airgapped cluster without moving keys around

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_CLUSTER} 'curl -v https://kubernetes.io'"
```

This command should hang, and you might see something with `Network is unreachable`:

```text
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0*   Trying 2607:f8b0:4001:c05::64...
* TCP_NODELAY set
* Immediate connect fail for 2607:f8b0:4001:c05::64: Network is unreachable
  0     0    0     0    0     0      0      0 --:--:--  0:00:03 --:--:--     0
```

Once you're satisfied the instance has no outbound connectivity, you can Ctrl+C this command and we'll proceed to finalizing our workstation configuration.

### Final Workstation Setup

Finally, let's verify our docker client on the workstation and make sure we have kubectl access properly configured before we do the full installation.
We'll do this by ssh'ing to the workstation via the jump box.

##### Docker

We'll use the same `CLUSTER_PRIVATE_IP` address we stored earlier to configure an insecure registry on the airgapped workstation.

```shell script
export CLUSTER_PRIVATE_IP=$( \
  gcloud compute instances describe ${AIRGAP_CLUSTER} \
  --format='get(networkInterfaces[0].networkIP)')
# verify
echo ${CLUSTER_PRIVATE_IP}
```

Next, we can create a docker daemon config to trust this registry from the workstation and from the cluster.
First, let's quickly verify that no existing daemon json config exists on the workstation (if it does, you'll have to modify the next step slightly to just add the registry setting).

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} 'cat /etc/docker/daemon.json'"
```

After executing the above, you should see the following:

```text
cat: /etc/docker/daemon.json: No such file or directory
```

Next, we can create a config with the insecure registry, then restart docker


```shell script
 gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} 'echo \"{\\\"insecure-registries\\\":[\\\"${CLUSTER_PRIVATE_IP}:32000\\\"]}\" | sudo tee /etc/docker/daemon.json'"
 gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} -- sudo systemctl restart docker"
```

Before proceeding, run the following command a few times until docker has come back up:

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} -- docker image ls"
```

Once docker is ready, you should see the following:

```shell script
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
```



We can verify connectivity with a login + pull of the image we previously pushed

```shell script
 gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} -- docker login ${CLUSTER_PRIVATE_IP}:32000 --username kots --password kots"

 gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  "ssh ${AIRGAP_WORKSTATION} -- docker pull ${CLUSTER_PRIVATE_IP}:32000/busybox:latest"
```


you should see something like

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

##### Kubectl

Next, ssh into the airgapped worksation and grab the `admin.conf` from the cluster and run a few kubectl commands to ensure its working:

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- "ssh -A ${AIRGAP_WORKSTATION}"
```

From the Airgapped workstation, run the following:

```shell script
export AIRGAP_CLUSTER=airgap-cluster
scp ${AIRGAP_CLUSTER}:admin.conf .
export KUBECONFIG=$PWD/admin.conf
kubectl get ns
kubectl get pod -n kube-system
```

you should see something like

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

Now, log out of the airgapped instance

```shell script
exit
```

### Installing

We'll follow the instructions at [Installing from an Airgap Package](https://kots.io/kotsadm/installing/airgap-packages/).

Let's start by downloading the `kots` plugin and the airgap bundle to our workstation:

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- 'curl https://kots.io/install | bash'
```

Next, let's copy the binary to our airgapped workstation from there

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  scp /usr/local/bin/kubectl-kots ${AIRGAP_WORKSTATION}:
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- sudo cp kubectl-kots /usr/local/bin
```

Next we can verify its working

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- /snap/bin/kubectl kots version
```

You should see a version like this:

```text
Replicated Kots 1.17.2
```

Next, we need to get the airgap bundle to our workstation.
We'll go to https://github.com/replicatedhq/kots/releases and grab the version that matches the installed KOTS cli (1.17.2) in this case, then copy it over

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  wget https://github.com/replicatedhq/kots/releases/download/v1.17.2/kotsadm.tar.gz
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  scp ./kotsadm.tar.gz ${AIRGAP_WORKSTATION}:
```

Per the docs, we can now push the images using this bundle

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- \
  /snap/bin/kubectl kots admin-console push-images \
  ./kotsadm.tar.gz ${CLUSTER_PRIVATE_IP}:32000/kotsadm \
  --registry-username kots \
  --registry-password kots
```

Once the images are pushed we can then run the installation.
You'll need to grab the Application Slug for your KOTS app, in this case we'll use `sentry-pro`. We'll set a matching namespace as well.

```shell script
export APP_SLUG=sentry-pro
export NAMESPACE=sentry-pro
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- \
  KUBECONFIG=./admin.conf /snap/bin/kubectl kots install \
  --kotsadm-registry ${CLUSTER_PRIVATE_IP}:32000 \
  --registry-username kots --registry-password kots \
  ${APP_SLUG} --namespace ${NAMESPACE} --port-forward=false
```

**NOTE** if the UI for kots prompts gives you trouble, you may also want to pass `--shared-password=...` to set a password ahead of time.

You should expect to see something like

```text

    Unable to pull application metadata.
    This can be ignored, but custom branding will not be available in the Admin Console until a license is installed.

  • Deploying Admin Console
    •  ✓ Creating namespace
    •  ✓ Waiting for datastore to be ready
  •  ✓  Waiting for Admin Console to be ready

• To access the Admin Console, run kubectl kots admin-console --namespace sentry-pro

```

## Connecting to KOTS

Now, we'll create a node port to expose the service


```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- \
  KUBECONFIG=./admin.conf /snap/bin/kubectl \
  -n "${NAMESPACE}" expose deployment kotsadm \
  --target-port=3000 --port=3000 \
  --type=NodePort --name=kotsadm-nodeport
```

Next, we need to get the port and expose it locally via an SSH tunnel

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- \
  KUBECONFIG=./admin.conf /snap/bin/kubectl -n "${NAMESPACE}" \
  get svc kotsadm-nodeport
```

Asumming this is our output, we'll set the `PORT` to `40038`

```shell script
NAME               TYPE       CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
kotsadm-nodeport   NodePort   10.96.3.54   <none>        3000:40038/TCP   6s
```

Finally, we can create an SSH tunnel via the Jumpbox node.

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


Now, open `localhost:${PORT}` in your browser and you should get to the kotsadm console, proceeding with the install from there.

## Troubleshooting

If you run into issues, you may be able to use the bundled support-bundle tool to collect a very helpful diagnostic bundle.
This will only be usable once the cluster is up and you have the `admin.conf` kubeconfig on the airgapped workstation.

You will also need to download the support-bundle plugin and move it to the airgapped workstation

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  'curl https://krew.sh/support-bundle | bash'
```

Next, let's copy the binary to our airgapped workstation from there

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  scp .krew/bin/kubectl-support_bundle ${AIRGAP_WORKSTATION}:kubectl-support_bundle
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- sudo cp kubectl-support_bundle /usr/local/bin
```

Next we can verify its working

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- /snap/bin/kubectl support-bundle version
```

You should see

```text
Replicated Troubleshoot 0.9.38
```

Next, let's grab the default support bundle spec for KOTS and move it to our workstation

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  wget https://raw.githubusercontent.com/replicatedhq/kots/master/support-bundle.yaml
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  scp support-bundle.yaml ${AIRGAP_WORKSTATION}:
```


The support bundle collected will collect logs for all kots services.

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  ssh ${AIRGAP_WORKSTATION} -- \
  KUBECONFIG=./admin.conf /snap/bin/kubectl support-bundle ./support-bundle.yaml
```

Once it's collected, copy the bundle to your local machine

```shell script
gcloud compute ssh --ssh-flag=-A ${AIRGAP_JUMP} -- \
  scp ${AIRGAP_WORKSTATION}:support-bundle.tar.gz .
gcloud compute scp ${AIRGAP_JUMP}:support-bundle.tar.gz .
```

From here you can untar the bundle and inspect the logs, or share it as appropriate.
For now we can list the files with `tar`:

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

## Cleaning up

To clean up, delete the servers we created

```shell script
gcloud compute instances delete ${AIRGAP_CLUSTER} ${AIRGAP_JUMP} ${AIRGAP_WORKSTATION}
```
