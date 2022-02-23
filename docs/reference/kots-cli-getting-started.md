# Getting started with KOTS

KOTS is a kubectl plugin to help manage Kubernetes Off-The-Shelf software.
The KOTS plugin runs locally, on any computer that has kubectl installed.
KOTS doesn’t run in a cluster, but it helps manage the preflight, install, support, and upgrade process of third party software in Kubernetes.

KOTS includes an Admin Console that runs alongside the application.
The Admin Console is installed in the cluster and provides a web-based UI to manage the lifecycle of a KOTS application.
The KOTS plugin will install and configure the Admin Console during installation and upgrade of a KOTS application.

## Prerequisite

Before you install the kots CLI, install [kubectl](https://kubernetes.io/docs/tasks/tools/) on your machine.

:::note
If you're using an [embedded Kubernetes cluster](/kotsadm/installing/installing-embedded-cluster/), both tools will already be pre-installed.
:::

## Install the kots CLI

To install the latest version of the kots CLI, run:

```bash
curl https://kots.io/install | bash
```

To install a specific version of the kots CLI, run:

```bash
curl https://kots.io/install/<version> | bash
```

To verify your installation, run:

```bash
kubectl kots --help
```

## Install the kots CLI without Root Access

For computers without root access or those that cannot write to the `/usr/local/bin` directory, the `kots` plugin can be downloaded using the following steps:

1. Download the release for your Operating System from https://github.com/replicatedhq/kots/releases/latest (Linux and MacOS are supported)
1. Unpack the release
1. Rename the `kots` executable to `kubectl-kots`.
1. Copy the renamed `kubectl-kots` to anywhere on the `PATH`.


## KOTS Commands

### kots install
The install subcommand will install the application directly to a cluster.
By default, kots install will include the admin console to provide a web based management console.

### kots pull
If you’d rather use kubectl or another workflow to deploy to your cluster, you can run kots pull to create a directory on your workstation with the Kots application

### kots download
Once an application is running and has the Admin Console deployed with it, you can run kots download to retreive a copy of the application manifests from the cluster, and store them in a specific directory structure on your workstation.

### kots upload
If you have a copy of an application that was created with kots pull or kots download, you can upload it back to the Admin Console using the kots upload command.

### kots admin-console
If you’ve deployed an application with the admin console, the kots admin-console command will open a proxy so you can connect to the admin console from your machine.

### kots admin-console upgrade
If you've deployed an application with the admin console, the kots admin-admin console upgrade command will upgrade just the admin console to the latest version.
The application can be updated from the admin console, not this command.

### kots reset-password
If you've lost the password to the admin console but still have kubectl access, the kots reset-password command will prompt for a new password and upload it to the cluster.

### kots upstream
Provides wrapper functionality to interface with the upstream source.

### kots version
Prints the current version of the kots Kubectl plugin and provides a command for updating if a new version is available.

## Next Steps
To give KOTS a try, head over to the [KOTS Helm guide](/vendor/helm/overview).
If you want to see what it’s like to distribute a KOTS application, head to the [Packaging KOTS Applications](/vendor/packaging/packaging-an-app/) guide.
