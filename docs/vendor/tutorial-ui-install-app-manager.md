import VMRequirements from "../partials/getting-started/_vm-requirements.mdx"

# Step 4: Install the App Manager

Get the installation commands from the Unstable channel so that you can test the installation process for the application release that you promoted. The first step in installing and deploying the application in your Kubernetes cluster is to install the Replicated app manager.

The app manager is the Replicated component that lets your users install, manage, and upgrade your application. Users can interact with the app manager through a user interface, called the Replicated admin console, or through a CLI, called the kots CLI.

The app manager can be installed into an existing Kubernetes cluster, or using the Replicated Kubernetes installer on a virtual machine (VM). The Kubernetes installer provisioned cluster is also known as an _embedded cluster_.

Choose either installation option:
* [Install in an Existing Cluster](#existing)
* [Install in a Kubernetes Installer Cluster](#kubernetes-installer)

## Install in an Existing Cluster {#existing}

When you install the app manager on existing cluster, you use a pre-built Kubernetes cluster and deploy your application into a namespace.

You can see the installation script options at the bottom of each channel on the Channels page in the vendor portal.

![Installation Methods](/images/guides/kots/installation-methods-existing.png)

To install the app manager:

1. Copy the **KOTS Install** command from the Unstable channel in the vendor portal. Make sure your kubectl context is set to your existing cluster and run the install command on the command line.

  The script installs the latest app manager version as a `kubectl` plugin. For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

  **Example:**

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install my-test-app/unstable
  ```

1. For `Enter installation path (leave blank for /usr/local/bin):`, use the default and press **Enter**.

1. For `Enter a new password to be used for the Admin Console:`, provide a password to access the admin console. You use this password in a later step to access the admin console user interface and deploy the application.

  When the admin console is ready, the script prints the https://localhost:8800 URL where you can access the admin console.

  **Example output:**

  ```bash
  Enter the namespace to deploy to: my-app-unstable
    • Deploying Admin Console
      • Creating namespace ✓
      • Waiting for datastore to be ready ✓
  Enter a new password to be used for the Admin Console: ••••••••
    • Waiting for Admin Console to be ready ✓

    • Press Ctrl+C to exit
    • Go to http://localhost:8800 to access the Admin Console
  ```

1. Go to the [Next step](#next-step) section.

## Install in a Kubernetes Installer Cluster {#kubernetes-installer}

The app manager can be installed as a Kubernetes installer provisioned cluster (embedded cluster), which provisions a plain virtual machine (VM).

You can see the installation script options at the bottom of each channel on the Channels page in the vendor portal. For this tutorial, you use the Embedded Cluster option for the Kubernetes installer.

![Installation Methods](/images/guides/kots/installation-methods-embedded.png)

To install the app manager on a VM using the Kubernetes installer:

1. Use SSH to authenticate to the VM that you created as part of [Set Up the Environment](tutorial-ui-setup#set-up-the-environment).

  **Example:**

  ```bash
  gcloud compute ssh NAME
  ```

  Replace NAME with the name of the cluster.

1. Copy the **Embedded Cluster** command from the Unstable channel in the vendor portal and run it on the cluster.

  **Example:**

  ```bash
  curl -sSL https://kurl.sh/my-test-app-unstable | sudo bash
  ```

  This script installs Docker, Kubernetes, and the Replicated admin console containers (kotsadm).

  Installation takes approximately 5-10 minutes.

1. Note the connection URL and password that displays in the output. The password is not shown again. You must use these in a later step to deploy the admin console.

  **Example output:**

  ```bash
  Kotsadm: http://[ip-address]:8800
  Login with password (will not be shown again): [password]
  ```

1. Reload your shell to access the cluster with `kubectl`:

  ```bash
  bash -l
  ```

1. Run a `kubectl` command to test that `kubectl` is working.

  **Example:**

  ```bash
  kubectl get pods
  ```

  **Example output:**

  ```
  NAME                                  READY   STATUS    RESTARTS   AGE
  kotsadm-79dcb4dc7d-2xh85              1/1     Running   0          60m
  kotsadm-postgres-0                    1/1     Running   0          60m
  kurl-proxy-kotsadm-5f7fb75f47-b7jbz   1/1     Running   0          60m
  ```

  At this point, Kubernetes and the Replicated admin console are running, but the application is not deployed yet.

## Next Step

Continue to [Step 5: Deploy the Application](tutorial-ui-deploy-app) to log in to the admin console and deploy the application.
