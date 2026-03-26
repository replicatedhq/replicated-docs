# Automate installation with Embedded Cluster

This topic describes how to install an application with Replicated Embedded Cluster from the command line, without needing to access the Replicated KOTS Admin Console.

## Overview

A common use case for installing with Embedded Cluster from the command line is to automate installation, such as performing headless installations as part of CI/CD pipelines.

With headless installation, you provide all the necessary installation assets, such as the license file and the application config values, with the installation command rather than through the Admin Console UI. Any preflight checks defined for the application run automatically during headless installations from the command line rather than being displayed in the Admin Console.

## Prerequisite

Create a ConfigValues resource to define the configuration values for the application. The ConfigValues resource allows you to pass the configuration values for an application from the command line with the install command, rather than through the Admin Console UI. For air-gapped environments, ensure that the ConfigValues file can be accessed from the installation environment. 

The ConfigValues resource includes the fields that are defined in the Replicated KOTS Config custom resource for the release, along with the user-supplied and default values for each field, as shown in the example below:

```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
spec:
  values:
    config_item_name:
      default: example_default_value
      value: example_value
    boolean_config_item_name:
      value: "1"
    password_config_item_name:
      valuePlaintext: exampleplaintextpassword
    select_one_config_item_name:
      default: default_option_name
      value: selected_option_name  
```

#### ConfigValues requirements

* Linux operating system

* x86-64 architecture

* systemd

* At least 2GB of memory and 2 CPU cores

* The disk on the host must have a maximum P99 write latency of 10 ms. This supports etcd performance and stability. For more information about the disk write latency requirements for etcd, see [Disks](https://etcd.io/docs/latest/op-guide/hardware/#disks) in _Hardware recommendations_ and [What does the etcd warning “failed to send out heartbeat on time” mean?](https://etcd.io/docs/latest/faq/) in the etcd documentation.

* The user performing the installation must have root access to the machine, such as with `sudo`.

* The data directory used by Embedded Cluster must have 40Gi or more of total space and be less than 80% full. By default, the data directory is `/var/lib/embedded-cluster`. The directory can be changed by passing the `--data-dir` flag with the Embedded Cluster `install` command. For more information, see [install](/reference/embedded-cluster-install).

   Note that in addition to the primary data directory, Embedded Cluster creates directories and files in the following locations:

      - `/etc/cni`
      - `/etc/k0s`
      - `/opt/cni`
      - `/opt/containerd`
      - `/run/calico`
      - `/run/containerd`
      - `/run/k0s`
      - `/sys/fs/cgroup/kubepods`
      - `/sys/fs/cgroup/system.slice/containerd.service`
      - `/sys/fs/cgroup/system.slice/k0scontroller.service`
      - `/usr/libexec/k0s`
      - `/var/lib/calico`
      - `/var/lib/cni`
      - `/var/lib/containers`
      - `/var/lib/kubelet`
      - `/var/log/calico`
      - `/var/log/containers`
      - `/var/log/embedded-cluster`
      - `/var/log/pods`
      - `/usr/local/bin/k0s`

* (Online installations only) Access to replicated.app and proxy.replicated.com or your custom domain for each

* Embedded Cluster is based on k0s, so all k0s system requirements and external runtime dependencies apply. See [System requirements](https://docs.k0sproject.io/stable/system-requirements/) and [External runtime dependencies](https://docs.k0sproject.io/stable/external-runtime-deps/) in the k0s documentation.

For more information, see [ConfigValues](/reference/custom-resource-configvalues).

## Limitation

Automating deployment with Embedded Cluster is supported only for the initial installation. Performing automated (headless) updates of existing installations with Embedded Cluster is not supported. For information about how to update an existing installation through the Admin Console UI, see [Perform Updates in Embedded Clusters](/enterprise/updating-embedded).

## Online (internet-connected) installation

To install with Embedded Cluster in an online environment:

1. Follow the steps provided in the Vendor Portal to download and untar the Embedded Cluster installation assets. For more information, see [Online Installation with Embedded Cluster](/enterprise/installing-embedded).

1. Run the following command to install:

    ```bash
    sudo ./APP_SLUG install --license PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --admin-console-password ADMIN_CONSOLE_PASSWORD
    ```

    Where:
    * `APP_SLUG` is the unique slug for the application.
    * `PATH_TO_LICENSE` is the path to the customer license.
    * `ADMIN_CONSOLE_PASSWORD` is a password for accessing the Admin Console.
    * `PATH_TO_CONFIGVALUES` is the path to the ConfigValues file.

    For more information about the `install` command options, see [install](/reference/embedded-cluster-install).

## Air gap installation

To install with Embedded Cluster in an air-gapped environment:

1. Follow the steps provided in the Vendor Portal to download and untar the Embedded Cluster air gap installation assets. For more information, see [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap).

1. Ensure that the Embedded Cluster installation assets are available on the air-gapped machine, then run the following command to install:

    ```bash
    sudo ./APP_SLUG install --license PATH_TO_LICENSE \
      --config-values PATH_TO_CONFIGVALUES \
      --admin-console-password ADMIN_CONSOLE_PASSWORD \
      --airgap-bundle PATH_TO_AIRGAP_BUNDLE
    ```

    Replace:
    * `APP_SLUG` with the unique slug for the application.
    * `PATH_TO_LICENSE` with the path to the customer license.
    * `PATH_TO_CONFIGVALUES` with the path to the ConfigValues file.
    * `ADMIN_CONSOLE_PASSWORD` with a password for accessing the Admin Console.
    * `PATH_TO_AIRGAP_BUNDLE` with the path to the Embedded Cluster `.airgap` bundle for the release.

    For the complete list of `install` options, see [install](/reference/embedded-cluster-install).

## (Optional) Ignore preflight checks during installation

You can ignore both application-level preflight checks and Embedded Cluster host preflight checks during installation. When you ignore preflight checks, the installation proceeds despite any preflight failures. This is useful for automated installations in development environments. For more information about the `--ignore-host-preflights` and `--ignore-app-preflights` options, see [install](/reference/embedded-cluster-install).

Ignoring host preflight checks is _not_ recommended for production installations.

* To ignore preflight checks:

    ```bash
    sudo ./APP_SLUG install --license license.yaml --ignore-host-preflights --ignore-app-preflights --yes
    ```
    Where:
    * `APP_SLUG` is the unique slug for the application
    * The `--yes` flag addresses the prompt for `--ignore-host-preflights` to continue with installation