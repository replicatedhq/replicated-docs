import VMRequirements from "../partials/getting-started/_vm-requirements.mdx"

# Step 4: Install KOTS

Get the installation commands from the Unstable channel so that you can test the installation process for the application release that you promoted. The first step in installing and deploying the application in a cluster is to install KOTS.

KOTS is the Replicated component that lets your users install, manage, and upgrade your application. Users can interact with KOTS through the admin console or through the kots CLI.

KOTS can be either installed in an existing Kubernetes cluster or in an _embedded cluster_ created by Replicated kURL.

Choose either installation option:
* [Install in an Existing Cluster](#existing)
* [Install in an Embedded Cluster](#embedded)

## Install in an Existing Cluster {#existing}

To install KOTS in an existing cluster:

1. Make sure your kubectl context is set to your cluster.

1. Copy the **KOTS Install** command from the Unstable channel in the vendor portal.

  ![Installation Methods](/images/guides/kots/installation-methods-existing.png)

  The script installs the latest KOTS version as a `kubectl` plugin. For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

  **Example:**

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install my-test-app/unstable
  ```

1. For `Enter installation path (leave blank for /usr/local/bin):`, use the default and press **Enter**.

1. For `Enter a new password to be used for the Admin Console:`, provide a password to access the admin console. You use this password in a later step to access the admin console and deploy the application.

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

## Install in a Embedded  Cluster {#embedded}

KOTS can be installed in an embedded cluster by running the kURL installation script on a VM or bare metal server.

To install KOTS in an embedded cluster:

1. Use SSH to authenticate to the VM that you created as part of [Set Up the Environment](tutorial-ui-setup#set-up-the-environment).

  **Example:**

  ```bash
  gcloud compute ssh NAME
  ```

  Replace NAME with the name of the cluster.

1. Copy the **Embedded Cluster** command from the Unstable channel in the vendor portal and run it on the cluster.

  ![Installation Methods](/images/guides/kots/installation-methods-embedded.png)

  **Example:**

  ```bash
  curl -sSL https://kurl.sh/my-test-app-unstable | sudo bash
  ```

  This script installs Docker, Kubernetes, and the admin console containers (kotsadm).

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

  At this point, Kubernetes and the admin console are running, but the application is not deployed yet.

## Next Step

Continue to [Step 5: Deploy the Application](tutorial-ui-deploy-app) to log in to the admin console and deploy the application.
