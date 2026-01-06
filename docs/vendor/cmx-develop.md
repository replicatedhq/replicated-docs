# Develop with CMX

This topic describes how to use Replicated Compatibility Matrix (CMX) to streamline application development and testing workflows.

## About Developing with CMX

CMX provides features that make it easy to quickly provision test environments and deploy your application for iterative development and testing. The `cluster prepare` command is particularly useful for reducing the number of steps required to get from code to a running application in a test cluster.

## Prerequisites

For prerequisites, see [Prerequisites](/vendor/cmx-overview#prerequisites) in _CMX Overview_.

## Prepare Clusters

For applications distributed with the Replicated Vendor Portal, the [`cluster prepare`](/reference/replicated-cli-cluster-prepare) command reduces the number of steps required to provision a cluster and then deploy a release to the cluster for testing. This is useful in continuous integration (CI) workflows that run multiple times a day. For an example workflow that uses the `cluster prepare` command, see [Recommended CI/CD Workflows](/vendor/ci-workflows).

The `cluster prepare` command does the following:
* Creates a cluster
* Creates a release for your application based on either a Helm chart archive or a directory containing the application YAML files
* Creates a temporary customer of type `test`
  :::note
  Test customers created by the `cluster prepare` command are not saved in your Vendor Portal team.
  :::
* Installs the release in the cluster using either the Helm CLI or Replicated KOTS

The `cluster prepare` command requires either a Helm chart archive or a directory containing the application YAML files to be installed:

* **Install a Helm chart with the Helm CLI**:

  ```bash
  replicated cluster prepare \
    --distribution K8S_DISTRO \
    --version K8S_VERSION \
    --chart HELM_CHART_TGZ
  ```
  The following example creates a kind cluster and installs a Helm chart in the cluster using the `nginx-chart-0.0.14.tgz` chart archive:
  ```bash
  replicated cluster prepare \
    --distribution kind \
    --version 1.27.0 \
    --chart nginx-chart-0.0.14.tgz \
    --set key1=val1,key2=val2 \
    --set-string s1=val1,s2=val2 \
    --set-json j1='{"key1":"val1","key2":"val2"}' \
    --set-literal l1=val1,l2=val2 \
    --values values.yaml
  ```

* **Install with KOTS from a YAML directory**:

  ```bash
  replicated cluster prepare \
    --distribution K8S_DISTRO \
    --version K8S_VERSION \
    --yaml-dir PATH_TO_YAML_DIR
  ```
  The following example creates a k3s cluster and installs an application in the cluster using the manifest files in a local directory named `config-validation`: 
  ```bash
  replicated cluster prepare \
    --distribution k3s \
    --version 1.26 \
    --namespace config-validation \
    --shared-password password \
    --app-ready-timeout 10m \
    --yaml-dir config-validation \
    --config-values-file conifg-values.yaml \
    --entitlements "num_of_queues=5"
    ```

For command usage, including additional options, see [cluster prepare](/reference/replicated-cli-cluster-prepare).

## Access Clusters

CMX provides the kubeconfig for clusters so that you can access clusters with the kubectl command line tool. For more information, see [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

To access a cluster from the command line:

1. Verify that the cluster is in a Running state:

   ```bash
   replicated cluster ls
   ```
   In the output of the command, verify that the `STATUS` for the target cluster is `running`. For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

1. Run the following command to open a new shell session with the kubeconfig configured for the cluster:

   ```bash
   replicated cluster shell CLUSTER_ID
   ``` 
   Where `CLUSTER_ID` is the unique ID for the running cluster that you want to access.

   For command usage, see [cluster shell](/reference/replicated-cli-cluster-shell).

1. Verify that you can interact with the cluster through kubectl by running a command. For example:

   ```bash
   kubectl get ns
   ```

1. Press Ctrl-D or type `exit` when done to end the shell and the connection to the server.

## Upgrade Clusters (kURL Only)

For kURL clusters provisioned with CMX, you can use the the `cluster upgrade` command to upgrade the version of the kURL installer specification used to provision the cluster. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations after upgrade.

The following example upgrades a kURL cluster from its previous version to version `9d5a44c`:

```bash
replicated cluster upgrade cabb74d5 --version 9d5a44c
```

For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade).

## Delete Clusters

You can delete clusters using the Replicated CLI or the Vendor Portal.

### Replicated CLI

To delete a cluster using the Replicated CLI:

1. Get the ID of the target cluster:

   ```
   replicated cluster ls
   ```
   In the output of the command, copy the ID for the cluster.

   **Example:**

   ```
   ID        NAME              DISTRIBUTION   VERSION   STATUS    CREATED                        EXPIRES 
   1234abc   My Test Cluster   eks            1.27      running   2023-10-09 17:08:01 +0000 UTC  - 
   ``` 

   For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

1. Run the following command:

    ```
    replicated cluster rm CLUSTER_ID
    ```
    Where `CLUSTER_ID` is the ID of the target cluster. 
    For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).
1. Confirm that the cluster was deleted:
   ```
   replicated cluster ls CLUSTER_ID --show-terminated
   ```
   Where `CLUSTER_ID` is the ID of the target cluster.
   In the output of the command, you can see that the `STATUS` of the cluster is `terminated`. For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

### Vendor Portal

To delete a cluster using the Vendor Portal:

1. Go to **Compatibility Matrix**.

1. Under **Clusters**, in the vertical dots menu for the target cluster, click **Delete cluster**.

   <img alt="Delete cluster button" src="/images/cmx-delete-cluster.png" width="700px"/>

   [View a larger version of this image](/images/cmx-delete-cluster.png)



