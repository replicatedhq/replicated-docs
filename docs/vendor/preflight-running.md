# Running Preflight Checks for Helm Installations

You can run Helm preflight checks before running `helm install` and during the installation of an application. Additionally, your preflight checks can include one or more specification types and resources.

## Prerequisite

Customers must install the preflight plug-in, which is a client-side utility that adds a single binary to their path.

To install the preflight plug-in:

1. Log in to the registry where the Helm chart and preflight specification were pushed to:

    ```
    helm registry login REGISTRY_DOMAIN --username USERNAME --password PASSWORD
    ```

Replace:

- `REGISTRY_DOMAIN` with the registry domain that contains the Helm chart.
- `USERNAME` with the username that has access to the registry.
- `PASSWORD` with the password for the registry.

1. Run the following command to install the preflight plug-in using krew:
    ```
    curl https://krew.sh/preflight | bash
    ```

## Run Preflights Checks

Before running the `helm install` command, your customers run preflight checks using the local values file that you provide. This lets customers verify that their environments meet the installation requirements before they run the actual installation. 

The output shows the success, warning, or fail message each preflight check, depending on how they were configured.You can ask customers to send you the results of the preflight checks if needed.

To run the preflights using a local values file to override chart defaults:

    ```
    helm template oci://REGISTRY/APP_NAME/CHART --values FILENAME.yaml | kubectl preflight -
    ```
    Replace:

    - `REGISTRY` with the registry domain. This can be the Replicated registry or a custom domain.
    - `APP_NAME` with the name of the application.
    - `CHART` with the name of the Helm chart.
    - `FILENAME` with the name of the local values file.