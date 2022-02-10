# Installing applications without an existing cluster

This topic demonstrates packaging and installing a simple NGINX application in Kubernetes using a single virtual machine (VM).

It is broken into four sections:

- [Creating a Release](#creating-a-release)
- [Installing and Testing](#installing-and-testing)
- [Iterating and Updating](#iterating-and-updating)
- [Next Steps](#next-steps-manage-yaml-in-your-git-repo)

* * *

## Creating a Release

When getting started with the Replicated platform, the Replicated [vendor portal](https://vendor.replicated.com) will be the place you spend a lot of time.
This guide is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with the Replicated app manager.
For help or more information, see our [community documentation](https://help.replicated.com/community/).

This guide will deploy a basic application using the app manager, and show you how to deliver an update to that application.
The guide isn't going to teach Kubernetes, rather it will start with a minimal Kubernetes application that deploys a single replica of [NGINX](https://www.nginx.com).

### Create a New Application

To start, log in (or create a new team) to the vendor portal and create a new application. After signing up and activating your account, you will be prompted to create a new application.
Give it a name like "Starter application" or "NGINX Example" and click the "Create Application" button.

![Create Application](/images/guides/kots/create-application.png)

### Releases

You should be at the channels page now.
This is a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.
We'll explore this in more detail later.
For now, click on the Releases item on the left menu and then click the "Create a release" button.

![Create Release](/images/guides/kots/create-release.png)

### Create a Release

You should now see a YAML editor where you can define how your application will work and the integration with the app manager functionality.

**Note**: Since this guide is intended as a "Hello, World" example, we'll skip editing the YAML right now and just proceed with the defaults. We'll make some changes later on in this guide.

When you are familiar with these concepts, you can use the replicated CLI and API to automate this task rather than manually editing the YAML on this page. For more information, see [Installing the replicated CLI](../reference/replicated-cli-installing) and [Using the Replicated Vendor API v3](../reference/vendor-api-using).

![Default YAML](/images/guides/kots/default-yaml.png)

The default YAML documents above the white line contain information for the app manager, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installations.
For more information, see the [custom resources reference docs](custom-resource-about). For now, let's click the **Save release** button in the bottom right.

### Save and Promote Release

Once the release is saved, go ahead and promote it to the Unstable channel to make this release available for installation.
To do this, click the "Releases" link in the top left and then click the Promote button on the row we just created.
In this popup, choose the Unstable channel and click the Promote button.

![Promote Release](/images/guides/kots/promote-release-button.png)

Now that we've got a release promoted, we can walk through creating a license and installing our basic NGINX application on a test server.

* * *

## Installing and Testing

This chapter will give you first-hand experience installing an application using the Replicated Kubernetes installer for an embedded Kubernetes cluster. For more information, see [Kubernetes installer](https://kurl.sh).

Now that we've created a release and promoted it to the Unstable channel, the next step is to create a customer license and use this this license to install the application on a test server.

### Create License

A customer license (downloadable as a `.yaml` file) is required to install any application.
To create a customer license, log in to the vendor portal and select the "Customers" link on the left. Click the "Create a new customer" button to continue.

On the "Create a new customer" page, fill in your name for the Customer name field, select the "Unstable" channel on the right hand side, and set the Customer Type to "Development".
When you've set these, you can click "Create Customer", leaving the rest of the fields set to their defaults.

![Create Customer](/images/guides/kots/create-customer.png)

After creating the customer, click the "Download license" link in the upper right corner.
This will download the file with your customer name and a `.yaml` extension.
This is the license file your customer will need to install your application.
When a customer is installing your software you need to send them two things: the app manager installation script and the license file.

### Create Test Server and Install the App Manager

The app manager can be installed either into an existing Kubernetes cluster or as a Kubernetes installer-created cluster (embedded cluster).
You can see the installation options at the bottom of each channel on the Channels page.

![Installation Methods](/images/guides/kots/installation-methods-embedded.png)

We're going to use the Kubernetes installer option for this guide.
First, we will need a server. We'll use Google Cloud for this example, but any cloud provider or local virtual machine will suffice.
For this guide, let's create a server with:

- Ubuntu 18.04
- At least 8 GB of RAM
- 4 CPU cores
- At least 40GB of disk space

Next, use SSH to access the server we just created, and run the installation script:

```shell
curl -sSL https://kurl.sh/<your-app-name-and-channel> | sudo bash
```

This script will install Docker, Kubernetes, and the admin console containers (kotsadm).

Installation should take about 5-10 minutes.

Once the installation script is completed, it will show the URL you can connect to in order to continue the installation:

```text

Kotsadm: http://[ip-address]:8800
Login with password (will not be shown again): [password]


To access the cluster with kubectl, reload your shell:

    bash -l

The UIs of Prometheus, Grafana and Alertmanager have been exposed on NodePorts 30900, 30902 and 30903 respectively.

To access Grafana use the generated user:password of admin:[password] .

To add worker nodes to this installation, run the following script on your other nodes
    curl -sSL https://kurl.sh/starter-kots-demo-unstable/join.sh | sudo bash -s kubernetes-master-address=[ip-address]:6443 kubeadm-token=[token] kubeadm-token-ca-hash=sha256:[sha] kubernetes-version=1.16.4 docker-registry-ip=[ip-address]

```

Following the instructions on the screen, you can reload the shell and `kubectl` will now work:

```bash
user@kots-guide:~$ kubectl get pods
NAME                                  READY   STATUS      RESTARTS   AGE
kotsadm-585579b884-v4s8m              1/1     Running     0          4m47s
kotsadm-migrations                    0/1     Completed   2          4m47s
kotsadm-operator-fd9d5d5d7-8rrqg      1/1     Running     0          4m47s
kotsadm-postgres-0                    1/1     Running     0          4m47s
kurl-proxy-kotsadm-77c59cddc5-qs5bm   1/1     Running     0          4m46s
user@kots-guide:~$
```

### Install the Application

At this point, Kubernetes and the Replicated admin console are running, but the application isn't deployed yet.
To complete the installation, visit the URL that the installation script displays when completed.
You'll notice that the [Kubernetes installer](https://kurl.sh) cluster has provisioned a self-signed certificate.

Once you've bypassed the insecure certificate warning, you have the option of uploading a trusted certificate and key.
For production installations we recommend using a trusted certificate, but for this tutorial we'll click the "skip this step" button to proceed with the self-signed certificate.

![Console TLS](/images/guides/kots/admin-console-tls.png)

Next, you'll be asked for a password -- you'll want to grab the password from the CLI output and use it to log in to the admin console.

Until this point, this server is just running Docker, Kubernetes, and the admin console containers.
The next step is to upload a license file so that the app manager can pull containers and run your application.
Click the Upload button and select your `.yaml` file to continue, or drag and drop the license file from your desktop.

The settings page is here with default configuration items.
For now, if you're using the defaults you'll want to check the "Enable Ingress" box.
You can leave the "Ingress Hostname" field blank.
Later you'll customize what appears on this screen to collect the configuration your application needs from the customer.

![Settings Page](/images/guides/kots/configuration.png)

Preflight checks are designed to ensure this server has the minimum system and software requirements to run the application.
Depending on your YAML in `preflight.yaml`, you may see some of the example preflight checks fail.
If you have failing checks, you can click continue -- the UI will show a warning that will need to be dismissed before you can continue.

You should now be on the Version History page, which will show the initial version that was check deployed.
Later, we'll come back to this page to deploy an update to the application.

Click the Application link on the top to see the status of the application and some basic monitoring stats (CPU, memory, disk space).
If you are still connected to this server using SSH, `kubectl get pods` will now show the example NGINX service we just deployed.

![Cluster](/images/guides/kots/application.png)

### View the application

Since we used the default NGINX application and enabled the ingress object, we can view the application at `http://${INSTANCE_IP}/` with no port, and you should see a basic (perhaps familiar) NGINX server running:

![Cluster](/images/guides/kots/example-nginx.png)

Next, we'll walk through creating and delivering an update to the application we just installed.


* * *

## Iterating and Updating

This guide will walk you through making a change and delivering an update to an application after it's been deployed.
It's assumed you have the environment from parts 1 and 2 of this guide ([creating a release](#creating-a-release) and [installing](#installing-and-testing)).
If you haven't completed these guides, head back and finish them first.

Now that we have an application running, a common task is to deliver updates. Let's change the number of NGINX replicas to show how to deliver an update.

### Create a New Release

On the "Releases" page of the vendor portal, click the "Create Release" link on top.
Once again, you'll be taken to a YAML editor that shows the contents of the most recently created release.
This gives us everything we've done so far, and our task now is to only write the changes needed to increase the number of NGINX replicas.

In the release YAML, find the NGINX image to change.
The line is in the `deployment.yaml` file and looks like:

```yaml
replicas: 1
```

Change the number to `2` or more.

**Note**: If you've worked ahead and already completed the [CLI setup guide](tutorial-installing-with-cli), you can make this `replicas` change in your locally checked-out git repo, and publish them with `replicated release create --auto`, then skip to [Update the Test Server](#update-the-test-server).

### Save and Promote the Release

Following the same process we did before, click the "Save Release" button, go back one screen and click "Promote" next to the newly created Sequence 2.
Choose the Unstable channel again to promote this new release.
Now, any license installed from the "Unstable" channel will start with this new release, and any installation already running will be prompted to update to the new release.

### Update the Test Server

To install and test this new release, we need to connect to the admin console dashboard on port :8800 using a web browser. At this point, it will likely show that our test application is "Up To Date" and that "No Updates Are Available".
The admin console will check for new updates about every five hours but we can force it to check now.

In the Application or Version History tab, click on the "Check For Updates" button.
On the Version History page, the "Deploy" button should become active.
In addition it should say how many files were changed and how many lines are different.
You can click on that to view what has changed in the YAML.


![View Update](/images/guides/kots/view-update.png)

Clicking the Deploy button will apply the new YAML, which will change the number of NGINX replicas.
This should only take a few seconds to deploy.
You can verify this on the server by running:

```
kubectl get pod -l component=nginx
```

You should see two pods running.

* * *

## Next Steps: Manage YAML in your Git Repo

Now that you're familiar with the basics, you should run through the tutorial for [installing with the CLI](tutorial-installing-with-cli) so you can start managing your release YAML in a git repo.

You can also head over to [Planning an application](packaging-planning-checklist) to learn how to integrate your application with other app manager features.
