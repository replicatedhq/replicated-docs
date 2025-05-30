# Step 2: Add a Preflight Spec to the Chart

Create a preflight specification that fails if the cluster is running a version of Kubernetes earlier than 1.23.0, and add the specification to the Gitea chart as a Kubernetes Secret.

To add a preflight specification to the Gitea chart:

1. In the `gitea/templates` directory, create a `gitea-preflights.yaml` file:

   ```
   touch templates/gitea-preflights.yaml
   ```

1. In the `gitea-preflights.yaml` file, add the following YAML to create a Kubernetes Secret with a preflight check specification: 

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     labels:
       troubleshoot.sh/kind: preflight
     name: gitea-preflight-checks
   stringData:
     preflight.yaml: |
       apiVersion: troubleshoot.sh/v1beta2
       kind: Preflight
       metadata:
         name: gitea-preflight-checks
       spec:
         analyzers:
           - clusterVersion:
               outcomes:
                 - fail:
                     when: "< 1.23.0"
                     message: |-
                       Your cluster is running a version of Kubernetes that is not supported and your installation will not succeed. To continue, upgrade your cluster to Kubernetes 1.23.0 or later.
                     uri: https://www.kubernetes.io
                 - pass:
                     message: Your cluster is running the required version of Kubernetes.
   ```

   The YAML above defines a preflight check that fails if the target cluster is running a version of Kubernetes earlier than 1.23.0. The preflight check also includes a message to the user that describes the failure and lists the required Kubernetes version. The `troubleshoot.sh/kind: preflight` label is required to run preflight checks defined in Secrets.

1. In the Gitea `Chart.yaml` file, add the Replicated SDK as a dependency:  

    ```yaml
# Chart.yaml
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 1.5.1
```

For the latest version information for the Replicated SDK, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/releases) in GitHub.

    The SDK is installed as a small service running alongside your application, and provides an in-cluster API that you can use to embed Replicated features into your application.

1. Update dependencies and package the chart to a `.tgz` chart archive:

    ```bash
    helm package . --dependency-update
    ```

    :::note
    If you see a `401 Unauthorized` error message, log out of the Replicated registry by running `helm registry logout registry.replicated.com` and then run `helm package . --dependency-update` again.
    :::       

## Next Step

Add the chart archive to a release. See [Add the Chart Archive to a Release](tutorial-preflight-helm-create-release).

## Related Topics

* [Define Preflight Checks](/vendor/preflight-defining)  
* [Package a Helm Chart for a Release](/vendor/helm-install-release)