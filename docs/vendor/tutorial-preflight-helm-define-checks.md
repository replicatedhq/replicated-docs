import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Step 2: Define and Test Preflight Checks

Next, define preflight checks for the Helm chart by adding a preflight spec to a Secret in the chart's templates.

To define preflight checks:

1. In your local file system, go to the `gitea` directory.

1. In the `templates` subdirectory, create a YAML file named `secrets-preflights.yaml`:

   ```
   touch templates/secret-preflights.yaml
   ```

1. In the `secrets-preflights.yaml` file, add the following YAML: 

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     labels:
       troubleshoot.sh/kind: preflight
     name: "gitea-preflight-config"
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
                     when: "< 1.25.0"
                     message: The application requires Kubernetes 1.25.0 or later, and recommends 1.28.0.
                     uri: https://www.kubernetes.io
                 - warn:
                     when: "< 1.28.0"
                     message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.28.0 or later.
                     uri: https://kubernetes.io
                 - pass:
                     message: Your cluster meets the recommended and required versions of Kubernetes.
   ```

   This YAML adds a preflight spec that checks the version of Kubernetes running in the target cluster.

1. Test the spec by running preflight checks:

   1. Install the preflight kubectl plugin:

    ```bash
    curl https://krew.sh/preflight | bash
    ```

   1. Run the preflight checks defined in the spec by templating the Gitea chart and then piping the result to the preflight plugin:

    ```bash
    helm template gitea . | kubectl preflight -
    ```

1. Package the Helm chart to an archive:

   1. In the `Chart.yaml` file, add the Replicated SDK as a dependency:

    <DependencyYaml/>

   1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

    ```bash
    helm package . --dependency-update
    ```

## Next Step


## Related Topics

* [Defining Preflight Checks](/vendor/preflight-defining)
* [Running Preflight Checks](/vendor/preflight-running)