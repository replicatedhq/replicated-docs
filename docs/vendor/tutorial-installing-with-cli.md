# Managing Releases with the CLI

This tutorial helps you use Replicated app manager to quickly deploy, install, and iterate with a sample Kubernetes application using a CLI-based workflow.

For a more conceptual overview before using the CLI tools, you can start with the tutorial for [installing a sample application without an existing cluster](tutorial-installing-without-existing-cluster).

To deploy the sample application, follow these steps:

1. [Install the replicated CLI](#install-the-replicated-cli)
1. [Set a service account token](#set-a-service-account-token)
1. [Get YAML manifest files](#get-yaml-manifest-files)
1. [Create a release](#create-a-first-release)
1. [Create a customer license](#create-a-customer-license)
1. [Get an installation command](#get-an-installation-command)
1. [Install the app manager](#install-the-app-manager)
1. [Install the application](#install-the-application)
1. [View the deployed application](#view-the-deployed-application)
1. [Iterate the application](#iterate-the-application)
1. [Update the test server](#update-the-test-server)

## Install the replicated CLI

Install the replicated CLI to perform the deployment tasks.

To install the replicated CLI:

1. Use [homebrew](https://brew.sh) or the latest Linux or macOS version from [the replicatedhq/replicated releases page](https://github.com/replicatedhq/replicated/releases) to install the CLI.

  ```shell script
  brew install replicatedhq/replicated/cli
  ```

1. Verify the installation using `replicated version`:

  ```text
  $ replicated version
  ```
  ```json
  {
    "version": "0.31.0",
    "git": "c67210a",
    "buildTime": "2020-09-03T18:31:11Z",
    "go": {
        "version": "go1.14.7",
        "compiler": "gc",
        "os": "darwin",
        "arch": "amd64"
    }
  }
  ```

### Set a Service Account Token

Set up two environment variables for the application. You can export these in your shell or add them to your favorite dotfiles.

To export the environment variables:

1. Log in to the Replicated [vendor portal](https://vendor.replicated.com). [Create a new application](https://vendor.replicated.com/new-application) or use an existing application that you created previously. For this tutorial, we are using the name CLI Quickstart, although you can use any name.

1. Open the Settings page. Copy the application slug.

    ![app-slug](/images/guides/kots/cli-setup-quickstart-settings.png)

1. Run the following command using the application slug that you copied previously:

  ```shell script
  export REPLICATED_APP=cli-quickstart
  ```

1. Create a read/write capable service account token:

  ![service-account-token](/images/guides/kots/cli-setup-service-account-token.png)

1. Run the following command to export the token:

  ```shell script
  export REPLICATED_API_TOKEN=1366be611e3bf...
  ```

1. Run the following command to verify these values are set correctly:

  ```shell script
  replicated release ls
  ```

  You will likely see an empty list of releases. You will create a release later in this tutorial.

  ```text
  SEQUENCE    CREATED    EDITED    ACTIVE_CHANNELS
  ```

## Get YAML Manifest Files

YAML manifest files are needed to create a release. You can download a sample repository to get YAML files for this tutorial at https://github.com/replicatedhq/replicated-starter-kots.

:::note

If you are using Helm charts to package your application, you can explore [Creating a release from an existing Helm chart](helm-overview) for steps on how to add the required app manager YAML files to your Helm chart after you finish reviewing this tutorial.
:::

To get the sample YAML files:

1. Run the following command to create a folder for your project:

  ```shell script
  mkdir replicated-cli-tutorial
  cd replicated-cli-tutorial
  ```

1. Run the following command to make a folder for the manifests and download the starter YAML to it:

  ```shell script
  mkdir ./manifests
  curl -fSsL https://github.com/replicatedhq/kots-default-yaml/archive/v2020-09-03.tar.gz | \
    tar xzv --strip-components=1 -C ./manifests \
    --exclude README.md --exclude LICENSE --exclude .gitignore
  ```

### Verify the Manifest Files

You should now have a few YAML files in the manifests folder:

** Example:**

```text
$ ls -la manifests
.rw-r--r--  114 dex 16 Aug  7:59 config-map.yaml
.rw-r--r--  906 dex 16 Aug  7:59 config.yaml
.rw-r--r--  608 dex 16 Aug  7:59 deployment.yaml
.rw-r--r--  296 dex 16 Aug  7:59 ingress.yaml
.rw-r--r-- 2.5k dex 16 Aug  7:59 preflight.yaml
.rw-r--r--  399 dex 16 Aug  7:59 replicated-app.yaml
.rw-r--r--  205 dex 16 Aug  7:59 service.yaml
.rw-r--r--  355 dex 16 Aug  7:59 support-bundle.yaml
```

Run the following command to verify this YAML:

```shell script
$ replicated release lint --yaml-dir=manifests
```

If there are no errors, an empty list is displayed with a zero exit code.

**Example output:**

```text
RULE    TYPE    FILENAME    LINE    MESSAGE
```

### Initialize the Repository

If you have not already done so, initialize this project as a git repository so that you can track your history.
Additionally, the replicated CLI reads git metadata to help with the generation of release metadata, such as version labels. More information about this is covered later in this tutorial.

To initialize the repository, run the following commands:

```shell script
git init
git add .
git commit -m "Initial Commit: CLI Quickstart"
```

## Create a First Release

Now that you have some YAML manifest files, you can create a release and promote it to the `Unstable` channel for internal testing.

To create and promote a release:

1. Run the following command with the `--auto` flag to generate release notes and metadata based on the git status.

  ```shell script
  $ replicated release create --auto
  ```

  **Example output:**

  ```text
      • Reading Environment ✓  

    Prepared to create release with defaults:

        yaml-dir        "./manifests"
        promote         "Unstable"
        version         "Unstable-ba710e5"
        release-notes   "CLI release of master triggered by dex [SHA: ba710e5] [28 Sep 20 09:15 CDT]"
        ensure-channel  true

    Create with these properties? [Y/n]
  ```

1. Press Enter to confirm the prompt. The release is created and promoted.

  **Example output:**

  ```text
    • Reading manifests from ./manifests ✓  
    • Creating Release ✓  
      • SEQUENCE: 1
    • Promoting ✓  
      • Channel VEr0nhJBBUdaWpPvOIK-SOryKZEwa3Mg successfully set to release 1
  ```

1. Run the following command to verify that the release was created:

  ```text
  $ replicated release ls
  ```
  **Example output:**

  ```text  
  SEQUENCE    CREATED                      EDITED                  ACTIVE_CHANNELS
  1           2020-09-03T11:48:45-07:00    0001-01-01T00:00:00Z    Unstable
  ```


## Create a Customer License

After creating a release, you must create a customer object.
A customer represents a single licensed end user of your application.

In this example, create a customer named `Some Big Bank` with an expiration in 10 days.

To create a customer license:

1. Run the following command to create the customer and assign them to a channel. For this example, since you created your release on the Unstable channel, assign the customer to the same channel:

  ```shell script
  replicated customer create \
    --name "Some-Big-Bank" \
    --expires-in "240h" \
    --channel "Unstable"
  ```

  **Example output:**

  ```text
  ID                             NAME             CHANNELS     EXPIRES                          TYPE
  1h0yojS7MmpAUcZk8ekt7gn0M4q    Some-Big-Bank     Unstable    2020-09-13 19:48:00 +0000 UTC    dev
  ```

1. Run the following command to verify the customer creation details:

  ```text
  replicated customer ls
  ```

1. Run the following command to download a license file:

  ```shell script
  replicated customer download-license \
    --customer "Some-Big-Bank"
  ```

1. Because the license downloads to `stdout`, run the following command if you want to redirect the output to a file:

  ```shell script
  export LICENSE_FILE=~/Desktop/Some-Big-Bank-${REPLICATED_APP}-license.yaml
  replicated customer download-license --customer "Some-Big-Bank" > "${LICENSE_FILE}"
  ```

1. Verify the license was written properly using either `cat` or `head`:

  ```text
  $ head ${LICENSE_FILE}

  apiVersion: kots.io/v1beta1
  kind: License
  metadata:
    name: some-big-bank
  spec:
    appSlug: kots-dex
    channelName: Unstable
    customerName: Some-Big-Bank
    endpoint: https://replicated.app
  ```

## Get an Installation Command

After you create and download a customer license, get the installation commands so that you can test the installation on a development server.

Run the following command to get the installation commands for the Unstable channel:

```text
$ replicated channel inspect Unstable
```

**Example output:**
```
ID:             VEr0nhJBBUdaWpPaOIK-SOryKZEwa3Mg
NAME:           Unstable
DESCRIPTION:
RELEASE:        1
VERSION:        Unstable-ba710e5
EXISTING:

    curl -fsSL https://kots.io/install | bash
    kubectl kots install cli-quickstart/unstable

EMBEDDED:

    curl -fsSL https://k8s.kurl.sh/cli-quickstart-unstable | sudo bash

AIRGAP:

    curl -fSL -o cli-quickstart-unstable.tar.gz https://k8s.kurl.sh/bundle/cli-quickstart-unstable.tar.gz
    # ... scp or sneakernet cli-quickstart-unstable.tar.gz to airgapped machine, then
    tar xvf cli-quickstart-unstable.tar.gz
    sudo bash ./install.sh airgap
```

The output generates commands for installing on an [existing cluster](../enterprise/installing-existing-cluster-requirements), installing [without an existing cluster](../enterprise/installing-embedded-cluster-requirements), and installing on an [air gap cluster](../enterprise/installing-existing-cluster-airgapped).

## Install the App Manager

In this case, we demonstrate an installation without an existing cluster, on a single virtual machine (VM). This type of installation is known as an embedded or Kubernetes installer-created cluster.

To install the app manager:

1. Create a server using Google Cloud using the following criteria for this example:

    - Ubuntu 18.04
    - At least 8 GB of RAM
    - 4 CPU cores
    - At least 40GB of disk space

    :::note
    You can use any cloud provider or [local virtual machine](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/vagrant-boxes).
    :::

1. Use SSH to access the server you just created, and run the installation script from above, using the `EMBEDDED` version:

  ```shell
  curl -sSL https://kurl.sh/<your-app-name-and-channel> | sudo bash
  ```

  This script installs Docker, Kubernetes, and the Replicated admin console containers (kotsadm).

  Installation takes approximately 5-10 minutes.

  After the script completes the initial installation, the output displays the connection URL and password that you must use in a later step of the installation process:

  ```text

  Kotsadm: http://[ip-address]:8800
  Login with password (will not be shown again): [password]
  ```

1. Reload your shell using the following command to access the cluster with `kubectl`:

    ```
    bash -l
    ```

    The UIs of Prometheus, Grafana and Alertmanager have been exposed on NodePorts 30900, 30902 and 30903 respectively.

1. Use the generated user:password of admin:[password] to access Grafana.

1. Run the following script on your other nodes to add worker nodes to this installation:

    ```
    curl -sSL https://kurl.sh/cli-quickstart-unstable/join.sh | sudo bash -s kubernetes-master-address=[ip-address]:6443 kubeadm-token=[token] kubeadm-token-ca-hash=sha256:[sha] kubernetes-version=1.16.4 docker-registry-ip=[ip-address]
      ```

1. Reload the shell, following the instructions on the screen, to make `kubectl` work:

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


## Install the Application

At this point, Kubernetes and the Replicated admin console are running, but the application is not deployed yet.

To install the application:

1. In a browser, enter the URL that the installation script displayed previously when it finished. Notice that the app manager cluster, created using the [Kubernetes installer](https://kurl.sh), has provisioned a self-signed certificate.

  When you bypass the insecure certificate warning, you have the option of uploading a trusted certificate and key.
  For production installations, we recommend using a trusted certificate. For this tutorial, use the self-signed certificate.

1. Click **Skip & continue** to proceed using the self-signed certificate.

  ![Console TLS](/images/guides/kots/admin-console-tls.png)

  You are prompted for a password.

1. Enter the password from the CLI output to log in to the admin console.

    The Upload license page opens. Until this point, this server is running Docker, Kubernetes, and the admin console containers only.

1. Click Upload. Select your YAML license file or drag and drop the license file from your desktop.
    The admin console can pull containers and run your application now.

    The Settings page opens with default configuration items.

1. If you are using the defaults, select the **Enable Ingress** checkbox. You can leave the Ingress Hostname field blank. Click **Continue**.

    :::note
    For production, you can customize this screen to collect the configuration that your application needs from the customer.
    :::

    ![Settings Page](/images/guides/kots/configuration.png)

    The Preflight page opens.

1. Click **Continue**. If there are failing checks, dismiss the warning to continue. Preflight checks are designed to help ensure this server has the minimum system and software requirements to run the application. Depending on your YAML configuration in `preflight.yaml`, you can see some of the example preflight checks fail.

    Vendors can optionally configure `strict` preflight checks that cause the application deployment to fail if specific requirements are not met. For more information about preflight checks, see [Creating Preflight Checks and Support Bundles](preflight-support-bundle-creating).

    Additionally, when installing with minimal role-based access control (RBAC), the preflight checks can fail due to insufficient privileges.

    ![Run Preflight Checks Manually](/images/manual-run-preflights.png)

    When this occurs, a `kubectl preflight` command is displayed that lets the end user manually run the preflight checks and upload the results automatically to the app manager. For more information about configuring RBAC privileges, see [`requireMinimalRBACPrivileges`](../reference/custom-resource-application#requireminimalrbacprivileges) in Application custom resources.

    After the preflight checks pass, the Version History page opens and displays the initial version that was deployed. Later, you will come back to this page to deploy an update to the application.

1. Click **Application** on the top to see the status of the application and some basic monitoring statistics (such as CPU, memory, and disk space). If you are still connected to this server using SSH, `kubectl get pods` shows the example NGINX service that you just deployed.

  ![Cluster](/images/guides/kots/application.png)

## View the Deployed Application

Since you used the default NGINX application and enabled the Ingress object, you can view the application at `http://${INSTANCE_IP}/` without a port and see a basic NGINX server running:

![Cluster](/images/guides/kots/example-nginx.png)

Next, you will create and deliver an update to the sample application.

## Iterate the Application

From your local repo, you can update the NGINX deployment to test a simple update to the application.

To make an update:

1. Add the following line to `deployment.yaml`, right after `spec:`:

  ```yaml
    replicas: 2
  ```

1. Use `head` to view the first 10 lines of the file:

  ```shell script
  head manifests/deployment.yaml
  ```

  **Example output:**

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: example-nginx
    labels:
      app: example
      component: nginx
  spec:
    replicas: 2
    selector:
  ```

1. Run the following command to create a new release:

  ```shell script
  replicated release create --auto
  ```

## Update the Test Server

To install and test this new release, you must connect to the admin console on port :8800 using a web browser.
At this point, the UI likely shows that your test application is up-to-date and that no updates are available.
The admin console can be configured to check for new updates at regular intervals, but for now you will trigger a check manually.

To check for updates manually:

1. Click **Check for Updates** on the Version History page.
  You should see a new release in the history now. You can click **Diff versions** to review the differences.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy** to apply the new YAML, which changes the number of NGINX replicas. The deployment only takes a few seconds.

1. Run the following command to verify the deployment on the server:

  ```shell script
  kubectl get pod -l component=nginx
  ```

  You should see two pods running.


## Next Steps

You can iterate further on your application. Continue making changes and using `replicated release create --auto` to publish them. You can add `-y` to the command to skip the prompt.

To learn more about the app manager features, you can explore some of the tutorials and packaging options, such as:

* [Integrating with an existing CI/CD platform](tutorial-ci-cd-integration)
* [Integrating a Helm chart](helm-overview)

If you already have a release published in the vendor portal that you want to use as a starting point, run the following command to access the help docs for `replicated release download`:

```shell script
replicated release download --help
```
