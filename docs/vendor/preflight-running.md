# Running Helm Preflight Checks

You can run Helm preflight checks before running `helm install` and during the installation of an application. Additionally, your preflight checks can include one or more specification types and resources.

## Prerequisite

Customers must install the preflight plug-in, which is a client-side utility that adds a single binary to their path:

```
helm registry login registry.replicated.com --username USERNAME --password PASSWORD
curl https://krew.sh/preflight | bash
```
Replace:

- `USERNAME` with the username that has access to the helm registry.
- `PASSWORD` with the password for the helm registry.


## Run Preflights Checks

Before running the `helm install` command, your customers run preflight checks using the local values file that you provide. This lets customers verify that their environments meet the installation requirements before they run the actual installation. 

The output shows the success, warning, or fail message each preflight check, depending on how they were configured.You can ask customers to send you the results of the preflight checks if needed.

Run one of the following commands:

- To run the preflights using a local values file to override chart defaults:

    ```
    helm template oci://REGISTRY/APP_NAME/CHART --values FILENAME.yaml | kubectl preflight -
    ```
    Replace:

    - `REGISTRY` with the registry domain. For example, registry.domain.com
    - `APP_NAME` with the name of the application.
    - `CHART` with the name of the Helm chart.
    - `FILENAME` with the name of the local values file.

- To run preflights with templating, such as with a Secret or a Preflight custom resource:

    For example:

    ```
    helm template oci://REGISTRY/APP_NAME/CHART --set VALUE_KEY=true --values FILENAME.yaml | kubectl preflight -
    ```
    Replace:

    - `REGISTRY` with the registry domain. For example, registry.domain.com
    - `APP_NAME` with the name of the application.
    - `CHART` with the name of the Helm chart.
    - `VALUE_KEY` with the preflight value from the `values.yaml` chart.
    - `FILENAME` with the name of the local values file.