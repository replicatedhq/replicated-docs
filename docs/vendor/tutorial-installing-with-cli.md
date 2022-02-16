# Installing a sample application with the CLI

This tutorial helps you use Replicated app manager to quickly deploy, install, and iterate with a sample Kubernetes application using a CLI-based workflow.

For a more conceptual overview before using the CLI tools, you can start with the tutorial for [installing without an existing cluster](tutorial-installing-without-existing-cluster).

To deploy the sample application, follow these steps:

1. [Installing the replicated CLI](install-cli)
1. [Setting a service account token](setting-a-service-account-token)
1. [Getting some YAML ready](getting-some-yaml)
1. [Creating a release](creating-our-first-release)
1. [Creating a customer license](creating-a-customer-license)
1. [Getting an install command](getting-an-install-command)
1. [Installing the app manager](installing-kots)
1. [Installing the application](install-the-application)
1. [Iterating](iterating)

## Install CLI

Install the replicated CLI to perform the deployment tasks.

1. Install the replicated CLI. You can install using [homebrew](https://brew.sh) or using the latest Linux or macOS version from [the replicatedhq/replicated releases page](https://github.com/replicatedhq/replicated/releases).

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

Set up two environment variables for an application. You can export these in your shell or add them to your favorite dotfiles.

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

  You will likely see an empty list of releases. We will create a release later in this tutorial.

  ```text
  SEQUENCE    CREATED    EDITED    ACTIVE_CHANNELS
  ```

## Get some YAML

YAML manifest files are needed to create a release. You can download a sample repository to get some YAML files for this tutorial at https://github.com/replicatedhq/replicated-starter-kots.

:::note

If you are using Helm charts to package your application, you can explore [Creating a release from an existing Helm chart](helm-overview) for steps on how to add the required app manager YAML files to your Helm chart after you finish reviewing this guide.
:::

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
replicated release lint --yaml-dir=manifests
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

## Creating Your First Release

Now that you have some YAML files, you can create a release and promote it to the `Unstable` channel for internal testing.

To create and prmote a release:

1. Run the following command with the `--auto` flag to generate release notes and metadata based on the git status.

  ```shell script
  replicated release create --auto
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

1. Press Enter/Return to confirm the prompt. The release is created and promoted.

  **Example output:**

  ```text
    • Reading manifests from ./manifests ✓  
    • Creating Release ✓  
      • SEQUENCE: 1
    • Promoting ✓  
      • Channel VEr0nhJBBUdaWpPvOIK-SOryKZEwa3Mg successfully set to release 1
  ```

1. Run the following command to verify the release was created:

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

1. Run the following command to create the customer and assign them to a channel. In this example, since you created your release on the Unstable channel, assign the customer to the same channel:

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

1. Because the license downloads to stdout, run the following command if you want to redirect the output to a file:

  ```shell script
  export LICENSE_FILE=~/Desktop/Some-Big-Bank-${REPLICATED_APP}-license.yaml
  replicated customer download-license --customer "Some-Big-Bank" > "${LICENSE_FILE}"
  ```

1. You can verify the license was written properly with `cat` or `head`:

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

The output generates commands for installing on an existing cluster, and embedded Kubernetes installer-created cluster, and an air gap cluster.

## Installing the Replicated App Manager

You can choose to do an installation [without an existing cluster](installing-embedded-cluster-requirements) (embedded cluster), [with an existing cluster](installing-existing-cluster-requirements), or do an [air gap installation](installing-existing-cluster-airgapped).

For this tutorial, we demonstrate an installation without an existing cluster on a single virtual machine (VM), since that is typically easier to come by than a full Kubernetes cluster.

First we will need a server. We'll use Google Cloud for this example but any cloud provider or [local virtual machine](https://github.com/replicatedhq/replicated-automation/tree/master/vendor/vagrant-boxes) will suffice. For this guide, let's create a server with:

- Ubuntu 18.04
- At least 8 GB of RAM
- 4 CPU cores
- At least 40GB of disk space


### On the Server

Next, use SSH to access the server we just created, and run the installation script from above, using the `EMBEDDED` version:

```shell
curl -sSL https://kurl.sh/<your-app-name-and-channel> | sudo bash
```

This script will install Docker, Kubernetes, and the Replicated admin console containers (kotsadm).

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
    curl -sSL https://kurl.sh/cli-quickstart-unstable/join.sh | sudo bash -s kubernetes-master-address=[ip-address]:6443 kubeadm-token=[token] kubeadm-token-ca-hash=sha256:[sha] kubernetes-version=1.16.4 docker-registry-ip=[ip-address]

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


## Install the Application

At this point, Kubernetes and the Admin Console are running, but the application isn't deployed yet.
To complete the installation, visit the URL that the installation script displays when completed.
You'll notice that the [kurl.sh](https://kurl.sh) KOTS cluster has provisioned a self-signed certificate, and that it provides

Once you've bypassed the insecure certificate warning, you have the option of uploading a trusted cert and key.
For production installations we recommend using a trusted cert, but for this tutorial we'll click the "skip this step" button to proceed with the self-signed cert.

![Console TLS](/images/guides/kots/admin-console-tls.png)

Next, you'll be asked for a password -- you'll want to grab the password from the CLI output and use it to log in to the console.

Until this point, this server is just running Docker, Kubernetes, and the admin console containers.
The next step is to upload a license file so the admin console can pull containers and run your application.
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

## View the application

Since we used the default NGINX application and enabled the Ingress object, we can view the application at `http://${INSTANCE_IP}/` with no port, and you should see a basic (perhaps familiar) NGINX server running:

![Cluster](/images/guides/kots/example-nginx.png)

Next, we'll walk through creating and delivering an update to the application we just installed.

## Iterating

From our local repo, we can update the NGINX deployment to test a simple update to the application.
We'll add a line to `deployment.yaml`, right after `spec:`. The line to add is:

```yaml
  replicas: 2
```

Using `head` to view the first 10 lines of the file should give the output below:

```shell script
head manifests/deployment.yaml
```

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

Once you've added the `replicas` line, you can create a new release:

```shell script
replicated release create --auto
```

## Update the Test Server

To install and test this new release, we need to connect to the admin console dashboard on port :8800 using a web browser.
At this point, it will likely show that our test application is "Up To Date" and that "No Updates" Are Available.
The admin console can be configured to check for new updates at regular intervals, but for now we'll trigger a check manually by clicking "Check for Updates".
You should see a new release in the history now.
You can click the +/- diff numbers to review the diff, but for now let's click "Deploy" to roll out this new version.

![View Update](/images/guides/kots/view-update.png)

Clicking the Deploy button will apply the new YAML which will change the number of NGINX replicas, this should only take a few seconds.
You can verify this on the server by running

```shell script
kubectl get pod -l component=nginx
```

You should see two pods running.


## Next Steps

From here, it's time to start iterating on your application.
Continue making changes and using `replicated release create --auto` to publish them.
You can add `-y` to the command to skip the prompt.


If you want to learn more about the app manager features, you can explore some of the tutorials and packaging options, such as:

* [Integrating your release workflow with CI](tutorial-ci-cd-integration)
* [Integrating a Helm chart](helm-overview)

If you already have a release published in the [vendor portal](https://vendor.replicated.com) you'd like to use as a starting point, check out the help docs for `replicated release download`:

```shell script
replicated release download --help
```
