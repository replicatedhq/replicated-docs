# Step 1: Get the Sample Chart and Test

To begin, get the sample grafana Helm chart from Bitnami, install the chart in your cluster using the Helm CLI, and then uninstall. The purpose of this step is to confirm that you can successfully install and access the application before adding the chart to a release in the Replicated vendor platform.

To get the sample grafana Helm chart and test installation:

1. Run the following command to pull and untar version 1.0.6 of the Bitnami grafana Helm chart:

   ```
   helm pull --untar oci://registry-1.docker.io/bitnamicharts/grafana --version 9.6.5
   ```
   For more information about this chart, see the [bitnami/grafana](https://github.com/bitnami/charts/tree/main/bitnami/grafana) repository in GitHub.

1. Change to the new `grafana` directory that was created:
   ```
   cd grafana
   ```
1. View the files in the directory:   
   ```
   ls
   ```
   The directory contains the following files:
   ```
   Chart.lock  Chart.yaml  README.md  charts  templates  values.yaml
   ```
1. Install the grafana chart in your cluster:

   ```
   helm install grafana . --namespace grafana --create-namespace
   ```
   To view the full installation instructions from Bitnami, see [Installing the Chart](https://github.com/bitnami/charts/blob/main/bitnami/grafana/README.md#installing-the-chart) in the `bitnami/grafana` repository.

   When the chart is installed, the following output is displayed:

   

1. Watch the `grafana` Deployment service until an external IP is available:

   ```
   kubectl get deploy grafana --namespace grafana --watch
   ```

1. When the Deployment is created, run the commands provided in the output of the installation command to get the Grafana URL:


1. In a browser, go to the URL to confirm that you can see the welcome page for the application:

   <img alt="Grafana login webpage" src="/images/gitea-app.png" width="500px"/>

   [View a larger version of this image](/images/gitea-app.png)

1. Uninstall the Helm chart:

   ```
   helm uninstall grafana --namespace grafana
   ```
   This command removes all the Kubernetes components associated with the chart and uninstalls the `grafana` release.

1. Delete the namespace:

   ```
   kubectl delete namespace grafana
   ```

## Next Step

Log in to the vendor portal and create an application. See [Step 2: Create an Application](tutorial-config-create-app).

## Related Topics

* [Helm Install](https://helm.sh/docs/helm/helm_install/)
* [Helm Uninstall](https://helm.sh/docs/helm/helm_uninstall/)
* [Helm Create](https://helm.sh/docs/helm/helm_create/)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)
* [bitnami/gitea](https://github.com/bitnami/charts/blob/main/bitnami/gitea)