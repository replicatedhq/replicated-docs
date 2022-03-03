# Installing without an Existing Cluster

This tutorial demonstrates packaging and installing a sample NGINX application in Kubernetes using a single virtual machine (VM).

It is broken into four sections:

- [Creating a Release](#creating-a-release)
- [Installing and Testing](#installing-and-testing)
- [Iterating and Updating](#iterating-and-updating)
- [Next Steps](#next-steps-manage-yaml-in-your-git-repo)

* * *

## Creating a Release

When you work with the Replicated platform, the Replicated vendor portal is the primary user interface (UI) that you use to package your application. This tutorial is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with the Replicated app manager.

For help or more information, see [How to Distribute an Application](distributing-workflow) or our [community documentation](https://help.replicated.com/community/).

This tutorial shows you how to deploy a sample application using the app manager and how to deliver an update to that application. The tutorial does not teach Kubernetes, rather it starts with a minimal Kubernetes application that deploys a single replica of [NGINX](https://www.nginx.com).

### Create a New Application

To create a new application:

1. Log in (or create a new team) to the [vendor portal](https://vendor.replicated.com).

  After signing up and activating your account, the Create your application page opens.

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
  When you are familiar with these concepts, you can use the replicated CLI and API to automate this task rather than manually editing the YAML on this page. For more information, see [Installing the replicated CLI](../reference/replicated-cli-installing) and [Using the Replicated Vendor API v3](../reference/vendor-api-using).
  :::

![Default YAML](/images/guides/kots/default-yaml.png)


### Promote a Release

After the release is saved, promote it to the Unstable channel to make this release available for installation.

To promote the release:

1. Click **Releases** from the top left menu.

1. Click **Promote** on the row for the release that you just created.

  ![Promote Release](/images/guides/kots/promote-release-button.png)

  The Promote Release dialog opens.

1. Choose the Unstable channel and click **Promote**.

Now that you have a release promoted, you can create a license and install the sample NGINX application on a test server.


## Installing and Testing

This section gives you experience installing an application using the Replicated Kubernetes installer for an embedded Kubernetes cluster. For more information, see [Kubernetes installer](https://kurl.sh).

### Create a License

A customer license, downloadable as a YAML file, is required to install any application.

To create a customer license:

1. From the vendor portal, select **Customers** from the left menu.

1. Click **Create a new customer**.

  The **Create a new customer** page opens.

1. Edit the following fields, leaving the rest of the fields set to the default values:

    1. Enter your name for the Customer Name field.
    1. Select the Unstable channel on the right hand side.
    1. Set the Customer Type to Development.

    ![Create Customer](/images/guides/kots/create-customer.png)

1. Click **Create Customer**.

1. Click **Download license** in the upper right corner for the newly created customer.

  This downloads the file with your customer name and a `.yaml` extension. This is the license file your customer needs to install your application. When a customer is installing your software you need to send them two things: the app manager installation script and the license file.

  You will also use this license file to install and test the application on the test server.

### Create a Test Server and Install the App Manager

The app manager can be installed either into an existing Kubernetes cluster or as a Kubernetes installer-created cluster (embedded cluster). You can see the installation options at the bottom of each channel on the Channels page. For this tutorial, you will use the Kubernetes installer, or _embedded cluster_, option.

![Installation Methods](/images/guides/kots/installation-methods-embedded.png)

To create the test server and install the app manager:

1. Create a server using Google Cloud and the following criteria:

    * Ubuntu 18.04
    * At least 8 GB of RAM
    * 4 CPU cores
    * At least 40GB of disk space

  :::note
  You can also use any cloud provider or local virtual machine.
  :::

1. Use SSH to access the server you just created.
1. Run the installation script:

  ```shell
  curl -sSL https://kurl.sh/<your-app-name-and-channel> | sudo bash
  ```

  This script installs Docker, Kubernetes, and the Replicated admin console containers (kotsadm).

  Installation takes approximately 5-10 minutes.

  After the installation script completes the initial installation, the output displays the connection URL and password that you must use in a later step of the installation process:

  ```text

  Kotsadm: http://[ip-address]:8800
  Login with password (will not be shown again): [password]
  ```

1. Reload your shell to access the cluster with `kubectl`:

  ```
    bash -l
  ```

    The UIs of Prometheus, Grafana and Alertmanager have been exposed on NodePorts 30900, 30902 and 30903 respectively.

1. Use the generated user:password of admin:[password] to access Grafana.

1. Run the following script on your other nodes to add worker nodes to this installation:

  ```
    curl -sSL https://kurl.sh/starter-kots-demo-unstable/join.sh | sudo bash -s kubernetes-master-address=[ip-address]:6443 kubeadm-token=[token] kubeadm-token-ca-hash=sha256:[sha] kubernetes-version=1.16.4 docker-registry-ip=[ip-address]

    ```

1. Reload the shell, following the instructions on the screen, to make `kubectl` now work:

  ```bash
  user@kots-guide:~$ kubectl get pods
  ```

  **Example output:**

  ```
  NAME                                  READY   STATUS      RESTARTS   AGE
  kotsadm-585579b884-v4s8m              1/1     Running     0          4m47s
  kotsadm-migrations                    0/1     Completed   2          4m47s
  kotsadm-operator-fd9d5d5d7-8rrqg      1/1     Running     0          4m47s
  kotsadm-postgres-0                    1/1     Running     0          4m47s
  kurl-proxy-kotsadm-77c59cddc5-qs5bm   1/1     Running     0          4m46s
  user@kots-guide:~$
  ```

### Install the Application

At this point, Kubernetes and the Replicated admin console are running, but the application is not deployed yet.

To install the application:

1. In a browser, enter the URL that the installation script displayed previously when it finished. Notice that the [Kubernetes installer](https://kurl.sh) cluster has provisioned a self-signed certificate.

1. Bypass the insecure certificate warning. You have the option of uploading a trusted certificate and key.
  For production installations, we recommend using a trusted certificate. For this tutorial, use the self-signed certificate.

  ![Console TLS](/images/guides/kots/admin-console-tls.png)

  You are prompted for a password.

1. Enter the password from the CLI output to log in to the admin console.

  The Upload license page opens. Until this point, this server is running only Docker, Kubernetes, and the admin console containers.

1. Click Upload. Select your customer license YAML file to continue, or drag and drop the license file from your desktop. The app manager can pull containers and run your application now.

  The Settings page opens with the default configuration items.

1. If you are using the defaults, select the **Enable Ingress** checkbox. You can leave the Ingress Hostname field blank.

  :::note
  For production, you can customize what appears on this screen to collect the configuration that your application needs from the customer.
  :::

  ![Settings Page](/images/guides/kots/configuration.png)

  The Preflight page opens.

1. Click **Continue**. If you have failing checks, dismiss the warning to continue. Preflight checks are designed to help ensure that this server has the minimum system and software requirements to run the application. Depending on your YAML configuration in the `preflight.yaml` file, you can see some of the example preflight checks fail.

  The Version History page opens and displays the initial version that was deployed. Later, you will come back to this page to deploy an update to the application.

1. Click **Application** on the top to see the status of the application and some basic monitoring statistics (such as CPU, memory, and disk space). If you are still connected to this server using SSH, `kubectl get pods` shows the example NGINX service that you just deployed.

  ![Cluster](/images/guides/kots/application.png)

### View the Deployed Application

Because you used the default NGINX application and enabled the ingress object, you can view the application at `http://${INSTANCE_IP}/` without a port and see a basic NGINX server running:

![Cluster](/images/guides/kots/example-nginx.png)

Next, you will create and deliver an update to the sample application.


## Iterating and Updating

Now that you have an application running, a common task is to deliver updates. You will make a change to the number of NGINX replicas to learn how to deliver an update.

### Create a New Release

To create a new release:

1. From the vendor portal, click **Releases** > **Create Release**.

  The YAML editor opens and shows the contents of the most recently created release. This gives you everything that you have done so far, and the next task is to write the changes needed to increase the number of NGINX replicas.

1. In the release YAML, find the NGINX image to change. The line is in the `deployment.yaml` file and looks like:

  ```yaml
  replicas: 1
  ```

1. Change the number of replicas to `2` or more.

  :::note
  If you have worked ahead and completed the [CLI setup guide](tutorial-installing-with-cli), you can make this `replicas` change in your locally checked-out git repository, and publish them with `replicated release create --auto`, then skip to [Update the Test Server](#update-the-test-server).
  :::

1. Click **Save Release**.

### Save and Promote the Release

Following the same process as you did before, promote the release to the channel.

To promote the release:

1. Click **Promote** next to the newly created Sequence 2.
1. Choose the Unstable channel, and click **Promote**.

  Any license installed from the Unstable channel will start with this new release, and any installation already running is prompted to update to the new release.

### Update the Test Server

To install and test this new release, you must connect to the admin console on port :8800 using a web browser. At this point, the UI likely shows that your test application is up-to-date and that no updates are available.
The admin console checks for new updates about every five hours, but for now you will trigger a check manually.

To check for updates manually:

1. Click **Check for Updates** on the Version History page. You should see a new release in the history now. You can click Diff versions to review the differences.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy** to apply the new YAML, which changes the number of NGINX replicas. The deployment takes only a few seconds.

1. Run the following command to verify the deployment on the server:

  ```
  kubectl get pod -l component=nginx
  ```

  You should see two pods running.


## Next Steps: Manage YAML in your Git Repo

Now that you are familiar with the basics, we recommend that you run through the tutorial for [installing with the CLI](tutorial-installing-with-cli) to start [managing your release YAML in a git repo](repository-workflow-and-tagging-releases).
