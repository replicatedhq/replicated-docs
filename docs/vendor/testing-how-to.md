import TestRecs from "../partials/ci-cd/_test-recs.mdx"
import TTL from "../partials/cmx/_ttl.mdx"
import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Using the Compatibility Matrix (Beta)

This topic describes how to use the Replicated compatibility matrix to create ephemeral clusters that you can use for manual and CI/CD testing.
## Prerequisites

To get started with the compatibility matrix, complete the following prerequisites:

<Prerequisites/>

## Creating and Preparing Clusters

The Replicated compatibility matrix functionality is provided through the replicated CLI  `cluster` commands.

You can run the commands to manually create a cluster when you need one for a short period of time, such as when debugging a support issue or to use testing as part of an inner development loop. You can also integrate the commands in your continuous integration and continuous delivery (CI/CD) workflows to automatically provision clusters for running tests. For more information, see [Integrating with CI/CD](ci-overview). 

You can use both `cluster create` and `cluster prepare` to provision clusters. The following describes the use cases for each command:

* `cluster create`: Provisions a cluster based on the parameters specified. After a cluster is provisioned, an application can be installed in the cluster by creating a release, promoting the release to a temporary channel, and creating a temporary customer in the Replicated platform. A recommended use case for the `cluster create` command is provisioning clusters for testing in CD workflows that release your software to customers.

  The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

  ```bash
  replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
  ```

  For command usage, see [cluster create](/reference/replicated-cli-cluster-create) in the _replicated CLI_ reference.

* `cluster prepare`: Provisions a cluster based on the parameters specified, creates a release, and then installs the release in the cluster. The `cluster prepare` command allows you to install an application in a cluster for testing without needing to create a temporary channel or a temporary customer in the Replicated platform. A recommended use case for the `cluster prepare` command is provisioning clusters for testing in CI workflows that run on every commit.

  The following example creates a kind cluster and installs a Helm chart in the cluster using the `nginx-chart-0.0.14.tgz` chart archive:

  ```bash
  replicated cluster cluster prepare \
    --distribution kind \
    --version 1.27.0 \
    --chart nginx-chart-0.0.14.tgz \
    --set key1=val1,key2=val2 \
    --set-string s1=val1,s2=val2 \
    --set-json j1='{"key1":"val1","key2":"val2"}' \
    --set-literal l1=val1,l2=val2 \
    --values values.yaml
  ```

  For command usage, see [cluster prepare](/reference/replicated-cli-cluster-prepare) in the _replicated CLI_ reference.

* `cluster upgrade`: Upgrades an existing cluster version. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations post upgrade in CD workflows that release your software to customers.

  The following example upgrades a kURL cluster from its previous version to version 9d5a44c.

  ```bash
  replicated cluster upgrade cabb74d5 --version 9d5a44c
  ```

  For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade) in the _replicated CLI_ reference.