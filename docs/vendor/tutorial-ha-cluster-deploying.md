# Deploying a high availability cluster

In this guide, we will walk through the steps needed to enable Kubernetes high availability capabilities with a cluster installed by kURL and managed by KOTS. This only applies to embedded cluster installs using kURL.

## Objective

As with the rest of the guides, this is meant as a 'hello world' example to help get you familiarized with the process of standing up a highly available Kubernetes cluster using the Replicated toolset. The architecture we will follow is presented below:

![Architecture](/images/guides/kots/ha-cluster-architecture.png)

The diagram shows 4 Virtual Machines (VMs) running on Google Cloud Platform (GCP), with one of them used solely as a load balancer. Note that there aren't any requirements to use GCP. You can follow along with VMs provisioned on a different cloud provider or on premise.

## Overview

This tutorial is broken into three parts. The [first part](#setting-up-the-cluster) will walk you through how to stand up the cluster, the [second part](#testing-scenarios) will go through a couple of testing scenarios to validate the cluster's resiliency, and the [third part](#troubleshooting) offers some troubleshooting tips.

There are a few things to keep in mind about this guide:

- While the VMs are going to be created in Google Cloud Platform (GCP), nothing in this guide is dependent on GCP specific services.
- The Load Balancer we will use for this exercise is [HAProxy](http://www.haproxy.org/).
- The sample application has a database component as described [here](#sample-application), which will help us validate data retention in our testing scenarios.

## Prerequisites

- This exercise will need 4 VMs that will need to communicate with each other. Please refer to the [Procuring the (virtual) hardware](#provisioning-the-virtual-hardware) section for guidance on system requirements for these.

- In the example commands and screenshots, we are using a sample application called 'AppDirect'. Please refer to the [Sample Application](#sample-application) section for more details if you wish to follow along and use it.

- This is an advanced topic, so this guide will assume you've already completed one of the Quick Start guides, and have already a level of familiarity with Replicated.


### Sample application

The KOTS application we will use in this guide is available in the [kotsapps repository](https://github.com/replicatedhq/kotsapps/tree/master/app-direct).

The application consists of two components:

- Python Flask App Deployment - This flask application contains 'routes' to help test connecting, reading and writing to a database.
- Postgres StatefulSet - This is the database for the flask application.

A full description of the application is available in the repository.

### Configuring EKCO

If you want to follow this example, but with your own application, you may need to modify the Kubernetes Installer to use [EKCO](https://kurl.sh/docs/add-ons/ekco). For the purposes of this guide, EKCO can be thought of as a helper service that helps 'move' scheduled pods from a node that is down to ones that are up.

To add EKCO to your Kubernetes installer, follow the steps below. If you are not familiar with the Kubernetes installer, review [this blog](https://blog.replicated.com/kurl-with-replicated-kots/) first to get familiar with the process.

#### Adding EKCO to embedded installations

1. In your Kubernetes installer, add the following under spec:

   ```code
      ekco:
        version: latest
        nodeUnreachableToleration: 1m
   ```
2. Promote the installer to same channel(s) where you have promoted your application's releases.

## Setting up the cluster

To stand up the cluster, we will be following these steps:

1. [Procuring the (virtual) hardware](#provisioning-the-virtual-hardware)
1. [Setting up and configuring a Load Balancer](#setting-up-and-configuring-a-load-balancer)
1. [Run the KOTS installer on the first node and deploy the application](#running-the-kots-installer-and-deploying-an-application)
1. [Verify the Deployment](#verify-the-deployment)
1. [Add Remaining Nodes to the Cluster](#adding-remaining-nodes-to-cluster)
1. [Verify Pods Are Running on All Nodes](#verify-pods-are-running-on-all-nodes)

### Provisioning the (Virtual) Hardware

For this exercise, we are going to create 4 virtual machines (VMs). One of the VMs will be used to install, configure and run HAProxy. The remaining 3 VMs will be the 3 primary nodes for our cluster.

### Provisioning the HAProxy VM

For the VM that will host HAProxy, a bare bones VM should suffice as we will only use it to route traffic. As an example, the command below creates a VM instance with enough juice to run HAProxy, at least for testing purposes:

```shell
gcloud compute instances create app-direct-ha-proxy  --boot-disk-size=10GB --labels=app=app-direct --image-project ubuntu-os-cloud --image-family ubuntu-1804-lts --machine-type n1-standard-1
```

In the command output, you should note the public and internal IP address. The public address of this VM is what we will use to connect to both the Replicated admin console, the application's UI and a Postgres client of your choice. we will also use the internal IP address when we install KOTS in HA mode.

If you'd like to explore HAProxy requirements for heavier workloads, please check out HAProxy's [documentation](https://www.haproxy.com/documentation/hapee/2-0r1/installation/getting-started/os-hardware/).


### Provisioning the cluster VMs

Like with the HAProxy VM, keep the [KOTS System Requirements](https://kurl.sh/docs/install-with-kurl/system-requirements) in mind when provisioning the VMs that will form the cluster. The command below creates a VM that meets those requirements, at least for testing purposes.

```shell
gcloud compute instances create app-direct-node-01 --boot-disk-size=200GB --labels=app=app-direct --image-project ubuntu-os-cloud --image-family ubuntu-1804-lts --machine-type n1-standard-4
```
To create the remaining nodes, simply run the same command but increment the node number (i.e., "app-direct-node-02").

Also note the VMs public and private ip addresses as each VM is provisioned. We will use the internal ip addresses in the HAProxy configuration in the next step.

### Setting up and configuring a load balancer

The main purpose of the load balancer is to give us a single point of access. All end-user interactions (for example, access the web UI of the deployed application) should go through the load balancer.

For this guide, HAProxy will be the load balancer and will be running on its own VM, provisioned already in the previous step. HAProxy is configured by editing the haproxy.cfg file that by default resides in '/etc/haproxy'.

Here are the high level steps we will take to install and configure HAProxy.

We will:

1. Create the config file in our home folder using our favorite editor.
1. Use SCP to copy the file in the VM running HAProxy.
1. Install HAProxy.
1. Copy the config file to the proper location.
1. Restart HAProxy.

Note that another way of accomplishing this is by connecting to the instance via ssh and creating the file and editing from the command line inside the VM.

To create the config file, use the editor of your choice and call it 'haproxy.cfg'. For the purposes of this exercise, we will create the file in our home folder. Below is an example config file for the sample application. Keep in mind the following when creating your file:

- Replace any IP addresses with the internal IP addresses of your VMs.
- If you used a different naming convention for your instance names, you will need to replace 'app-direct-node-0(123)' with your instance names.
- There are two entries specific to the Application, one for each component (app-direct-frontend/backend & postgres frontend/backend). If you are using a different application, adjust based on the endpoints you want to access through the load balancer. The remaining entries are for the admin console and the Kubernetes API and should be left as-is other than the instance names and ip addresses.

```shell
global
defaults
   timeout client          60s
   timeout server          60s
   timeout connect         60s
#############################################################
listen stats
   bind *:8080
   mode http
   stats enable
   stats uri /
   stats hide-version
#############################################################
frontend app-direct-frontend
   mode tcp
   bind    *:80
   default_backend app-direct-backend
backend app-direct-backend
   mode                    tcp
   balance roundrobin
   option tcp-check
   server app-direct-node01 10.240.0.37:80 check
   server app-direct-node02 10.240.0.39:80 check
   server app-direct-node03 10.240.0.71:80 check
#############################################################
frontend postgres-frontend
   mode tcp
   bind    *:5432
   default_backend postgres-backend
backend postgres-backend
   mode                    tcp
   balance roundrobin
   option tcp-check
   server app-direct-node01 10.240.0.37:5432 check
   server app-direct-node02 10.240.0.39:5432 check
   server app-direct-node03 10.240.0.71:5432 check
#############################################################
frontend replicated-frontend
   mode tcp
   bind    *:8800
   default_backend replicated-backend
backend replicated-backend
   mode                    tcp
   balance roundrobin
   option tcp-check
   server app-direct-node01 10.240.0.37:8800 check
   server app-direct-node02 10.240.0.39:8800 check
   server app-direct-node03 10.240.0.71:8800 check
###########################################################
frontend kube-api-frontend
   mode tcp
   bind    *:6443
   default_backend kube-api-backend
backend kube-api-backend
   mode                    tcp
   balance roundrobin
   option tcp-check
   server app-direct-node01 10.240.0.37:6443 check
   server app-direct-node02 10.240.0.39:6443 check
   server app-direct-node03 10.240.0.71:6443 check

```

For more details on the structure of the config file, please refer to the HAProxy [documentation](https://www.haproxy.com/blog/the-four-essential-sections-of-an-haproxy-configuration/)

To copy the config file into the VM, we are going to use scp. The command below will copy it to your home folder on the VM.

```shell
gcloud compute scp haproxy.cfg app-direct-ha-proxy:~/
```

Now we install HAProxy using apt.


```shell
sudo apt-get update
sudo apt install -y haproxy
```

The install will create a default config file. We will back it up and then move ours to the /etc/haproxy directory created by the installation.

```shell
sudo mv /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.bak
sudo mv ~/haproxy.cfg /etc/haproxy/haproxy.cfg
```

Last step is to restart HAProxy

```shell
sudo systemctl restart haproxy
```

To validate the install, browse to http://_public-ip-of-vm_:8080. Below is a screenshot of what it should look like. The dashboard at this point does not contain much valuable information as all the frontend/backend services we configured are not running yet.

![haproxy](/images/guides/kots/ha-cluster-ha-proxy.png)

### Running the KOTS installer and deploying an application

The next step is to install KOTS on the first node, in our case, app-direct-node-01. It's important to note that in reality, you could run the installer on any of the three nodes.

To run the installer, ssh into the node and run the 'one line installer'. You can get this command from the vendor portal as shown below.

![Channels](/images/guides/kots/ha-cluster-portal-channels.png)

However, to enable high availability, we will add the '-s ha' [advanced option](https://kurl.sh/docs/install-with-kurl/advanced-options)

```shell
curl -sSL https://k8s.kurl.sh/appdirect-unstable | sudo bash -s ha
```

When you include the '-s ha' option, you will be prompted right away for the load balancer address. As shown in the figure below, we are providing the 'internal' IP address. This address is used by the Kubernetes services in the nodes to talk to each other. Using a public IP address would add extra layers that are not needed.

This process will take several minutes as it will install a Kubernetes 'stack' that will include the add-ons defined in the Kubernetes Installer, including KOTS. Once it is finished, you should see something similar as shown below:

![Output](/images/guides/kots/ha-cluster-install-output.png)

Highlighted in red in the screenshot above are the URL and password to login to the admin console. Also highlighted are the commands to run on other nodes to join the cluster. In this exercise we are not going to run these commands yet and instead continue deploying the application. The commands to join the cluster are also available in the admin console, which we will cover later in this guide.

Next, we are going to log in to the admin console to complete the install and deploy the application. Since this guide assumes you have a level of familiarity with KOTS, we are not going to go into detail on every step to get the application deployed.

![Log-In](/images/guides/kots/ha-cluster-log-in.png)

Log in to the admin console using the address and password from the install. Once you have logged in using the provided password, you will need to provide a license. The license is generated in the Vendor Portal and this guide assumes you already know how to do this. There are no options that need to be enabled or turned on in order to support an HA cluster, so if you already have a development license, it should work for this exercise.

![Add-License](/images/guides/kots/ha-cluster-add-license.png)

Once you upload your license it may take a few minutes to load and continue with the deployment.

Once the license is loaded, the next window will depend on the application being deployed as this window renders whatever has been codified in the application's [Config.yaml](https://kots.io/reference/v1beta1/config/).

After the configuration window, you should see the preflight checks and eventually land on a window similar to what is shown below

![KotsAdmin](/images/guides/kots/ha-cluster-app-deployed.png)


### Verify the deployment

To see everything that has been deployed, ssh into one of the nodes and run:

```shell
kubectl get pods --all-namespaces -o wide
```


The output will show you all the pods running on all namespaces. The output also shows you the node that each pod is currently running on, which will come in handy during this exercise. Since we only have a one node cluster, all pods should be running on node 1. Check the status of the pods to make sure there are no issues.

![AllPods](/images/guides/kots/ha-cluster-all-pods-one-node.png)

If you are following along, you should be able to access the application by browsing to http://_ip-address-of-ha-proxy_. The sample app uses flask 'routes' to call various methods to interact with Postgres. To test if it can write to the database, use the  `/sql-check`   route which will check the connection to the default database and list the databases that are available to the 'postgres' user. To write to the database, first use the `/sql-create` route which creates a database (appdirectdb) with a table (tblrecords) in it. Finally, use the `/sql-add` route to add a row to the table with the timestamp. Once the database and table are created, simply use this route to add more records to the database.

To verify that the data is in fact being written to Postgres, use the Postgres client of your choice. The screenshots included in this guide are from pgAdmin with a connection to the database using the Load Balancer's IP address.

Once connected using the client of your choice, you can retrieve the records by running a query like this:

`SELECT * FROM tblrecords`

You should see records for each time that the /sql-add route is accessed. Below is a screenshot of what it looks like in Admin:

![pgAdmin](/images/guides/kots/ha-cluster-pg-admin.png)

### Adding remaining nodes to cluster

To add the remaining nodes to the clusters, follow these steps:

#### Get the command to join the cluster

In the admin console, under Cluster Management you can view the status of the embedded cluster. At this time, it only has one node.

![ClusterManagement](/images/guides/kots/ha-cluster-cluster-mgmt.png)

To get the command to run on the other nodes, click on the 'Add Node' button. This will display the command to use for primary and secondary nodes. For our exercise we will add primary nodes to give us a proper HA cluster.

#### SSH into the nodes and run the command

SSH into both nodes and run the commands by pasting it into the terminal.

This should run a process similar to the initial installation of the cluster and will take a few minutes. Once it is finished you should see something similar to the output below:

![ClusterManagement](/images/guides/kots/ha-cluster-node-joined.png)

### Verify pods are running on all nodes

To verify that the nodes have in fact joined the cluster you can run the following commands:

```shell
kubectl get nodes
```
The output should show us all three nodes of our cluster and have a status of `READY`.

```shell
kubectl get pods --all-namespaces -o wide
```

The output should show that other than the default namespace, there are pods running on all three nodes.

## Testing scenarios

There are various testing scenarios for an HA cluster. For starters we are focusing on the data retention/loss scenario. The sample application is already configured to write to the embedded Postgres StatefulSet.

### Prerequisites

This section assumes you followed the above steps in order and are using the sample application. Since we are testing data retention, make sure to use the routes described in the [Verify the Deployment](#verify-the-deployment) section.

To verify that data is not lost, you will need a postgres client. You can use the Postgres client of your choice. The screenshots in this guide are from pgAdmin.

To observe how the pods are scheduled as we conduct our test scenarios, ssh into Node 1 and run:

```shell
watch -d 'kubectl get pods --all-namespaces -o wide'
```

By using `watch -d` the output will automatically get refreshed so you can watch pod activity as you delete pods and node.

### Deleting a pod

If you followed along with the steps and sample application, you should see that the Postgres pod is running on Node 1. In this test, we are going to delete the Postgres pod. The expected result is that a new pod will be scheduled (possibly on another node) and all the data in the database will be retained and not lost.

To delete the Postgres pod deployed with the sample app, ssh into one of the nodes, and run the following command:

```shell
kubectl delete pod app-direct-postgresql-0
```
This command will schedule a new pod and then terminate the existing one. You can verify this on the terminal where you ran the watch command. After the Postgres is back up and running, verify that the data is there by either using the `/sql-check` route in the sample application or a Postgres client.

### Shutting down a node

There are a few things you need to keep in mind:

- The Postgres instance in this application, and the application itself are not configured or set up for High Availability. This test is meant to show the resiliency capabilities of the Kubernetes embedded cluster installed by KURL and configured through KOTS.

- As described in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/architecture/nodes/#condition), there is a default 5 minute timeout duration. This means that there will be 5 minutes between the time the node goes down and that Kubernetes will finally decide that the node is not coming back and will schedule pods on this node to another node.

To simulate a node becoming unresponsive or simply crashed, you can simply stop the VM corresponding to the node. The only caveat here is that you are not running the watch command on the node you are planning to take down.

You are likely not to see much change in the pods during the first five minutes, other than some pods erroring out. After 5 minutes or so, you will start to see pods being terminated and scheduled on the remaining nodes.

In this scenario, the downtime for Postgres was about 6 - 7 minutes. This includes the Kubernetes time out of 5 minutes, 1 minute for EKCO to delete the node and remove it from the Ceph cluster, and some remaining time is for Postgres to start up on a new node.

## Troubleshooting

As you go through this exercise, you may run into some of the issues below:

### Postgres pod will not come up after deleting the pod

In the first test above, after deleting the Postgres pod, the new one would not come up. After looking at the logs of the pod found errors like

```shell
find: ‘/var/lib/postgresql/data/pgdata/pg_stat_tmp/global.stat’: Structure needs cleaning
chown: cannot access '/var/lib/postgresql/data/pgdata/pg_stat_tmp/global.stat': Structure needs cleaning
```
This appeared to be more of an OS issue, so I deleted this pod. When the new one was scheduled all was fine.

### Postgres unable to mount to data directory

On one occasions when I shut down the node that Postgres was running on, the new pod that that got scheduled on one of the remaining nodes was not able to come up due to volume mount issues. I ran `kubectl describe` on the Postgres pod and saw the following error:

![PostgresDesribe](/images/guides/kots/ha-cluster-postgres-describe.png)

It turned out that I did not have my EKCO configuration set up correctly. To resolve the issue, I updated my Kubernetes installer as described in the [configuring EKCO](#configuring-ekco) section.

### Other persistent data issues

The default configuration of the Kurl installer includes the [rook add-on](https://kurl.sh/docs/add-ons/rook), which creates and manages a [Ceph cluster](https://docs.ceph.com/docs/master/rados/) along with a storage class for provisioning Persistent Volume Claims (PVCs). If you are running into other issues with persistent storage, the following commands that were helpful when I ran into the issues mentioned previously.

These commands check the health of Ceph in your cluster. Keep in mind that the screenshots below show a `healthy` cluster that has all nodes up and running.

All related pods are runnning in the rook-ceph namespace, and a are good place to start to troubleshoot any issues. By running `kubectl get pods -n rook-ceph` you should get an output similar to the one below:

![PostgresDesribe](/images/guides/kots/ha-cluster-rook-ceph-pods.png)

One thing to note here is that you will see pods running on all three nodes. Orchestrating all of the data across all nodes is the `rook-ceph-operator-...` pod. To troubleshoot issues, we will need to exec into this pod in order to run some commands. For example, to exec into the pod on the screenshot above, I would run `kubectl exec -it rook-ceph-operator-6fbfdccc57-p477z`.

The check the status of Ceph, run `ceph status`:

![CephStatus](/images/guides/kots/ha-cluster-ceph-status.png)

The output provides you with a high level overview of the Ceph cluster. Note the value for 'health' is set to `HEALTH_OK`. When a node is unresponsive, the 'health' is set to `HEALTH_WARN`.

To check the [Object Storage Deamons (OSDs)](https://docs.ceph.com/docs/master/man/8/ceph-osd/) in more detail, run `ceph osd status`

![OSDStatus](/images/guides/kots/ha-cluster-osd-status.png)

To get another look at the OSDs, run `ceph osd tree`

![OSDTree](/images/guides/kots/ha-cluster-osd-status.png)

## Next steps

The guide covers a basic 3-node HA cluster. However, there are other layers of complexity that could be added depending on your use case:

- Add worker nodes to the cluster and run the same tests.
- Set up https access
- Set up Postgres in HA mode and compare down time against a single Postgres deployment.
