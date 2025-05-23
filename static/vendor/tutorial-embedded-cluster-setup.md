# Introduction and Setup

This topic provides a summary of the goals and outcomes for the tutorial and also lists the prerequisites to set up your environment before you begin.

## Summary

This tutorial introduces you to installing an application on a Linux virtual machine (VM) using Replicated Embedded Cluster. Embedded Cluster allows you to distribute a Kubernetes cluster and your application together as a single appliance, making it easy for enterprise users to install, update, and manage the application and the cluster in tandem.

In this tutorial, you use a sample application to learn how to:

* Add the Embedded Cluster Config to a release
* Use Embedded Cluster to install the application on a Linux VM

## Set Up the Environment

Before you begin, ensure that you have access to a VM that meets the requirements for Embedded Cluster:

* Linux operating system

* x86-64 architecture

* systemd

* At least 2GB of memory and 2 CPU cores

* The disk on the host must have a maximum P99 write latency of 10 ms. This supports etcd performance and stability. For more information about the disk write latency requirements for etcd, see [Disks](https://etcd.io/docs/latest/op-guide/hardware/#disks) in _Hardware recommendations_ and [What does the etcd warning “failed to send out heartbeat on time” mean?](https://etcd.io/docs/latest/faq/) in the etcd documentation.

* The data directory used by Embedded Cluster must have 40Gi or more of total space and be less than 80% full. By default, the data directory is `/var/lib/embedded-cluster`. The directory can be changed by passing the `--data-dir` flag with the Embedded Cluster `install` command. For more information, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).

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

## Next Step

Install the Replicated CLI and create an application in the Replicated Vendor Portal. See [Step 1: Create an Application](/vendor/tutorial-embedded-cluster-create-app).