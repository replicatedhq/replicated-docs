# Running Helm Preflight Checks

You can run Helm preflight checks before and after installing an application. Additionally, your preflight checks can include one or more specifications.

## Prerequisite

Customers must install the preflight plug-in, which is a client-side utility that adds a single binary to their path:

```
helm registry login registry.replicated.com --username USERNAME --password PASSWORD
curl https://krew.sh/preflight | bash
```
Replace:

- `USERNAME` with the username that has access to the helm registry.
- `PASSWORD` with the password for the helm registry.


## Run Preflights Before Installation

Your customers can run preflight checks before installation using the local values file that you provide. This lets customers verify that their environments meet the installation requirements before they run the actual installation. You can ask them to send you the results of the preflight checks if needed.

Run the preflights using a local values file to override chart defaults:

```
helm template oci://REGISTRY/APP_NAME/CHART --values FILENAME.yaml | kubectl preflight -
```
Replace:

- `REGISTRY` with the registry domain. For example, registry.domain.com
- `APP_NAME` with the name of the application.
- `CHART` with the name of the Helm chart.
- `FILENAME` with the name of the local values file.

The output shows the success, warning, or fail message each preflight check, depending on how they were configured.

## Run Preflights During Installation or Upgrade

If you configured `pre-install` or `pre-upgrade` hooks in the Helm chart, Helm runs the hooks during the installation or upgrade process, before the actual installation of the application. If preflight checks run, and fail to pass, the installation stops, which avoids the need for file cleanup.

Run the following command to run the preflights and installation:

```
helm install RELEASE_NAME oci://REGISTRY/APP_NAME/CHART --values FILENAME.yaml --atomic
```

Replace:

- `RELEASE_NAME` with the name of the release.
- `REGISTRY` with the registry domain. For example, registry.domain.com
- `APP_NAME` with the name of the application.
- `CHART` with the name of the Helm chart.
- `FILENAME` with the name of the local values file.

The `--atomic` flag deletes any failed resources. If a failure occurs during the preflight checks, the error message displays the name of the Pod log file in the cluster. CHeck the log files for information about the failure that you can use for troubleshooting.