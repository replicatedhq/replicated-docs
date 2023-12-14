# Step 1: Get the Sample Chart and Test

To begin, get the sample Grafana Helm chart from Bitnami, install the chart in your cluster using the Helm CLI, and then uninstall. The purpose of this step is to confirm that you can successfully install and access the application before adding the chart to a release in the Replicated vendor platform.

To get the sample grafana Helm chart and test installation:

1. Run the following command to pull and untar version 9.6.5 of the Bitnami Grafana Helm chart:

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

   After running the installation command, the following output is displayed:

   ```
   NAME: grafana
   LAST DEPLOYED: Thu Dec 14 14:54:50 2023
   NAMESPACE: grafana
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   CHART NAME: grafana
   CHART VERSION: 9.6.5
   APP VERSION: 10.2.2

   ** Please be patient while the chart is being deployed **

   1. Get the application URL by running these commands:
      echo "Browse to http://127.0.0.1:8080"
      kubectl port-forward svc/grafana 8080:3000 &

   2. Get the admin credentials:

      echo "User: admin"
      echo "Password: $(kubectl get secret grafana-admin --namespace grafana -o jsonpath="{.data.GF_SECURITY_ADMIN_PASSWORD}" | base64 -d)"
   # Note: Do not include grafana.validateValues.database here. See https://github.com/bitnami/charts/issues/20629
   ```

1. Watch the `grafana` Deployment service until an external IP is available:

   ```
   kubectl get deploy grafana --namespace grafana --watch
   ```

1. When the Deployment is created, run the commands provided in the output of the installation command to get the Grafana login credentials:

   ```
   echo "User: admin"
   echo "Password: $(kubectl get secret grafana-admin --namespace grafana -o jsonpath="{.data.GF_SECURITY_ADMIN_PASSWORD}" | base64 -d)"
   ```

1. Run the commands provided in the ouptut to get the Grafana URL:

   ```
   echo "Browse to http://127.0.0.1:8080"
   kubectl port-forward svc/grafana 8080:3000 --namespace grafana
   ```

   :::note
   Include `--namespace grafana` in the `kubectl port-forward` command.
   :::

1. In a browser, go to the URL to open the Grafana login screen:

   <img alt="Grafana login webpage" src="/images/grafana-login.png" width="500px"/>

   [View a larger version of this image](/images/grafana-login.png)

1. Log in using the credentials provided to open the Grafana dashboard:

   <img alt="Grafana dashboard" src="/images/grafana-dashboard.png" width="500px"/>

   [View a larger version of this image](/images/grafana-dashboard.png)

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