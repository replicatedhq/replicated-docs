# Installing with an Existing Cluster

This tutorial demonstrates packaging and installing a sample NGINX application in Kubernetes on an existing cluster in GKE (or another cluster you have handy).

It is broken into four sections:

- [Creating a Release](#creating-a-release)
- [Installing and Testing](#installing-and-testing)
- [Iterating and Updating](#iterating-and-updating)
- [Next Steps](#next-steps-manage-yaml-in-your-git-repo)

## Creating a Release

When you work with the Replicated platform, the Replicated vendor portal is the primary user interface (UI) that you will use to package and distribute your application. This tutorial is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with the Replicated app manager.

For help and information, see [How to Distribute an Application](distributing-workflow) or our [community documentation](https://help.replicated.com/community/).

This tutorial you how to deploy a sample application using the app manager, and how to deliver an update to that application.
The tutorial does not teach Kubernetes, rather it will start with a minimal Kubernetes application that deploys a single replica of [NGINX](https://www.nginx.com).

### Create a New Application

To create a new application:

1. Log in (or create a new team) to [vendor portal](https://vendor.replicated.com).

  After signing up and activating your account, the Create a new application page opens.

1. Enter a name for the new application, such as Starter Application or NGINX Example.

  ![Create Application](/images/guides/kots/create-application.png)

1. Click **Create Application**.

  The Channels page opens and displays a list of your release channels that are logical stacks for you to stage and promote releases to your customers. We will explore this in more detail later.

### Create a Release

To create a release:

1. Click **Releases** from the left menu, and click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor opens, where you can define how your application will work and the integration with the app manager functionality. The default YAML documents above the white line contain information for the app manager, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installations.
  For more information, see the [custom resources reference docs](../reference/custom-resource-about).

1. Click **Save release** to proceed using the default values. For this example, you can skip editing the YAML. (You will make some changes later in this tutorial.)

  :::note
  When you are familiar with these concepts, you can use the replicated CLI and the Replicated Vendor API to automate this task rather than manually editing the YAML on this page. For more information, see [Installing the replicated CLI](../reference/replicated-cli-installing) and [Using the Vendor API v3](../reference/vendor-api-using).
  :::

  ![Default YAML](/images/guides/kots/default-yaml.png)


### Promote a Release

After the release is saved, promote it to the Unstable channel to make this release available for installation.

To promote the release:

1. Click **Releases** from the top left menu.
1. Click **Promote** on the row for the release that you just created.

  ![Create Application](/images/guides/kots/promote-release.png)

  The Promote Release dialog opens.

1. Choose the Unstable channel, and click **Promote**.


Now that you have a release promoted, you can create a license and install the sample NGINX application on a test server.


## Installing and Testing

This section gives you experience installing an application using an existing Kubernetes cluster.

After you create and promote a release, create a customer license and use this license to install the application in a namespace in your test cluster.

### Create a License

A customer license, downloadable as a YAML file, is required to install any application.

To create a customer license:

1. From the vendor portal, select **Customers** from the left menu.

1. Click **Create your first customer**.

  The Create a new customer page opens.

1. Edit the following fields, leaving the rest of the fields set to the default values:

    1. Enter your name for the Customer Name field.
    1. Select the Unstable channel on the right hand side.

    ![Create Customer](/images/guides/kots/create-customer.png)

    1. Click **Create Customer**.

    1. Click **Download license** in the upper right corner for the newly created customer.

      This downloads the file with your customer name and a `.yaml` extension. This is the license file your customer needs to install your application. When a customer is installing your software you need to send them two things: the app manager installation script and the license file.

      You will also use this license file to install and test the application on the test server.

### Create a Kubernetes Cluster and Install the App Manager

The app manager can be installed either into an existing Kubernetes cluster, or as a Kubernetes installer-created cluster (embedded cluster). You can see the installation options at the bottom of each channel on the Channels page.

![Installation Methods](/images/guides/kots/installation-methods-existing.png)

Installing the app manager on existing clusters is similar to using a [Kubernetes installer cluster](tutorial-installing-without-existing-cluster#installing-and-testing), except instead of bringing a plain virtual machine (VM), we will use a pre-built Kubernetes cluster and deploy your application into a namespace.

In this example, we will launch a GKE cluster using `gcloud` CLI, but you can use any cluster for which you have `kubectl` access.

```shell
gcloud container clusters create kots-app --preemptible --no-enable-ip-alias
```

Once the cluster is launched set the local `kubectl` context.

```shell
gcloud container clusters get-credentials kots-app
```

Install latest KOTS version as `kubectl` plugin.
```shell
curl https://kots.io/install | bash
```

Install your application using the kots CLI. For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

```shell
kubectl kots install <your-app-name-and-channel>

Enter the namespace to deploy to: <your-app-name-and-channel>
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
Enter a new password to be used for the Admin Console: ••••••••
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
```

### Install License

At this point, the admin console and Kubernetes are running, but the application isn't yet.
This is also what your customer would be experiencing when installing your application.
To complete the installation, visit the URL `http://localhost:8800` where you'll be required to enter the password set earlier.

Now the installation needs a license file to continue.
Until this point, this cluster is just running Kubernetes and the admin console containers.
Once we upload a license file, the admin console will have access to pull the application YAML and containers.
Click the Upload button and select your `.yaml` file to continue.

The settings page is here with default configuration items.
The appearance of this page can be configured in the `config.yaml` file.
For now we can proceed with the defaults.

![Settings Page](/images/guides/kots/configuration.png)

Preflight checks are designed to ensure this server has the minimum system and software requirements to run the application.
By default, we include some preflight checks that are expected to fail so that we can see what failing checks might look like for a customer.
If you click continue it will warn you but you can still continue.

Click the "Application" link on the top to see the application running.
If you are still connected to this server using SSH, `kubectl get pods` will now show the example NGINX service we just deployed.

On the navigation bar, there's a link to the application page.
Clicking that will show you the Kubernetes services that we just deployed.

![Cluster](/images/guides/kots/application.png)

### View the application

To view the running NGINX Application, port-forward the NGINX service port to localhost `8080`.
```shell
kubectl port-forward service/<service-name> 8080:80
```

You can also add a link on the admin console dashboard and port-forward the NGINX port to your localhost as part of the [kots application spec](admin-console-port-forwarding).

Then head to `http://localhost:8080/`, and you should see a basic NGINX server running.

![Cluster](/images/guides/kots/example-nginx.png)

Next, we'll walk through creating and delivering an update to the application we just installed.

* * *

## Iterating and Updating

This guide will walk you through making a change and delivering an update to an application after it's been deployed.
It's assumed you have the environment from parts 1 and 2 of this guide ([creating a release](#creating-a-release) and [installing](#installing-and-testing)).
If you haven't completed these guides, head back and finish them first.

Now that we have an application running, a common task is to deliver updates.
Let's change the number of NGINX replicas to show how to deliver an update.

### Create a New Release

On the Releases page of the vendor portal, click the "Create Release" link on top.
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
Choose the "Unstable" channel again to promote this new release.
Now, any license installed from the "Unstable" channel will start with this new release, and any installation already running will be prompted to update to the new release.

### Update the Test Server

To install and test this new release, we need to connect to the admin console dashboard on port :8800 using a web browser.
At this point, it will likely show that our test application is "Up To Date" and that "No Updates Are Available".
The admin console will check for new updates about every five hours but we can force it to check now.

In the "Application" or "Version History" tab click on the "Check For Updates" button.
On the Version History page, the "Deploy" button becomes active.
In addition, it should say how many files were changed and how many lines are different.
You can click on that to view what has changed in the YAML.


![View Update](/images/guides/kots/view-update.png)

Clicking the "Deploy" button will apply the new YAML which will change the number of NGINX replicas.
This should only take a few seconds to deploy.

* * *

## Next Steps: Manage YAML in your Git Repo

Now that you're familiar with the basics, you should run through the [CLI Quickstart](tutorial-installing-with-cli) so you can start managing your release YAML in a git repo.

You can also head over to [Planning an application](packaging-planning-checklist) to learn how to integrate your application with other app manager features.
