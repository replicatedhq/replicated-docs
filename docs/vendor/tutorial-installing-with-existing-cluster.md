# Installing with an Existing Cluster

This tutorial demonstrates packaging and installing a sample NGINX application in Kubernetes on an existing cluster in GKE (or another cluster that you have available).

The tutorial is broken into four sections:

- [Creating a Release](#creating-a-release)
- [Installing and Testing](#installing-and-testing)
- [Iterating and Updating](#iterating-and-updating)
- [Next Steps](#next-steps-manage-yaml-in-your-git-repo)

## Creating a Release

When you work with the Replicated platform, the Replicated vendor portal is the primary user interface (UI) that you use to package and distribute your application. This tutorial is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with the Replicated app manager.

For help and information, see [How to Distribute an Application](distributing-workflow) or our [community documentation](https://help.replicated.com/community/).

This tutorial shows you how to deploy a sample application using the app manager, and how to deliver an update to that application.
The tutorial does not teach Kubernetes, rather it starts with a minimal Kubernetes application that deploys a single replica of [NGINX](https://www.nginx.com).

### Create a New Application

To create a new application:

1. Log in (or create a new team) to the [vendor portal](https://vendor.replicated.com).

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

Installing the app manager on existing clusters is similar to using a [Kubernetes installer-created cluster](tutorial-installing-without-existing-cluster#installing-and-testing), except instead of bringing a plain virtual machine (VM), you will use a pre-built Kubernetes cluster and deploy your application into a namespace.

![Installation Methods](/images/guides/kots/installation-methods-existing.png)

To install the app manager:

1. Run the following command to launch a GKE cluster using the `gcloud` CLI. (You can use any cluster for which you have `kubectl` access instead of a GKE cluster.)

  ```shell
  gcloud container clusters create kots-app --preemptible --no-enable-ip-alias
  ```

1. Run the following command to set the local `kubectl` context:

  ```shell
  gcloud container clusters get-credentials kots-app
  ```

1. Run the following command to install the latest app manager version as a `kubectl` plugin:

  ```shell
  curl https://kots.io/install | bash
  ```

1. Install your application using the kots CLI. For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

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

1. Note the URL and password that you will use to access the Replicated admin console.

### Install the Application

At this point, the admin console and Kubernetes are running, but the application is not deployed yet. This is also what your customer would be experiencing when installing your application.

To install the application:

1. In a browser, enter the URL `http://localhost:8800` and password to access the admin console.

  The Upload license page opens.
1. Click Upload. Select your customer license YAML file to continue, or drag and drop the license file from your desktop. The admin console can pull the application YAML and containers now.
1. There are some example configuration options on this page -- feel free to explore and toggle some of the options. You'll be able to see the results of your changes later.

    :::note
    For production, you can customize what appears on this screen to collect the configuration that your application needs from the customer. Values will be available to your app as text templates or input values to Helm Charts.
    :::

1. Proceed with the default settings.

  The Preflight page opens.

1. Click **Continue** and ignore the warnings. Preflight checks are designed to ensure this server has the minimum system and software requirements to run the application. By default, we included some preflight checks that are expected to fail so that you can see what failing checks might look like for a customer.

    Vendors can optionally configure strict preflight checks that cause the application deployment to fail if specific requirements are not met. For more information about preflight checks, see [Defining Preflight Checks and Support Bundles](preflight-support-bundle-creating).

    Additionally, when installing with minimal role-based access control (RBAC), the preflight checks can fail due to insufficient privileges.

    ![Run Preflight Checks Manually](/images/manual-run-preflights.png)

    When this occurs, a `kubectl preflight` command is displayed that lets the end user manually run the preflight checks and upload the results automatically to the app manager. For more information about configuring RBAC privileges, see [`requireMinimalRBACPrivileges`](../reference/custom-resource-application#requireminimalrbacprivileges) and [`supportMinimalRBACPrivileges`](../reference/custom-resource-application#supportminimalrbacprivileges) in the Application custom resource.

1. Click **Application** on the top to see the application running. If you are still connected to this server using SSH, `kubectl get pods` shows the example NGINX service that you just deployed.

  ![Cluster](/images/guides/kots/application.png)

### View the Deployed Application

To view the default NGINX application, click **Open App** on the Dashboard page.

![Open App](/images/guides/kots/open-app.png)

You should see an example application.

![Cluster](/images/guides/kots/example-app.png)

Next, you will create and deliver an update to the sample application.

* * *

## Iterating and Updating

Now that you have an application running, a common task is to deliver updates. You will change the number of NGINX replicas to learn how to deliver an update.

### Create a New Release

1. From the vendor portal, click **Releases** > **Create Release**.

  The YAML editor opens and shows the contents of the most recently created release. This gives you everything that you have done so far, and the next task is to increase the number of NGINX replicas.

1. In the release YAML, find the NGINX deployment to change. You'll want to add a `replicas` line in the `example-deployment.yaml` file:

  ```diff
  --- example-deployment.yaml	2022-08-23 16:54:45.000000000 -0500
  +++ example-deployment-2.yaml	2022-08-23 19:30:47.000000000 -0500
  @@ -6,6 +6,7 @@
     labels:
       app: nginx
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: nginx
  ```

1. Change the number to `2` or more.

  :::note
  If you have worked ahead and completed the [CLI setup guide](tutorial-installing-with-cli), you can make this `replicas` change in your locally checked-out git repository, publish it with `replicated release create --auto`, and then skip to [Update the Test Server](#update-the-test-server).
  :::

1. Click **Save Release**.

### Promote the Release

Following the same process you before, promote the release to a channel.

To promote the release:

1. Click **Promote** next to the newly created Sequence 2.

1. Choose the Unstable channel, and click **Promote**.

  Any license installed from the Unstable channel will start with this new release, and any installation already running is prompted to update to the new release.

### Update the Test Server

To install and test this new release, you must connect to the admin console on port :8800 using a web browser.
At this point, the UI likely shows that your test application is up-to-date and that no updates are available.
The admin console checks for new updates approximately every five hours, but for now you will trigger a check manually.

To check for updates manually:

1. Click **Check for Updates** on the Version History tab. You should see a new release in the history now. You can click **Diff versions** to review the differences in the YAML files.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy** to apply the new YAML, which changes the number of NGINX replicas. The deployment takes only a few seconds.


## Next Steps

Now that you are familiar with the basics, we recommend that you run through the [CLI Quickstart Tutorial](tutorial-installing-with-cli) to start managing your release YAML in a git repository.

You can also head over to [How to Package and Distribute a Production Application](distributing-workflow) to learn how to integrate your application with other app manager features.
