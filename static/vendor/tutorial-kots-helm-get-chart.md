# Step 1: Get the Sample Chart and Test

To begin, get the sample Gitea Helm chart from Bitnami, install the chart in your cluster using the Helm CLI, and then uninstall. The purpose of this step is to confirm that you can successfully install and access the application before adding the chart to a release in the Replicated Vendor Portal.

To get the sample Gitea Helm chart and test installation:

1. Run the following command to pull and untar version 1.0.6 of the Bitnami Gitea Helm chart:

   ```
   helm pull --untar oci://registry-1.docker.io/bitnamicharts/gitea --version 1.0.6
   ```
   For more information about this chart, see the [bitnami/gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea) repository in GitHub.

1. Change to the new `gitea` directory that was created:
   ```
   cd gitea
   ```
1. View the files in the directory:   
   ```
   ls
   ```
   The directory contains the following files:
   ```
   Chart.lock  Chart.yaml  README.md  charts  templates  values.yaml
   ```
1. Install the Gitea chart in your cluster:

   ```
   helm install gitea . --namespace gitea --create-namespace
   ```
   To view the full installation instructions from Bitnami, see [Installing the Chart](https://github.com/bitnami/charts/blob/main/bitnami/gitea/README.md#installing-the-chart) in the `bitnami/gitea` repository.

   When the chart is installed, the following output is displayed:

   ```
   NAME: gitea
   LAST DEPLOYED: Tue Oct 24 12:44:55 2023
   NAMESPACE: gitea
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   CHART NAME: gitea
   CHART VERSION: 1.0.6
   APP VERSION: 1.20.5

   ** Please be patient while the chart is being deployed **

   1. Get the Gitea URL:

   NOTE: It may take a few minutes for the LoadBalancer IP to be available.
         Watch the status with: 'kubectl get svc --namespace gitea -w gitea'

   export SERVICE_IP=$(kubectl get svc --namespace gitea gitea --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
   echo "Gitea URL: http://$SERVICE_IP/"

   WARNING: You did not specify a Root URL for Gitea. The rendered URLs in Gitea may not show correctly. In order to set a root URL use the rootURL value.

   2. Get your Gitea login credentials by running:

   echo Username: bn_user
   echo Password: $(kubectl get secret --namespace gitea gitea -o jsonpath="{.data.admin-password}" | base64 -d)
   ```

1. Watch the `gitea` LoadBalancer service until an external IP is available:

   ```
   kubectl get svc gitea --namespace gitea --watch
   ```

1. When the external IP for the `gitea` LoadBalancer service is available, run the commands provided in the output of the installation command to get the Gitea URL:

   ```
   export SERVICE_IP=$(kubectl get svc --namespace gitea gitea --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
   echo "Gitea URL: http://$SERVICE_IP/"
   ```

1. In a browser, go to the Gitea URL to confirm that you can see the welcome page for the application:

   <img alt="Gitea application webpage" src="/images/gitea-app.png" width="500px"/>

   [View a larger version of this image](/images/gitea-app.png)

1. Uninstall the Helm chart:

   ```
   helm uninstall gitea --namespace gitea
   ```
   This command removes all the Kubernetes components associated with the chart and uninstalls the `gitea` release.

1. Delete the namespace:

   ```
   kubectl delete namespace gitea
   ```

## Next Step

Log in to the Vendor Portal and create an application. See [Step 2: Create an Application](tutorial-kots-helm-create-app).

## Related Topics

* [Helm Install](https://helm.sh/docs/helm/helm_install/)
* [Helm Uninstall](https://helm.sh/docs/helm/helm_uninstall/)
* [Helm Create](https://helm.sh/docs/helm/helm_create/)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)
* [bitnami/gitea](https://github.com/bitnami/charts/blob/main/bitnami/gitea)